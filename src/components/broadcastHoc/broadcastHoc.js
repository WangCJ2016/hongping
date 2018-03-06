import React from 'react'
import {Modal,Table,message} from 'antd'
import { connect } from 'react-redux';

const columns = [{
    title: '文件名称',
    dataIndex: 'name',
  }];

const broadcastHoc = (WrappedCom) => {
  @connect(
    state => ({area: state.area})
  )  
  class newCom extends React.Component {
    constructor() {
      super()
      this.state = {
        dataSource:[{name:'dsfsdfs',key:1},{name:'dsfsdfs',key:2},{name:'dsfsdfs',key:3}],
        voiceBroadcastStart: false,
        fileBroadcastStart: false,
        fileModalVisible: false
      }
      this.onOk = this.onOk.bind(this)
      this.voiceBroadcast = this.voiceBroadcast.bind(this)
      this.broadcastFile = this.broadcastFile.bind(this)
    }
    voiceBroadcast(IndexArr) {
      if(!this.state.voiceBroadcastStart){
        const a =this.play.VoiceBroadcast(this.props.area.broadcastIp,IndexArr.join(','))
        if(a) {
          message.success('开始播报语音')
          this.setState({
            voiceBroadcastStart:true
          })
        }else{
          message.error('播报语音失败')
        }
      }else {
        const a = this.play.EndVoiceBroadcast()
        a?message.success('已关闭'):message.error('关闭失败')
        this.setState({
          voiceBroadcastStart:false
        })
      }
    }
    broadcastFile(IndexArr) {
      if(!this.state.fileBroadcastStart) {
        const a = this.play.GetLocallFile()
        this.setState({fileModalVisible:true,selectIndexArr:IndexArr})
      }else {
        const a = this.play.EndFileBroadcast()
        a?message.success('已关闭'):message.error('关闭失败')
        this.setState({
          voiceBroadcastStart:false
        })
      }
    }
    onOk() {
        const a = this.play.FileBroadcast(this.props.area.broadcastIp,this.state.selectIndexArr.join(','),this.state.selectedRowKeys.join(','))
        if(a) {
          message.success('开始播报文件语音')
        } else {
          message.error('播报语音失败')
        }
    }
    render() {
      const rowSelection = {
        onChange: (selectedRowKeys) => {
          this.setState({
            selectedRowKeys:selectedRowKeys
          })
        },
      };

      return (
        <div style={{height:'32px'}}>
          <WrappedCom voiceBroadcast={this.voiceBroadcast} broadcastFile={this.broadcastFile} {...this.props}></WrappedCom>
          <Modal
            visible={this.state.fileModalVisible}
            onOk={this.onOk}
            onCancel={()=>{}}
            okText='确认'
            cancelText='取消'
            >
            <Table size='small' rowSelection={rowSelection} columns={columns} dataSource={this.state.dataSource}></Table>  
          </Modal>
          <object
            ref={(screen)=>this.playback=screen}
            classID="clsid:1D3667C2-A790-4CCB-B3F2-3E2AE54BCFAA"
            codebase="./XzVideoWebClient.cab#version=1.0.0.1"
            width={0}
            height={0}
            align='center' 
            >
         </object>
        </div>
      )
    }
  }
  return newCom
} 


export default broadcastHoc