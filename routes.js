import { GetAdmins } from './controllers/admins';
import { Login, CreateAccount } from  './controllers/auth';

import Authenticate from './middlewares/auth';

export default (router) => {
  //Admins
  router.get('/admins', Authenticate, GetAdmins); //If user is logged in.

  // Auth
  router.post('/login', Login);
  router.get('/register', CreateAccount);
}
