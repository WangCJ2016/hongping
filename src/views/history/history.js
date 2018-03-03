import React from 'react'
import { Input,Col,DatePicker,Select,Form,Row,Button,Table } from 'antd'
import { connect } from 'react-redux'
import { historyFstatistics } from '../../redux/status.redux'
import moment from 'moment'
const { MonthPicker } = DatePicker
const Option = Select.Option
const FormItem = Form.Item


const columns = [{
  title: '名称',
  dataIndex: 'event',
  key: 'event',
},{
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
        const month = new Date(values['date']).getMonth()+1<=9?'0'+(new Date(values['date']).getMonth()+1):new Date(values['date']).getMonth()+1
        this.props.historyFstatistics({
          ...values,
          date: new Date(values['date']).getFullYear() +'-'+ month
        })
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
            <Col span={6} >
              <FormItem {...formItemLayout} label={'地点'}>
                {getFieldDecorator('place',{
                  initialValue:''
                })(
                  <Input placeholder="请输入地址" />
                )}
              </FormItem>
            </Col>
            <Col span={6} >
            <FormItem {...formItemLayout} label={'日期'}>
              {getFieldDecorator('date',{
                initialValue: moment(new Date(), 'YYYY-MM')
              })(
                <MonthPicker format='YYYY-MM' placeholder="请选择日期" />
              )}
            </FormItem>
          </Col>
          <Col span={6} >
            <FormItem {...formItemLayout} label={'类型'}>
              {getFieldDecorator('type',{
                initialValue:"1"
              })(
                <Select  >
                  <Option value="1">消防报警</Option>
                  <Option value="2">红外报警</Option>
                  <Option value="3" >移动侦测报警</Option>
                  <Option value="4">紧急呼叫</Option>
                  <Option value="5">巡更报警</Option>
              </Select>
              )}
            </FormItem>
          </Col>
          <Col span={6} >
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