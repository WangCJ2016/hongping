import { request, config} from '../config'
import { message } from 'antd'

const initialState = {
  serverList: []
}

const SERVERLIST_SUCCESS = 'SERVERLIST_SUCCESS'
const SERVERMODIFY_SUCCESS = 'SERVERMODIFY_SUCCESS'
const SERVERDEL_SUCCESS = 'SERVERDEL_SUCCESS'
const SERVERADD_SUCCESS = 'SERVERADD_SUCCESS'

export function settingServer(state=initialState, action) {
  switch (action.type) {
    case SERVERLIST_SUCCESS:{
      return {...state,serverList:action.payload}
    }
    case SERVERMODIFY_SUCCESS:{
      const serverList = state.serverList.map(server => {
        if(server.id === action.payload.id) {
          return action.payload
        }else{
          return server
        }
      })
      return {...state,serverList:serverList}
    }
    case SERVERDEL_SUCCESS: {
      const serverList = state.serverList.filter(server => server.id!==action.payload)
      return {...state,serverList:serverList}
    }
    case SERVERADD_SUCCESS:{
      const serverList = [...state.serverList,action.payload]
      return {...state,serverList:serverList}
    }
    default:
      return state
  }
}
// 服务器列表
function serverlistSuccess(list) {
  return {
    type: SERVERLIST_SUCCESS,
    payload: list
  }
}
export function serverlist() {
  return dispatch => {
    const token = localStorage.getItem('token')
    request.get(config.api.base + config.api.serverlist, {
      token: token,
      pageNo:1,
      pageSize: 1000
    })
      .then(res => {
        if(res.success) {
          const list = res.result.map(server => ({
            key: server.id,
            id: server.id,
            name: server.name,
            innerIp: server.innerIp,
            outerIp: server.outerIp,
            port: server.port,
            maxConn:server.maxConn,
            type:server.type,
            timeout:server.timeout,
            remark:server.remark
          }))
          dispatch(serverlistSuccess(list))
        }
      })
  }
}
// 修改／删除服务器
function modifyServerSuccess(data) {
  return {
    type: SERVERMODIFY_SUCCESS,
    payload: data
  }
}
function deleteServerSuccess(id) {
  return {
    type: SERVERDEL_SUCCESS,
    payload: id
  }
}
export function modifyServer(info) {
  return (dispatch,getState) => {
    const user = getState().user
    const token = localStorage.getItem('token')
    request.get(config.api.base + config.api.modifyServer, {
      token: token,
      accountId: user.account.id,
      ...info
    })
      .then(res => {
        if(res.success) {
          if(info.isDelete) {
            dispatch(deleteServerSuccess(res.dataObject.id))
          }else {
            const server = res.dataObject
            const data = {
              key: server.id,
              id: server.id,
              name: server.name,
              innerIp: server.innerIp,
              outerIp: server.outerIp,
              port: server.port,
              maxConn:server.maxConn,
              type:server.type,
              timeout:server.timeout,
              remark:server.remark
            }
            dispatch(modifyServerSuccess(data))
          }
          
        }else{
          message.error(res.msg)
        }
      })
  }
}
// 添加服务器
function createServerSuccess(server) {
  return {
    type: SERVERADD_SUCCESS,
    payload: server
  }
}
export function createServer(info) {
  return (dispatch,getState) => {
    const user = getState().user
    const token = localStorage.getItem('token')
    request.get(config.api.base + config.api.createServer, {
      token: token,
      accountId: user.account.id,
      ...info
    })
      .then(res => {
        if(res.success) {
          const server = {
            key: res.dataObject.id,
            id: res.dataObject.id,
            name: res.dataObject.name,
            innerIp: res.dataObject.innerIp,
            outerIp: res.dataObject.outerIp,
            port: res.dataObject.port,
            maxConn:res.dataObject.maxConn,
            type:res.dataObject.type,
            timeout:res.dataObject.timeout,
            remark:res.dataObject.remark
          }
          dispatch(createServerSuccess(server))
        }else{
          message.error(res.msg)
        }
      })
  }
}