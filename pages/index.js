import React,{useState,useEffect} from 'react'
import axios from 'axios'

import { Row,Col,List,Icon,Breadcrumb,Pagination } from 'antd'
import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'
import Header from '../components/Header'
import Author from '../components/Author'
import DiyCalendar from '../components/DiyCalendar'
import DiyCarousel from '../components/DiyCarousel'
import BackToTop from '../components/BackToTop'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import servicePath from '../config/apiUrl'

import marked from 'marked'
import hljs from 'highlight.js'

const Home = ()=>{

  const renderer = new marked.Renderer()
  // markdown设置
  marked.setOptions({
    renderer:renderer,
    gfm:true,
    pedantic:false,
    sanitize:false,
    tables:true,
    breaks:false,
    smartLists:true,
    highlight:function(code){
      return hljs.highlightAuto(code).value
    }
  })

  const [mylist,setMylist] = useState([])
  const [total, setTotal] = useState(0)

  const getArticleListFirst = async(page=1,pageSize=10)=>{
    const result = await axios(servicePath.getArticleList+page+'/'+pageSize).then((res)=>{
      return res.data
    }).catch((err)=>{
      return err
    })
    setMylist(result.data)
    setTotal(result.total)
  }

  useEffect(()=>{
    getArticleListFirst()
  },[])

  // 分页器页码改变的回调
  const onChange = (page,pageSize)=>{
    getArticleListFirst(page,pageSize)
  }

  return (
    <div>
      <Head>
        <title>博客首页</title>
      </Head>
      <Header></Header>
      <Row className='commmain' type='flex' justify='center'>
        <Col className='commleft' xs={24} sm={24} md={10} lg={14} xl={16}>
          <div className='breaddiv'>
            <Breadcrumb>
              <Breadcrumb.Item>博客首页</Breadcrumb.Item>
              <Breadcrumb.Item><a onClick={()=>{Router.push('/list?typeId=1')}}>文章列表</a></Breadcrumb.Item>
              <Breadcrumb.Item><a onClick={()=>{Router.push('/detail?id=10')}} >文章详情介绍</a></Breadcrumb.Item>
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
                <div 
                  className='listcontext'
                  dangerouslySetInnerHTML={{__html:marked(item.introduce)}}
                ></div>
              </List.Item>
            )}
          />
          <div style={{textAlign:'center',marginTop:'50px'}}>
            <Pagination size="large" total={total} showSizeChanger showQuickJumper onChange={onChange}/>
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


export default Home