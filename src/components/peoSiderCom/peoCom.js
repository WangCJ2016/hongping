import React from 'react'
import {Collapse } from 'antd'
import className from 'classnames'
import {areaInfo,dataSuccess} from '../../redux/area.redux'
import { querySysInstallPlaces } from '../../redux/setting.device.redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
const Panel = Collapse.Panel

@withRouter
@connect(
  null,
  {
    areaInfo,querySysInstallPlaces,dataSuccess
  }
)
//@AreaRouteHoc
class PeoCom extends React.Component {
  constructor() {
    super()
    this.state = {
      peopleIdExSelect: ''
    }
  }
  goLoc = (areaId,peopleIdEx,e) => {
    e.preventDefault()
    e.stopPropagation()
    if(this.props.location.pathname !== '/home') {
      this.props.history.push('home')
    } 
    if(peopleIdEx) {
      this.props.dataSuccess({goLocDeviceId: peopleIdEx})
    }
    this.props.areaInfo({id: areaId})
    this.props.querySysInstallPlaces({areaId: areaId})
  }
  peoRender() {
    const peolist = this.props.peoList
    return peolist.map((area,index) => (
      <Panel header={<span onClick={this.goLoc.bind(this,area.areaId,'')}>{area.regionName+'('+(area.personCount?area.personCount:0)+')'}</span>} key={index}>
        {area.postions?area.postions.map(peo=>{
          const styles = className({
            'peo-item': true,
            itemActive: peo.peopleIdEx === this.state.peopleIdExSelect
          })
         return peo.people?<div className={styles} key={peo.peopleIdEx} >
            <div>{peo.people.peopleName}</div>
            <div>{peo.people.phone}</div>
            <div>{peo.people.department?peo.people.department.deptName:''}</div>
            <span  style={{padding:'10px',position:'absolute',right:'40px',top:'20%',cursor:'pointer'}} onClick={this.goLoc.bind(this,area.areaId,peo.peopleIdEx)}>
              <img src={require('../../assets/imgs/loc_icon.png')} alt=""/>
            </span>
            <span  style={{padding:'10px',position:'absolute',right:'10px',top:'20%',cursor:'pointer'}} onClick={()=>{this.props.changeMenu(peo.peopleIdEx,area.regionName)}}>
              <img src={require('../../assets/imgs/trail_icon.png')} alt=""/>
            </span>
          </div>:null
        }):null}
      </Panel>
    ))
  }
  render() {
    console.log(this.props)
    return (
      <Collapse bordered={false} className='collapse'>
      {this.peoRender()}
      </Collapse>
    )
  }
}

export default PeoCom