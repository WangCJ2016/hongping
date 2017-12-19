import React from 'react'
import { Button,Popover } from 'antd'
import HomeTable from '../../components/home-table/home-table'
import { HomePerson, HomeCamera } from '../../components/home-popover/home-popover'
import  HomeSearch  from '../../components/home-search/home-search'
import './home.scss'

class Home extends React.Component {
  state = {
    visible: false,
  }
  hide() {
    this.setState({
      visible: false,
    });
  }
  handleVisibleChange(visible) {
    this.setState({ visible });
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
        <div className='HomeTable'>
          <HomeTable />
        </div>
      </div>
    )
  }
}

export default Home