import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { ParkingLotRepository } from '@/repositories/parkinglot.repository';
import { ParkingLot } from '@/typedefs/parkinglot.type';
import { CreateParkingLotDto, SortingParkingLotDto, UpdateParkingLotDto } from '@/dtos/parkinglot.dto';

@Resolver()
export class ParkingLotResolver extends ParkingLotRepository {
  @Query(() => [ParkingLot], {
    description: 'ParkingLot list all',
  })
  async getParkingLotSpaces(
    @Arg('limit', { nullable: true }) limit?: number,
    @Arg('offset', { nullable: true }) offset?: number,
    @Arg('sorting', {nullable: true}) sorting?: SortingParkingLotDto,
  ): Promise<ParkingLot[]> {
    const parkinglotSpaces: ParkingLot[] = await this.parkingLotFindAll(limit, offset, sorting);
    return parkinglotSpaces;
  }

  @Mutation(() => ParkingLot, {
    description: 'ParkingLot create',
  })
  async createParkinglot(@Arg('parkinglotData') parkinglotData: CreateParkingLotDto): Promise<ParkingLot> {
    const parkinglot: ParkingLot = await this.parkinglotCreate(parkinglotData);
    return parkinglot;
  }

  @Mutation(() => ParkingLot, {
    description: 'ParkingLot update',
  })
  async updateParkinlot(@Arg('parkinglotID') parkinglotID: string, @Arg('parkinglotData') parkinglotData: UpdateParkingLotDto): Promise<ParkingLot> {
    const parkinglot = await this.parkinglotUpdate(parkinglotID, parkinglotData);
    return parkinglot;
  }

  @Mutation(() => ParkingLot, {
    description: 'ParkingLot CheckIn',
  })
  async checkIn(
    @Arg('parkinglotID') parkinglotID: string,
    @Arg('userType') userType: 'corporate' | 'provider' | 'visitor',
  ): Promise<ReturnType<ParkingLotResolver['parkinglotCheckIn']>> {
    const status = await this.parkinglotCheckIn(parkinglotID, userType);
    return status;
  }
}
