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
import { DeviceType, NotificationStatus } from '../notification_status.enum';
import { DataTypes } from 'sequelize';
import { Fcm_Token } from './fcm_token.model';

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

  @Column({ type: DataType.ENUM, values: Object.values(DeviceType) })
  deviceType: DeviceType;

  @ForeignKey(() => Fcm_Token)
  @Column({
    type: DataType.UUID,
  })
  @Field()
  fcm_TokenId: string;

  @BelongsTo(() => Fcm_Token, 'fcm_TokenId')
  fcm_Token: Fcm_Token;

  @Column
  @Field()
  title: string;

  @Column
  @Field()
  body: string;

  @Column({ type: DataTypes.ENUM, values: Object.values(NotificationStatus) })
  @Field()
  status: NotificationStatus;

  @Default(false)
  @Column
  @Field()
  seen: boolean;
}
