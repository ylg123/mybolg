import React,{useState,useEffect} from 'react'
// 引入header组件的样式
import Styles from '../public/style/components/header.module.css'

// 引入antd组件
import { Row,Col,Menu,Icon,Input} from 'antd'
const {Search} = Input

import Router from 'next/router'
import axios from 'axios'
import servicePath from '../config/apiUrl'


// 创建并暴露Header组件
const Header = ()=>{
  const [navArray,setNavArray] = useState([])
  useEffect(()=>{
    fetchData()
  },[])
  // 获取文章类型信息的回调
  const fetchData = async ()=>{
    const result = await axios(servicePath.getTypeInfo).then((res)=>{
      return res.data.data
    }).catch((err)=>{
      return err
    })
    setNavArray(result)
  }
  // 点击右侧文章类型按钮的回调
  const handleClick = (e)=>{
    if(e.key==0){
      Router.push('/')
    }else{
      Router.push({
        pathname:'/list',
        query:{typeId:e.key}
      })
    }
  }

  return (
    <div className={Styles.header}>
      <Row type='flex' justify='center'>
        <Col xs={20} sm={20} md={12} lg={13} xl={14}>
          <span className={Styles.headerlogo}>个人博客</span>
          <span className={Styles.headertext}>前端个人博客，学习重点难点</span>
          <Search style={{width:'25%',marginLeft:'20px'}} placeholder="请输入文本" onSearch={value => console.log(value)} size="default" enterButton />
        </Col>
        <Col xs={4} sm={4} md={10} lg={9} xl={8}>
          <Menu mode='horizontal' onClick={handleClick}> 
            <Menu.Item key={0}>
              <Icon type="home" />首页
            </Menu.Item>
            {
              navArray.map(item=>{
                return (
                  <Menu.Item key={item.Id}>
                    <Icon type={item.icon} />{item.typeName}
                  </Menu.Item>
                )
              })
            }
          </Menu>
        </Col>
      </Row>
    </div>
  )
}


export default Header
