import { request, config} from '../config'
const token = localStorage.getItem('token')

const initalState = {
  remoteDevices: [],
  commDevices: [],
  broadcastDevices: []
}
const AREADEVICES = '[device] AREADEVICE'
const ALLDEVICES = '[device] ALLDEVICES'

export function devices(state=initalState,action) {
  switch (action.type) {
    case ALLDEVICES: {
      return {...state,[action.payload.type+'Devices']:action.payload.data}
    }
    default:
      return state
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
        // const data = res.dataObject.map(device => ({
        //   name: role.roleName,
        //   id: role.id
        // }))
        // dispatch(areaDeviceSuccess(data))
      }
    })
}
}

// 添加设备
function areaDeviceSuccess(devices) {
  return {
    type: AREADEVICES,
    payload: devices
  }
}
export function addDevices(info) {
  return (dispatch,getState)=>{
    const user = getState().user
    request.get(config.api.base + config.api.createDeviceArea,{
      token:token,
      accountId: user.account.id,
      ...info
    })
    .then(res=>{
      console.log(res)
      if(res.success) {
        // const data = res.dataObject.map(device => ({
        //   name: role.roleName,
        //   id: role.id
        // }))
        // dispatch(areaDeviceSuccess(data))
      }
    })
}
}