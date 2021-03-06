import React from 'react'
import { Input,Col,DatePicker,Select,Form,Row,Button,Table,Tabs,Modal } from 'antd'
import { connect } from 'react-redux'
import { historyFstatistics } from '../../redux/status.redux'
import { getUndoPatrolPoints } from '../../redux/alarm.redux'
import HistoryGraph  from './historyGraph'
import moment from 'moment'
const Option = Select.Option
const FormItem = Form.Item
const TabPane = Tabs.TabPane



@connect(
  state => ({status: state.status,alarm:state.alarm}),
  {
    historyFstatistics, getUndoPatrolPoints
  }
)
class History1 extends React.Component {
  state = {
    pointVisible: false
  } 
  handleSearch(pageNo,e) {
    this.props.form.validateFields((err, values) => {
      if(e) {
        e.preventDefault()
      }
      if (!err) {
        if(values.type==='0') {
          this.props.historyFstatistics({
            place: encodeURI(values.place),
            pageNo:pageNo,
            startTime: values.startTime.format('YYYY-MM-DD HH:mm:ss'),
            endTime:values.endTime.format('YYYY-MM-DD HH:mm:ss'),
          })
        }else{
          this.props.historyFstatistics({
            ...values,
            pageNo:pageNo,
            startTime: values.startTime.format('YYYY-MM-DD HH:mm:ss'),
            endTime:values.endTime.format('YYYY-MM-DD HH:mm:ss'),
          })
        }
      }
    });
  }
  pageChange = (e)=>{
    this.handleSearch(e)
  }
  pointHandle = (data) => {
    const name = data.event.split('：')[1].slice(0,-3)
    this.props.getUndoPatrolPoints({title: name, date: data.time})
    this.setState({
      pointVisible: true
    })
  }
  render() {
    const { type } = this.props
    console.log(type)
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
    },
    {
      title: '处理意见',
      dataIndex: 'suggest',
      key: 'suggest',
    },{
      title: '处理人',
      dataIndex: 'dealPerson',
      key: 'dealPerson',
   },{
     title: '操作',
     dataIndex: 'action',
     key: 'action',
     render: (text, record) => (
       <span>
         <Button type='primary' disabled={record.type!==5} onClick={this.pointHandle.bind(this, record)}>查看</Button>
       </span>
     )
   }]
   const columns1 = [{
    title: '名称',
    dataIndex: 'name',
    key:'name',
  },
  {
    title: '点位',
    dataIndex: 'point',
    key:'point',
  },
  {
    title: '备注',
    dataIndex: 'remark',
    key:'remark'
  }
  ]
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    }
    return (
      <div style={{padding:'20px'}}>
        <Tabs defaultActiveKey="1" >
          <TabPane tab="列表" key="1">
            <div>
              <Form
                className="ant-advanced-search-form"
                onSubmit={this.handleSearch.bind(this,0)}
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
                    initialValue: moment(new Date(), 'YYYY-MM-DD HH:mm:ss')
                  })(
                    <DatePicker showTime format='YYYY-MM-DD HH:mm:ss' placeholder="请选择日期" />
                  )}
                 </FormItem>
                </Col>
                <Col span={5} >
                <FormItem {...formItemLayout} label={'结束日期'}>
                  {getFieldDecorator('endTime',{
                    initialValue: moment(new Date(), 'YYYY-MM-DD HH:mm:ss')
                  })(
                    <DatePicker showTime format='YYYY-MM-DD HH:mm:ss' placeholder="请选择日期" />
                  )}
                </FormItem>
               </Col>
               <Col span={5} >
                <FormItem {...formItemLayout} label={'类型'}>
                  {getFieldDecorator('type',{
                    initialValue: type === 5 ? '5' : '0',
                    disabled: true
                  })(
                    <Select disabled={type === 5 ? true : false}>
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
              <Table 
                columns={columns} 
                dataSource={this.props.status.historyFstatistics}
                pagination={{
                  total: this.props.status.historyTotal,
                  onChange: this.pageChange
                }}
                ></Table>
            </div>
          </TabPane>
          <TabPane tab="统计图" key="2">
            <HistoryGraph></HistoryGraph>
          </TabPane>
        </Tabs>
        
        <Modal
          title="巡更点位" 
          visible={this.state.pointVisible}
          onOk={this.props.handlePointOk} 
          onCancel={()=>this.setState({pointVisible: false})}
          className='home-warm-modal'
          footer={null} 
         >
         {
          this.props.alarm.unhandlePoints?
          <Table size='small' columns={columns1} dataSource={this.props.alarm.unhandlePoints}  rowKey={(record)=>{return record.id}}></Table>:
          null
         }
          
        </Modal>
      </div>  
    )
  }
}

const History = Form.create()(History1)

export default History