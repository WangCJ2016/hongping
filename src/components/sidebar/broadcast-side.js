import React from 'react'
import {Icon,Input,Checkbox,message} from 'antd'
import { unquie } from '../../utils'
import TableBroadcast from '../areaTree/tableBroadcast'
import { connect } from 'react-redux'
import {changeSidebar} from '../../redux/sidebar.redux'
import { searchBroadcast,selectBroIndex } from '../../redux/broadcast.redux'
const Search = Input.Search

@connect(
  state=>({sidebar:state.sidebar,broadcast:state.broadcast,area:state.area}),
  {changeSidebar,searchBroadcast,selectBroIndex}
)
class BroadcastSider extends React.Component {
  constructor() {
    super()
    this.state={
      selectBroId: '',
      voiceBroadcastStart: false,
      fileBroadcastStart: false,
      selectIndexArr: []
    }
    this.voiceBroadcast = this.voiceBroadcast.bind(this)
    this.fileBroadcast = this.fileBroadcast.bind(this)
  }
  onChange(index,e) {
    if(e.target.checked) {
      this.props.selectBroIndex(unquie([...this.props.broadcast.selectBroIndex,index]))
    }else{
      const index1 = this.props.broadcast.selectBroIndex.indexOf(index)
      let newArr = this.props.broadcast.selectBroIndex.slice()
      newArr.splice(index1,1)
      this.props.selectBroIndex(newArr)
    }
  }
  searchBroRender() {
    const searchBroList = this.props.broadcast.searchBroList
    return searchBroList.map(bro=>{
     return <div className='bro-search-item peo-item'  key={bro.id}>
              <Checkbox onChange={this.onChange.bind(this,bro.index)}>
              <img className='type-icon' src={require('../../assets/imgs/br_icon.png')} alt=""/>
              {bro.name}</Checkbox>
          </div>
    })
  }
  // 语音播报
  voiceBroadcast() {

    if(!this.state.voiceBroadcastStart){
      const a =this.play.VoiceBroadcast(this.props.area.broadcastIp,this.state.selectIndexArr.join(','))
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
  // 文件播报
  fileBroadcast() {
    if(!this.state.fileBroadcastStart) {
      const a = this.play.GetLocallFile()
      if(a!=='') {
        const a = this.play.FileBroadcast(this.props.area.broadcastIp,this.state.selectIndexArr.join(','),a)
        if(a) {
          message.success('开始播报文件语音')
        } else {
          message.error('播报语音失败')
        }
      }else {
        message.error('文件夹下没有文件')
      }
    }else {
      const a = this.play.EndFileBroadcast()
      a?message.success('已关闭'):message.error('关闭失败')
      this.setState({
        voiceBroadcastStart:false
      })
    }
    
  }
  treeSelectIndex(keys) {
    this.setState({
      selectIndexArr: keys
    })
  }
  render() {
    return (
      <div className='submeun' style={{width:this.props.sidebar.broadcast_sidebar?'300px':'0'}}>
        <div className='siderbar-wrap'> 
          <div className="title clearfix">
          <span className='float-left'>广播</span>
          <span className='float-right'><Icon type='close' onClick={()=>this.props.changeSidebar('broadcast_sidebar')}></Icon></span></div>
          <Search
          placeholder="请输入关键字"
          style={{ width: 220 }}
          onSearch={value => this.props.searchBroadcast({name:encodeURI(value)})} />
          <div style={{marginTop:'15px'}}>
          <TableBroadcast treeSelectIndex={this.treeSelectIndex.bind(this)} />
          </div>
          <div className="title" style={{textAlign:'left',marginTop:'15px'}}>
              <span>广播搜索结果</span>
          </div>
          {this.searchBroRender()}
        </div>
        {
          this.props.sidebar.broadcast_sidebar?
          <div className="fix-bottom">
          <span>已选择<strong style={{color: '#17b89f'}}>{this.state.selectIndexArr.length}</strong></span>
          <span onClick={this.voiceBroadcast}><Icon type="notification" style={{color:this.state.voiceBroadcastStart?'#006f6b':''}} /></span>
          <span onClick={this.fileBroadcast}><Icon type="folder" style={{color:this.state.fileBroadcastStart?'#006f6b':''}} /></span>
        </div>:null
        }
        <object
                ref={(screen)=>this.play=screen}
                classID="clsid:1D3667C2-A790-4CCB-B3F2-3E2AE54BCFAA"
                codebase="./XzVideoWebClient.cab#version=1.0.0.1"
                width={0}
                height={0}
                style={{visibility:'hidden'}}
                >
              </object>
      </div>
    )
  }
}

export default BroadcastSider