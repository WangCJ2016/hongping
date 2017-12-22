import { request, config} from '../config'
import { addTree } from '../utils'
const token = localStorage.getItem('token')

const AREALIST_SUCCESS = 'AREALIST_SUCCESS'
const JUNIRAREA_SUCCESS = 'JUNIRAREA_SUCCESS'
const CREATEAREA_SUCCESS = 'CREATEAREA_SUCCESS'

const initalState = {
  areas: []
}

export function area(state=initalState, action) {
  switch (action.type) {
    case AREALIST_SUCCESS: {
      return {...state, areas: action.payload}
    }
    case JUNIRAREA_SUCCESS: {

      const areas11 = addTree(state.areas,action.payload[0].parentId, action.payload)
      const areas = [...areas11]
      return {...state, areas: areas}
    }
    case CREATEAREA_SUCCESS: {
      const data = action.payload
      const areas =  createArea_reducer(state, data)
      return {...state,areas:areas.areas}
    }
    default:
      return state
  }
}

// 区域列表
function areaListSuccess(areas) {
  return {
    type: AREALIST_SUCCESS,
    payload: areas
  }
}
export function areaList(info) {
  return dispatch=>{
      request.get(config.api.base + config.api.areaLists,{token:token,pageNo:1,pageSize:1000, ...info})
      .then(res=>{
        console.log(res)
        if(res.success) {

          const level1 = res.result.filter(area => area.level===1).map((area,index) => ({
            key:index,
            name: area.name,
            id: area.id,
            level: area.level,
            children:[]}))
          
          dispatch(areaListSuccess(level1))
        }
      })
  }
}

//获取下级区域
function juniorAreaSuccess(data) {
  return {
    type: JUNIRAREA_SUCCESS,
    payload: data
  }
}
export function juniorArea(info) {
  return dispatch=>{
      request.get(config.api.base + config.api.juniorArea,{token:token, ...info})
      .then(res=>{
        console.log(res)
        if(res.success&&res.dataObject.length>0) {
          const areas = res.dataObject.map(area => ({
            id: area.id,
            name: area.name,
            level: area.level,
            parentId: area.parentId,
            children: []
          }))
          dispatch(juniorAreaSuccess(areas))
        }
      })
  }
}
// 新增区域
function createAreaSuccess(data) {
  return {
    type: CREATEAREA_SUCCESS,
    payload: data
  }
}
export function createArea(info, key) {
  return (dispatch,getState)=>{
      const user = getState().user
      request.get(config.api.base + config.api.createAreas,
        {
          token:user.account.token, 
          accountId: user.account.id,
          ...info
        })
      .then(res=>{
        console.log(res)
        if(res.success) {
          const data = {
            id: res.dataObject.id,
            level: res.dataObject.level,
            name: res.dataObject.name,
            parentId: res.dataObject.parentId
          }
          dispatch(createAreaSuccess({area:data,key:key}))
        }
      })
  }
}
// 修改区域
export function modifyArea(info) {
  return (dispatch,getState)=>{
      const user = getState().user
      request.get(config.api.base + config.api.modifyArea,
        {
          token:token, 
          accountId: user.account.id,
          ...info
        })
      .then(res=>{
        console.log(res)
      })
  }
}

// 区域详情
export function areaInfo(info) {
  return (dispatch,getState)=>{
      const user = getState().user
      request.get(config.api.base + config.api.areaInfo,
        {
          token:user.account.token, 
          ...info
        })
      .then(res=>{
        console.log(res)
      })
  }
}



// reducerfn
function createArea_reducer(state,data) {
  if(data.area.level===1) {
    const area = {...data.area,key:state.areas.length,children:[]}
    return [...state.areas,area,]
  }else {
    const keyArr = data.key.split('-')
    console.log(keyArr)
    let areas = state.areas
    for(let i=0;i<keyArr.length;i++) {
      if(i===keyArr.length-1) {
        areas = areas[i]
      }else{
        areas = areas[i].children
      }
    }
    const area_ = Object.assign([],areas.children)
    console.log(area_)
    areas.children = [...area_,{...data.area,key: data.key+'-'+areas.length}]
    console.log(state)
    return state
  }
  
  
}