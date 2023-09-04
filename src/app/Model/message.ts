import { Channel } from './channel';
import { User } from './user';

export interface Message {
  messageId: string;
  messageContent: string;
  messageDate: string;
  channel: Channel;
  user: User;
}
