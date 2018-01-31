import React from 'react'
import { Icon, Table,  Popconfirm, Form, Select, Input, Modal,Button } from 'antd'
import { connect } from 'react-redux'
import { serverlist, modifyServer, createServer} from '../../redux/setting-server.redux'

const FormItem = Form.Item
const Option = Select.Option;

@connect(
  state => state.settingServer,
  {serverlist,modifyServer,createServer}
) 
class SettingVideoServer1 extends React.Component {
  state = { 
    editVisible: false,
    createVisible: false,
    selectServer: {}
   }
   componentDidMount() {
     this.props.serverlist()
   }
  edit(text,record) {
    const server = this.props.serverList.filter(server => server.id === record.id)
    this.setState({selectServer: server,editVisible: true})
  }
  editSubmit() {
    this.props.form.validateFields(['innerIp','maxConn','name','outerIp','port','remark','timeout','type'],(err,values)=>{
      if(!err) {
        values.name = encodeURI(values.name)
        values.remark = encodeURI(values.remark)
        this.props.modifyServer({...values,id:this.state.selectServer[0].id})
        this.setState({
          editVisible:false
        })
      }
    })
  }
  delete(server) {
    this.props.modifyServer({id:server.id,isDelete:1})
  }
  // 新增
  createSubmit() {
    this.props.form.validateFields(['createInnerIp','createMaxConn','createName','createOuterIp','createPort','createRemark','createTimeout','createType'],(err,values)=>{
      console.log(err,values)
      if(!err) {
        this.props.createServer({
          name:encodeURI(values.createName),
          innerIp:values.createInnerIp,
          outerIp:values.createOuterIp,
          port:values.createPort,
          maxConn:values.createMaxConn,
          type:values.createType,
          timeout:values.createTimeout,
          remark:encodeURI(values.createRemark),
        })
        this.setState({
          createVisible:false
        })
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const selectServer = this.state.selectServer[0]
    const colums = [{
      title: '名字',
      dataIndex: 'name',
      width: '70%',
      key: 'name',
    },{
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span className='video-action'>
        <a  style={{marginLeft:'0'}} onClick={this.edit.bind(this,text,record)}>
          <Icon type='edit'/>
          <span className='action'>编辑</span>
        </a> 
        <a >
          <Popconfirm onConfirm={this.delete.bind(this,record)} title="确定删除？"  okText="确定" cancelText="取消">
            <Icon type='delete'/><span className='action'>删除</span>  
          </Popconfirm>
        </a>
        </span>
      ),
    }
  ]
    return (
      <div>
      <div className='clearfix'>
        <Button type='primary' className='float-right' onClick={()=>this.setState({createVisible:true})}>新增服务器</Button>
      </div>
      {
        this.props.serverList?
        <Table 
         columns={colums} 
         pagination={false}
         size='middle'
         dataSource={this.props.serverList} />
        :null
      }
      <Modal title="编辑服务器" 
        visible={this.state.editVisible}
        style={{ top: 200 }}
        width='50%'
        okText='确定'
        cancelText='取消'
        onOk={this.editSubmit.bind(this)}
        onCancel={()=>this.setState({editVisible:false})}
        >
        <Form layout='inline'>
          
          <FormItem label="名称">
            {getFieldDecorator('name',{
              rules: [{ required: true,message: '请填写服务器名字'  }],
              initialValue: selectServer?selectServer.name:''
            })(<Input type="text" />)}
          </FormItem>
          <FormItem label="内网IP">
            {getFieldDecorator('innerIp',{
              rules: [{ required: true,message: '请填写内网IP'  }],
              initialValue: selectServer?selectServer.innerIp:''
            })(<Input type="text" />)}
          </FormItem>
          <FormItem label="外网IP">
            {getFieldDecorator('outerIp',{
              rules: [{ required: true,message: '请填写外网IP'  }],
              initialValue: selectServer?selectServer.outerIp:''
            })(<Input type="text" />)}
          </FormItem>
          <FormItem label="端口">
            {getFieldDecorator('port',{
              initialValue: selectServer?selectServer.port:'',
              rules: [{ required: true,message: '请填写端口'  }],
            })(<Input type="text" />)}
          </FormItem>
          <FormItem label="最大连接数">
            {getFieldDecorator('maxConn',{
              rules: [{ required: true,message: '请填写最大连接数'  }],
              initialValue: selectServer?selectServer.maxConn:''
            })(<Input type="text" />)}
          </FormItem>
          <FormItem label="类型">
            {getFieldDecorator('type',{
              rules: [{ required: true,message: '请填写类型'  }],
              initialValue: selectServer?selectServer.type:1
            })(
              <Select>
                <Option value={1}>流媒体服务器</Option>
                <Option value={2}>点播服务器</Option>
                <Option value={3} >报警服务器</Option>
                <Option value={4}>设备控制服务器</Option>
                <Option value={5}>数字矩阵服务器</Option>
                <Option value={6} >红外服务器</Option>
                <Option value={7}>辅助设备服务</Option>
              </Select>
            )}
          </FormItem>
          <FormItem label="超时时间">
            {getFieldDecorator('timeout',{
              rules: [{ required: true,message: '请填写超时时间'  }],
              initialValue: selectServer?selectServer.timeout:''
            })(<Input type="number" />)}
          </FormItem>
          <FormItem label="备注">
            {getFieldDecorator('remark',{
              initialValue: selectServer?selectServer.remark:''
            })(<Input type="text" />)}
          </FormItem>
       </Form>
      </Modal>
      <Modal title="新增服务器" 
        visible={this.state.createVisible}
        style={{ top: 200 }}
        width='50%'
        okText='确定'
        cancelText='取消'
        onOk={this.createSubmit.bind(this)}
        onCancel={()=>this.setState({createVisible:false})}
        >
        <Form layout='inline'>     
          <FormItem label="名称">
            {getFieldDecorator('createName',{
              rules: [{ required: true,message: '请填写服务器名字'  }],
            })(<Input type="text" />)}
          </FormItem>
          <FormItem label="内网IP">
            {getFieldDecorator('createInnerIp',{
              rules: [{ required: true,message: '请填写内网IP'  }],
            })(<Input type="text" />)}
          </FormItem>
          <FormItem label="外网IP">
            {getFieldDecorator('createOuterIp',{
              rules: [{ required: true,message: '请填写外网IP'  }],
            })(<Input type="text" />)}
          </FormItem>
          <FormItem label="端口">
            {getFieldDecorator('createPort',{
              rules: [{ required: true,message: '请填写端口'  }],
            })(<Input type="text" />)}
          </FormItem>
          <FormItem label="最大连接数">
            {getFieldDecorator('createMaxConn',{
              rules: [{ required: true,message: '请填写最大连接数' }],
            })(<Input type="text" />)}
          </FormItem>
          <FormItem label="类型">
            {getFieldDecorator('createType',{
              rules: [{ required: true,message: '请填写类型'  }],
              initialValue: 1
            })(
              <Select>
                <Option value={1}>流媒体服务器</Option>
                <Option value={2}>点播服务器</Option>
                <Option value={3} >报警服务器</Option>
                <Option value={4}>设备控制服务器</Option>
                <Option value={5}>数字矩阵服务器</Option>
                <Option value={6} >红外服务器</Option>
                <Option value={7}>辅助设备服务</Option>
              </Select>
            )}
          </FormItem>
          <FormItem label="超时时间">
            {getFieldDecorator('createTimeout',{
              rules: [{ required: true,message: '请填写超时时间'  }],
            })(<Input type="number" />)}
          </FormItem>
          <FormItem label="备注">
            {getFieldDecorator('createRemark',{
            })(<Input type="text" />)}
          </FormItem>
       </Form>
      </Modal>
      </div>
    )
  }
}
const SettingVideoServer = Form.create()(SettingVideoServer1);
export default SettingVideoServer