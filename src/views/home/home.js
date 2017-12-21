import React from 'react'
import { Button,Popover, Input } from 'antd'
import HomeTable from '../../components/home-table/home-table'
import { HomePerson, HomeCamera, HomeBroadcast } from '../../components/home-popover/home-popover'
import  HomeSearch  from '../../components/home-search/home-search'
import HomeWarmModal from '../../components/home-warm/home-warm'
import './home.scss'

class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      visible: false,
      modalvisible: false
    }
  }
  
  hide() {
    this.setState({
      visible: false,
    });
  }
  handleVisibleChange(visible) {
    this.setState({ visible });
  }
  
  // modal
  handleModalOk(e) {
    console.log(e);
    this.setState({
      modalvisible: false,
    });
  }
  handleCancel(e) {
    console.log(e);
    this.setState({
      modalvisible: false,
    });
  }
  render() {
    return (
      <div className='home-page'>
        <HomeSearch />
        <Popover content={HomePerson()} trigger="click"  >
          <Button>人员</Button>
        </Popover>
        <Popover 
          content={HomeCamera(this.hide.bind(this))}
          trigger="click"
          visible={this.state.visible}
          onVisibleChange={this.handleVisibleChange.bind(this)}>
          <Button>摄像头</Button>
        </Popover>
        <Popover content={<HomeBroadcast />} trigger="click"  >
         <Button>广播</Button>
       </Popover>
        <div className='HomeTable'>
          <HomeTable />
        </div>
        <Button onClick={()=>this.setState({modalvisible:true})}>警报处理</Button>
        <HomeWarmModal 
        visible={this.state.modalvisible}
        handleOk={this.handleModalOk.bind(this)}
        handleCancel={this.handleCancel.bind(this)} />
      </div>
    )
  }
}

export default Home