import { request, config} from '../config'
import { message} from 'antd'


const initialState = {
  alarmlist: [],
  alarmInfo: {},
  carPages:{},
  warmTableTop: 370
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
      const ids = action.payload.split(',')
     const alarmlist = state.alarmlist.map(alarm => {
        if(ids.includes(alarm.id)) {
          return {...alarm,status:1}
        }
          return alarm
       })
       return {...state,alarmlist: alarmlist,alarmUndo:state.alarmUndo-1}
    }
   
    case CARPAGES_SUCCESS: {
      return {...state,carPages: action.payload}
    }
    default:
      return state
  }
}
export function dataSuccess(data) {
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
  return (dispatch) => {
    const token = localStorage.getItem('token')
    request.get(config.api.base + config.api.alertmPages,{
      token: token,
      ...info,
      pageSize:50,
    })
    .then(res => {
      if(res.success) {
        dispatch(dataSuccess({alarmPageTotal:res.records,alarmPageNo: info.pageNo}))
        dispatch(alarmPagesSuccess(res.result))
      }
    })
  }
}
// 报警详情
export function getAlarmInfo(info) {
  return (dispatch) => {
    const token = localStorage.getItem('token')
    request.get(config.api.base + config.api.getAlarmInfo,{
      token: token,
      ...info
    })
    .then(res => {
      if(res.success) {
        dispatch(dataSuccess({alarmInfo: res.dataObject}))
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
      token: user.account.token,
      accountId:user.account.id,
      ...info
    })
   .then(res=>{
     if(res.success) {
       message.success('已处理')
         dispatch(modifyAlarmSuccess(info.id))
     }else{
      message.error('处理失败')
     }
   })
  }
}
// 警报相关设备
export function alarmLinkDevices(info) {
  return (dispatch,getState) => {
    const token = localStorage.getItem('token')
    request.get(config.api.base + config.api.alarmLinkDevices,{
      token: token,
      ...info
    })
   .then(res=>{
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
export function carPages(info) {
  return (dispatch,getState) => {
    const token = localStorage.getItem('token')
    request.get(config.api.base + config.api.carPages,{
      token: token,
      pageSize: 50,
      ...info
    })
   .then(res=>{
     if(res.success&&res.result) {
       if(info.deviceId) {
        const cars = res.result.map(car => ({...car,key:car.id}))
        dispatch(dataSuccess({picHistory: {...res,result:cars}, carPageNo: info.pageNo}))
       }else{
        const cars = res.result.map(car => ({...car,key:car.id}))
        dispatch(carPagesSuccess({...res,result:cars}))
       }
     }
   })
  }
}
// getCarDetail
export function getCarDetail(info) {
  return (dispatch,getState) => {
    const token = getState().user.account.token
    request.get(config.api.base + config.api.getCarDetail,{
      token: token,
      ...info
    })
   .then(res=>{
     if(res.success) {
       dispatch(dataSuccess({carPic: 'data:image/jpeg;base64,'+res.dataObject.picture}))
     }
   })
  }
}
// 首页报警数量
export function alarmCount() {
  return (dispatch,getState) => {
    const token = localStorage.getItem('token')
    request.get(config.api.base + config.api.alarmCount,{
      token: token
    })
   .then(res=>{
     if(res.success) {
      dispatch(dataSuccess({alarmCount:res.dataObject.total,alarmUndo:res.dataObject.undo}))
     }
   })
  }
}


export function getUndoPatrolPoints(info) {
  return (dispatch) => {
    const token = localStorage.getItem('token')
    request.get( config.api.base + config.api.getUndoPatrolPoints, {token:token,...info})
    .then(res=>{
      console.log(res)
      if(res.success) {
        dispatch(dataSuccess({unhandlePoints: res.dataObject}))
      }
    })
  }
}