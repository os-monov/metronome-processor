import { Controller, Get, Query, Res } from '@nestjs/common';
import { EventService } from './event.service';
import { IsNotEmpty, IsString, Length } from "class-validator";
import { Response } from "express";

/**
 * GetEvent Request Parameters:
 * 
 * CustomerId: unique id, e.g. "30330c9c4e7173ba9474c46ee5191570"
 * StartTime: epoch time (ms) e.g. "1669767097000"
 * EndTime: epoch time (ms) e.g. "1669767097000" 
 */
export class GetEventParameters {
  @IsString()
  @IsNotEmpty()
  @Length(32)
  customerId: string;

  @Length(13)
  startTime: string;

  @Length(13)
  endTime: string;
}

@Controller()
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get("events")
  getEvents(@Query() parameters: GetEventParameters, @Res() response: Response) {
    let events = this.eventService.getEvents(
      parameters.customerId,
      parameters.startTime,
      parameters.endTime
    );

    const output = {
      "events": Object.fromEntries(events)
    }

    response.json(output);
  }
}
