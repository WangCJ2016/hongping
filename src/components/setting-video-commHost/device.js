import React from 'react'
import { Icon, Table, Popconfirm, Modal, Form, Input } from 'antd'
import { connect } from 'react-redux'
import { deviceLists, modifyDevice,propertyLists, setDevice }  from '../../redux/setting.commHost.redux'
const FormItem = Form.Item;

@connect(
  state => state.commHost,
  {deviceLists,modifyDevice,propertyLists,setDevice}
)
class Devices1 extends React.Component {
  state = { 
    editVisible: false,
    selectDevice: null
   }
  
  delete(id) {
    this.props.modifyDevice({id:id,isDelete:1})
  }
  editDeviceSubmit() {
    this.props.form.validateFields((err, values)=>{
      if(!err) {
        this.props.modifyDevice({...values,hostId:this.props.hostId,id:this.state.selectDevice.id,name:encodeURI(values.name)})
        this.setState({
          editVisible: false
        })
      }
    })
  }
  rowClick(record, index) {
    this.props.propertyLists({devHostId: record.id})
    this.props.setDevice(record)
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const selectDevice = this.state.selectDevice
    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '70%',
    },{
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span className='video-action'>
          <a><Icon type='edit' onClick={() => this.setState({selectDevice:record,editVisible:true})}/></a>
          <a>
            <Popconfirm title="确定删除？" onConfirm={this.delete.bind(this,record.id)}  okText="确定" cancelText="取消">
            <Icon type='delete'/>
            </Popconfirm>
          </a>
        </span>
      )
    }
  ]
   const commDevices = this.props.commDevices
    return (
      <div>
       {commDevices?<Table
         onRowClick={this.rowClick.bind(this)}
         columns={columns}
         size='small'
         showHeader={false}
         pagination={false}
        dataSource={commDevices} />:null}
        <Modal title="编辑通信设备" 
            visible={this.state.editVisible}
            style={{ top: 200 }}
            width='50%'
            okText='确定'
            cancelText='取消'
            onOk={this.editDeviceSubmit.bind(this)}
            onCancel={()=>this.setState({editVisible:false})}
            >
            <Form layout='inline'>
              <FormItem label="设备名称">
                {getFieldDecorator('name',{
                  rules: [{ required: true,message: '请填写设备名称'}], 
                  initialValue: selectDevice?selectDevice.name:''
                })(<Input type="text" />)}
              </FormItem>
              <FormItem label="区号">
                {getFieldDecorator('areaCode',{
                  rules: [{ required: true,message: '请填写区号'}], 
                  initialValue: selectDevice?selectDevice.areaCode:''
                })(<Input type="number" />)}
              </FormItem>
            </Form>
          </Modal>
      </div>
      
    )
  }
}
const Devices = Form.create()(Devices1);
export default Devices