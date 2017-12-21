import React from 'react'
import { Icon, Modal, Input,  Popconfirm, Form, Select } from 'antd'
import SettingVideoChannelDetail from '../setting-video-channelDetail/setting-video-channelDetail'
const FormItem = Form.Item
const Option = Select.Option;

class SettingVideoDevice1 extends React.Component {
  state = { 
    createDeviceVisible: false,
   }
   createDeviceSubmit() {}
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div>
        <div className="setting-user-role setting-video-device  float-left">
           <div className="title role">NVR/IPC<div className='abosulte' onClick={()=>this.setState({createDeviceVisible:true})}><Icon type='plus'/></div></div>
            <div className="role">
              NVR/IPC
              <div className='abosulte'>
                <Icon type='edit' />
                <Icon type='setting' onClick={()=>this.setState({roleSetVisible: true})}/>
                <Popconfirm title="确定删除？"  okText="确定" cancelText="取消">
                <Icon type='delete'/>
                </Popconfirm>
              </div>
              <img className='icon_start' src={require('../../assets/imgs/nvr.png')} alt=""/>
            </div>
            <div className="role">
              IPC
              <div className='abosulte'>
                <Icon type='edit'/>
                <Icon type='setting'/>
                <Icon type='delete'/>
              </div>
              <img className='icon_start' src={require('../../assets/imgs/IPC.png')} alt=""/>
            </div>
            {/* 添加设备 */}
            <Modal title="添加设备" 
              visible={this.state.createDeviceVisible}
              style={{ top: 200 }}
              width='50%'
              okText='确定'
              cancelText='取消'
              wrapClassName='peopleEditModal'
              onOk={this.createDeviceSubmit.bind(this)}
              onCancel={()=>this.setState({createDeviceVisible:false})}
              >
              <Form layout='inline'>
                <FormItem label="主机名">
                  {getFieldDecorator('name', {
                  })(
                    <Input type='text' placeholder='请填写主机名'/>
                  )}
                </FormItem>
                <FormItem label="设备类型">
                  {getFieldDecorator('type',{
                    
                  })(
                    <Select  >
                      <Option value="1">DVR</Option>
                      <Option value="2">DVS</Option>
                    </Select>)}
                </FormItem>
                <FormItem label="厂商">
                  {getFieldDecorator('brand',{
                  })(
                    <Select  >
                      <Option value="0">海康</Option>
                      <Option value="1">大华</Option>
                    </Select>)}
                  
                </FormItem>
                <FormItem label="型号">
                  {getFieldDecorator('model',{
                  })(
                    <Select  >
                      <Option value="1">HikHC-14</Option>
                      <Option value="2">DHNET-03</Option>
                    </Select>)}
                  
                </FormItem>
                <FormItem label="连接模式">
                  {getFieldDecorator('connectMode',{
                  })(
                    <Select  >
                      <Option value="0">直连</Option>
                      <Option value="1">流媒体转发</Option>
                    </Select>
                  )}
                </FormItem>
                <FormItem label="IP(域名)">
                  {getFieldDecorator('ip',{
                    
                  })(<Input type="text" />)}
                </FormItem>
                <FormItem label="登录账号">
                  {getFieldDecorator('username',{
                  })(<Input type="text" />)}
                </FormItem>
                <FormItem label="登录密码">
                  {getFieldDecorator('password',{
                  })(<Input type="password" />)}
                </FormItem>
                <FormItem label="通道数量">
                  {getFieldDecorator('channels',{
                  })(<Input type="number" />)}
                </FormItem>
                <FormItem label="流媒体服务器">
                  {getFieldDecorator('mediaServerId',{
                  })(<Input type="text" />)}
                </FormItem>
                <FormItem label="备注">
                {getFieldDecorator('remark',{
                })(<textarea rows={2}  ></textarea>)}
              </FormItem>
              </Form>
            </Modal>
        </div>
        <SettingVideoChannelDetail />
      </div>
    )
  }
}
const SettingVideoDevice = Form.create()(SettingVideoDevice1);
export default SettingVideoDevice