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
    uploadAreaImg: '/area_uploadAreaImg', // 上传区域图片
    picByarea: '/area_queryPictureByAreaId', // 获取地图

    getInfo: '/do_getAccountInfo',  // (获取角色)
    rolesList:'/role_queryRolePage', // 角色列表
    authorityList: '/role_queryResources', // 权限菜单
    modifyRole: '/role_modifyRole', // 修改角色名称
    createRole: '/role_createRole', // 创建角色
    queryAreas: '/role_queryAreas', //(获取区域)
    roleInfo: '/ role_getRoleInfo', // 角色详情
    peopleList: '/role_queryAccountPage', // 人员列表 
    createAccount: '/account_createAccount', // 新建人员
    modifyAccount: '/account_modifyAccount', // 修改删除账号

    serverlist: '/server_querySysServersPage', // 服务器列表
    modifyServer: '/server_modifySysServers', // 修改／删除服务器
    createServer: '/server_createSysServers ', // 添加服务器

    remoteHosts: '/rhost_querySysRemoteHostsPage', // 视频主机
    SysServerslist: '/rhost_querySysServers', // 流媒体服务器
    createRemoteHost: '/rhost_createSysRemoteHosts', // 添加主机
    modifyRemoteHost:'/rhost_modifySysRemoteHosts', //修改／删除主机
    remoteChannels: '/rhost_querySysRemoteChannels', // 视频通道
    remoteChannelsAdd: '/rhost_createSysRemoteChannels', // 添加通道
    modifyRemoteChannel: '/rhost_modifySysRemoteChannel', // 修改通道

    commHosts: '/chost_querySysCommHostsPage', // 通信主机列表
    createCommHost: '/chost_createSysCommHosts', // 添加主机
    modifyCommHost: '/chost_modifySysCommHosts', //修改／删除主机
    commDevice: '/chost_querySysCommDevices', // 设备列表
    createCommDevice: '/chost_createSysCommDevice', //添加设备 
    modifyCommDevice: '/chost_modifySysCommDevice', // 修改设备
    CommProperties: '/chost_querySysCommProperties', // 属性列表
    propertyAdd: '/chost_createSysCommProperty', // 添加属性
    modifyProperty: '/chost_modifySysCommProperty', // 修改属性

    BroadcastHosts: '/bhost_querySysBroadcastHostsPage ', // 视频主机
    createBroadcastHost: '/bhost_createSysBroadcastHosts', // 添加主机
    modifyBroadcastHost:'/bhost_modifySysBroadcastHosts', //修改／删除主机
    BroadcastChannels: '/bhost_querySysBroadcastChannels', // 视频通道
    BroadcastChannelsAdd: '/bhost_createSysBroadcastChannels', // 添加通道
    modifyBroadcastChannel: '/bhost_modifySysBroadcastChannels ', // 修改通道
    
    areaDevices1:'/device_queryAreaDevices', // 获取区域已绑定设备
    areaDevices: '/install_queryAreaDevices', // (获取区域已绑定设备
    allDevices: '/device_queryAllDevices', //获取设备
    createDeviceArea: '/device_modifySysDeviceArea', //区域设备绑定
    createSysInstallPlace: '/install_createSysInstallPlace ', // 添加地图设备绑
    querySysInstallPlaces: '/install_querySysInstallPlaces' , // 获取地图已绑定设备
    delInstatllPlace: '/install_modifySysInstallPlace', // 删除地图已绑定设备
    // 首页
    alertmPages: '/home_queryAlarmsPage', // 报警列表
    getAlarmInfo: '/home_getAlarmInfo', // 报警详情
    modifyAlarm: '/home_modifyAlarm', // 报警处理
    searchChannel: '/rhost_querySysRemoteChannelsPage', //搜索摄像头
    searchBroadcast: '/bhost_querySysBroadcastChannelsPage', //搜索广播
    carPages: '/home_queryCarsPage', // 车辆信息
    // 视频
    videoAreaDevices: '/home_queryAreaDevices', //视频／红外通道
    remotePresets: '/rhost_querySysRemotePresets', // 预置位列表
    modifyRemotePresets: '/rhost_modifySysRemotePreset', // 删除／修改预置位
    createRemotePreset: '/rhost_createSysRemotePreset', // 添加预置位
    createPreviewGroup: '/preview_createSrPreviewGroup', // 添加预览组
    remotePreviewGroupList: '/preview_querySrPreviewGroups', // 预览列表
    modifyPreviewGroup: '/preview_modifySrPreviewGroup', //修改／删除预览组
    modifySysRemotePreview: '/preview_modifySysRemotePreview', // 添加／修改预览
    getDevInfo: '/home_getDeviceInfo', // 根据DevID获取设备信息
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
    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }
    return fetch(url,options)
      .then(res=>res.json())
  }
}


