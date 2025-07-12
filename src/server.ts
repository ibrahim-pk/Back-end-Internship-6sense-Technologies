/* eslint-disable no-console */
import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import { errorlogger, logger } from './shared/logger';
import dotenv from 'dotenv'

dotenv.config()


process.on('uncaughtException', error => {
  errorlogger.error(error);
  process.exit(1);
});

let server: Server;

async function RUN() {
  try {



    await mongoose.connect(process.env.database_url as string);
    console.log("Database is connected successfully");

    server = app.listen(process.env.port, () => {
      console.log(`Application  listening on port ${process.env.port}`);
      logger.info("server is running")
    });
  } catch (error) {
    errorlogger.error('Failed to connect database', error);
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        errorlogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

RUN();

process.on('SIGTERM', () => {
  logger.info('SIGTERM is received');
  if (server) {
    server.close();
  }
});
