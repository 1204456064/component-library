<template>
    <div>
        <input id="fileinput" type="file" @change="uploadFile" />
        <div id="canvasCont">
            <canvas v-for="index in canvasTotalPage" :id="`myVancas${index}`" :key="index"></canvas>
        </div>
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
 * 引入pdf.js的字体，插件无法解析某些特殊字体，所以需要加载特定字体cmap文件
 * 使用cdn的的形式，内网或者没网的时候会失效，建议直接把这个目录下的文件下载到本地，引用本地的资源
 */
const cmapUrl = ref<string>('https://unpkg.com/pdfjs-dist@2.6.347/cmaps/');

/**
 * 上传pdf文件
 */
function uploadFile() {
    // 获取到上传文件input组件的dom实例，实际上用ref也行，但是vue2和vue3使用ref的写法上有区别，就不麻烦搞ref了，统一用id了
    const file = document.getElementById('fileinput').files[0];

    // FileReader是一个强大的读取文件的api，创建一个FileReader实例来读取文件
    const reader = new FileReader();

    // 将文件内容转换为base64编码的url，方便pdfjs-dist插件加载pdf文档
    reader.readAsDataURL(file);

    // FileReader读取文件完成后触发，此时拿到base64编码的url了
    reader.onload = () => {
        // 直接用atob代码ts会报错，因为网上说这个已经弃用了，但是在代码里面还是能用，不过ts会报错
        const data = window.atob(reader.result.substring(reader.result.indexOf(',') + 1));
        // 拿到base64编码的url去加载pdf文档
        loadPdfData(data);
    };
}

/**
 * 通过pdfjs-dist插件生产pdf
 * @param data base64编码的url
 */
function loadPdfData(data: string) {
    // pdfjsLib.getDocument是获取pdf文档的方法，返回的是premise对象，对象包含一些pdf文档的信息以及操作pdf文档的api
    pdfLoadTask.value = pdfjsLib.getDocument({
        data: data,
        cMapUrl: cmapUrl.value,
        cMapPacked: true,
    });

    // 渲染页面,至少一页
    renderPage(1);
}

/**
 * 渲染指定页码的pdf文档
 * @param num 指定页码
 */
function renderPage(num: number) {
    // 异步函数结束后返回pdf的基本信息以及一些api，是一个对象
    pdfLoadTask.value.promise.then((pdf: any) => {
        // 记录一下总页数，多页的情况，每页都需要新建一个画布
        canvasTotalPage.value = pdf.numPages;

        // 通过调用pdf对象的getPage方法，将指定的页码传入，可以获取传入页码的引用
        pdf.getPage(num).then((page: any) => {
            // 获取canvas的DOM对象
            const canvas: any = document.getElementById(`myVancas${num}`);

            // 获取canvas的渲染上下文(包含canvas的引用以及绘图功能)
            const ctx = canvas.getContext('2d');

            // 获取页面的像素比率
            const ratio = getRatio(ctx);

            // 页面的视口宽度，也就是元素的可视宽度
            // 不太理解用offsetWidth，可以看下这篇文章https://zhuanlan.zhihu.com/p/603633893
            const viewWidth = document.getElementById('canvasCont').offsetWidth;

            // pdf文档的宽度
            const pdfWidth = page.view[2];

            // 根据视口的宽度/pdf文档宽度得到缩放比
            const scale = viewWidth / pdfWidth;

            // 获取pdf文档的缩放后基本信息
            const viewport = page.getViewport({ scale });

            // 画布的宽高需要根据实际像素调整，避免出现模糊的情况
            canvas.width = viewport.width * ratio;
            canvas.height = viewport.height * ratio;

            // 准备page.render()函数需要的参数
            const renderContext = {
                canvasContext: ctx,
                viewport: viewport,
            };

            // 将数据渲染到画布上
            page.render(renderContext).promise.then(() => {
                // 添加水印
                addWatermark(num, canvas.width, canvas.height);
                
            });
            
            // 多页pdf的情况
            if (num < pdf.numPages) {
                renderPage(num + 1);
            }
        });
    });
}

/**
 * 在画布上添加水印
 * @param num 画布索引
 */
function addWatermark(num: number, width: number, height: number) {
    const canvas: any = document.getElementById(`myVancas${num}`);
    const ctx = canvas.getContext('2d');

    // 方法在指定的方向内重复指定的元素，元素可以是图片、视频，或者其他 <canvas> 元素,被重复的元素可用于绘制/填充矩形、圆形或线条等等。
    const pattern = ctx.createPattern(initWatermark(), 'repeat');

    // 创建矩形
    ctx.rect(0, 0, width, height);

    // fillStyle 属性设置或返回用于填充绘画的颜色、渐变或模式，也可以设置pattern。
    ctx.fillStyle = pattern;

    // 当前的图像
    ctx.fill();
}

/**
 * 初始化水印元素
 */
function initWatermark() {
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 200;
    const ctx: any = canvas.getContext('2d');
    ctx.rotate((45 * Math.PI) / 180);
    ctx.font = '15px Verdana';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillText('我是水印', 30, 30);
    return canvas;
}

/**
 * 获取页面的比率
 * @param ctx canvas绘图环境的上下文
 */
function getRatio(ctx: any) {
    // window对象中的属性devicePixelRatio，这个属性决定了浏览器会用多少实际的像素来渲染一个像素(也可以理解为css像素)
    // 至于为什么要获取这个，不同设备的像素比不同，当这个像素比为2时，会用2个实际像素来渲染一个css像素，就相当于放大了视图一倍，会导致屏幕显示模糊
    const dpr = window.devicePixelRatio || 1;
    // canvas的context上下文中也存在一些关于像素比的属性，逻辑是canvas是用几个像素来存储画布信息
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