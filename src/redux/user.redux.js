import { request, config} from '../config'

const ERROR_MSG = 'ERROR_MSG'
const AUTH_SUCCESS = 'AUTH_SUCCESS'

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
        const account = {
          id: res.dataObject.account.id,
          name: res.dataObject.account.name,
          token: res.dataObject.account.token,
        }
        const resources = res.dataObject.resources
        localStorage.setItem('token', res.dataObject.account.token)
        dispatch(authSuccess({account:account,resources:resources}))
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
        const account = {
          id: res.dataObject.account.id,
          name: res.dataObject.account.name,
          token: res.dataObject.account.token,
        }
        const resources = res.dataObject.resources
       // localStorage.setItem('token', res.dataObject.account.token)
        dispatch(authSuccess({account:account,resources:resources}))
      }else {
        window.location.replace("/login")
        localStorage.removeItem('token')
      }
    })
  }
}