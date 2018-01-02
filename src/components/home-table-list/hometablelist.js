import React from 'react'
import { Checkbox,Modal, Tabs, Table, Icon, Input, Select, Button, Pagination } from 'antd';
import className from 'classnames'
import {connect} from 'react-redux'
import { alarmPages,modifyAlarm } from '../../redux/alarm.redux'
import './home-table-list.scss'
import { alarmDegree, alarmType } from '../../utils'
const TabPane = Tabs.TabPane


@connect(
  state => ({alarm:state.alarm,user:state.user}),
  {alarmPages,modifyAlarm}
)
class HomeTableList extends React.Component {
  state={
    visible: false,
    alarmInfo: null,
    suggest:''
  }
  componentDidMount() {
    this.props.alarmPages()
  }
  alarmlistRender() {
    const list = this.props.alarm.alarmlist
    return list.map(alarm => {
      const style = className({
        item: true,
        [alarmDegree(alarm.degree).class]:true
      })
      return (
        <div className={style} key={alarm.id} onClick={this.alarmClick.bind(this,alarm)}>
          <Checkbox></Checkbox>
          <span className='status'>{alarm.status === 0?'未处理':'已处理'}</span>
          <span className='time'>{alarm.gmtCreate}</span>
          <span className='type'>{alarmType(alarm.type)}</span>
          <Button size='small' ghost>{alarmDegree(alarm.degree).degree}</Button>
          <span className='device'>{alarm.device}</span>
        </div>
      )
    })
  }
  alarmClick(alarm) {
    this.setState({
      visible: true,
      alarmInfo:alarm
    })
    //this.props.getAlarmInfo({id:id})
  }
  handleChange(e){
    console.log(e.target.value)
    this.setState({suggest:e.target.value})
  }
  render() {
    const alarmInfo = this.state.alarmInfo
    console.log(this.props)
    const columns = [{
      title: '名称',
      dataIndex: 'name',
     }, {
      title: '操作',
      dataIndex: 'action',
      key:'action',
      render: (text, record) => (
        <span>
          <Icon type='sound' style={{marginRight:'10px'}} ></Icon>
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
      <div className="list">
       <div className="item">
       <Button type='primary'>一键处理</Button>
       </div>
        {this.props.alarm.alarmlist.length>0?this.alarmlistRender():null}
        <Modal title="报警" 
        visible={this.state.visible}
        onOk={this.props.handleOk} 
        onCancel={()=>this.setState({visible: false})}
        className='home-warm-modal'
        footer={null}
      >
        <div className="home-warm-content">
          <div className="first-content">
            <div className='left'>
              <p className="title">详情</p>
              <p>时间：{alarmInfo?alarmInfo.gmtCreate:''}</p>
              <p>类型： {alarmInfo?alarmType(alarmInfo.type):''}</p>
              <p>程度：{alarmInfo?alarmDegree(alarmInfo.degree).degree:''}</p>
              <p>设备：{alarmInfo?alarmInfo.device:''}</p>
              <p>位置：{alarmInfo?alarmInfo.place:''}</p>
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
          <p className="title" >处理意见</p>
          <textarea type="textarea"  rows="2" style={{width:'100%',border:'1px solid #e8e8e8'}} onChange={this.handleChange.bind(this)}></textarea>
          <div style={{display:'table',width:'100%',marginTop:'10px'}}>
            <div className='tr'>
              <span>处理人:{this.props.user.account?this.props.user.account.name:''}</span>
              <span>状态:{alarmInfo?alarmInfo.status === 0?'未处理':'已处理':''}    
              </span>
              <Button type="primary" disabled={alarmInfo?alarmInfo.status === 1:false} onClick={()=>this.props.modifyAlarm({id:alarmInfo.id,suggest:this.state.suggest})}>处理</Button>
            </div>
          </div>
          </div>
          <Pagination style={{textAlign:'center', paddingBottom:'10px'}} simple defaultCurrent={2} total={50} />
      </Modal>
      </div>
    )
  }
}

export default HomeTableList