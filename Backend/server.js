const dotenv = require("dotenv");
dotenv.config();
const http = require("http");
const app = require("./app");
const connectDB = require("./DB/db");
const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port, () => {
  connectDB();
  console.log(`Server is listening on port ${port}`);
});
