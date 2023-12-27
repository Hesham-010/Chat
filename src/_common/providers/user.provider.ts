import { User } from 'src/user/entities/user.entity';

export const UserProvider = [
  {
    provide: 'USER_REPOSITORY',
    useValue: User,
  },
];
