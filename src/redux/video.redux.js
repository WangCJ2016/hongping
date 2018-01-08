import { request, config} from '../config'

const intialState = {
  saveVideoIf:false,
  hasSoundIf:true,
  backVideoIf:false,
  vv:1,
  jjv:1,
  jdv:1,
  gqv:1
}

const CHANGESAVEVIDEO = '[video] CHANGESAVEVIDEO'
const CHANGESOUND = '[video] CHANGESOUND'
const CHANGEBACKVIDEO = '[video] CHANGEBACKVIDEO'
const PLAYCTRLCHANGE = '[video] PLAYCTRLCHANGE'

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

// 转速改变
export function playCtrlChange(v) {
  return {
    type: PLAYCTRLCHANGE,
    payload: v
  }
}