import { Channels } from './channels';
import { Users } from './users';

export interface Messages {
  messageId: string;
  messageContent: string;
  messageDate: string;
  channel: Channels | null;
  user: Users | null;
}