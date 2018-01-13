import React from 'react'
import {DatePicker,TimePicker,Button,Form,message} from 'antd'
import { connect } from 'react-redux'
import {playBackData} from '../../redux/video.redux'
const FormItem = Form.Item;

@connect(
  state=>({video: state.video}),
 {playBackData}
)
class VideoSearch1 extends React.PureComponent {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(e) {
    e.preventDefault();
    if(!this.props.video.playbackSelectDevice) {
      message.error('请先选择设备')
      return
    }
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const device = this.props.video.playbackSelectDevice
        const model = device.host.model === 1?'HikHC-14':'DHNET-03'
        const a=this.props.play.XzVideo_FindDeviceFile(
          1,
          device.host.vid,
          device.host.url,
          device.host.port,
          device.host.username,
          device.host.psw,
          model,
          device.index,
          '2018-01-11 09:30:00',
          '2018-01-11 12:00:00')
          this.props.playBackData(a)
      }
    });
  }
  render() {
    const {getFieldDecorator} = this.props.form
    return (
      <div className='video-search'>
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <FormItem
            label='开始日期'
            >
              {getFieldDecorator('startDay', {
                rules: [{ required: true, message: '请输入开始日期' }],
              })(
                <DatePicker  />
              )}
          </FormItem>
          <FormItem
            label='开始时间'
            >
              {getFieldDecorator('startTime', {
                rules: [{ required: true, message: '请输入开始时间' }],
              })(
                <TimePicker  />
              )}
          </FormItem>
          <FormItem
            label='结束日期'
            >
              {getFieldDecorator('endDay', {
                rules: [{ required: true, message: '请输入结束日期' }],
              })(
                <DatePicker  />
              )}
          </FormItem>
          <FormItem
            label='结束时间'
            >
              {getFieldDecorator('endTime', {
                rules: [{ required: true, message: '请输入结束日期' }],
              })(
                <TimePicker  />
              )}
          </FormItem>
          <FormItem className='search-btn'>
            <Button type='primary' htmlType="submit" >搜索</Button>
          </FormItem>
        </Form>

      </div>
    )
  }
}

const VideoSearch = Form.create()(VideoSearch1);
export default VideoSearch