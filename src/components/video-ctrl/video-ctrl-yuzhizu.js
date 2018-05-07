import React from 'react'
import { connect } from 'react-redux'
import classname from 'classnames'
import { Icon, Modal, Form, Input,Collapse,Popconfirm,Checkbox } from 'antd'
import {videoAreaDevices, createPreviewGroup, remotePreviewGroupList,modifyPreviewGroup,modifySysRemotePreview,modalVisiable} from '../../redux/video.redux'
import { getDevInfo} from '../../redux/setting.device.redux'
import TableAreaTree from '../areaTree/tableAreaTree'
import { getScreenLength } from '../../utils'
const FormItem = Form.Item
const Panel = Collapse.Panel;
const CheckboxGroup = Checkbox.Group;

@connect(
  state=>({video: state.video}),
  {
    getDevInfo,videoAreaDevices, createPreviewGroup, remotePreviewGroupList,modifyPreviewGroup,modifySysRemotePreview,modalVisiable
   }
)
class VideoCtrlYuzhizu1 extends React.Component {
  constructor() {
    super()
    this.state = { 
      createvisible:false,
      editvisible:false,
      editPreviewVisible:false,
      selectPreview: null,
      targetKeys:[],
      previewSelectId:-1,
      previewChecked:[]
     }
    
     this.transferClick = this.transferClick.bind(this)
     this.checkboxChange = this.checkboxChange.bind(this)
     this.previewsGroupClick = this.previewsGroupClick.bind(this)
     this.collapseChange = this.collapseChange.bind(this)
  }
  
   componentDidMount() {
     this.props.remotePreviewGroupList({devType:1})
   }
 

  createSubmit() {
    this.props.form.validateFields(['name'],(err, values)=> {
      if(!err) {
        this.props.createPreviewGroup({title: encodeURI(values.name),devType:1})
        this.setState({createvisible: false})
        this.props.modalVisiable()
      }
    })
  }
  editSubmit() {
    this.props.form.validateFields(['editname'],(err, values)=> {
      if(!err) {
        this.props.modifyPreviewGroup({id:this.state.selectPreview.id,title: encodeURI(values.editname),devType:1})
        this.setState({editvisible: false})
      }
    })
  }
  editPreviewSubmit() {
    this.props.modifySysRemotePreview({devIds:this.state.options.map(option=>option.value).join(','),devType:1,groupId:this.state.selectPreview.id})
        this.setState({editPreviewVisible: false})
  }
  // 删除
  confirm() {
    this.props.modifyPreviewGroup({id:this.state.selectPreview.id,isDelete:1,devType:1})
  }
  handleChange(nextTargetKeys, direction, moveKeys) {
    this.setState({ targetKeys: nextTargetKeys });
  }
  handleSelectChange(sourceSelectedKeys, targetSelectedKeys) {
    this.setState({ selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys] });
  }
  previewsGroupClick(list) {
    this.props.modalVisiable()
    this.setState({selectPreview:list,editPreviewVisible:true},
      function() {
        this.setState({options:this.state.selectPreview.previews.map(preview=>({ label: preview.devName, value: preview.devId }))})
        this.setState({targetKeys:this.state.selectPreview.previews.map(list => list.devId)})})
  }
  previewsGroupRender() {
    const lists =  this.props.video.previewGroup
    return (
      <Collapse bordered={false} accordion onChange={this.collapseChange}>
      {lists.map((list,index) => (
        <Panel header={list.title} key={list.id}>
          <div className='abosulte1' >
            <Icon type='plus' onClick={()=> this.previewsGroupClick(list)}/>
            <Icon type='edit' onClick={()=>{this.setState({selectPreview:list,editvisible:true});this.props.modalVisiable()}} />
            <Popconfirm  title="确定删除?" onConfirm={this.confirm.bind(this)}   okText="确定" cancelText="取消">
              <Icon onClick={()=>this.setState({selectPreview:list})} type='delete'/>
            </Popconfirm>
          </div>
          {list.previews.map(preview=>{
            const style = classname({
              preview:true,
              active: this.state.previewSelectId === preview.id
            })
           return <div key={preview.id} className={style} >{preview.devName}</div>
          })}
        </Panel>
      ))}
      </Collapse>
    )
  }
  collapseChange(e,a) {
    const group =  this.props.video.previewGroup.filter(group => group.id===e)
    if(group[0].previews) {
      const length = group[0].previews.length
      const screenLength = getScreenLength(length)
      this.props.play.XzVideo_SetRealPlayScreen(screenLength)
      group[0].previews.forEach((device,index) => {
        this.props.getDevInfo({devId: device.devId,type:device.devType},'play',this.props.play,index+1)
      })
    }

  }
  transferKeyChange(selectedRowKeys, selectedRows) {
    this.setState({selectedRows:selectedRows})
  }
  transferClick(type) {
    if(type === 'left') {
      this.setState({options:this.state.options.filter(id=>this.state.previewChecked.indexOf(id.value)===-1)})
    }
    if(type==='right') {
      let arr = this.state.selectedRows.filter(row => row.type>0).map(item=>item.id)
      arr.forEach(item=>{
        this.state.options.forEach(option=>{
           if(arr.indexOf(option.value) > -1) {
            arr = arr.filter(value => value!==option.value)
           }
        })
      })
      const addArr = this.state.selectedRows.filter(row => arr.indexOf(row.id)>-1).map(item=>({label:item.name,value:item.id}))
      this.setState({
        options:[...this.state.options,...addArr]
      })
    }
  }
  checkboxChange(checkedValue)  {
    this.setState({
      previewChecked: checkedValue
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    console.log(this.props.video.previewGroup)
    return (
        <div className='yuzhiwei'>
            <div style={{ cursor: 'pointer'}} onClick={()=>{this.setState({createvisible:true});this.props.modalVisiable()}}>
              <Icon type='plus'/>添加预览组
            </div>
            {this.previewsGroupRender()}
            <Modal title="添加预览组"
              visible={this.state.createvisible}
              style={{ top: 200 }}
              width='50%'
              okText='保存'
              cancelText='取消'
              onOk={this.createSubmit.bind(this)}
              onCancel={()=>{this.setState({createvisible:false});this.props.modalVisiable()}}
              >
              <Form layout='inline'>
                <FormItem label="预览组名称">
                  {getFieldDecorator('name',{
                    rules: [{ required: true,message: '请输入预览组名称'}],
                  })(<Input type="text" />)}
                </FormItem>
              </Form>
            </Modal>
            {/*设置预览组*/}
            <Modal title="设置预览组"
              visible={this.state.editvisible}
              style={{ top: 200 }}
              width='50%'
              okText='保存'
              className='yuzhiwimodal'
              cancelText='取消'
              onOk={this.editSubmit.bind(this)}
              onCancel={()=>{this.setState({editvisible:false});this.props.modalVisiable()}}
              >
              <Form layout='inline'>
                <FormItem label="预览组名称">
                  {getFieldDecorator('editname',{
                    rules: [{ required: true,message: '请输入预览组名称'}],
                     initialValue: this.state.selectPreview?this.state.selectPreview.title:''
                  })(<Input type="text" />)}
                </FormItem>
             </Form>
          </Modal>
          <Modal title="设置预览组通道"
              visible={this.state.editPreviewVisible}
              style={{ top: 200 }}
              width='50%'
              okText='保存'
              className='yuzhiwimodal'
              cancelText='取消'
              onOk={this.editPreviewSubmit.bind(this)}
              onCancel={()=>{this.setState({editPreviewVisible:false});this.props.modalVisiable()}}
              >
              <div className='transfer'>
                <div className="area">
                  <div className="title">区域</div>
                  <TableAreaTree rowSelection={{type:'checkbox',onChange:this.transferKeyChange.bind(this)}} />
                </div>
                <div className="transfer-arr">
                   <p onClick={()=>this.transferClick('left')}><img src={require('../../assets/imgs/transfer-left.png')} alt=""/></p>
                   <p onClick={()=>this.transferClick('right')}><img src={require('../../assets/imgs/transfer-right.png')} alt=""/></p>
                </div>
                <div className="device area">
                  <div className="title">设备</div>
                  <CheckboxGroup defaultValue={[]} options={this.state.options}  onChange={this.checkboxChange}/>
              </div>
            </div>
          </Modal>
        </div>
    )
  }
}

const VideoCtrlYuzhizu = Form.create()(VideoCtrlYuzhizu1);
export default VideoCtrlYuzhizu