import { App } from '@/app';
import { AuthResolver } from '@resolvers/auth.resolver';
import { UserResolver } from '@resolvers/users.resolver';
import { ParkingLotResolver } from '@resolvers/parkinglot.resolver';

const app = new App([AuthResolver, UserResolver, ParkingLotResolver]);

app.listen();
