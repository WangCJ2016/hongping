import { request, config} from '../config'


const intialState = {
  searchVideoList:[],
  searchHongwaiList: [],
  searchListType1: [],
  searchListType2: [],
  searchListType3: [],
  searchListType4: [],
  searchListType5: [],
  searchListType6: [],
  searchListType7: [],
  searchGuardList:[]
}
const SEARCHVIDEO = '[videoside] SEARCHVIDEO'
const SEARCHHONGWAI = '[videoside] SEARCHHONGWAI'

export function videSider(state = intialState, action ) {
  switch (action.type) {
    case SEARCHVIDEO:
    case SEARCHHONGWAI: {
      return {...state,...action.payload}
    }
    default:
      return state
  }
}

// 关键字搜索视频
function searchVideoSuccess(data) {
  return {
    type: SEARCHVIDEO,
    payload: data
  }
}
export function searchVideo(info) {
  return dispatch => {
    const token = localStorage.getItem('token')
    request.get(config.api.base + config.api.searchChannel,{ token: token,...info})
    .then(res=>{
      if(res.success) {
       dispatch(searchVideoSuccess({searchVideoList:res.result}))
      }
    })
  }
}

// 关键字搜索红外
function searchHongwaiVideoSuccess(data) {
  return {
    type: SEARCHHONGWAI,
    payload: data
  }
}
export function searchHongwaiVideo(info) {
  return dispatch => {
    const token = localStorage.getItem('token')
    request.get(config.api.base + config.api.searchChannel,{ token: token,...info})
    .then(res=>{
      if(res.success) {
       dispatch(searchHongwaiVideoSuccess({['searchListType'+info.type]:res.result}))
      }
    })
  }
}

export function searchGuard(info) {
  return dispatch => {
    const token = localStorage.getItem('token')
    request.get(config.api.base + config.api.searchGuard,{ token: token,...info})
    .then(res=>{
      if(res.success) {
       dispatch(searchHongwaiVideoSuccess({searchGuardList:res.dataObject}))
      }
    })
  }
}