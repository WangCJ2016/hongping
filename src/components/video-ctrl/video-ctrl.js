import React from 'react'
import { Tabs, Tree, Tooltip,Icon,Switch } from 'antd'
import { connect } from 'react-redux'
import {areaList1, uploadImg,areaInfo,selectAreaIdSuccess} from '../../redux/area.redux'
import VideoCtrlYuntai from './video-ctrl-yuntai'
import VideoCtrlYuzhizu from './video-ctrl-yuzhizu'
import VideoCtrlParam from './video-ctrl-params'
import VideoCtrlBtn from './video-ctrl-btns'
const TabPane = Tabs.TabPane;
const TreeNode = Tree.TreeNode;

@connect(
    state=>({deivces:state.devices,area:state.area}),
    {
        areaList1, uploadImg,areaInfo,selectAreaIdSuccess
     }
)
class VideoCtrl extends React.Component {
  state = {  }
  componentDidMount() {
    this.props.areaList1()
  }
  select() {}
  areaTreeRender() {
    const areas = this.props.area.areas
    const arealist = this.props.area.arealist
   return (
    <Tree
      onSelect={this.select.bind(this)}
      defaultExpandAll={true}
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
  setScreen(index) {
    console.log(this.play)
    this.play.XzVideo_SetRealPlayScreen(index);  
  }
  render() {
    const areas = this.props.area.areas
    return (
      <div className='video-ctrl clearfix'>
       <div className='float-left' style={{width:'70%'}}>
              <object   id="play"
              ref={(screen)=>this.play=screen}
              classid="clsid:A6871295-266E-4867-BE66-244E87E3C05E"
              codebase="./XzVideoWebClient.cab#version=1.0.0.1"
              width={800}
              height={600}
              align='center' 
              >
              </object>
          <VideoCtrlBtn setScreen={this.setScreen.bind(this)} />
       </div>
      <div className="ctrl-right float-right">
        <Tabs defaultActiveKey="2" type="card">
          <TabPane tab="设备" key="1">
           {areas.length>0?this.areaTreeRender():null}  
          </TabPane>
          <TabPane tab="预置位" key="2">
            <VideoCtrlYuzhizu />
          </TabPane>
        </Tabs>
        <Tabs defaultActiveKey="2" type="card">
          <TabPane tab="云台" key="1">
            <VideoCtrlYuntai />
          </TabPane>
          <TabPane tab="参数" key="2">
            <VideoCtrlParam />
          </TabPane>
        </Tabs>
      </div>
      </div>
    )
  }
}

export default VideoCtrl