import { Message } from 'src/message/entities/message.entity';

export const MessageProvider = [
  {
    provide: 'MESSAGE_REPOSITORY',
    useValue: Message,
  },
];
