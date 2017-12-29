import React from 'react'
import { Icon, Modal, Input, Tabs, Tree, Popconfirm, Form } from 'antd'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { role_queryAreas, 
         rolesList, 
         modifyRole,
         createRole,
         role_roleInfo,
         authorityList,
         accountList } from '../../redux/role.redux'
import {areaList, juniorArea} from '../../redux/area.redux'
const TabPane = Tabs.TabPane;
const TreeNode = Tree.TreeNode;
const FormItem = Form.Item;

@connect(
  state=>({role:state.role,area:state.area}),
  {role_queryAreas, 
   rolesList, 
   modifyRole, 
   createRole, 
   role_roleInfo,areaList, 
   juniorArea, 
   authorityList,
   accountList}
)
class SettingUserRole1 extends React.Component {
  state = { 
    createRoleVisible: false,
    roleSetVisible: false,
    roleEditVisible: false,
    selectRoleIndex: -1,
    areaAuthority: [],
    roleInfo:{}
   }
  componentDidMount() {
    this.props.rolesList()
    if(this.props.area.areas.length===0) {
      this.props.areaList()
    }
  }
  changeRole(index,id) {
    this.setState({selectRoleIndex:index},function() {
      this.props.accountList({roleId: id})
      this.props.role_roleInfo({id:id})
    })
  }
  // 打开编辑modal
  editRole(index) {
    this.setState({
      roleEditVisible: true,
      selectRoleIndex: index
    })
  }
  // 删除角色
  delete() {
    const roles = this.props.role.roles
    this.props.modifyRole({id: roles[this.state.selectRoleIndex].id, isDelete: 1})
  }
  // 打开设置modal
  setRole(index,id) {
      this.props.authorityList()
      this.setState({
        roleSetVisible: true,
        selectRoleIndex: index
      })
  }
  // 角色渲染
  roleRender() {
    const roles = this.props.role.roles
    return roles.map((role, index)=> {
      const style = classnames({
        role: true,
        role_selected: this.state.selectRoleIndex === index
      })
      return (
        <div className={style} key={role.id} onClick={this.changeRole.bind(this,index,role.id)}>
            {role.name}
            <div className='abosulte' >
              <Icon type='edit' onClick={this.editRole.bind(this,index)}/>
              <Icon type='setting' onClick={this.setRole.bind(this,index,role.id)}/>
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
    const roles = this.props.role.roles
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
  // 渲染区域树
  areaTreeRender(defaultKeys) {
    const areas = this.props.area.areas
    const arealist = this.props.area.arealist
   return (
            <Tree
                checkable
                defaultCheckedKeys={defaultKeys}
                defaultExpandAll={true}
                onCheck={this.onAreaCheck.bind(this)}
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
  // 区域权限设置
  onAreaCheck(checkedKeys,e){
    this.setState({
      areaAuthority: checkedKeys
    })
  }
  setAuthoritySubmit(){
    if(this.state.areaAuthority.length>0) {
      this.props.modifyRole({areaIds:this.state.areaAuthority.join(','),id: this.props.role.roles[this.state.selectRoleIndex].id})
    }
    this.setState({
      roleSetVisible: false,
      areaAuthority: []
    })
  }
  Cancel() {
    this.setState({roleSetVisible:false})
  }
  render() {
    const areas = this.props.area.areas
    const { getFieldDecorator } = this.props.form;
    const defaultKeys =  this.props.role.roleInfo.roleAreaId?this.props.role.roleInfo.roleAreaId:[]
    console.log(this.props.role)
    return (
      <div className="setting-user-role float-left">
          <div className="title role">角色<div className='abosulte' onClick={()=>this.setState({createRoleVisible:true})}><Icon type='plus'/></div></div>
          {this.props.role.roles.length>0?this.roleRender():null}
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
                initialValue:this.props.role.roles[this.state.selectRoleIndex]?this.props.role.roles[this.state.selectRoleIndex].name:''
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
                  initialValue:this.props.role.roles[this.state.selectRoleIndex]?this.props.role.roles[this.state.selectRoleIndex].name:''
                })(
                  <Input  
                  /> 
                )}
              </FormItem>
            </Form>
            
          </Modal>
          {/* 角色设置modal */} 
          <Modal title={this.props.role.roleInfo.name+'权限设置'} 
            visible={this.state.roleSetVisible}
            style={{ top: 200 }}
            width='50%'
            okText='保存'
            cancelText='取消'
            wrapClassName='roleSetModal'
            onOk={this.setAuthoritySubmit.bind(this)}
            onCancel={this.Cancel.bind(this)}
            >
            <Tabs tabPosition='left' defaultActiveKey="1" >
              <TabPane tab="区域" key="1">
              {areas.length>0?this.areaTreeRender(defaultKeys):null}
              </TabPane>
              <TabPane tab="功能" key="2">
              <Tree
                  checkable
                  onSelect={this.onSelect}
                  onCheck={this.onCheck}
                >
                  <TreeNode title="首页" key="fsfdsf">
                    <TreeNode title="警报接受" key='daads'  />
                    <TreeNode title="搜索人员、定位、轨迹" key="dffa" />
                    <TreeNode title="搜索摄像头、定位" key="fsaff" />
                    <TreeNode title="搜索广播" key="0a" />
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