import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressModule } from './Address/adress.module';
import { MealModule } from './Meal/meal.module';
import { OrderModule } from './Order/order.module';
import { RestaurantModule } from './Restaurant/restaurant.module';
import { WebsiteModule } from './Website/website.module';
import { configService } from './config.service';
import { ActivitylegalRecordModule } from './ActivityLegalRecord/activity.legal.record.module';
import { MealCategoryModule } from './MealCategory/meal.category.module';
import { AuthModule } from './Auth/auth.module';
import {MulterModule} from "@nestjs/platform-express";
import {AppController} from "./app.controller";
import {AppService} from "./app.service";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
        AddressModule,
        WebsiteModule,
        RestaurantModule,
        OrderModule,
        MealModule,
        ActivitylegalRecordModule,
        MealCategoryModule,
        AuthModule,
        MulterModule.register({
            dest: './files',
        })
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { 
}
