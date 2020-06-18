
import Database from './Database';
import Authenticator from './Authenticator';

class App {
  constructor({ config }) {
    console.log("Config: ", config);
    this.config = config;
    this.databaseConfig = this.config.database;
    //if Auth file is exported. Pass it to `Authenticator`
		if (this.config.auth) {
			Authenticator.init({config: this.config.auth});
		}

  }

  /**
   * Initializing Server
   * @public
   * 
   * @memberof App
   * 
   * @author Mohammed Sufyan
   * 
   * @return {boolean} 
   */
  async init() {
    //check the config
    try {
      //If DatabaseConfig is specified then init.
      this.databaseConfig ? await Database.init({ config: this.databaseConfig }) : false;

      //Add Multiple services here
    } catch (error) {
      console.log("[App.js][init] ERROR: ", error);
    }
  }
}
export default App;