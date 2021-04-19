import React from 'react'
import axios from 'axios'

//导入需要的Ant Design组件
import { Layout, Tabs } from 'antd'

const {  Content } = Layout
const { TabPane } = Tabs

import '../styles/css/item.css'

export default class AdvertiseContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      adUrl: '',
      adImgName: ''
    }
  }
  componentWillMount() {
    // this.props.datalist.map((categoryData,index)=>{
    //   console.log("index",index);
    //   console.log("categoryData",categoryData);
    //   categoryData.map((item,index)=>{
    //     console.log("index",index);
    //     console.log("item",item);
    //   })
    // })
    
    let reqSvgs = require.context('../../public/images/ads/', true, /\.(jpg|jpeg|png|bmp)$/)
    let image = reqSvgs('./' + this.props.adImgName)
    this.setState({
      adUrl: this.props.adUrl,
      adImgName: image
    })
  }
  componentWillUpdate() {}
  render() {
    return (
      <div>
        <Content
          className="site-layout-background"
          style={{
            margin: 24,
            marginBottom: 0,
            minHeight: 145,
            backgroundColor: '#fff',
            borderRadius: 10
          }}
        >
          <a className="ad-href" href={this.state.adUrl} target='_blank'>
            <img className="ad-img" src={this.state.adImgName}></img>
          </a>
        </Content>
      </div>
    )
  }
}
