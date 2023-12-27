import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthResolver } from './resolvers/auth.resolver';
import { UserProvider } from 'src/_common/providers/user.provider';
import { VerifyProvider } from 'src/_common/providers/verify.provider';
import { SocialProvider } from 'src/_common/providers/social.provider';

@Module({
  providers: [
    AuthResolver,
    AuthService,
    ...UserProvider,
    ...VerifyProvider,
    ...SocialProvider,
  ],
})
export class AuthModule {}
