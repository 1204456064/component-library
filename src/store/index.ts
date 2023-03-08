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
    }
})