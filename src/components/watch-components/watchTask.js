import React from 'react'
import { connect } from 'react-redux'
import { getWatchTasks,addTask,editTask,TaskPoints,addPoint,dataSuccess,editPoint } from '../../redux/watch.redux'
import { Table,Button,Icon,Modal,Form,Input,Select,Popconfirm,Row,Col } from 'antd'
import WatchTaskTime from '../../components/watch-components/watchTaskTime'
const FormItem = Form.Item;
const Option = Select.Option

@connect(
  state=>({watch: state.watch}),
  {
    getWatchTasks,addTask,editTask,TaskPoints,addPoint,dataSuccess,editPoint
  }
)
class WatchTask1 extends React.Component {
  constructor() {
    super()
    this.state = {
      newTaskVisible: false,
      editTaskVisible: false,
      addPointVisible: false,
      selectTask:{
        title:'',
        day:''
      },
      selectPoint:{
        name:'',
        point:'',
        remark:''
      }
    } 
    this.addTask = this.addTask.bind(this)
    this.openEditModal = this.openEditModal.bind(this)
    this.editTask = this.editTask.bind(this)
    this.addPoint = this.addPoint.bind(this)
    this.rowClick = this.rowClick.bind(this)
    this.editPoint = this.editPoint.bind(this)
  }
  componentDidMount() {
    this.props.getWatchTasks()
  }
  addTask() {
    this.props.form.validateFields(['title','day'],(err, values)=>{
      if(!err) {
        const data = {
          title: encodeURI(values.title),
          day:values.day
        }
        this.props.addTask(data)
        this.setState({newTaskVisible:false})
        this.props.form.resetFields();
      }
    })
  }
  editTask() {
    this.props.form.validateFields(['edittitle','editday'],(err, values)=>{
      if(!err) {
        const data = {
          id: this.state.selectTask.id,
          title: encodeURI(values.edittitle),
          day: values.editday
        }
        this.props.editTask(data)
        this.setState({
          editTaskVisible: false,
        })
        this.props.form.resetFields();
      }
    })
  }
  addPoint() {
    this.props.form.validateFields(['addpointtitle','addpointnum','addpointremark'],(err, values)=>{
      if(!err){
        const data = {
          name: encodeURI(values.addpointtitle),
          point: values.addpointnum+'',
          remark: encodeURI(values.addpointremark),
          taskId: this.props.watch.selectTask.id
        }
        this.props.addPoint(data)
        this.setState({
          addPointVisible:false
        })
        this.props.form.resetFields()
      }
    })
  }
  editPoint() {
    this.props.form.validateFields(['editpointtitle','editpointnum','editpointremark'],(err, values)=>{
      if(!err) {
        const data = {
          name: encodeURI(values.editpointtitle),
          point: values.editpointnum+'',
          remark: encodeURI(values.editpointremark),
          taskId: this.props.watch.selectTask.id,
          id:this.state.selectPoint.id
        }
        this.props.editPoint(data)
        this.setState({editPointVisible: false})
        this.props.form.resetFields();
      }
    })
      
  }
  openEditModal(record) {
    this.setState({
      editTaskVisible: true,
      selectTask: record
    })
  }
  rowClick(record) {
    this.props.TaskPoints({taskId:record.id})
    this.props.dataSuccess({selectTask:record})
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const columns = [{
          title:'任务名称',
          dataIndex: 'title',
          key:'title'
        },
        {
          title:'星期',
          dataIndex: 'day',
          key:'day'
        },{
          title:'操作',
          dataIndex: 'action',
          key:'action',
          render:(text,record)=>(
            <span>
              <a onClick={()=>this.openEditModal(record)}><Icon type='edit'></Icon>编辑</a>
              <Popconfirm title="确定要删除任务吗?" onConfirm={()=>this.props.editTask({id:record.id,isDelete:1})} onCancel={()=>{}}  okText="确认" cancelText="取消">
                <a style={{marginLeft:'15px'}}><Icon type='delete'></Icon>删除</a>
              </Popconfirm>
            </span>
          )
    }]
    const columns2 = [{
      title:'点位名称',
        dataIndex: 'name',
        key:'name'
      },
      {
        title:'点位值',
        dataIndex: 'point',
        key:'point'
      },{
        title:'操作',
        dataIndex: 'action',
        key:'action',
        render:(text,record)=>(
          <span>
            <a onClick={()=>this.setState({editPointVisible:true,selectPoint:record})}><Icon type='edit'></Icon>编辑</a>
            <Popconfirm title="确定要删除任务吗?" onConfirm={()=>this.props.editPoint({id:record.id,taskId:this.props.watch.selectTask.id,isDelete:1})} onCancel={()=>{}}  okText="确认" cancelText="取消">
              <a style={{marginLeft:'15px'}}><Icon type='delete'></Icon>删除</a>
            </Popconfirm>
          </span>
        )
    }]
   
    return (
      <div>
         <WatchTaskTime></WatchTaskTime>
         <Row>
           <Col span={11}>
           <div style={{textAlign:'right'}}>
             <Button type="primary" onClick={()=>this.setState({newTaskVisible:true})}>
                <Icon type="plus" />新增任务
              </Button>
           </div>
            <Table columns={columns} onRowClick={(record)=>this.rowClick(record)} dataSource={this.props.watch.watchTasks}></Table>
           </Col>
           <Col span={2}></Col>
           <Col span={11}>
            <div style={{textAlign:'right'}}>
              <Button type="primary" onClick={()=>this.setState({addPointVisible:true})}>
              <Icon type="plus" />新增点位
              </Button>
            </div>
            <Table columns={columns2} dataSource={this.props.watch.taskPoints}></Table>
           </Col>
         </Row>
         
         <Modal
            title='新增任务'
            visible={this.state.newTaskVisible}
            okText='确定'
            cancelText='取消'
            onCancel={()=>{this.setState({newTaskVisible:false});this.props.form.resetFields();}}
            onOk={this.addTask}
            >
              <Form layout='inline'>
                <FormItem label="任务名称">
                  {getFieldDecorator('title',{
                    rules: [{ required: true,message: '请填写任务名称'}], 
                  })(<Input type="text" />)}
                </FormItem>
                <FormItem label="星期">
                  {getFieldDecorator('day',{
                    rules: [{ required: true,message: '请填写星期几'}], 
                    initialValue: '1'
                  })(
                    <Select>
                        <Option value='1'>星期一</Option>
                        <Option value='2'>星期二</Option>
                        <Option value='3'>星期三</Option>
                        <Option value='4'>星期四</Option>
                        <Option value='5'>星期五</Option>
                        <Option value='6'>星期六</Option>
                        <Option value='7'>星期日</Option>
                      </Select>
                  )}
                </FormItem>
              </Form> 
         </Modal>
           
        <Modal
          title='编辑任务'
          visible={this.state.editTaskVisible}
          okText='确定'
          cancelText='取消'
          onCancel={()=>{this.setState({editTaskVisible:false});this.props.form.resetFields();}}
          onOk={this.editTask}
          >
          <Form layout='inline'>
            <FormItem label="任务名称">
              {getFieldDecorator('edittitle',{
                rules: [{ required: true,message: '请填写任务名称'}], 
                initialValue: this.state.selectTask.title
              })(<Input type="text" />)}
            </FormItem>
            <FormItem label="星期">
              {getFieldDecorator('editday',{
                rules: [{ required: true,message: '请填写星期几'}], 
                initialValue: this.state.selectTask.day
              })(
                <Select>
                    <Option value='1'>星期一</Option>
                    <Option value='2'>星期二</Option>
                    <Option value='3'>星期三</Option>
                    <Option value='4'>星期四</Option>
                    <Option value='5'>星期五</Option>
                    <Option value='6'>星期六</Option>
                    <Option value='7'>星期日</Option>
                  </Select>
              )}
            </FormItem>
          </Form> 
        </Modal>

        <Modal
          title='新增点位'
          visible={this.state.addPointVisible}
          okText='确定'
          cancelText='取消'
          onCancel={()=>{this.setState({addPointVisible:false});this.props.form.resetFields();}}
          onOk={this.addPoint}
          >
          <Form layout='inline'>
            <FormItem label="点位名称">
              {getFieldDecorator('addpointtitle',{
                rules: [{ required: true,message: '请填写点位名称'}], 
                
              })(<Input type="text" />)}
            </FormItem>
            <FormItem label="点位值">
              {getFieldDecorator('addpointnum',{
                rules: [{ required: true,message: '请填写点位值'}], 
              })(
                <Input type="text" />
              )}
            </FormItem>
            <FormItem label="备注">
              {getFieldDecorator('addpointremark',{
              })(
                <Input type="text" />
              )}
            </FormItem>
          </Form> 
        </Modal>

        <Modal
          title='编辑点位'
          visible={this.state.editPointVisible}
          okText='确定'
          cancelText='取消'
          onCancel={()=>{this.setState({editPointVisible:false});this.props.form.resetFields();}}
          onOk={this.editPoint}
          >
          <Form layout='inline'>
            <FormItem label="点位名称">
              {getFieldDecorator('editpointtitle',{
                rules: [{ required: true,message: '请填写点位名称'}], 
                initialValue: this.state.selectPoint.name
              })(<Input type="text" />)}
            </FormItem>
            <FormItem label="点位值">
              {getFieldDecorator('editpointnum',{
                rules: [{ required: true,message: '请填写点位值'}], 
                initialValue: this.state.selectPoint.point
              })(
                <Input type="text" />
              )}
            </FormItem>
            <FormItem label="备注">
              {getFieldDecorator('editpointremark',{
                initialValue: this.state.selectPoint.remark
              })(
                <Input type="text" />
              )}
            </FormItem>
          </Form> 
        </Modal>
      </div>
    )
  }
}

const WatchTask = Form.create()(WatchTask1);
export default WatchTask