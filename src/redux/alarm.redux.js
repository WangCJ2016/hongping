import { request, config} from '../config'

const token = localStorage.getItem('token')
const initialState = {
  alarmlist: [],
  //alarmInfo: {}
}

const ALARMPAGE_SUCCESS = '[alarm] ALARMPAGE_SUCCESS'
//const ALARMINFO_SUCCESS = '[alarm] ALARMINFO_SUCCESS'

export function alarm(state=initialState,action) {
  switch (action.type) {
    case ALARMPAGE_SUCCESS: {
      return {...state,alarmlist: action.payload}
    }
    
    default:
      return state
  }
}
// 警报列表
function alarmPagesSuccess(list) {
  return {
    type: ALARMPAGE_SUCCESS,
    payload: list
  }
}
export function alarmPages(info) {
  return dispatch => {
    request.get(config.api.base + config.api.alertmPages,{
      token: token,
      ...info
    })
    .then(res => {
      console.log(res)
      if(res.success) {
        dispatch(alarmPagesSuccess(res.result))
      }
    })
  }
}

export function modifyAlarm(info) {
  return (dispatch,getState) => {
    const user = getState().user
    request.get(config.api.base + config.api.modifyAlarm,{
      token: token,
      accountId:user.account.id,
      ...info
    })
   
  }
}