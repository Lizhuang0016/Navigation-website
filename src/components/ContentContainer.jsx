import React from 'react'
import axios from 'axios'

//导入需要的Ant Design组件
import { Layout, Tabs } from 'antd'

const {  Content } = Layout
const { TabPane } = Tabs

import '../styles/css/item.css'

export default class ContentContainer extends React.Component {
  constructor(props) {
    super(props)
    // const panes = [
    //   { title: 'Tab 1', content: 'Content of Tab Pane 1', key: '1' },
    //   { title: 'Tab 2', content: 'Content of Tab Pane 2', key: '2' }
    // ]
    this.state = {
      activeId: -1,
      dataList:[],
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
    this.setState({
      dataList:this.props.datalist,
    })
    //console.log("props.dataList",this.state.dataList);
  }
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
          <Tabs defaultActiveKey="0" onChange={this.callback}>
            {this.state.dataList.map((categoryData,cindex) => (
              //console.log("categoryData",categoryData);
              <TabPane tab={categoryData[0].link_category_name} key={cindex}>
                <ul className="website-list">
                {categoryData.map((item, index) => {
                  //console.log("item------",item);
                  let reqSvgs = require.context('../../public/images/icons/', true, /\.(jpg|jpeg|png|bmp)$/)
                  //let allSvgFilepaths = reqSvgs.keys()
                  // console.log("allSvgFilepaths",allSvgFilepaths)
                  // const imagePath = allSvgFilepaths[0]
                  // console.log("imagePath",imagePath)
                  // console.log("item.imgurl",item.imgurl)
                  let image = reqSvgs('./' + item.img_name)
                  // let image = reqSvgs('./' + 'icon1.png')
                  return (
                    <li className="hot-item" key={index} id={`${this.props.module}_${index}`} onMouseEnter={(e) => this.handleMouseEnter(e)} onMouseLeave={this.handleMouseLeave.bind(this)}>
                      <a href={item.link_url} target="_blank">
                        <div className="item-card">
                          <div className="icons">
                            <img src={image} />
                          </div>
                          <div className="contents">
                            <p
                              href={item.link_url}
                              className={`website ${this.state.activeId === `${this.props.module}_${index}` ? 'title-active' : null}`}
                              target="_blank"
                              rel="nofollow"
                              style={{ color: '#444' }}
                            >
                              {item.link_name}
                            </p>
                            <p className={`description ${this.state.activeId === `${this.props.module}_${index}` ? 'des-active' : null}`}>{item.link_descript}</p>
                          </div>
                        </div>
                      </a>
                    </li>
                  )
                })}
              </ul>
              </TabPane>
            ))}

          </Tabs>
        </Content>
      </div>
    )
  }
  callback = (key) => {
    //console.log(key)
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
