import { Notification } from 'src/notification/models/notification.model';

export const NotificationProvider = [
  {
    provide: 'NOTIFICATION_REPOSITORY',
    useValue: Notification,
  },
];
