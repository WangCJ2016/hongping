import { request, config} from '../config'

const token = localStorage.getItem('token')

const initialState = {
  peoList: [],
  trails:[],
  traildetail:[],
  searchPeoList:[]
}
const GETALLPEO = '[peo] GETALLPEO'
const GETTRAIL = '[peo] GETTRAIL'
const TRAILDetail = '[peo] TRAILDetail'
const SEARCHPEO = '[peo] SEARCHPEO'

export function peo(state = initialState, action ) {
  switch (action.type) {
    case GETALLPEO:
    case GETTRAIL:
    case TRAILDetail:
    case SEARCHPEO: {
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
    request.get(config.api.base + config.api.getAllpeo,{ token: token})
    .then(res=>{
      console.log(res)
      if(res.success) {
        dispatch(getAllpeoSuccess({peoList:res.dataObject}))
      }
    })
  }
}
// 人员轨迹
function peoTrailSuccess(data) {
  return {
    type:GETTRAIL,
    payload: data
  }
}
export function peoTrail(info) {
  return dispatch => {
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
  return {
    type:TRAILDetail,
    payload: data
  }
}
export function trailDetail(info) {
  return dispatch => {
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
    request.get(config.api.base + config.api.searchPeo,{ token: token,...info})
    .then(res=>{
      console.log(res)
      if(res.success) {
       dispatch(searchPeoSuccess({searchPeoList:res.dataObject}))
      }
    })
  }
}