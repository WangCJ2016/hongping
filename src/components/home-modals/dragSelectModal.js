import React from 'react'
import { Modal,Tabs,Table } from 'antd'
const TabPane = Tabs.TabPane

const columns = [{
  title: '名称',
  dataIndex: 'name',
  key: 'name',
  render: (text, record) => {
    if(record.type===1){
      return (
        <div>
        <img className='type-icon' src={require('../../assets/imgs/video-icon.png')} alt=""/>
        {record.name}
        </div>
      )
    }else{
      return (
        <div>
        <img className='type-icon' src={require('../../assets/imgs/hongwai-icon.png')} alt=""/>
        {record.name}
        </div>
      )
    }
  }
},{
  title: '操作',
  dataIndex: 'action',
  key: 'action',
  render: text => <a href="#">caozuo</a>,
}]

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
            <Table size='small' columns={columns} dataSource={this.props.rectInDevice.filter(device=>device.type===1||device.type===2).map(deive=>({...deive,key:deive.id}))} />
          </TabPane>
          <TabPane tab="广播" key="2">
           <Table size='small' columns={columns} dataSource={this.dataType(4)} />
          </TabPane>
          <TabPane tab="人员" key="4">
           
          </TabPane>
          <TabPane tab="门禁" key="5">
           <Table size='small' columns={columns} dataSource={this.dataType(5)} />
          </TabPane>
          <TabPane tab="道闸" key="6">
              <Table size='small' columns={columns} dataSource={this.dataType(3)} />
          </TabPane>
        </Tabs>
      </Modal>
    )
  }
}

export default DragSelectModal