import React from 'react'
import './home-popover.scss'
import { Icon, Button } from 'antd'
import broadcastHoc from '../broadcastHoc/broadcastHoc'
const ButtonGroup = Button.Group;

export function HomePerson(peo) {
  return (
    <div className="home-popover">
      <p className='title'><Icon className="float-left" type="user" style={{ fontSize: 13 }} />{peo.name}</p>
      <p>电话：{peo.telephone}</p>
      <p>部门：{peo.department}</p>
    </div>
  )
}

export function HomeCamera({device,videoPlay,videoPlayBack,videoPic}) {
  return (
    <div className="home-popover">
      <ButtonGroup className='clearfix'>
      <Button  type="primary" onClick={()=>videoPlay(device)}>
        预览
      </Button>
      <Button  type="primary" onClick={()=>videoPlayBack(device)}>
        回放
      </Button>
      {device.type===3?<Button  type="primary" onClick={()=>videoPic(device)}>
      图片
    </Button>:null}
  </ButtonGroup>
    </div>
  )
}
export function HomeGuard({device,openDoor}) {
  return (
    <div className="home-popover">
      <ButtonGroup className='clearfix'>
      <Button  type="primary" onClick={()=>openDoor()}>
        开门
      </Button>  
  </ButtonGroup>
    </div>
  )
}

@broadcastHoc
export class HomeBroadcast extends React.Component {
  render() {
    return (
      <div className="home-popover">
          <Button  type="primary" onClick={()=>this.props.voiceBroadcast(this.props.IndexArr)}>
            语音播报
          </Button>
      </div>
    )
  }
}


