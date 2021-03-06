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
    this.props.carPagesfn({pageSize: 10,pageNo:1})
  }
  pageChange(e) {
    this.props.carPagesfn({pageNo:e})
  }
  getDetialPic = (e) => {
     this.props.getCarDetail({carId: e.target.dataset.id})
     this.setState({ modalVisible: true})
  }
  render() {
    const columns = [{
          title: '时间',
          dataIndex: 'time',
          key: 'time', 
          width:100,
        },{
          title: '车牌',
          dataIndex: 'carNo',
          width:100,
          key: 'carNo', 
        },{
          title: '道闸',
          dataIndex: 'gate',
          width:100,
          key: 'gate', 
        },{
          title: '查看图片', 
          dataIndex: 'picture',
          width:100,
          key: 'picture',
          render:(text,record)=>(
            <span>
              <Button type='primary' data-id={record.id} onClick={this.getDetialPic}>查看图片</Button>
            </span>
          )
    }]
    const data = this.props.carPages
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
            <img style={{width: '100%'}} src={this.props.carPic || ''} alt=""/>
          </Modal>
      </div>
    )
  }
}

export default CarsTable