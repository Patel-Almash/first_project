//@ts-check
import { getConnection } from 'typeorm';
import { badRequest, okResponse, serverError, notFound, unauthorizedAccess } from '../libs/Responses';
import Authenticator from '../libs/Authenticator';
import bcrypt from 'bcrypt';

const Login = async (req, res) => {
  const data = req.body;
  console.log("Data: - ", data);
  if (!data.username || !data.password) {
    return badRequest(res, "Invalid arguments passed.");
  }

  const orm = getConnection();
  let token = null;
  try {
    const user = await orm.getRepository('Admin').findOne({
      where: {
        username: data.username
      }
    });
    console.log("User: ", user);
    if (user) {
      const match = await bcrypt.compare(data.password, user.password);
      if (match === true) {
        if (user) {
          token = Authenticator.token({role: 'user', user: {id: user.id, username: user.username, name: user.name}});
        }
        return okResponse(res, {user, token}, 'Logged In!');// res.json({message: 'Logged In!', user, token});
      } else {
        return unauthorizedAccess(res, "Invalid Password!");
      }
    } else {
      return notFound(res, "User not found!");
    }
  
  } catch (error) {
    console.log("ERROR: ", error);
    return serverError(res, error);
  }
}

const CreateAccount = async (req, res) => {
  const password = await bcrypt.hash('123456', 13);
  return okResponse(res, password);
}

export {
  Login,
  CreateAccount
}