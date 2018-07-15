import React from 'react'
import { Table } from 'antd'
import './index.scss'
import { alarmDegree, alarmType } from '../../../../utils'


export function WarnBoard(props) {
    const columns = [
        {
            title: '类型',
            dataIndex: 'type',
            width:100,
            key:'type',
            render:(text,record)=>{
              return <span>{alarmType(record.type)}</span>
            }
          },
          {
            title: '时间',
            width:100,
            dataIndex: 'time',
            key:'time'
          },
          {
            title: '等级',
            dataIndex: 'degree',
            width:100,
            key:'degree',
            render:(text,record)=>{
              return <span>{alarmDegree(record.degree).degree}</span>
            }
          }
    ]
    const data = props.data.slice(0, 5)
    
    return (
        <div className='board-wrap'>
          <p className='title'>报警总数: &nbsp;&nbsp;{props.total}&nbsp;&nbsp;条</p>
          <p className='title'>报警总数: &nbsp;&nbsp;{props.undo}&nbsp;&nbsp;条</p>
          <div className="content">
          <Table 
            showHeader={false}
            bordered={false}
            pagination={false}
            size='small'
            rowKey={record=>record.id}
            columns={columns}
            dataSource={props.data}
          />
          </div>
        </div>
    )
}

export function PeoBoard(props) {
    const columns = [
         {
            title: '人员',
            dataIndex: 'person',
            width:100,
            key:'person'
          },
          {
            title: '方式',
            width:100,
            render: (text, record) => {
                return record.lastReportTime ? '出洞' : '进洞'
            }
          },
          {
            title: '区域',
            dataIndex: 'region',
            width:100,
            key:'region'
          },
          {
            title: '时间',
            width: 100,
            render: (record) => (
                <span>{
                    record.lastReportTime ? record.lastReportTime : record.firstReportTime 
                }</span> 
            )
          }
        ]
        const data = props.data.slice(0, 5) 
    return (
        <div className='board-wrap'>
          <p className='title'>报警总数: &nbsp;&nbsp;{props.total}&nbsp;&nbsp;条</p>
          <p className='title'>报警总数: &nbsp;&nbsp;25&nbsp;&nbsp;条</p>
          <div className="content">
          <Table 
            showHeader={false}
            bordered={false}
            pagination={false}
            rowKey={record=>record.peopleIdEx}
            size='small'
            columns={columns}
            dataSource={props.data}
           />
          </div>
        </div>
    )
}
 

export function CarBoard({data=[]}) {
    const columns = [
        {
            title: '类型',
            dataIndex: 'type',
            width:100,
            key:'type',
            render:(text,record)=>{
              return <span>{alarmType(record.type)}</span>
            }
          },
          {
            title: '时间',
            width:100,
            dataIndex: 'time',
            key:'time'
          },
          {
            title: '等级',
            dataIndex: 'degree',
            width:100,
            key:'degree',
            render:(text,record)=>{
              return <span>{alarmDegree(record.degree).degree}</span>
            }
          }
    ]
    const data1 = data.slice(0, 5)
    
    return (
        <div className='board-wrap'>
          <p className='title'>当前进洞车数: &nbsp;&nbsp;25&nbsp;&nbsp;条</p>
          <p className='title'>当前出洞车数: &nbsp;&nbsp;25&nbsp;&nbsp;条</p>
          <p className='title'>  洞内总车数: &nbsp;&nbsp;25&nbsp;&nbsp;条</p>
          <div className="content">
          <Table 
            showHeader={false}
            bordered={false}
            pagination={false}
            size='small'
            rowKey={record=>record.id}
            columns={columns}
            dataSource={data1}
          />
          </div>
        </div>
    )
}

function peoInOrOut(data) {
   return data.lastReportTime ? data.lastReportTime : data.firstReportTime
}