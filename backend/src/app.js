import express from 'express';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

import logger from './middleware/logger.middleware.js'
import errorMiddleware from './middleware/error.middleware.js';

class App {
    express = null
    port = null

    constructor(controllers = [], port) {
        this.express = express()
        this.port = port

        this.middlewareConfig();
        this.registerRouter(controllers);
        this.errorHandling()
    }

    middlewareConfig() {
        this.express.use(compression());
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: true }));
        this.express.use(cors());
        this.express.use(helmet());
        this.express.use(morgan('dev'));
    }

    registerRouter(controllers = []) {
        controllers.forEach(({ path, routes }) => this.express.use(`/api${path}`, routes))
    }

    errorHandling() {
        this.express.use(errorMiddleware)
    }

    start() {
        this.express.listen(this.port, () => {
            logger.info(`Server running in ${process.env.NODE_ENV} on port ${this.port}`)
        })
    }
}

export default App;
