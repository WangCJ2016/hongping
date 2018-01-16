import { request, config} from '../config'

const token = localStorage.getItem('token')

const ALLREAS_SUCCESS = '[area] ALLREAS_SUCCESS'
const AREALIST_SUCCESS = '[area] AREALIST_SUCCESS'
const AREAINFO = '[area] AREAINFO'
const LOADCHANGE = '[area] LOADCHANGE'
const UPLOAD = '[area] UPLOAD'
const SELECTID = '[area] SELECTID'
const LEAVLTOP_SUCCESS = '[area] LEAVLTOP_SUCCESS'
const AREADEVICESUCCESS = '[area] AREADEVICESUCCESS'
const ADDAREADEVICE = '[area] ADDAREADEVICE'
const AREAIMGSLIDERCHANGE = '[area] AREAIMGSLIDERCHANGE'

const initalState = {
  areas: [],
  areas_devices:[],
  levelTopAreas: [],
  allAreas: [],
  areaInfo: [],
  load:false,
  upload:false,
  selectAreaId: '',
  areaImgSlider:1
}

export function area(state=initalState, action) {
  switch (action.type) {
    case AREALIST_SUCCESS: {
      return {...state, areas: action.payload,areas_devices:action.payload}
    }
    case ALLREAS_SUCCESS: {
      return {...state, allAreas: action.payload}
    }
    case LEAVLTOP_SUCCESS: {
      return {...state, levelTopAreas: action.payload}
    }
    case AREADEVICESUCCESS: {
      return {...state,areas_devices:action.payload}
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
    case ADDAREADEVICE: {
      let extra = []
      action.payload.forEach(ele => {
        let is = false
        state.allAreas.forEach(area=>{
          if(area.id === ele.id) {
            is = true
          }
        })
        if(!is) {
          extra.push(ele)
        }
      });
      const allAreas = [...state.allAreas,...extra]
      return {...state,allAreas:allAreas,areas_devices:fullTree(state.levelTopAreas,allAreas)}
    }
    case AREAIMGSLIDERCHANGE: {
      return {...state,areaImgSlider: action.payload}
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
function allAreas(data) {
  return {
    type: ALLREAS_SUCCESS,
    payload: data
  }
}
function leavlTopAreas(data) {
  return {
    type: LEAVLTOP_SUCCESS,
    payload: data
  }
}
export function areaList(info) {
  return dispatch=>{
      request.get(config.api.base + config.api.areaLists,{token:token,pageNo:1,pageSize:1000, ...info})
      .then(res=>{
        if(res.success) {
          const arealist = res.result.map((area,index) => ({
            name: area.name,
            key:area.id,
            id: area.id,
            parentId: area.parentId,
            level: area.level,
            children:[]
          }))
          const level1 = res.result.filter(area => area.level===0).map((area,index) => ({
            key:area.id,
            name: area.name,
            id: area.id,
            parentId: '',
            level: area.level,
            children:[]}))
          dispatch(leavlTopAreas(level1))
          dispatch(areaListSuccess(fullTree(level1,arealist)))
          dispatch(allAreas(arealist))
        }
      })
  }
}
// 含有设备的区域树
function area_deviceSuccess(data) {
  return {
    type: AREADEVICESUCCESS,
    payload: data
  }
}
function addAreaDevice(data) {
  return {
    type: ADDAREADEVICE,
    payload: data
  }
}
export function videoAreaDevices(info) {
  return (dispatch)=>{
    request.get(config.api.base + config.api.videoAreaDevices,{
      token: token,
      ...info
    })
   .then(res=>{
     if(res.success) {
       if(res.dataObject){
        const extra =  res.dataObject.map(device=>({...device,parentId:info.areaId,key:device.id}))
        dispatch(addAreaDevice(extra))
       }
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
          //  areaDevices({areaId: level1[0].id})(dispatch)
          //  areaInfo({id:level1[0].id})(dispatch,getState)
          //  querySysInstallPlaces({areaId:level1[0].id})(dispatch,getState)
            dispatch(selectAreaIdSuccess(level1[0].id))
            dispatch(areaListSuccess(level1))
        }
      })
  }
}

// 新增区域
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
        if(res.success) {
          areaList()(dispatch)
         // dispatch(createAreaSuccess([data]))
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
          token:user.account.token, 
          accountId: user.account.id,
          ...info
        })
      .then(res=>{
        areaList()(dispatch)
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
  return (dispatch)=>{
     // dispatch(load())
      request.get(config.api.base + config.api.picByarea,
                  {
                    token:token, 
                    ...info
        })
      .then(res=>{
      //  dispatch(load())
        if(res.success) {
          const info={
            picture: res.dataObject.picture?res.dataObject.picture:''
          }         
          dispatch(areaInfoSuccess(info))
        }else{
          dispatch(areaInfoSuccess({picture:''}))
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
// 首页图像缩放
export function areaImgSlider(num) {
  return {
    type:AREAIMGSLIDERCHANGE,
    payload:num
  }
}

// 生成整棵树
function fullTree(levelTopArr, allAreas) {
  return levelTopArr.map((level1,inde)=>{
    return {...level1,children: toTree(level1.id, allAreas)}
  })
}
function toTree(id, allAreas) {
  const childArr = childrenArr(id, allAreas)
  if(childArr.length>0) {
    return childArr.map((child,index)=>{
      return {...child,children:toTree(child.id,allAreas)}
    })
  }
}
function childrenArr(id, array) {
  var newArry = []
  for (var i in array) {
      if (array[i].parentId === id)
          newArry.push(array[i]);
  }
  return newArry;
}