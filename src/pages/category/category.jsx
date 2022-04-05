import React, {Component} from 'react';
import {Card, Table, Button, Icon, message} from 'antd';
import {reqCategorys} from "../../api";
import LinkButton from "../../components/link-button";

/*
商品分类路由
 */

class Category extends Component {
  state = {
    loading: false, //是否正在获取数据中
    categories: [],//一级分类列表
    subCategories: [], //二级分类列表
    parentId: '0', //当前需要显示的分类列表的parentId
    parentName: '', //当前需要显示的分类列表的父分类名称
    
  }
  
  //初始化table的所有列数
  initColumns = () => {
    this.columns = [
      {
        title: '分类的名称',
        dataIndex: 'name',//显示数据对应的属性名
      },
      {
        width: 300,
        title: '操作',
        render: (category) => (  //返回需要显示的界面标签
          <span>
            <LinkButton onClick={console.log(category)}>修改分类</LinkButton>
            {/*如何向实践回调函数传递参数：先定义一个匿名函数，在函数中调用处理的函数并传参*/}
            <LinkButton onClick={()=>this.showSubCategories(category)}>查看子分类</LinkButton>
          </span>
        )
      },];
  }
  
  //显示指定一级分类对象的二级列表
  showSubCategories = (category)=>{
    //先更新状态
    this.setState({
      parentId:category._id,
      parentName:category.name
    })
    console.log('parentid',this.state.parentId)
    //获取二级分类列表显示
    this.getCategories()
  }
  
  //异步获取一级/二级分类列表显示
  getCategories = async () => {
    const {parentId} = this.state
    //在发请求前，显示loading
    this.setState({loading: true})
    //这里就体现了async和await通过同步的书写方式来写异步语句的便利性
    //得到await语句后才会同步执行if语句
    const result = await reqCategorys('0')
    this.setState({loading: false})
    console.log(result)
    if (result.status === 0) {
      //取出分类数组(可能是一级的,也可能是二级的)
      const categories = result.data
      //更新一级分类状态
      if (parentId === '0') {
        //更新一级分类状态
        this.setState({
          categories
        })
      } else {
        //更新二级分类状态
        this.setState({
          subCategories:categories
        })
      }
      
    } else {
      message.error('获取分类列表失败')
    }
  }
  
  
  componentWillMount() {
    this.initColumns() //为第一次render准备数据
  }
  
  componentDidMount() {
    this.getCategories()
  }
  
  render() {
    const {categories, loading,subCategories,parentId} = this.state
    //card的左侧
    const title = '一级分类列表'
    //card的右侧
    const extra = (
      <Button type='primary'>
        <Icon type='plus'/>
        添加
      </Button>
    )
    
    
    return (
      <Card title={title} extra={extra}>
        <Table
          bordered
          rowKey='_id'
          loading={loading}
          dataSource={parentId==='0' ?  categories: subCategories}
          columns={this.columns}
          pagination={{defaultPageSize: 5, showQuickJumper: true}}/>
      
      </Card>
    );
  }
}

export default Category;
