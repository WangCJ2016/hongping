import React from 'react'
import { Col,DatePicker,Select,Form,Row,Button } from 'antd'
import { connect } from 'react-redux'
import { historyStatisticsChart } from '../../redux/status.redux'
import moment from 'moment'

import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'

const Option = Select.Option
const FormItem = Form.Item
const { MonthPicker } = DatePicker

@connect(
  state => ({status: state.status}),
  {
    historyStatisticsChart
  }
)
class HistoryGraph1 extends React.Component {
  constructor() {
    super()
    this.state = {
      dateFormat: 'YYYY-MM'
    }
    this.hanleSearchType = this.hanleSearchType.bind(this)
  }
  componentDidMount() {
    this.props.historyStatisticsChart({
      type: 0,
      searchType: 'chartM',
      date:moment(new Date()).format(this.state.dateFormat)
    })
  }
  handleSearch(e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if(!err) {
        this.props.historyStatisticsChart({
          type: values.type,
          searchType: values.searchType,
          date: values.date.format(this.state.dateFormat),
        })
      }
    })
  }
  hanleSearchType(e) {
    if(e==='chartY') {
      this.setState({
        dateFormat: 'YYYY'
      })
    }else{
      this.setState({
        dateFormat: 'YYYY-MM'
      })
    }
  }
  graphRender() {
    const data = this.props.status.historyStatisticsChartList.map(item => ({...item,count:item.count-0}))
    return (
      <BarChart width={900} height={600} data={data}
              margin={{top: 5, right: 30, left: 20, bottom: 5}}>
        <XAxis dataKey="date"/>
        <YAxis/>
        <CartesianGrid strokeDasharray="3 3"/>
        <Tooltip/>
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
    )
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    };
    return (
      <div>
        <Form
            className="ant-advanced-search-form"
            onSubmit={this.handleSearch.bind(this)}
            >
            <Row gutter={40}>
            <Col span={7} >
              <FormItem {...formItemLayout} label={'统计类型'}>
                {getFieldDecorator('searchType',{
                  initialValue: 'chartM'
                })(
                  <Select onChange={this.hanleSearchType} >
                    <Option value="chartM">按月</Option>
                    <Option value="chartY">按年</Option>
                 </Select>
                )}
              </FormItem>
            </Col>
            <Col span={7} >
              <FormItem {...formItemLayout} label={'时间'}>
                {getFieldDecorator('date',{
                  initialValue: moment(new Date(), this.state.dateFormat)
                })(
                  <MonthPicker showTime format={this.state.dateFormat} placeholder="请选择日期" />
                )}
              </FormItem>
            </Col>
            <Col span={7} >
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
            <Col span={3} >
              <FormItem {...formItemLayout} >
                
                  <Button type='primary' htmlType="submit">搜索</Button>
                
              </FormItem>
            </Col>
            </Row>
        </Form>
        <div className='history_center'>
        {this.graphRender()}
        </div>
      </div>
    )
  }
}

const HistoryGraph = Form.create()(HistoryGraph1)
export default HistoryGraph