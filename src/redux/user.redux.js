import { request, config} from '../config'
import { message } from 'antd'
const AUTH_SUCCESS = 'AUTH_SUCCESS'

const intialState = {
  redirectTo:'',
  authMenu:[]
}

export function user(state = intialState, action ) {
  switch (action.type) {
    case 'AUTH_SUCCESS': {
      return {...state,...action.payload,redirectTo:'/home'}
    }
    default:
      return state
  }
}



function authSuccess(obj) {
  return {
    type: AUTH_SUCCESS,
    payload: obj,
  }
}
export function login({username, password},cb) {
  return dispatch => {
    request.get( config.api.base + config.api.login, {username:username,password:password})
    .then(res=>{
      if(res.success) {
        const resources = res.dataObject.resources
        localStorage.setItem('token', res.dataObject.account.token)
        localStorage.setItem('roleId', res.dataObject.account.roleId)
        const data = res.dataObject.resources.module.map(item=>item.resourceUrl)
        dispatch(authSuccess({account:res.dataObject.account,resources:resources,authMenu:data}))
        getMenu(res.dataObject.account.token)(dispatch)
        cb()
      }else{
        message.error(res.msg)
      }
    })
  }
}

export function getInfo(token){ 
  return (dispatch,getState) => {
    request.get(config.api.base + config.api.getInfo,{ token: token})
    .then(res=>{
      if(res.success) {
        const resources = res.dataObject.resources
        localStorage.setItem('token', res.dataObject.account.token)
        localStorage.setItem('roleId', res.dataObject.account.roleId)
        const data = res.dataObject.resources.module.map(item=>item.resourceUrl)
        dispatch(authSuccess({account:res.dataObject.account,resources:resources,authMenu:data}))
      }else {
        window.location.replace("/login")
        localStorage.removeItem('token')
      }
    })
  }
}
// 获取当前账号信息
export function getAccountInfo() {
  return (dispatch)=>{
    const token = localStorage.getItem('token')
    request.get(config.api.base + config.api.getAccountInfo,{ token: token,id:user.account.id})
    .then(res=>{
    })
  }
}

// 
export function getMenu(token) {
  return (dispatch)=>{
    request.get(config.api.base + config.api.getMenu,{ token: token})
    .then(res=>{
      if(res.success) {
        
        dispatch(authSuccess({authMenuData:res.dataObject}))
      }
    })
  }
}