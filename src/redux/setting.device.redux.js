import { request, config} from '../config'
import { message } from 'antd'
const token = localStorage.getItem('token')

const initalState = {
  areaToDevices: [],
  areaToDevices1: [],
  remoteDevices: [],
  commDevices: [],
  broadcastDevices: [],
  mapToDevices: [],
  load: false,
  searchDevice: null,
  videoPicArr:[],
  nextAreas:[]
}
const DATASUCCESS = '[device] DATASUCCESS'
const AREADEVICES = '[device] AREADEVICE'
const AREADEVICES1 = '[device] AREADEVICE1'
const ALLDEVICES = '[device] ALLDEVICES'
const MAPTODEVICES = '[device] AREATODEVICES'
const DELMAPDEVICE = '[device] DELMAPDEVICE'
const ADDMAPDEVICE = '[device] ADDMAPDEVICE'
const CHANGEMAPDEVICE = '[device] CHANGEMAPDEVICE'
const DEVICESEARCH = '[device] DEVICESEARCH'
const DEVINFO = '[device] DEVINFO'
const VIDEOPIC = '[device] VIDEOPIC'

export function devices(state=initalState,action) {
  switch (action.type) {
    case DATASUCCESS: {
      return {...state,...action.payload}
    }
    case ALLDEVICES: {
      return {...state,[action.payload.type+'Devices']:action.payload.data}
    }
    case AREADEVICES: {
      return {...state,areaToDevices:action.payload}
    }
    case AREADEVICES1: {
      return {...state,areaToDevices1:action.payload}
    }
    case MAPTODEVICES: {
      return {...state,mapToDevices:action.payload}
    }
    case DELMAPDEVICE: {
      if(action.payload.type!==10) {
        const mapToDevices = state.mapToDevices.filter(device => device.id!==action.payload.id)
        
        const areaToDevices = [...state.areaToDevices,action.payload]
        return {...state,mapToDevices:mapToDevices,areaToDevices:areaToDevices}
      }else{
        const mapToDevices = state.mapToDevices.filter(device => device.id!==action.payload.id)
        const nextAreas = [...state.nextAreas,action.payload]
        return {...state,mapToDevices:mapToDevices,nextAreas:nextAreas}
      }
    }
    case ADDMAPDEVICE: {
      if(action.payload.type===10) {
        const nextAreas = state.nextAreas.filter(area => area.id!==action.payload.id)
        return {...state,mapToDevices:[...state.mapToDevices,action.payload],nextAreas:nextAreas}
      }else{
        const areaToDevices = state.areaToDevices.filter(device => device.id!==action.payload.id)
      return {...state,mapToDevices:[...state.mapToDevices,action.payload],areaToDevices:areaToDevices}
      }
    }
    case CHANGEMAPDEVICE: {
      const mapToDevices = state.mapToDevices.map(device => {
        if(device.id === action.payload.id) {
          return action.payload
        }
        return device
      })
      return {...state,mapToDevices:mapToDevices}
    }
    // search
    case DEVICESEARCH: {
      return {...state,searchDevice:action.payload}
    }
    // home yulan
    case DEVINFO: {
      return {...state,devinfo:action.payload}
    }
    case VIDEOPIC: {
      const arr = action.payload.split('\n').map((doc,index) => {
        const docArr = doc.split(',')
        return {
          key:docArr[0],
          id: index,
          name:docArr[0],
          BDateTime:docArr[2],
          CardNum: docArr[3],
          License: docArr[4],
          size:docArr[1],
          RecogResul: docArr[5]
        }
      })
      return {...state,videoPicArr:arr}
    }
    default:
      return state
  }
}
function dataSuccess(data) {
  return {
    type: DATASUCCESS,
    payload: data
  }
}
// 获取设备
function allDeviceSuccess(devices) {
  return {
    type: ALLDEVICES,
    payload: devices
  }
}
export function allDevices(info) {
  return dispatch=>{
    request.get(config.api.base + config.api.allDevices,{
      token:token,
      ...info,
      pageNo: 1,
      pageSize: 100,
  })
    .then(res=>{
      console.log(res)
      if(res.success) {
        dispatch(allDeviceSuccess({data:res.dataObject[info.type],type:info.type}))
      }
    })
}
}
// 获取区域已绑定设备
function areaDeviceSuccess(devices) {
  return {
    type: AREADEVICES,
    payload: devices
  }
}
export function areaDevices(info) {
  return dispatch=>{
    request.get(config.api.base + config.api.areaDevices,{
      token:token,
      ...info,
      pageNo: 1,
      pageSize: 100,
  })
    .then(res=>{
      console.log(res)
      if(res.success) {
       
        dispatch(areaDeviceSuccess(res.dataObject))
      }
    })
}
}
// 区域下级区域列表
export function nextArea(info) {
  return dispatch=>{
    request.get(config.api.base + config.api.nextArea,{
      token:token,
      ...info,
  })
    .then(res=>{
      console.log(res)
      if(res.success) {
        const data = res.dataObject.map(area => ({
          name: area.name,
          id: area.id,
          type:10
        }))
        dispatch(dataSuccess({nextAreas:data}))
      }
    })
}
}
// 获取区域已绑定设备
function areaDeviceSuccess1(devices) {
  return {
    type: AREADEVICES1,
    payload: devices
  }
}
export function areaDevices1(info) {
  return dispatch=>{
    request.get(config.api.base + config.api.areaDevices1,{
      token:token,
      ...info,
      pageNo: 1,
      pageSize: 100,
  })
    .then(res=>{
      console.log(res)
      if(res.success) {
        const arr = res.dataObject.map(device => ({
          ...device,
          key:device.id
        }))
        dispatch(areaDeviceSuccess1(arr))
        areaDevices(info)(dispatch)
      }
    })
}
}

// 添加设备

export function addDevices(info) {
  return (dispatch,getState)=>{
    const user = getState().user
    request.get(config.api.base + config.api.createDeviceArea,{
      token:token,
      accountId: user.account.id,
      ...info
    })
    .then(res=>{
      if(res.success) {
        areaDevices1({areaId:info.areaId})(dispatch)
        message.success('保存成功！')
      }
      else{
          message.error(res.msg)
        }
    })
}
}

// 添加地图设备绑

export function createSysInstallPlace(info) {
  return (dispatch,getState)=>{
    const user = getState().user
    request.get(config.api.base + config.api.createSysInstallPlace,{
      token:token,
      accountId: user.account.id,
      ...info
    })
    .then(res=>{
      if(res.success) {
        message.success('保存成功！')
      }else{
        message.error(res.msg)
      }
    })
 }
}
// 获取地图已绑定设备
function querySysInstallPlacesSuccess(data) {
  return {
    type: MAPTODEVICES,
    payload: data
  }
}
export function querySysInstallPlaces(info) {
  return (dispatch)=>{
    request.get(config.api.base + config.api.querySysInstallPlaces,{
      token:token,
      ...info
    })
    .then(res=>{
      if(res.success) {
         if(res.dataObject.devices) {
         
          dispatch(querySysInstallPlacesSuccess(res.dataObject.devices))
         }else{
          dispatch(querySysInstallPlacesSuccess([]))
         }
      }
    })
}
}
// 

// 删除设备
export function delMapDevice(del) {
  return (dispatch,getState) => {
     const user = getState().user
    request.get(config.api.base + config.api.delInstatllPlace,{
      token:token,
      accountId: user.account.id,
      type: 'delete',
      ids: del.id
    })
    .then(res => {
      dispatch({
        type: DELMAPDEVICE,
        payload: del
      })
     
    })
  }
}
// add地图设备
export function addMapDevice(device) {
  return dispatch => {
    dispatch({
      type: ADDMAPDEVICE,
      payload: device
    })
  }
}
// change地图设备
export function changeMapDevice(device) {
  return dispatch => {
    dispatch({
      type: CHANGEMAPDEVICE,
      payload: device
    })
  }
}

// 首页搜索设备
 export function searchDeviceSuccess(device) {
  return {
    type: DEVICESEARCH,
    payload: device
  }
}
export function searchChannel(info) {
  return (dispatch) => {
     
    request.get(config.api.base + config.api.searchChannel,{
      token:token,
      ...info
    })
    .then(res => {
     if(res.success) {
       dispatch(searchDeviceSuccess(res))
     }
    })
  }
}

export function searchBroadcast(info) {
  return (dispatch) => {
     
    request.get(config.api.base + config.api.searchBroadcast,{
      token:token,
      ...info
    })
    .then(res => {
     if(res.success) {
       dispatch(searchDeviceSuccess(res))
     }
    })
  }
}

// home yulan
function devinfoSuccess(info) {
  return {
    type: DEVINFO,
    payload: info
  }
}
 export function videoPic(data) {
  return {
    type: VIDEOPIC,
    payload: data
  }
}
export function getDevInfo(info,type,play,index) {
  return (dispatch,getState) => {
    const user = getState().user
    request.get(config.api.base + config.api.getDevInfo,{
      token:token,
      ...info
    })
    .then(res => {
    
     if(res.success) {
       const device = res.dataObject
       console.log(JSON.stringify(res))
       const model = device.host.model === 1?'HikHC-14':'DHNET-03'
       dispatch(devinfoSuccess(res.dataObject))
       if(type==='play') {
        play.XzVideo_RealPlay(1,user.account.name,"",0,"",1,1,device.host.url,device.host.port,device.host.username,device.host.psw,model,device.index,index?index:0);
       }
       
     }
    })
  }
}