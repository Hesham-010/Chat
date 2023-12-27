import { Room } from 'src/room/entities/room.entity';

export const Roomprovider = [
  {
    provide: 'ROOM_REPOSITORY',
    useValue: Room,
  },
];
