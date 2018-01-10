import { request, config} from '../config'
const token = localStorage.getItem('token')
const intialState = {
  saveVideoIf:false,
  hasSoundIf:true,
  backVideoIf:false,
  vv:1,
  bright: 5,
  contrast:5,
  saturation:5,
  hue:5,
  areaDevices: [],
  presets: {
    channelId: '',
    presets: []
  },
  previewGroup: []
}

const CHANGESAVEVIDEO = '[video] CHANGESAVEVIDEO'
const CHANGESOUND = '[video] CHANGESOUND'
const CHANGEBACKVIDEO = '[video] CHANGEBACKVIDEO'
const PLAYCTRLCHANGE = '[video] PLAYCTRLCHANGE'
const VIDEOPARAMCHANGE= '[video] VIDEOPARAMCHANGE'
const VIDEOAREADEVICE = '[video] VIDEOAREADEVICE'
const REMOTEPRESETS = '[video] REMOTEPRESETS'
const MODIFYPRESET = '[video] MODIFYPRESET'
const CREATEPRESTS = '[video] CREATEPRESTS'
const CREATEPREVIEWGROUP = '[video] CREATEPREVIEWGROUP'
const PREVIEWGROUPLIST = '[video] PREVIEWGROUPLIST'

export function video(state=intialState,action) {
  switch (action.type) {
    case CHANGESAVEVIDEO: {
      return {...state,saveVideoIf:!state.saveVideoIf}
    }
    case CHANGESOUND: {
      return {...state,hasSoundIf:!state.hasSoundIf}
    }
    case CHANGEBACKVIDEO: {
      return {...state,backVideoIf:!state.backVideoIf}
    }
    case PLAYCTRLCHANGE:　{
      return {...state,...action.payload}
    }
    case VIDEOPARAMCHANGE:{
      return {...state,...action.payload}
    }
    case VIDEOAREADEVICE: {
      return {...state,areaDevices:action.payload}
    }
    case REMOTEPRESETS: {
      return {...state,presets:action.payload}
    }
    case MODIFYPRESET: {
      const presets = state.presets.presets.filter(preset => preset.id!==action.payload.id)
      const allpreste = {...state.presets,presets:presets}
      return {...state,presets:allpreste}
    }
    case CREATEPRESTS: {
      const presets = [...state.presets.presets,action.payload]
      const allpresets = {...state.presets,presets:presets}
      return {...state,presets:allpresets}
    }
    // 预览组
    case PREVIEWGROUPLIST: {
      return {...state,previewGroup:action.payload}
    }
    case CREATEPREVIEWGROUP: {
      const previewGroup = [...state.previewGroup,action.payload]
      return {...state,previewGroup:previewGroup}
    }
    default:
      return state
  }
}

// 录像状态
export function changeSaveVideoIf() {
  return {
    type:CHANGESAVEVIDEO
  }
} 

// 声音状态
export function changeSoundIf() {
  return {
    type:CHANGESOUND
  }
} 
// 回放状态

export function changeBackVideoIf() {
  return {
    type:CHANGEBACKVIDEO
  }
} 

// 云台改变
export function playCtrlChange(v) {
  return {
    type: PLAYCTRLCHANGE,
    payload: v
  }
}
// 参数改变
export function paramsChange(obj) {
  return {
    type: VIDEOPARAMCHANGE,
    payload: obj
  }
}
// 区域视频通道
function videoAreaDevicesSuccess(data) {
  return {
    type: VIDEOAREADEVICE,
    payload: data
  }
}
export function videoAreaDevices(info) {
  return dispatch=>{
    request.get(config.api.base + config.api.videoAreaDevices,{
      token: token,
      ...info
    })
   .then(res=>{
     console.log(res)
     if(res.success) {
       if(res.dataObject) {
        dispatch(videoAreaDevicesSuccess(res.dataObject))
       }else {
        dispatch(videoAreaDevicesSuccess([]))
       }
     }
   })
  }
}

// 预置位列表
function remotePresetsSuccess(data) {
  return {
    type: REMOTEPRESETS,
    payload: data
  }
}
export function remotePresets(info) {
  return dispatch=>{
    request.get(config.api.base + config.api.remotePresets,{
      token: token,
      ...info
    })
   .then(res=>{
     console.log(res)
     if(res.success) {
       if(res.dataObject) {
        dispatch(remotePresetsSuccess({presets:res.dataObject,channelId:info.channelId}))
       }else {
        dispatch(remotePresetsSuccess([]))
       }
     }
   })
  }
}
// 添加预置位
function createRemotePresetsSuccess(data) {
  return {
    type: CREATEPRESTS,
    payload: data
  }
}
export function createRemotePresets(info) {
  return (dispatch,getState)=>{
    const user = getState().user
    request.get(config.api.base + config.api.createRemotePreset,{
      token: token,
      accountId: user.account.id,
      ...info
    })
   .then(res=>{
     console.log(res)
     if(res.success) {
       if(res.dataObject) {
        dispatch(createRemotePresetsSuccess(res.dataObject))
       }
     }
   })
  }
}
// 删除／修改预置位
function modifyRemotePresetsSuccess(data) {
  return {
    type: MODIFYPRESET,
    payload: data
  }
}
export function modifyRemotePresets(info) {
  return (dispatch,getState)=>{
    const user = getState().user
    request.get(config.api.base + config.api.modifyRemotePresets,{
      token: token,
      accountId: user.account.id,
      ...info
    })
   .then(res=>{
     console.log(res)
     if(res.success) {
       if(res.dataObject) {
        dispatch(modifyRemotePresetsSuccess(res.dataObject))
       }
     }
   })
  }
}
// 预览列表
function remotePreviewGroupListSuccess(data) {
  return {
    type: PREVIEWGROUPLIST,
    payload: data
  }
}
export function remotePreviewGroupList(info) {
  return (dispatch)=>{ 
    request.get(config.api.base + config.api.remotePreviewGroupList,{
      token: token,
      ...info
    })
   .then(res=>{
     console.log(res)
     if(res.success) {
       if(res.dataObject) {
        dispatch(remotePreviewGroupListSuccess(res.dataObject))
       }
     }
   })
  }
}
// 添加预览组

export function createPreviewGroup(info) {
  return (dispatch)=>{
    request.get(config.api.base + config.api.createPreviewGroup,{
      token: token,
      ...info
    })
   .then(res=>{
     console.log(res)
     if(res.success) {
      remotePreviewGroupList({devType:1})(dispatch)
     }
   })
  }
}

// 修改／删除预览组
export function modifyPreviewGroup(info) {
  return (dispatch)=>{
    request.get(config.api.base + config.api.modifyPreviewGroup,{
      token: token,
      ...info
    })
   .then(res=>{
     if(res.success) {
       //console.log(remotePreviewGroupList)
      remotePreviewGroupList({devType:1})(dispatch)
     }
   })
  }
}

export function modifySysRemotePreview(info) {
  return (dispatch,getState)=>{
    const user = getState().user
    request.get(config.api.base + config.api.modifySysRemotePreview,{
      token: token,
      accountId: user.account.id,
      ...info
    })
   .then(res=>{
     console.log(res)
     if(res.success){
      remotePreviewGroupList({devType:1})(dispatch)
     }
   })
  }
}
// 根据DevID获取设备信息  视频播放信息
export function getDevInfo(devId,play) {
  return (dispatch,getState) => {
    const user = getState().user
    request.get(config.api.base + config.api.getDevInfo,{
      token:token,
      devId: devId,
      type:1
    })
    .then(res => {
     console.log(user)
     if(res.success) {
       const model = res.dataObject.host.model === 1?'HikHC-14':'DHNET-03'
     // play.XzVideo_RealPlay(1,"admin","192.168.11.9",6000,1,res.dataObject.host.url,res.dataObject.host.port,res.dataObject.host.username,res.dataObject.host.psw,model,1,0);
      play.XzVideo_RealPlay(1,user.account.name,"",0,"",1,1,res.dataObject.host.url,res.dataObject.host.port,res.dataObject.host.username,res.dataObject.host.psw,model,res.dataObject.index,0);
    }
    })
  }
}