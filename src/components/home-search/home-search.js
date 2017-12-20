import React from 'react'
import { Select, Input, Icon } from 'antd';
import './home-search.scss'
import HomeSearchPerson from '../home-search-person/home-search-person'
import HomeSearchCamera from '../home-search-camera/home-search-camera'
import HomeSearchBroadcast from '../home-search-broadcast/home-search-broadcast'
const Option = Select.Option;


class HomeSearch extends React.Component {
 state={
  peopleResult: false,
  bordcastResult: true,
  cameraResult: false
 }
 handleChange(value) {
    console.log(`selected ${value}`);
    this.setState({
      peopleResult: false,
      bordcastResult: false,
      cameraResult: false
    },function() {
      this.setState({
        [value+'Result']:true
      })
    })
    
  
  }
  render() {

    return (
      <div className="home-search">
       <div className='home-search-btn'>
          <span style={{'paddingLeft': 10}}>类型:</span>
          <Select defaultValue="people" style={{ width: 100}} onChange={this.handleChange.bind(this)}>
            <Option value="camera">摄像头</Option>
            <Option value="bordcast">广播</Option>
            <Option value="people">人员</Option>
          </Select>
          <Input
             style={{ width: 200 }}
          />
          <span className='search'>
            <Icon type='search' style={{color:'#fff'}}></Icon>
          </span>
       </div>
        <div className="home-search-result">
        { this.state.peopleResult? <HomeSearchPerson />:null}
        { this.state.cameraResult? <HomeSearchCamera />:null}
        { this.state.bordcastResult? <HomeSearchBroadcast />:null}
        </div>
      </div>
    )
  }
}

export default HomeSearch