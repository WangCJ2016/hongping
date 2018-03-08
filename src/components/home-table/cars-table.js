import React from 'react'
import { Table } from 'antd'

const columns = [{
    title: '时间',
    dataIndex: 'time',
    key: 'time', 
  },{
    title: '车牌',
    dataIndex: 'carNo',
    key: 'carNo', 
  },{
    title: 'action',
    dataIndex: 'action',
    key: 'action', 
    render:(text,record)=>(
      <span>{record.action===1?'进':'出'}</span>
    )
  },{
    title: 'gate',
    dataIndex: 'gate',
    key: 'gate', 
  },{
    title: 'outline',
    dataIndex: 'outline',
    key: 'outline', 
    render: (text,record)=>(
      <span>
        <span>{record.outline}</span>
        <img src={record.picture} alt=""/>
      </span>
    )
  }]
class CarsTable extends React.Component {
  constructor() {
    super()
    this.pageChange = this.pageChange.bind(this)
  }
  pageChange(e) {
    this.prosp.pageChange({pageSize:e})
  }
  render() {
    const data = this.props.carPages
    return (
      <Table 
        columns={columns} 
        pagination={{
          total: data.records,
          onChange: this.pageChange
        }}
        rowKey={(record)=>record.id}
        size='small'
        dataSource={data.result}
        
         />
    )
  }
}

export default CarsTable