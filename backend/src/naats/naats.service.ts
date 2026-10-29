// بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ صلى الله عليه وسلم InshaAllah
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { buildMeta, PaginatedResult, PaginationDto } from '../common/dto/pagination.dto';
import { escapeRegex } from '../common/utils/text.util';
import { CreateNaatDto, QueryNaatsDto, UpdateNaatDto } from './dto/naat.dto';
import { NaatsGateway } from './naats.gateway';
import { Naat, NaatDocument } from './schemas/naat.schema';

const NEWEST = { createdAt: -1 } as const;
const MOST_LIKED = { likes: -1, createdAt: -1 } as const;

@Injectable()
export class NaatsService {
  constructor(
    @InjectModel(Naat.name) private readonly naatModel: Model<NaatDocument>,
    private readonly gateway: NaatsGateway,
  ) {}

  // ---------------- reads ----------------
  findAll(query: QueryNaatsDto) {
    const filter: Record<string, any> = {};
    if (query.category) filter.category = query.category;

    if (query.search?.trim()) {
      const rx = new RegExp(escapeRegex(query.search.trim()), 'i');
      filter.$or =
        query.searchBy === 'title'
          ? [{ title: rx }]
          : query.searchBy === 'content'
            ? [{ content: rx }]
            : [{ title: rx }, { content: rx }];
    }
    return this.paginate(filter, query.sort === 'popular' ? MOST_LIKED : NEWEST, query);
  }

  /** Every naat in the database, for the first app launch. */
  findInitial(updatedAfter?: string) {
    const filter = updatedAfter ? { updatedAt: { $gt: new Date(updatedAfter) } } : {};
    return this.naatModel.find(filter).sort(NEWEST).lean().exec();
  }

  findPopular(query: PaginationDto) {
    return this.paginate({}, MOST_LIKED, query);
  }

  async findFavorites(userId: string, query: PaginationDto) {
    return this.paginate({ likedBy: userId }, NEWEST, query);
  }

  async categories() {
    return this.naatModel.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $project: { _id: 0, name: '$_id', count: 1 } },
      { $sort: { name: 1 } },
    ]);
  }

  async findOne(id: string) {
    const naat = await this.naatModel.findById(id).lean().exec();
    if (!naat) throw new NotFoundException('Naat not found');
    return naat;
  }

  // ---------------- writes ----------------
  async create(dto: CreateNaatDto) {
    const naat = (await this.naatModel.create(dto)).toObject();
    delete (naat as any).likedBy;
    this.gateway.notifyCreated(naat);
    return naat;
  }

  async update(id: string, dto: UpdateNaatDto) {
    const naat = await this.naatModel
      .findByIdAndUpdate(id, dto, { new: true, runValidators: true })
      .lean()
      .exec();
    if (!naat) throw new NotFoundException('Naat not found');
    this.gateway.notifyUpdated(naat);
    return naat;
  }

  async remove(id: string) {
    const naat = await this.naatModel.findByIdAndDelete(id).exec();
    if (!naat) throw new NotFoundException('Naat not found');
    this.gateway.notifyDeleted(id);
    return { message: 'Naat deleted' };
  }

  /** Like / unlike (toggle). A liked naat shows up in the user's favorites. */
  async toggleLike(naatId: string, userId: string) {
    const unliked = await this.naatModel
      .findOneAndUpdate(
        { _id: naatId, likedBy: userId },
        { $pull: { likedBy: userId }, $inc: { likes: -1 } },
        { new: true },
      )
      .exec();
    if (unliked) return { liked: false, likes: unliked.likes };

    const liked = await this.naatModel
      .findOneAndUpdate(
        { _id: naatId, likedBy: { $ne: userId } },
        { $addToSet: { likedBy: userId }, $inc: { likes: 1 } },
        { new: true },
      )
      .exec();
    if (!liked) throw new NotFoundException('Naat not found');
    return { liked: true, likes: liked.likes };
  }

  // ---------------- helpers ----------------
  private async paginate(
    filter: Record<string, any>,
    sort: Record<string, 1 | -1>,
    { page, limit }: PaginationDto,
  ): Promise<PaginatedResult<Naat>> {
    const [data, total] = await Promise.all([
      this.naatModel
        .find(filter)
        .sort(sort)
        .skip((page - 1) * limit)
        .limit(limit)
        .lean()
        .exec(),
      this.naatModel.countDocuments(filter),
    ]);
    return { data, meta: buildMeta(total, page, limit) };
  }
}
