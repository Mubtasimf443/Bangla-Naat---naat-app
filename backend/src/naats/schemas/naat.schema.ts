// بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ صلى الله عليه وسلم InshaAllah
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type NaatDocument = HydratedDocument<Naat>;

@Schema({ timestamps: true })
export class Naat {
  @Prop({ type: String, required: true, trim: true, index: true })
  title: string;

  @Prop({ type: String, required: true })
  content: string;

  @Prop({ type: String, required: true, trim: true, index: true })
  category: string;

  @Prop({ type: String, required: true, trim: true })
  author: string;

  @Prop({ type: String, trim: true })
  youtubeUrl?: string;

  @Prop({ type: Number, default: 0, index: true })
  likes: number;

  /** Users who liked this naat (= their favorites). Not returned in API responses. */
  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], default: [], select: false, index: true })
  likedBy: Types.ObjectId[];

  createdAt: Date;
  updatedAt: Date;
}

export const NaatSchema = SchemaFactory.createForClass(Naat);
