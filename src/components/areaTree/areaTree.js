import React from 'react'
import { Tree } from 'antd';
import { connect } from 'react-redux'
import {areaList, uploadImg,areaInfo,selectAreaIdSuccess} from '../../redux/area.redux'
const TreeNode = Tree.TreeNode;


@connect(
    state=>({deivces:state.devices,area:state.area}),
    {
        areaList, uploadImg,areaInfo,selectAreaIdSuccess
     }
)
export default class AreaTree extends React.Component {
    firstRenderIf=false 
    state = {
      selectKey: []
    }
    componentDidMount(){
        this.props.areaList({roleId: localStorage.getItem('roleId')})
    }
 
    select(e) {
      if(e.length>0) {
        this.setState({selectKey: e})
        this.props.select({areaId:e[0],type:1})
      }
    }
    treeNodeRend(name) {
     return <span>
      <img className='type-icon' src={require('../../assets/imgs/area-icon.png')} alt=""/>
      {name}
      </span>
    }
    areaTreeRender() {
        const areas = this.props.area.areas
        const arealist = this.props.area.allAreas
       return (
        <Tree
          checkable={this.props.checkable}
          selectedKeys={this.state.selectKey}
          onSelect={this.select.bind(this)}
          defaultExpandAll={this.props.defaultExpandAll}
          >
          { areas.map((level1,index) => {
            return (
              <TreeNode title={<span>
                <img className='type-icon' src={require('../../assets/imgs/area-icon.png')} alt=""/>
                {level1.name}
                </span>} key={level1.id}>
                {toTree(level1.id,arealist)}
              </TreeNode>
            )
          })}
        </Tree>
       )
        function toTree(id, array) {
          const childArr = childrenArr(id, array)
          if(childArr.length > 0) {
            return childArr.map((child,index) => (
              <TreeNode key={child.id} title={<span>
                <img className='type-icon' src={require('../../assets/imgs/area-icon.png')} alt=""/>
                {child.name}
                </span>} >
                {toTree(child.id, array)}
              </TreeNode>
            ))
          }
        }
        function childrenArr(id, array) {
          var newArry = []
          for (var i in array) {
              if (array[i].parentId === id)
                  newArry.push(array[i]);
          }
          return newArry;
        }
    }
   
    render() {
        const areas = this.props.area.areas
        return ( 
                 <div>                    
                      {areas.length>0?this.areaTreeRender():null}  
                 </div>   
        )
    }
}