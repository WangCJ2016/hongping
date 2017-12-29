import React from 'react'
import { Icon, Modal, Input,  Popconfirm, Form, Select } from 'antd'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { hostLists, sysServerslist, createHost, modifyHost,setSelect,channels } from '../../redux/setting.remoteHost.redux'
import SettingVideoChannelDetail from '../setting-video-channelDetail/setting-video-channelDetail'
const FormItem = Form.Item
const Option = Select.Option;

@connect(
  state => state.remoteHost,
  {hostLists, sysServerslist,createHost,modifyHost,channels,setSelect}
)
class SettingRemoteHosts1 extends React.Component {
  state = { 
    createVisible: false,
    editVisible: false,
    selectIndex: 0
   }
   componentDidMount() {
     this.props.hostLists()
   }
   hostRender() {
     const hosts = this.props.remoteHosts
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
      this.props.channels({remoteHostId:id})
      this.props.setSelect({id:id})
     })
   }
   sysServersRender() {
    const servers = this.props.sysServers
    return (
      <Select>
        {servers.map(server => (
          <Option value={server.id} key={server.id}>{server.name}</Option>
        ))}
      </Select>
    )
   }
   delete(id) {
    this.props.modifyHost({id:id,isDelete:1})
   }
   createSubmit() {
     this.props.form.validateFields(['type','name','connectMode','url','port','productor','model','username','psw','channels','mediaServer1Id','mediaServer2Id','mediaServer3Id','remark'],(err, values) => {
        if(!err) {
          console.log(values)
          values.remark = encodeURI(values.remark)
          values.name = encodeURI(values.name)
          this.props.createHost(values)
          this.setState({createVisible:false})
        }
     })
   }
   editSubmit() {
    this.props.form.validateFields(['edittype','editname','editconnectMode','editurl','editport','editproductor','editmodel','editusername','editpsw','editchannels','editmediaServer1Id','editmediaServer2Id','editmediaServer3Id','editremark'],(err, values) => {
      if(!err) {
        console.log(values)
        const info = {
          id: this.props.remoteHosts[this.state.selectIndex].id,
          'type': values.edittype,
          'name': encodeURI(values.editname),
          'connectMode':values.editconnectMode,
          'url':values.editurl,
          'port':values.editport,
          'productor':values.editproductor,
          'model':values.editmodel,
          'username':values.editusername,
          'psw':values.editpsw,
          'channels':values.editchannels,
          'mediaServer1Id':values.editmediaServer1Id,
          'mediaServer2Id':values.editmediaServer2Id,
          'mediaServer3Id':values.editmediaServer3Id,
          'remark':encodeURI(values.editremark)
        }
        this.props.modifyHost(info)
        this.setState({editVisible:false})
      }
   })
   }
  render() {
    
    const selectHost = this.props.remoteHosts[this.state.selectIndex]
    const { getFieldDecorator } = this.props.form
    return (
      <div>
        <div className="setting-user-role setting-video-device  float-left">
           <div className="title role">视频主机<div className='abosulte' onClick={()=>{this.setState({createVisible:true});this.props.sysServerslist()}}><Icon type='plus'/></div></div>
            {this.props.remoteHosts?this.hostRender():null}
            {/* 添加设备 */}
            <Modal title="添加视频主机" 
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
                <FormItem label="设备类型">
                  {getFieldDecorator('type',{
                    rules: [{ required: true,message: '请填写主机类型'  }],
                    initialValue: '1'
                  })(
                    <Select  >
                      <Option value="1">DVR</Option>
                      <Option value="2">DVS</Option>
                    </Select>)}
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
                <FormItem label="型号">
                  {getFieldDecorator('model',{
                    initialValue: '1'
                  })(
                    <Select  >
                      <Option value="1">HikHC-14</Option>
                      <Option value="2">DHNET-03</Option>
                    </Select>)}
                  
                </FormItem>
                <FormItem label="连接模式">
                  {getFieldDecorator('connectMode',{
                    initialValue: '0'
                  })(
                    <Select  >
                      <Option value="0">直连</Option>
                      <Option value="1">流媒体转发</Option>
                    </Select>
                  )}
                </FormItem>
                <FormItem label="IP(域名)">
                  {getFieldDecorator('url',{
                    rules: [{ required: true,message: '请填写主机IP(域名)'  }],
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
                  })(<Input type="password" />)}
                </FormItem>
                <FormItem label="通道数量">
                  {getFieldDecorator('channels',{
                    rules: [{ required: true,message: '请填写通道数量'  }],
                  })(<Input type="number" />)}
                </FormItem>
                <FormItem label="服务器1">
                  {getFieldDecorator('mediaServer1Id',{
                    rules: [{ required: true,message: '请填写流媒体服务器1'  }],
                  })(
                    this.sysServersRender()
                  )}
                </FormItem>
                <FormItem label="服务器2">
                  {getFieldDecorator('mediaServer2Id',{
                  })(this.sysServersRender())}
                </FormItem>
                <FormItem label="服务器3">
                  {getFieldDecorator('mediaServer3Id',{
                  })(this.sysServersRender())}
                </FormItem>
                <FormItem label="备注">
                {getFieldDecorator('remark',{
                  initialValue:''
                })(<Input type='text'/>)}
              </FormItem>
              </Form>
            </Modal>
            {/* 修改设备 */}
            <Modal title="编辑视频主机" 
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
                <FormItem label="设备类型">
                  {getFieldDecorator('edittype',{
                    rules: [{ required: true,message: '请填写主机类型'  }],
                    initialValue: selectHost?selectHost.type:'',
                  })(
                    <Select  >
                      <Option value={1}>DVR</Option>
                      <Option value={2}>DVS</Option>
                    </Select>)}
                </FormItem>
                <FormItem label="厂商">
                  {getFieldDecorator('editproductor',{
                    initialValue: selectHost?selectHost.productor:'',
                  })(
                    <Select  >
                      <Option value={0}>海康</Option>
                      <Option value={1}>大华</Option>
                    </Select>)}
                  
                </FormItem>
                <FormItem label="型号">
                  {getFieldDecorator('editmodel',{
                    initialValue: selectHost?selectHost.model:'',
                  })(
                    <Select  >
                      <Option value={1}>HikHC-14</Option>
                      <Option value={2}>DHNET-03</Option>
                    </Select>)}
                  
                </FormItem>
                <FormItem label="连接模式">
                  {getFieldDecorator('editconnectMode',{
                    initialValue: selectHost?selectHost.connectMode:'',
                  })(
                    <Select  >
                      <Option value={0}>直连</Option>
                      <Option value={1}>流媒体转发</Option>
                    </Select>
                  )}
                </FormItem>
                <FormItem label="IP(域名)">
                  {getFieldDecorator('editurl',{
                    rules: [{ required: true,message: '请填写主机IP(域名)'  }],
                    initialValue: selectHost?selectHost.url:'',
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
                  })(<Input type="password" />)}
                </FormItem>
                <FormItem label="通道数量">
                  {getFieldDecorator('editchannels',{
                    rules: [{ required: true,message: '请填写通道数量'  }],
                    initialValue: selectHost?selectHost.channels:'',
                  })(<Input type="number" />)}
                </FormItem>
                <FormItem label="服务器1">
                  {getFieldDecorator('editmediaServer1Id',{
                    rules: [{ required: true,message: '请填写流媒体服务器1'  }],
                    initialValue: selectHost?selectHost.mediaServer1Id:'',
                  })(
                    this.sysServersRender()
                  )}
                </FormItem>
                <FormItem label="服务器2">
                  {getFieldDecorator('editmediaServer2Id',{
                    initialValue: selectHost?selectHost.mediaServer2Id:'',
                  })(this.sysServersRender())}
                </FormItem>
                <FormItem label="服务器3">
                  {getFieldDecorator('editmediaServer3Id',{
                    initialValue: selectHost?selectHost.mediaServer3Id:'',
                  })(this.sysServersRender())}
                </FormItem>
                <FormItem label="备注">
                {getFieldDecorator('editremark',{
                  initialValue: selectHost?selectHost.remark:'',
                })(<Input type='text'/>)}
              </FormItem>
              </Form>
            </Modal>
        </div>
        <SettingVideoChannelDetail />
      </div>
    )
  }
}
const SettingRemoteHosts = Form.create()(SettingRemoteHosts1);
export default SettingRemoteHosts