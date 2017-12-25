import React from 'react'
import {  Table, Icon } from 'antd'
import { connect } from 'react-redux'

@connect(
  state => state.remoteHost
)
class SettingVideoChannelDetail extends React.Component {
  state = {  }
  render() {
    const columns = [ {
              title: '通道名称',
              dataIndex: 'name',
              width: '80%',
              key: 'name',
            }, {
              title: '操作',
              dataIndex: 'action',
              key: 'remark',
              render: (record) => (
                <a><Icon type='edit' />编辑</a>
              )
            }];
      
      const channelsList = this.props.channelsList
    return (
      <div className="setting-user-role float-right" style={{width:'65%'}}>
        <div className="title role">NVR主机(AAA主机</div>
        {channelsList? <Table 
          columns={columns} 
          dataSource={channelsList} 
          size="middle"
          showHeader={false}
          pagination={false}/>:null}
    </div>
    )
  }
}

export default SettingVideoChannelDetail