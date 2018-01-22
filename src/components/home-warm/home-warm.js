import React from 'react'
import { Modal, Tabs, Table, Icon, Select, Button, Pagination } from 'antd'
import './home-warm.scss'
const TabPane = Tabs.TabPane
const Option = Select.Option;

class HomeWarmModal extends React.Component {
  
  broadcast(record) {
    console.log(record)
  }
  render() {
    const columns = [{
      title: '名称',
      dataIndex: 'name',
     }, {
      title: '操作',
      dataIndex: 'action',
      key:'action',
      render: (text, record) => (
        <span>
          <Icon type='sound' style={{marginRight:'10px'}} onClick={this.broadcast.bind(this,record)}></Icon>
          <Icon type='sound'></Icon>
        </span>
      ),
    }];
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      onSelect: (record, selected, selectedRows) => {
        console.log(record, selected, selectedRows);
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        console.log(selected, selectedRows, changeRows);
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User',    // Column configuration not to be checked
      }),
    };
    const data = [{
      key: '1',
      name: '主地图-广播'
    }, {
      key: '2',
      name: '主地图-广播'
    }, {
      key: '3',
      name: '主地图-广播',
    }, ];
    
    return (
      <Modal title="报警" 
        visible={this.props.visible}
        onOk={this.props.handleOk} 
        onCancel={this.props.handleCancel}
        className='home-warm-modal'
        footer={null}
      >
        <div className="home-warm-content">
          <div className="first-content">
            <div className='left'>
              <p className="title">详情</p>
              <p>时间：2017-09-21  17:09:00</p>
              <p>类型： 消防警报</p>
              <p>程度：紧急</p>
              <p>设备：B9001设备</p>
              <p>位置：位于A楼3层东面</p>
            </div>
            <div className="right">
              <p className="title">联动</p>
              <Tabs defaultActiveKey="1">
                <TabPane tab="摄像头" key="1">
                  <Table 
                  rowSelection={rowSelection}
                  columns={columns} 
                  dataSource={data}
                  pagination={false}
                  size='small' />
                </TabPane>
                <TabPane tab="广播" key="2">Content of Tab Pane 2</TabPane>
                <TabPane tab="门禁" key="3">Content of Tab Pane 3</TabPane>
              </Tabs>
            </div>
          </div>
         
          </div>
          <div className="second-content">
          <p className="title">处理意见</p>
          <textarea type="textarea"  rows="2" style={{width:'100%',border:'1px solid #e8e8e8'}}></textarea>
          <div style={{display:'table',width:'100%',marginTop:'10px'}}>
            <div className='tr'>
              <span>处理人:admin</span>
              <span>状态:
                <Select defaultValue="lucy" style={{ width: 90 }} >
                  <Option value="jack">未处理</Option>
                  <Option value="lucy">处理</Option>
                </Select>
              </span>
              <span>处理时间:2015-09-7</span>
              <Button type="primary">处理</Button>
            </div>
          </div>
          </div>
          <Pagination style={{textAlign:'center', paddingBottom:'10px'}} simple defaultCurrent={2} total={50} />
      </Modal>
    )
  }
}

export default HomeWarmModal