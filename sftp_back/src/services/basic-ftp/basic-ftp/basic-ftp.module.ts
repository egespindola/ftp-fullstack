import { Module } from '@nestjs/common';
import { BasicFtpController } from './basic-ftp.controller';
import { BasicFtpService } from './basic-ftp.service';

@Module({
  controllers: [BasicFtpController],
  providers: [BasicFtpService]
})
export class BasicFtpModule {}
