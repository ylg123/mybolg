import { Avatar, Divider} from "antd";
import Styles from '../public/style/components/author.module.css'

const Author = ()=>{
  return (
    <div className={Styles.authordiv}>
      <div><Avatar size={100} src="/img/动图1.gif"/></div>
      <div className={Styles.authorintroduction}>
        新人程序员，从事前端程序开发，向全栈进发，集智慧与毅力一身，幽默与才华一体。
        <Divider>社交账号</Divider>
        <Avatar size={28} icon="github" className={Styles.account}/>
        <Avatar size={28} icon="qq" className={Styles.account}/>
        <Avatar size={28} icon="wechat" className={Styles.account}/>
        <Avatar size={28} icon="weibo" className={Styles.account}/>
      </div>
    </div>
  )
}

export default Author