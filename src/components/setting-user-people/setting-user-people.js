import React from 'react'
import { Icon, Modal, Form, Input, Select, Button, Popconfirm } from 'antd'
const FormItem = Form.Item
const Option = Select.Option;

class SettingUserPeople1 extends React.Component {
  state = { 
    peopleEditVisible: false,
    creatPeopleVisible: false
   }
  peopleEditSubmit() {}
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div className="setting-user-role float-right" style={{width:'65%'}}>
          <div className="title role">人员<div className='abosulte' onClick={()=>this.setState({creatPeopleVisible:true})}><Icon type='plus'/></div></div>
          <div className="role" style={{textAlign:'left',padding:'0 30px'}}>
            admin
            <div className='abosulte'>
              <span onClick={()=>this.setState({peopleEditVisible: true})}><Icon type='edit'/><span className='action'>编辑</span></span> 
              <span>
              <Popconfirm title="确定禁用？"  okText="确定" cancelText="取消">
                <Icon type="minus-circle-o" /><span className='action'>禁用</span>  
              </Popconfirm>
                   
              </span>   
            </div>
          </div>
          {/* 编辑人员modal */} 
          <Modal title="编辑人员" 
            visible={this.state.peopleEditVisible}
            style={{ top: 200 }}
            width='50%'
            okText='确定'
            cancelText='取消'
            wrapClassName='peopleEditModal'
            onOk={this.peopleEditSubmit.bind(this)}
            onCancel={()=>this.setState({peopleEditVisible:false})}
            >
            <Form layout='inline'>
              <FormItem label="角色">
                {getFieldDecorator('role', {
                  initialValue: 'admin'
                })(
                  <Select  >
                    <Option value="admin">管理员</Option>
                    <Option value="member">普通成员</Option>
                  </Select>
                )}
              </FormItem>
              <FormItem label="姓名">
                {getFieldDecorator('name',{
                  initialValue: '张三'
                })(<Input type="text" />)}
              </FormItem>
              <FormItem label="手机号">
                {getFieldDecorator('telephone',{
                  initialValue: '18868877305'
                })(<Input type="number" />)}
              </FormItem>
              <FormItem label="部门">
                {getFieldDecorator('dept',{
                  initialValue: '施工部'
                })(<Input type="text" />)}
              </FormItem>
              <FormItem label="备注">
                {getFieldDecorator('remark',{
                  
                })(<Input type="text" />)}
              </FormItem>
              <FormItem label="账号">
                {getFieldDecorator('dept',{
                  initialValue: 'lisi'
                })(<Input type="text" disabled/>)}
              </FormItem>
              <FormItem label="密码">
                {getFieldDecorator('password',{
                  initialValue: '施工部'
                })(<Input type="text" suffix={<Button>重置</Button>}/>)}
              </FormItem>
            </Form>
          </Modal>
           {/* 新建人员modal */} 
          <Modal title="新建人员" 
           visible={this.state.creatPeopleVisible}
           style={{ top: 200 }}
           width='50%'
           okText='确定'
           cancelText='取消'
           wrapClassName='peopleEditModal'
           onOk={this.peopleEditSubmit.bind(this)}
           onCancel={()=>this.setState({creatPeopleVisible:false})}
           >
           <Form layout='inline'>
             <FormItem label="角色">
               {getFieldDecorator('role', {
                 initialValue: 'admin'
               })(
                 <Select  >
                   <Option value="admin">管理员</Option>
                   <Option value="member">普通成员</Option>
                 </Select>
               )}
             </FormItem>
             <FormItem label="姓名">
               {getFieldDecorator('name',{
                rules: [{ required: true }]
               })(<Input type="text" />)}
             </FormItem>
             <FormItem label="手机号">
               {getFieldDecorator('telephone',{
               })(<Input type="number" />)}
             </FormItem>
             <FormItem label="部门">
               {getFieldDecorator('dept',{
               })(<Input type="text" />)}
             </FormItem>
             <FormItem label="备注">
               {getFieldDecorator('remark',{
                 
               })(<Input type="text" />)}
             </FormItem>
             <FormItem label="账号">
               {getFieldDecorator('dept',{
                 initialValue: 'lisi'
               })(<Input type="text" disabled/>)}
             </FormItem>
             <FormItem label="密码">
               {getFieldDecorator('password',{
               })(<Input type="text" suffix={<Button>重置</Button>}/>)}
             </FormItem>
           </Form>
         </Modal>
      </div>
    )
  }
}
const SettingUserPeople = Form.create()(SettingUserPeople1);
export default SettingUserPeople