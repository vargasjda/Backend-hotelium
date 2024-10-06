import { jwtVerify, } from '../services/auth.service.js';

export async function auth(req, res, next) {
  const authorization = req.headers.authorization;
  if (!authorization) return res
    .status(401)
    .json({
      success: false,
      message: 'No hay cabecera de autorizacion',
    });

  const fragments = authorization.split(' ');
  const [ tokenType, token, ] = fragments;
  if (tokenType !== 'Bearer') return res
    .status(401)
    .json({
      success: false,
      message: 'Tipo del token invalido',
    });

  if (!token) return res
    .status(403)
    .json({
      success: false,
      message: 'No hay token',
    });

  const verified = jwtVerify(token);
  if (!verified) return res
    .status(403)
    .json({
      success: false,
      message: 'Token invalido',
    });

  req.userId = verified.sub;
  
  next();
}