import React from 'react'
import { Tree } from 'antd';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {broadcastAreaDevices,areaList,areaInfo,dataSuccess} from '../../redux/area.redux'
import { selectBroIndex } from '../../redux/broadcast.redux'
import { querySysInstallPlaces } from '../../redux/setting.device.redux'
import { unquie } from '../../utils'
import './tree.scss'

const TreeNode = Tree.TreeNode;

@connect(
    state=>({video:state.video,area:state.area,broadcast:state.broadcast}),
    {
      broadcastAreaDevices,areaList,selectBroIndex,areaInfo,querySysInstallPlaces,dataSuccess
     }
)
@withRouter
export default class TableBroadcast extends React.Component {
    constructor() {
      super()
      this.onExpand = this.onExpand.bind(this)
      this.state = {
        selectIndex: [],
        selectKeys:[]
      }
     this.toTree = this.toTree.bind(this)
    }
    componentDidMount(){
        this.props.areaList({roleId: localStorage.getItem('roleId')})
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
    areaChangeSelect(selectedRowKeys, selectedRows) {
      selectedRowKeys.forEach(id=>{
        //this.props.broadcastAreaDevices({areaId:record.id,type:4}) 需要一个多区域搜索的接口
      })
      this.setState({selectKeys:selectedRowKeys})
    }
    onExpand(expandedKeys, e) {
      if(e.expanded) {
        this.props.broadcastAreaDevices({areaId:e.node.props.eventKey,type:4})
      }
    }
    onCheck(checkedKeys) {
      const keys = checkedKeys.filter(key => key.length<5)
      this.props.treeSelectIndex(keys)
    }
    goLoc(device) {
      this.props.dataSuccess({goLocDeviceId: device.id})
      if(this.props.location.pathname !== '/home') {
        this.props.history.push('home')
      } 
      this.props.areaInfo({id:device.parentId})
      this.props.querySysInstallPlaces({areaId:device.parentId})
    }
    treeRender() {
      const data = this.props.area.areas_broDevices
      return (
        <Tree
        checkable={true}
        multiple={true}
        onExpand={this.onExpand}
        onCheck={this.onCheck.bind(this)}
        >
           {
            data.map(treenode=>(
              <TreeNode title={<span>
                <img className='type-icon' src={require('../../assets/imgs/area-icon.png')} alt=""/>
                {treenode.name}
                </span>} key={treenode.id}>
                {this.toTree(treenode.children)}
              </TreeNode>
            ))
           }
        </Tree>
      )
    }
    toTree(treenode) {
      if(treenode&&treenode.length>0) {
        return treenode.map(Tchildren => (
          <TreeNode title={<span>
            {!Tchildren.type?<img className='type-icon' src={require('../../assets/imgs/area-icon.png')} alt=""/>
            :<img className='type-icon' src={require('../../assets/imgs/broadcast-icon.png')} alt=""/>}
            {Tchildren.name}
            {
              Tchildren.type?<a onClick={this.goLoc.bind(this,Tchildren)} style={{marginLeft:'10px'}}><img width={15} src={require('../../assets/imgs/loc_icon.png')} alt='' /> </a>:
             null
            }
            
            </span>} key={Tchildren.type?Tchildren.index:Tchildren.id}>
            {this.toTree(Tchildren.children)}
          </TreeNode>
        ))
      }
    }
    render() {
        const data = this.props.area.areas_broDevices
        return ( 
                 <div className='tableAreaTree'>                    
                  {data?this.treeRender():null}
                 </div>   
        )
    }
}