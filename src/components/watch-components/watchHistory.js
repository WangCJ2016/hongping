import React from 'react'
import { connect } from 'react-redux'
import {watchHistoryPage,watchPointsUpload} from '../../redux/watch.redux'
import { Table,Button,Col,DatePicker,Form,Row } from 'antd'
import moment from 'moment'
const FormItem = Form.Item

const columns = [{
  title:'名称',
  dataIndex: 'name',
  key:'name'
},{
  title:'点位',
  dataIndex: 'point',
  key:'point'
},
{
  title:'时间',
  dataIndex: 'time',
  key:'time'
}]
@connect(
  state => ({watch: state.watch}),
  {
    watchHistoryPage,watchPointsUpload
  }
)
class WatchHistory1 extends React.Component {
  componentDidMount() {
    this.props.watchHistoryPage({
      pageNo:1,
      pageSize:10
    })
  }
  onChange(e) {
    this.props.watchHistoryPage({
      pageNo:e,
      pageSize:10
    })
  }
  handleSearch(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.watchHistoryPage({
          pageNo:1,
          pageSize:10,
          startTime:values.startTime.format('YYYY-MM-DD'),
          endTime:values.endTime.format('YYYY-MM-DD')
        })
      }
    });
  }
  render() {
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    };
    const { getFieldDecorator } = this.props.form
    return (
      <div>
      <Form
      className="ant-advanced-search-form"
      onSubmit={this.handleSearch.bind(this)}
    >
      <Row gutter={40}>
        <Col span={6} >
        <FormItem {...formItemLayout}  label={'起始时间'}>
          {getFieldDecorator('startTime',{
            initialValue: moment(new Date(), 'YYYY-MM-DD')
          })(
            <DatePicker format='YYYY-MM-DD' placeholder="请选择日期" />
          )}
        </FormItem>
      </Col>
        <Col span={6} >
        <FormItem {...formItemLayout}  label={'结束日期'}>
          {getFieldDecorator('endTime',{
            initialValue: moment(new Date(), 'YYYY-MM-DD')
          })(
            <DatePicker format='YYYY-MM-DD' placeholder="请选择日期" />
          )}
        </FormItem>
      </Col>
      <Col span={4} >
        <FormItem  >
         
            <Button type='primary' htmlType="submit">搜索</Button>
          
        </FormItem>
      </Col>
      </Row>
      
    </Form>
       
        <Table 
          columns={columns} 
          dataSource={this.props.watch.historyTasks}
          pagination={{
            onChange:this.onChange.bind(this),
            total:this.props.watch.historyTasksTotal,
            pageSize:10
          }}
          ></Table>
      </div>
    )
  }
}
const WatchHistory = Form.create()(WatchHistory1)
export default WatchHistory