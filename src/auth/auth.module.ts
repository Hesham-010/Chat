import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { UserProvider } from 'src/_common/providers/user.provider';
import { UserModule } from 'src/user/user.module';
import { AuthResolver } from './resolvers/auth.resolver';
import { VerifyProvider } from 'src/_common/providers/verify.provider';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  imports: [UserModule, NotificationModule],
  providers: [AuthResolver, AuthService, ...UserProvider, ...VerifyProvider],
})
export class AuthModule {}
