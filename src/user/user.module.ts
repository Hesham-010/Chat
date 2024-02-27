import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserResolver } from './resolvers/user.resolver';
import { UserProvider } from 'src/_common/providers/user.provider';
import { HelperModule } from 'src/_common/helper/helper.module';
import { UserTransformer } from './transformer/user.transformer';

@Module({
  imports: [HelperModule],
  providers: [UserResolver, UserService, ...UserProvider, UserTransformer],
  exports: [UserService, ...UserProvider, UserTransformer],
})
export class UserModule {}
