import React from 'react'
import axios from 'axios'

//导入需要的Ant Design组件
import { Layout, Menu, Breadcrumb, Tabs } from 'antd'

const { Header, Content, Footer, Sider } = Layout
const { TabPane } = Tabs

import '../styles/css/item.css'

export default class ContentContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeId: -1
    }
  }
  componentWillMount() {}
  componentWillUpdate() {}
  render() {
    return (
      <div id={`components-${this.props.module}`}>
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
          <Tabs defaultActiveKey="1" onChange={this.callback}>
            <TabPane tab={this.props.moduletitle} key="1">
              {/* <div className="type-title">{this.props.moduletitle}</div> */}
              <ul className="website-list">
                {this.props.datalist.map((item, index) => {
                  let reqSvgs = require.context('../../public/images/icons/', true, /\.png$/)
                  let allSvgFilepaths = reqSvgs.keys()
                  // console.log("allSvgFilepaths",allSvgFilepaths)
                  // const imagePath = allSvgFilepaths[0]
                  // console.log("imagePath",imagePath)
                  // console.log("item.imgurl",item.imgurl)
                  let image = reqSvgs('./' + item.imgurl)
                  return (
                    <li className="hot-item" key={index} id={`${this.props.module}_${index}`} onMouseEnter={(e) => this.handleMouseEnter(e)} onMouseLeave={this.handleMouseLeave.bind(this)}>
                      <a href={item.linkurl} target="_blank">
                        <div className="item-card">
                          <div className="icons">
                            <img src={image} />
                          </div>
                          <div className="contents">
                            <p
                              href={item.linkurl}
                              className={`website ${this.state.activeId === `${this.props.module}_${index}` ? 'title-active' : null}`}
                              target="_blank"
                              rel="nofollow"
                              style={{ color: '#444' }}
                            >
                              {item.linkname}
                            </p>
                            <p className={`description ${this.state.activeId === `${this.props.module}_${index}` ? 'des-active' : null}`}>{item.description}</p>
                          </div>
                        </div>
                      </a>
                    </li>
                  )
                })}
              </ul>
            </TabPane>
            <TabPane tab="Tab 2" key="2">
              Content of Tab Pane 2
            </TabPane>
            <TabPane tab="Tab 3" key="3">
              Content of Tab Pane 3
            </TabPane>
          </Tabs>
        </Content>
      </div>
    )
  }
  callback=(key)=>{
    console.log(key);
  }
  handleMouseEnter = (e) => {
    //将onMouseEnter事件分配给父元素，但子元素是使用此事件触发的元素,如何解决？
    //e.currentTarget它始终引用已附加事件处理程序的元素。关于e.target：Event接口的target属性是对调度事件的对象的引用
    //console.log("鼠标移入",e.currentTarget);
    this.setState({
      activeId: e.currentTarget.id
    })
  }
  handleMouseLeave = (e) => {
    //console.log("鼠标移出",e);
    this.setState({
      activeId: -1
    })
  }
}
