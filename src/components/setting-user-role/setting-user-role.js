import React from 'react'
import { Icon, Modal, Input, Tabs, Tree, Popconfirm, Form } from 'antd'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { role_queryAreas, rolesList, modifyRole, createRole } from '../../redux/role.redux'
const TabPane = Tabs.TabPane;
const TreeNode = Tree.TreeNode;
const FormItem = Form.Item;

@connect(
  state=>state.role,
  {role_queryAreas, rolesList, modifyRole, createRole}
)
class SettingUserRole1 extends React.Component {
  state = { 
    createRoleVisible: false,
    roleSetVisible: false,
    roleEditVisible: false,
    selectRoleIndex: 0
   }
  componentDidMount() {
    this.props.rolesList()
  }
  editRole(index) {
    this.setState({
      roleEditVisible: true,
      selectRoleIndex: index
    })
  }
  delete() {
    const roles = this.props.roles
    this.props.modifyRole({id: roles[this.state.selectRoleIndex].id, isDelete: 1})
  }
  setRole(index) {
    this.setState({
      roleSetVisible: true,
      selectRoleIndex: index
    })
  }
  roleRender() {
    const roles = this.props.roles
    return roles.map((role, index)=> {
      const style = classnames({
        role: true,
        role_selected: this.state.selectRoleIndex === index
      })
      return (
        <div className={style} key={role.id} onClick={()=>this.setState({selectRoleIndex:index})}>
            {role.name}
            <div className='abosulte' >
              <Icon type='edit' onClick={this.editRole.bind(this,index)}/>
              <Icon type='setting' onClick={this.setRole.bind(this,index)}/>
              <Popconfirm onConfirm={this.delete.bind(this)} title="确定删除？"  okText="确定" cancelText="取消">
               <Icon type='delete'/>
              </Popconfirm>
            </div>
          </div>
      )
    })
  }
  // 修改角色名字
  editRoleSubmit() {
    const roles = this.props.roles
    const roleName = this.props.form.getFieldValue('roleName')
    this.props.modifyRole({id: roles[this.state.selectRoleIndex].id, roleName: encodeURI(roleName)})
    this.setState({roleEditVisible: false})
  }
 // 新增信息
  createRoleSubmit() {
    const roleName = this.props.form.getFieldValue('createName')
    this.props.createRole({roleName: encodeURI(roleName)})
    this.setState({createRoleVisible: false})
  }
  render() {
    
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="setting-user-role float-left">
          <div className="title role">角色<div className='abosulte' onClick={()=>this.setState({createRoleVisible:true})}><Icon type='plus'/></div></div>
          {this.props.roles.length>0?this.roleRender():null}
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
            ><Form>
            <FormItem>
              {getFieldDecorator('createName', {
                initialValue:this.props.roles[this.state.selectRoleIndex]?this.props.roles[this.state.selectRoleIndex].name:''
              })(
                <div><span className='title'>角色</span><Input className='input' placeholder='请填写角色名称'/></div>
              )}
            </FormItem>
            </Form>
            
          </Modal>
          <Modal title="修改名称" 
            visible={this.state.roleEditVisible}
            style={{ top: 200 }}
            width='50%'
            okText='保存'
            cancelText='取消'
            onOk={this.editRoleSubmit.bind(this)}
            onCancel={()=>this.setState({roleEditVisible:false})}
            >
            <Form>
              <FormItem>
                {getFieldDecorator('roleName', {
                  initialValue:this.props.roles[this.state.selectRoleIndex]?this.props.roles[this.state.selectRoleIndex].name:''
                })(
                  <Input  
                  /> 
                )}
              </FormItem>
            </Form>
            
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
const SettingUserRole = Form.create()(SettingUserRole1);

export default SettingUserRole