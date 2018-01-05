import React from 'react'
import { Tabs, Table } from 'antd'
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

const data = [{
    name:'fsf',
    device:'硬盘录像机',
    address:'本地',
    'address-detail':'Dfdsf',
    size:'123213',
    progress:'16%'
  },{
    name:'fsf',
    device:'硬盘录像机',
    address:'本地',
    'address-detail':'Dfdsf',
    size:'123213',
    progress:'16%'
  },{
    name:'fsf',
    device:'硬盘录像机',
    address:'本地',
    'address-detail':'Dfdsf',
    size:'123213',
    progress:'16%'
  },{
    name:'fsf',
    device:'硬盘录像机',
    address:'本地',
    'address-detail':'Dfdsf',
    size:'123213',
    progress:'16%'
}]
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
    <img src="" alt=""/>
  )
}]
class VideoTableList extends React.Component {
  state = {  }
  render() {
    return (
      <div>
      <Tabs defaultActiveKey="1">
        <TabPane tab="回放文件列表" key="1">
           <Table 
             pagination={false}
             columns={columns1} 
            // dataSource={data}
             scroll={{y:150}}
             size='middle' />
        </TabPane>
        <TabPane tab="文件下载列表" key="2">
          <Table 
            pagination={false}
            columns={columns} 
            dataSource={data}
            scroll={{y:150}}
            size='middle' />
        </TabPane>
      </Tabs>
      </div>
    )
  }
}

export default VideoTableList