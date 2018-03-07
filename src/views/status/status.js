import React from 'react'
import { Tabs,Table } from 'antd'
import { connect } from 'react-redux'
import { getServerStatus,getVideoHostStatus,getVideChannelStatus,postion,getBroadcastChannelStatus } from '../../redux/status.redux'

const TabPane = Tabs.TabPane

const columns = [{
    title: '内网IP',
    dataIndex: 'innerIp',
    key: 'innerIp',
  },{
    title: '外网IP',
    dataIndex: 'outerIp',
    key: 'outerIp',
  },{
    title: '软件服务器名称',
    dataIndex: 'name',
    key: 'name',
  },{
    title: '状态',
    dataIndex: 'status',
    key: 'status',
  },{
    title: 'cpu利用率',
    dataIndex: 'CpuPercent',
    key: 'CpuPercent',
  },{
    title: '内存利用率',
    dataIndex: 'MemoryPercent',
    key: 'MemoryPercent',
}]
const columns2 = [{
      title: 'ip',
      dataIndex: 'url',
      key: 'url',
  },{
    title: '主机名称',
    dataIndex: 'name',
    key: 'name',
  },{
    title: '状态',
    dataIndex: 'status',
    key: 'status',
}]
const columns3 = [{
    title: '主机名称',
    dataIndex: 'RemoteHostName',
    key: 'RemoteHostName',
  },{
  title: '通道序号',
  dataIndex: 'index',
  key: 'index',
  },{
    title: '通道名称',
    dataIndex: 'name',
    key: 'name',
    },{
  title: '状态',
  dataIndex: 'status',
  key: 'status',
}]
const columns4 = [{
    title: '名称',
    dataIndex: 'name',
    key: 'name',
  },{
  title: '编号',
  dataIndex: 'code',
  key: 'code',
  },{
  title: '状态',
  dataIndex: 'status',
  key: 'status',
}]
const columns5 = [{
    title: 'IP',
    dataIndex: 'ip',
    key: 'ip',
  },{
  title: '名称',
  dataIndex: 'name',
  key: 'name',
  },{
  title: '状态',
  dataIndex: 'status',
  key: 'status',
  }]
@connect(
  state => ({status: state.status}),
  {
    getServerStatus,getVideoHostStatus,getVideChannelStatus,postion,getBroadcastChannelStatus
  }
)
class Status extends React.Component {
  state = {  }
  componentDidMount() {
    this.props.getServerStatus()
  }
  onChange(e) {
    if(e==='2') {
      this.props.getVideoHostStatus()
    }
    if(e==='3') {
      this.props.getVideChannelStatus()
    }
    if(e==='4') {
      this.props.postion()
    }
    if(e==='5') {
      this.props.getBroadcastChannelStatus()
    }
  }
  render() {
    const { servers, videoHosts,videoChannel,broadcastChannel,position} = this.props.status
    return (
      <div style={{padding:'20px'}}>
        <Tabs defaultActiveKey="1" onChange={this.onChange.bind(this)}>
          <TabPane tab="服务器" key="1">
            <Table 
             loading={servers?false:true}
              columns={columns} 
              dataSource={servers}></Table>
          </TabPane>
          <TabPane tab="视频主机" key="2">
            <Table 
                loading={videoHosts?false:true}
                columns={columns2} 
                dataSource={videoHosts}></Table>
          </TabPane>
          <TabPane tab="视频通道" key="3">
            <Table
            loading={videoChannel?false:true}
            columns={columns3} 
            dataSource={videoChannel}></Table>
          </TabPane>
          <TabPane tab="人员基站" key="4">
            <Table
            loading={position?false:true}
            columns={columns4} 
            dataSource={position}></Table>
          
          </TabPane>
          <TabPane tab="广播服务" key="5">
            <Table
            loading={broadcastChannel?false:true}
            columns={columns5} 
            dataSource={broadcastChannel}></Table>
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

export default Status