import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './utils/filters/allExceptions.filter';
import { join } from 'path';
import { AuthMiddleware } from './utils/middleware/jwt.middleware';
import { LoggerMiddleware } from './utils/middleware/logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileModule } from './profile/profile.module';
import { OfferModule } from './offer/offer.module';
import { UserOfferModule } from './user_offer/user_offer.module';
import { LoanModule } from './loan/loan.module';
import { AmortizationModule } from './amortization/amortization.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        process.env.NODE_ENV === 'production' ? '.env.prod' : '.env.dev',
      ],
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Just dev
    }),
    AuthModule,
    ProfileModule,
    OfferModule,
    UserOfferModule,
    LoanModule,
    AmortizationModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'auth/sign', method: RequestMethod.POST },
        { path: 'usuarios/', method: RequestMethod.POST },
      )
      .forRoutes('*');

    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }

}
