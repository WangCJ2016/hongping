import React from 'react'
import { Table } from 'antd'

const columns = [{
    title: 'time',
    dataIndex: 'time',
    key: 'time', 
  },{
    title: 'carNo',
    dataIndex: 'carNo',
    key: 'carNo', 
  },{
    title: 'action',
    dataIndex: 'action',
    key: 'action', 
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
        size='small'
        dataSource={data.result}
        showHeader={false}
        scroll={{y:200}} />
    )
  }
}

export default CarsTable