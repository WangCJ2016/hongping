import React from 'react'
import { Layout,Popconfirm } from 'antd';
import { Route, Switch,NavLink} from 'react-router-dom'
import className from 'classnames'

import { connect } from 'react-redux'
import Home from '../views/home/home'
import Video from '../views/video/video'
import Setting from '../views/setting/setting'
import Trail from '../components/trail/trail'
import SideBar from '../views/sidebar/sidebar'
import UserCenter from '../views/userCenter/userCenter'
import { changeSidebar } from '../redux/sidebar.redux'
import './frame.scss'


const { Header, Content, Sider } = Layout;

@connect(
  state=>state.user,
  {changeSidebar}
)

class Frame extends React.Component {
  state = {
    collapsed:false,
    siderActiveIndex: -1
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
   return navArray.map(item=>{
     const style = className({
      navlink: true,
      active: this.state.siderActiveIndex === item.title
     })
     return <a className={style} key={item.title} onClick={()=>{this.props.changeSidebar(item.class);this.setState({siderActiveIndex:item.title})}}>
        <div className={'imgSub '+item.class}></div>
        <p className='nav_title'>{item.title}</p>
      </a>
   })
  }
  topNavRender() {
    const navArray = [
      {class: 'home',title: '应急中心',link:'/home'},
      {class: 'video',title: '视频监控',link:'/video'},
      {class: 'watch',title: '巡更上传',link:'/watch'},
      {class: 'status',title: '实时状态',link:'/status'},
      {class: 'history',title: '历史分析',link:'/history'},
      {class: 'usercenter',title: '个人设置',link:'/userCenter'},
      {class: 'setting',title: '系统配置',link:'/setting'}
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
  siderBarRender() {
    
  }
  render() {
    return (
      
      <Layout className='mylayout'>
      <Header className="header">
        <img className='logo' src={require('../assets/imgs/logo.png')} alt=""/>
        <span className='header_title'>五系统一中心平台</span>
        <div style={{position:'absolute',left:'230px',top:'10px',display:'flex'}}>
          <div>
             <div style={{lineHeight:'25px',backgroundColor:'#000',padding:'0 10px',textAlign:'center'}}>报警总数</div>
             <div style={{lineHeight:'25px', backgroundColor:'#fff',padding:'0 10px',textAlign:'center',color:'#333'}}>0</div>
          </div>
          <div style={{marginLeft:'5px'}}>
             <div style={{lineHeight:'25px',backgroundColor:'#000',padding:'0 10px'}}>未处理总数</div>
             <div style={{lineHeight:'25px', backgroundColor:'#fff',padding:'0 10px',textAlign:'center',color:'#333'}}>0</div>
          </div>
        </div>
        <Popconfirm title="确认退出?" onConfirm={this.confirm.bind(this)}  okText="确定" cancelText="取消">
          <span className='float-right logout'><img  src={require('../assets/imgs/logout.png')} alt=""/></span>
        </Popconfirm>
        <span className='float-right user-name'>{this.props.account?this.props.account.name:''}</span>
        <div className='float-right top-nav-link'>
            {this.topNavRender()}
        </div>
      </Header>
      <Layout>
      {
        this.props.location.pathname==='/home'||this.props.location.pathname==='/trail'?
          <Sider
              trigger={null}
              collapsible
              collapsed={true}
              collapsedWidth={60}
            > 
            {this.navRender()}
           
          </Sider>
        :null
      }
       <SideBar />
        <Layout>
          <Content style={{ background: '#fff', height:'100%'}}>
              <Switch>
                <Route exact path='/home' component={Home}></Route>
                <Route exact path='/video' component={Video}></Route>
                <Route exact path='/setting' component={Setting}></Route>
                <Route exact path='/trail' component={Trail}></Route>
                <Route exact path='/userCenter' component={UserCenter}></Route>
              </Switch>
          </Content>
        </Layout>     
      </Layout>
    </Layout>
   
    )
  }
}

export default Frame