import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserResolver } from './resolvers/user.resolver';
import { SocialProvider } from 'src/_common/providers/social.provider';
import { UserProvider } from 'src/_common/providers/user.provider';

@Module({
  imports: [],
  providers: [UserResolver, UserService, ...SocialProvider, ...UserProvider],
})
export class UserModule {}
