import React from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import './login.scss'
const FormItem = Form.Item;
class Login extends React.Component {
  handleSubmit(e) {
    e.preventDefault();
    this.props.history.push('/home')
  }
  render() {
    console.log(this.props)
    const { getFieldDecorator } = this.props.form;
    return (
      <div className='login-page'>
      <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
          <h4 className='title'>用户登录</h4>
          <FormItem>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: '请输入用户名！' }],
            })(
              <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="请输入账号" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码！' }],
            })(
              <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="请输入密码" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>记住密码</Checkbox>
            )}
          
            <Button  type="primary" size='large' htmlType="submit" className="login-form-button">
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