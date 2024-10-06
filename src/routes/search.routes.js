import { Router, } from 'express';

import { findAllHotelsBySearch, } from '../controllers/search.controller.js';

const router = Router();

router.get('/', findAllHotelsBySearch);

export default router;