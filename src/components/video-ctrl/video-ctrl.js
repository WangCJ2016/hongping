import React from 'react'
import { Tabs, Tree, Tooltip,Icon,Switch } from 'antd'
import { connect } from 'react-redux'
import {areaList1, uploadImg,areaInfo,selectAreaIdSuccess} from '../../redux/area.redux'
import VideoCtrlYuntai from './video-ctrl-yuntai'
import VideoCtrlYuzhizu from './video-ctrl-yuzhizu'
import VideoCtrlParam from './video-ctrl-params'
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
  render() {
    const areas = this.props.area.areas
    return (
      <div className='video-ctrl clearfix'>
       <div className='float-left' style={{width:'70%'}}>
        <div className="video-widget">
        </div>
        <div className="controls clearfix">
          <div className='float-left'>
              <Tooltip title="声音">
                <img src={require('../../assets/imgs/video-v.png')} alt=""/>
              </Tooltip>
              <Tooltip title="录像">
                <img src={require('../../assets/imgs/video-record.png')} alt=""/>
              </Tooltip>
              <Tooltip title="抓图">
                <img src={require('../../assets/imgs/capture_off.png')} alt=""/>
              </Tooltip>
              <Tooltip title="全屏">
                <img src={require('../../assets/imgs/video_full.png')} alt=""/>
              </Tooltip>
              <div className="controls-btn"><Icon type="poweroff" />关闭通道</div>
              <div className="controls-btn"><Icon type="plus" />添加预置位</div>
              <Switch checkedChildren={'开闸'} unCheckedChildren={'关闸'} />
          </div>
        </div>
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