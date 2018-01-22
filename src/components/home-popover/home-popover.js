import React from 'react'
import './home-popover.scss'
import { Icon, Button, Tabs, Input } from 'antd'
const ButtonGroup = Button.Group;
const TabPane = Tabs.TabPane;

export function HomePerson(peo) {
  return (
    <div className="home-popover">
      <p className='title'><Icon className="float-left" type="user" style={{ fontSize: 13 }} />{peo.name}</p>
      <p>电话：{peo.telephone}</p>
      <p>部门：{peo.department}</p>
    </div>
  )
}

export function HomeCamera(device,videoPlay) {
  return (
    <div className="home-popover">
      <p className='title'>
        <Icon type="camera" className='float-left'  style={{ fontSize: 13 }} />{device.name}
      </p>
      <ButtonGroup className='clearfix'>
        <Button type="primary" onClick={()=>videoPlay()}>
          预览
        </Button>
    </ButtonGroup>
    </div>
  )
}

export class HomeBroadcast extends React.Component {
  state = { 
    src:''
   }
  handleClick(e) {
    console.log('click ', e);
  }
  onChange(info) {
    const file = info.target.files[0]
    var reader = new FileReader(); //新建FileReader对象
    reader.readAsDataURL(file); 
    const that = this
    reader.onloadend = function() {
        that.setState({
          src:this.result
        })
    }
  }
  render() {
    
    return (
      <div className="home-popover broadcast">
      <p className='title'>
        <Icon type="sound" className='float-left' style={{ fontSize: 13 }} />{this.props.device.name}
        <Icon className='float-right' type="close" style={{ fontSize: 13 }} />  
      </p>
      <div className='broadcast-content'>
      <Tabs tabPosition='left'>
        <TabPane tab="喊话" key="1">
          <div className="hanhua-content" style={{width:'240px'}}>
          <p>喊话：00:10:01</p>
          <p>广播位置:f</p>
          <div className='hanhua_btn'>
          <img src={require('../../assets/imgs/broadcast_btn.png')} alt=""/>
          </div>
        </div>
        </TabPane>
        <TabPane tab="播报语音文件" key="2">
        <span className="float-right fileinput-button">
          <span>播报语音文件</span>
          <Input type="file" onChange={this.onChange.bind(this)}  />
        </span>
      
          <audio src={this.state.src} autoPlay="autoPlay" controls='controls' loop='loop'></audio>
        </TabPane>
      </Tabs>
       
      </div>
      
    </div>
    )
  }
}


