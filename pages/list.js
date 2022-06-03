import React,{useState} from 'react'
import Head from 'next/head'
import Router from 'next/router'
import { Row,Col,List,Icon,Breadcrumb,Pagination} from 'antd'
import Header from '../components/Header'
import Author from '../components/Author'
import DiyCalendar from '../components/DiyCalendar'
import DiyCarousel from '../components/DiyCarousel'
import BackToTop from '../components/BackToTop'
import Advert from '../components/Advert'
import Footer from '../components/Footer'

import axios from 'axios'
import servicePath from '../config/apiUrl'
import Link from 'next/link'

const MyList = ({info})=>{
  const [mylist,setMylist] = useState(info.slice(0,5))
  const [current,setCurrent] = useState(1)
  
  // 路由变化完成的监听
  Router.events.on('routeChangeComplete',()=>{
    setMylist(info.slice(0,5))
    setCurrent(1)
  })

  // 分页按钮点击回调
  const onChange = (page,pageSize)=>{
    setCurrent(page)
    const pageInfo = info.slice((page-1)*pageSize,page*pageSize)
    setMylist(pageInfo)
  }
  return (
    <div>
      <Head>
        <title>个人文章列表</title>
      </Head>
      <Header></Header>
      <Row className='commmain' type='flex' justify='center'>
        <Col className='commleft' xs={24} sm={24} md={10} lg={14} xl={16}>
          <div className='breaddiv'>
            <Breadcrumb>
              <Breadcrumb.Item><a onClick={()=>{Router.push('/')}}>博客首页</a></Breadcrumb.Item>
              <Breadcrumb.Item>文章列表</Breadcrumb.Item>
              <Breadcrumb.Item><a onClick={()=>{Router.push('/detail?id=10')}}>文章详情介绍</a></Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className='carouseldiv'>
            <DiyCarousel />
          </div>
          <List 
            header={<div>最新文章日志</div>}
            itemLayout="vertical"
            dataSource={mylist}
            renderItem={(item)=>(
              <List.Item>
                <div className='listtitle'>
                  <Link href={{pathname:'/detail',query:{id:item.id}}}>
                    <a>{item.title}</a>
                  </Link>
                </div>
                <div className='listicon'>
                  <span><Icon type="calendar" /> {item.addTime}</span>
                  <span><Icon type="folder" /> {item.typeName}</span>
                  <span><Icon type="fire" /> {item.view_count}</span>
                </div>
                <div className='listcontext'>{item.introduce}</div>
              </List.Item>
            )}
          />
          <div style={{textAlign:'center',marginTop:'50px'}}>
            <Pagination current={current} size="large" total={info.length} defaultPageSize={5} pageSizeOptions={['5','10','15','20']} showSizeChanger showQuickJumper onChange={onChange}/>
          </div>
        </Col>
        <Col className='commright' xs={0} sm={0} md={8} lg={6} xl={4}>
          <Author />
          <DiyCalendar />
          <Advert />
          <BackToTop />
        </Col>
      </Row>
      <Footer/>
    </div>
  )
}

// 初始化通过菜单类型按钮id获取文章列表数据
MyList.getInitialProps = async(context)=>{
  let typeId = context.query.typeId
  const promise = new Promise((resolve,reject)=>{
    axios(servicePath.getListById+typeId).then((res)=>{
      resolve({info:res.data.data})
    }).catch((err)=>{
      reject(err)
    })
  })
  return await promise
}

export default MyList