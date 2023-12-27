import DataLoader from 'dataloader';
import { User } from 'src/user/entities/user.entity';

export interface IDataLoader {
  userLoader: DataLoader<string, User>;
}
