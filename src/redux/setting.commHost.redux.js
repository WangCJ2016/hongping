import { request, config} from '../config'

const token = localStorage.getItem('token')
const initialState = {
  commHosts: [],
  commDevices: [],
  selectDevice: null,
  coomProperties: []
}

const HOSTLIST_SUCCESS = 'HOSTLIST1_SUCCESS'
const CREATE_SUCCESS = 'CREATE_SUCCESS'
const MODIFY_SUCCESS ='MODIFY_SUCCESS'
const DELHOST_SUCCESS = 'DELHOST_SUCCESS'

const DEVICES_SUCCESS = 'DEVICES_SUCCESS'
const DEVICESADD_SUCCESS = 'DEVICESADD_SUCCESS'
const MODIFYDEVICE_SUCCESS ='MODIFYDEVICE_SUCCESS'
const DELHOSTDEVICE_SUCCESS = 'DELHOSTDEVICE_SUCCESS'
const SETDEVICE = 'SETDEVICE'

const PROPERTY_SUCCESS = 'PROPERTY_SUCCESS'
const PROPERTYADD_SUCCESS = 'PROPERTYADD_SUCCESS'
const MODIFYPROPERTY_SUCCESS ='MODIFYPROPERTY_SUCCESS'
const DELHOSTPROPERTY_SUCCESS = 'DELHOSTPROPERTY_SUCCESS'


export function commHost(state=initialState,action) {
  switch(action.type) {
    // 主机
    case HOSTLIST_SUCCESS: {
      return {...state,commHosts:action.payload}
    }
    case CREATE_SUCCESS: {
      const commHosts=[...state.commHosts,action.payload]
      return {...state,commHosts:commHosts} 
    }
    case MODIFY_SUCCESS: {
      const commHosts = state.commHosts.map(host => {
        if(host.id === action.payload.id) {
          return action.payload
        }
        return host
      })
      return {...state,commHosts:commHosts} 
    }
    case DELHOST_SUCCESS: {
      const commHosts = state.commHosts.filter(host => host.id!==action.payload)
      return {...state,commHosts:commHosts} 
    }
    // 设备
    case SETDEVICE: {
      return {...state,selectDevice:action.payload}
    }
    case DEVICES_SUCCESS: {
      return {...state,commDevices:action.payload}
    }
    case DEVICESADD_SUCCESS: {
      const commDevices=[...state.commDevices,action.payload]
      return {...state,commDevices:commDevices} 
    }
    case MODIFYDEVICE_SUCCESS: {
      const commDevices = state.commDevices.map(host => {
        if(host.id === action.payload.id) {
          return action.payload
        }
        return host
      })
      return {...state,commDevices:commDevices} 
    }
    case DELHOSTDEVICE_SUCCESS: {
      const commDevices = state.commDevices.filter(host => host.id!==action.payload)
      return {...state,commDevices:commDevices} 
    }
    // 属性
    case PROPERTY_SUCCESS: {
      return {...state,coomProperties:action.payload}
    }
    case PROPERTYADD_SUCCESS: {
      const coomProperties=[...state.coomProperties,action.payload]
      return {...state,coomProperties:coomProperties} 
    }
    case MODIFYPROPERTY_SUCCESS: {
      const coomProperties = state.coomProperties.map(host => {
        if(host.id === action.payload.id) {
          return action.payload
        }
        return host
      })
      return {...state,coomProperties:coomProperties} 
    }
    case DELHOSTPROPERTY_SUCCESS: {
      const coomProperties = state.coomProperties.filter(host => host.id!==action.payload)
      return {...state,coomProperties:coomProperties} 
    }
    default:
      return state
  }
}

function hostListsSuccess(list) {
  return {
    type: HOSTLIST_SUCCESS,
    payload: list
  }
}
export function hostLists() {
  return dispatch => {
    request.get(config.api.base + config.api.commHosts, {
      token: token,
      pageNo:1,
      pageSize:1000
    })
      .then(res => {
        if(res.success) {
          const list = res.result.map(host => ({
            id: host.id,
            name: host.name,
            devType: host.devType,
            type:host.type,
            protocol: host.protocol,
            ip: host.ip,
            port: host.port,
            comIndex: host.comIndex,
            baudrate: host.baudrate,
            databit: host.databit,
            parity: host.parity,
            stopbit: host.stopbit
          }))
          if(list.length>0) {
           // channels({remoteHostId: list[0].id})(dispatch)
          }
          dispatch(hostListsSuccess(list))
          
        }
      })
  }
}
// 添加主机
function createSuccess(host) {
  return {
    type: CREATE_SUCCESS,
    payload: host
  }
}
export function createHost(info) {
  return (dispatch,getState) => {
    const user=getState().user
    request.get(config.api.base + config.api.createCommHost, {
      token: token,
      accountId: user.account.id,
      ...info
    })
      .then(res => {
        console.log(res)
        if(res.success) {
          const host = res.dataObject
          const list = {
            id: host.id,
            name: host.name,
            devType: host.devType,
            type:host.type,
            protocol: host.protocol,
            ip: host.ip,
            port: host.port,
            comIndex: host.comIndex,
            baudrate: host.baudrate,
            databit: host.databit,
            parity: host.parity,
            stopbit: host.stopbit
          }
          dispatch(createSuccess(list))
        }
      })
  }
}
// 修改／删除主机
function modifySuccess(host) {
  return {
    type:MODIFY_SUCCESS,
    payload: host
  }
}
function delHost(id) {
  return {
    type:DELHOST_SUCCESS,
    payload: id
  }
}
export function modifyHost(info) {
  return (dispatch,getState) => {
    const user=getState().user
    request.get(config.api.base + config.api.modifyCommHost, {
      token: token,
      accountId: user.account.id,
      ...info
    })
      .then(res => {
        console.log(res)
        if(res.success) {
          if(info.isDelete) {
            dispatch(delHost(res.dataObject.id))
          }else{
            const host = res.dataObject
            const list = {
              id: host.id,
              name: host.name,
              devType: host.devType,
              type:host.type,
              protocol: host.protocol,
              ip: host.ip,
              port: host.port,
              comIndex: host.comIndex,
              baudrate: host.baudrate,
              databit: host.databit,
              parity: host.parity,
              stopbit: host.stopbit
            }
            dispatch(modifySuccess(list))
          }
         
        }
      })
  }
}

// 设备列表
function deviceListsSuccess(list) {
  return {
    type: DEVICES_SUCCESS,
    payload: list
  }
}
export function deviceLists(info) {
  return (dispatch,getState) => {
    request.get(config.api.base + config.api.commDevice, {
      token: token,
      ...info,
      pageNo:1,
      pageSize:1000
    })
      .then(res => {
        if(res.success) {
          const list = res.dataObject.map(host => ({
            id: host.id,
            name: host.name,
            areaCode: host.areaCode,
            key: host.id
          }))
          dispatch(deviceListsSuccess(list))
  
        }
      })
  }
}

// 添加设备
function createDeviceSuccess(host) {
  return {
    type: DEVICESADD_SUCCESS,
    payload: host
  }
}
export function createDevice(info) {
  return (dispatch,getState) => {
    const user=getState().user
    request.get(config.api.base + config.api.createCommDevice, {
      token: token,
      accountId: user.account.id,
      ...info
    })
      .then(res => {
        console.log(res)
        if(res.success) {
          const host = res.dataObject
          const list = {
            id: host.id,
            name: host.name,
            areaCode: host.areaCode,
            key: host.id
          }
          dispatch(createDeviceSuccess(list))
        }
      })
  }
}
// 修改设备
function modifyDeviceSuccess(host) {
  return {
    type:MODIFYDEVICE_SUCCESS,
    payload: host
  }
}
function delDevice(id) {
  return {
    type:DELHOSTDEVICE_SUCCESS,
    payload: id
  }
}
export function modifyDevice(info) {
  return (dispatch,getState) => {
    const user=getState().user
    request.get(config.api.base + config.api.modifyCommDevice, {
      token: token,
      accountId: user.account.id,
      ...info
    })
      .then(res => {
        console.log(res)
        if(res.success) {
          if(info.isDelete) {
            dispatch(delDevice(res.dataObject.id))
          }else{
            const host = res.dataObject
            const list = {
              id: host.id,
              name: host.name,
              areaCode: host.areaCode,
              key: host.id
            }
            dispatch(modifyDeviceSuccess(list))
          }
         
        }
      })
  }
}
// 设置选中设备
export function setDevice(device) {
  return dispatch => {
    dispatch({
      type: SETDEVICE,
      payload: device
    })
  }
}
// 属性列表
function propertyListsSuccess(list) {
  return {
    type: PROPERTY_SUCCESS,
    payload: list
  }
}
export function propertyLists(info) {
  return dispatch => {
    request.get(config.api.base + config.api.CommProperties, {
      token: token,
      ...info,
      pageNo:1,
      pageSize:1000
    })
      .then(res => {
        if(res.success) {
          const list = res.dataObject.map(host => ({
            id: host.id,
            name: host.name,
            addressCode: host.addressCode,
            type:host.type,
            key: host.id
          }))
          dispatch(propertyListsSuccess(list))
        }
      })
  }
}

// 添加属性
function createPropertySuccess(host) {
  return {
    type: PROPERTYADD_SUCCESS,
    payload: host
  }
}
export function createProperty(info) {
  return (dispatch,getState) => {
    const user=getState().user
    request.get(config.api.base + config.api.propertyAdd, {
      token: token,
      accountId: user.account.id,
      ...info
    })
      .then(res => {
        console.log(res)
        if(res.success) {
          const host = res.dataObject
          const list = {
            id: host.id,
            name: host.name,
            addressCode: host.addressCode,
            type:host.type,
            key: host.id
          }
          dispatch(createPropertySuccess(list))
        }
      })
  }
}

// 修改／删除主机
function modifyPropertySuccess(host) {
  return {
    type:MODIFYPROPERTY_SUCCESS,
    payload: host
  }
}
function delProperty(id) {
  return {
    type:DELHOSTPROPERTY_SUCCESS,
    payload: id
  }
}
export function modifyProperty(info) {
  return (dispatch,getState) => {
    const user=getState().user
    request.get(config.api.base + config.api.modifyProperty, {
      token: token,
      accountId: user.account.id,
      ...info
    })
      .then(res => {
        console.log(res)
        if(res.success) {
          if(info.isDelete) {
            dispatch(delProperty(res.dataObject.id))
          }else{
            const host = res.dataObject
            const list = {
              id: host.id,
              name: host.name,
              addressCode: host.addressCode,
              type:host.type,
              key: host.id
            }
            dispatch(modifyPropertySuccess(list))
          }
         
        }
      })
  }
}
