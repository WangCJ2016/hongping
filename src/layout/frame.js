import React from 'react'
import { Layout,Popconfirm,Icon } from 'antd';
import { Route, Switch,NavLink} from 'react-router-dom'

import { connect } from 'react-redux'
import Home from '../views/home/home'
import Video from '../views/video/video'
import Setting from '../views/setting/setting'
import SideBar from '../views/sidebar/sidebar'
import { changeSidebar } from '../redux/sidebar.redux'
import './frame.scss'


const { Header, Content, Sider } = Layout;

@connect(
  state=>state.user,
  {changeSidebar}
)

class Frame extends React.Component {
  state = {
    collapsed:false
  }
  navRender() {
    const navArray = [
      {class: 'area_sidebar',title: '区域'},
      {class: 'people_sidebar',title: '人员'},
      {class: 'broadcast_sidebar',title: '广播'},
      {class: 'video_sidebar',title: '视频'},
      {class: 'hongwia_sidebar',title: '红外'},
      {class: 'guard_sidebar',title: '门禁'},
      {class: 'daozha_sidebar',title: '道闸'},
  ]
   return navArray.map(item=>(
      <a className='navlink' key={item.title} onClick={()=>this.props.changeSidebar(item.class)}>
        <div className={'imgSub '+item.class}></div>
        <p className='nav_title'>{item.title}</p>
      </a>
    ))
  }
  topNavRender() {
    const navArray = [
      {class: 'home',title: '首页',link:'/home'},
      {class: 'video',title: '视频',link:'/video'},
      {class: 'watch',title: '巡更',link:'/watch'},
      {class: 'setting',title: '设置',link:'/setting'}
  ]
   return navArray.map(item=>(
      <NavLink className='navtoplink' key={item.title} to={item.link}  activeClassName="selected">
        
        <span className='navtop_title'>{item.title}</span>
      </NavLink>
    ))
  }
  confirm() {
    localStorage.removeItem('token')
    window.location.replace("/login")
  }
  render() {
    return (
      
      <Layout>
      <Header className="header">
        <img className='logo' src={require('../assets/imgs/logo.png')} alt=""/>
        <span className='header_title'>五系统一中心平台</span>
        
        <Popconfirm title="确认退出?" onConfirm={this.confirm.bind(this)}  okText="确定" cancelText="取消">
          <span className='float-right logout'><img  src={require('../assets/imgs/logout.png')} alt=""/></span>
        </Popconfirm>
        <span className='float-right user-name'>{this.props.account?this.props.account.name:''}</span>
        <div className='float-right top-nav-link'>
            {this.topNavRender()}
        </div>
      </Header>
      <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={true}
        collapsedWidth={60}
      >
      <div className="logo" />
      <Icon
        className="trigger"
        type={this.state.collapsed ? 'menu-fold' : 'menu-unfold'}
        onClick={()=>this.setState({
          collapsed: !this.state.collapsed,
        })}
      />
      {this.navRender()}
      <SideBar />
      
    </Sider>
        <Layout>
          <Content style={{ background: '#fff', marginLeft: '60px'}}>
              <Switch>
                <Route exact path='/home' component={Home}></Route>
                <Route exact path='/video' component={Video}></Route>
                <Route exact path='/setting' component={Setting}></Route>
              </Switch>
          </Content>
        </Layout>     
      </Layout>
    </Layout>
   
    )
  }
}

export default Frame