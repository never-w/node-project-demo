const dotenv = require("dotenv")
const path = require("path")
const fs = require("fs")

const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, "./keys/private.key"))
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, "./keys/public.key"))

dotenv.config()

const { APP_PORT } = process.env

module.exports = {
  APP_PORT,
  PUBLIC_KEY,
  PRIVATE_KEY,
}
