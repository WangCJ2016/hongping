import React from 'react'
import { Select, Input, Icon } from 'antd';
import './home-search.scss'
const Option = Select.Option;


class HomeSearch extends React.Component {
  
 handleChange(value) {
    console.log(`selected ${value}`);
  }
  render() {
    return (
      <div className="home-search">
      <span style={{'padding-left': 10}}>类型:</span>
      <Select defaultValue="people" style={{ width: 100}} onChange={this.handleChange}>
        <Option value="people">人员</Option>
        <Option value="warm">报警</Option>
        <Option value="car">车辆</Option>
     </Select>
     <Input
      
      style={{ width: 200 }}
    />
     <span className='search'>
       <Icon type='search' style={{color:'#fff'}}></Icon>
     </span>
      </div>
    )
  }
}

export default HomeSearch