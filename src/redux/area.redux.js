import { request, config} from '../config'
import {areaDevices,querySysInstallPlaces} from './setting.device.redux'
import { message } from 'antd'
const token = localStorage.getItem('token')

const ALLAREAS = '[area] ALLAREAS'
const AREALIST_SUCCESS = '[area] AREALIST_SUCCESS'
const JUNIRAREA_SUCCESS = '[area] JUNIRAREA_SUCCESS'
const CREATEAREA_SUCCESS = '[area] CREATEAREA_SUCCESS'
const DELETE_SUCCESS = '[area] DELETE_SUCCESS'
const MODIFYAREA_SUCCESS = '[area] MODIFYAREA_SUCCESS'
const AREAINFO = '[area] AREAINFO'
const LOADCHANGE = '[area] LOADCHANGE'
const UPLOAD = '[area] UPLOAD'
const SELECTID = '[area] SELECTID'

const initalState = {
  areas: [],
  arealist: [],
  areaInfo: [],
  load:false,
  upload:false,
  selectAreaId: ''
}

export function area(state=initalState, action) {
  switch (action.type) {
    case AREALIST_SUCCESS: {
      console.log(action.payload)
      return {...state, areas: action.payload}
    }
    case ALLAREAS: {
      return {...state, arealist: action.payload}
    }
    case JUNIRAREA_SUCCESS: {
      const _stateAreas = JSON.parse(JSON.stringify(state.areas))  // 对象深拷贝
      const areas11 = addTree(_stateAreas,action.payload[0].parentId, action.payload)
      return {...state, areas: areas11}
    }
    case CREATEAREA_SUCCESS: {
      const data = action.payload
      const _stateAreas = JSON.parse(JSON.stringify(state.areas))  // 对象深拷贝
      const _areas =  addTree(_stateAreas, data[0].parentId, data)
      return {...state,areas:_areas}
    }
    case DELETE_SUCCESS: {
      const _stateAreas = JSON.parse(JSON.stringify(state.areas))  // 对象深拷贝
      const _areas =  delTree(_stateAreas, action.payload.id,action.payload.parentId)
      return {...state,areas:_areas}
    }
    case MODIFYAREA_SUCCESS: {
      const _stateAreas = JSON.parse(JSON.stringify(state.areas))  // 对象深拷贝
      const _areas =  modifyTree(_stateAreas, action.payload.id,action.payload.parentId,action.payload)

      return {...state,areas:_areas}
    }
    case AREAINFO:{
      return {...state,areaInfo:{...state.areaInfo,...action.payload}}
    }
    case LOADCHANGE: {
      return {...state,load:!state.load}
    }
    case UPLOAD: {
      return {...state,upload:!state.upload}
    }
    case SELECTID:{
      return {...state,selectAreaId:action.payload}
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
function allAreas(areas) {
  return {
    type: ALLAREAS,
    payload: areas
  }
}
export function areaList(info) {
  return dispatch=>{
      request.get(config.api.base + config.api.areaLists,{token:token,pageNo:1,pageSize:1000, ...info})
      .then(res=>{
        console.log(res)
        if(res.success) {
          const arealist = res.result.map((area,index) => ({
            name: area.name,
            id: area.id,
            parentId: area.parentId,
            level: area.level,
            children:[]
          }))
          const level1 = res.result.filter(area => area.level===0).map((area,index) => ({
            key:index,
            name: area.name,
            id: area.id,
            parentId: '',
            level: area.level,
            children:[]}))
          dispatch(allAreas(arealist))
          dispatch(areaListSuccess(level1))
        }
      })
  }
}
// selecAreaId
export function selectAreaIdSuccess(id) {
  return {
    type:SELECTID,
    payload: id
  }
}
export function areaList1(info) {
  
  return (dispatch,getState)=>{
      request.get(config.api.base + config.api.areaLists,{token:token,pageNo:1,pageSize:1000, ...info})
      .then(res=>{ 
        if(res.success) {
          const arealist = res.result.map((area,index) => ({
            name: area.name,
            id: area.id,
            parentId: area.parentId,
            level: area.level,
            children:[]
          }))
          const level1 = res.result.filter(area => area.level===0).map((area,index) => ({
            key:index,
            name: area.name,
            id: area.id,
            parentId: '',
            level: area.level,
            children:[]}))
           areaDevices({areaId: level1[0].id})(dispatch)
           areaInfo({id:level1[0].id})(dispatch,getState)
           querySysInstallPlaces({areaId:level1[0].id})(dispatch,getState)
           dispatch(selectAreaIdSuccess(level1[0].id))
            dispatch(allAreas(arealist))
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
export function createArea(info) {
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
            key: res.dataObject.id,
            id: res.dataObject.id,
            level: res.dataObject.level,
            name: res.dataObject.name,
            parentId: res.dataObject.parentId,
            children: []
          }
          dispatch(createAreaSuccess([data]))
        }
      })
  }
}
// 修改区域
function delete_success(data) {
  return{
    type: DELETE_SUCCESS,
    payload: data
  }
}
function modifyAreaSuccess(info) {
  return{
    type: MODIFYAREA_SUCCESS,
    payload: info
  }
}
export function modifyArea(info) {
  return (dispatch,getState)=>{
      const user = getState().user
      request.get(config.api.base + config.api.modifyArea,
        {
          token:user.account.token, 
          accountId: user.account.id,
          ...info
        })
      .then(res=>{
        console.log(res)
        if(res.success&&info.isDelete===1){
          dispatch(delete_success({id: info.id, parentId:info.parentId}))
        }
        if(res.success&&info.isDelete!==1){
          dispatch(modifyAreaSuccess({id: res.dataObject.id, name:res.dataObject.name,parentId:res.dataObject.parentId}))
        }
        if(!res.success){
          message.error(res.msg)
        }
      })
  }
}

// 获取区域图片
function areaInfoSuccess(info) {
  return {
    type:AREAINFO,
    payload: info
  }
}
function load() {
  return {
    type: LOADCHANGE,
    payload: ''
  }
}
export function areaInfo(info) {
  return (dispatch,getState)=>{
      const user = getState().user
      console.log(user)
      dispatch(load())
      request.get(config.api.base + config.api.picByarea,
                  {
                    token:token, 
                    ...info
        })
      .then(res=>{
        console.log(res)
        dispatch(load())
        if(res.success) {
          const info={
            picture: res.dataObject.picture?res.dataObject.picture:''
          }         
          dispatch(areaInfoSuccess(info))
        }
      })
  }
}
// 上传区域图片
function upload() {
  return {
    type: UPLOAD,
    payload: ''
  }
}
export function uploadImg(info) {
  return (dispatch,getState)=>{
    dispatch(upload())
    const user = getState().user
    let formData = new FormData()
    formData.append('token', token);
    formData.append('accountId', user.account.id);
    formData.append('id', info.id);
    formData.append('picture', info.picture);
    fetch('http://47.100.123.83/hp/manage/area_uploadAreaImg',{
      method: 'POST',
      mode: 'cors',
      body : formData  
    })
    .then(res=>res.json())
    .then(res=>{
      console.log(res)
      dispatch(upload())
      if(res.success){
        dispatch(areaInfoSuccess({picture:info.picture}))
      }else{
        dispatch(areaInfoSuccess({picture:''}))
      }
    })
 }
}


// reducerfn
 function addTree(data, id, children) {
   if(id) {
    for (let i=0; i<data.length; i++) {
      if(data[i].id === id){
          const chidd = children.map((child,index) => ({
              key: data[i].key+'-'+index,
              ...child
          }))
          data[i].children = [...data[i].children,...chidd]
          return data
      }else if (data[i].children.length>0) {
          addTree(data[i].children, id,children )
      }
    }
   }else{
     data = [...data,...children]
   }
  return data
}

function delTree(data, id, parentId) {
  if(parentId !== ''){
    for (let i=0; i<data.length; i++) {
      if(data[i].id === parentId){
        let _index
        data[i].children.forEach((child,index)=>{
          if(child.id === id) {
            _index = index
          }
        })
        data[i].children.splice(_index,1)
        return data
      }else if (data[i].children.length>0) {
        delTree(data[i].children, id,parentId )
      }
  }
}else{
  let _index
  data.forEach((level1,index) => {
    if(level1.id === id) {
      _index=index
    }
  })
  data.splice(_index,1)
}
return data
}

function modifyTree(data, id, parentId, obj) {
  if(parentId !== ''){
    for (let i=0; i<data.length; i++) {
      if(data[i].id === parentId){
        data[i].children.forEach((child,index)=>{
          if(child.id === id) {
            data[i].children[index]={...data[i].children[index],...obj}
          }
        })
        return data
      }else if (data[i].children.length>0) {
        modifyTree(data[i].children, id,parentId,obj )
      }
  }
}else{
  data.forEach((level1,index) => {
    if(level1.id === id) {
      data[index]={...data[index],...obj}
    }
  })
  
}
return data
}