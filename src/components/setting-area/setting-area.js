import React from 'react'
import { Table, Icon } from 'antd';

class SettingArea extends React.Component {
  state = {  }
  render() {
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
    };
    const columns = [{
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: '60%',
      }, {
        title: 'action',
        dataIndex: 'action',
        width: '40%',
        render:()=> (
          <span className='action'>
            <a href="#"><Icon type='edit'/>编辑</a>
            <a href="#"><Icon type='delete'/>删除</a>
            <a href="#"><Icon type="plus-circle-o" />添加下级</a>
          </span>
        )
      }]; 
      const data = [{
        key: 1,
        name: 'xxx区域',
        children: [{
          key: 11,
          name: '洞室',
          children: [{
            key: 111,
            name: '洞室1',
          }],
        }, {
          key: 12,
          name: '水库',
          children: [{
            key: 121,
            name: '水库1',
          }],
        }], 
          
      }];   
    return (
      <div className='setting-area'>
      <Table 
       columns={columns}
       rowSelection={rowSelection}
       showHeader={false}
       pagination={false}
       dataSource={data} />
      </div>
    )
  }
}

export default SettingArea