<template>
  <div id="app">
    <div class="header"></div>
    <div class="div-message" v-if="opMsg">
        <span>{{opMsg}}</span>
    </div>
    <div class="container">
      <div class="main-content">
          <div class="ipt-grp">
            <div id="ipt-download">
              <h3>🔥Download a file</h3>
              <label for="ipt-txt" title="a text...">Path: </label>
              <input type="text" name="ipt-txt"  v-model="path" />
              <br>
              <br>
              Path: <strong>{{path}} </strong> <br>
              File: <strong>{{ fileNameDown}}</strong>
              <br><br>
            </div>
            <div id="ipt-mkdir">
              <h3>🔥Create a dir</h3>
              <label for="ipt-txt-mkdir" title="Directory Name">Dir Name: </label>
              <input type="text" name="ipt-dirName"  v-model="dirName"  placeholder="new directory name"/>
              <button type="button" title="Create a new dir in remote srv" @click="handleCreate">Create</button>
              <br>
              Path: <strong>/mnt/hd02/ftp/ms_ftp/{{dirName}} </strong> <br>
              <input type="file">
              <br><br>
            </div>
            <anexos-arquivos></anexos-arquivos>
          </div>


          <div class="grt-pipe"></div>
          <div class="grp-list">
            <button @click="handleList">List</button>
            <div class="loadMsg" v-if="load">{{msgLoading}}</div>
            <div>
              <draggable v-model="fileList" group="files" @start="drag=true" @end="drag=false">
                <div class="div-list" v-for="(file,ix) in fileList" :key="ix" @click="handleDownload(file.name)">
                  {{file.name}}
                  <div class="div-downfile"></div>
                </div>
              </draggable>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import draggable from 'vuedraggable'
import AnexosArquivos from '@/components/AnexosArquivos.vue'


export default {
  name: 'App',
  components: {draggable, AnexosArquivos},
  data(){
    return {
      fileList: [],
      load: false,
      path: 'C:/Workspace/develop/',
      dirName: '',
      fileNameDown: '',
      msgLoading: 'Loading . . .',
      opMsg: '',
    }
  },
  methods:{
    async handleList(){
      /* axios config */
      this.load = true;
      axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
      const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      };
      const AXIOS = axios.create({
        baseURL: 'http://localhost:8000/basic-ftp/list',
        timeout: 100000,
        headers: headers,
      })

      //  const BASEURL = 'http://localhost:8000/basic-ftp/list'
      await AXIOS.get()
        .then(res => {
          console.log(res);
          this.fileList = res.data
        })
        .catch(err => {          
          console.log(err);
        })
        .then(() => {
          console.log("finished")
          this.load = false;
        });
    },

    async handleDownload(file) {
      this.fileNameDown = file
      console.log(file)

      axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
      const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      };
      const AXIOS = axios.create({
        baseURL: 'http://localhost:8000/basic-ftp',
        timeout: 100000,
        headers: headers,
      })
      const fileName = file
      const pathDst = this.path;
      await AXIOS.get('/download', {params: {fileName, pathDst}})
        .then(res => {
          console.log(res)
          this.opMsg = res.data            
          setTimeout(() => {
            this.opMsg = ''
          }, 3000);
        })
        .catch(err => {          
          console.log(err)
          this.opMsg = err
          setTimeout(() => {
            this.opMsg = ''
          }, 3000);
        })
        .then(() => {
          console.log("finished")
        });
    },

    async handleCreate(){
      
      axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
      const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      };
      const AXIOS = axios.create({
        baseURL: 'http://localhost:8000/basic-ftp',
        timeout: 100000,
        headers: headers,
      })
      let dirName = this.dirName
      console.log(dirName)
      await AXIOS.get('/mkdir', {params: {dirName}})
        .then(res => {
          console.log(res)
          this.opMsg = res.data            
          setTimeout(() => {
            this.opMsg = ''
          }, 3000);
        })
        .catch(err => {          
          console.log(err)
          this.opMsg = err
          setTimeout(() => {
            this.opMsg = ''
          }, 3000);
        })
        .then(() => {
          console.log("finished")
        });
    }

  }
}
</script>

<style scoped>
.header {
  height: 60px;
  margin-bottom: 16px;
  background: linear-gradient(to right, black 0%, darkblue 25%, blue 50%, lightblue 75%, white 100%);
}

.container {
  padding: 16px;
  height: 100vw;
  width: 100%;
  border: 1px solid black;
}

.main-content {
  height: 100%;
  padding: 8px;

  display: flex;
  justify-content: center;
  align-items: center;
  
}

.ipt-grp, .grp-list{
  height: 100%;
  width: 50%;
  border: 1px solid linear-gradient(to right,#333, #333 50%, #eee 75%, #333 75%);
}

.ipt-grp{
  /* background-color: red; */  
  margin-right: 8px;
}

.grp-list {
  /* background-color: yellow; */
  margin-left: 8px;
}

.grt-pipe{
  width: 1px;
  height: 100%;
  background: linear-gradient(black 0%, darkblue 15%, blue 35%, lightblue 55%, white 100%);
}

.loadMsg {
  margin-top: 24px;
}

.div-list {
  display: flex;
  justify-content: space-between;

  border: 1px solid #414141;
  border-radius: 5px;
  background: linear-gradient(90deg, rgba(51,0,153,0.2766281512605042) 0%, rgba(0,51,255,0.5671043417366946) 59%,rgba(0,102,255,0.6671043417366946) 89%);
  
  /* background: linear-gradient(to right, black 0%, darkblue 15%, blue 35%, lightblue 55%, white 100%); */
  /* background: linear-gradient(#e66465, #9198e5); rgba(51,0,153,0.2) (*/ 
  color: #414141;
  font-weight: 900;

  padding: 8px;
  margin: 8px;
}

.div-downfile{
  width: 16px;
  height: 16px;
  border-radius: 2px 2px 16px 16px;
  background-color: #fff;
}

.div-message {
  background-color: green;
  color: white;
}

#ipt-mkdir{
  border-top: 1px solid #414141;
}

button {
  margin-left: 4px;
  border-radius: 6px;
  border: 2px solid #05db18;
  color: #fff;
  background-color: darkcyan;
  padding: 2px 16px; 
}

</style>
