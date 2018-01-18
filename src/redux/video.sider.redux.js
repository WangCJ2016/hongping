import { request, config} from '../config'

const token = localStorage.getItem('token')

const intialState = {
  searchVideoList:[],
  searchHongwaiList: []
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
    request.get(config.api.base + config.api.searchChannel,{ token: token,...info})
    .then(res=>{
      console.log(res)
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
    request.get(config.api.base + config.api.searchChannel,{ token: token,...info})
    .then(res=>{
      console.log(res)
      if(res.success) {
       dispatch(searchHongwaiVideoSuccess({searchHongwaiList:res.result}))
      }
    })
  }
}