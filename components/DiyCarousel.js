import { Carousel } from 'antd'

const DiyCarousel = () => {
  
  return (
    <>
      <Carousel autoplay>
        <div>
          <img src='/img/轮播1.jpeg'></img>
        </div>
        <div>
          <img src='/img/轮播2.jpeg'></img>
        </div>
        <div>
          <img src='/img/轮播3.jpeg'></img>
        </div>
        <div>
          <img src='/img/轮播4.jpeg'></img>
        </div>
        <div>
          <img src='/img/轮播5.jpeg'></img>
        </div>
      </Carousel>
      <style global jsx>
        {`
          .ant-carousel .slick-slide {
            text-align: center;
            height: 400px;
            line-height: 400px;
            background: #364d79;
            overflow: hidden;
          }
          .ant-carousel .slick-slide img {
            width: 100%;
            color: #fff;
          }
        `}
      </style>
    </>
  )
}
export default DiyCarousel