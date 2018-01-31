import { request, config} from '../config'

const ERROR_MSG = 'ERROR_MSG'
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const token = localStorage.getItem('token')
const intialState = {
  redirectTo:'',
  msg:''
}

export function user(state = intialState, action ) {
  switch (action.type) {
    case 'AUTH_SUCCESS': {
      return {...state,...action.payload,redirectTo:'/home'}
    }
    case 'ERROR_MSG': {
      return {...state,msg:action.msg}
    }
    default:
      return state
  }
}


export function errorMSG(msg) {
  return {
    msg,
    type: ERROR_MSG
  }
}
function authSuccess(obj) {
  return {
    type: AUTH_SUCCESS,
    payload: obj,
  }
}
export function login({username, password}) {
  if(!username||!password) {
    return errorMSG('用户密码必须输入')
  }
  return dispatch => {
    request.get( config.api.base + config.api.login, {username:username,password:password})
    .then(res=>{
      console.log(res)
      if(res.success) {
        const resources = res.dataObject.resources
        localStorage.setItem('token', res.dataObject.account.token)
        dispatch(authSuccess({account:res.dataObject.account,resources:resources}))
      }else {
        dispatch(errorMSG(res.msg))
      }
    })
  }
}

export function getInfo(token){ 
  return dispatch => {
    request.get(config.api.base + config.api.getInfo,{ token: token})
    .then(res=>{
      if(res.success) {
        const resources = res.dataObject.resources
       // localStorage.setItem('token', res.dataObject.account.token)
        dispatch(authSuccess({account:res.dataObject.account,resources:resources}))
      }else {
        window.location.replace("/login")
        localStorage.removeItem('token')
      }
    })
  }
}
// 获取当前账号信息
export function getAccountInfo() {
  return (dispatch,getState)=>{
    const user = getState().user
    request.get(config.api.base + config.api.getAccountInfo,{ token: token,id:user.account.id})
    .then(res=>{
      console.log(res)
    })
  }
}