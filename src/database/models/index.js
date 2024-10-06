import { User, } from './user.model.js';
import { Room, } from './room.model.js';
import { Hotel, } from './hotel.model.js';
import { Reservation, } from './reservation.model.js';

// Uno a muchos en sequelize
Hotel.hasMany(Room);
Room.belongsTo(Hotel);

// Muchos a muchos en sequelize
User.belongsToMany(Room, {
  through: {
    model: Reservation,
    unique: false,
  },
});
Room.belongsToMany(User, {
  through: {
    model: Reservation,
    unique: false,
  },
});

User.sync({
  // force: true,
});

Hotel.sync({
  // force: true,
});

Room.sync({
  // force: true,
});

Reservation.sync({
  // force: true,
});

export {
  Room,
  User,
  Hotel,
  Reservation,
};