import { getConnection } from 'typeorm';
import { okResponse, unauthorizedAccess, serverError } from '../libs/Responses';
const GetAdmins = async (req, res) => {
  try {
    const orm = getConnection();
    const data = await orm.getRepository('Admin').find(
      {
        // select: ['name', 'username'],
        // where: {
        //   username: "Amir"
        // }
      }
    );

    console.log("Data: ", data);
    return okResponse(res, data, "List of admins found.");
  } catch (error) {
    return serverError(res, error);
  }
}

export {
  GetAdmins
}
