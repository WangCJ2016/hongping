import React from 'react'
import { Icon, Modal, Input,  Popconfirm, Form, Select } from 'antd'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { hostLists, sysServerslist, createHost, modifyHost,setSelect,channels } from '../../redux/setting.broadcast.redux'
import SettingVideoBroadcastChannelDetail from './setting-video-broadcastChannel'
const FormItem = Form.Item
const Option = Select.Option;
const Ipreg = /^(([3-9]d?|[01]d{0,2}|2d?|2[0-4]d|25[0-5]).){3}([3-9]d?|[01]d{0,2}|2d?|2[0-4]d|25[0-5])/
@connect(
  state => state.broadcastHost,
  {hostLists, sysServerslist,createHost,modifyHost,channels,setSelect}
)
class SettingVideoBroadcast1 extends React.Component {
  state = { 
    createVisible: false,
    editVisible: false,
    selectIndex: 0
   }
   componentDidMount() {
     this.props.hostLists()
   }
   hostRender() {
     const hosts = this.props.broadcastHosts
     return hosts.map((host,index) => {
      const style = classnames({
        role: true,
        role_selected: this.state.selectIndex === index
      })
       return (
        <div className={style} key={host.id} onClick={this.changeHost.bind(this,index,host.id)}>
          {host.name}
          <div className='abosulte'>
            <a><Icon type='edit' onClick={()=>this.setState({editVisible: true,selectIndex:index})}/></a>
            <a>
              <Popconfirm title="确定删除？" onConfirm={this.delete.bind(this,host.id)}  okText="确定" cancelText="取消">
              <Icon type='delete'/>
              </Popconfirm>
            </a>
          </div>
      </div>
       )
     })
   }
   changeHost(index,id) {
     this.setState({selectIndex:index},function() {
      this.props.channels({hostId:id})
      this.props.setSelect({id:id})
     })
   }
 
   delete(id) {
    this.props.modifyHost({id:id,isDelete:1})
   }
   createSubmit() {
     this.props.form.validateFields(['name','port','ip','productor','username','psw','remark'],(err, values) => {
        if(!err) {
          values.remark = encodeURI(values.remark)
          values.name = encodeURI(values.name)
          this.props.createHost(values)
          this.setState({createVisible:false})
        }
     })
   }
   editSubmit() {
    this.props.form.validateFields(['editname','editport','editip','editproductor','editusername','editpsw','editremark'],(err, values) => {
      if(!err) {
        const info = {
           id: this.props.broadcastHosts[this.state.selectIndex].id,
          'name': encodeURI(values.editname),
          'ip':values.editip,
          'port':values.editport,
          'productor':values.editproductor,
          'username':values.editusername,
          'psw':values.editpsw,
          'remark':encodeURI(values.editremark)
        }
        this.props.modifyHost(info)
        this.setState({editVisible:false})
      }
   })
   }
  render() {
    
    const selectHost = this.props.broadcastHosts[this.state.selectIndex]
    const { getFieldDecorator } = this.props.form
    return (
      <div>
        <div className="setting-user-role setting-video-device  float-left">
           <div className="title role">广播主机<div className='abosulte' onClick={()=>this.setState({createVisible:true})}><Icon type='plus'/></div></div>
            {this.props.broadcastHosts?this.hostRender():null}
            {/* 添加设备 */}
            <Modal title="添加主机" 
              visible={this.state.createVisible}
              style={{ top: 200 }}
              width='50%'
              okText='确定'
              cancelText='取消'
              onOk={this.createSubmit.bind(this)}
              onCancel={()=>this.setState({createVisible:false})}
              >
              <Form layout='inline'>
                <FormItem label="主机名称">
                  {getFieldDecorator('name',{
                    rules: [{ required: true,message: '请填写主机名称'  }],
                  })(<Input type="text" />)}
                </FormItem>
                <FormItem label="厂商">
                  {getFieldDecorator('productor',{
                    initialValue: '0'
                  })(
                    <Select  >
                      <Option value="0">海康</Option>
                      <Option value="1">大华</Option>
                    </Select>)}
                  
                </FormItem>
                <FormItem label="IP(域名)">
                  {getFieldDecorator('ip',{
                    rules: [{ required: true,message: '请填写主机IP(域名)'},{pattern:Ipreg,message: '请填写正确的ip'}],
                  })(<Input type="text" />)}
                </FormItem>
                <FormItem label="端口">
                  {getFieldDecorator('port',{
                    rules: [{ required: true,message: '请填写主机端口'  }],
                  })(<Input type="number" />)}
                </FormItem>
                <FormItem label="账号">
                  {getFieldDecorator('username',{
                    rules: [{ required: true,message: '请填写账号'  }],
                  })(<Input type="text" />)}
                </FormItem>
                <FormItem label="密码">
                  {getFieldDecorator('psw',{
                    rules: [{ required: true,message: '请填写密码'  }],
                  })(<Input type="text" />)}
                </FormItem>
                <FormItem label="备注">
                {getFieldDecorator('remark',{
                  initialValue:''
                })(<Input type='text'/>)}
              </FormItem>
              </Form>
            </Modal>
            {/* 修改设备 */}
            <Modal title="编辑主机" 
              visible={this.state.editVisible}
              style={{ top: 200 }}
              width='50%'
              okText='确定'
              cancelText='取消'
              onOk={this.editSubmit.bind(this)}
              onCancel={()=>this.setState({editVisible:false})}
              >
              <Form layout='inline'>
                <FormItem label="主机名称">
                  {getFieldDecorator('editname',{
                    rules: [{ required: true,message: '请填写主机名称'  }],
                    initialValue: selectHost?selectHost.name:'',
                  })(<Input type="text" />)}
                </FormItem>
                <FormItem label="厂商">
                  {getFieldDecorator('editproductor',{
                    initialValue: selectHost?selectHost.productor:'',
                  })(
                    <Select  >
                      <Option value="0">海康</Option>
                      <Option value="1">大华</Option>
                    </Select>)}
                  
                </FormItem>
                <FormItem label="IP(域名)">
                  {getFieldDecorator('editip',{
                    rules: [{ required: true,message: '请填写主机IP(域名)'  },{pattern:Ipreg,message: '请填写正确的ip'}],
                    initialValue: selectHost?selectHost.ip:'',
                  })(<Input type="text" />)}
                </FormItem>
                <FormItem label="端口">
                  {getFieldDecorator('editport',{
                    rules: [{ required: true,message: '请填写主机端口'  }],
                    initialValue: selectHost?selectHost.port:'',
                  })(<Input type="number" />)}
                </FormItem>
                <FormItem label="账号">
                  {getFieldDecorator('editusername',{
                    rules: [{ required: true,message: '请填写账号'  }],
                    initialValue: selectHost?selectHost.username:'',
                  })(<Input type="text" />)}
                </FormItem>
                <FormItem label="密码">
                  {getFieldDecorator('editpsw',{
                    rules: [{ required: true,message: '请填写密码'  }],
                    initialValue: selectHost?selectHost.psw:'',
                  })(<Input type="text" />)}
                </FormItem>
                <FormItem label="备注">
                {getFieldDecorator('editremark',{
                  initialValue: selectHost?selectHost.remark:'',
                })(<Input type='text'/>)}
              </FormItem>
              </Form>
            </Modal>
        </div>
        <SettingVideoBroadcastChannelDetail />
      </div>
    )
  }
}
const SettingVideoBroadcast = Form.create()(SettingVideoBroadcast1);
export default SettingVideoBroadcast