import React from 'react'
import {Icon,Input,Checkbox,Button} from 'antd'
import { unquie } from '../../utils'
import TableBroadcast from '../areaTree/tableBroadcast'
import { connect } from 'react-redux'
import {changeSidebar} from '../../redux/sidebar.redux'
import { searchBroadcast,selectBroIndex } from '../../redux/broadcast.redux'
import broadcastHoc from '../broadcastHoc/broadcastHoc'
const Search = Input.Search

@connect(
  state=>({sidebar:state.sidebar,broadcast:state.broadcast,area:state.area}),
  {changeSidebar,searchBroadcast,selectBroIndex}
)
@broadcastHoc
class BroadcastSider extends React.Component {
  constructor() {
    super()
    this.state={
      selectBroId: '',
      voiceBroadcastStart: false,
      fileBroadcastStart: false,
      selectIndexArr: [],
      fileModalVisible:false,
      documentHeight:10000
    }
    this.voiceBroadcast = this.voiceBroadcast.bind(this)
    this.fileBroadcast = this.fileBroadcast.bind(this)
  }
  componentDidMount() {
    this.setState({
      documentHeight:document.body.clientHeight
    }) 
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
    this.props.voiceBroadcast(this.state.selectIndexArr)
  }
  // 文件播报
  fileBroadcast() {
    this.props.broadcastFile(this.state.selectIndexArr)
  }
  treeSelectIndex(keys) {
    this.setState({
      selectIndexArr: keys
    })
  }
  render() {
    if(!this.props.sidebar.broadcast_sidebar) {
      return null
    }
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
            <span><strong style={{color: '#17b89f'}}>{this.state.selectIndexArr.length}</strong></span>
            <span >
              <Button size='small' onClick={this.voiceBroadcast} type='primary'>语音播报</Button>
              <Button size='small' onClick={this.props.voiceBroadcastEnd} type='primary'>关闭播报</Button>
            </span>
            <span>
              <Button size='small' onClick={this.fileBroadcast} type='primary'>文件播报</Button>
              <Button size='small' onClick={this.props.broadcastFileEnd} type='primary'>关闭播报</Button>
            </span>
          </div>:null
        }
        
        <object
                ref={(screen)=>this.play=screen}
                classID="clsid:1D3667C2-A790-4CCB-B3F2-3E2AE54BCFAA"
                codebase="./SetupOCX.exe#version=1.0.0.1"
                width={0}
                height={0}
                style={{visibility:'hidden'}}
                >
                <a style={{display:'block',lineHeight:'400px',textAlign:'center',textDecoration:'underline'}} href="http://192.168.1.51:8080/SetupOCX.exe" download='控件'>请点击此处下载插件,安装时请关闭浏览器</a>
              </object>
      </div>
    )
  }
}
//style={{top: this.state.documentHeight-50+'px'}}
export default BroadcastSider