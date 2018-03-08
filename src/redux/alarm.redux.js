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
      ...info,
      pageSize:7,
    })
    .then(res => {
      if(res.success) {
        dispatch(dataSuccess({alarmPageTotal:res.records}))
        dispatch(alarmPagesSuccess(res.result))
      }
    })
  }
}
// 报警详情
export function getAlarmInfo(info) {
  return (dispatch) => {
    request.get(config.api.base + config.api.getAlarmInfo,{
      token: token,
      ...info
    })
    .then(res => {
      console.log(res)
      if(res.success) {
        dispatch(dataSuccess({alarmInfo: res.dataObject}))
        alarmLinkDevices({areaId: res.dataObject.install.areaId,type:'broadcast'})(dispatch)
        alarmLinkDevices({areaId: res.dataObject.install.areaId,type:'gate'})(dispatch)
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
// 警报相关设备
export function alarmLinkDevices(info) {
  return (dispatch) => {
    request.get(config.api.base + config.api.alarmLinkDevices,{
      token: token,
      ...info
    })
   .then(res=>{
     console.log(res)
     if(res.success) {
      dispatch(dataSuccess({[info.type+'Devices']: res.dataObject}))
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