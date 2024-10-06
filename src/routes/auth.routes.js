import { Router, } from 'express';

import {
  createLogin,
  createSignup,
} from '../controllers/auth.controller.js';

const router = Router();

// /auth/login
router.get('/login/:email', (req, res) => {
  // Forma 1.
  // PArametros de consulta o query params.
  const {
    num1,
    num2
  } = req.query;

  // Path params
  const {
    email,
  } = req.params;

  const result = (+num1 ?? 0) + (+num2 ?? 0);

  // res.send(`Hola mundo! ${param1} ${param2} ${param3}`);
  // res.send(`Hola mundo! ${req.query.param1} ${req.query.param2} ${req.query.param3}`);
  // res.send(`Suma: ${(+num1) + (+num2)}`)
  res.send(`Suma: ${(result)} | email: ${email}`)
});

router.post('/login', createLogin);

// /auth/signup
router.post('/signup', createSignup);

// Paso 1. Exportar el modulo.
export default router;