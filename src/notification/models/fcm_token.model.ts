import { Field, ObjectType } from '@nestjs/graphql';
import { DeviceType, NotificationStatus } from '../notification_status.enum';
import {
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { User } from 'src/user/entities/user.entity';
import { Notification } from './notification.model';

@ObjectType()
@Table({
  tableName: 'Fcm_Tokens',
})
export class Fcm_Token extends Model {
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

  @HasMany(() => Notification)
  notification: Notification[];
}
