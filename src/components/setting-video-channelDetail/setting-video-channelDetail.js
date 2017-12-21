import React from 'react'
import { Button, Table } from 'antd'
class SettingVideoChannelDetail extends React.Component {
  state = {  }
  render() {
    const columns = [{
              title: '序号',
              dataIndex: 'index',
              key: 'index',
            }, {
              title: '通道名称',
              dataIndex: 'name',
              key: 'name',
            }, {
              title: '备注',
              dataIndex: 'remark',
              key: 'remark',
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
        key:1,
        name: 'John Brown',
        index: 32,
        remark: 'New York No. 1 Lake Park',
      }, {
        key:2,
        name: 'John Brown',
        index: 32,
        remark: 'New York No. 1 Lake Park',
      }, {
        key:3,
        name: 'John Brown',
        index: 32,
        remark: 'New York No. 1 Lake Park',
      }];
    return (
      <div className="setting-user-role float-right" style={{width:'65%'}}>
        <div className="title role">NVR主机(AAA主机</div>
        <div className='btn-group'>
          <Button type="primary">修改</Button>
          <Button type="primary">刷新</Button>
          <Button type="primary">启用</Button>
          <Button type="primary">禁用</Button>
          <Button type="primary">显示图像</Button>
        </div>
        <Table 
        rowSelection={rowSelection}  
        columns={columns} 
        dataSource={data} 
        size="middle"
        pagination={false}/>
      
    </div>
    )
  }
}

export default SettingVideoChannelDetail