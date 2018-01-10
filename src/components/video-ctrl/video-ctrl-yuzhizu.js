import React from 'react'
import { connect } from 'react-redux'
import classname from 'classnames'
import { Icon, Modal, Form, Input,Transfer,Collapse,Popconfirm } from 'antd'
import {videoAreaDevices, createPreviewGroup, remotePreviewGroupList,modifyPreviewGroup,modifySysRemotePreview,getDevInfo} from '../../redux/video.redux'
import AreaTree from '../areaTree/areaTree'
const FormItem = Form.Item
const Panel = Collapse.Panel;


@connect(
  state=>({video: state.video}),
  {
    videoAreaDevices, createPreviewGroup, remotePreviewGroupList,modifyPreviewGroup,modifySysRemotePreview,getDevInfo
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
    this.props.modifySysRemotePreview({devIds:this.state.targetKeys.join(','),devType:1,groupId:this.state.selectPreview.id})
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
  previewsGroupRender() {
    const lists =  this.props.video.previewGroup
    return (
      <Collapse bordered={false} >
      {lists.map((list,index) => (
        <Panel header={list.title} key={index}>
          <div className='abosulte1' >
            <Icon type='plus' onClick={()=>
              this.setState({selectPreview:list,editPreviewVisible:true},
                function() {
                  this.setState({targetKeys:this.state.selectPreview.previews.map(list => list.devId)})})}/>
            <Icon type='edit' onClick={()=>this.setState({selectPreview:list,editvisible:true})} />
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
  render() {
    console.log(this.state)
    const areaDevices = this.props.video.areaDevices.map(device => ({...device,key:device.id}))
    const { getFieldDecorator } = this.props.form;
    return (
        <div className='yuzhiwei'>
            <div className="add-group" onClick={()=>this.setState({createvisible:true})}>
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
              onCancel={()=>this.setState({createvisible:false})}
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
              onCancel={()=>this.setState({editvisible:false})}
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
              onCancel={()=>this.setState({editPreviewVisible:false})}
              >
              <div className='clearfix'>
                <div className="float-left area">
                  <div className="title">区域</div>
                  <AreaTree defaultExpandAll={true} select={this.props.videoAreaDevices}/>
                </div>
                <Transfer
                  className='transfer float-right'
                  dataSource={areaDevices}
                  titles={['通道', '预览组']}
                  render={item=>item.name}
                  targetKeys={this.state.targetKeys}
                  selectedKeys={this.state.selectedKeys}
                  onChange={this.handleChange.bind(this)}
                  onSelectChange={this.handleSelectChange.bind(this)}
                  // onScroll={this.handleScroll}
                  />
            </div>
          </Modal>
        </div>
    )
  }
}

const VideoCtrlYuzhizu = Form.create()(VideoCtrlYuzhizu1);
export default VideoCtrlYuzhizu