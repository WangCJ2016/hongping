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
  state => ({status: state.status,user:state.user}),
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
    if(e==='status-host') {
      this.props.getVideoHostStatus()
    }
    if(e==='status-channel') {
      this.props.getVideChannelStatus()
    }
    if(e==='status-station') {
      this.props.postion()
    }
    if(e==='status-broadcast') {
      this.props.getBroadcastChannelStatus()
    }
  }
  render() {
    console.log('fdsf'+JSON.stringify(videoHosts))
    const { servers, videoHosts,videoChannel,broadcastChannel,position} = this.props.status
    const {authMenu} = this.props.user
    return (
      <div style={{padding:'20px'}}>
        <Tabs  onChange={this.onChange.bind(this)}>
          {
            authMenu.indexOf('status-server')>-1?
            <TabPane tab="服务器" key="status-server">
              <Table 
              loading={servers?false:true}
                columns={columns} 
                dataSource={servers}></Table>
            </TabPane>:null
          }
          {
            authMenu.indexOf('status-host')>-1?
            <TabPane tab="视频主机" key="status-host">
              <Table 
                  loading={videoHosts?false:true}
                  columns={columns2} 
                  dataSource={videoHosts}></Table>
            </TabPane>:null
          }
          {
            authMenu.indexOf('status-channel')>-1?
            <TabPane tab="视频通道" key="status-channel">
              <Table
              loading={videoChannel?false:true}
              columns={columns3} 
              dataSource={videoChannel}></Table>
            </TabPane>:null
          }
          {
            authMenu.indexOf('status-station')>-1? 
            <TabPane tab="人员基站" key="status-station">
              <Table
              loading={position?false:true}
              columns={columns4} 
              dataSource={position}></Table>
            
            </TabPane>:null
          }
          {
            authMenu.indexOf('status-broadcast')>-1? 
            <TabPane tab="广播服务" key="status-broadcast">
            <Table
              loading={broadcastChannel?false:true}
              columns={columns5} 
              dataSource={broadcastChannel}></Table>
            </TabPane>:null
          }
          
        </Tabs>
      </div>
    )
  }
}

export default Status