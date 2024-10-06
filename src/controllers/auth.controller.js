import { v4, } from 'uuid';

import { 
  hashPassword, 
  jwtEncode, 
  verifyPassword, 
} from '../services/auth.service.js';
import {
  User,
} from '../database/models/index.js';

export async function createLogin(req, res) {
  // Paso 1. Obtener los datos. 
  const {
    email,
    password,
  } = req.body;

  // Paso 2. Validar la informacion.
  if (!email || !password) return res
    .status(401)
    .json({
      success: false,
      message: 'Faltan datos requeridos',
    });
  
  // Paso 3. Verificar que el usuario exista.
  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (!user) return res
    .status(401)
    .json({
      success: false,
      message: 'El usuario no existe',
    });
  
  // Paso 4. Verificar la contraseña
  const passwordVerified = await verifyPassword(password, user.password);
  if (!passwordVerified) return res
    .status(401)
    .json({
      success: false,
      message: 'Credenciales incorrectas',
    });

  // Paso 5. Generar un token de acceso.
  const now = new Date();

  const TWO_HOURS_IN_MS = 60 * 60 * 2;  // 2 horas de caducidad
  const expiresIn = Math.floor(now.getTime() / 1000) + TWO_HOURS_IN_MS;
  const issuedAt = Math.floor(now.getTime() / 1000);

  // Claims standard: sub, exp, iat, iss
  const payload = {
    sub: user.id, // Subject es el usuario
    exp: expiresIn, // Expiration es la caducidad
    iat: issuedAt, // Fecha de emision
    iss: process.env.JWT_ISSUER, // Quien emitio el token (servidor).
  };
  
  const token = jwtEncode(payload);

  return res
    .status(200)
    .json({
      success: true,
      data: {
        token,
        expiresIn,
      },
    });
}

export async function createSignup(req, res) {
  // Paso numero 1. Recibir los datos necesarios para el registro.
  const {
    email,
    password,
    givenName,
    lastName,
  } = req.body;

  // Paso numero 2. Validar los datos que entran.
  if (!email || !password || !givenName || !lastName) return res
    .status(401)
    .json({
      success: false,
      message: 'Faltan campos requeridos.',
    });

  if (!email.includes('@') || !email.includes('.')) return res
    .status(400)
    .json({
      success: false,
      message: 'El email es invalido',
    });

  // Contraseña sea mayor a 8 caracteres
  if (password.length < 8) return res
    .status(400)
    .json({
      success: false,
      message: 'La contraseña debe tener minimo 8 caracteres',
    });

  // SELECT * FROM Users WHERE email = "...";
  // Paso 3. Consultar que el usuario no exista.
  const user = await User.findOne({
    where: {
      email,
    },
  }); // User | false | null | undefined

  if (user) return res
    .status(400)
    .json({
      success: false,
      message: 'El usuario ya existe.',
    });

  // Paso 4. Encriptar la contrasena.
  const passwordHash = await hashPassword(password);

  // Paso 5. Crear el usuario en base de datos
  const created = await User.create({
    id: v4(),
    email,
    password: passwordHash,
    givenName,
    lastName,
  });

  if (!created) return res
    .status(500)
    .json({
      success: false,
      message: 'El usuario no se pudo crear',
    });

  return res
    .status(201)
    .json({
      success: true,
      message: 'El usuario se ha creado',
    });
}