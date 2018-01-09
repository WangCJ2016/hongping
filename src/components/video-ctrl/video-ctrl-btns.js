import React from 'react'
import {Tooltip,Switch,Icon,Modal,Form,Input,Popconfirm} from 'antd'
const FormItem = Form.Item

class VideoCtrlBtn1 extends React.Component {
  state = {  
    activeIndex: -1,
    yuzhiweiVisible: false,
    visible:false
  }
  screenRender() {
    const arr = [1,4,6,8,9,13,16]
    return arr.map((num,index) => {
      return <span onClick={this.setScreen.bind(this,num)} key={num}>
        {num===this.state.activeIndex?<img src={require(`../../assets/imgs/${num}_on.png`)} alt=""/>:
        <img src={require(`../../assets/imgs/${num}.png`)} alt=""/>}
      </span>
    })
  }
  setScreen(index) {
    this.setState({
      activeIndex:index
    })
    this.props.setScreen(index) 
  }
  switchChange(checked){
    if(checked) {
      this.props.remoteCtrl(1)
    }else{
      this.props.remoteCtrl(0)
    }
  }
  submit(){
    this.props.form.validateFields((errors, values)=>{
      if(!errors) {
        this.props.createRemotePresets({
          presetName: encodeURI(values.name),
          channelId:this.props.presets.channelId,
          presetId: this.props.presets.presets.length + 1
        })
      }
    })
  }
  presetsRender() {
    const presets = this.props.presets.presets
    return presets.map(preset=> (
      <li key={preset.id}>{preset.presetName}
        <Popconfirm title="确认删除?" onConfirm={()=>this.props.delPreset({id:preset.id,isDelete:1,presetId:preset.presetId,channelId:preset.channelId})} okText="确定" cancelText="取消">
        <Icon type='delete'/>
        </Popconfirm>
      </li>
    ))
  }
  render() {
    console.log(this.props.presets)
    const { getFieldDecorator } = this.props.form
    return (
      <div className="controls clearfix">
          <div className='float-left'>
              {this.props.videoProps.hasSoundIf? 
                <Tooltip title="关闭声音">
                  <img src={require('../../assets/imgs/video-v-on.png')} onClick={this.props.soundCtrl} alt=""/>
                </Tooltip>:
                <Tooltip title="开启声音">
                  <img src={require('../../assets/imgs/video-v.png')} onClick={this.props.soundCtrl} alt=""/>
                </Tooltip>
               }
              {this.props.videoProps.saveVideoIf? 
                <Tooltip title="暂停录像">
                  <img src={require('../../assets/imgs/video-record-on.png')} onClick={this.props.saveRealData}  alt=""/>
                </Tooltip>: 
                <Tooltip title="开始录像">
                  <img src={require('../../assets/imgs/video-record.png')} onClick={this.props.saveRealData}  alt=""/>
                </Tooltip>}
              <Tooltip title="抓图">
                <img src={require('../../assets/imgs/capture_off.png')} onClick={this.props.realCapPicture} alt=""/>
              </Tooltip>
              <Tooltip title="全屏">
                <img src={require('../../assets/imgs/video_full.png')} onClick={this.props.fullscreen} alt=""/>
              </Tooltip>
              <div className="controls-btn"><Icon type="poweroff" onClick={this.props.stopPlay}/>关闭通道</div>
              <div  onClick={()=>this.setState({visible:true})} className="controls-btn"><Icon type="plus" />添加预置位</div>
              <div style={{position:'relative',display:'inline-block'}}>
                <div className="controls-btn" onClick={()=>this.setState({yuzhiweiVisible:!this.state.yuzhiweiVisible})}>调用预置位 {this.state.yuzhiweiVisible?<Icon type='down'/>:<Icon type='up'/>}
                </div>
                {
                  this.state.yuzhiweiVisible?
                  <ul className='downlist'>
                    {this.presetsRender()}
                  </ul>:null
                }
                
              </div>
              <Switch checkedChildren={'开闸'} unCheckedChildren={'关闸'} onChange={this.switchChange.bind(this)}/>
          </div>
          <div className="float-right">
              {this.screenRender()}
          </div>
          <Modal title="设置预置位"
              visible={this.state.visible}
              style={{ top: 200 }}
              okText='保存'
              cancelText='取消'
              onOk={this.submit.bind(this)}
              onCancel={()=>this.setState({visible:false})}
              >
              <Form layout='inline'>
                <FormItem label="预置位名称">
                  {getFieldDecorator('name',{
                    rules: [{ required: true,message: '请输入预置位名称'}],
                    // initialValue:selectChannel?selectChannel.name:''
                  })(<Input type="text" />)}
                </FormItem>
              </Form>
          </Modal>
        </div>
    )
  }
}


const VideoCtrlBtn = Form.create()(VideoCtrlBtn1);
export default VideoCtrlBtn