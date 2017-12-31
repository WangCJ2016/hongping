import React from 'react'
import { Tree, Collapse } from 'antd';
import { connect } from 'react-redux'
import {areaList1, uploadImg,areaInfo,selectAreaIdSuccess} from '../../redux/area.redux'
const TreeNode = Tree.TreeNode;
const Panel = Collapse.Panel

@connect(
    state=>({deivces:state.devices,area:state.area}),
    {
        areaList1, uploadImg,areaInfo,selectAreaIdSuccess
     }
)
export default class AreaTree extends React.Component {
    componentDidMount(){
        this.props.areaList1()
    }
    areaTreeRender() {
        const areas = this.props.area.areas
        const arealist = this.props.area.arealist
       return (
        <Tree
          defaultSelectedKeys={[areas[0].id]}
          onSelect={this.props.select}
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
           
                 <div className='map-area'>
                    <Collapse defaultActiveKey={['1']}>
                        <Panel header="区域" key="1">
                            {areas.length>0?this.areaTreeRender():null}  
                        </Panel>
                    </Collapse>
                 </div>
          
        )
    }
}