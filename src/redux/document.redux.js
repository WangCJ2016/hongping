import { request, config} from '../config'
import { message} from 'antd'

const initialState = {
  categorysTree:[],
  filesList: []
}
const DATASUCCESS = '[document] DATASUCCESS'
const ADDNEXTCATEGORYS = '[document] ADDNEXTCATEGORYS'

export function document(state=initialState,action) {
  switch (action.type) {
    case DATASUCCESS:{
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

export function levelTopCategorys() {
  return (dispatch) => {
    const token = localStorage.getItem('token')
    request.get(config.api.base + config.api.levelTopCategorys,
      {
        token: token,
      })
      .then(res =>{ 
        if(res.success) {
          const toplevel = res.dataObject.filter(category => category.level===0)
           dispatch(dataSuccess({categorysTree: fullTree(toplevel,res.dataObject)}))
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
    const token = localStorage.getItem('token')
    request.get(config.api.base + config.api.addCategorys,
      {
        ...info,
        token: token,
      })
      .then(res =>{ 
        if(res.success) {
          levelTopCategorys()(dispatch)
        }else{
          message.error(res.msg)
        }
      })
  }
}
export function modifyCategory(info) {
  return (dispatch) => {
    const token = localStorage.getItem('token')
    request.get(config.api.base + config.api.modifyCategory,
      {
        ...info,
        token: token,
      })
      .then(res =>{ 
        if(res.success) {
          levelTopCategorys()(dispatch)
        }else{
          message.error(res.msg)
        }
      })
  }
}

export  function filesList(info) {
  return (dispatch) => {
    const token = localStorage.getItem('token')
    request.get(config.api.base + config.api.filesList,
      {
        ...info,
        token: token,
      })
      .then(res =>{ 
        if(res.success) {
           dispatch(dataSuccess({filesList: res.dataObject}))
        }
      })
  }
} 

export function uploadFile(info) {
  return (dispatch) => {
    const token = localStorage.getItem('token')
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
    .then(res=>{
      if(res.success){
         filesList({categoryId:info.categoryId})(dispatch)
      }else{
      
      }
    })
  }
}

export function delFile(info) {
  return (dispatch) => {
    const token = localStorage.getItem('token')
    request.get(config.api.base + config.api.delFile,
      {
        ...info,
        token: token,
      })
      .then(res =>{ 
        if(res.success) {
          filesList({categoryId:info.categoryId})(dispatch)
        }
      })
  }
}
// reducer handle

function fullTree(levelTopArr, allAreas) {
  return levelTopArr.map((level1,inde)=>{
    return {...level1,children: toTree(level1.id, allAreas)}
  })
}
function toTree(id, allAreas) {
  const childArr = childrenArr(id, allAreas)
  if(childArr.length>0) {
    return childArr.map((child,index)=>{
      return {...child,children:toTree(child.id,allAreas)}
    })
  }
}
function childrenArr(id, array) {
  var newArry = []
  for (var i in array) {
      if (array[i].parentId === id)
          newArry.push(array[i]);
  }
  return newArry;
}