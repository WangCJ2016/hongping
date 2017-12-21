import queryString from 'query-string'
import 'whatwg-fetch'
import {_} from 'lodash'
//api配置
export const config = {
  header: {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  },
  api: {
    base: 'http://47.100.123.83/hp/manage',
    login: '/do_login', // 登录
    getInfo: '/do_getAccountInfo'  // (获取角色)
  }
}
//get/post请求
export const request = {
  get(url,params) {
    if(params) {
      url += '?' + queryString.stringify(params)
    }
    return fetch(url)
    .then((res)=>res.json())
  },
  post(url,body){
    const options = _.extend(config.header,{
      body: JSON.stringify(body)
    })
    return fetch(url,options)
      .then(res=>res.json())
  }
}