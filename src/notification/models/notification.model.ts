import { Field, ObjectType } from '@nestjs/graphql';
import {
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { DeviceInfo } from './deviceInfo.model';
import { User } from 'src/user/entities/user.entity';

@ObjectType()
@Table({
  tableName: 'Notifications',
})
export class Notification extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
  })
  @Field()
  id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
  })
  @Field()
  userId: string;

  @BelongsTo(() => User, 'userId')
  user: User;

  @Column
  @Field()
  title: string;

  @Column
  @Field()
  body: string;

  @Default(false)
  @Column
  @Field()
  seen: boolean;
}
