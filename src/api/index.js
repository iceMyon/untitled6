/*
要求：能根据接口文档定义接口请求
包含应用中所有接口请求函数的模块
每个函数的返回值都是promise
 */

import ajax from './ajax'

const BASE = 'http://localhost:5000'


export const reqLogin =(username,password)=>ajax('/login',{username,password},'POST')

export const reqAddUser =(user)=>ajax('/manage/user/add',user,'POST')

