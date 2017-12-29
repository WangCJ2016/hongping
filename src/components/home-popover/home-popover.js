import React from 'react'
import './home-popover.scss'
import { Icon, Button, Tabs, Input } from 'antd'
const ButtonGroup = Button.Group;
const TabPane = Tabs.TabPane;

export function HomePerson() {
  return (
    <div className="home-popover">
      <p className='title'><Icon className="float-left" type="user" style={{ fontSize: 13 }} />张三</p>
      <p>电话：18868877305</p>
      <p>部门：工程部-施工部</p>
    </div>
  )
}

export function HomeCamera(props) {
  return (
    <div className="home-popover">
      <p className='title'>
        <Icon type="camera" className='float-left'  style={{ fontSize: 13 }} />洞室-1001
        <Icon className='float-right' type="close" style={{ fontSize: 13 }} onClick={props} />
      </p>
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
        <Icon type="sound" className='float-left' style={{ fontSize: 13 }} />洞室1东 100011
        <Icon className='float-right' type="close" style={{ fontSize: 13 }} />  
      </p>
      <div className='broadcast-content'>
      <Tabs tabPosition='left'>
        <TabPane tab="喊话" key="1">
          <div className="hanhua-content" style={{width:'240px'}}>
          <p>喊话：00:10:01</p>
          <p>广播位置:洞室1枪机</p>
          <div className='hanhua_btn'>
          <img src={require('../../assets/imgs/broadcast_btn.png')} alt=""/>
          </div>
        </div>
        </TabPane>
        <TabPane tab="播报语音文件" key="2">
          <Input type='file' onChange={this.onChange.bind(this)} defaultValue='播报语音文件'/>
          <audio src={this.state.src} autoplay="autoplay" controls='controls' loop='loop'></audio>
        </TabPane>
      </Tabs>
       
      </div>
      
    </div>
    )
  }
}


