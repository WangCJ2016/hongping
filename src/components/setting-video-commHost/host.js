import React from 'react'
import { Icon, Collapse, Popconfirm, Modal, Form, Input, Select } from 'antd'
import { connect } from 'react-redux'
import { hostLists, createHost, modifyHost,selectHost,deviceLists,createDevice } from '../../redux/setting.commHost.redux'
import Device from './device'
const Panel = Collapse.Panel;
const FormItem = Form.Item;
const Option = Select.Option;

@connect(
  state => state.commHost,
  {hostLists, createHost, modifyHost, selectHost,deviceLists, createDevice}
)
class Hosts1 extends React.Component {
  state = { 
    createVisible: false,
    selectIndex: 0,
    editVisible: false,
    createDeviceVisible: false
  }
  componentDidMount() {
    this.props.hostLists()
  }
  changeHandle(key) {
    if(key) {
      this.props.deviceLists({hostId: key})
    }
  }
  hostRender() {
    const hosts = this.props.commHosts
    return (
      <Collapse bordered={false} 
       accordion
       defaultActiveKey={['1']}
       onChange={this.changeHandle.bind(this)} >
      { hosts.map((host,index) => (
        <Panel header={host.name} key={host.id}>
          <Device hostId={host.id} />
          <div className='abosulte1' >
              <Icon type='plus' onClick={()=>this.setState({selectIndex:index,createDeviceVisible:true})}/>
              <Icon type='edit' onClick={()=>this.setState({selectIndex:index,editVisible:true})} />
              <Popconfirm  title="确定删除？" onConfirm={this.delete.bind(this,host.id)}  okText="确定" cancelText="取消">
               <Icon type='delete'/>
              </Popconfirm>
            </div>
        </Panel>
    ))}
      </Collapse>
    )
  }
  delete(id) {
    this.props.modifyHost({id:id,isDelete:1})
  }
  createSubmit() {
    this.props.form.validateFields([
      'name',
      'devType',
      'type',
      'protocol',
      'ip',
      'port',
      'comIndex',
      'baudrate',
      'databit',
      'parity',
      'stopbit'
      ],(err, values) => {
      if(!err) {
        this.props.createHost(values)
        this.setState({createVisible:false})
        this.props.form.resetFields()
      }
    })
  }
  editSubmit() {
    this.props.form.validateFields([
      'editname',
      'editdevType',
      'edittype',
      'editprotocol',
      'editip',
      'editport',
      'editcomIndex',
      'editbaudrate',
      'editdatabit',
      'editparity',
      'editstopbit'
      ],(err, values) => {
      if(!err) {
        const info = {
           id: this.props.commHosts[this.state.selectIndex].id,
          'name':values.editname,
          'devType':values.editdevType,
          'type':values.edittype,
          'protocol':values.editprotocol,
          'ip':values.editip,
          'port':values.editport,
          'comIndex':values.editcomIndex,
          'baudrate':values.editbaudrate,
          'databit':values.editdatabit,
          'parity':values.editparity,
          'stopbit':values.editstopbit
        }
        this.props.modifyHost(info)
        this.setState({editVisible:false})
        this.props.form.resetFields()
      }
    })

  }
  // 添加设备
  createDeviceSubmit() {
    this.props.form.validateFields(['createname','areaCode','hostId'],(err, values)=>{
      if(!err) {
        this.props.createDevice({...values,hostId:this.props.commHosts[this.state.selectIndex].id,name:encodeURI(values.createname)})
        this.setState({createDeviceVisible:false})
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const selectHost = this.props.commHosts[this.state.selectIndex]
    return (
        <div className="setting-user-role setting-video-device  float-left" style={{width:'60%'}}>
          <div className="title role">通信主机<div className='abosulte' onClick={()=>this.setState({createVisible:true})}><Icon type='plus'/></div></div>
          {this.hostRender()}
          {/* 添加设备 */}
          <Modal title="添加通信主机" 
            visible={this.state.createVisible}
            style={{ top: 200 }}
            width='50%'
            okText='确定'
            cancelText='取消'
            onOk={this.createSubmit.bind(this)}
            onCancel={()=>{this.setState({createVisible:false});this.props.form.resetFields()}}
            >
            <Form layout='inline'>
              <FormItem label="主机名称">
                {getFieldDecorator('name',{
                  rules: [{ required: true,message: '请填写主机名称(由数字、26个英文字母或者下划线组成)',pattern:/^\w+$/  }], 
                })(<Input type="text" />)}
              </FormItem>
              <FormItem label="ip">
                {getFieldDecorator('ip',{
                  rules: [{ required: true,message: '请填写ip'}],
                })(<Input type="text" />)}
              </FormItem>
              <FormItem label="端口">
                {getFieldDecorator('port',{
                  rules: [{ required: true,message: '请填写端口'  }],
                })(<Input type="number" />)}
              </FormItem>
              <FormItem label="COM序号">
                {getFieldDecorator('comIndex',{
                  rules: [{ required: true,message: '请填写COM序号',maxLength:5  }],
                })(<Input type="number" />)}
              </FormItem>
              <FormItem label="设备类型">
                {getFieldDecorator('devType',{
                  rules: [{ required: true,message: '请填写区号'  }],
                  initialValue: '1'
                })(
                  <Select  >
                    <Option value="1">门禁</Option>
                    <Option value="2">道闸</Option>
                    <Option value="3">消防</Option>
                </Select>
              )}
              </FormItem>
              <FormItem label="类型">
                {getFieldDecorator('type',{
                  rules: [{ required: true,message: '请填写类型'  }],
                  initialValue: '1'
                })(
                  <Select  >
                    <Option value="1">COM232</Option>
                    <Option value="2">TCP</Option>
                    <Option value="3">UDP</Option>
                    <Option value="4">COM485</Option>
                </Select>
              )}
              </FormItem>
              <FormItem label="协议">
                {getFieldDecorator('protocol',{
                  rules: [{ required: true,message: '请填写协议'  }],
                  initialValue: 'AccessControl'
                })(
                  <Select>
                    <Option value="AccessControl">门禁</Option>
                    <Option value="HK-RoadGate">道闸</Option>
                    <Option value="FireControl">消防</Option>
                 </Select>
              )}
              </FormItem>
              <FormItem label="波特率">
                {getFieldDecorator('baudrate',{
                  rules: [{ required: true,message: '请填写波特率'  }],
                  initialValue: '300'
                })(
                  <Select>
                    <Option value="300">300</Option>
                    <Option value="600">600</Option>
                    <Option value="1200">1200</Option>
                    <Option value="2400">2400</Option>
                    <Option value="4800">4800</Option>
                    <Option value="9600">9600</Option>
                    <Option value="19200">19200</Option>
                    <Option value="38400">38400</Option>
                    <Option value="43000">43000</Option>
                    <Option value="56000">56000</Option>
                    <Option value="115200">115200</Option>
                 </Select>
              )}
              </FormItem>
              <FormItem label="数据位">
                {getFieldDecorator('databit',{
                  rules: [{ required: true,message: '请填写数据位'  }],
                  initialValue: '6'
                })(
                  <Select>
                    <Option value="6">6</Option>
                    <Option value="7">7</Option>
                    <Option value="8">8</Option>
                 </Select>
              )}
              </FormItem>
              <FormItem label="检验位">
                {getFieldDecorator('parity',{
                  rules: [{ required: true,message: '请填写检验位'  }],
                  initialValue: '0'
                })(
                  <Select>
                    <Option value="0">无</Option>
                    <Option value="1">奇校验</Option>
                    <Option value="2">偶校验</Option>
                 </Select>
              )}
              </FormItem>
              <FormItem label="停止位">
                {getFieldDecorator('stopbit',{
                  rules: [{ required: true,message: '请填写停止位'  }],
                  initialValue: '1'
                })(
                  <Select>
                    <Option value="1">1</Option>
                    <Option value="2">2</Option>
                 </Select>
              )}
              </FormItem>

           </Form>        
          </Modal>
           {/* 编辑设备 */}
           <Modal title="编辑通信主机" 
              visible={this.state.editVisible}
              style={{ top: 200 }}
              width='50%'
              okText='确定'
              cancelText='取消'
              onOk={this.editSubmit.bind(this)}
              onCancel={()=>{this.setState({editVisible:false});this.props.form.resetFields()}}
              >
              <Form layout='inline'>
                <FormItem label="主机名称">
                  {getFieldDecorator('editname',{
                    rules: [{ required: true,message: '请填写主机名称(由数字、26个英文字母或者下划线组成)',pattern:/^\w+$/  }], 
                    initialValue:selectHost?selectHost.name:''
                  })(<Input type="text" />)}
                </FormItem>
                <FormItem label="ip">
                  {getFieldDecorator('editip',{
                    rules: [{ required: true,message: '请填写ip'  }],
                    initialValue:selectHost?selectHost.ip:'',
                  })(<Input type="text" />)}
                </FormItem>
                <FormItem label="端口">
                  {getFieldDecorator('editport',{
                    rules: [{ required: true,message: '请填写端口'  }],
                    initialValue:selectHost?selectHost.port:''
                  })(<Input type="number" />)}
                </FormItem>
                <FormItem label="COM序号">
                  {getFieldDecorator('editcomIndex',{
                    rules: [{ required: true,message: '请填写COM序号'  }],
                    initialValue:selectHost?selectHost.comIndex:''
                  })(<Input type="number" />)}
                </FormItem>
                <FormItem label="设备类型">
                  {getFieldDecorator('editdevType',{
                    rules: [{ required: true,message: '请填写区号'  }],
                    initialValue:selectHost?selectHost.devType:''
                  })(
                    <Select  >
                      <Option value={1}>门禁</Option>
                      <Option value={2}>道闸</Option>
                      <Option value={3}>消防</Option>
                  </Select>
                )}
                </FormItem>
                <FormItem label="类型">
                  {getFieldDecorator('edittype',{
                    rules: [{ required: true,message: '请填写类型'  }],
                    initialValue:selectHost?selectHost.type:''
                  })(
                    <Select  >
                      <Option value={1}>COM232</Option>
                      <Option value={2}>TCP</Option>
                      <Option value={3}>UDP</Option>
                      <Option value={4}>COM485</Option>
                  </Select>
                )}
                </FormItem>
                <FormItem label="协议">
                  {getFieldDecorator('editprotocol',{
                    rules: [{ required: true,message: '请填写协议'  }],
                    initialValue:selectHost?selectHost.protocol:''
                  })(
                    <Select>
                      <Option value="AccessControl">门禁</Option>
                      <Option value="HK-RoadGate">道闸</Option>
                      <Option value="FireControl">消防</Option>
                    </Select>
                )}
                </FormItem>
                <FormItem label="波特率">
                  {getFieldDecorator('editbaudrate',{
                    rules: [{ required: true,message: '请填写波特率'  }],
                    initialValue:selectHost?selectHost.baudrate:''
                  })(
                    <Select>
                      <Option value="300">300</Option>
                      <Option value="600">600</Option>
                      <Option value="1200">1200</Option>
                      <Option value="2400">2400</Option>
                      <Option value="4800">4800</Option>
                      <Option value="9600">9600</Option>
                      <Option value="19200">19200</Option>
                      <Option value="38400">38400</Option>
                      <Option value="43000">43000</Option>
                      <Option value="56000">56000</Option>
                      <Option value="115200">115200</Option>
                    </Select>
                )}
                </FormItem>
                <FormItem label="数据位">
                  {getFieldDecorator('editdatabit',{
                    rules: [{ required: true,message: '请填写数据位'  }],
                    initialValue:selectHost?selectHost.databit:''
                  })(
                    <Select>
                      <Option value={6}>6</Option>
                      <Option value={7}>7</Option>
                      <Option value={8}>8</Option>
                    </Select>
                )}
                </FormItem>
                <FormItem label="检验位">
                  {getFieldDecorator('editparity',{
                    rules: [{ required: true,message: '请填写检验位'  }],
                    initialValue:selectHost?selectHost.parity:''
                  })(
                    <Select>
                      <Option value={0}>无</Option>
                      <Option value={1}>奇校验</Option>
                      <Option value={2}>偶校验</Option>
                    </Select>
                )}
                </FormItem>
                <FormItem label="停止位">
                  {getFieldDecorator('editstopbit',{
                    rules: [{ required: true,message: '请填写停止位'  }],
                    initialValue:selectHost?selectHost.stopbit:''
                  })(
                    <Select>
                      <Option value={1}>1</Option>
                      <Option value={2}>2</Option>
                    </Select>
                )}
                </FormItem>

              </Form>        
          </Modal>
          <Modal title="添加通信设备" 
            visible={this.state.createDeviceVisible}
            style={{ top: 200 }}
            width='50%'
            okText='确定'
            cancelText='取消'
            onOk={this.createDeviceSubmit.bind(this)}
            onCancel={()=>{this.setState({createDeviceVisible:false});this.props.form.resetFields()}}
            >
            <Form layout='inline'>
              <FormItem label="设备名称">
                {getFieldDecorator('createname',{
                  rules: [{ required: true,message: '请填写设备名称'}], 
                })(<Input type="text" />)}
              </FormItem>
              <FormItem label="区号">
                {getFieldDecorator('areaCode',{
                  rules: [{ required: true,message: '请填写区号'}], 
                })(<Input type="number" />)}
              </FormItem>
            </Form>
          </Modal>
        </div>
    )
  }
}

const Hosts = Form.create()(Hosts1);
export default Hosts