import skt from 'socket.io';

const clients = new Map();
const socketio = (server) => {
  const io = skt(server);
  io.on('connection', (socket) => {
    socket.on('connect_user', (userKey) => {
      clients.set(userKey, socket);
    });
  });
  return io;
};
export { socketio, clients };
