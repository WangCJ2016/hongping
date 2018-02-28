import React from 'react'
import { Tree, Icon } from 'antd';
import { connect } from 'react-redux'
import {broadcastAreaDevices,areaList} from '../../redux/area.redux'
import { selectBroIndex } from '../../redux/broadcast.redux'
import { unquie } from '../../utils'

const TreeNode = Tree.TreeNode;

@connect(
    state=>({video:state.video,area:state.area,broadcast:state.broadcast}),
    {
      broadcastAreaDevices,areaList,selectBroIndex
     }
)
export default class TableBroadcast extends React.Component {
    constructor() {
      super()
      this.onExpand = this.onExpand.bind(this)
      this.state = {
        selectIndex: [],
        selectKeys:['0b6d2ac417844ee3829833eccf931ff4']
      }
     this.toTree = this.toTree.bind(this)
    }
    componentDidMount(){
        this.props.areaList()
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
      console.log(expandedKeys,e)
      if(e.expanded) {
        this.props.broadcastAreaDevices({areaId:e.node.props.eventKey,type:4})
      }
    }
    onCheck(checkedKeys) {
      console.log(checkedKeys)
    }
    treeRender() {
      const data = this.props.area.areas_broDevices
      return (
        <Tree
        checkable={true}
        multiple={true}
        onExpand={this.onExpand}
        onCheck={this.onCheck}
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
            <Icon type='loc' />
            </span>} key={Tchildren.id}>
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