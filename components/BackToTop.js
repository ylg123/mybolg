import { BackTop } from "antd"

const BackToTop = () => {
  return (
    <div>
      <div style={{textAlign:'center',fontSize:'20px',fontWeight:'600'}}>
        <BackTop>
          <div className="ant-back-top-inner">回到顶部</div>
        </BackTop>
        已经到达
        <strong style={{ color: 'red' }}> 底部 </strong>
      </div>
      <style global jsx>
        {`
          .ant-back-top {
            bottom: 160px;
            right: 65px;
          }
          .ant-back-top-inner {
            height: 40px;
            width: 90px;
            line-height: 40px;
            border-radius: 4px;
            background-color: #1088e9;
            color: #fff;
            text-align: center;
            font-size: 20px;
            font-family:cursive;
          }
        `}
      </style>
    </div>
  )
}

export default BackToTop