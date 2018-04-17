import React from 'react'
import { Table,Modal, Button, message,Row,Col } from 'antd';
import {connect} from 'react-redux'
import { alarmPages,modifyAlarm,getAlarmInfo } from '../../redux/alarm.redux'
import { areaInfo,dataSuccess } from '../../redux/area.redux'
import { querySysInstallPlaces } from '../../redux/setting.device.redux'
import './home-table-list.scss'
import { alarmDegree, alarmType } from '../../utils'
import broadcastHoc from '../broadcastHoc/broadcastHoc'


@connect(
  state => ({alarm:state.alarm,user:state.user}),
  {alarmPages,modifyAlarm,getAlarmInfo,areaInfo,querySysInstallPlaces,dataSuccess}
)
@broadcastHoc
class HomeTableList extends React.Component {
  state={
    visible: false,
    suggest:''
  }
  componentDidMount() {
    this.props.alarmPages({pageNo:1})
  }
  alarmlistRender() {
    const columns = [{
        title: '状态',
        dataIndex: 'status',
        key:'status',
        render:(text,record)=>{
          return <span>{record.status === 0?'未处理':'已处理'}</span>
        }
      }, {
        title: '时间',
        dataIndex: 'time',
        key:'time'
      },
      {
        title: '类型',
        dataIndex: 'type',
        key:'type',
        render:(text,record)=>{
          return <span>{alarmType(record.type)}</span>
        }
      },
      {
        title: '等级',
        dataIndex: 'degree',
        key:'degree',
        render:(text,record)=>{
          return <span>{alarmDegree(record.degree).degree}</span>
        }
      },
      {
        title: '设备',
        dataIndex: 'device',
        key:'device'
      },
      {
        title: '定位',
        dataIndex: 'icon',
        key:'icon',
        render:(text,record)=>(
          <a onClick={this.goLoc.bind(this,record)}>
            <img src={require('../../assets/imgs/loc_icon.png')} alt='' />
          </a>
        )
      },
      {
        title: '操作',
        render:(text,record)=>{
          return <Button onClick={this.alarmClick.bind(this,record)} type='primary'>处理</Button>
        }
    }];
    const list = this.props.alarm.alarmlist
    return <Table 
              pagination={{
                pageSize:4,
                onChange:(e)=>this.props.alarmPages({pageNo:e}),
                total:this.props.alarm.alarmPageTotal
              }}  
              rowKey={(record)=>{return record.id}}
              columns={columns} 
              dataSource={list} 
              size='small' />
  }
  alarmClick(alarm) {
    this.setState({
      visible: true,
    })
    this.props.getAlarmInfo({id:alarm.id})
  }
  handleChange(e){
    this.setState({suggest:e.target.value})
  }
  goLoc(record) {
    const alarmInfo = record
    if(alarmInfo.install) {
      this.props.dataSuccess({goLocDeviceId: alarmInfo.install.devId})
      this.props.areaInfo({id:alarmInfo.install.areaId})
      this.props.querySysInstallPlaces({areaId:alarmInfo.install.areaId})
    }else{
      message.error('设备没有绑定区域')
    }
  }
  render() {
    const alarmInfo = this.props.alarm.alarmInfo
    return (
      <div className="list">
        {this.alarmlistRender()}
        <Modal title="报警" 
        visible={this.state.visible}
        onOk={this.props.handleOk} 
        onCancel={()=>this.setState({visible: false})}
        className='home-warm-modal'
        footer={null}
      >
        <div className="home-warm-content">
          <div className="first-content">
          <Row>
            <Col span={12}><span className="title">详情</span></Col>
            <Col span={12}><span>时间：{alarmInfo?alarmInfo.gmtCreate:''}</span></Col>
            <Col span={12}><span>类型： {alarmInfo?alarmType(alarmInfo.type):''}</span></Col>
            <Col span={12}><span>程度：{alarmInfo?alarmDegree(alarmInfo.degree).degree:''}</span></Col>
            <Col span={12}><span>设备：{alarmInfo?alarmInfo.device:''}</span></Col>
          </Row>
          </div>
         
          </div>
          <div className="second-content">
          <p className="title" >处理意见</p>
          <textarea type="textarea"  rows="2" style={{width:'100%',border:'1px solid #e8e8e8'}} onChange={this.handleChange.bind(this)}></textarea>
          <div style={{display:'table',width:'100%',marginTop:'10px'}}>
            <div className='tr'>
              <span>处理人:{this.props.user.account?this.props.user.account.name:''}</span>
              <span>状态:{alarmInfo?alarmInfo.status === 0?'未处理':'已处理':''}    
              </span>
              <Button style={{float:'right'}} type="primary" disabled={alarmInfo?alarmInfo.status === 1:false} onClick={()=>this.props.modifyAlarm({id:alarmInfo.id,suggest:this.state.suggest})}>处理</Button>
            </div>
          </div>
          </div>
      </Modal>
      </div>
    )
  }
}

export default HomeTableList