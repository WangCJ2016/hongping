import React from 'react'
import { Tabs,Table } from 'antd'
import { connect } from 'react-redux'
import { getServerStatus,getVideoHostStatus,getVideChannelStatus,postion,getBroadcastChannelStatus,getGuardStatus } from '../../redux/status.redux'

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
    render: (text) => (
      <span style={{color: text==='失败'?'red':'#d8d8d8'}}>
        {text}
      </span>
    )
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
    render: (text) => (
      <span style={{color: text==='失败'?'red':'#d8d8d8'}}>
        {text}
      </span>
    )
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
  render: (text) => (
    <span style={{color: text==='失败'?'red':'#d8d8d8'}}>
      {text}
    </span>
  )
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
  render: (text) => (
      <span style={{color: text==='失败'?'red':'#d8d8d8'}}>
        {text}
      </span>
    )
}]
const columns6 = [{
  title: '名称',
  dataIndex: 'name',
  key: 'name',
  },{
  title: '状态',
  dataIndex: 'status',
  key: 'status',
  render: (text,span)=> (
    <span>{text===1?'开':'关'}</span>
  )
}]
@connect(
  state => ({status: state.status,user:state.user}),
  {
    getServerStatus,getVideoHostStatus,getVideChannelStatus,postion,getBroadcastChannelStatus,getGuardStatus
  }
)
class Status extends React.Component {
  state = {  }
  componentDidMount() {
    this.props.getServerStatus()
  }
  onChange(e) {
    const { videoHosts,videoChannel,broadcastChannel,position,guardList} = this.props.status
    if(e==='status-host'&&!videoHosts) {
      this.props.getVideoHostStatus()
    }
    if(e==='status-channel'&&!videoChannel) {
      this.props.getVideChannelStatus()
    }
    if(e==='status-station'&&!position) {
      this.props.postion()
    }
    if(e==='status-broadcast'&&!broadcastChannel) {
      this.props.getBroadcastChannelStatus()
    }
    if(e==='status-guard'&&!guardList) {
      this.props.getGuardStatus()
    }
  }
  render() {
    const { servers, videoHosts,videoChannel,broadcastChannel,position,guardList} = this.props.status
    const {authMenu} = this.props.user
    return (
      <div style={{padding:'20px'}}>
        <Tabs  onChange={this.onChange.bind(this)}>
          {
            authMenu.indexOf('status-server')>-1?
            <TabPane tab="服务器" key="status-server">
              <Table 
                loading={servers?false:true}
                pagination={{
                  pageSize: 1000,
                }}
                columns={columns} 
                dataSource={servers}></Table>
            </TabPane>:null
          }
          {
            authMenu.indexOf('status-host')>-1?
            <TabPane tab="视频主机" key="status-host">
              <Table 
                  loading={videoHosts?false:true}
                  pagination={{pageSize: 1000}}
                  columns={columns2} 
                  dataSource={videoHosts}></Table>
            </TabPane>:null
          }
          {
            authMenu.indexOf('status-channel')>-1?
            <TabPane tab="视频通道" key="status-channel">
              <Table
              loading={videoChannel?false:true}
              pagination={{pageSize: 1000}}
              columns={columns3} 
              dataSource={videoChannel}></Table>
            </TabPane>:null
          }
          {
            authMenu.indexOf('status-station')>-1? 
            <TabPane tab="人员基站" key="status-station">
              <Table
              pagination={{pageSize: 1000}}
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
              pagination={{pageSize: 1000}}
              columns={columns5} 
              dataSource={broadcastChannel}></Table>
            </TabPane>:null
          }
          {/*
          */}
          <TabPane tab="门禁" key="status-guard">
              <Table 
                loading={guardList?false:true}
                pagination={{pageSize: 1000}}
                columns={columns6} 
                rowKey={(record,index)=>index}
                dataSource={guardList}></Table>
            </TabPane>
        </Tabs>
      </div>
    )
  }
}

export default Status