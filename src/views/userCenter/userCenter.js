import React from 'react'
import { Tabs,Form,Input,Button } from 'antd'
import './userCenter.scss'
import {connect} from 'react-redux'
import {modifyAccount} from '../../redux/role.redux'
import {TitleCom,ContentCom}  from '../../components/userCenterCom/titleCom'
const TabPane = Tabs.TabPane
const FormItem = Form.Item

@connect(
  state=>({user:state.user}),
  {modifyAccount}
)
class UserCenter1 extends React.Component {
  constructor() {
    super()
    this.state={
      videoPath:'',
      picPath:'',
      broadcastPath:''
    }
    this.confirm = this.confirm.bind(this)
    this.submit = this.submit.bind(this)
  }
  componentDidMount() {
    this.setState({
      // videoPath:this.play.GetLocallPath(1),
      // picPath:this.play.GetLocallPath(2),
      // broadcastPath:this.broadcastPlay.GetLocallPath()
    })
  }
  confirm(rule, value, callback) {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('newpsw')) {
      callback('新密码与确认密码必须相等');
    } else {
      callback();
    }
  }
  submit() {
    this.props.form.validateFields((err,values)=>{
      if(!err) {
        const account = this.props.user.account
        const data = {
          id: account.id,
          password: values.newpsw,
          name: encodeURI(account.name),
          telephone: account.telephone,
          roleId: account.roleId,
          department: encodeURI(account.department),
          remark: encodeURI(account.remark),
          account:account.accountNo
        }
         this.props.modifyAccount(data)
         localStorage.removeItem('token')
         this.props.history.push("login")
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div className='usercenter'>
        <Tabs defaultActiveKey="1">
        <TabPane tab="个人设置" key="1">
          <TitleCom title='录像路径' />
          <ContentCom title='录像路径:' path={this.state.videoPath}/>
          <TitleCom title='图片路径' />
          <ContentCom title='图片路径:' path={this.state.picPath}/>
          <TitleCom title='广播文件路径路径' />
          <ContentCom title='广播文件路径路径:' path={this.state.broadcastPath}/>
          <TitleCom title='修改密码' />
          <Form layout='inline' onSubmit={this.submit}>
            <FormItem label="名称">
              {getFieldDecorator('name',{
                initialValue: this.props.user.account?this.props.user.account.name:''
              })(<Input disabled type="text" />)}
            </FormItem>
            <FormItem label="请输入旧密码">
              {getFieldDecorator('oldpsw',{
                rules: [{ required: true,message: '请输入旧密码'  }],
              })(<Input type="text" />)}
            </FormItem>
            <FormItem label="请输入新密码">
              {getFieldDecorator('newpsw',{
                rules: [{ required: true,message: '请填写新密码'  }],
              })(<Input type="text" />)}
            </FormItem>
            <FormItem label="再次输入密码">
              {getFieldDecorator('confirmpsw',{
                rules: [{ required: true,message: '请填写确认密码'  },
                {validator:this.confirm}],
              })(<Input type="text" />)}
            </FormItem>
            <FormItem style={{textAlign:'center'}}>
              <Button
                type="primary"
                htmlType="submit"
              >
                确定
              </Button>
            </FormItem>
          </Form>
        </TabPane>
      </Tabs>
      <object
          ref={(screen)=>this.play=screen}
          classID="clsid:A6871295-266E-4867-BE66-244E87E3C05E"
          codebase="./SetupOCX.exe#version=1.0.0.1"
          width={1}
          height={1}
          align='center' 
          style={{visibility:'hidden'}}
          >
          <a style={{display:'block',lineHeight:1,textAlign:'center',textDecoration:'underline'}} href="http://192.168.1.51:8080/SetupOCX.exe" download='控件'>请点击此处下载插件,安装时请关闭浏览器</a>
        </object>
        <object
            ref={(screen)=>this.broadcastPlay=screen}
            classID="clsid:1D3667C2-A790-4CCB-B3F2-3E2AE54BCFAA"
            codebase="./XzVideoWebClient.cab#version=1.0.0.1"
            width={0}
            height={0}
            align='center' 
            >
         </object>
      </div>
    )
  }
}
const UserCenter = Form.create()(UserCenter1);
export default UserCenter