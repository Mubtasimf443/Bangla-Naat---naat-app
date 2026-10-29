// بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ صلى الله عليه وسلم InshaAllah
import { Logger } from '@nestjs/common';
import { OnGatewayConnection, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

/**
 * Real-time notifications for the app.
 * Client: io('https://your-host/notifications')
 * Events: 'naat:created' | 'naat:updated' | 'naat:deleted'
 */
@WebSocketGateway({ namespace: '/notifications', cors: { origin: '*' } })
export class NaatsGateway implements OnGatewayConnection {
  private readonly logger = new Logger(NaatsGateway.name);

  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    this.logger.debug(`Client connected: ${client.id}`);
  }

  notifyCreated(naat: Record<string, any>) {
    this.server.emit('naat:created', {
      type: 'NAAT_CREATED',
      title: 'New Naat',
      message: `"${naat.title}" has been published`,
      naat,
    });
  }

  notifyUpdated(naat: Record<string, any>) {
    this.server.emit('naat:updated', {
      type: 'NAAT_UPDATED',
      title: 'Naat Updated',
      message: `"${naat.title}" has been updated`,
      naat,
    });
  }

  notifyDeleted(id: string) {
    this.server.emit('naat:deleted', { type: 'NAAT_DELETED', id });
  }
}
