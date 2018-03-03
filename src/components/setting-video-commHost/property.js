import React from 'react'
import { Icon, Table, Popconfirm, Modal, Form, Input, Select } from 'antd'
import { connect } from 'react-redux'
import { createProperty, modifyProperty }  from '../../redux/setting.commHost.redux'
const FormItem = Form.Item;
const Option = Select.Option;

@connect(
  state => state.commHost,
  {createProperty,modifyProperty}
)
class Property1 extends React.Component {
  state = { 
    createVisible:false,
    editVisible:false,
    selectProperty: null
   }
  delete(id) {
    this.props.modifyProperty({
      id:id,
      isDelete:1
    })
  }
  createSubmit() {
    this.props.form.validateFields(['name','addressCode','type'],(err, values)=>{
      if(!err) {
        this.props.createProperty({...values,devHostId:this.props.selectDevice.id,name:encodeURI(values.name)})
        this.setState({
          createVisible: false
        })
      }
    })
  }
  editSubmit() {
    this.props.form.validateFields(['editname','editaddressCode','edittype'],(err, values)=>{
      if(!err) {
        this.props.modifyProperty({
          devHostId:this.props.selectDevice.id,
          id:this.state.selectProperty.id,
          name:encodeURI(values.editname),
          addressCode: values.editaddressCode,
          type:values.edittype,
          icon:values.editicon
        })
        this.setState({
          editVisible: false
        })
      }
    })
  }
  render() {
    const columns = [{
      title: 'icon',
      dataIndex: 'icon',
      key: 'icon',
      width: '30%',
      render: (text, record)=>{
       return record.icon?
        <img src={require(`../../assets/imgs/${record.icon}.png`)} alt=""/>:null
      }
      },{
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          width: '40%',
        },{
          title: 'Action',
          key: 'action',
          render: (text, record) => (
            <span className='video-action'>
              <a><Icon type='edit' onClick={() => this.setState({selectProperty:record,editVisible:true})}/></a>
              <a>
                <Popconfirm title="确定删除？" onConfirm={this.delete.bind(this,record.id)}  okText="确定" cancelText="取消">
                <Icon type='delete'/>
                </Popconfirm>
              </a>
            </span>
          )
      }
    ]
  const { getFieldDecorator } = this.props.form;
  const commPorperty = this.props.coomProperties
  const selectProperty = this.state.selectProperty
    return (
        <div className="setting-user-role setting-video-device  float-right">
          <div className="title role">通信属性<div className='abosulte' onClick={()=>this.setState({createVisible:true})}><Icon type='plus'/></div></div>
          {commPorperty?<Table
            columns={columns}
            size='middle'
            showHeader={false}
            pagination={false}
           dataSource={commPorperty} />:null}
           <Modal title="添加属性" 
            visible={this.state.createVisible}
            style={{ top: 200 }}
            width='50%'
            okText='确定'
            cancelText='取消'
            onOk={this.createSubmit.bind(this)}
            onCancel={()=>this.setState({createVisible:false})}
            >
            <Form layout='inline'>
              <FormItem label="属性名称">
                {getFieldDecorator('name',{
                  rules: [{ required: true,message: '请填写属性名称'}], 
                })(<Input type="text" />)}
              </FormItem>
              <FormItem label="地址编号">
                {getFieldDecorator('addressCode',{
                  rules: [{ required: true,message: '请填写地址编号'}], 
                })(<Input type="text" />)}
              </FormItem>
              <FormItem label="图标">
              {/* {getFieldDecorator('icon',{
                rules: [{ required: true,message: '请填写图标'}],
                initialValue: 'ipc'
              })(
                <Select>
                  <Option value='ipc'><img src={require('../../assets/imgs/ipc.png')} alt=""/></Option>
                  <Option value='nvr'><img src={require('../../assets/imgs/nvr.png')} alt=""/></Option>
                </Select>
              )} */}
            </FormItem>
              <FormItem label="类型">
                {getFieldDecorator('type',{
                  rules: [{ required: true,message: '请填写类型'}], 
                  initialValue: '10003'
                })(
                  <Select>
                    <Option value='10003'>门禁</Option>
                    <Option value='10051'>入口</Option>
                    <Option value='10056'>出口</Option>
                    <Option value='10008'>烟感</Option>
                    <Option value='10021'>手报</Option>
                  </Select>
                )}
              </FormItem>
            </Form>
          </Modal>
          {/* 修改属性 */}
          <Modal title="修改属性" 
              visible={this.state.editVisible}
              style={{ top: 200 }}
              width='50%'
              okText='确定'
              cancelText='取消'
              onOk={this.editSubmit.bind(this)}
              onCancel={()=>this.setState({editVisible:false})}
              >
              <Form layout='inline'>
                <FormItem label="属性名称">
                  {getFieldDecorator('editname',{
                    rules: [{ required: true,message: '请填写属性名称'}], 
                    initialValue: selectProperty?selectProperty.name:''
                  })(<Input type="text" />)}
                </FormItem>
                <FormItem label="地址编号">
                  {getFieldDecorator('editaddressCode',{
                    rules: [{ required: true,message: '请填写地址编号'}], 
                    initialValue: selectProperty?selectProperty.addressCode:''
                  })(<Input type="text" />)}
                </FormItem>
                <FormItem label="图标">
                {/* {getFieldDecorator('editicon',{
                  rules: [{ required: true,message: '请填写图标'}],
                  initialValue: selectProperty?selectProperty.icon:''
                })(
                  <Select>
                    <Option value='ipc'><img src={require('../../assets/imgs/ipc.png')} alt=""/></Option>
                    <Option value='nvr'><img src={require('../../assets/imgs/nvr.png')} alt=""/></Option>
                  </Select>
                )} */}
              </FormItem>
                <FormItem label="类型">
                  {getFieldDecorator('edittype',{
                    rules: [{ required: true,message: '请填写类型'}], 
                    initialValue: selectProperty?selectProperty.type:''
                  })(
                    <Select>
                      <Option value='10003'>门禁</Option>
                      <Option value='10051'>入口</Option>
                      <Option value='10056'>出口</Option>
                      <Option value='10008'>烟感</Option>
                      <Option value='10021'>手报</Option>
                    </Select>
                  )}
                </FormItem>
              </Form>
            </Modal>
        </div>
    )
  }
}
const Property = Form.create()(Property1);
export default Property