import { unknownType } from "@/utils/type";
import { defineStore } from "pinia";

export const useStore = defineStore('main',{
    state:()=>{
        return {
            userInfo: {
                userName:''
            }
        }
    },
    actions:{
        save(info:unknownType){
            this.userInfo = info
        }
    },
     // 持久化配置
    persist: {
        key: 'store',//存储本地的名字
        storage:window.localStorage,//存储地址，可选sessionStorage
        paths:['count'],//需要持久化的变量
    },
})