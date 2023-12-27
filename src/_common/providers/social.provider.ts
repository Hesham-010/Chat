import { Social } from 'src/auth/entities/social.entity';

export const SocialProvider = [
  {
    provide: 'SOCIAL_REPOSITORY',
    useValue: Social,
  },
];
