import { request, config} from '../config'

const initialState = {
  peoList: [],
  trails:[],
  traildetail:[],
  searchPeoList:[],
  picture:'',
  departmentList:[]
}
const GETALLPEO = '[peo] GETALLPEO'
const GETTRAIL = '[peo] GETTRAIL'
const TRAILDetail = '[peo] TRAILDetail'
const SEARCHPEO = '[peo] SEARCHPEO'
const AREAIMG = '[peo] AREAIMG'
const DATASUCCESS = '[peo] DATASUCCESS'

export function peo(state = initialState, action ) {
  switch (action.type) {
    case DATASUCCESS:
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
function dataSuccess(data) {
  return {
    type: DATASUCCESS,
    payload: data
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
// 获取部门list
export function departmentList(info) {
  return dispatch => {
    const token = localStorage.getItem('token')
    request.get(config.api.base + config.api.departmentList,{ token: token})
    .then(res=>{
      if(res.success&&res.dataObject) {
        dispatch(dataSuccess({departmentList:res.dataObject}))
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
// 历史
export function peoTrail(info) {
  return dispatch => {
    const token = localStorage.getItem('token')
    request.get(config.api.base + config.api.peoTrail,{ token: token,...info})
    .then(res=>{
      if(res.success) {
        dispatch(peoTrailSuccess({trails:res.dataObject}))
      }
    })
  }
}
// 轨迹详情
export function trailDetail(info) {
  return dispatch => {
    const token = localStorage.getItem('token')
    request.get(config.api.base + config.api.trailDetail,{ token: token,...info})
    .then(res=>{
      if(res.success) {
       dispatch(dataSuccess({traildetail:res.dataObject}))
      }
    })
  }
}
// 实时
export function realtimeTrajectory(info) {
  return dispatch => {
    const token = localStorage.getItem('token')
    request.get(config.api.base + config.api.realtimeTrajectory,{ token: token,...info})
    .then(res=>{
      if(res.success) {
        dispatch(dataSuccess({trails:res.dataObject}))
      }
    })
  }
}
// 轨迹详情
export function realtimeTrajectoryDetail(info) {
  return dispatch => {
    const token = localStorage.getItem('token')
    request.get(config.api.base + config.api.realtimeTrajectoryDetail,{ token: token,...info})
    .then(res=>{
      if(res.success) {
       dispatch(dataSuccess({traildetail:res.dataObject}))
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
      dispatch(areaInfoSuccess({picture:''}))
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

export function getUwbRegionMap(info) {
  return dispatch => {
    const token = localStorage.getItem('token')
    request.get(config.api.base + config.api.getUwbRegionMap,{ token: token,...info})
    .then(res=>{
      console.log(res)
      if(res.success&&res.dataObject) {
        dispatch(dataSuccess({areaRealWidth:res.dataObject.width}))
      }
    })
  }
}