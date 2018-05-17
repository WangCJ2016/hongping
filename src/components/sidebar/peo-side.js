import React from 'react'
import { Icon,Input,DatePicker,Button,Timeline,Tabs } from 'antd'
import className from 'classnames'
import { withRouter } from 'react-router-dom'
import { changeSidebar } from '../../redux/sidebar.redux'
import { getAllpeo, peoTrail, trailDetail,searchPeo,peoTrailSuccess,dataSuccess,getUwbRegionMap,areaImg,departmentList,trajectoryDetail,realtimeTrajectory,realtimeTrajectoryDetail } from '../../redux/peo.redux'
import {areaInfo} from '../../redux/area.redux'
import { querySysInstallPlaces } from '../../redux/setting.device.redux'
import { locale } from '../../config'
import { connect } from 'react-redux'
import DepartmentCom from '../peoSiderCom/departmentCom'
import PeoCom from '../peoSiderCom/peoCom'

const Search = Input.Search

const TabPane = Tabs.TabPane

@withRouter
@connect(
  state=>({sidebar:state.sidebar, peo: state.peo}),
  {
    changeSidebar,areaInfo,querySysInstallPlaces,getAllpeo,peoTrail,trailDetail,searchPeo,peoTrailSuccess,dataSuccess,getUwbRegionMap,areaImg,departmentList,trajectoryDetail,realtimeTrajectory,realtimeTrajectoryDetail
  }
)
class PeoSider extends React.Component {
  constructor() {
    super()
    this.state = {
      peopleIdExSelect: '',
      peopleIdExSelect1:'',
      peoTrailPage: false,
      selectTrail: -1,
      startTime:'',
      endTime:'',
      tab:'1'
    }
    this.trailSubmit = this.trailSubmit.bind(this)
    this.trailSelect = this.trailSelect.bind(this)
    this.startTime = this.startTime.bind(this)
    this.endTime = this.endTime.bind(this)
    this.changeMenu = this.changeMenu.bind(this)
  }
  componentDidMount() {
    this.props.getAllpeo()
    this.props.departmentList()
  }
  changeMenu(id,areaName) {
    this.setState({
      peoTrailPage: !this.state.peoTrailPage,
      peopleIdExSelect:id
    })
    this.props.peoTrailSuccess({trails:[],selectAreaName: areaName})
  }
  searchPeoRender() {
    const searchPeoList = this.props.peo.searchPeoList
    return searchPeoList.map(peo=>{
      const styles = className({
        'peo-item': true,
        itemActive: peo.peopleIdEx === this.state.peopleIdExSelect1
      })
     return <div className={styles} key={peo.peopleIdEx} >
            <div>{peo.peopleName}</div>
            <div>{peo.phone}</div>
            <div>{peo.department.deptName}</div>
            <a onClick={()=>{this.setState({peopleIdExSelect:peo.peopleIdEx,peoTrailPage:true});this.props.peoTrailSuccess({trails:[]})}}  style={{padding:'10px',position:'absolute',marginLeft:'20px',right:'20px',top:'10px'}} >
              <img src={require('../../assets/imgs/trail_icon.png')} alt=""/>
            </a>
            <a onClick={(e)=>this.goLoc(peo.areaId,peo.peopleIdEx,e )}  style={{padding:'10px',position:'absolute',marginLeft:'20px',right:'60px',top:'10px'}} >
              <img src={require('../../assets/imgs/loc_icon.png')} alt=""/>
            </a>
          </div>
    })
  }
  goLoc(areaId,peopleIdEx,e) {
    e.preventDefault()
    e.stopPropagation()
    if(this.props.location.pathname !== '/home') {
      this.props.history.push('home')
    } 
    this.props.dataSuccess({goLocDeviceId: peopleIdEx})
    this.props.areaInfo({id: areaId})
    this.props.querySysInstallPlaces({areaId: areaId})
  }
  trailRender() {
    const trails = this.props.peo.trails
    return trails.map((trail,index)=>{
      const style=className({
        'trail-item':true,
        active: trail.regionId === this.state.selectTrail
      })
     return <Timeline.Item key={index} color={trail.regionId === this.state.selectTrail.regionId?'red':'#17b89f'} onClick={()=>this.trailSelect(trail)}>
        <div className={style} key={index}>
          <div><span>开始：</span><span>{trail.minTime}</span></div>
          <div><span>结束：</span><span>{trail.maxTime}</span></div>
          <div><span>地点：</span><span>{trail.regionName}</span></div>
        </div>
      </Timeline.Item>
    })
  }
  trailSelect(trail) {
    this.setState({
      selectTrail: trail
    })
    this.props.trailDetail({peopleIdEx:this.state.peopleIdExSelect,regionId:trail.regionId,startTime:trail.startTime,endTime:trail.endTime})  
    this.props.dataSuccess({trailWeather: true})
    this.props.areaImg({id:trail.areaId})
    this.props.getUwbRegionMap({name: encodeURI(trail.regionName)})
     //trail.areaId
    this.props.history.push(`/trail?id=${trail.areaId}&name=${trail.regionName}`)
  }
  trailSubmit() {
      this.props.peoTrail({peopleIdEx:this.state.peopleIdExSelect,startTime:this.state.startTime,endTime:this.state.endTime})   
  }
  startTime(value,dateString) {
    this.setState({startTime: dateString})
  }
  endTime(value,dateString) {
    this.setState({endTime: dateString})
  }
  render() {
    if(!this.props.sidebar.people_sidebar) {
      return null
    }
    const pageChangeStyle = className({
      'siderbar-wrap': true,
      active: this.state.peoTrailPage
    })
    const pageChangeStyle2 = className({
      'siderbar-wrap': true,
      active: !this.state.peoTrailPage
    })
    return (
      <div className='submeun' style={{width:this.props.sidebar.people_sidebar?'300px':'0'}}>
        <div className={pageChangeStyle}> 
          <div className="title clearfix">
          <span className='float-left'>人员</span>
          <span className='float-right'><Icon type='close' onClick={()=>this.props.changeSidebar('people_sidebar')}></Icon></span></div>
          <Search
              placeholder="请输入关键字"
              style={{ width: 220 }}
              onSearch={value => this.props.searchPeo({name:encodeURI(value)})} 
            />
          <Tabs defaultActiveKey="1" onChange={(e)=>this.setState({tab: e})}>
            <TabPane tab="人员动态" key="1">
               <PeoCom changeMenu={this.changeMenu} peoList={this.props.peo.peoList} ></PeoCom>
            </TabPane>
            <TabPane tab="部门" key="2">
              <DepartmentCom changeMenu={this.changeMenu} departmentList={this.props.peo.departmentList} ></DepartmentCom>
            </TabPane>
          </Tabs>
       
          <div className="title" style={{textAlign:'left',marginTop:'15px'}}>
              <span>人员搜索结果</span>
          </div>
          {this.searchPeoRender()}
          
         
        </div>
        <div className={pageChangeStyle2} >
          <div style={{height:'30%'}}>
            <div className="title" style={{textAlign:'left'}}>
              <Icon type="arrow-left" onClick={()=>this.setState({peoTrailPage:false})}/>
              <span>人员轨迹查询</span>
            </div>
            <div className='lable-item'>
              <span style={{marginRight:'15px'}}>开始</span>
              <DatePicker
                showTime
                format="YYYY-MM-DD HH:mm:ss"
                placeholder="选择开始时间"
                onChange={this.startTime}
                locale={locale}
              />
            </div>
            <div className='lable-item'>
              <span style={{marginRight:'15px'}}>结束</span>
              <DatePicker
                showTime
                format="YYYY-MM-DD HH:mm:ss"
                placeholder="选择结束时间"
                onChange={this.endTime}
                locale={locale}
              />
            </div>
            <div className='lable-item'>
            <Button style={{width:'171px',marginLeft: '40px'}} type='primary' onClick={this.trailSubmit}>轨迹查询</Button>
            </div>
          </div>
          <div className='trail-page'>
            <div className="title" style={{textAlign:'left'}}>
              <Icon type="user" />
              <span>轨迹查询</span>
            </div>
            <Timeline>
            {this.trailRender()}
            </Timeline>
          </div>
        </div>
      </div>
    )
  }
}

export default PeoSider