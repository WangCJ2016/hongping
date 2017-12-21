import React from 'react'
import { Tree } from 'antd'
import SettingVideoChannelDetail from '../setting-video-channelDetail/setting-video-channelDetail'
const TreeNode = Tree.TreeNode;

class SettingVideoChannel extends React.Component {
  state = {  }
  render() {
    return (
      <div>
      <div className="setting-user-role setting-video-device  float-left">
         <div className="title role">区域</div>
         <Tree
            checkable
            defaultExpandedKeys={['0-0-0', '0-0-1']}
            defaultSelectedKeys={['0-0-0', '0-0-1']}
            defaultCheckedKeys={['0-0-0', '0-0-1']}
            onSelect={this.onSelect}
            onCheck={this.onCheck}
          >
            <TreeNode title="XX区域" key="0-0">
              <TreeNode title="洞室" key="0-0-0" disabled>
                <TreeNode title="洞室1" key="0-0-0-0" disableCheckbox />
                <TreeNode title="洞室2" key="0-0-0-1" />
              </TreeNode>
              <TreeNode title="水库" key="0-0-1">
                <TreeNode title={<span style={{ color: '#08c' }}>水库1</span>} key="0-0-1-0" />
              </TreeNode>
            </TreeNode>
          </Tree>
          
      </div>
      <SettingVideoChannelDetail />
    </div>
    )
  }
}

export default SettingVideoChannel