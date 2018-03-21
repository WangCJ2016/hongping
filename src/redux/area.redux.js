import { request, config} from '../config'

const token = localStorage.getItem('token')

const DATASUCCESS = '[area] DATASUCCESS'
const FIRSTAREAID = '[area] FIRSTAREAID'
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
const BRODEVICE_SUCCESS = '[area] BRODEVICE_SUCCESS'
const BROADCASTSELECTKEYS = '[area] BROADCASTSELECTKEYS'
const HONGWAI_SUCCESS = '[area] HONGWAI_SUCCESS'
const GUARD_SUCCESS = '[area] GUARD_SUCCESS'
const DAOZHA_SUCCESS = '[area] DAOZHA_SUCCESS'

const initalState = {
  areas: [],
  areas_devices:[],
  levelTopAreas: [],
  allAreas: [],
  areaInfo: [],
  load:false,
  upload:false,
  selectAreaId: '',
  areaImgSlider:1,
  videoAllareas:[],
  areas_broDevices: [],
  areas_hongwaiDevices: [],
  areas_guardDevices: [],
  areas_daozhaDevices: [],
  firstAreaId: ''
}

export function area(state=initalState, action) {
  switch (action.type) {
    case DATASUCCESS: {
      return {...state,...action.payload}
    }
    case FIRSTAREAID: {
      return {...state,firstAreaId:action.payload}
    }
    case AREALIST_SUCCESS: {
      let areas_broDevices = action.payload
      let areas_hongwaiDevices = action.payload
      let areas_guardDevices = action.payload
      let areas_daozhaDevices = action.payload
      if(state.areas_broDevices.length!==0) {
        areas_broDevices = state.areas_broDevices
      }
      if(state.areas_hongwaiDevices.length!==0) {
        areas_hongwaiDevices = state.areas_hongwaiDevices
      }
      if(state.areas_guardDevices.length!==0) {
        areas_guardDevices = state.areas_guardDevices
      }
      if(state.areas_daozhaDevices.length!==0) {
        areas_daozhaDevices = state.areas_daozhaDevices
      }
      return {
        ...state, 
        areas: action.payload,
        areas_devices:action.payload,
        areas_broDevices:areas_broDevices,
        areas_hongwaiDevices:areas_hongwaiDevices,
        areas_guardDevices:areas_guardDevices,
        areas_daozhaDevices: areas_daozhaDevices
      }
    }
    case ALLREAS_SUCCESS: {
      return {
        ...state, 
        allAreas: action.payload,
        videoAllareas: action.payload,
        broAllareas: action.payload,
        hongwaiAreas: action.payload,
        guardAreas:action.payload,
        daozhaAreas: action.payload
      }
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
    // 视频
    case ADDAREADEVICE: {
      let extra = []
      action.payload.forEach(ele => {
        let is = false
        state.videoAllareas.forEach(area=>{
          if(area.id === ele.id) {
            is = true
          }
        })
        if(!is) {
          extra.push(ele)
        }
      });
      const allAreas = [...state.videoAllareas,...extra]
      return {...state,videoAllareas:allAreas,areas_devices:fullTree(state.levelTopAreas,allAreas)}
    }
    case AREAIMGSLIDERCHANGE: {
      return {...state,areaImgSlider: action.payload}
    }
    // 广播
    case BRODEVICE_SUCCESS: {
      let extra = []
      action.payload.forEach(ele => {
        let is = false
        state.broAllareas.forEach(area=>{
          if(area.id === ele.id) {
            is = true
          }
        })
        if(!is) {
          extra.push(ele)
        }
      })
      const allAreas = [...state.broAllareas,...extra]
      return {...state,broAllareas:allAreas,areas_broDevices:fullTree(state.levelTopAreas,allAreas)}
    }
    // 红外
    case HONGWAI_SUCCESS: {
      let extra = []
      action.payload.forEach(ele => {
        let is = false
        state.hongwaiAreas.forEach(area=>{
          if(area.id === ele.id) {
            is = true
          }
        })
        if(!is) {
          extra.push(ele)
        }
      })
      const allAreas = [...state.hongwaiAreas,...extra]
      return {...state,hongwaiAreas:allAreas,areas_hongwaiDevices:fullTree(state.levelTopAreas,allAreas)}
    }
    // 道闸
    case DAOZHA_SUCCESS: {
      let extra = []
      action.payload.forEach(ele => {
        let is = false
        state.daozhaAreas.forEach(area=>{
          if(area.id === ele.id) {
            is = true
          }
        })
        if(!is) {
          extra.push(ele)
        }
      })
      const allAreas = [...state.daozhaAreas,...extra]
      return {...state,daozhaAreas:allAreas,areas_daozhaDevices:fullTree(state.levelTopAreas,allAreas)}
    }
      // 门禁
    case GUARD_SUCCESS: {
      let extra = []
      action.payload.forEach(ele => {
        let is = false
        state.guardAreas.forEach(area=>{
          if(area.id === ele.id) {
            is = true
          }
        })
        if(!is) {
          extra.push(ele)
        }
      })
      const allAreas = [...state.guardAreas,...extra]
      return {...state,guardAreas:allAreas,areas_guardDevices:fullTree(state.levelTopAreas,allAreas)}
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
// 区域列表
function firstAreaId(id) {
  return {
    type: FIRSTAREAID,
    payload: id
  }
}
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
          dispatch(firstAreaId(level1[0].id))
          dispatch(leavlTopAreas(level1))
          dispatch(areaListSuccess(fullTree(level1,arealist)))
          dispatch(allAreas(arealist))
        }
      })
  }
}
// 含有设备的视频区域树
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
// 广播table
function broadcastAreaDevicesSuccess(devices) {
  return {
    type: BRODEVICE_SUCCESS,
    payload: devices
  }
}
// 广播区域展开
export function broadcastAreaDevices(info) {
  return (dispatch)=>{
    request.get(config.api.base + config.api.videoAreaDevices,{
      token: token,
      ...info
    })
   .then(res=>{
     if(res.success) {
       console.log(res)
       if(res.dataObject){
        dispatch(dataSuccess({broadcastIp:res.dataObject[0].host.ip}))
        const extra =  res.dataObject.map(device=>({...device,parentId:info.areaId,key:device.key}))
        dispatch(broadcastAreaDevicesSuccess(extra))
       }
     }
   })
  }
}
// 广播选中id
function broadcastAreaDevicesKeySuccess(keys) {
  return {
    type: BROADCASTSELECTKEYS,
    payload: keys
  }
}
export function broadcastAreaDevicesKey(info) {
  return (dispatch)=>{
    request.get(config.api.base + config.api.videoAreaDevices,{
      token: token,
      ...info
    })
   .then(res=>{
     if(res.success) {
       if(res.dataObject){
        const extra =  res.dataObject.map(device=>device.id)
        dispatch(broadcastAreaDevicesKeySuccess(extra))
       }else{
        dispatch(broadcastAreaDevicesKeySuccess([]))
       }
     }
   })
  }
}
// 红外 table
function hongwaiAreaDevicesSuccess(devices) {
  return {
    type: HONGWAI_SUCCESS,
    payload: devices
  }
}
export function hongwaiAreaDevices(info) {
  return (dispatch)=>{
    request.get(config.api.base + config.api.videoAreaDevices,{
      token: token,
      ...info
    })
   .then(res=>{
     if(res.success) {
       if(res.dataObject){
        const extra =  res.dataObject.map(device=>({...device,parentId:info.areaId,key:device.id}))
        dispatch(hongwaiAreaDevicesSuccess(extra))
       }
     }
   })
  }
}
// 道闸 table
function daozhaAreaDevicesSuccess(devices) {
  return {
    type: DAOZHA_SUCCESS,
    payload: devices
  }
}
export function daozhaAreaDevices(info) {
  return (dispatch)=>{
    request.get(config.api.base + config.api.videoAreaDevices,{
      token: token,
      ...info
    })
   .then(res=>{
     if(res.success) {
       if(res.dataObject){
        const extra =  res.dataObject.map(device=>({...device,parentId:info.areaId,key:device.id}))
        dispatch(daozhaAreaDevicesSuccess(extra))
       }
     }
   })
  }
}
// 门禁 table
function guardAreaDevicesSuccess(devices) {
  return {
    type: GUARD_SUCCESS,
    payload: devices
  }
}
export function guardAreaDevices(info) {
  return (dispatch)=>{
    request.get(config.api.base + config.api.videoAreaDevices,{
      token: token,
      ...info
    })
   .then(res=>{
     if(res.success) {
       if(res.dataObject){
        const extra =  res.dataObject.map(device=>({...device,parentId:info.areaId,key:device.id}))
        dispatch(guardAreaDevicesSuccess(extra))
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
// function load() {
//   return {
//     type: LOADCHANGE,
//     payload: ''
//   }
// }
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
export function getAreaInfo(info) {
  return (dispatch)=>{
    request.get(config.api.base + config.api.areaInfo,{
      token: token,
      ...info
    })
   .then(res=>{
     console.log(res)
     if(res.success) {
       dispatch(dataSuccess({areaParentId:res.dataObject.parentId}))
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
    fetch(config.api.base + config.api.uploadAreaImg,{
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