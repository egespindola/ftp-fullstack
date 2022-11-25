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


<style>
</style>