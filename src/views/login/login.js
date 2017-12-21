import React from 'react'
import { Form, Icon, Input, Button, message } from 'antd';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import './login.scss'
import { login, errorMSG } from '../../redux/user.redux'
const FormItem = Form.Item;

@connect(
  state=>state.user,
  {login, errorMSG}
)
class Login extends React.Component {
  handleSubmit(e) {
    e.preventDefault();
    const info = this.props.form.getFieldsValue()
    console.log(this.props.form.getFieldsValue())
    this.props.login({username: info.userName, password: info.password})
    //this.props.history.push('/home')
  }
  componentDidUpdate() {
    if(this.props.msg) {
      message.error(this.props.msg);
      this.props.errorMSG('')
    }
  }
  render() {
    console.log(this.props)
    const { getFieldDecorator } = this.props.form;
    return (
      <div className='login-page'>
      {this.props.redirectTo?<Redirect to={this.props.redirectTo}></Redirect>:null}   
      <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
          <h4 className='title'>五系统一中心平台</h4>
          <FormItem>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: '请输入用户名！' }],
            })(
              <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} maxLength='10' type='text' placeholder="请输入账号" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码！' }],
            })(
              <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} maxLength='20' type="password" placeholder="请输入密码" />
            )}
          </FormItem>
          <FormItem>
         
          <Button type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
           
        </FormItem>
    </Form>
      </div>
    )
  }
}
const LoginForm = Form.create()(Login);
export default LoginForm