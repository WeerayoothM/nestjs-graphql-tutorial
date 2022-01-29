import { OwnersService } from './../owners/owners.service';
import { Pet } from './entities/pet.entity';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePetInput } from './dto/create-pet.input';
import { Owner } from 'src/owners/entities/owner.entity';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet) private petsRepository: Repository<Pet>,
    @Inject(forwardRef(() => OwnersService))
    private ownersService: OwnersService,
  ) {}

  findAll(): Promise<Pet[]> {
    return this.petsRepository.find(); // SELECT * from pet
  }

  async findOne(id: number): Promise<Pet> {
    const pet = await this.petsRepository.findOneOrFail(id);
    return pet;
  }

  createPet(createPetInput: CreatePetInput): Promise<Pet> {
    const newPet = this.petsRepository.create(createPetInput); //newPet = new Pet() new.name = input.name
    return this.petsRepository.save(newPet); // insert
  }

  getOwner(ownerId: number): Promise<Owner> {
    return this.ownersService.findOne(ownerId);
  }

  getPetsByOwnerId(ownerId: number): Promise<Pet[]> {
    return this.petsRepository.find({ ownerId });
  }
}
