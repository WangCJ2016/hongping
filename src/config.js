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

    areaLists: '/area_queryAreasPage', //区域列表
    juniorArea: '/area_queryAreas', // 获取下级区域
    createAreas: '/area_createAreas',  // 添加区域
    modifyArea: '/area_modifyAreas', // 修改／删除区域
    areaInfo: '/area_getAreasInfo', //  区域详情

    getInfo: '/do_getAccountInfo',  // (获取角色)
    rolesList:'/role_queryRolePage', // 角色菜单
    modifyRole: '/role_modifyRole', // 修改角色名称
    createRole: '/role_createRole', // 创建角色
    queryAreas: '/role_queryAreas', //(获取区域)
    
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