import { FriendShip } from 'src/friendship/entities/friendship.entity';

export const FrienshipProvider = [
  {
    provide: 'FRIENDSHIP_REPOSITORY',
    useValue: FriendShip,
  },
];
