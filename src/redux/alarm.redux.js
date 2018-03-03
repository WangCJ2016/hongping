import { request, config} from '../config'
import { message} from 'antd'

const token = localStorage.getItem('token')
const initialState = {
  alarmlist: [],
  alarmInfo: {},
  carPages:{}
}

const DATASUCCESS = '[alarm] DATASUCCESS'
const ALARMPAGE_SUCCESS = '[alarm] ALARMPAGE_SUCCESS'
const ALARMMODIFY_SUCCESS = '[alarm] ALARMMODIFY_SUCCESS'
const ALARMINFO_SUCCESS = '[alarm] ALARMINFO_SUCCESS'
const CARPAGES_SUCCESS = '[alarm] CARPAGES_SUCCESS'

export function alarm(state=initialState,action) {
  switch (action.type) {
    case DATASUCCESS:{
      return {...state,...action.payload}
    }
    case ALARMPAGE_SUCCESS: {
      return {...state,alarmlist: action.payload}
    }
    case ALARMMODIFY_SUCCESS: {
     const alarmlist = state.alarmlist.map(alarm => {
        if(alarm.id === action.payload.id) {
          return action.payload
        }
        return alarm
       })
       return {...state,alarmlist: alarmlist}
    }
    case ALARMINFO_SUCCESS: {
      return {...state,alarmInfo: action.payload}
    }
    case CARPAGES_SUCCESS: {
      return {...state,carPages: action.payload}
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

// 警报列表
function alarmPagesSuccess(list) {
  return {
    type: ALARMPAGE_SUCCESS,
    payload: list
  }
}
export function alarmPages(info) {
  return dispatch => {
    request.get(config.api.base + config.api.alertmPages,{
      token: token,
      ...info
    })
    .then(res => {
      if(res.success) {
        dispatch(alarmPagesSuccess(res.result))
      }
    })
  }
}
// 报警详情
function getAlarmInfoSuccess(info) {
  return {
    type: ALARMINFO_SUCCESS,
    payload: info
  }
}
export function getAlarmInfo(info) {
  return dispatch => {
    request.get(config.api.base + config.api.getAlarmInfo,{
      token: token,
      ...info
    })
    .then(res => {
      console.log(res)
      if(res.success) {
        const data = {
          channels: res.dataObject.channels.map(channel => ({
            name: channel.name,
            id: channel.id,
            type: channel.type,
            key: channel.id
          })),
          degree: res.dataObject.degree,
          device: res.dataObject.device,
          deviceId: res.dataObject.deviceId,
          deviceType: res.dataObject.deviceType,
          event: res.dataObject.event,
          gmtCreate: res.dataObject.gmtCreate,
          id:res.dataObject.id,
          type: res.dataObject.type,
          place: res.dataObject.place,
          status: res.dataObject.status
        }
        dispatch(getAlarmInfoSuccess(data))
      }
    })
  }
}
// 处理警报
function modifyAlarmSuccess(info) {
  return {
    type: ALARMMODIFY_SUCCESS,
    payload: info
  }
}
export function modifyAlarm(info) {
  return (dispatch,getState) => {
    const user = getState().user
    request.get(config.api.base + config.api.modifyAlarm,{
      token: token,
      accountId:user.account.id,
      ...info
    })
   .then(res=>{
     if(res.success) {
       message.success('已处理')
       dispatch(modifyAlarmSuccess(res.dataObject))
     }else{
      message.error('处理失败')
     }
   })
  }
}
// 车辆信息
function carPagesSuccess(info) {
  return {
    type: CARPAGES_SUCCESS,
    payload: info
  }
}
export function carPages() {
  return (dispatch) => {
    request.get(config.api.base + config.api.carPages,{
      token: token,
      pageSize: 10
    })
   .then(res=>{
     console.log(res)
     if(res.success) {
       const cars = res.result.map(car => ({...car,key:car.id}))
        dispatch(carPagesSuccess({...res,result:cars}))
     }
   })
  }
}

// 首页报警数量
export function alarmCount() {
  return (dispatch) => {
    request.get(config.api.base + config.api.alarmCount,{
      token: token
    })
   .then(res=>{
     console.log(res)
     if(res.success) {
      dispatch(dataSuccess({alarmCount:res.dataObject.total,alarmUndo:res.dataObject.undo}))
     }
   })
  }
}