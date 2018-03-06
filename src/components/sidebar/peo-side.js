import React from 'react'
import { Icon,Input,Collapse,DatePicker,Button,Timeline } from 'antd'
import className from 'classnames'
import { withRouter } from 'react-router-dom'
import { changeSidebar } from '../../redux/sidebar.redux'
import { getAllpeo, peoTrail, trailDetail,searchPeo,areaImg,peoTrailSuccess } from '../../redux/peo.redux'
import { locale } from '../../config'
import { connect } from 'react-redux'
const Search = Input.Search
const Panel = Collapse.Panel

@withRouter
@connect(
  state=>({sidebar:state.sidebar, peo: state.peo}),
  {
    changeSidebar,getAllpeo,peoTrail,trailDetail,searchPeo,areaImg,peoTrailSuccess
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
      endTime:''
    }
    this.trailSubmit = this.trailSubmit.bind(this)
    this.trailSelect = this.trailSelect.bind(this)
    this.startTime = this.startTime.bind(this)
    this.endTime = this.endTime.bind(this)
  }
  componentDidMount() {
    this.props.getAllpeo()
  }
  peoRender() {
    const peolist = this.props.peo.peoList
    console.log(peolist)
    return peolist.map((area,index) => (
      <Panel header={area.regionName} key={index}>
        {area.postions?area.postions.map(peo=>{
          const styles = className({
            'peo-item': true,
            itemActive: peo.peopleIdEx === this.state.peopleIdExSelect
          })
         return <div className={styles} key={peo.peopleIdEx} onClick={()=>{this.setState({peopleIdExSelect:peo.peopleIdEx,peoTrailPage:true});this.props.peoTrailSuccess({trails:[]})}}>
            <div>{peo.people.peopleName}</div>
            <div>{peo.people.phone}</div>
            <div>{peo.people.department.deptName}</div>
          </div>
        }):null}
      </Panel>
    ))
  }
  searchPeoRender() {
    const searchPeoList = this.props.peo.searchPeoList
    return searchPeoList.map(peo=>{
      const styles = className({
        'peo-item': true,
        itemActive: peo.peopleIdEx === this.state.peopleIdExSelect1
      })
     return <div className={styles} key={peo.peopleIdEx} onClick={()=>{this.setState({peopleIdExSelect:peo.peopleIdEx,peoTrailPage:true});this.props.peoTrailSuccess({trails:[]})}}>
            <div>{peo.peopleName}</div>
            <div>{peo.phone}</div>
            <div>{peo.department.deptName}</div>
          </div>
    })
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
    this.props.trailDetail({peopleIdEx:this.state.peopleIdExSelect,regionId:trail.regionId,startTime:'',endTime:''})
    this.props.areaImg({id:trail.areaId})
    this.props.history.push('/trail')
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
          onSearch={value => this.props.searchPeo({name:encodeURI(value)})} />
          <Collapse bordered={false} className='collapse'>
           {this.peoRender()}
          </Collapse>
          
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