import React, {Component} from 'react';
import {Form, Icon, Input, Button,message} from 'antd';
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";
import {Redirect} from "react-router-dom";
import './login.less'
import logo from '../../assets/images/logo.png'
import {reqLogin} from "../../api";

// const Item = Form.Item //不能写在import之前

class Login extends Component {
  handleSubmit = event => {
    event.preventDefault();
    //对所有的表单字段进行校验
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const {username, password} = values
        const response = await reqLogin(username, password)
        const result = response.data //{status:0,data:user} {status:1,msg}
        if(result.status===0){ //登陆成功
          //提示登陆成功
          message.success('登陆成功')
          //跳转到后台管理界面
          const user = result.data
          memoryUtils.user = user
          storageUtils.saveUser(user) //保存到localstroage
          this.props.history.replace('/')
        }else{ //登陆失败
          //提示登陆失败
          message.error(result.msg)
        }
      } else {
        console.log('校验失败')
      }
    });
  };
  
  /*
  对密码进行自定义验证
   */
  
  
  render() {
    //如果用户已经登陆，自动跳转到管理界面
    const user = memoryUtils.user
    if(user && user._id){
      return <Redirect to='/'/>
    }
    
    const {getFieldDecorator} = this.props.form;
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
                  
                  {required: true, whiteSpace: true, message: '用户必须输入用户名!'},
                  {min: 4, message: '用户名至少4位'},
                  {max: 12, message: '用户名最多12位'},
                  {pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字、下划线'}
                ],
                initialValue: 'admin'
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
                  {required: true, whiteSpace: true, message: '用户必须输入用户名!'},
                  {min: 4, message: '用户名至少4位'},
                  {max: 12, message: '用户名最多12位'},
                  {pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字、下划线'}
                ],
              })(
                <Input
                  prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
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
