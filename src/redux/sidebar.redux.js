
const intialState = {
  area_sidebar: false,
  video_sidebar: false,
  broadcast_sidebar: false,
  people_sidebar: false,
  hongwia_sidebar: false,
  guard_sidebar: false,
  daozha_sidebar: false,
  homeLeftIf: false,
  offsetLeft: 60
}
const CHANGESIDEBAR = '[sidebar] CHANGESIDEBAR'
const DATASUCCESS = '[siderbar] DATASUCCESS'

export function sidebar(state = intialState, action ) {
  switch (action.type) {
    case CHANGESIDEBAR: {
      if(state[action.payload]) {
        return {...state,[action.payload]:false,homeLeftIf:false,offsetLeft: 60}
      } else {
        return {...state,
          area_sidebar: false,
          video_sidebar: false,
          broadcast_sidebar:false,
          people_sidebar: false,
          hongwia_sidebar: false,
          guard_sidebar: false,
          daozha_sidebar: false,
          [action.payload]:true,
          homeLeftIf:true,
          offsetLeft: 360
        }
      }
    }
    case DATASUCCESS: {
      return {...state,...action.payload}
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

export function changeSidebar(type) {
  return {
    type:CHANGESIDEBAR,
    payload: type
  }
}