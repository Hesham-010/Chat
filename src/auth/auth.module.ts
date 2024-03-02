import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { UserProvider } from 'src/_common/providers/user.provider';
import { UserModule } from 'src/user/user.module';
import { AuthResolver } from './resolvers/auth.resolver';
import { VerifyProvider } from 'src/_common/providers/verify.provider';

@Module({
  imports: [UserModule],
  providers: [AuthResolver, AuthService, ...UserProvider, ...VerifyProvider],
})
export class AuthModule {}
