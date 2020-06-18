//@ts-check
import colors from 'colors';
import { createConnections } from 'typeorm';

const DEFAULT_CONNECTION = 'local';
import { get } from 'lodash';

class Database {
  static init({ config }) {
    return new Promise ((resolve, reject) => {
      this.config = config;
      this.connections = {};

      Database.createConnection()
        .then(resp => {
          resolve(true);
        })
        .catch(err => {
          reject(err);
        })
    });
  }


  static createConnection() {
    return new Promise ((resolve, reject) => {
      const connectionName = process.env.NODE_ENV || DEFAULT_CONNECTION;
      const connections = this.config[connectionName];
      console.log("Connections: ", connections);
      createConnections(connections)
        .then(resp => {
          console.info("[!] Successfully connected to the Database.".green);
          resolve(true);
        })
        .catch(err => {
          console.log("[*] ERROR: Unable to connect the Database.".red);
          console.error(colors.red(err));
          reject(err);
        });

    });
  }
}

export default Database;