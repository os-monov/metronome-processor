## Installation

```bash
$ npm install
```

## Start the Server

Note: The server will automatically pull the events & process them on startup.

```
npm run start
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)


## Challenge

Your task is to write a program that answers the following question:

> How many events did customer X send in the one hour buckets between timestamps A and B. 

So, for example, let's say you have the following usage events for a single customer:

- Mar 1 3:01 am event_1
- Mar 1 4:29 am event_2
- Mar 1 4:15 am event_3
- Mar 1 5:08 am event_4

If you sent start and end timestamps of Mar 1 3:00 am - Mar 1 6:00 am, we’d expect to see these output values (format is up to you):
- Mar 1 3:00 am bucket -> 1
- Mar 1 4:00 am bucket -> 2
- Mar 1 5:00 am bucket -> 1

## Example Requests

```
curl -X GET "http://localhost:3000/events?customerId=b4f9279a0196e40632e947dd1a88e857&startTime=1614557100000&endTime=1614729900000"
curl -X GET "http://localhost:3000/events?customerId=b4f9279a0196e40632e947dd1a88e857&startTime=1614776700000&endTime=1614863100000"
curl -X GET "http://localhost:3000/events?customerId=1abb42414607955dbf6088b99f837d8f&startTime=1614557100000&endTime=1614578700000"
curl -X GET "http://localhost:3000/events?customerId=009b178fa33bd5d0459d8b2cb825f9f4&startTime=1614564300000&endTime=1616983500000"

```

## Note

Got bit by this really dumb JS syntax -- https://stackoverflow.com/questions/13359294/date-getday-javascript-returns-wrong-day

Wasted a lot of time debugging this.


## License

Nest is [MIT licensed](LICENSE).
