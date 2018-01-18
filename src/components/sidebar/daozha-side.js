import React from 'react'
import { connect } from 'react-redux'
import {Icon,Input} from 'antd'
import DaozhaTree from '../areaTree/daozhaTree'
import {changeSidebar} from '../../redux/sidebar.redux'
import { searchHongwaiVideo } from '../../redux/video.sider.redux'
import className from 'classnames'
const Search = Input.Search

@connect(
  state=>({sidebar:state.sidebar,videSider: state.videSider}),
  {changeSidebar,searchHongwaiVideo}
)
class DaozhaSider extends React.Component {
  constructor() {
    super()
    this.state = {
      selectVideo: ''
    }
  }
  searchVideoRender() {
    const searchHongwaiList = this.props.videSider.searchHongwaiList
    console.log(searchHongwaiList)
    return searchHongwaiList.map(video=>{
      const styles = className({
        'bro-search-item': true,
        'peo-item': true,
        itemActive: video.id === this.state.selectVideo
      })
     return <div className={styles}  key={video.id} onDoubleClick={()=>this.setState({selectVideo:video.id})}>
              {video.type===3?<img className='type-icon' src={require('../../assets/imgs/daozha-icon.png')} alt=""/>:null}
              {video.name}
          </div>
    })
  }
  render() {
    return (
      <div className='submeun' style={{width:this.props.sidebar.daozha_sidebar?'300px':'0'}}>
        <div className='siderbar-wrap'> 
          <div className="title clearfix">
          <span className='float-left'>道闸</span>
          <span className='float-right'><Icon type='close' onClick={()=>this.props.changeSidebar('daozha_sidebar')}></Icon></span></div>
            <Search
            placeholder="请输入关键字"
            style={{ width: 220 }}
            onSearch={value => this.props.searchHongwaiVideo({name:encodeURI(value),type:3})} />
            <div style={{marginTop:'15px'}}><DaozhaTree select={this.select} defaultExpandAllRows={true}/></div>
            <div className="title" style={{textAlign:'left',marginTop:'15px'}}>
              <span>道闸搜索结果</span>
           </div>
           {this.searchVideoRender()}
        </div>
      </div>
    )
  }
}

export default DaozhaSider