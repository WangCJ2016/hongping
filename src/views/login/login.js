import React from 'react'
import { Form, Icon, Input, Button } from 'antd';
import { connect } from 'react-redux'
import './login.scss'
import { login,getMenu } from '../../redux/user.redux'
const FormItem = Form.Item;

@connect(
  state=>state.user,
  {login,getMenu}
)
class Login extends React.Component {
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.login({username: values.userName, password: values.password},()=>this.props.history.push('home'))
      }
    });
   
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className='login-page'>
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