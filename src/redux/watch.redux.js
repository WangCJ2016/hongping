import { request, config} from '../config'
import { weekFormate } from '../utils'
import { message } from 'antd'

const intialState = {
  
}
const DATASUCCESS = '[watch] DATASUCCESS'
const ADDTASKSUCCESS = '[watch] ADDTASKSUCCESS'
const EDITTASKSUCCESS = '[watch] EDITTASKSUCCESS'
const DELETETASKSUCCESS = '[watch] DELETETASKSUCCESS'

export function watch(state = intialState, action ) {
  switch (action.type) {
    case DATASUCCESS: {
      return {...state,...action.payload}
    }
    case ADDTASKSUCCESS: {
      const watchTasks = [...state.watchTasks,action.payload]
      return {...state,watchTasks:watchTasks}
    }
    case EDITTASKSUCCESS: {
     const watchTasks = state.watchTasks.map(task => {
        if(task.id === action.payload.id) {
          return action.payload
        }
        return task
      })
      return {...state,watchTasks:watchTasks}
    }
    case DELETETASKSUCCESS: {
      const watchTasks = state.watchTasks.filter(task => task.id!==action.payload.id)
      return {...state,watchTasks:watchTasks}
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

export function getWatchTasks() {
  return dispatch => {
    const token = localStorage.getItem('token')
    request.get( config.api.base + config.api.getWatchTasks, {token:token})
    .then(res=>{
      
      if(res.success) {
        const arr = res.dataObject.map(task => ({
          ...task,
          key:task.id,
          day:weekFormate(task.day)
        }))
        TaskPoints({taskId:arr[0].id})(dispatch)
        dispatch(dataSuccess({watchTasks: arr,selectTask:arr[0]}))
      }
    })
  }
}

function addTaskSuccess(data) {
  return {
    type: ADDTASKSUCCESS,
    payload: data
  }
}
export function addTask(info) {
  return (dispatch,getState) => {
    const user = getState().user
    const token = localStorage.getItem('token')
    request.get( config.api.base + config.api.addTask, {token:token,accountId:user.account.id,...info})
    .then(res=>{
      
      if(res.success) {
        const data = {
          ...res.dataObject,
          key:res.dataObject.id,
          day:weekFormate(res.dataObject.day)
        }
        
        dispatch(addTaskSuccess(data))
      }
    })
  }
}

function editTaskSuccess(data) {
  return {
    type: EDITTASKSUCCESS,
    payload: data
  }
}
function deleteTaskSuccess(data) {
  return {
    type: DELETETASKSUCCESS,
    payload: data
  }
}
export function editTask(info) {
  return (dispatch,getState) => {
    const user = getState().user
    const token = localStorage.getItem('token')
    request.get( config.api.base + config.api.editTask, {token:token,accountId:user.account.id,...info})
    .then(res=>{
      
      if(res.success) {
        if(info.isDelete) {
          dispatch(deleteTaskSuccess(info))
        }else{
          const data = {
            ...res.dataObject,
            key:res.dataObject.id,
            day:weekFormate(res.dataObject.day)
          }
          dispatch(editTaskSuccess(data))
        }
      }else{
        message.warning(res.msg);
      }
    })
  }
}

export function TaskPoints(info) {
  return dispatch => {
    const token = localStorage.getItem('token')
    request.get( config.api.base + config.api.taskPoints, {token:token,...info})
    .then(res=>{
      
      if(res.success) {
        const arr = res.dataObject.map(point => ({
          ...point,
          key:point.id,
        }))
        dispatch(dataSuccess({taskPoints: arr}))
      }
    })
  }
}

export function addPoint(info) {
  return (dispatch,getState) => {
    const user = getState().user
    const token = localStorage.getItem('token')
    request.get( config.api.base + config.api.addPoint, {token:token,accountId:user.account.id,...info})
    .then(res=>{
      
      if(res.success) {
        TaskPoints({taskId:info.taskId})(dispatch)
      }
    })
  }
}

export function editPoint(info) {
  return (dispatch,getState) => {
    const user = getState().user
    const token = localStorage.getItem('token')
    request.get( config.api.base + config.api.editPoint, {token:token,accountId:user.account.id,...info})
    .then(res=>{
      
      if(res.success) {
        TaskPoints({taskId:info.taskId})(dispatch)
      }
    })
  }
}

export function watchHistoryPage(info) {
  return (dispatch) => {
    const token = localStorage.getItem('token')
    request.get( config.api.base + config.api.watchHistoryPage, {token:token,...info})
    .then(res=>{
      
      if(res.success&&res.result) {
        const arr = res.result.map(task => ({
          ...task,
          key:task.id
        }))
        dispatch(dataSuccess({historyTasks:arr,historyTasksTotal:res.records}))
      }
    })
  }
}

export function getTaskDefaultTime() {
  return (dispatch) => {
    const token = localStorage.getItem('token')
    request.get( config.api.base + config.api.getTaskDefaultTime, {token:token})
    .then(res=>{
      
      if(res.success) {
        const time = res.dataObject === '-'?'':res.dataObject
        dispatch(dataSuccess({taskTime: time}))
      }
    })
  }
}

export function setTaskTime(info) {
  return (dispatch) => {
    const token = localStorage.getItem('token')
    request.get( config.api.base + config.api.setTaskTime, {token:token,...info})
    .then(res=>{
      
      if(res.success) {
        if(info.type === 'modify'||info.type === 'set') {
          message.info('设置成功')
          dispatch(dataSuccess({taskTime: info.time}))
        }
        if(info.type === 'clear') {
          message.info('已清除')
          dispatch(dataSuccess({taskTime: null}))
        }
      }
    })
  }
}

export function watchPointsUpload(info) {
  return (dispatch) => {
    const token = localStorage.getItem('token')
    request.get( config.api.base + config.api.watchPointsUpload, {token:token,...info})
    .then(res=>{
      
      if(res.success) {
        message.info('上传成功')
      }
    })
  }
}

