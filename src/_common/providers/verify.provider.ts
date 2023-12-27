import { Verify } from 'src/auth/entities/verify.entity';

export const VerifyProvider = [
  {
    provide: 'VERIFY_REPOSITORY',
    useValue: Verify,
  },
];
