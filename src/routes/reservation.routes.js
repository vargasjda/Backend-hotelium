import { Router, } from 'express';

import {
  createReservation,
  getAllReservations,
} from '../controllers/reservation.controller.js';

const router = Router();

router.get('/', getAllReservations);

router.post('/', createReservation);

export default router;