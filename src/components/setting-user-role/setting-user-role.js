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
         accountList,dataSuccess } from '../../redux/role.redux'
import {areaList} from '../../redux/area.redux'
const TabPane = Tabs.TabPane;
const TreeNode = Tree.TreeNode;
const FormItem = Form.Item;

@connect(
  state=>({role:state.role,area:state.area,user:state.user}),
  {role_queryAreas, 
   rolesList, 
   modifyRole, 
   createRole, 
   role_roleInfo,
   areaList, 
   authorityList,
   accountList,
   dataSuccess}
)
class SettingUserRole1 extends React.Component {
  constructor() {
    super()
    this.state = { 
      createRoleVisible: false,
      roleSetVisible: false,
      roleEditVisible: false,
      selectRoleIndex: -1,
      roleInfo:{},
      checkedKeys:[]
     }
    this.onCheck = this.onCheck.bind(this)
    this.tabRender = this.tabRender.bind(this)
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
      this.props.dataSuccess({roleInfo:{}})
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

  // 菜单权限设置
  onCheck(checkedKeys){
    this.setState({
      checkedKeys:checkedKeys
    })
  }
  setAuthoritySubmit(){
    this.props.modifyRole({id: this.props.role.roles[this.state.selectRoleIndex].id,resourceIds:this.state.checkedKeys.join(',')})
    this.setState({
      roleSetVisible: false,
    })
  }
  Cancel() {
    this.setState({roleSetVisible:false})
  }
  tabRender(defaultCheckedKeys) {
    defaultCheckedKeys=defaultCheckedKeys?defaultCheckedKeys:[]
    return  <Tabs tabPosition='left' defaultActiveKey="1" >
    <TabPane tab="功能" key="1">
    <Tree
        checkable
        onCheck={this.onCheck}
        defaultCheckedKeys={defaultCheckedKeys}
      >
        <TreeNode title="应急中心" key="4" />
        <TreeNode title="视频监控" key="7" >
          <TreeNode title="视频监控" key="5"  />
          <TreeNode title="录像回放" key="6" />
        </TreeNode>
        <TreeNode title="巡更管理" key="11" >
          <TreeNode title="巡更任务" key="8"  />
          <TreeNode title="巡更上传" key="9" />
          <TreeNode title="巡更历史" key="10" />
        </TreeNode>
        <TreeNode title="实时状态" key="17"  >
          <TreeNode title="服务器" key="12"  />
          <TreeNode title="视频主机" key="13" />
          <TreeNode title="视频通道" key="14" />
          <TreeNode title="人员基站" key="15" />
          <TreeNode title="广播服务" key="16" />
        </TreeNode>
        <TreeNode title="历史分析" key="18"  />
        <TreeNode title="个人设置" key="19"  />
        <TreeNode title="系统设置" key="24">
          <TreeNode title="区域管理" key="20"  />
          <TreeNode title="用户&角色" key="21" />
          <TreeNode title="设备配置" key="22" />
          <TreeNode title="地图设置" key="23" />
        </TreeNode>
    </Tree>
    </TabPane>
  </Tabs>
  }
  render() {
    const { getFieldDecorator } = this.props.form;
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
            {
              this.state.roleSetVisible&&(this.props.role.roleInfo.roleResources||this.props.role.roleInfo.roleResources===null)?
              this.tabRender(this.props.role.roleInfo.roleResources)
              :null
            }
           
          </Modal>
        </div>
    )
  }
}
const SettingUserRole = Form.create()(SettingUserRole1);

export default SettingUserRole