import { PetsModule } from './../pets/pets.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef, Module } from '@nestjs/common';
import { OwnersService } from './owners.service';
import { OwnersResolver } from './owners.resolver';
import { Owner } from './entities/owner.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Owner]), forwardRef(() => PetsModule)],
  providers: [OwnersResolver, OwnersService],
  exports: [OwnersService],
})
export class OwnersModule {}
