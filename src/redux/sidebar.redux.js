
const intialState = {
  area_sidebar: false,
  video_sidebar: false,
  broadcast_sidebar: false,
  people_sidebar: false,
  hongwia_sidebar: false,
  guard_sidebar: false,
  daozha_sidebar: false,
  homeLeftIf: false
}
const CHANGESIDEBAR = '[sidebar] CHANGESIDEBAR'

export function sidebar(state = intialState, action ) {
  switch (action.type) {
    case CHANGESIDEBAR: {
      if(state[action.payload]) {
        return {...state,[action.payload]:false,homeLeftIf:false}
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
          homeLeftIf:true
        }
      }
    }
    default:
      return state
  }
}

export function changeSidebar(type) {
  return {
    type:CHANGESIDEBAR,
    payload: type
  }
}