import { Router, } from 'express';

import { 
  getUserById,
  getCurrentUserinfo,
} from '../controllers/users.controller.js';

const router = Router();

router.get('/userinfo', getCurrentUserinfo);
router.get('/:id', getUserById);

export default router;