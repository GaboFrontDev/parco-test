export interface ParkingLot {
    id?: string;
    name?: string;
    spots: number;
    contact: string;
    parkingType: 'public' | 'private' | 'courtesy';
  }
  