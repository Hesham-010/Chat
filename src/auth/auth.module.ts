import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthResolver } from './resolvers/auth.resolver';
import { UserProvider } from 'src/_common/providers/user.provider';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  providers: [AuthResolver, AuthService, ...UserProvider],
})
export class AuthModule {}
