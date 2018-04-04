import React from 'react'
import {Collapse } from 'antd'
import className from 'classnames'
import {areaInfo} from '../../redux/area.redux'
import { querySysInstallPlaces } from '../../redux/setting.device.redux'
import { connect } from 'react-redux'

const Panel = Collapse.Panel

@connect(
  null,
  {
    areaInfo,querySysInstallPlaces
  }
)
class PeoCom extends React.Component {
  constructor() {
    super()
    this.state = {
      peopleIdExSelect: ''
    }
  }
  goLoc(parentId) {
    this.props.areaInfo({id:parentId})
    this.props.querySysInstallPlaces({areaId:parentId})
  }
  peoRender() {
    const peolist = this.props.peoList
    return peolist.map((area,index) => (
      <Panel header={area.regionName} key={index}>
        {area.postions?area.postions.map(peo=>{
          const styles = className({
            'peo-item': true,
            itemActive: peo.peopleIdEx === this.state.peopleIdExSelect
          })
         return <div className={styles} key={peo.peopleIdEx} onClick={()=>{this.props.changeMenu(peo.peopleIdEx)}}>
            <div>{peo.people.peopleName}</div>
            <div>{peo.people.phone}</div>
            <div>{peo.people.department.deptName}</div>
            <span  style={{padding:'10px',position:'absolute',right:'10px',top:'20%'}} onClick={this.goLoc.bind(this,area.areaId)}><img src={require('../../assets/imgs/loc_icon.png')} alt=""/></span>
          </div>
        }):null}
      </Panel>
    ))
  }
  render() {
    return (
      <Collapse bordered={false} className='collapse'>
      {this.peoRender()}
      </Collapse>
    )
  }
}

export default PeoCom