import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EventService } from './event.service';
import { ValidationPipe } from "@nestjs/common";

const path = require('node:path');
const fs = require('fs');
const csv = require('csvtojson');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // initialize service by processing CSV file
  const filePath = `${process.cwd()}/src/data/events.csv`;

  if (!fs.existsSync(filePath)) {
    throw new Error("Provide valid event data!");
  }

  const events = await csv({
    delimiter: ',',
    alwaysSplitAtEOL: true,
    noheader: true,
    headers: ["customer_id", "event_type", "transaction_id", "timestamp"]
  }).fromFile(filePath);
  const eventService = app.get(EventService);
  eventService.ingestEvents(events);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strips in-bound requests
      transform: true, // types in-bound requests to validation class
    }),
  );
  
  await app.listen(3000);
}
bootstrap();
