import { PetsService } from './../pets/pets.service';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';
import { Owner } from './entities/owner.entity';

@Injectable()
export class OwnersService {
  constructor(
    @InjectRepository(Owner) private ownerRepository: Repository<Owner>,
    @Inject(forwardRef(() => PetsService)) private petsService: PetsService,
  ) {}
  create(createOwnerInput: CreateOwnerInput) {
    const newOwner = this.ownerRepository.create(createOwnerInput);

    return this.ownerRepository.save(newOwner);
  }

  getPets(ownerId: number) {
    console.log(ownerId);
    return this.petsService.getPetsByOwnerId(ownerId);
  }

  findAll() {
    return this.ownerRepository.find();
  }

  findOne(id: number) {
    return this.ownerRepository.findOneOrFail(id);
  }

  update(id: number, updateOwnerInput: UpdateOwnerInput) {
    return `This action updates a #${id} owner`;
  }

  remove(id: number) {
    return `This action removes a #${id} owner`;
  }
}
