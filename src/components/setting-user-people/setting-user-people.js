import React from 'react'
import { Icon, Modal, Form, Input, Select, Button, Popconfirm } from 'antd'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { createAccount, modifyAccount } from '../../redux/role.redux'
const FormItem = Form.Item
const Option = Select.Option;

@connect(
  state => ({role:state.role}),
  {createAccount, modifyAccount}
)
class SettingUserPeople1 extends React.Component {
  constructor() {
    super()
    this.state = { 
      peopleEditVisible: false,
      creatPeopleVisible: false,
      selectIndex: 0,
      intialPsw: 123456
     }
     this.resetPsw = this.resetPsw.bind(this)
     this.createPswChange = this.createPswChange.bind(this)
  }
  resetPsw() {
    this.setState({
      intialPsw: 123456
    })
  }
  createPswChange(e) {
    this.setState({
      intialPsw: e.target.value
    })
  }
  listRender() {
   console.log(this.props.role.roleInfo)
   const peopleList = this.props.role.peopleList
   return peopleList.map((people,index) => {
    const style = classnames({
      role: true,
      role_selected: this.state.selectIndex === index
    })
    return  (
      <div className={style} style={{textAlign:'left',padding:'0 30px'}} key={people.id}>
        {people.name}
        <div className='abosulte'>
          <span onClick={()=>this.setState({peopleEditVisible: true})}>
             <Icon type='edit'/>
             <span className='action'>编辑</span>
          </span> 
          
          <Popconfirm onConfirm={this.delete.bind(this)} title="确定删除？"  okText="确定" cancelText="取消">
            <Icon type='delete'/><span className='action'>删除</span>  
          </Popconfirm>
            
         
        </div>
      </div>)
    })
  }
  delete() {
    this.props.modifyAccount({id:this.props.role.peopleList[this.state.selectIndex].id,isDelete:1})
  }
  peopleEditSubmit() {
    this.props.form.validateFields(['editname','edittelephone','editdept','editaccount','editpassword'],(err, values) => {
      if(!err) {
        const info = values
        const data = {
          id:this.props.role.peopleList[this.state.selectIndex].id,
          account: info.editaccount,
          password: info.editpassword,
          name: encodeURI(info.editname),
          telephone: info.edittelephone,
          department: encodeURI(info.editdept),
          remark:encodeURI(info.editremark),
          roleId: this.props.role.roleInfo.id
        }
        this.props.modifyAccount(data)
        this.setState({peopleEditVisible: false})
      }
    })
  }
  peopleCreateSubmit() {
    this.props.form.validateFields(['createAccount','createName','createTelephone','createDept','createPassword'],(err, values) => {
      if(!err) {
        const info = values
        const data = {
          account: (info.createAccount),
          password: this.state.intialPsw?this.state.intialPsw:123456,
          name: encodeURI(info.createName),
          telephone: info.createTelephone,
          department: encodeURI(info.createDept),
          remark:encodeURI(info.createRemark),
          roleId: this.props.role.roleInfo.id
        }
        this.props.createAccount(data)
        this.setState({creatPeopleVisible: false})
      }
    })
  }
  render() {
    const roleInfo = this.props.role.roleInfo
    const selectedPeople = this.props.role.peopleList[this.state.selectIndex]
    const { getFieldDecorator } = this.props.form
    return (
      <div className="setting-user-role float-right" style={{width:'65%'}}>
          <div className="title role">人员{this.props.role.roleInfo.id?<div className='abosulte' onClick={()=>this.setState({creatPeopleVisible:true})}><Icon type='plus'/></div>:null}</div>
          {this.props.role.peopleList?this.listRender():null}
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
                  initialValue: roleInfo?roleInfo.name:''
                })(
                  <Input disabled/>
                )}
              </FormItem>
              <FormItem label="姓名">
                {getFieldDecorator('editname',{
                  rules: [{ required: true,message: '请填写姓名'  }],
                  initialValue: selectedPeople?selectedPeople.name:''
                })(<Input type="text" />)}
              </FormItem>
              <FormItem label="手机号">
                {getFieldDecorator('edittelephone',{
                  rules: [{ required: true,message: '请填写电话'  }],
                  initialValue: selectedPeople?selectedPeople.telephone:''
                })(<Input type="number" />)}
              </FormItem>
              <FormItem label="部门">
                {getFieldDecorator('editdept',{
                  rules: [{ required: true,message: '请填写部门'  }],
                  initialValue: selectedPeople?selectedPeople.dept:''
                })(<Input type="text" />)}
              </FormItem>
              <FormItem label="备注">
                {getFieldDecorator('editremark',{
                  initialValue: selectedPeople?selectedPeople.remark:''
                })(<Input type="text" />)}
              </FormItem>
              <FormItem label="账号">
                {getFieldDecorator('editaccount',{
                  rules: [{ required: true,message: '请填写账号'  }],
                  initialValue: selectedPeople?selectedPeople.account:''
                })(<Input type="text" />)}
              </FormItem>
              <FormItem label="密码">
                {getFieldDecorator('editpassword',{
                  rules: [{ required: true,message: '请填写密码'  }],
                  initialValue: selectedPeople?selectedPeople.password:''
                })(<Input type="text" />)}
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
           onOk={this.peopleCreateSubmit.bind(this)}
           onCancel={()=>this.setState({creatPeopleVisible:false})}
           >
           <Form layout='inline'>
             <FormItem label="角色">
               {getFieldDecorator('role', {
                 initialValue: roleInfo?roleInfo.name:''
               })(
                 <Input disabled/>
               )}
             </FormItem>
             <FormItem label="账号">
             {getFieldDecorator('createAccount',{
              rules: [{ required: true,message: '请填写账号'  }]
             })(<Input type="text" />)}
           </FormItem>
             <FormItem label="姓名">
               {getFieldDecorator('createName',{
                rules: [{ required: true,message: '请填写姓名' }]
               })(<Input type="text" />)}
             </FormItem>
             <FormItem label="手机号">
               {getFieldDecorator('createTelephone',{
                rules: [{ required: true,message: '请填写手机号' }]
               })(<Input type="number" />)}
             </FormItem>
             <FormItem label="部门">
               {getFieldDecorator('createDept',{
                rules: [{ required: true,message: '请填写部门' }]
               })(<Input type="text" />)}
             </FormItem>
             <FormItem label="备注">
               {getFieldDecorator('createRemark',{
                initialValue: ''
               })(<Input type="text" />)}
             </FormItem>
             <FormItem label="密码">   
               <Input  value={this.state.intialPsw} onChange={this.createPswChange} suffix={<Button onClick={this.resetPsw}>重置</Button>}/>
             </FormItem>
           </Form>
         </Modal>
      </div>
    )
  }
}
const SettingUserPeople = Form.create()(SettingUserPeople1);
export default SettingUserPeople