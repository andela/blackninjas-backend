import skt from 'socket.io';
import chatServices from '../services/chat.service';

const clients = new Map();
const socketio = (server) => {
  const io = skt(server);
  io.on('connection', (socket) => {
    socket.on('connect_user', (userKey) => {
      clients.set(userKey, socket);
    });
    socket.on('send_message', (data) => {
      chatServices.saveMessage(data);
      if (!data.receiverId) {
        socket.broadcast.emit('receive_message', data);
      }
      const client = clients.get(data.receiverId);
      if (client) client.emit('receive_message', data);
    });
  });
  return io;
};
export { socketio, clients };
