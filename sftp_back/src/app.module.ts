
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasicFtpModule } from './services/basic-ftp/basic-ftp/basic-ftp.module';


@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.development.env', isGlobal: true }),
    BasicFtpModule, 
    
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
