import { Injectable } from '@nestjs/common';
import * as Client from 'ssh2-sftp-client'
import * as fs from 'fs'
// import { FtpConfig } from './../utils/ftp-config'

@Injectable()
export class BasicFtpService {
      
    ftpConfig(){
      return {            
        host: process.env.FTP_DNS,
        user: process.env.FTP_USER,
        port: process.env.FTP_PORT,
        password: process.env.FTP_PASSW,
        secure: true
      }
    }

    async  upload() {
      const PATHDIR = process.env.FTP_MAINDIR
      const LOCALFILE = 'C:/Workspace/develop/upload/tst.pdf'
      console.log(process.env.FTP_DNS)
      console.log(process.env.FTP_USER)
      console.log(process.env.FTP_PASSW)
      console.log(process.env.FTP_PORT)
      // client.ftp.verbose = true
      
      const config = this.ftpConfig()
      let sftp = new Client;

      // const response = sftp.connect(config).then(() => {
      const response = sftp.connect(config).then(() => {
        return sftp.cwd();
      }).then(p => {
        console.log(`Remote working directory is ${p}`);
        return sftp.put(LOCALFILE, `${PATHDIR}tst.pdf`);
      }).then(() => {
        console.log(`end`);
        return sftp.end();
      })
      .catch(err => {
        console.log(`Error: ${err.message}`); 
        return err
      });

      // await client.ensureDir("/mnt/hd02/ftp/ms_ftp")
      // await client.uploadFrom("README.md", "process.env.FTP_MAINDIRREADME_FTP.md")        
      
      return response
      // return  response ? 'Uploaded successfully' : response.message

    }

  async download(params: any): Promise<any>{
    let client = new Client();
    console.log(params)
    const { fileName, pathDst} = params;
    let remotePath = `${process.env.FTP_MAINDIR}/${fileName}`;
    let dst = fs.createWriteStream(`${pathDst}/${fileName}`);

    // let remotePath = `${process.env.FTP_MAINDIR}/test-ftp.txt`;
    // let dst = fs.createWriteStream('C:/Workspace/develop/test-ftp-downloaded11.txt');
    
    const config = this.ftpConfig()

    console.log('////////////////////////////////////////////')
    console.log(pathDst)
    console.log(fileName)
    console.log("remote path>>>")
    console.log(remotePath)
    console.log("destination")
    console.log(dst)

     const response = await client.connect(config)
      // .then(() => {
      //   return client.cwd()
      // })
      .then(d => {
        console.log('\x1b[36m%s\x1b[0m', `RemDir -> ${d}`); 
      })
      .then(() => {
        console.log('\x1b[36m%s\x1b[0m', 'first then ok')
        return client.get(remotePath, dst);
      })
      .then(() => {
        console.log('\x1b[36m%s\x1b[0m', 'second then ok (close conn)')
        return client.end();
      })
      .catch(err => {
        console.log('<<<<<<<<<<<<<<<<<<<<<<<<catch block')
        console.error(err.message);    
        return err.message    
      });

      console.log('>>>>>>>>')
      console.log(response)
      return  response ? 'download process finished' : response
  }

  async delete(){
    let remoteFile = `${process.env.FTP_MAINDIR}/test-ftp11.txt`;
    let client = new Client();

    const config = this.ftpConfig()

    const response = await client.connect(config)
      .then(() => {
        return client.delete(remoteFile);
      })
      .then(() => {
        client.end();
        return 'OK'
      })
      .catch(err => {
        console.error(err);
        return err.message;
      });

      return response
  }

  async createDir(dirName: string): Promise<any>{
    // let dirName = 'dirTst'
    let newDirName = Object.values(dirName)
    let remoteDir = process.env.FTP_MAINDIR;
    let client = new Client();

    const config = this.ftpConfig()

    const response = client.connect(config)
      .then(() => {
        console.log(remoteDir+'/'+newDirName)
        return client.mkdir(remoteDir+'/'+newDirName, true);
      })
      .then(() => {
        return client.end();
      })
      .catch(err => {
        console.error(err.message);
        return err
      });

      return response ? `Directory ${newDirName} created successfully` : response.message
  }

  async list(){

    const config = this.ftpConfig()

    let sftp = new Client;

    const response = await sftp.connect(config)
      .then(() => {
        return sftp.list(process.env.FTP_MAINDIR);
      })
      .then(data => {
        console.log(data)
        return data;
      })
      .then((d) => {
        sftp.end()
        return d
      })
      .catch(err => {
        console.error(err.message);
        return err
      });

      return response;
  }

  async tstDownload(){
    let client = new Client();
    let remotePath = `${process.env.FTP_MAINDIR}FILE20mb.rar`;
    let dst = fs.createWriteStream('C:/Workspace/develop/test-ftp-downloaded21.txt');
    
    const config = this.ftpConfig()

     const response = await client.connect(config)
      .then(d => {
        console.log('\x1b[36m%s\x1b[0m', `RemDir -> ${d}`); 
      })
      .then(() => {
        return client.on('download', info => {
          console.log(`Listener: Download ${info.source}`);
        });

      })
      .then(() => {
        console.log('\x1b[36m%s\x1b[0m', 'first then ok')
        return client.get(remotePath, dst);
      })
      .then(() => {
        console.log('\x1b[36m%s\x1b[0m', 'second then ok (close conn)')
        return client.end();
      })
      .catch(err => {
        console.log('<<<<<<<<<<<<<<<<<<<<<<<<catch block')
        console.error(err.message);    
        return err.message    
      });

      console.log('>>>>>>>>')
      console.log(response)
      // return  response ? 'download process finished' : response
      return  response 
      
  }

}
