const fs = require("fs");
const path = require("path");


const processexec = require("child_process");

function resolve(dir) {
    console.log(path.resolve(__dirname, "../", dir));
    return path.resolve(__dirname, "../", dir);
}

// 读取配置文件，变量config的nom类型是Object类型
const config = require(resolve("package.json"));

delete config.module
delete config.exports
delete config.files
delete config.type

// 判断文件存不存在
if (fs.existsSync(resolve("dist/package.json"))) {
    fs.unlink(resolve("dist/package.json"), 
    () => console.log("删除成功"));
} else {
    console.log("文件不存在");
}

//将修改后的配置写入文件前需要先转成json字符串格式
const publishConfig = JSON.stringify(config, null, 4);
// 写到dist目录下
fs.writeFile(resolve("dist/package.json"), publishConfig, function (err) {
    if (err) {
        console.error(err);
    } else {
        console.log("----------写入dist目录成功-------------");
    }
});
// 修改当前进程的目录，因为要到dist目录下publish
process.chdir(resolve("dist"));
// 执行 npm publish 命令
processexec.exec("npm publish", (error, stdout, stderr) => {
    if (!error) {
        // 成功
        console.log(error);
        console.log(stdout);
    } else {
        // 失败
        console.log(error);
    }
});