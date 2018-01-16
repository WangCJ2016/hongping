import React from 'react'
import { Tabs, Table, Icon } from 'antd'
import { connect } from 'react-redux'
import { downloadCreate } from '../../redux/video.redux'
const TabPane = Tabs.TabPane;


const columns = [{
    title: '文件名',
    dataIndex: 'name',
    key: 'name',
  },{
    title: '所在设备',
    dataIndex: 'device',
    key: 'device',
  },{
    title: '存放设备',
    dataIndex: 'address',
    key: 'address',
  },{
    title: '存放路径',
    dataIndex: 'address-detail',
    key: 'address-detail',
  },{
    title: '文件大小',
    dataIndex: 'size',
    key: 'size',
  },{
    title: '进度',
    dataIndex: 'progress',
    key: 'progress',
}]

@connect(
  state=>({video: state.video,user:state.user}),
  {downloadCreate}
)
class VideoTableList extends React.Component {
  constructor() {
    super()
    this.onRowClick = this.onRowClick.bind(this)
    this.download = this.download.bind(this)
  }
  onRowClick(record,index) {
    const device = this.props.video.playbackSelectDevice
    const model = device.host.model === 1?'HikHC-14':'DHNET-03'
    this.props.play.XzVideo_RecordPlayByName(
      1,
      this.props.user.account.name,
      "",
      0,
      device.host.vid,
      device.host.url,
      device.host.port,
      device.host.username,
      device.host.psw,
      model,
      device.index,
      record.name,
      '2018-01-11 09:30:00','2018-01-11 12:00:00',0)
      this.props.selectVideo(record)
       const a = this.props.play.XzVideo_GetRecordPlayPos([0,50])
       alert(a)
       console.log(a)
      // setInterval(()=>{
      //   let pos = '50'
      //   const a = this.props.play.GetLocallFile(0)
      //   console.log(a)
      // },1000)
  }
  download(record) {
    const device = this.props.video.playbackSelectDevice
    const model = device.host.model === 1?'HikHC-14':'DHNET-03'
    const a = this.props.play.XzVideo_DownLoadFileFromDVR(
      1,
      device.host.vid,
      device.host.url,
      device.host.port,
      device.host.username,
      device.host.psw,
      model,
      device.index,
      record.name,
      "D:\\test.mp4"
    )
    if(a!==-1) {
      const data = {
        name: record.name,
        device: device.name,
        address:'本地',
        'address-detail':'D:\\test.mp4',
        size:record.size,
        progress:'0%',
        downloadHandle: a
      }
      this.props.downloadCreate(data)
    }
  }
  render() {
    const columns1 = [{
      title: '文件ID号',
      dataIndex: 'id',
      key: 'id',
      },{
        title: '文件名',
        dataIndex: 'name',
        key: 'name',
      },{
        title: '所在主机',
        dataIndex: 'host',
        key: 'host',
      },{
        title: '所在IP',
        dataIndex: 'ip',
        key: 'ip',
      },{
        title: '通道名称',
        dataIndex: 'channelname',
        key: 'channelname',
      },{
        title: '通道序号',
        dataIndex: 'channelindex',
        key: 'channelindex',
      },{
        title: '起始时间',
        dataIndex: 'startime',
        key: 'startime',
      },{
        title: '结束时间',
        dataIndex: 'endtime',
        key: 'endtime',
      },{
        title: '文件大小',
        dataIndex: 'size',
        key: 'size',
      },{
        title: '下载',
        render:(text,record)=>(
          <Icon type='download' onClick={()=>this.download(record)} />
        )
    }]
    const downloadTablelist = this.props.video.downloadTableList
    
    return (
      <div>
      <Tabs defaultActiveKey="1">
        <TabPane tab="回放文件列表" key="1">
           <Table 
             pagination={{
               pageSize:5,
               total:this.props.video.playback.length
             }}
             size='small'
             columns={columns1} 
             dataSource={this.props.video.playback}
             onRowClick={this.onRowClick}
             />
        </TabPane>
        <TabPane tab="文件下载列表" key="2">
          <Table 
            pagination={{
              pageSize:5,
              total:this.props.video.playback.length
            }}
            size='small'
            columns={columns} 
            dataSource={downloadTablelist}
            />
        </TabPane>
      </Tabs>
      </div>
    )
  }
}

export default VideoTableList