import * as express from "express";
import * as logger from "morgan";
import * as bodyParser from "body-parser";

export class Service {

    public express: express.Application;

    public constructor() {
        this.express = express();
        this.configureMiddleware();
        this.configureRoutes();
    }

    private configureMiddleware(): void {
        this.express.use(logger("dev"));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    private configureRoutes(): void {
        const router = express.Router();

        // Every service should have a health endpoint to ensure we can check the service's health
        // using external montoring tools.
        router.get("/health", (_request, response, _next) => {
            response.sendStatus(200);
        });
    }
}
