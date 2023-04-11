import { IsNumber, IsUUID } from 'class-validator';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';
import { ParkingLot } from '@interfaces/parkinglot.interface';

@Entity()
export class ParkingLotEntity extends BaseEntity implements ParkingLot {
  @PrimaryGeneratedColumn("uuid")
  @IsUUID()
  id: string;

  @Column()
  @Unique(['name'])
  name: string;

  @Column()
  @IsNumber()
  spots: number;

  @Column()
  contact: string;

  @Column()
  parkingType: 'public' | 'private' | 'courtesy';
}
