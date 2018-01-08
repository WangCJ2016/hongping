import React from 'react'
import {Icon,Select} from 'antd'
const Option = Select.Option 

class VideoCtrlYuntai extends React.Component {
  state = {  }
  vvSelect(e){
    this.props.playCtrlChange({vv:e})
  }
  jjvSelect(e) {
    this.props.playCtrlChange({jjv:e})
  }
  jdvSelect(e) {
    this.props.playCtrlChange({jdv:e})
  }
  gqvSelect(e) {
    this.props.playCtrlChange({gqv:e})
  }
  render() {
    return (
      <div className='yuntai'>
        <div className="outround">
          <div className="inround"></div>
          <span className='btn' style={{left:'50%',top:'0px',transform:'translateX(-50%)'}}>
            <Icon type='up'/>
          </span>
          <span className='btn' style={{left:'50%',bottom:'0px',transform:'translateX(-50%)'}}>
            <Icon type='down'/>
          </span>
          <span className='btn' style={{top:'50%',left:'0px',transform:'translateY(-50%)'}}>
            <Icon type='left'/>
          </span>
          <span className='btn' style={{top:'50%',right:'0px',transform:'translateY(-50%)'}}>
            <Icon type='right'/>
          </span>
        </div>
        <div className="count-ctrl">
          <div>
            转速：
            <Select defaultValue={1} onSelect={this.vvSelect.bind(this)} style={{ width: 120 }}>
              <Option value={1}>1</Option>
              <Option value={2}>2</Option>
              <Option value={3}>3</Option>
              <Option value={4}>4</Option>
              <Option value={5}>5</Option>
              <Option value={6}>6</Option>
              <Option value={7}>7</Option>
              <Option value={8}>8</Option>
              <Option value={9}>9</Option>
              <Option value={10}>10</Option>
            </Select>
          </div>
          <div>
            焦距：
            <Select defaultValue={1} onSelect={this.jjvSelect.bind(this)} style={{ width: 120 }}>
              <Option value={1}>1</Option>
              <Option value={2}>2</Option>
              <Option value={3}>3</Option>
              <Option value={4}>4</Option>
              <Option value={5}>5</Option>
              <Option value={6}>6</Option>
              <Option value={7}>7</Option>
              <Option value={8}>8</Option>
              <Option value={9}>9</Option>
              <Option value={10}>10</Option>
            </Select>
          </div>
          <div>
            焦点：
            <Select defaultValue={1} onSelect={this.jdvSelect.bind(this)} style={{ width: 120 }}>
              <Option value={1}>1</Option>
              <Option value={2}>2</Option>
              <Option value={3}>3</Option>
              <Option value={4}>4</Option>
              <Option value={5}>5</Option>
              <Option value={6}>6</Option>
              <Option value={7}>7</Option>
              <Option value={8}>8</Option>
              <Option value={9}>9</Option>
              <Option value={10}>10</Option>
            </Select>
          </div>
          <div>
            光圈：
            <Select defaultValue={1} onSelect={this.gqvSelect.bind(this)} style={{ width: 120 }}>
              <Option value={1}>1</Option>
              <Option value={2}>2</Option>
              <Option value={3}>3</Option>
              <Option value={4}>4</Option>
              <Option value={5}>5</Option>
              <Option value={6}>6</Option>
              <Option value={7}>7</Option>
              <Option value={8}>8</Option>
              <Option value={9}>9</Option>
              <Option value={10}>10</Option>
            </Select>
          </div>
        </div>
      </div>
    )
  }
}

export default VideoCtrlYuntai