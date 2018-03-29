import { request, config} from '../config'
import { message } from 'antd'

const initialState = {
  remoteHosts: [],
  selectHost: null,
  sysServers: [],
  channelsList: []
}
const SETSELECTHOST = '[remote] SETSELECTHOST'
const HOSTLIST_SUCCESS = '[remote] HOSTLIST_SUCCESS'
const SYSSERVERS_SUCCESS = '[remote] SYSSERVERS_SUCCESS'
const CREATE_SUCCESS = '[remote] CREATE_SUCCESS'
const MODIFY_SUCCESS ='[remote] MODIFY_SUCCESS'
const DELHOST_SUCCESS = '[remote] DELHOST_SUCCESS'

const CHANNELS_SUCCESS = '[remote] CHANNELS_SUCCESS'
const CHANNELSADD_SUCCESS = '[remote] CHANNELSADD_SUCCESS'
const MODIFYCHANNEL_SUCCESS ='[remote] MODIFYCHANNEL_SUCCESS'
const DELCHANNEL_SUCCESS = '[remote] DELCHANNEL_SUCCESS'

export function remoteHost(state=initialState,action) {
  switch(action.type) {
    case SETSELECTHOST: {
      return {...state,selectHost:action.payload}
    }
    case HOSTLIST_SUCCESS: {
      return {...state,remoteHosts:action.payload,selectHost:action.payload[0]}
    }
    case SYSSERVERS_SUCCESS: {
      return {...state,sysServers:action.payload}
    }
    case CREATE_SUCCESS: {
      const remoteHosts=[...state.remoteHosts,action.payload]
      return {...state,remoteHosts:remoteHosts} 
    }
    case MODIFY_SUCCESS: {
      const remoteHosts = state.remoteHosts.map(host => {
        if(host.id === action.payload.id) {
          return action.payload
        }
        return host
      })
      return {...state,remoteHosts:remoteHosts} 
    }
    case DELHOST_SUCCESS: {
      const remoteHosts = state.remoteHosts.filter(host => host.id!==action.payload)
      return {...state,remoteHosts:remoteHosts} 
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
    request.get(config.api.base + config.api.remoteHosts, {
      token: token,
      pageNo:1,
      pageSize:1000
    })
      .then(res => {
        if(res.success) {
          const list = res.result.map(host => ({
            id: host.id,
            name: host.name,
            channels: host.channels,
            connectMode: host.connectMode,
            model: host.model,
            port:host.port,
            productor:host.productor,
            psw:host.psw,
            remark:host.remark,
            type: host.type,
            url: host.url,
            username: host.username,
            mediaServer1Id:host.mediaServer1Id,
            mediaServer2Id:host.mediaServer2Id,
            mediaServer3Id:host.mediaServer3Id
          }))
          if(list.length>0) {
            channels({remoteHostId: list[0].id})(dispatch)
          }
          dispatch(hostListsSuccess(list))
          
        }
      })
  }
}

// 流媒体服务器
function sysServersSuccess(list) {
  return {
    type: SYSSERVERS_SUCCESS,
    payload: list
  }
}
export function sysServerslist() {
  return dispatch => {
    const token = localStorage.getItem('token')
    request.get(config.api.base + config.api.SysServerslist, {
      token: token
    })
      .then(res => {
        console.log(res)
        if(res.success&&res.dataObject) {
          const list = res.dataObject.map(server => ({
            id: server.id,
            name: server.name
          }))
          dispatch(sysServersSuccess(list))
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
    request.get(config.api.base + config.api.createRemoteHost, {
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
            channels: host.channels,
            connectMode: host.connectMode,
            model: host.model,
            port:host.port,
            productor:host.productor,
            psw:host.psw,
            remark:host.remark,
            type: host.type,
            url: host.url,
            username: host.username,
            mediaServer1Id:host.mediaServer1Id,
            mediaServer2Id:host.mediaServer2Id,
            mediaServer3Id:host.mediaServer3Id
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
    request.get(config.api.base + config.api.modifyRemoteHost, {
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
              channels: host.channels,
              connectMode: host.connectMode,
              model: host.model,
              port:host.port,
              productor:host.productor,
              psw:host.psw,
              remark:host.remark,
              type: host.type,
              url: host.url,
              username: host.username,
              mediaServer1Id:host.mediaServer1Id,
              mediaServer2Id:host.mediaServer2Id,
              mediaServer3Id:host.mediaServer3Id
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
    request.get(config.api.base + config.api.remoteChannels, {
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
    request.get(config.api.base + config.api.remoteChannelsAdd, {
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
    request.get(config.api.base + config.api.modifyRemoteChannel, {
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