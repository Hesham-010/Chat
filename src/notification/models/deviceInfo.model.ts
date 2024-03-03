import { Field, ObjectType } from '@nestjs/graphql';
import { DeviceType, NotificationStatus } from '../notification_status.enum';
import { DataTypes } from 'sequelize';
import { User } from 'src/user/entities/user.entity';
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

@ObjectType()
@Table({
  tableName: 'DeviceInfo',
})
export class DeviceInfo extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Field()
  @Column({
    type: DataType.UUID,
  })
  id: string;

  @Column
  @Field()
  fcm_Token: string;

  @Default(NotificationStatus.ACTIVE)
  @Column({ type: DataTypes.ENUM, values: Object.values(NotificationStatus) })
  @Field()
  status: NotificationStatus;

  @Column({ type: DataTypes.ENUM, values: Object.values(DeviceType) })
  @Field()
  deviceType: DeviceType;

  @ForeignKey(() => User)
  @Field(() => User)
  @Column({
    type: DataType.UUID,
  })
  userId: string;

  @BelongsTo(() => User, 'userId')
  user: User;
}
