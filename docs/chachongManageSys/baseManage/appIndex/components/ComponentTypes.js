/*
*   Create by malson on 2019-04-11
*/
import React from 'react'
import { Carousel } from 'antd';
import BaseImg from '../imgs/base.png';
import BannerIcon from '../imgs/banner-modal.png'
import RecommendIcon from '../imgs/recommend-modal.png'

let banner = {
  dataId:'banner',
  type:'banner',
  name:'轮播图',
  icon:BannerIcon,
  style:{
    height:50
  },
  index:1,
  defaultData:[BaseImg,BannerIcon],
  showComponent(data=[]){
    let imgs = data.map((item,i)=>{
      return (<img src={item} draggable='false' key={i} className='banner-img'/>)
    })
    return(
        <Carousel className='component-banner-wrap'>
          {imgs}
        </Carousel>
    )
  }
};
let recommend = {
  dataId:'recommend',
  type:'recommend',
  name:'推荐',
  icon:RecommendIcon,
  style:{
    height:45
  },
  index:2,
  defaultData:[BaseImg],
  showComponent(data=[]){
    let imgs = data.map(item=>{
      return (<div className='banner-img'>
        <img src={item} />
      </div>)
    })
    return(
        <Carousel className='component-banner-wrap'>
          { imgs }
        </Carousel>
    )
  }
}

export default [
  banner,
  recommend
]