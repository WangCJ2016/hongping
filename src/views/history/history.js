import React from 'react'
import { Input,Col,DatePicker,Select,Form,Row,Button,Table } from 'antd'
import { connect } from 'react-redux'
import { historyFstatistics } from '../../redux/status.redux'
import moment from 'moment'
const Option = Select.Option
const FormItem = Form.Item


const columns = [{
  title: '等级',
  dataIndex: 'degree',
  key: 'degree',
  render:(text,record)=>{
    if(text===0) {
      return <span>正常</span>
    }
    if(text===1) {
      return <span>非紧急</span>
    }
    if(text===2) {
      return <span>紧急</span>
    }
  }
},{
  title: '地点',
  dataIndex: 'place',
  key: 'place',
},{
  title: '时间',
  dataIndex: 'time',
  key: 'time',
},{
  title: '设备',
  dataIndex: 'device',
  key: 'device',
},{
  title: '设备类型',
  dataIndex: 'deviceType',
  key: 'deviceType',
},{
  title: '报警类型',
  dataIndex: 'type',
  key: 'type',
}]

@connect(
  state => ({status: state.status}),
  {
    historyFstatistics
  }
)
class History1 extends React.Component {
  state = {  }
  handleSearch(e) {
    this.props.form.validateFields((err, values) => {
      e.preventDefault()
      if (!err) {
        if(values.type==='0') {
          this.props.historyFstatistics({
            place: encodeURI(values.place),
            startTime: values.startTime.format('YYYY-MM-DD'),
            endTime:values.endTime.format('YYYY-MM-DD'),
          })
        }else{
          this.props.historyFstatistics({
            ...values,
            startTime: values.startTime.format('YYYY-MM-DD'),
            endTime:values.endTime.format('YYYY-MM-DD'),
          })
        }
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    };
    return (
      <div style={{padding:'20px'}}>
      <Form
          className="ant-advanced-search-form"
          onSubmit={this.handleSearch.bind(this)}
        >
          <Row gutter={40}>
            <Col span={5} >
              <FormItem {...formItemLayout} label={'地点'}>
                {getFieldDecorator('place',{
                  initialValue:''
                })(
                  <Input placeholder="请输入地址" />
                )}
              </FormItem>
            </Col>
            <Col span={5} >
            <FormItem {...formItemLayout} label={'起始时间'}>
              {getFieldDecorator('startTime',{
                initialValue: moment(new Date(), 'YYYY-MM-DD')
              })(
                <DatePicker format='YYYY-MM-DD' placeholder="请选择日期" />
              )}
            </FormItem>
          </Col>
            <Col span={5} >
            <FormItem {...formItemLayout} label={'结束日期'}>
              {getFieldDecorator('endTime',{
                initialValue: moment(new Date(), 'YYYY-MM-DD')
              })(
                <DatePicker format='YYYY-MM-DD' placeholder="请选择日期" />
              )}
            </FormItem>
          </Col>
          <Col span={5} >
            <FormItem {...formItemLayout} label={'类型'}>
              {getFieldDecorator('type',{
                initialValue:"0"
              })(
                <Select  >
                  <Option value="0">全部</Option>
                  <Option value="1">消防报警</Option>
                  <Option value="2">红外报警</Option>
                  <Option value="3" >移动侦测报警</Option>
                  <Option value="4">紧急呼叫</Option>
                  <Option value="5">巡更报警</Option>
              </Select>
              )}
            </FormItem>
          </Col>
          <Col span={4} >
            <FormItem {...formItemLayout} >
             
                <Button type='primary' htmlType="submit">搜索</Button>
              
            </FormItem>
          </Col>
          </Row>
          
        </Form>
        <Table columns={columns} dataSource={this.props.status.historyFstatistics}></Table>
      </div>
    )
  }
}

const History = Form.create()(History1)

export default History