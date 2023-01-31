
const fs = require("fs");
const path = require("path");

function resolve(dir) {
    console.log(path.resolve(__dirname, "../", dir));
    return path.resolve(__dirname, "../", dir);
}
// 读取配置文件，变量config的nom类型是Object类型
const config = require(resolve("package.json"));
console.log("process是--" + process.argv);

const updateType = process.argv[2];
const UPDATE_DICT = {
    patch: "补丁",
    minor: "小版本",
    major: "大版本",
};
console.log("当前版本----------" + config.version);

console.log("更新类型: %s", UPDATE_DICT[updateType]);

const versionList = config.version.split(".");
if (updateType === "patch") {
    versionList[2] = (Number(versionList[2]) + 1).toString();
} else if (updateType === "minor") {
    versionList[1] = (Number(versionList[1]) + 1).toString();
    versionList[2] = 0;
} else if (updateType === "major") {
    versionList[0] = (Number(versionList[0]) + 1).toString();
    versionList[1] = 0;
    versionList[2] = 0;
}

config.version = versionList.join(".");
console.log(config.version);
// 更新文件
fs.writeFile(resolve("package.json"), JSON.stringify(config, null, 4), function (err) {
    if (err) {
        console.error(err);
    } else {
        console.log("----------修改全局package.json成功-------------");
    }
});