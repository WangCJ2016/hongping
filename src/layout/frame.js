import React from 'react'
import { Layout, Breadcrumb, Icon } from 'antd';
import {Router, BrowserRouter, Route, Switch,NavLink} from 'react-router-dom'
import Home from '../views/home/home'
import Video from '../views/video/video'
import './frame.scss'


const { Header, Content, Sider } = Layout;


class Frame extends React.Component {
  navRender() {
    const navArray = [
      {class: 'home',title: '首页',link:'/home'},
      {class: 'video',title: '视频',link:'/video'},
      {class: 'infrared',title: '红外',link:'/infrared'},
      {class: 'warm',title: '警告',link:'/warm'},
      {class: 'people',title: '人员',link:'/people'},
      {class: 'car',title: '车辆',link:'/car'},
      {class: 'broadcast',title: '广播',link:'/broadcast'},
      {class: 'watch',title: '巡更',link:'/watch'},
      {class: 'setting',title: '设置',link:'/setting'}
  ]
   return navArray.map(item=>(
      <NavLink className='navlink' key={item.title} to={item.link}  activeClassName="selected">
        <div className={'img '+item.class}></div>
        <p className='nav_title'>{item.title}</p>
      </NavLink>
    ))
  }
  render() {
    return (
      
      <Layout>
      <Header className="header">
        <img className='logo' src={require('../assets/imgs/logo.png')} alt=""/>
        <p className='header_title'>五系统一中心平台</p>
      </Header>
      <Layout>
        <Sider width={80} style={{ background: '#17b89f' }}>
         {this.navRender()}
        </Sider>
        <Layout>
          <Content style={{ background: '#fff', margin: 0, minHeight: 900 }}>
              <Switch>
                <Route exact path='/home' component={Home}></Route>
                <Route exact path='/video' component={Video}></Route>
              </Switch>
          </Content>
        </Layout>     
      </Layout>
    </Layout>
   
    )
  }
}

export default Frame