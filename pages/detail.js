import React from 'react'
import Head from 'next/head'
import Router from 'next/router'
import { Row,Col,Icon,Breadcrumb,Affix} from 'antd'
import Styles from '../public/style/pages/detail.module.css'
import Header from '../components/Header'
import Author from '../components/Author'
import DiyCalendar from '../components/DiyCalendar'
import DiyCarousel from '../components/DiyCarousel'
import BackToTop from '../components/BackToTop'
import Footer from '../components/Footer'
import Tocify from '../components/tocify.tsx'
import servicePath from '../config/apiUrl'

import axios from 'axios'
import marked from 'marked'
import hljs from 'highlight.js'




const Detail = (props)=>{
  const tocify = new Tocify()
  const renderer = new marked.Renderer()

  renderer.heading = function(text,level){
    const anchor = tocify.add(text,level)
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`
  }

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

  let html = marked(props.article_content)

  return (
    <div>
      <Head>
        <title>文章详情页</title>
      </Head>
      <Header></Header>
      <Row className='commmain' type='flex' justify='center'>
        <Col className='commleft' xs={24} sm={24} md={10} lg={14} xl={16}>
          <div className={Styles.breaddiv}>
            <Breadcrumb>
              <Breadcrumb.Item><a onClick={()=>{Router.push('/')}}>博客首页</a></Breadcrumb.Item>
              <Breadcrumb.Item><a onClick={()=>{Router.push('/list?typeId=1')}}>文章列表</a></Breadcrumb.Item>
              <Breadcrumb.Item>文章详情介绍</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className='carouseldiv'>
            <DiyCarousel />
          </div>
          <div className={Styles.detailedtitle}>
            {props.title}
          </div>
          <div className={Styles.center}>
            <span><Icon type="calendar"/> {props.addTime}</span>&nbsp;
            <span><Icon type="folder"/> {props.typeName}</span>&nbsp;
            <span><Icon type="fire"/> {props.view_count}人</span>
          </div>
          <div 
            className={Styles.detailedcontent}
            dangerouslySetInnerHTML={{__html:html}}
          >
          </div>
        </Col>
        <Col className='commright' xs={0} sm={0} md={8} lg={6} xl={4}>
          <Author/>
          <DiyCalendar />
          <Affix offsetTop={5}>
            <div className={Styles.detailednav}>
              <div className={Styles.navtitle}>文章目录</div>
                {tocify && tocify.render()}
            </div>
          </Affix>
          <BackToTop />
        </Col>
      </Row>
      <Footer/>
    </div>
  )
}

// 初始化通过文章id获取文章详情数据
Detail.getInitialProps = async(context)=>{
  let id = context.query.id
  const promise = new Promise((resolve,reject)=>{
    axios(servicePath.getArticleById+id).then((res)=>{
      resolve(res.data.data)
    }).catch((err)=>{
      reject(err)
    })
  })
  return await promise
}

export default Detail