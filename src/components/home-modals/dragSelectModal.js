import React from 'react'
import { Modal,Tabs,Table,Switch } from 'antd'
import broadcastHoc from '../../components/broadcastHoc/broadcastHoc'
const TabPane = Tabs.TabPane


@broadcastHoc
class DragSelectModal extends React.Component {
  constructor() {
    super()
    this.state = {
      videoPicVisible:false
    }
    this.dataType = this.dataType.bind(this)
    this.onCancel = this.onCancel.bind(this)
  }
  
  dataType(type) {
   return this.props.rectInDevice.filter(device=>device.type===type).map(deive=>({...deive,key:deive.id}))
  }
  onCancel() {
    this.props.onCancel()
  }
  render() {
    const columnsVideo = [{
      title: '名称',
      dataIndex: 'devName',
      key: 'devName',
      render: (text, record) => {
        if(record.type===1){
          return (
            <div>
            <img className='type-icon' src={require('../../assets/imgs/video-icon.png')} alt=""/>
            {record.devName}
            </div>
          )
        }
        if(record.type===2){
          return (
            <div>
            <img className='type-icon' src={require('../../assets/imgs/hongwai-icon.png')} alt=""/>
            {record.devName}
            </div>
          )
        }
        if(record.type===3){
          return (
            <div>
            <img className='type-icon' src={require('../../assets/imgs/daozha-icon.png')} alt=""/>
            {record.devName}
            </div>
          )
        }
      }
      },{
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        render: (text,record) => <a onClick={()=>this.props.videoPlay(record)}>预览</a>,
    }]
    const columnsGuard = [{
      title: '名称',
      dataIndex: 'devName',
      key: 'devName',
      render: (text, record) => {
        if(record.type===3){
          return (
            <div>
            <img className='type-icon' src={require('../../assets/imgs/guard-icon.png')} alt=""/>
            {record.devName}
            </div>
          )
        }
      }
      },{
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        render: (text,record) => <a onClick={()=>{}}>开门</a>,
    }]
    const columnsBroadCast = [{
      title: '名称',
      dataIndex: 'devName',
      key: 'devName',
      render: (text, record) => {
        if(record.type===4){
          return (
            <div>
            <img className='type-icon' src={require('../../assets/imgs/broadcast-icon.png')} alt=""/>
            {record.devName}
            </div>
          )
        }
      }
      },{
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        render: (text,record) => (
          <span>
            <a onClick={()=>this.props.voiceBroadcast([record.index])}>语音播报</a>
            <a onClick={()=>this.props.broadcastFile([record.index])}>文件播报</a>
          </span>
        ),
    }]
    const columnsDaozha = [{
      title: '名称',
      dataIndex: 'devName',
      key: 'devName',
      render: (text, record) => {
        if(record.type===3){
          return (
            <div>
            <img className='type-icon' src={require('../../assets/imgs/daozha-icon.png')} alt=""/>
            {record.devName}
            </div>
          )
        }
      }
      },{
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        render: (text,record) => <Switch></Switch>
    }]
    console.log(this.props.rectInDevice)
    return (
      <Modal
        title="框选结果" 
        visible={this.props.visible}
        style={{ top: 200 }}
        width='50%'
        footer={false}
        onCancel={this.onCancel}
        >
        <Tabs defaultActiveKey="1">
          <TabPane tab="视频" key="1">
            <Table size='small' columns={columnsVideo} dataSource={this.props.rectInDevice.filter(device=>device.type===1||device.type===2).map(deive=>({...deive,key:deive.id}))} />
          </TabPane>
          <TabPane tab="广播" key="2">
           <Table size='small' columns={columnsBroadCast} dataSource={this.dataType(4)} />
          </TabPane>
          <TabPane tab="人员" key="4">
           
          </TabPane>
          <TabPane tab="门禁" key="5">
           <Table size='small' columns={columnsGuard} dataSource={this.dataType(5)} />
          </TabPane>
          <TabPane tab="道闸" key="6">
              <Table size='small' columns={columnsDaozha} dataSource={this.dataType(3)} />
          </TabPane>
        </Tabs>
      </Modal>
    )
  }
}

export default DragSelectModal