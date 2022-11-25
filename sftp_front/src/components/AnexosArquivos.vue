<template>
  <div id="AnexosArquivos">
    <div @drop="drop" @dragover="dragOver" @dragleave="dragLeave">
      
      <input type="file" multiple title=" " name="files" id="files" @change="anexarArquivo" ref="file" accept=".zip, .rar, .pdf, .png " />
      <p id="searchFile">
        <i class="far fa-file-alt"></i>
        Arraste arquivos para anexar, ou
        <label for="files">procure</label>
      </p>

      <template>
          <div class="uploadedFile" v-for="(file, i) in fileList" :key="i">
            <div class="img">
                <i class="fas fa-file"></i>
                <!-- <img :src="url[i]" /> -->
            </div>
            <p>{{ file.name }}</p>
            <small @click="confirmDelete(i)">Remover</small>
          </div>
      </template>

    </div>

  </div>
</template>

<script>

export default {  
  name: 'AnexosArquivos',
  data() {
    return {
      fileList: [],
      url: [],
    }
  },
  methods: {
    /* Ações de drags */
    dragOver(event) {
         event.preventDefault();
         const input = document.getElementById('files');
         input.style.zIndex = 999999;
      },
      dragLeave(event) {
         event.preventDefault();
      },
      drop(event) {
         event.preventDefault();
         const input = document.getElementById('files');
         this.$refs.file.files = event.dataTransfer.files;
         this.anexarArquivo();
         input.style.zIndex = -1;
      },
      /* metódos gerais */
      anexarArquivo(){
        for (let i = 0; i < this.$refs.file.files.length; i++) {
          this.url.push(URL.createObjectURL(this.$refs.file.files[i]));
        }
        
        this.fileList.push(...this.$refs.file.files);

      },
      confirmDelete(i) {
        this.url.splice(i, 1);
        this.fileList.splice(i, 1);
        
      }
      
  }
}
</script>


<style scoped>
#AnexosArquivos {
   width: 100%;
   border: 1px dashed gray;
}

#searchFile {
   padding: 1em;
   text-align: center;
}

#searchFile label {
   cursor: pointer;
   text-decoration: underline;
}

.display-flex {
   display: flex;
   flex-wrap: wrap;
}

#files {
   width: 100%;
   opacity: 0;
   position: absolute;
   z-index: -1;
}

.uploadedFile {
   width: 140px;
   height: 140px;
   margin: 10px;
   padding: 15px;
   position: relative;
   border: 1px solid rgba(177, 176, 176, 0.438);
   border-radius: 5px;
   text-align: center;
   line-break: anywhere;
   display: flex;
   flex-direction: column;
   justify-content: center;
}

.uploadedFile:hover {
   cursor: pointer;
   background-color: rgba(230, 230, 230, 0.397);
   -webkit-box-shadow: -1px 2px 16px 2px rgba(0, 0, 0, 0.3);
   box-shadow: 0px 2px 16px 2px rgba(0, 0, 0, 0.3);
}

.uploadedFile .img {
   margin-bottom: 10px;
   text-align: center;
}

.uploadedFile .img img {
   width: 50px;
}

.uploadedFile .img i {
   font-size: 70px;
}
.remover {
   position: absolute;
   color: #bdbdbd;
   font-size: 15px;
   font-weight: bold;
   display: block;
   top: 0;
   right: 1em;
   z-index: 49;
   transition: all 0.3s;
}

.remover::before {
   font-size: 1.5rem;
   content: '\d7';
}

.remover:hover,
.remover:focus {
   color: #212121;
   cursor: pointer;
   text-decoration: none;
}
</style>