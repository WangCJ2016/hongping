import React from 'react'
import { Form,Button,Row,Col,TimePicker } from 'antd'
import { connect} from 'react-redux'
import { getTaskDefaultTime,setTaskTime } from '../../redux/watch.redux'
import moment from 'moment'
const FormItem = Form.Item
const format = 'HH:mm'

@connect(
  state=>({watch: state.watch}),{
    getTaskDefaultTime,setTaskTime
  }
)
class WatchTaskTime1 extends React.Component {
  constructor() {
    super()
    this.setTime = this.setTime.bind(this)
    this.clearTIme = this.clearTIme.bind(this)
  }
  componentDidMount() {
    this.props.getTaskDefaultTime()
  }
  setTime() {
    this.props.form.validateFields((err,values)=>{
      if(!err) {
        if(this.props.watch.taskTime) {
          this.props.setTaskTime({time:values.time.format('H:mm'),type:'modify'})
        }else{
          this.props.setTaskTime({time:values.time.format('H:mm'),type:'set'})
        }
      }
    })
  }
  clearTIme() {
    this.props.setTaskTime({type:'clear'})
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const timeProp = this.props.watch.taskTime?{
      initialValue: moment(this.props.watch.taskTime,format),
      rules: [{ required: true,message: '请填写任务时间'}],
    }:{
      rules: [{ required: true,message: '请填写任务时间'}],
    }
    console.log(1)
    return (
      <div style={{marginBottom:'30px'}}>
      <Form layout="inline">
        <Row>
          <Col span={12}>
            <FormItem
            label='设置任务时间'
            >
              {getFieldDecorator('time', timeProp)(
                <TimePicker placeholder='请选择时间'  format={format} />
              )}
            </FormItem>
          </Col>
          <Col span={2}>
            <FormItem
            >
                <Button onClick={this.setTime} type='primary'>设置</Button>
            </FormItem>
          </Col>
          <Col span={2}>
            <FormItem
            >
                <Button onClick={this.clearTIme} type='primary'>清除</Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
      </div>
    )
  }
}

const WatchTaskTime = Form.create()(WatchTaskTime1);
export default WatchTaskTime