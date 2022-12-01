import { Injectable } from '@nestjs/common';

@Injectable()
export class EventService {
  private database: Map<string, Map<string, number>>;

  constructor() {
    this.database = new Map();
  }

  public ingestEvents(events: {}): void {
    for (const [idx, event] of Object.entries(events)) {
      this.ingestEvent(event);
    }
  }

  private ingestEvent(event: {}): void {
    let customerData = this.database.get(event["customer_id"]);
    if (customerData === undefined || customerData === null) {
      customerData = new Map();
      this.database.set(event["customer_id"], customerData);
    }

    const date = new Date(event["timestamp"]);
    const bucket = this.getBucket(date);
    customerData.set(bucket, (customerData.get(bucket) ?? 0) + 1);
  }

  private getBucket(date: Date): string {
    return `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}-${date.getUTCHours()}`;
  }

  public getEvents(customerId: string, startTime: string, endTime: string): Map<string, number> {
    const events = new Map();

    if (!this.database.has(customerId)) {
      return events;
    }

    const startDate = new Date(parseInt(startTime));
    const endDate = new Date(parseInt(endTime));

    if (startDate > endDate) {
      throw new Error("InvalidRequestException: Start Date must be earlier than End Date");
    }

    let startBucket = this.getBucket(startDate);
    const endBucket = this.getBucket(endDate);
    const buckets = [];

    while (startBucket != endBucket) {
      buckets.push(startBucket);
      startDate.setHours(startDate.getHours() + 1);
      startBucket = this.getBucket(startDate);
    }
    
    const customerData = this.database.get(customerId);
    
    buckets.forEach((bucket) => {
      if (customerData.has(bucket)) {
        events.set(bucket, customerData.get(bucket));
      }
    })
    return events;
  }
}
