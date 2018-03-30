import React from 'react'
import { connect } from 'react-redux'
import {Icon,Input} from 'antd'
import TableAreaTree from '../areaTree/tableAreaTree'
import {changeSidebar} from '../../redux/sidebar.redux'
import { searchVideo } from '../../redux/video.sider.redux'
import className from 'classnames'
const Search = Input.Search

@connect(
  state=>({sidebar:state.sidebar,videSider: state.videSider}),
  {changeSidebar,searchVideo}
)
class VideoSide extends React.Component {
  constructor() {
    super()
    this.state = {
      selectVideo: ''
    }
  }
  searchVideoRender() {
    const searchVideoList = this.props.videSider.searchVideoList
    return searchVideoList.map(video=>{
      const styles = className({
        'bro-search-item': true,
        'peo-item': true,
        itemActive: video.id === this.state.selectVideo
      })
     return <div className={styles}  key={video.id} onDoubleClick={()=>this.setState({selectVideo:video.id})}>
              {video.type===1?<img className='type-icon' src={require('../../assets/imgs/video-icon.png')} alt=""/>:null}
              {video.type===2?<img className='type-icon' src={require('../../assets/imgs/hongwai-icon.png')} alt=""/>:null}
              {video.name}
          </div>
    })
  }
  render() {
    if(!this.props.sidebar.video_sidebar) {
      return null
    }
    return (
      <div className='submeun' style={{width:this.props.sidebar.video_sidebar?'300px':'0'}}>
        <div className='siderbar-wrap'> 
          <div className="title clearfix">
          <span className='float-left'>视频</span>
          <span className='float-right'><Icon type='close' onClick={()=>this.props.changeSidebar('video_sidebar')}></Icon></span></div>
            <Search
            placeholder="请输入关键字"
            style={{ width: 220 }}
            onSearch={value => this.props.searchVideo({name:encodeURI(value)})} />
            <div style={{marginTop:'15px'}}><TableAreaTree select={this.select} defaultExpandAllRows={true}/></div>
            <div className="title" style={{textAlign:'left',marginTop:'15px'}}>
              <span>视频搜索结果</span>
           </div>
           {this.searchVideoRender()}
        </div>
      </div>
    )
  }
}

export default VideoSide