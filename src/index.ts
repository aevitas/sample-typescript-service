require("dotenv").config();

import * as http from "http";
import { Service } from "./service";

const debug = require("debug")("server");

debug("fuck yo couch");

const service = new Service();
const listenPort = process.env.PORT || 5000;

// Ports can not exceed 0xFFF, i.e. ushort.MaxValue, or 65535. Also they can't be negative, obviously.
if (listenPort < 0 || listenPort > 65535) {
    throw new Error();
}

service.express.set("port", listenPort);

const server = http.createServer(service.express);

server.on("listening", () => {
    debug(`Server is now listening on port ${listenPort}`);
});

server.on("error", error => {
    debug(`An error occurred: ${error.message}`);
});

server.listen(listenPort);
