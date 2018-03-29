import { request, config} from '../config'

const initialState = {
  peoList: [],
  trails:[],
  traildetail:[],
  searchPeoList:[],
  picture:''
}
const GETALLPEO = '[peo] GETALLPEO'
const GETTRAIL = '[peo] GETTRAIL'
const TRAILDetail = '[peo] TRAILDetail'
const SEARCHPEO = '[peo] SEARCHPEO'
const AREAIMG = '[peo] AREAIMG'

export function peo(state = initialState, action ) {
  switch (action.type) {
    case GETALLPEO:
    case GETTRAIL:
    case TRAILDetail:
    case SEARCHPEO:
    case AREAIMG: {
      return {...state,...action.payload}
    } 
    default:
      return state
  }
}

// 获取全部人员动态
function getAllpeoSuccess(data) {
  return {
    type:GETALLPEO,
    payload: data
  }
}
export function getAllpeo(token){ 
  
  return dispatch => {
    const token = localStorage.getItem('token')
    request.get(config.api.base + config.api.getAllpeo,{ token: token})
    .then(res=>{
      if(res.success&&res.dataObject) {
        dispatch(getAllpeoSuccess({peoList:res.dataObject}))
      }
    })
  }
}
// 人员轨迹
 export function peoTrailSuccess(data) {
  return {
    type:GETTRAIL,
    payload: data
  }
}
export function peoTrail(info) {
  return dispatch => {
    const token = localStorage.getItem('token')
    request.get(config.api.base + config.api.peoTrail,{ token: token,...info})
    .then(res=>{
      console.log(res)
      if(res.success) {
        dispatch(peoTrailSuccess({trails:res.dataObject}))
      }
    })
  }
}
// 轨迹详情
function TrailDetailSuccess(data) {
  console.log(data)
  return {
    type:TRAILDetail,
    payload: data
  }
}
export function trailDetail(info) {
  return dispatch => {
    const token = localStorage.getItem('token')
    request.get(config.api.base + config.api.trailDetail,{ token: token,...info})
    .then(res=>{
      console.log(res)
      if(res.success) {
       dispatch(TrailDetailSuccess({traildetail:res.dataObject}))
      }
    })
  }
}
// 关键字搜索人员
function searchPeoSuccess(data) {
  return {
    type: SEARCHPEO,
    payload: data
  }
}
export function searchPeo(info) {
  return dispatch => {
    const token = localStorage.getItem('token')
    request.get(config.api.base + config.api.searchPeo,{ token: token,...info})
    .then(res=>{
      console.log(res)
      if(res.success) {
       dispatch(searchPeoSuccess({searchPeoList:res.dataObject}))
      }
    })
  }
}

// 区域img
// 获取区域图片
function areaInfoSuccess(info) {
  return {
    type:AREAIMG,
    payload: info
  }
}
// function load() {
//   return {
//     type: LOADCHANGE,
//     payload: ''
//   }
// }
export function areaImg(info) {
  return (dispatch)=>{
      //dispatch(load())
      const token = localStorage.getItem('token')
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