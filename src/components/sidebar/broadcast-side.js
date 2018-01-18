import React from 'react'
import {Icon,Input,Checkbox} from 'antd'
import { unquie } from '../../utils'
import TableBroadcast from '../areaTree/tableBroadcast'
import { connect } from 'react-redux'
import {changeSidebar} from '../../redux/sidebar.redux'
import { searchBroadcast,selectBroIndex } from '../../redux/broadcast.redux'
const Search = Input.Search

@connect(
  state=>({sidebar:state.sidebar,broadcast:state.broadcast}),
  {changeSidebar,searchBroadcast,selectBroIndex}
)
class BroadcastSider extends React.Component {
  constructor() {
    super()
    this.state={
      selectBroId: ''
    }
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
          <TableBroadcast />
          </div>
          <div className="title" style={{textAlign:'left',marginTop:'15px'}}>
              <span>广播搜索结果</span>
          </div>
          {this.searchBroRender()}
        </div>
        <div className="fix-bottom">
          <span>已选择<strong style={{color: '#17b89f'}}>{this.props.broadcast.selectBroIndex.length}</strong></span>
          <span><img src={require('../../assets/imgs/bro-icon.png')} alt=""/></span>
          <span><Icon type="folder" /></span>
        </div>
      </div>
    )
  }
}

export default BroadcastSider