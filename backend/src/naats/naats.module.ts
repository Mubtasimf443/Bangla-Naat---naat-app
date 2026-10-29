// بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ صلى الله عليه وسلم InshaAllah
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../users/users.module';
import { NaatController, NaatsController } from './naats.controller';
import { NaatsGateway } from './naats.gateway';
import { NaatsService } from './naats.service';
import { Naat, NaatSchema } from './schemas/naat.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Naat.name, schema: NaatSchema }]), UsersModule],
  controllers: [NaatsController, NaatController],
  providers: [NaatsService, NaatsGateway],
})
export class NaatsModule {}
