import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Messages } from 'src/app/Model/messages';
import { MessageService } from 'src/app/Service/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent {
  message: Messages = {
    messageId: '00000',
    message: 'default',
    messageDate: new Date(2000, 10, 10),
    channelId: '1111',
    userId: '010101',
  };

  constructor(private ar: ActivatedRoute, private msg: MessageService) {
    let id = this.ar.snapshot.params['id'];
    console.log(id);
    if (id != undefined) {
      this.msg.getMessageById(id).subscribe((data: any) => {
        this.message = data;
      });
    }
  }
}
