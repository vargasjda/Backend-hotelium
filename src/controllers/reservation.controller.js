import { v4, } from 'uuid';
import { 
  Room, 
  Reservation,
  User,
} from '../database/models/index.js';

export async function createReservation(req, res) {
  const {
    startDate,
    endDate,
    nightsQuantity,
    roomId,
  } = req.body;

  const userId = req.userId;
  if (!userId) {
    return res
      .status(400)
      .json({
        success: false,
        message: 'El usuario de la reserva no existe',
      });
  }
	// "startDate": "2024-08-01T00:00:00.000Z",
  // "endDate": "2024-08-03T00:00:00.000Z",

  try {
    if (nightsQuantity <= 0) {
      return res
        .status(400)
        .json({
          success: false,
          message: 'Nights cannot be less than 1',
        });
    }

    const room = await Room.findOne({
      where: {
        id: roomId,
      },
    });

    // TODO: validar el rango de fechas, en caso de que la
    // reserva ya este hecha en ese rango, no se puede realizar.

    const reservation = await Reservation.create({
      id: v4(),
      startDate,
      endDate,
      nightsQuantity,
      total: (room?.pricePerNight * nightsQuantity),
      userId: userId,
      roomId: roomId,
    });

    return res
      .status(201)
      .json({
        success: true,
        message: 'Reserva creada',
        data: reservation,
      });
  } catch (err) {
    return res
      .status(400)
      .json({
        success: false,
        message: `Something went wrong. Error: ${err.message}`,
      });
  }
}

export async function getAllReservations(req, res) {
  const userId = req.userId;

  try {
    const userReservations = await User.findAll({
      include: [
        {
          model: Room,
        },
      ],
      where: {
        id: userId,
      },
    });

    if (!userReservations) return res
      .status(404)
      .json({
        success: false,
        message: 'El usuario no tiene reservaciones',
      });
    
    return res
      .status(200)
      .json({
        succes: true,
        data: userReservations,
      });
  } catch (err) {
    return res
      .status(500)
      .json({
        succes: false,
        message: 'Algo salio mal',
      });
  }
}