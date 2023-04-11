import { EntityRepository } from 'typeorm';
import { ParkingLotEntity } from '@entities/parkinglot.entity';
import { HttpException } from '@exceptions/httpException';
import { ParkingLot } from '@interfaces/parkinglot.interface';
import { CreateParkingLotDto, SortingParkingLotDto, UpdateParkingLotDto } from '@/dtos/parkinglot.dto';
import { MAX_SPOT_SIZE, MAX_SPOT_SIZE_ERROR_MESSAGE, MIN_SPOT_SIZE, MIN_SPOT_SIZE_ERROR_MESSAGE } from '@/consts';
import { UserType } from '@/typedefs/users.type';

@EntityRepository(ParkingLotEntity)
export class ParkingLotRepository {
  public async parkingLotFindAll(limit = 100, offset = 0, sorting?: SortingParkingLotDto): Promise<ParkingLot[]> {
    const parkinglotSpaces: ParkingLot[] = await ParkingLotEntity.find({
      order: sorting,
      skip: offset,
      take: limit
    })

    return parkinglotSpaces;
  }

  public async parkinglotCreate(parkinglotData: CreateParkingLotDto): Promise<ParkingLot> {
    if(parkinglotData.spots > MAX_SPOT_SIZE) {
        throw new HttpException(400, MAX_SPOT_SIZE_ERROR_MESSAGE);
    }
    if(parkinglotData.spots < MIN_SPOT_SIZE) {
        throw new HttpException(400, MIN_SPOT_SIZE_ERROR_MESSAGE);
    }

    const findParkingLot: ParkingLot = await ParkingLotEntity.findOne({ where: { name: parkinglotData.name } });
    if (findParkingLot) throw new HttpException(409, `El nombre ${parkinglotData.name} ya existe`);

    const createParkinglotData: ParkingLot = await ParkingLotEntity.create({ ...parkinglotData }).save();

    return createParkinglotData;
  }

  public async parkinglotUpdate(parkinglotID: string, parkinglotData: UpdateParkingLotDto): Promise<ParkingLot> {
    const findParkinglot: ParkingLot = await ParkingLotEntity.findOne({ where: { id: parkinglotID } });
    if (!findParkinglot) throw new HttpException(409, "El estacionamiento no existe");
    await ParkingLotEntity.update(parkinglotID, { ...parkinglotData });

    const updateParkinglot: ParkingLot = await ParkingLotEntity.findOne({ where: { id: parkinglotID } });
    return updateParkinglot;
  }

  public async parkinglotCheckIn(parkinglotID: string, userType: UserType): Promise<{success: boolean}> {
    const findParkinglot: ParkingLot = await ParkingLotEntity.findOne({ where: { id: parkinglotID } });
    if (!findParkinglot) throw new HttpException(409, "El estacionamiento no existe");
    switch (findParkinglot.parkingType) {
      case 'private':
        if (userType != 'corporate') {
          throw new HttpException(400, "Tipo de usuario no permitido");
        }
        break;
      case 'courtesy':
        if (userType != 'visitor') {
          throw new HttpException(400, "Tipo de usuario no permitido");
        }
        break;
      case 'public':
        break;
      default:
        throw new HttpException(400, "Tipo de usuario no permitido");
    }

    return {
      success: true
    }
  }
}
