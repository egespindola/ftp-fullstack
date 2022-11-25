import { Controller, Get, Query } from '@nestjs/common';
import { BasicFtpService } from './basic-ftp.service';

@Controller('basic-ftp')
export class BasicFtpController {
  constructor(private readonly basicFtpService: BasicFtpService) {}

  @Get('/upload')
  async getUpload(){
    return this.basicFtpService.upload();
  }

  // @Get('/download')
  // async getDownload(){
  //   return this.basicFtpService.download();
  // }
  @Get('/tst')
  async tst(@Query() query: any): Promise<any>{
    return this.basicFtpService.tstDownload();
  }

  @Get('/download')
  async getDownload(@Query() query: any): Promise<any>{
    return this.basicFtpService.download(query);
  }

  @Get('/delete')
  async getDelete(){
    return this.basicFtpService.delete();
  }

  @Get('/mkdir')
  async getMkdir(@Query() dirName: string): Promise<any>{
    return this.basicFtpService.createDir(dirName);
  }
  
  // @Get('/mkdir')
  // async getMkdir(){
  //   return this.basicFtpService.createDir();
  // }
  
  @Get('/list')
  async getList(){
    return this.basicFtpService.list();
  }
}
