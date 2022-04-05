import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import './index.less'
import {Modal} from 'antd';
import LinkButton from "../link-button";
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";
// const {confirm} = Modal

class Header extends Component {
  
  logout = () => {
    //显示确认框
    Modal.confirm({
      title: '确定退出吗？',
      onOk:()=> {
        console.log('OK',this);
        //删除保存的user数据
        storageUtils.removeUser()
        memoryUtils.user={}
        //跳转到login界面
        this.props.history.replace('/login')
      }
    })
  }
  
  render() {
    return (
      <div className="header">
        <div className="header-top">
          <span>欢迎，admin</span>
          <LinkButton onClick={this.logout}>退出</LinkButton>
          {/*<a href="javascript:" onClick={this.logout}>退出</a>*/}
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">
            首页
          </div>
          <div className="header-bottom-right">
            <span>2019</span>
            <img src="http://api.map.baidu.com/images/weather/day/qing.png" alt=""/>
            <span>晴</span>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
