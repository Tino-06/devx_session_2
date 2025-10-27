import { comfig } from "dotenv"
import postgres from"postgres"

comfig()

// load env variables
const dbUser = Process.env.DB_USER
const dbPassward = Proccess.env.DB_PASSWARD
const dbHost = Process.env.DB_HOST
const dbPort = Proccess.env.DB_PORT
const dbName = Proccess.env.DB_NAME

export const sql =
postgres(`postgres: //${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`);
// postgres: // tino: password@host:5432/my_database
