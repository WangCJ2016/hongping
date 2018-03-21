import { request, config} from '../config'
import { message} from 'antd'

const token = localStorage.getItem('token')
const initialState = {
  levelTopCategorys:[],
  filesList: []
}
const DATASUCCESS = '[document] DATASUCCESS'
const ADDNEXTCATEGORYS = '[document] ADDNEXTCATEGORYS'

export function document(state=initialState,action) {
  switch (action.type) {
    case DATASUCCESS:{
      return {...state,...action.payload}
    }
    case ADDNEXTCATEGORYS: {

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

export function levelTopCategorys() {
  return (dispatch) => {
    request.get(config.api.base + config.api.levelTopCategorys,
      {
        token: token,
      })
      .then(res =>{ 
        console.log(res)
        if(res.success) {
           dispatch(dataSuccess({levelTopCategorys: res.dataObject}))
        }
      })
  }
}
export function addNextCategorys(data) {
  return {
    type: ADDNEXTCATEGORYS,
    payload: data
  }
}
export function addCategorys(info) {
  return (dispatch,getState) => {
    request.get(config.api.base + config.api.addCategorys,
      {
        ...info,
        token: token,
      })
      .then(res =>{ 
        console.log(res)
        if(res.success) {
            if(res.dataObject.parentId) {
              dispatch(addNextCategorys([res.dataObject]))
            }else{
              levelTopCategorys()(dispatch)
            }
        }else{
          message.error(res.msg)
        }
      })
  }
}


export  function filesList(info) {
  return (dispatch) => {
    request.get(config.api.base + config.api.filesList,
      {
        ...info,
        token: token,
      })
      .then(res =>{ 
        console.log(res)
        if(res.success) {
           dispatch(dataSuccess({filesList: res.dataObject}))
        }
      })
  }
} 

export function uploadFile(info) {
  return (dispatch) => {
    let formData = new FormData()
    formData.append('token', token);
    formData.append('title', info.title);
    formData.append('categoryId', info.categoryId);
    formData.append('content', info.content);
    fetch(config.api.base + config.api.uploadFile ,{
      method: 'POST',
      mode: 'cors',
      body : formData  
    })
    .then(res=>res.json())
    .then(res=>{
      console.log(res)
      if(res.success){
         filesList({categoryId:info.categoryId})(dispatch)
      }else{
      
      }
    })
  }
}

export function delFile(info) {
  return (dispatch) => {
    request.get(config.api.base + config.api.delFile,
      {
        ...info,
        token: token,
      })
      .then(res =>{ 
        console.log(res)
        if(res.success) {
          filesList({categoryId:info.categoryId})(dispatch)
        }
      })
  }
}
// reducer handle

