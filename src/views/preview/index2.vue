<template>
    <div>
        <!-- <input type="file" ref="fileinput" @change="uploadFile" />
        <div ref="canvasCont">
            <canvas v-for="index in canvasTotalPage" :id="`myVancas${index}`" :key="index"></canvas>
        </div> -->
        <a-button type="primary" @click="showModal">Open Modal</a-button>
        <a-modal
            v-model:visible="visible"
            width="100%"
            wrap-class-name="full-modal"
            title="Basic Modal"
            @ok="handleOk"
        >
            <template #title>
                <div
                    style="position: fixed; bottom: 0; left: 50%; margin-left: -50px; width: 100px"
                >
                    <a-button key="back" @click="visible = false">关闭1231</a-button>
                </div>
            </template>
            <input id="fileinput" type="file" @change="uploadFile" />
            <div id="canvasCont">
                <canvas
                    v-for="index in canvasTotalPage"
                    :id="`myVancas${index}`"
                    :key="index"
                ></canvas>
            </div>

            <template #footer>
                <div
                    style="position: fixed; bottom: 0; left: 50%; margin-left: -50px; width: 100px"
                >
                    <a-button key="back" @click="visible = false">关闭</a-button>
                </div>
            </template>
        </a-modal>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import * as pdfjsLib from 'pdfjs-dist/build/pdf';
pdfjsLib.GlobalWorkerOptions.workerSrc =
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.min.js';

/**
 * pdf下载以及加载函数(异步)
 */
const pdfLoadTask = ref();

/**
 * 需要绘制pdf的总页数
 */
const canvasTotalPage = ref<number>(1);

/**
 * 上传pdf文件
 */
function uploadFile() {
    // 获取到上传文件input组件的dom实例
    const file = document.getElementById('fileinput').files[0];

    // FileReader是一个强大的读取文件的api
    const reader = new FileReader();

    // 将文件内容转换为base64编码的url，方便pdfjs-dist插件获取资源
    reader.readAsDataURL(file);

    // FileReader读取文件完成后触发，此时拿到base64编码的url了
    reader.onload = () => {
        // 直接用atob代码ts会报错，因为网上说这个已经弃用了，但是在代码里面还是能用，不过ts会报错
        const data = window.atob(reader.result.substring(reader.result.indexOf(',') + 1));
        loadPdfData(data);
    };
}

function loadPdfData(data) {
    // 引入pdf.js的字体
    const CMAP_URL = 'https://unpkg.com/pdfjs-dist@2.0.943/cmaps/';

    pdfLoadTask.value = pdfjsLib.getDocument({
        data: data,
        cMapUrl: CMAP_URL,
        cMapPacked: true,
    });
    renderPage(pdfPageNumber.value);
}

const pdfPageNumber = ref(1);

const width = ref('');
const height = ref('');

const pageNo = ref(null);

function renderPage(num) {
    pdfLoadTask.value.promise.then((pdf) => {
        canvasTotalPage.value = pdf.numPages;

        pdf.getPage(num).then((page) => {
            console.log(num);
            console.log(page);

            // 获取DOM中为预览PDF准备好的canvasDOM对象
            const canvas: any = document.getElementById(`myVancas${num}`);
            const ctx = canvas.getContext('2d');

            // 获取页面比率
            const ratio = _getRatio(ctx);

            // 根据页面宽度和视口宽度的比率就是内容区的放大比率
            const dialogWidth = document.getElementById('canvasCont')!.offsetWidth;

            const pageWidth = page.view[2] * ratio;
            const scale = dialogWidth / pageWidth;
            const viewport = page.getViewport({ scale });

            // 记录内容区宽高，后期添加水印时需要
            width.value = viewport.width * ratio;
            height.value = viewport.height * ratio;

            canvas.width = width.value;
            canvas.height = height.value;

            // 缩放比率
            ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

            const renderContext = {
                canvasContext: ctx,
                viewport: viewport,
            };

            page.render(renderContext).promise.then(() => {
                pageNo.value = num;

                // 添加水印
                _renderWatermark(num);
            });

            if (num < pdf.numPages) {
                renderPage(num + 1);
            }
        });
    });
}
// 在画布上渲染水印
function _renderWatermark(num) {
    const canvas: any = document.getElementById(`myVancas${num}`);
    const ctx = canvas.getContext('2d');
    // 平铺水印
    const pattern = ctx.createPattern(_initWatermark(), 'repeat');
    ctx.rect(0, 0, width.value, height.value);
    ctx.fillStyle = pattern;
    ctx.fill();
}

// 生成水印图片
function _initWatermark() {
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 200;
    const ctx = canvas.getContext('2d');
    ctx.rotate((-18 * Math.PI) / 180);
    ctx.font = '14px Vedana';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText('我是水印', 50, 50);
    return canvas;
}

// 计算角度
function _getRatio(ctx) {
    const dpr = window.devicePixelRatio || 1;
    const bsr =
        ctx.webkitBackingStorePixelRatio ||
        ctx.mozBackingStorePixelRatio ||
        ctx.msBackingStorePixelRatio ||
        ctx.oBackingStorePixelRatio ||
        ctx.backingStorePixelRatio ||
        1;
    return dpr / bsr;
}


const visible = ref<boolean>(false);


function showModal() {
    visible.value = true;
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
