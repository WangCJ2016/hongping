import { request, config} from '../config'

const intialState = {
  saveVideoIf:false,
  hasSoundIf:true,
  backVideoIf:false,
  vv:1,
  bright: 5,
  contrast:5,
  saturation:5,
  hue:5
}

const CHANGESAVEVIDEO = '[video] CHANGESAVEVIDEO'
const CHANGESOUND = '[video] CHANGESOUND'
const CHANGEBACKVIDEO = '[video] CHANGEBACKVIDEO'
const PLAYCTRLCHANGE = '[video] PLAYCTRLCHANGE'
const VIDEOPARAMCHANGE= '[video] VIDEOPARAMCHANGE'

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