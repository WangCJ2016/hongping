import { request, config} from '../config'

const token = localStorage.getItem('token')
const initialState = {
  roles: [],
  roleInfo: {}
}

const GETROLES = 'GETROLES'
const UPDATEROLE = 'UPDATEROLE'
const DELETE = 'DELETE'
const  CREATE_SUCCESS = 'CREATE_SUCCESS'
const ROLEINFO_SUCCESS = 'ROLEINFO_SUCCESS'

export  function role(state=initialState,action) {
  switch (action.type) {
    case GETROLES: {
      return {...state,roles: action.payload}
    }
    case CREATE_SUCCESS: {
      const roles = [...state.roles,action.payload]
      return {...state,roles: roles}
    }
    case ROLEINFO_SUCCESS: {
      return {...state,roleInfo: action.payload}
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
function createSuccess(role) {
  return {
    type: CREATE_SUCCESS,
    payload: role
  }
}
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
      if(res.success) {
        const role = {
          name: res.dataObject.roleName,
          id: res.dataObject.id
        }
        dispatch(createSuccess(role))
      }
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
// 角色信xi
function roleInfoSuccess(info) {
  return {
    type: ROLEINFO_SUCCESS,
    payload: info
  }
}
export function role_roleInfo(info) {
  return (dispatch,getState)=>{
      const user = getState().user
      request.get(config.api.base + config.api.roleInfo,{
        token:user.account.token,
        ...info
      })
      .then(res=>{
        console.log(res)
        if(res.success) {
          const info = {
            name: res.dataObject.roleName,
            roleAreaId: res.dataObject.roleAreas?res.dataObject.roleAreas.map(area => (area.areaId)):[]
          }
          dispatch(roleInfoSuccess(info))
        }
      })
  }
}
