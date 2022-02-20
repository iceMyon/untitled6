import axios from "axios";
import {message} from "antd";

/*
能发送异步ajax请求的函数类型的模块
封装axios库
函数的返回值是promise对象
 */


export default function ajax(url,data={},type='GET'){
  if(type ==='GET'){
    return axios.get(url,{
      params:{
        data
      }
    })
  } else {
    return axios.post(url,data)
  }
}

ajax('/login',{username:'Tom',password:'12345'},'POST').then()
ajax('/manage/user/add',{username:'Tom',password:'12345',phone:'13333333333'},'POST').then()


