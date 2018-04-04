import { request, config} from '../config'
import { message } from 'antd'

const initialState = {
  broadcastHosts: [],
  selectHost: null,
  sysServers: [],
  channelsList: []
}
const SETSELECTHOST = '[broadcast] SETSELECTHOST'
const HOSTLIST_SUCCESS = '[broadcast] HOSTLIST_SUCCESS'
const SYSSERVERS_SUCCESS = '[broadcast] SYSSERVERS_SUCCESS'
const CREATE_SUCCESS = '[broadcast] CREATE_SUCCESS'
const MODIFY_SUCCESS ='[broadcast] MODIFY_SUCCESS'
const DELHOST_SUCCESS = '[broadcast] DELHOST_SUCCESS'

const CHANNELS_SUCCESS = '[broadcast] CHANNELS_SUCCESS'
const CHANNELSADD_SUCCESS = '[broadcast] CHANNELSADD_SUCCESS'
const MODIFYCHANNEL_SUCCESS ='[broadcast] MODIFYCHANNEL_SUCCESS'
const DELCHANNEL_SUCCESS = '[broadcast] DELCHANNEL_SUCCESS'

export function broadcastHost(state=initialState,action) {
  switch(action.type) {
    case SETSELECTHOST: {
      return {...state,selectHost:action.payload}
    }
    case HOSTLIST_SUCCESS: {
      return {...state,broadcastHosts:action.payload,selectHost:action.payload[0]}
    }
    case SYSSERVERS_SUCCESS: {
      return {...state,sysServers:action.payload}
    }
    case CREATE_SUCCESS: {
      const broadcastHosts=[...state.broadcastHosts,action.payload]
      return {...state,broadcastHosts:broadcastHosts} 
    }
    case MODIFY_SUCCESS: {
      const broadcastHosts = state.broadcastHosts.map(host => {
        if(host.id === action.payload.id) {
          return action.payload
        }
        return host
      })
      return {...state,broadcastHosts:broadcastHosts} 
    }
    case DELHOST_SUCCESS: {
      const broadcastHosts = state.broadcastHosts.filter(host => host.id!==action.payload)
      return {...state,broadcastHosts:broadcastHosts} 
    }
    // 通道
    case CHANNELS_SUCCESS: {
      return {...state,channelsList:action.payload} 
    }
    case CHANNELSADD_SUCCESS: {
      const channelsList=[...state.channelsList,action.payload]
      return {...state,channelsList:channelsList} 
    }
    case MODIFYCHANNEL_SUCCESS: {
      const channelsList = state.channelsList.map(host => {
        if(host.id === action.payload.id) {
          return action.payload
        }
        return host
      })
      return {...state,channelsList:channelsList} 
    }
    case DELCHANNEL_SUCCESS: {
      const channelsList = state.channelsList.filter(host => host.id!==action.payload)
      return {...state,channelsList:channelsList} 
    }
    default:
      return state
  }
  
}

export function setSelect(info) {
  return dispatch => {
    dispatch({
      type:SETSELECTHOST,
      payload: info
    })
  }
}
// 主机list
function hostListsSuccess(list) {
  return {
    type: HOSTLIST_SUCCESS,
    payload: list
  }
}
export function hostLists() {
  return dispatch => {
    const token = localStorage.getItem('token')
    request.get(config.api.base + config.api.BroadcastHosts, {
      token: token,
      pageNo:1,
      pageSize:1000
    })
      .then(res => {
        if(res.success) {
          const list = res.result.map(host => ({
            id: host.id,
            name: host.name,
            ip: host.ip,
            port: host.port,
            productor:host.productor,
            username:host.username,
            psw:host.psw,
            remark: host.remark,
          }))
          if(list.length>0) {
            channels({hostId: list[0].id})(dispatch)
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
    const token = localStorage.getItem('token')
    request.get(config.api.base + config.api.createBroadcastHost, {
      token: token,
      accountId: user.account.id,
      ...info
    })
      .then(res => {
        if(res.success) {
          const host = res.dataObject
          const list = {
            id: host.id,
            name: host.name,
            ip: host.ip,
            port: host.port,
            productor:host.productor,
            username:host.username,
            psw:host.psw,
            remark: host.remark,
          }
          dispatch(createSuccess(list))
        }else{
          message.error(res.msg)
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
    const token = localStorage.getItem('token')
    request.get(config.api.base + config.api.modifyBroadcastHost, {
      token: token,
      accountId: user.account.id,
      ...info
    })
      .then(res => {
        if(res.success) {
          if(info.isDelete) {
            dispatch(delHost(res.dataObject.id))
          }else{
            const host = res.dataObject
            const list = {
              id: host.id,
              name: host.name,
              ip: host.ip,
              port: host.port,
              productor:host.productor,
              username:host.username,
              psw:host.psw,
              remark: host.remark,
            }
            dispatch(modifySuccess(list))
          }
         
        }else{
          message.error(res.msg)
        }
      })
  }
}

// 视频通道
function channelsSuccess(channels) {
  return {
     type: CHANNELS_SUCCESS,
     payload: channels
  }
}
export function channels(info) {
  return dispatch => {
    const token = localStorage.getItem('token')
    request.get(config.api.base + config.api.BroadcastChannels, {
      token: token,
     ...info
    })
      .then(res => {
        if(res.success) {
          const list = res.dataObject.map(channel => ({
           name: channel.name,
           id: channel.id,
           index: channel.index,
           type: channel.type,
           remark: channel.remark,
           icon: channel.icon,
           key:channel.id
          }))
          dispatch(channelsSuccess(list))
        }else{
          message.error(res.msg)
        }
      })
  }
}

function createChannelSuccess(host) {
  return {
    type: CHANNELSADD_SUCCESS,
    payload: host
  }
}
export function createChannel(info) {
  return (dispatch,getState) => {
    const user=getState().user
    const token = localStorage.getItem('token')
    request.get(config.api.base + config.api.BroadcastChannelsAdd, {
      token: token,
      accountId: user.account.id,
      ...info
    })
      .then(res => {
        if(res.success) {
          const channel = res.dataObject
          const list = {
            name: channel.name,
           id: channel.id,
           index: channel.index,
           type: channel.type,
           remark: channel.remark,
           icon: channel.icon,
           key:channel.id
          }
          dispatch(createChannelSuccess(list))
        }else{
          message.error(res.msg)
        }
      })
  }
}

// 修改／删除主机
function modifyChannelSuccess(host) {
  return {
    type:MODIFYCHANNEL_SUCCESS,
    payload: host
  }
}
function delChannel(id) {
  return {
    type:DELCHANNEL_SUCCESS,
    payload: id
  }
}
export function modifyChannel(info) {
  return (dispatch,getState) => {
    const user=getState().user
    const token = localStorage.getItem('token')
    request.get(config.api.base + config.api.modifyBroadcastChannel, {
      token: token,
      accountId: user.account.id,
      ...info
    })
      .then(res => {
        if(res.success) {
          if(info.isDelete) {
            dispatch(delChannel(res.dataObject.id))
          }else{
            const channel = res.dataObject
            const list = {
              name: channel.name,
              id: channel.id,
              index: channel.index,
              type: channel.type,
              remark: channel.remark,
              icon: channel.icon,
              key:channel.id
            }
            dispatch(modifyChannelSuccess(list))
          }
         
        }else{
          message.error(res.msg)
        }
      })
  }
}