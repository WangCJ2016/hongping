import { request, config} from '../config'

const token = localStorage.getItem('token')
const initialState = {
  roles: []
}

const  QUERYAREAS = 'QUERYAREAS'
const GETROLES = 'GETROLES'
const UPDATEROLE = 'UPDATEROLE'
const DELETE = 'DELETE'
const  CREATE_SUCCESS = 'CREATE_SUCCESS'

export  function role(state=initialState,action) {
  switch (action.type) {
    case GETROLES: {
      return {...state,roles: action.payload}
    }
    case UPDATEROLE: {
      const roles =  state.roles.map(role => {
                if(role.id === action.payload.id) {
                  return {id: action.payload.id,name:action.payload.roleName}
                }
                return role
              })
       return {...state,roles:roles}
    }
    case DELETE: {
      const roles = state.roles.filter(role => role.id!==action.payload)
      return {...state,roles:roles}
    }
    default:
      return state
  }
} 

function getRole(roles) {
  return {
    type:GETROLES,
    payload: roles
  }
}
// 角色list
export function rolesList() {
  return dispatch=>{
      request.get(config.api.base + config.api.rolesList,{
        token:token,
        pageNo: 1,
        pageSize: 100,
    })
      .then(res=>{
        console.log(res)
        if(res.success) {
          const data = res.result.map(role => ({
            name: role.roleName,
            id: role.id
          }))
          dispatch(getRole(data))
        }
      })
  }
}

// 创建角色
export function createRole(info) {
  return (dispatch,getState)=>{
    const user = getState().user
    request.get(config.api.base + config.api.createRole,
      {
        token:user.account.token,
        accountId: user.account.id,
        ...info
      })
    .then(res=>{
      console.log(res)
    })
 }
}
// 修改／删除角色名称
function updateRole(role) {
  return {
    type: UPDATEROLE,
    payload: role
  }
}
function deletefn(id) {
  return {
    type: DELETE,
    payload: id
  }
}
export function modifyRole(info) {
  return (dispatch,getState)=>{
      const user = getState().user
      request.get(config.api.base + config.api.modifyRole,{
        token:user.account.token,
        accountId: user.account.id,
        ...info
    })
      .then(res=>{
        console.log(res)
        if(res.success) {
         if(info.roleName) {
           info.roleName = decodeURI(info.roleName)
           dispatch(updateRole(info))
         }
         if(info.isDelete==1) {
           dispatch(deletefn(info.id))
         }
        }
      })
  }
}

export function role_queryAreas() {
  return dispatch=>{
      request.get(config.api.base + config.api.queryAreas,{token:token})
      .then(res=>{
        console.log(res)
      })
  }
}