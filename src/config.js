import queryString from 'query-string'
import 'whatwg-fetch'
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
    ip:'192.168.1.51:8080',
    base: 'http://192.168.0.141:8080/hp/manage', // http://192.168.0.149:8080/hp/manage
    login: '/do_login', // 登录
   
    areaLists: '/area_queryAreasPage', //区域列表
    juniorArea: '/area_queryAreas', // 获取下级区域
    createAreas: '/area_createAreas',  // 添加区域
    modifyArea: '/area_modifyAreas', // 修改／删除区域
    areaInfo: '/area_getAreasInfo', //  区域详情
    uploadAreaImg: '/area_uploadAreaImg', // 上传区域图片
    picByarea: '/area_queryPictureByAreaId', // 获取地图
    getUwbRegionMap:'/slv_getUwbRegionMap',
  
    getInfo: '/do_getAccountInfo',  // (获取角色)
    getMenu: '/role_queryResources', // 获取菜单
    rolesList:'/role_queryRolePage', // 角色列表
    authorityList: '/role_queryResources', // 权限菜单
    modifyRole: '/role_modifyRole', // 修改角色名称
    createRole: '/role_createRole', // 创建角色
    queryAreas: '/role_queryAreas', //(获取区域)
    roleInfo: '/role_getRoleInfo', // 角色详情
    peopleList: '/role_queryAccountPage', // 人员列表 
    createAccount: '/account_createAccount', // 新建人员
    modifyAccount: '/account_modifyAccount', // 修改删除账号
    getAccountInfo: '/account_getAccountInfo', // 账号详情

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

    BroadcastHosts: '/bhost_querySysBroadcastHostsPage', // 视频主机
    createBroadcastHost: '/bhost_createSysBroadcastHosts', // 添加主机
    modifyBroadcastHost:'/bhost_modifySysBroadcastHosts', //修改／删除主机
    BroadcastChannels: '/bhost_querySysBroadcastChannels', // 视频通道
    BroadcastChannelsAdd: '/bhost_createSysBroadcastChannels', // 添加通道
    modifyBroadcastChannel: '/bhost_modifySysBroadcastChannels ', // 修改通道
    
    areaDevices1:'/device_queryAreaDevices', // 获取区域已绑定设备
    areaDevices: '/install_queryAreaDevices', // (获取区域已绑定设备
    nextArea: '/install_queryAreaBindAreas',
    allDevices: '/device_queryAllDevices', //获取设备
    createDeviceArea: '/device_modifySysDeviceArea', //区域设备绑定
    createSysInstallPlace: '/install_createSysInstallPlace ', // 添加地图设备绑
    querySysInstallPlaces: '/install_querySysInstallPlaces' , // 获取地图已绑定设备
    delInstatllPlace: '/install_modifySysInstallPlace', // 删除地图已绑定设备
    // 首页
    alertmPages: '/home_queryAlarmsPage', // 报警列表
    getAlarmInfo: '/home_getAlarmInfo', // 报警详情
    modifyAlarm: '/home_modifyAlarm', // 报警处理
    alarmLinkDevices: '/home_getAlarmLinkageDevices',
    alarmCount: '/home_getAlarmsCount',
    searchChannel: '/rhost_querySysRemoteChannelsPage', //搜索摄像头
    searchBroadcast: '/bhost_querySysBroadcastChannelsPage', //搜索广播
    searchGuard:'/chost_querySysCommPropertiesByKeyword', // 搜索门禁
    carPages: '/home_queryCarsPage', // 车辆信息
    guardCtrl:'/home_ctrlEntranceGuard',
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

    // 人员动态
    getAllpeo: '/slv_queryPersonnelDynamics', // 全部人员动态
    peoTrail:'/slv_queryPersonnelTrajectory', // 历史人员轨迹
    trailDetail: '/slv_queryTrajectoryDetail', // 历史轨迹详情 
    searchPeo: '/slv_queryPeopleByKeyword', // 关键字搜索人员
    departmentList: '/slv_queryDepartments', // 部门人员
    realtimeTrajectory:'/slv_queryRealtimeTrajectory', // 实时轨迹
    realtimeTrajectoryDetail:'/slv_queryRealtimeTrajectoryDetail', // 实时轨迹详情
    // 广播
    // 实时状态
    getStatus:'/home_syncServerDatas',
    position:'/slv_queryPositionPage',
    // 历史分析
    historyFstatistics: '/home_queryAlarmsFStatistics',
    historyStatisticsChart:'/home_queryAlarmsStatisticsChart',
    // 巡更
    getWatchTasks: '/patrol_queryPatrolTasks',
    addTask:'/patrol_createPatrolTasks',
    editTask:'/patrol_modifyPatrolTasks',
    taskPoints:'/patrol_queryPatrolPoints',
    addPoint:'/patrol_createPatrolPoints',
    editPoint:'/patrol_modifyPatrolPoints',
    watchHistoryPage: '/patrol_queryPatrolHistoryPage',
    getTaskDefaultTime: '/patrol_getPatrolTaskTime',
    setTaskTime: '/patrol_setPatrolTaskTime',
    watchPointsUpload:'/patrol_createPatrolHistorys',
    // 文档管理
    levelTopCategorys: '/category_queryCategorys',
    addCategorys:'/category_createCategorys',
    modifyCategory: '/category_modifyCategorys',
    filesList: '/category_queryCategoryFiles',
    uploadFile: '/category_createCategoryFile',
    delFile: '/category_modifyCategoryFile'
  }
}
//get/post请求
export const request = {
  get(url,params) {
    if(params) {
      if(url.indexOf('area_queryPictureByAreaId')>-1) {
        url += '?' + queryString.stringify({...params})
      }else{
        url += '?' + queryString.stringify({...params,_time: Date.now()})
      }
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

// 日期国际化配置
export const locale = {
  "lang":{
     "today": "今天",
      "now": "现在",
      "ok": "确定",
      "clear": "清除",
      "month": "月",
      "year": "年",
      "timeSelect": "选择时间",
      "dateSelect": "选择日期",
      "monthSelect": "选择月份",
      "yearSelect": "选择年",
      "decadeSelect": "Choose a decade",
      "yearFormat": "YYYY",
      "dateFormat": "M/D/YYYY",
      "dayFormat": "D",
      "dateTimeFormat": "M/D/YYYY HH:mm:ss",
      "monthFormat": "MMMM",
      "monthBeforeYear": true,
      "previousMonth": "上个月",
      "nextMonth": "下个月",
      "previousYear": "前一年",
      "nextYear": "下一年",
      "previousDecade": "Last decade",
      "nextDecade": "Next decade",
      "previousCentury": "上世纪",
      "nextCentury": "下世纪"
  }
}
