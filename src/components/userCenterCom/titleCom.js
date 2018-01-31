import React from 'react'

export function TitleCom(props) {
  return (
    <div className='title_com'>
      <span className='left_icon'></span>
      <span className='title_text'>{props.title}</span>
    </div>
  )
}

export function ContentCom(props) {
  return (
    <div className='path_com'>
      <label className='path_label'>{props.title}</label>
      <span className='path_text'>{props.path}</span>
    </div>
  )
}