import React from 'react'
import {Icon,Select} from 'antd'
const Option = Select.Option

class VideoCtrlParam extends React.Component {
  state = {  }
  render() {
    return (
      <div className='yuntai'>
        <div className="count-ctrl">
          <div>
          <span className='title'>亮度：</span>
            <Select defaultValue='1' style={{ width: 120 }}>
              <Option value='1'>1</Option>
              <Option value='2'>2</Option>
              <Option value='3'>3</Option>
              <Option value='4'>4</Option>
              <Option value='5'>5</Option>
              <Option value='6'>6</Option>
              <Option value='7'>7</Option>
              <Option value='8'>8</Option>
              <Option value='9'>9</Option>
              <Option value='10'>10</Option>
            </Select>
          </div>
          <div>
          <span className='title'>对比度：</span>
            <Select defaultValue='1' style={{ width: 120 }}>
              <Option value='1'>1</Option>
              <Option value='2'>2</Option>
              <Option value='3'>3</Option>
              <Option value='4'>4</Option>
              <Option value='5'>5</Option>
              <Option value='6'>6</Option>
              <Option value='7'>7</Option>
              <Option value='8'>8</Option>
              <Option value='9'>9</Option>
              <Option value='10'>10</Option>
            </Select>
          </div>
          <div>
          <span className='title'>色度：</span>
            <Select defaultValue='1' style={{ width: 120 }}>
              <Option value='1'>1</Option>
              <Option value='2'>2</Option>
              <Option value='3'>3</Option>
              <Option value='4'>4</Option>
              <Option value='5'>5</Option>
              <Option value='6'>6</Option>
              <Option value='7'>7</Option>
              <Option value='8'>8</Option>
              <Option value='9'>9</Option>
              <Option value='10'>10</Option>
            </Select>
          </div>
          <div>
          <span className='title'>饱和度：</span>
            <Select defaultValue='1' style={{ width: 120 }}>
              <Option value='1'>1</Option>
              <Option value='2'>2</Option>
              <Option value='3'>3</Option>
              <Option value='4'>4</Option>
              <Option value='5'>5</Option>
              <Option value='6'>6</Option>
              <Option value='7'>7</Option>
              <Option value='8'>8</Option>
              <Option value='9'>9</Option>
              <Option value='10'>10</Option>
            </Select>
          </div>
          <div>
          <span className='title'>音量：</span>
            <Select defaultValue='1' style={{ width: 120 }}>
              <Option value='1'>1</Option>
              <Option value='2'>2</Option>
              <Option value='3'>3</Option>
              <Option value='4'>4</Option>
              <Option value='5'>5</Option>
              <Option value='6'>6</Option>
              <Option value='7'>7</Option>
              <Option value='8'>8</Option>
              <Option value='9'>9</Option>
              <Option value='10'>10</Option>
          </Select>
          </div>
        </div>
      </div>
    )
  }
}

export default VideoCtrlParam