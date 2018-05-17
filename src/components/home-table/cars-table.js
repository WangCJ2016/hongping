import React from 'react'
import { Table, Button, Modal } from 'antd'


class CarsTable extends React.Component {
  constructor() {
    super()
    this.state  = {
      modalVisible: false
    }
    this.pageChange = this.pageChange.bind(this)
  }
  componentDidMount() {
    this.props.carPagesfn({pageSize: 1})
  }
  pageChange(e) {
    this.props.carPagesfn({pageSize:e})
  }
  render() {
    const columns = [{
          title: '时间',
          dataIndex: 'gmtCreate',
          key: 'gmtCreate', 
          width:100,
        },{
          title: '车牌',
          dataIndex: 'carNo',
          width:100,
          key: 'carNo', 
        },{
          title: '进出',
          dataIndex: 'action',
          width:100,
          key: 'action', 
          render:(text,record)=>(
            <span>{record.action===1?'进':'出'}</span>
          )
        },{
          title: '道闸',
          dataIndex: 'gate',
          width:100,
          key: 'gate', 
        },{
          title: '颜色',
          dataIndex: 'outline',
          width:100,
          key: 'outline', 
          render: (text,record)=>(
            <span>
              <span>{record.outline}</span>
              <img src={record.picture} alt=""/>
            </span>
          )
        },{
          title: '查看图片', 
          dataIndex: 'picture',
          width:100,
          key: 'picture',
          render:(text,record)=>(
            <span>
              <Button type='primary' onClick={()=>this.setState({pic: text, modalVisible: true})}>查看图片</Button>
            </span>
          )
    }]
    const data = this.props.carPages
    console.log(data.result)
    return (
      <div>
        <Table 
        columns={columns} 
        pagination={{
          pageSize:50,
          total: data.records,
          onChange: this.pageChange
        }}
        scroll={{ y:this.props.alarmHeight }}
        rowKey={(record)=>record.id}
        size='small'
        dataSource={data.result}
        
        />
        <Modal
            title="图片预览" 
            visible={this.state.modalVisible}
            style={{ top: 200 }}
            width='50%'
            okText='确定'
            cancelText='取消' 
            footer={false}
            onCancel={()=>this.setState({modalVisible:false})}
            >
            <img style={{width: '100%'}} src={this.state.picture || ''} alt=""/>
          </Modal>
      </div>
    )
  }
}

export default CarsTable