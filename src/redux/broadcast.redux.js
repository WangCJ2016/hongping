import { request, config} from '../config'

const intialState = {
  selectBroIndex: [],
  searchBroList: []
}
const SELECTBROINDEX = '[broadcast] SELECTBROINDEX'
const SEARCHBRO = '[broadcast] SEARCHBRO'

export function broadcast(state = intialState, action ) {
  switch (action.type) {
    case SELECTBROINDEX: {
      return {...state,selectBroIndex:action.payload}
    }
    case SEARCHBRO: {
      return {...state,...action.payload}
    }
    default:
      return state
  }
}

export function selectBroIndex(data) {
  return {
    type: SELECTBROINDEX,
    payload: data
  }
}

// 关键字搜索广播
function searchBroadcastSuccess(data) {
  return {
    type: SEARCHBRO,
    payload: data
  }
}
export function searchBroadcast(info) {
  return dispatch => {
    const token = localStorage.getItem('token')
    request.get(config.api.base + config.api.searchBroadcast,{ token: token,...info})
    .then(res=>{
      if(res.success) {
       dispatch(searchBroadcastSuccess({searchBroList:res.result}))
      }
    })
  }
}