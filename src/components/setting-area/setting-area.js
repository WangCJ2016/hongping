import React from 'react'
import { Table, Icon, Button, Modal, Form, Input, Popconfirm } from 'antd';
import { connect } from 'react-redux'
import { areaList, juniorArea, createArea, modifyArea } from '../../redux/area.redux'
const FormItem = Form.Item;

@connect(
  state => state.area,
  {areaList, juniorArea, createArea, modifyArea}
)
class SettingArea1 extends React.Component {
  state = {
    createVisible:false,
    editVisible: false,
    selectArea: null,
    createInfo: {},
  }
  componentDidMount() {
    this.props.areaList()
  }
  // 展开
  onExpand(expanded, record) {
    
  }
  // 添加
  createSubmit() {
    const name = this.props.form.getFieldValue('createName')
    this.props.createArea({...this.state.createInfo,name: encodeURI(name)})
    this.setState({createVisible:false})
  }
  // 编辑
  editSubmit() {
    const name = this.props.form.getFieldValue('editName')
    this.props.modifyArea({...this.state.selectArea,name: encodeURI(name)})
    this.setState({editVisible:false})
  }
  // 删除
  delete(area) {
    this.props.modifyArea({id:area.id,isDelete:1,parentId:area.parentId})
  }
  render() {
   
    const columns = [{
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: '60%',
      }, {
        title: 'action',
        dataIndex: 'action',
        width: '40%',
        render:(text,record)=> (
          <span className='action'>
            <a onClick={()=>this.setState({editVisible: true,selectArea:record})}><Icon type='edit'/>编辑</a>
            <Popconfirm onConfirm={this.delete.bind(this,record)} title="确定删除？"  okText="确定" cancelText="取消">
              <a ><Icon type='delete'/>删除</a>
            </Popconfirm>
            <a  onClick={()=>this.setState({
              createVisible:true,
              createInfo:{level:record.level+1,parentId:record.id}
            })}><Icon type="plus-circle-o" />添加下级</a>
          </span>
        )
    }]; 
      const data = this.props.areas
      const { getFieldDecorator } = this.props.form;
    return (
      <div className='setting-area'>
      <div className='clearfix'>
        <Button type='primary' className='float-right' onClick={
          ()=>this.setState({createVisible:true,createInfo:{level:0}})}>新增区域</Button>
      </div>
      {data.length>0? 
        <Table 
        defaultExpandAllRows={true}
        columns={columns}
        showHeader={false}
        pagination={false}
        dataSource={data} 
        onExpand={this.onExpand.bind(this)}
        
        />:null}
        <Modal title="编辑区域" 
          visible={this.state.editVisible}
          style={{ top: 200 }}
          width='50%'
          okText='确定'
          cancelText='取消'
          onOk={this.editSubmit.bind(this)}
          onCancel={()=>this.setState({editVisible:false})}
          >
          <Form>
          <FormItem>
            {getFieldDecorator('editName', {
              initialValue: this.state.selectArea?this.state.selectArea.name:''
            })(
              <Input  placeholder='请填写区域名称'/>
            )}
          </FormItem>
          </Form>
        </Modal>
        <Modal title="新建区域" 
          visible={this.state.createVisible}
          style={{ top: 200 }}
          width='50%'
          okText='确定'
          cancelText='取消'
          onOk={this.createSubmit.bind(this)}
          onCancel={()=>this.setState({createVisible:false})}
          ><Form>
          <FormItem>
            {getFieldDecorator('createName', {
              
            })(
              <Input  placeholder='请填写区域名称'/>
            )}
          </FormItem>
          </Form>
        </Modal>
      </div>
    )
  }
}
const SettingArea = Form.create()(SettingArea1);
export default SettingArea