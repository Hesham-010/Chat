import { Module } from '@nestjs/common';
import { DataLoaderService } from './services/dataloader.service';
import { UserProvider } from 'src/_common/providers/user.provider';

@Module({
  imports: [],
  providers: [DataLoaderService, ...UserProvider],
  exports: [DataLoaderService],
})
export class DataloaderModule {}
