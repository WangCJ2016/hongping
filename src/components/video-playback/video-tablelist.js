import React from 'react'
import { Tabs, Table, Icon } from 'antd'
import { connect } from 'react-redux'
import { downloadCreate,downloadModify,selectVideo,videoProgress } from '../../redux/video.redux'
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
  {downloadCreate,downloadModify,selectVideo,videoProgress}
)
class VideoTableList extends React.Component {
  constructor() {
    super()
    this.onRowClick = this.onRowClick.bind(this)
    this.download = this.download.bind(this)
  }
  componentWillUnMount(){
    if(this.timer){
      clearInterval(this.timer)
    }
  }
  onRowClick(record,index) {
    const device = this.props.video.playbackSelectDevice
    const model = device.host.model === 1?'HikHC-14':'DHNET-03'
    this.props.play.XzVideo_RecordPlayByName(
      1,
      this.props.user.account.name,
      '',
      0,
      1,
      device.host.url,
      device.host.port,
      device.host.username,
      device.host.psw,
      model,
      device.index,
      record.name,
      record.startime,record.endtime,0)
      this.props.selectVideo(record)
  
     this.timer =  setInterval(()=>{
        const a = this.props.play.XzVideo_GetRecordPlayPosEx(0)
        if(a<=100){
          this.props.videoProgress(a)
        }else{
          clearInterval(this.timer)
        }
      },1000)
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
      this.props.video.videoPath+record.name
    )
    if(a!==-1) {
      const data = {
        key: record.name,
        name: record.name,
        device: device.name,
        address:'本地',
        'address-detail':this.props.video.videoPath,
        size:record.size,
        progress:'0%'
      }
      this.props.downloadCreate(data)
      const interval = setInterval(()=>{
         const progress =  this.props.play.XzVideo_GetDownLoadFilePos(a)
         if(progress === 100){
           clearInterval(interval)
           this.props.downloadModify({...data,progress:100+'%'})
         }else{
           this.props.downloadModify({...data,progress:progress+'%'})
         }
      },500)
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
          <Icon type='download' style={{ cursor: 'pointer'}} onClick={()=>this.download(record)} />
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