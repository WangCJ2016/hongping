import React from 'react'
import { Checkbox, Button } from 'antd';
import './home-table-list.scss'
class HomeTableList extends React.Component {
  
  render() {
    return (
      <div className="list">
       <div className="item">
       <Button type='primary'>一键处理</Button>
       </div>
        
        <div className="item danger">
          <Checkbox></Checkbox>
          <span className='status'>未处理</span>
          <span className='time'>2017-09-6 12:04:04</span>
          <span className='type'>消防警报(故障/火警)</span>
          <Button size='small' ghost>紧急</Button>
          <span className='device'>b9001设备</span>
        </div>
        <div className="item warm">
          <Checkbox></Checkbox>
          <span className='status'>未处理</span>
          <span className='time'>2017-09-6 12:04:04</span>
          <span className='type'>消防警报(故障/火警)</span>
          <Button size='small'>紧急</Button>
          <span className='device'>b9001设备</span>
      </div>
      <div className="item">
      <Checkbox></Checkbox>
      <span className='status'>未处理</span>
      <span className='time'>2017-09-6 12:04:04</span>
      <span className='type'>消防警报(故障/火警)</span>
      <Button size='small'>紧急</Button>
      <span className='device'>b9001设备</span>
    </div>
      </div>
    )
  }
}

export default HomeTableList