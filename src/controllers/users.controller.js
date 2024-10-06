import { User, } from '../database/models/index.js';

export async function getCurrentUserinfo(req, res) {
  const userId = req.userId;
  if (!userId) return res
    .status(401)
    .json({
      success: false,
      message: 'No se pudo obtener el id del usuario',
    });

  try {
    const user = await User.findOne({
      attributes: ['id', 'email', 'givenName', 'lastName', 'phoneNumber', 'address', 'createdAt', 'updatedAt'],
      where: {
        id: userId,
      },
    });

    if (!user) return res
      .status(404)
      .json({
        success: false,
        message: 'No se pudo encontrar el usuario',
      });
    
    return res
      .status(200)
      .json({
        success: true,
        data: user.dataValues,
      })
  } catch (err) {
    return res
      .status(400)
      .json({
        success: false,
        message: 'Algo salio al obtener la informacion del usuario',
      });
  }
}

export async function getUserById(req, res) {
  const { id, } = req.params;
  if (!id) return res
    .status(400)
    .json({
      success: false,
      message: 'Falta el id del usuario',
    });

  try {
    const user = await User.findOne({
      where: {
        id,
      }
    });

    if (!user) return res
      .status(404)
      .json({
        success: false,
        message: 'El usuario no ha sido encontrado',
      });

    const userResponse = {
      ...user.dataValues,
    };

    delete userResponse.password;
    
    return res
      .status(200)
      .json({
        success: true,
        data: userResponse,
      })
  } catch (err) {
    return res
      .status(500)
      .json({
        success: false,
        message: 'Algo salio mal',
      });
  }
}