import React from 'react'
import { Layout,Popconfirm } from 'antd';
import { Route, Switch,NavLink, Redirect} from 'react-router-dom'
import className from 'classnames'

import { connect } from 'react-redux'

import { changeSidebar,dataSuccess } from '../redux/sidebar.redux'
import { alarmCount } from '../redux/alarm.redux'
import Loadable from 'react-loadable';
import './frame.scss'

function MyLoadingComponent() {
  return <div></div>;
}

const Home = Loadable({
  loader: () => import('../views/home/home'),
  loading: MyLoadingComponent,
})

const Video = Loadable({
  loader: () => import('../views/video/video'),
  loading: MyLoadingComponent,
})

const Setting = Loadable({
  loader: () => import('../views/setting/setting'),
  loading: MyLoadingComponent,
})

const Trail = Loadable({
  loader: () => import('../components/trail/trail'),
  loading: MyLoadingComponent,
})

const SideBar = Loadable({
  loader: () => import('../views/sidebar/sidebar'),
  loading: MyLoadingComponent,
})

const UserCenter = Loadable({
  loader: () => import('../views/userCenter/userCenter'),
  loading: MyLoadingComponent,
})

const Status = Loadable({
  loader: () => import('../views/status/status'),
  loading: MyLoadingComponent,
})

const History = Loadable({
  loader: () => import('../views/history/history'),
  loading: MyLoadingComponent,
})

const Watch = Loadable({
  loader: () => import('../views/watch/watch'),
  loading: MyLoadingComponent,
})

const Document = Loadable({
  loader: () => import('../views/document/document'),
  loading: MyLoadingComponent,
})


const { Header, Content, Sider } = Layout;

@connect(
  state=>({user:state.user,alarm:state.alarm,sidebar:state.sidebar}),
  {changeSidebar,alarmCount,dataSuccess}
)

class Frame extends React.Component {
  constructor() {
    super()
    this.state = {
      collapsed:false,
      siderActiveIndex: -1,
      height:window.innerHeight-69
    }
  }

  componentDidMount() {
   this.props.alarmCount()
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
      {class: 'watch',title: '巡更管理',link:'/watch'},
      {class: 'status',title: '实时状态',link:'/status'},
      {class: 'history',title: '历史分析',link:'/history'},
      {class: "document",title: '文档管理',link:'/document'},
      {class: "userCenter",title: '个人设置',link:'/userCenter'},
      {class: 'setting',title: '系统配置',link:'/setting'}
  ].filter(nav=> this.props.user.authMenu.indexOf(nav.class)>-1)
   return navArray.map(item=>(
      <NavLink className='navtoplink' key={item.title} to={item.link}  activeClassName="selected">
        <span className='navtop_title'>{item.title}</span>
      </NavLink>
    ))
  }
  confirm() {
    localStorage.removeItem('token')
    //window.location.replace("/login#/login")
    this.props.history.push('login')
  }

  onScroll(e) {
    if(this.props.sidebar.homeLeftIf) {
      this.props.dataSuccess({offsetLeft: 360 - e.nativeEvent.target.scrollLeft})
    }else{
      this.props.dataSuccess({offsetLeft: 60 - e.nativeEvent.target.scrollLeft})
    }
  }
  render() {
    return (
      <Layout className='mylayout'>
      {
        this.props.location.pathname === '/'?
        <Redirect to={'/home'}></Redirect>:null
      }
      <Header className="header">
        <img className='logo' src={require('../assets/imgs/logo.png')} alt=""/>
        <span className='header_title'>五系统一中心平台</span>
        <div  className='flex'>
          <div>
             <div style={{lineHeight:'25px',backgroundColor:'#23837d',padding:'0 10px',textAlign:'center'}}>报警总数</div>
             <div style={{lineHeight:'25px', backgroundColor:'#005451',padding:'0 10px',textAlign:'center',color:'#fff'}}>{this.props.alarm.alarmCount}</div>
          </div>
          <div style={{marginLeft:'5px'}}>
             <div style={{lineHeight:'25px',backgroundColor:'#23837d',padding:'0 10px'}}>未处理总数</div>
             <div style={{lineHeight:'25px', backgroundColor:'#005451',padding:'0 10px',textAlign:'center',color:'#fff'}}>{this.props.alarm.alarmUndo}</div>
          </div>
        </div>
        
        <div className='float-right top-nav-link'>
            {this.topNavRender()}
        </div>
        <span className='float-right user-name'>{this.props.user.account?this.props.user.account.name:''}</span>
        <Popconfirm title="确认退出?" onConfirm={this.confirm.bind(this)}  okText="确定" cancelText="取消">
          <a className='float-right logout'><img  src={require('../assets/imgs/logout.png')} alt=""/></a>
        </Popconfirm>
      </Header>
      <Layout>
      {
        this.props.location.pathname==='/home'||this.props.location.pathname.includes('trail')?
          <Sider
              trigger={null}
              collapsible
              collapsed={true}
              collapsedWidth={60}
              style={{height: this.state.height+'px',zIndex:1}}
            > 
            {this.navRender()}
          </Sider>
        :null
      }
       {this.props.location.pathname==='/home'||this.props.location.pathname.includes('trail')?<SideBar />:null}
        <Layout style={{overflowX:'auto'}} onScroll={this.onScroll.bind(this)}>
          <Content style={{ background: '#fff', height:'100%',position:'relative'}}>
              <Switch>
                <Route  path='/home' component={Home}></Route>
                <Route  path='/video' component={Video}></Route>
                <Route  path='/status' component={Status}></Route>
                <Route  path='/history' component={History}></Route>
                <Route  path='/setting' component={Setting}></Route>
                <Route  path='/trail' component={Trail}></Route>
                <Route  path='/watch' component={Watch}></Route>
                <Route  path='/userCenter' component={UserCenter}></Route>
                <Route  path='/document' component={Document}></Route>
              </Switch>
          </Content>
        </Layout>     
      </Layout>
    </Layout>
   
    )
  }
}

export default Frame