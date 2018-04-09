import React from 'react'
import {Collapse } from 'antd'
import className from 'classnames'

const Panel = Collapse.Panel

class DepartmentCom extends React.Component {
  constructor() {
    super()
    this.state = {
      peopleIdExSelect: ''
    }
  }
  departmentRender() {
    const departmentList = this.props.departmentList
    return departmentList.map((area,index) => (
      <Panel header={area.deptFullname+'('+area.peoples.length+')'} key={index}>
        {area.peoples?area.peoples.map(peo=>{
          const styles = className({
            'peo-item': true,
            itemActive: peo.peopleIdEx === this.state.peopleIdExSelect
          })
         return <div className={styles} key={peo.peopleIdEx} onClick={()=>{this.props.changeMenu(peo.peopleIdEx)}}>
            <div>{peo.peopleName}</div>
            <div>{peo.phone}</div>
          </div>
        }):null}
      </Panel>
    ))
  }
  render() {
   
    return (
      <div>
        <Collapse bordered={false} className='collapse'>
        {this.departmentRender()}
        </Collapse>
      </div>
    )
  }
}

export default DepartmentCom