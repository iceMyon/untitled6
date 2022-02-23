import React, {Component} from 'react';
import {Form, Icon, Input, Button} from 'antd';

import './login.less'
import logo from './images/logo.png'
import {reqLogin} from "../../api";

// const Item = Form.Item //不能写在import之前

高阶函数
class Login extends Component {
  handleSubmit = e => {
    e.preventDefault();
    //对所有的表单字段进行校验
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const {username,password} = values
        reqLogin(username,password).then(response=>{
          console.log('成功了',response.data)
        }).catch(error=>{
          console.log('失败了',error)
        })
        console.log('提交ajax请求: ', values);
      } else {
        console.log('校验失败')
      }
    });
  };
  
  /*
  对密码进行自定义验证
   */

  
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo"/>
          <h1>React项目:后台管理系统</h1>
        </header>
        <section className="login-content">
          <h2>用户登陆</h2>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('username', {
                //声明式验证：直接使用别人定义好的验证规则进行验证
                rules: [
                  
                  {required: true, whiteSpace:true,message: '用户必须输入用户名!'},
                  {min:4,message:'用户名至少4位'},
                  {max:12,message: '用户名最多12位'},
                  {pattern:/^[a-zA-Z0-9_]+$/,message: '用户名必须是英文、数字、下划线'}
                ],
                initialValue:'admin'
              })(
                <Input
                  prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                  placeholder="Username"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [
                  {required: true, whiteSpace:true,message: '用户必须输入用户名!'},
                  {min:4,message:'用户名至少4位'},
                  {max:12,message: '用户名最多12位'},
                  {pattern:/^[a-zA-Z0-9_]+$/,message: '用户名必须是英文、数字、下划线'}
                ],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Password"
                />,
              )}
            
            </Form.Item>
            <Form.Item>
              
              <Button type="primary" htmlType="submit" className="login-form-button">
                登陆
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    );
  }
}


const WrapLogin = Form.create()(Login)
export default WrapLogin;

/*
1.前台表单验证
 */
