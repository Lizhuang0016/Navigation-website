import React from 'react'
import axios from 'axios'

//导入需要的Ant Design组件
import { Tabs } from 'antd'
const { TabPane } = Tabs
import '../styles/css/footer.css'

export default class FooterContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      gzhImg:"",
      mjqImg:"",
      last_time:new Date().getTime(),
    }
  }
  componentWillMount() {
    let reqSvgs = require.context('../../public/images/ads/', true, /\.(jpg|jpeg|png|bmp)$/)
    let image1 = reqSvgs('./' + 'gongzhonghao.jpg')
    let image2 = reqSvgs('./' + 'weixin.jpg')
    let baseurl="../../public/images/ads/"
    let img="weixin.jpg"
    //console.log(img);
    let image22=require(`../../public/images/ads/${img}`)
    this.setState({
      gzhImg: image1,
      mjqImg: image22
    })
    window.addEventListener('scroll', this.bindHandleScroll)
  }
  componentWillUpdate() {}
  render() {
    return (
      <div>
        <div className="footer-top">
          <div className="footer-left">
            <div className="footer-title">关于</div>
            <div className="footer-content">
            TIK128网址导航集合了目前大部分人使用并且具有一定口碑的工具，并且附带对应教程，方便大家了解以及运营TikTok，TIK128持续更新中。
            </div>
          </div>
          <div className="footer-middle">
            <div className="footer-title">公众号</div>
            <div className="footer-content">
              <img src={this.state.gzhImg} alt=""/>
            </div>
          </div>
          <div className="footer-right">
            <div className="footer-title">卖家群</div>
            <div className="footer-content">
            <img src={this.state.mjqImg} alt=""/>
            {/* <img src="../../public/images/ads/weixin.jpg" alt=""/> */}
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>声明：网站上的服务均为第三方提供，与TIK128无关。请用户注意分别，避免上当受骗。</p>
          <p>Copyright © 2021-2022 浙ICP备2021008848号-2     </p>
        </div>
      </div>
    )
  }
  bindHandleScroll = (e) => {
    // 滚动的高度
    const scrollTop = (document ? document.documentElement.scrollTop : false) || window.pageYOffset || (document ? document.body.scrollTop : 0)
    // 判断用户当前是否进行了横向滚动，如果用户发生了横向滚动，则设置元素为static
    const scrollLeft = (document ? document.documentElement.scrollLeft : false) || window.pageXOffset || (document ? document.body.scrollLeft : 0)
    const pageHeight= document.body.scrollHeight
    const availSeeHeight=window.screen.availHeight  
    // console.log("滚动的高度",scrollTop);
    // console.log("页面总高度",pageHeight);
    // console.log("可视页面总高度",availSeeHeight);
    let tag=scrollTop+availSeeHeight-pageHeight
    //console.log("横向滚动",scrollLeft);
    let anchorCoor=document.getElementsByClassName('ant-anchor-wrapper')[0].getBoundingClientRect()
    let footerCoor=document.getElementsByClassName('ant-layout-footer')[0].getBoundingClientRect()
    //console.log("anchorCoor",anchorCoor.y+anchorCoor.height);
    //console.log("footerCoor",footerCoor.height);
    let anchor=document.getElementsByClassName('ant-affix')[0]
    if(anchor){
      if(tag>footerCoor.height+10){
        //console.log("超过了",tag)
        //330左右
        anchor.style.top = "auto";
        anchor.style.bottom = "360px";
      }else{
        //console.log("还未超过",tag);
        anchor.style.top = "0px";
        anchor.style.bottom = "auto";
      }
    }
    
  }
  throttle=(fn,delay)=>{
    let timer=null
    
    return ()=>{
      console.log("this.state.last_time",this.state.last_time);
      let cur_time=Date.now();
      console.log("cur_time",cur_time);
      console.log("this.state.last_time+delay",this.state.last_time+delay);
      console.log("cur_time-this.state.last_time",cur_time-this.state.last_time);
      console.log("delay",delay);
      if(this.state.last_time&&cur_time<this.state.last_time+delay){
        console.log("设置定时");
        clearTimeout(timer)
        timer=setTimeout(()=>{
          fn();
          console.log("执行111111");
          this.setState({
            last_time:cur_time
          })
        },delay)
      }else{
        console.log("到时间了");
        this.setState({
          last_time:cur_time
        })
        fn()
        console.log("执行2222222");
      }
    }
  }
}
