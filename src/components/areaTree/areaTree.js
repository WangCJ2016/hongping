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
    componentDidMount(){
        this.props.areaList()
    }
    componentDidUpdate(prevProps, prevState) {
      if(this.props.area.areas&&this.props.area.areas[0]&&!this.firstRenderIf) {
        this.props.select({areaId:this.props.area.areas[0].id,type:1})
        this.firstRenderIf = true
      }
     
    }
    select(e) {
      this.props.select({areaId:e[0],type:1})
    }
    areaTreeRender() {
        const areas = this.props.area.areas
        const arealist = this.props.area.allAreas
        
       return (
        <Tree
          checkable={this.props.checkable}
          defaultSelectedKeys={[areas[0].id]}
          onSelect={this.select.bind(this)}
          defaultExpandAll={this.props.defaultExpandAll}
          >
          { areas.map((level1,index) => {
            return (
              <TreeNode title={level1.name} key={level1.id}>
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
              <TreeNode key={child.id} title={child.name} >
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