import React from 'react'
import { HashRouter, Router, Route, Link as React_link } from 'react-router-dom'
import { createBrowserHistory } from 'history'

//导入需要用到的api接口
import { apiNavigationGet } from '../request/api.js'

//导入需要的Ant Design组件
import { Layout, Menu, Input, Select, Anchor, BackTop } from 'antd'

const browserHistory = createBrowserHistory()

const { Link } = Anchor
const { Header, Content, Footer, Sider } = Layout
const { SubMenu } = Menu
const { Search } = Input
const { Option } = Select

//导入模块化样式
// import styles from './styles/less/app.less'
// 引入全局样式
import './styles/css/index.css'

import ContentContainer from './components/ContentContainer.jsx'
import AdvertiseContainer from './components/AdvertiseContainer.jsx'
import FooterContainer from './components/FooterContainer.jsx'
import { retry } from 'async'

// axios.defaults.baseURL="localhost:5000"

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: false,
      searchEngine: 'baidu',
      currAnchor: '#components-navigation',
      adUrl: 'http://www.yishangjiang.com/',
      adImgName: 'clientad.jpg',
      navigationList: ['officialPlatform', 'videoDownLoad', 'resourcesBuy', 'accountAnalysis', 'pubaccountForum', 'independentSites', 'influencerMarket', 'deployingTools', 'sourceSite', 'otherTools'],
      linkData: [],
      comToolsData: [
        [
          { img_name: 'icon1.png', link_url: 'http://www.baidu.com', link_name: '跨境头条', link_descript: '最全跨境电商每日资讯', link_category: 'comTools', link_category_name: '常用工具' },
          { img_name: 'icon2.png', link_url: 'http://www.baidu.com', link_name: '跨境头条', link_descript: '最全跨境电商每日资讯', link_category: 'comTools', link_category_name: '常用工具' },
          { img_name: 'icon3.png', link_url: 'http://www.baidu.com', link_name: '跨境头条', link_descript: '最全跨境电商每日资讯', link_category: 'comTools', link_category_name: '常用工具' },
          { img_name: 'icon4.png', link_url: 'http://www.baidu.com', link_name: '跨境头条', link_descript: '最全跨境电商每日资讯', link_category: 'comTools', link_category_name: '常用工具' },
          { img_name: 'icon1.png', link_url: 'http://www.baidu.com', link_name: '跨境头条', link_descript: '最全跨境电商每日资讯', link_category: 'comTools', link_category_name: '常用工具' },
          { img_name: 'icon3.png', link_url: 'http://www.baidu.com', link_name: '跨境头条', link_descript: '最全跨境电商每日资讯', link_category: 'comTools', link_category_name: '常用工具' },
          { img_name: 'icon2.png', link_url: 'http://www.baidu.com', link_name: '跨境头条', link_descript: '最全跨境电商每日资讯', link_category: 'comTools', link_category_name: '常用工具' },
          { img_name: 'icon2.png', link_url: 'http://www.baidu.com', link_name: '跨境头条', link_descript: '最全跨境电商每日资讯', link_category: 'comTools', link_category_name: '常用工具' }
        ]
      ]
    }
  }
  componentWillMount() {
    apiNavigationGet().then((res) => {
      // console.log('res', res)
      if (res.err_code == 0) {
        this.setState({
          linkData: res.navigations
        })
      }
    })
    if(document.body.clientWidth<576){
      this.setState({
        adImgName:"mobilead.jpg"
      })
    }else{
      this.setState({
        adImgName:"clientad.jpg"
      })
    }
  }
  componentDidMount() {
    window.addEventListener('scroll', this.debounce(this.bindHandleScroll, 1))
  }
  //在componentWillUnmount，进行scroll事件的注销
  componentWillUnmount() {
    window.removeEventListener('scroll', this.bindHandleScroll)
  }
  render() {
    return (
      <Router history={browserHistory}>
        <Layout style={{ minHeight: '100vh' }}>
          <Header className="header">
            <div className="logo" />
            <div className="search">
              <Search placeholder="" allowClear enterButton="搜索" size="large" onSearch={this.onSearch} />
              <Select className="search-select" defaultValue="baidu" onChange={this.handleChange}>
                <Option value="baidu">百度</Option>
                <Option value="google">Google</Option>
                <Option value="bing">Bing</Option>
              </Select>
            </div>
          </Header>
          <Layout>
            <Sider className="site-layout-background">
              <div className="anchor-box">
                <Anchor affix={true} getCurrentAnchor={this.getCurrentAnchor} onClick={this.linkClick}>
                  <Link href="#components-navigation" title="导航" />
                  <Link href="#components-officialPlatform" title="官方平台" />
                  <Link href="#components-videoDownLoad" title="视频下载" />
                  <Link href="#components-resourcesBuy" title="资源购买" />
                  <Link href="#components-accountAnalysis" title="账号分析" />
                  <Link href="#components-pubaccountForum" title="公众号/论坛" />
                  <Link href="#components-independentSites" title="独立站" />
                  <Link href="#components-influencerMarket" title="网红营销" />
                  <Link href="#components-deployingTools" title="投放工具" />
                  <Link href="#components-sourceSite" title="货源网站" />
                  <Link href="#components-otherTools" title="其他工具" />
                </Anchor>
              </div>
            </Sider>
            <Layout style={{}}>
              {this.state.linkData.map((item, index) => (
                <ContentContainer datalist={item} module={item[0][0].link_category} moduletitle={item[0][0].link_category_name} key={index}></ContentContainer>
              ))}
              {/* <ContentContainer datalist={this.state.comToolsData} module={'comTools'} moduletitle={'常用工具'}></ContentContainer> */}
              <AdvertiseContainer adUrl={this.state.adUrl} adImgName={this.state.adImgName}></AdvertiseContainer>
            </Layout>
          </Layout>
          <BackTop />
          <Footer style={{ textAlign: 'center' }}>
            <FooterContainer></FooterContainer>
          </Footer>
        </Layout>
      </Router>
    )
  }
  bindHandleScroll = (e) => {
    // 滚动的高度
    const scrollTop = (document ? document.documentElement.scrollTop : false) || window.pageYOffset || (document ? document.body.scrollTop : 0)
    // 判断用户当前是否进行了横向滚动，如果用户发生了横向滚动，则设置元素为static
    const scrollLeft = (document ? document.documentElement.scrollLeft : false) || window.pageXOffset || (document ? document.body.scrollLeft : 0)
    //console.log("滚动的高度",scrollTop);
    //console.log("横向滚动",scrollLeft);
    for (let item of this.state.navigationList) {
      let toolId = 'components-' + item
      //获取某个页面元素的所在位置
      let coor_y = document.getElementById(toolId).getBoundingClientRect().y
      if (coor_y > 0 && coor_y < 400) {
        // console.log('当前：', toolId)
        this.setState({
          currAnchor: '#' + toolId
        })
        break
      }
    }
  }
  handleChange = (value) => {
    //console.log("选择",value);
    this.setState({
      searchEngine: value
    })
  }
  onSearch = (value) => {
    console.log(value)
    if (this.state.searchEngine == 'baidu') {
      window.open('https://www.baidu.com/s?wd=' + value)
    } else if (this.state.searchEngine == 'sougou') {
      window.open('https://www.sogou.com/tx?query=' + value)
    } else if (this.state.searchEngine == 'bing') {
      window.open('https://cn.bing.com/search?q=' + value)
    } else if (this.state.searchEngine == 'google') {
      window.open('https://www.google.com.hk/search?q=' + value)
    }
  }
  //防抖函数
  debounce = (fn, delaytime) => {
    let timer = null
    return function () {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(fn, delaytime)
    }
  }
  //点击链接
  linkClick = (e, link) => {
    //console.log("e",e);
    //console.log("link",link);
    e.preventDefault()
    this.setState({
      currAnchor: link.href
    })
    // return link.href;
  }
  getCurrentAnchor = (link) => {
    //console.log("currlink----",link);
    return this.state.currAnchor
  }
  onCollapse = (collapsed) => {
    // console.log(collapsed)
    this.setState({ collapsed })
  }
}
