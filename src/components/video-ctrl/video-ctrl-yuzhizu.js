import React from 'react'
import { connect } from 'react-redux'
import classname from 'classnames'
import { Icon, Modal, Form, Input,Collapse,Popconfirm,Checkbox } from 'antd'
import {videoAreaDevices, createPreviewGroup, remotePreviewGroupList,modifyPreviewGroup,modifySysRemotePreview,getDevInfo,modalVisiable} from '../../redux/video.redux'
import TableAreaTree from '../areaTree/tableAreaTree'
const FormItem = Form.Item
const Panel = Collapse.Panel;
const CheckboxGroup = Checkbox.Group;

@connect(
  state=>({video: state.video}),
  {
    videoAreaDevices, createPreviewGroup, remotePreviewGroupList,modifyPreviewGroup,modifySysRemotePreview,getDevInfo,modalVisiable
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
      previewSelectId:-1
     }
     this.realPlay = this.realPlay.bind(this)
     this.transferClick = this.transferClick.bind(this)
     this.checkboxChange = this.checkboxChange.bind(this)
     this.previewsGroupClick = this.previewsGroupClick.bind(this)
  }
  
   componentDidMount() {
     this.props.remotePreviewGroupList({devType:1})
   }
   // 播放
   realPlay(devId) {
     this.props.getDevInfo(devId,this.props.play)
   }

  createSubmit() {
    this.props.form.validateFields(['name'],(err, values)=> {
      if(!err) {
        this.props.createPreviewGroup({title: encodeURI(values.name),devType:1})
        this.setState({createvisible: false})
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
      <Collapse bordered={false} >
      {lists.map((list,index) => (
        <Panel header={list.title} key={index}>
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
           return <div key={preview.id} className={style} onClick={()=>this.realPlay(preview.devId)}>{preview.devName}</div>
          })}
        </Panel>
      ))}
      </Collapse>
    )
  }
  transferKeyChange(selectedRowKeys, selectedRows) {
    this.setState({selectedRows:selectedRows})
  }
  transferClick(type) {
    if(type === 'left') {
      const newDevIdArr = []
      this.state.targetKeys.forEach(id=>{
        if(this.state.previewChecked.indexOf(id)===-1)
        newDevIdArr.push(id)
      })
      this.setState({options:this.state.options.filter(id=>newDevIdArr.indexOf(id.value)>-1)})
    }
    if(type==='right') {
      const arr = this.state.selectedRows.filter(row => row.type>0).map(item=>({label:item.name,value:item.id}))
      let realArr = []
      arr.forEach(item=>{
        let has = false
        this.state.options.forEach(option=>{
          has = option.value === item.value? true: false
        })
        realArr = has?realArr:[...realArr,item]
      })
      this.setState({
        options:[...this.state.options,...realArr]
      })
    }
  }
  checkboxChange(checkedValue)  {
    this.setState({
      previewChecked: checkedValue
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
        <div className='yuzhiwei'>
            <div className="add-group" onClick={()=>{this.setState({createvisible:true});this.props.modalVisiable()}}>
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
                <FormItem label="预置位名称">
                  {getFieldDecorator('name',{
                    rules: [{ required: true,message: '请输入预置位名称'}],
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
                <FormItem label="预置位名称">
                  {getFieldDecorator('editname',{
                    rules: [{ required: true,message: '请输入预置位名称'}],
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
                  <CheckboxGroup options={this.state.options}  onChange={this.checkboxChange}/>
              </div>
            </div>
          </Modal>
        </div>
    )
  }
}

const VideoCtrlYuzhizu = Form.create()(VideoCtrlYuzhizu1);
export default VideoCtrlYuzhizu