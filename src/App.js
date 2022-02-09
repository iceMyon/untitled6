/*
应用的根组件
 */

import React, {Component} from 'react';

import {Button,message} from 'antd';
import './App.css';

class App extends Component {
  handleClick = ()=>{
    message.success('Success!')
  }
  render() {
    return (
      <div>
        <Button type="primary" onClick = {this.handleClick}>测试antd</Button>
      </div>
    );
  }
}

export default App;
