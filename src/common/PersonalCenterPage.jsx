import React from 'react'
import { HashRouter, Router, Route, Link as React_link } from 'react-router-dom'
import { createBrowserHistory } from 'history'

//导入需要用到的api接口
import { apiNavigationGet } from '../request/api.js'



const browserHistory = createBrowserHistory()
export default class PersonalCenterPage extends React.Component{
  constructor(props){
    super(props)
    this.state={}
  }
  render(){
    return <div>
      <h1>PersonalCenterPage</h1>
    </div>
  }
}