// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import * as pdfjsLib from 'pdfjs-dist/build/pdf.min';

// es6 导入 pdf.min.js
import * as worker from 'pdfjs-dist/build/pdf.worker.min';

if (typeof window !== 'undefined' && !('pdfjsWorker' in window)) {
    window.pdfjsWorker = worker;
}

// es6 导入 pdf.js
// import workerSrc from 'pdfjs-dist/build/pdf.worker.entry';
// pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;

export { pdfjsLib };
