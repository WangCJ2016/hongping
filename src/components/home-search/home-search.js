import React from 'react'
import { Select, Input, Icon } from 'antd';
import { connect } from 'react-redux'
import { searchChannel,searchBroadcast,searchDeviceSuccess } from '../../redux/setting.device.redux'
import './home-search.scss'
import HomeSearchPerson from '../home-search-person/home-search-person'
import HomeSearchCamera from '../home-search-device/home-search-device'

const Option = Select.Option;

@connect(
  state=>state.devices,
  {searchChannel,searchBroadcast,searchDeviceSuccess}
)
class HomeSearch extends React.Component {
 state={
  peopleResult: false,
  bordcastResult: false,
  cameraResult: true,
  search:''
 }
 handleChange(value) {
    this.setState({
      peopleResult: false,
      bordcastResult: false,
      cameraResult: false,
      search:''
    },function() {
      this.setState({
        [value+'Result']:true
      })
    })
    this.props.searchDeviceSuccess([])
  }
  searchContent(e) {
    this.setState({search: e.target.value})
  }
  search() {
    if(this.state.cameraResult) {
      this.props.searchChannel({name: encodeURI(this.state.search),pageNo:1,pageSize:10})
    }
    if(this.state.bordcastResult) {
      this.props.searchBroadcast({name: encodeURI(this.state.search),pageNo:1,pageSize:10})
    }
  }
  render() {
    console.log(this.props)
    return (
      <div className="home-search">
       <div className='home-search-btn'>
          <span style={{'paddingLeft': 10}}>类型:</span>
          <Select defaultValue="camera" style={{ width: 100}} onChange={this.handleChange.bind(this)}>
            <Option value="camera">摄像头</Option>
            <Option value="bordcast">广播</Option>
            <Option value="people">人员</Option>
          </Select>
          <Input
             style={{ width: 200 }} value={this.state.search} onChange={this.searchContent.bind(this)}
          />
          <span className='search' onClick={this.search.bind(this)}>
            <Icon type='search' style={{color:'#fff'}}></Icon>
          </span>
       </div>
        <div className="home-search-result">
        { this.state.peopleResult? <HomeSearchPerson />:null}
        { this.state.cameraResult||this.state.bordcastResult? 
          <HomeSearchCamera 
           cameraResult={this.state.cameraResult}
           bordcastResult={this.state.bordcastResult}
           searchDevice={this.props.searchDevice} 
           searchName={this.state.search}
           searchChannel={this.props.searchChannel}
           searchBroadcast={this.props.searchBroadcast} />:null}
        </div>
      </div>
    )
  }
}

export default HomeSearch