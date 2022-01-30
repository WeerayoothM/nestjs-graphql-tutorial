import { Owner } from './../../owners/entities/owner.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Pet {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  type?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  image?: string;

  @Column()
  @Field((type) => Int)
  ownerId: number;

  @ManyToOne(() => Owner, (owner) => owner.pets)
  @JoinColumn({ name: 'ownerId', referencedColumnName: 'id' })
  @Field((type) => Owner)
  owner: Owner;
}
