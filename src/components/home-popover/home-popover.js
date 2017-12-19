import React from 'react'
import './home-popover.scss'
import { Icon, Button } from 'antd'
const ButtonGroup = Button.Group;

export function HomePerson() {
  return (
    <div className="home-popover">
      <p className='title'><Icon type="user" style={{ fontSize: 13 }} />张三</p>
      <p>电话：18868877305</p>
      <p>部门：工程部-施工部</p>
    </div>
  )
}

export function HomeCamera(props) {
  console.log(props)
  return (
    <div className="home-popover">
      <p className='title'>
      <Icon type="camera" className='float-left'  style={{ fontSize: 13 }} />洞室-1001
      <Icon className='float-right' type="close" style={{ fontSize: 13 }} onClick={props} /></p>
      <ButtonGroup className='clearfix'>
        <Button className='float-left' type="primary">
          预览
        </Button>
        <Button className='float-right' type="primary">
          回放
        </Button>
    </ButtonGroup>
    </div>
  )
}