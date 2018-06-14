import React from 'react'
import { Table,Modal, Button, message,Row,Col } from 'antd';
import {connect} from 'react-redux'
import { alarmPages,modifyAlarm,getAlarmInfo,getUndoPatrolPoints } from '../../redux/alarm.redux'
import { areaInfo,dataSuccess } from '../../redux/area.redux'
import { querySysInstallPlaces } from '../../redux/setting.device.redux'
import './home-table-list.scss'
import { alarmDegree, alarmType } from '../../utils'
import broadcastHoc from '../broadcastHoc/broadcastHoc'


@connect(
  state => ({alarm:state.alarm,user:state.user}),
  {alarmPages,modifyAlarm,getAlarmInfo,areaInfo,querySysInstallPlaces,dataSuccess,getUndoPatrolPoints}
)
@broadcastHoc
class HomeTableList extends React.Component {
  state={
    visible: false,
    playVisible: false,
    suggest:'',
    selectKeys: []
  }
  componentDidMount() {
    this.props.alarmPages({pageNo:1})
  }
  pointHandle(data) {
    const name = data.event.split('：')[1].slice(0,-3)
    this.props.getUndoPatrolPoints({title: name, date: data.time})
    this.setState({
      pointVisible: true
    })
  }
  playBack = (record) => {
    this.props.videoPlayBack(record)
    //this.play.XzVideo_PreSet(39,preset.presetId,0)}
  }
  playReal = (record) => {
    console.log(record)
    this.props.videoPlay(record,record.device)
  }
  alarmlistRender() {
    const columns = [{
        title: '状态',
        dataIndex: 'status',
        key:'status',
        width:100,
        render:(text,record)=>{
          return <span>{record.status === 0?'未处理':'已处理'}</span>
        }
      }, {
        title: '时间',
        width:100,
        dataIndex: 'time',
        key:'time'
      },
      {
        title: '类型',
        dataIndex: 'type',
        width:100,
        key:'type',
        render:(text,record)=>{
          return <span>{alarmType(record.type)}</span>
        }
      },
      {
        title: '等级',
        dataIndex: 'degree',
        width:100,
        key:'degree',
        render:(text,record)=>{
          return <span>{alarmDegree(record.degree).degree}</span>
        }
      },
      {
        title: '设备',
        dataIndex: 'device',
        width:100,
        key:'device'
      },
      {
        title: '定位',
        dataIndex: 'icon',
        width:100,
        key:'icon',
        render:(text,record)=>(
          <a onClick={this.goLoc.bind(this,record)}>
            <img src={require('../../assets/imgs/loc_icon.png')} alt='' />
          </a>
        )
      },
      {
        title: '回放',
        dataIndex: 'back',
        width:100,
        key:'back',
        render:(text,record)=>(
          <Button type='primary' onClick={()=>this.playBack(record)}>回放</Button>
        )
      },
      {
        title: '联动',
        dataIndex: 'liandong',
        width:100,
        key:'liandong',
        render:(text,record)=>(
          <Button type='primary' onClick={()=>this.playReal(record)}>联动</Button>
        )
      },
      {
        title: (<Button size='small' type='primary' onClick={this.handleSelect}>一键处理</Button>),
        width:100,
        render:(text,record)=>{
          return <span>
            <Button onClick={this.alarmClick.bind(this,record)} type='primary'>处理</Button>
            {
              record.type === 5?
              <Button onClick={this.pointHandle.bind(this,record)} type='primary'>查看</Button>:null
            }
          </span> 
        },
        
    }]
    const list = this.props.alarm.alarmlist
    const rowSelection = {
      onChange: this.onSelectChange
    }
    return <Table 
              pagination={{
                pageSize:50,
                onChange:(e)=>this.props.alarmPages({pageNo:e}),
                total:this.props.alarm.alarmPageTotal,
              }}  
              rowSelection={rowSelection}
              scroll={{ y:this.props.alarm.alarmHeight }}
              rowKey={(record)=>{return record.id}}
              columns={columns} 
              dataSource={list} 
              size='small' />
  }
  onSelectChange = (keys) => {
    this.setState({
      selectKeys: keys
    })
  }
  handleSelect = () => {
    this.props.modifyAlarm({id: this.state.selectKeys.join(','), suggest: ''}) 
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
    const columns = [{
      title: '名称',
      dataIndex: 'name',
      key:'name',
    },
    {
      title: '点位',
      dataIndex: 'point',
      key:'point',
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key:'remark'
    }
    ]
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
                <Button style={{float:'right'}} type="primary" disabled={alarmInfo?alarmInfo.status === 1:false} onClick={()=>this.props.modifyAlarm({id:alarmInfo.id,suggest:encodeURI(this.state.suggest)})}>处理</Button>
              </div>
            </div>
            </div>
        </Modal>

        <Modal
          title="巡更点位" 
          visible={this.state.pointVisible}
          onOk={this.props.handlePointOk} 
          onCancel={()=>this.setState({pointVisible: false})}
          className='home-warm-modal'
          footer={null} 
         >
         {
          this.props.alarm.unhandlePoints?
          <Table size='small' columns={columns} dataSource={this.props.alarm.unhandlePoints}  rowKey={(record)=>{return record.id}}></Table>:
          null
         }
          
        </Modal>

        <Modal
          title="视频回放" 
          visible={this.state.playVisible}
          onOk={()=>this.setState({playVisible: false})} 
          onCancel={()=>this.setState({playVisible: false})}
          className='home-warm-modal'
          footer={null} 
         >
         {
          <object 
                ref={(screen)=>this.play=screen}
                classID="clsid:A6871295-266E-4867-BE66-244E87E3C05E"
                codebase="./SetupOCX.exe#version=1.0.0.1"
                width={600}
                height={800}
                className='playScreen'
                >
                <a style={{display:'block',lineHeight:'560px',textAlign:'center',textDecoration:'underline'}} href="http://192.168.1.51:8080/SetupOCX.exe" download='控件'>请点击此处下载插件,安装时请关闭浏览器</a>
              </object>
         }
          
        </Modal>
      </div>
    )
  }
}

export default HomeTableList