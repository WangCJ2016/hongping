import React from 'react'
import { Button,Form,Row,Col,Select,Table } from 'antd'
import { connect } from 'react-redux'
import { watchPointsUpload } from '../../redux/watch.redux'
const FormItem = Form.Item
const Option = Select.Option
const columns = [
  {
    title: '时间',
    dataIndex: 'time',
    key: 'time',
  },{
    title: '钮号',
    dataIndex: 'point',
    key: 'point',
  }
]

@connect(
  null,
  {
    watchPointsUpload
  }
)
class WatchUpload1 extends React.Component {
  constructor() {
    super()
    this.state = {
      watchData: []
    }
    this.submit = this.submit.bind(this)
    this.upload = this.upload.bind(this)
  }
  submit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let watchData = []
       
        const count = this.play.hcPTcomm(10,1)
        console.log(count)
        for(let i=0;i<count;i++) {
          const a = this.play.hcPTrecord(i)
          const dataStr = a.slice(0,8)
          watchData.push({time:dataStr.slice(-2)+'-'+dataStr.slice(4,6)+'-'+dataStr.slice(2,4)+'-'+dataStr.slice(0,2),point:a.slice(8)})
        }
        this.setState({
          watchData: watchData
        })
      }
    });
  }
  upload() {
   // if(this.state.watchData.length===0) {return}
    let time = []
    let points = []
    this.state.watchData.forEach(item => {
      time.push(item.time)
      points.push(item.point)
    })
    this.props.watchPointsUpload({times:'2018-01-01 11:11:11',points:'1.1'})
  }
  render() {
    const {getFieldDecorator} = this.props.form 
    return (
      <div>
        <Form layout="inline" onSubmit={this.submit}>
          <Row>
            <Col span={6}>
              <FormItem
              label='串口'
              >
                {getFieldDecorator('chuankou', {
                  initialValue:1
                })(
                  <Select  style={{ width: 120 }}>
                    <Option value="1">1</Option>
                    <Option value="2">2</Option>
                    <Option value="3">3</Option>
                    <Option value="4">4</Option>
                    <Option value="5">5</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem
              >
              {getFieldDecorator('boud', {
                initialValue:'9600'
              })(
                <Select style={{ width: 120 }}>
                  <Option value="4800">4800</Option>
                  <Option value="9600">9600</Option>
                  <Option value="19200">19200</Option>
                </Select>
              )}
              </FormItem>
            </Col>
            <Col span={4}>
              <FormItem
              >
                  <Button htmlType='submit' type='primary'>获取巡更数据</Button>
              </FormItem>
            </Col>
            <Col span={4}>
              <FormItem
              >
                <Button onClick={this.upload} type='primary'>巡更上传</Button>
              </FormItem>
            </Col>
          </Row>
        </Form>
        <Table
          columns={columns}
          dataSource={this.state.watchData}
        ></Table>
        <object ref={(screen)=>this.play=screen} 
            classID="clsid:330B9C94-354F-45C1-B100-C2502CF22EA3"
            codebase="./SetupOCX.exe#version=1.0.0.1"
            width={0}
            height={0}  
        >
        </object>
      </div>
    )
  }
}
const WatchUpload = Form.create()(WatchUpload1)
export default WatchUpload

