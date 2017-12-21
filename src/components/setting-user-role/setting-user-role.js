import React from 'react'
import { Icon, Modal, Input, Tabs, Tree, Popconfirm } from 'antd'
const TabPane = Tabs.TabPane;
const TreeNode = Tree.TreeNode;

class SettingUserRole extends React.Component {
  state = { 
    createRoleVisible: false,
    roleSetVisible: false
   }
  createRoleSubmit() {}
  render() {
    return (
      <div className="setting-user-role float-left">
          <div className="title role">角色<div className='abosulte' onClick={()=>this.setState({createRoleVisible:true})}><Icon type='plus'/></div></div>
          <div className="role">
            超级管理员
            <div className='abosulte'>
              <Icon type='edit' />
              <Icon type='setting' onClick={()=>this.setState({roleSetVisible: true})}/>
              <Popconfirm title="确定删除？"  okText="确定" cancelText="取消">
               <Icon type='delete'/>
              </Popconfirm>
            </div>
          </div>
          <div className="role">
            普通成员
            <div className='abosulte'>
              <Icon type='edit'/>
              <Icon type='setting'/>
              <Icon type='delete'/>
            </div>
          </div>
          {/* 新建角色modal */} 
          <Modal title="新建角色" 
            visible={this.state.createRoleVisible}
            style={{ top: 200 }}
            width='50%'
            okText='确定'
            cancelText='取消'
            wrapClassName='createRoleModal'
            onOk={this.createRoleSubmit.bind(this)}
            onCancel={()=>this.setState({createRoleVisible:false})}
            >
            <span className='title'>角色</span><Input className='input' />
          </Modal>
          {/* 角色设置modal */} 
          <Modal title="超级管理员设置" 
            visible={this.state.roleSetVisible}
            style={{ top: 200 }}
            width='50%'
            okText='保存'
            cancelText='取消'
            wrapClassName='roleSetModal'
            onOk={this.createRoleSubmit.bind(this)}
            onCancel={()=>this.setState({roleSetVisible:false})}
            >
            <Tabs tabPosition='left' defaultActiveKey="1" >
              <TabPane tab="区域" key="1">
                <Tree
                  checkable
                  onSelect={this.onSelect}
                  onCheck={this.onCheck}
                >
                  <TreeNode title="xx区域" key="0-0">
                    <TreeNode title="洞室" key="0-0-0" >
                      <TreeNode title="洞室1" key="0-0-0-0"  />
                      <TreeNode title="洞室2" key="0-0-0-1" />
                    </TreeNode>
                    <TreeNode title="水库" key="0-0-1">
                      <TreeNode title={<span style={{ color: '#08c' }}>水库1</span>} key="0-0-1-0" />
                    </TreeNode>
                  </TreeNode>
                </Tree>
              </TabPane>
              <TabPane tab="功能" key="2">
              <Tree
                  checkable
                  onSelect={this.onSelect}
                  onCheck={this.onCheck}
                >
                  <TreeNode title="首页" key="0-0">
                    <TreeNode title="警报接受" key="0-1"  />
                    <TreeNode title="搜索人员、定位、轨迹" key="0-2" />
                    <TreeNode title="搜索摄像头、定位" key="0-3" />
                    <TreeNode title="搜索广播" key="0-4" />
                  </TreeNode>
                  <TreeNode title="报警(统计分析&综合查询)" key="1-0"  />
                  <TreeNode title="人员(统计分析&综合查询)" key="2-0"  />
                  <TreeNode title="车辆(统计分析&综合查询)" key="3-0"  />
                  <TreeNode title="广播(统计分析&综合查询)" key="4-0"  />
                  <TreeNode title="巡更(统计分析&综合查询)" key="5-0"  />
                  <TreeNode title="系统设置" key="6-0">
                    <TreeNode title="区域管理" key="6-1"  />
                    <TreeNode title="人员管理" key="6-2" />
                    <TreeNode title="视频监控配置" key="6-3" />
                    <TreeNode title="其他子系统配置" key="6-4" />
                    <TreeNode title="地图配置" key="6-5" />
                  </TreeNode>
              </Tree>
              </TabPane>
          </Tabs>
          </Modal>
        </div>
    )
  }
}

export default SettingUserRole