// src/chat/chat.gateway.ts
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

let onlineUsers = 0;
const messageHistory: { username: string; text: string; time: string }[] = [];

@WebSocketGateway({
  cors: {
    origin: '*', // 모든 도메인 허용
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  // 클라이언트가 연결될 때 실행
  handleConnection(@ConnectedSocket() client: Socket) {
    onlineUsers++;
    this.server.emit('onlineUsers', onlineUsers);

    // 새로 연결된 클라이언트에게 이전 메시지 기록 전송
    client.emit('previousMessages', messageHistory);

    console.log(`Client connected: ${client.id}`);
  }

  // 클라이언트가 연결을 끊을 때 실행
  handleDisconnect(@ConnectedSocket() client: Socket) {
    onlineUsers--;
    this.server.emit('onlineUsers', onlineUsers);
    console.log(`Client disconnected: ${client.id}`);
  }

  // 메시지 받는 함수
  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() message: { username: string; text: string },
    @ConnectedSocket() client: Socket,
  ): void {
    console.log(`Message from ${message.username}: ${message.text}`);

    if (messageHistory.length >= 100) {
      messageHistory.shift(); // 오래된 메시지 삭제
    }

    const currentTime = new Date().toLocaleTimeString();

    messageHistory.push({
      username: message.username || 'Guest',
      text: message.text,
      time: currentTime,
    });

    // 서버에서 모든 클라이언트로 메시지를 브로드캐스트
    this.server.emit('message', {
      username: message.username || 'Guest',
      text: message.text,
    });
  }
}
