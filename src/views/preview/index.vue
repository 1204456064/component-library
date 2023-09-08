<template>
    <div>
        <a-button type="primary" @click="showModal">Open Modal</a-button>

        <a-modal width="100%" wrap-class-name="full-modal" v-model:visible="visible" title="Basic Modal" @ok="handleOk">
            <template #title>
                <div style="position: fixed; bottom: 0; left: 50%;margin-left: -50px;width: 100px;">
                    <a-button key="back" @click="visible = false">关闭1231</a-button>
                </div>
            </template>
            <input type="file" ref="fileinput" @change="uploadFile" />
            <div ref="canvasCont">
                <canvas ref="myVancas" ></canvas>
            </div>
        
            <template #footer>
                <div style="position: fixed; bottom: 0; left: 50%;margin-left: -50px;width: 100px;">
                    <a-button key="back" @click="visible = false">关闭</a-button>
                </div>
            </template>
        </a-modal>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import * as pdfjsLib from "pdfjs-dist/build/pdf";
// import workerSrc from 'pdfjs-dist/build/pdf.worker.entry';
// pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;

const visible = ref<boolean>(false)

const fileinput = ref()

const canvasCont = ref()


const myVancas = ref()

const pdfData = ref(null)

const renderingPage = ref<boolean>(false)

function showModal(){
    visible.value = true
}

function uploadFile(){
    let inputDom = fileinput.value

    let file = fileinput.value.files[0]

    


    let reader = new FileReader()

    reader.readAsDataURL(file)

    reader.onload = ()=>{
        console.log(reader.result);
        
        let data = atob(reader.result.substring(reader.result.indexOf(',') + 1))
        console.log(JSON.parse(decodeURIComponent(encodeURI(data))));
        
        loadPdfData(data)
    }
}

function loadPdfData(data){
    // 引入pdf.js的字体
    let CMAP_URL = "https://unpkg.com/pdfjs-dist@2.0.943/cmaps/";
    pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.min.js";

    pdfData.value = pdfjsLib.getDocument({
        data: data,
        cMapUrl: CMAP_URL,
        cMapPacked: true
    })
    console.log(pdfData.value);
    renderPage(2)
}


const pdfPageNumber  = ref()

const width = ref('')
const height = ref('')

const pageNo = ref(null)

function renderPage(num){

    renderingPage.value = true;
    pdfData.value.promise.then((pdf)=>{
        pdfPageNumber.value = pdf.numPages


        pdf.getPage(num).then((page) => {
              
                // 获取DOM中为预览PDF准备好的canvasDOM对象
                    let canvas = myVancas.value
              let ctx = canvas.getContext('2d')

              // 获取页面比率
                let ratio = _getRatio(ctx);
 
                // 根据页面宽度和视口宽度的比率就是内容区的放大比率
                let dialogWidth = canvasCont.value.offsetWidth;
                let pageWidth = page.view[2] * ratio;
                let scale = dialogWidth / pageWidth;
                let viewport = page.getViewport({ scale });

                // 记录内容区宽高，后期添加水印时需要
                width.value = viewport.width * ratio;
                height.value = viewport.height * ratio;

                canvas.width = width.value;
                canvas.height = height.value;

                // 缩放比率
                ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

                let renderContext = {
                    canvasContext: ctx,
                    viewport: viewport,
                };

                page.render(renderContext).promise.then(() => {
                    renderingPage.value = false;
                    pageNo.value = num;

                    // 添加水印
                    _renderWatermark();
                });

        }
        
    )
})

}
// 在画布上渲染水印
function _renderWatermark() {
    let canvas = myVancas.value;
    let ctx = canvas.getContext("2d");
    // 平铺水印
    let pattern = ctx.createPattern(_initWatermark(), "repeat");
    ctx.rect(0, 0, width.value, height.value);
    ctx.fillStyle = pattern;
    ctx.fill();
}


    // 生成水印图片
function  _initWatermark() {
    let canvas = document.createElement("canvas");
    canvas.width = 200;
    canvas.height = 200;
    let ctx = canvas.getContext("2d");
    ctx.rotate((-18 * Math.PI) / 180);
    ctx.font = "14px Vedana";
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText('我是水印', 50, 50);
    return canvas;
}




// 计算角度
function _getRatio(ctx) {
      let dpr = window.devicePixelRatio || 1;
      let bsr =
        ctx.webkitBackingStorePixelRatio ||
        ctx.mozBackingStorePixelRatio ||
        ctx.msBackingStorePixelRatio ||
        ctx.oBackingStorePixelRatio ||
        ctx.backingStorePixelRatio ||
        1;
      return dpr / bsr;
    }


 // 渲染连续滚动PDF
 function renderScrollPdfPage(num) {
            this.loadingTask.promise.then((pdf) => {
                let numPages = pdf.numPages;
                pdf.getPage(num).then((page) => {
                    // 创建新的canvas
                    let renderContext = this.getRenderContext(num, page);

                    var renderTask = page.render(renderContext);
                    // eslint-disable-next-line @typescript-eslint/no-this-alias
                    let that = this;
                    renderTask.promise.then(function () {
                        console.log('Page rendered');
                        if (num < numPages) {
                            that.renderScrollPdfPage(num + 1);
                        }
                    });
                });
            });
        }
</script>

<style lang="scss">
.full-modal {
  .ant-modal {
    max-width: 100%;
    top: 0;
    padding-bottom: 0;
    margin: 0;
  }
  .ant-modal-content {
    // display: flex;
    // flex-direction: column;
    // height: calc(100vh);
    height: 100vh;
    overflow-y: scroll;
  }
  .ant-modal-body {
    flex: 1;
  }
}
</style>