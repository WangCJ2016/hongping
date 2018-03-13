import { request, config} from '../config'
import { alarmType } from '../utils'

const token = localStorage.getItem('token')
const intialState = {
  GetSoftServer:[]
}

const DATASUCCESS = '[status] datasuccess'

export function status(state = intialState, action ) {
  switch (action.type) {
    case DATASUCCESS:{
      return {...state,...action.payload}
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

export function getServerStatus(){ 
  return dispatch => {
    request.get(config.api.base + config.api.getStatus,{ token: token,funNo:'GetSoftServer'})
    .then(res=>{
      console.log(res)
      if(res.success) {
       const arr = res.dataObject.map(data => ({
            ...data,
            key:data.id,
            status:data.CpuPercent===0&&data.MemoryPercent===0?'失败':'成功'   
        }))
        dispatch(dataSuccess({'servers':arr}))
      }
    })
  }
}
export function getVideoHostStatus() {
  return dispatch => {
    request.get(config.api.base + config.api.getStatus,{ token: token,funNo:'HBRemoteHost'})
    .then(res=>{
      console.log(res)
      if(res.success) {
       const arr = res.dataObject.map((data,index) => ({
            ...data,
            key:index,
            status:data.status==='1'?'正常':'失败'   
        }))
        dispatch(dataSuccess({'videoHosts':arr}))
      }
    })
  }
}

export function getVideChannelStatus() {
  return dispatch => {
    request.get(config.api.base + config.api.getStatus,{ token: token,funNo:'HBRemoteChannel'})
    .then(res=>{
      console.log(res)
      if(res.success) {
          const arr = res.dataObject.map((data,index) => ({
            ...data,
            key:data.id, 
        }))
        dispatch(dataSuccess({'videoChannel':arr}))
      }
    })
  }
}

export function postion() {
  return dispatch => {
    request.get(config.api.base + config.api.position,{ token: token})
    .then(res=>{
      console.log(res)
      if(res.success) {
          const arr = res.dataObject.map((data,index) => ({
            ...data,
            name:data.area,
            key:data.code, 
        }))
        dispatch(dataSuccess({'position':arr}))
      }
    })
  }
}

export function getBroadcastChannelStatus() {
  return dispatch => {
    request.get(config.api.base + config.api.getStatus,{ token: token,funNo:'HBBroadcastHosts'})
    .then(res=>{
      console.log(res)
      if(res.success) {
          const arr = res.dataObject.map((data,index) => ({
            ...data,
            key:index, 
            status:data.status==='1'?'正常':'失败'  
        }))
        dispatch(dataSuccess({'broadcastChannel':arr}))
      }
    })
  }
}

// 历史分析
export function historyFstatistics(info) {
  return dispatch => {
    request.get(config.api.base + config.api.historyFstatistics,{ token: token,...info})
    .then(res=>{
      console.log(res)
      if(res.success) {
          const arr = res.result.map((data,index) => ({
            ...data,
            key:index, 
            type:alarmType(data.type)
        }))
        dispatch(dataSuccess({'historyFstatistics':arr}))
      }
    })
  }
}