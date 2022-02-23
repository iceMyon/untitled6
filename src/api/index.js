/*
要求：能根据接口文档定义接口请求
包含应用中所有接口请求函数的模块
每个函数的返回值都是promise
 */

import ajax from './ajax'
import jsonp from 'jsonp'

const BASE = ''


export const reqLogin =(username,password)=>ajax(BASE+'/login',{username,password},'POST')

export const reqAddUser =(user)=>ajax(BASE+'/manage/user/add',user,'POST')

/*
jsonp请求的接口请求函数
 */
export const reqWeather = ()=>{
  const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
  jsonp()
}
