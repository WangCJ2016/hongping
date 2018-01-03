import React from 'react'
import { Icon, Table, Popconfirm, Modal, Form, Input, Select } from 'antd'
import { connect } from 'react-redux'
import { createChannel,modifyChannel } from '../../redux/setting.broadcast.redux'
const FormItem = Form.Item;
const Option = Select.Option;

@connect(
  state => state.broadcastHost,
  {createChannel,modifyChannel}
)
class SettingVideoBroadcastChannelDetail1 extends React.Component {
  state = {
    createVisible:false,
    editVisible: false,
    selectChannel: null
   }
  createSubmit() {
    this.props.form.validateFields(['name','index','type','icon','remark'],(err, values)=>{
      if(!err) {
        values.name = encodeURI(values.name)
        values.remark = encodeURI(values.remark)
        this.props.createChannel({...values,hostId:this.props.selectHost.id})
        this.setState({
          createVisible: false
        })
      }
    })
  }
  editSubmit() {
    this.props.form.validateFields(['editname','editindex','edittype','editicon','editremark'],(err, values)=>{
      if(!err) {
        const info={
          id: this.state.selectChannel.id,
          name: encodeURI(values.editname),
          index: values.editindex,
          type: values.edittype,
          icon: values.editicon,
          remark: encodeURI(values.editremark),
          hostId:this.props.selectHost.id
        }
        this.props.modifyChannel(info)
        this.setState({
          editVisible: false
        })
      }
    })
  }
  delete(id) {
    this.props.modifyChannel({id: id, isDelete:1})
  }
  render() {
    const columns = [ {
              title: 'tip',
              dataIndex: 'icon',
              width: '20%',
              key: 'icon',
              render: (text,record) => (
                <img src={require(`../../assets/imgs/${record.icon}.png`)} alt=""/>
              )
            },{
              title: '通道名称',
              dataIndex: 'name',
              width: '60%',
              key: 'name',
            }, {
              title: '操作',
              dataIndex: 'action',
              key: 'remark',
              render: (text,record) => (
                <span className='video-action'>
                  <a><Icon type='edit' onClick={()=>this.setState({editVisible:true,selectChannel:record})}/></a>
                  <a>
                    <Popconfirm title="确定删除？" onConfirm={this.delete.bind(this,record.id)}  okText="确定" cancelText="取消">
                    <Icon type='delete'/>
                    </Popconfirm>
                  </a>
                </span>
              )
            }];
      const { getFieldDecorator } = this.props.form;
      const channelsList = this.props.channelsList
      const selectChannel = this.state.selectChannel
    return (
      <div className="setting-user-role float-right" style={{width:'65%'}}>
        <div className="title role">通道<div className='abosulte' onClick={()=>this.setState({createVisible:true})}><Icon type='plus'/></div></div>
        {channelsList? <Table
          columns={columns}
          dataSource={channelsList}
          size="middle"
          showHeader={false}
          pagination={false}/>:null}
          <Modal title="添加通道"
            visible={this.state.createVisible}
            style={{ top: 200 }}
            width='50%'
            okText='确定'
            cancelText='取消'
            onOk={this.createSubmit.bind(this)}
            onCancel={()=>this.setState({createVisible:false})}
            >
            <Form layout='inline'>
              <FormItem label="通道名称">
                {getFieldDecorator('name',{
                  rules: [{ required: true,message: '请填写通道名称'}],
                })(<Input type="text" />)}
              </FormItem>
              <FormItem label="序号">
                {getFieldDecorator('index',{
                  rules: [{ required: true,message: '请填写地址编号'}],
                })(<Input type="text" />)}
              </FormItem>
              <FormItem label="通道类型">
                {getFieldDecorator('type',{
                  rules: [{ required: true,message: '请填写类型'}],
                  initialValue: '1'
                })(
                  <Select>
                    <Option value='1'>可视</Option>
                    <Option value='2'>热成像</Option>
                    <Option value='3'>道闸</Option>
                  </Select>
                )}
              </FormItem>
              <FormItem label="图标">
                {getFieldDecorator('icon',{
                  rules: [{ required: true,message: '请填写图标'}],
                  initialValue: 'ipc'
                })(
                  <Select>
                    <Option value='ipc'><img src={require('../../assets/imgs/ipc.png')} alt=""/></Option>
                    <Option value='nvr'><img src={require('../../assets/imgs/nvr.png')} alt=""/></Option>
                  </Select>
                )}
              </FormItem>
              <FormItem label="备注">
                {getFieldDecorator('remark',{
                  initialValue: ''
                })(<Input type="text" />)}
              </FormItem>
            </Form>
          </Modal>

          <Modal title="编辑通道"
            visible={this.state.editVisible}
            style={{ top: 200 }}
            width='50%'
            okText='确定'
            cancelText='取消'
            onOk={this.editSubmit.bind(this)}
            onCancel={()=>this.setState({editVisible:false})}
            >
            <Form layout='inline'>
              <FormItem label="通道名称">
                {getFieldDecorator('editname',{
                  rules: [{ required: true,message: '请填写通道名称'}],
                  initialValue:selectChannel?selectChannel.name:''
                })(<Input type="text" />)}
              </FormItem>
              <FormItem label="序号">
                {getFieldDecorator('editindex',{
                  rules: [{ required: true,message: '请填写地址编号'}],
                  initialValue:selectChannel?selectChannel.index:''
                })(<Input type="text" />)}
              </FormItem>
              <FormItem label="通道类型">
                {getFieldDecorator('edittype',{
                  rules: [{ required: true,message: '请填写类型'}],
                  initialValue:selectChannel?selectChannel.type:''
                })(
                  <Select>
                    <Option value='1'>可视</Option>
                    <Option value='2'>热成像</Option>
                    <Option value='3'>道闸</Option>
                  </Select>
                )}
              </FormItem>
              <FormItem label="图标">
                {getFieldDecorator('editicon',{
                  rules: [{ required: true,message: '请填写图标'}],
                  initialValue:selectChannel?selectChannel.icon:''
                })(
                  <Select>
                  
                  </Select>
                )}
              </FormItem>
              <FormItem label="备注">
                {getFieldDecorator('editremark',{
                  initialValue:selectChannel?selectChannel.remark:''
                })(<Input type="text" />)}
              </FormItem>
            </Form>
          </Modal>
    </div>
    )
  }
}
const SettingVideoBroadcastChannelDetail = Form.create()(SettingVideoBroadcastChannelDetail1);
export default SettingVideoBroadcastChannelDetail
