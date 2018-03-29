import { request, config} from '../config'
import { message } from 'antd'

const initialState = {
  roles: [],
  roleInfo: {},
  peopleList: []
}

const GETROLES = 'GETROLES'
const UPDATEROLE = 'UPDATEROLE'
const DELETE = 'DELETE'
const  CREATE_SUCCESS = 'CREATE_SUCCESS'
const ROLEINFO_SUCCESS = 'ROLEINFO_SUCCESS'
const PEOPLELIST_SUCCESS = 'PEOPLELIST_SUCCESS'
const  CREATEPEOPLE_SUCCESS = 'CREATEPEOPLE_SUCCESS'
const MODIFYPEOPLE_SUCCESS = 'MODIFYPEOPLE_SUCCESS'
const DELETEACCOUNT_SUCCESS = 'DELETEACCOUNT_SUCCESS'
const DATASUCCESS = '[role] DATASUCCESS'

export  function role(state=initialState,action) {
  switch (action.type) {
    case DATASUCCESS: {
      return {...state,...action.payload}
    }
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
    case PEOPLELIST_SUCCESS: {
      return {...state,peopleList: action.payload}
    }
    case CREATEPEOPLE_SUCCESS: {
      const peopleList = [...state.peopleList, action.payload]
      return {...state,peopleList:peopleList}
    }
    case MODIFYPEOPLE_SUCCESS: {
      const peopleList = state.peopleList.map(people => {
              if(people.id === action.payload.id) {
                return action.payload
              }else {
                return people
              }
            })
      return {...state,peopleList:peopleList}
    }
    case DELETEACCOUNT_SUCCESS: {
      const peopleList = state.peopleList.filter(people => people.id!==action.payload)
      return {...state,peopleList:peopleList}
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
function getRole(roles) {
  return {
    type:GETROLES,
    payload: roles
  }
}
// 角色list
export function rolesList() {
  return dispatch=>{
      const token = localStorage.getItem('token')
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
// 权限管理列表
export function authorityList() {
  return dispatch => {
    const token = localStorage.getItem('token')
    request.get(config.api.base + config.api.authorityList, {token: token})
      .then(res => {
        console.log(res)
        // if(res.success) {
        //   res.dataObject.map(level1 => )
        // }
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
    const token = localStorage.getItem('token')
    request.get(config.api.base + config.api.createRole,
      {
        token:token,
        accountId: user.account.id,
        ...info
      })
    .then(res=>{
      if(res.success) {
        const role = {
          name: res.dataObject.roleName,
          id: res.dataObject.id
        }
        dispatch(createSuccess(role))
      }else{
        message.error(res.msg)
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
      const token = localStorage.getItem('token')
      request.get(config.api.base + config.api.modifyRole,{
        token:token,
        accountId: user.account.id,
        ...info
       })
      .then(res=>{
        if(res.success) {
         if(info.roleName) {
           info.roleName = decodeURI(info.roleName)
           dispatch(updateRole(info))
         }
         if(info.isDelete===1) {
           dispatch(deletefn(info.id))
         }
        }else{
          message.error(res.msg)
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
      const token = localStorage.getItem('token')
      request.get(config.api.base + config.api.roleInfo,{
        token:token,
        ...info
      })
      .then(res=>{
        if(res.success) {
          const info = {
            id: res.dataObject.id,
            name: res.dataObject.roleName,
            roleAreaId: res.dataObject.roleAreas?res.dataObject.roleAreas.map(area => (area.areaId)):[],
            roleResources: res.dataObject.roleResources?res.dataObject.roleResources.map(resource => resource.resourceId):null
          }
          dispatch(roleInfoSuccess(info))
        }
      })
  }
}
// 人员列表
function accountLisSuccess(data) {
  return {
    type: PEOPLELIST_SUCCESS,
    payload: data
  }
}
export function accountList(info) {
  return (dispatch)=>{
      const token = localStorage.getItem('token')
      request.get(config.api.base + config.api.peopleList,{
        token:token,
        ...info
      })
      .then(res=>{
        if(res.success) {
          const people = res.result.map(person => ({
            id: person.id,
            name: person.name,
            account: person.accountNo,
            dept: person.department,
            password: person.password,
            remark: person.remark?person.remark:'',
            telephone: person.telephone
          }))
          dispatch(accountLisSuccess(people))
        }
      })
  }
}
// 新建人员
function createAccountSucces(data) {
  return {
    type:CREATEPEOPLE_SUCCESS,
    payload: data 
  }
}
export function createAccount(info) {
  return (dispatch,getState)=>{
    const user = getState().user
    const token = localStorage.getItem('token')
      request.get(config.api.base + config.api.createAccount,{
        token:token,
        accountId: user.account.id,
        ...info
      })
      .then(res=>{
        if(res.success) {
         const data = {
          id: res.dataObject.id,
          name: res.dataObject.name,
          account: res.dataObject.accountNo,
          dept: res.dataObject.department,
          password: res.dataObject.password,
          remark: res.dataObject.remark?res.dataObject.remark:'',
          telephone: res.dataObject.telephone
         }
         dispatch(createAccountSucces(data))
        }else{
          message.error(res.msg)
        }
      })
  }
}
// 修改删除人员
function modifyAccountSucces(data) {
  return {
    type:MODIFYPEOPLE_SUCCESS,
    payload: data 
  }
}
function deleteAccountSuccess(id) {
  return {
    type:DELETEACCOUNT_SUCCESS,
    payload: id 
  }
}
export function modifyAccount(info) {
  return (dispatch,getState)=>{
    const user = getState().user
    const token = localStorage.getItem('token')
      request.get(config.api.base + config.api.modifyAccount,{
        token:token,
        accountId: user.account.id,
        ...info
      })
      .then(res=>{
        if(res.success) {
          if(info.isDelete) {
            dispatch(deleteAccountSuccess(res.dataObject.id))
          }else {
            const data = {
              id: res.dataObject.id,
              name: res.dataObject.name,
              account: res.dataObject.accountNo,
              dept: res.dataObject.department,
              password: res.dataObject.password,
              remark: res.dataObject.remark?res.dataObject.remark:'',
              telephone: res.dataObject.telephone
             }
             dispatch(modifyAccountSucces(data))
          }
        }else{
          message.error(res.msg)
        }
      })
  }
}