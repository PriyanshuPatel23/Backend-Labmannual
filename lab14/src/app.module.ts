import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { RoutingController } from './routing.controller.js';


import { StudentModule } from './student.module';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    StudentModule,
    // Distributed tracing, auto-correlated logs, request/job metrics, error
    // telemetry, alarms, and more — out of the box. Sign up at https://observe.nestjs.com
    ObserveModule.forRoot({
      appKey: 'YOUR_APP_KEY',
      appSecret: 'YOUR_APP_SECRET',
      serviceId: 'lab14',
    }),
  ],
  controllers: [AppController, RoutingController],
  providers: [AppService],
})
export class AppModule { }
