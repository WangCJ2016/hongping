import React from 'react'
import { Icon,Tree,Modal,Form,Input,Popconfirm } from 'antd'
import { connect } from 'react-redux'
import { levelTopCategorys,addCategorys,dataSuccess,filesList,modifyCategory } from '../../redux/document.redux'
const TreeNode = Tree.TreeNode;
const FormItem = Form.Item

@connect(
  state=> ({document: state.document}),
  {
    levelTopCategorys,addCategorys,dataSuccess,filesList,modifyCategory
  }
)
class Category1 extends React.Component {
  constructor() {
    super()
    this.state = {
      addVisible: false,
      levelTopIf: false,
      selectedKeys: [],
      selectCategoryName:'',
      editVisible: false
    }
    this.addSubmit = this.addSubmit.bind(this)
    this.treeSelect = this.treeSelect.bind(this)
    this.editSubmit = this.editSubmit.bind(this)
  }
  componentDidMount() {
    this.props.levelTopCategorys()
  }
  treeSelect(selectedKeys, e) {
    if(e.selected) {
      this.props.dataSuccess({selectCategoryId: selectedKeys[0]})
      this.props.filesList({categoryId: selectedKeys[0]})
      this.setState({
        selectCategoryId: selectedKeys[0]
      })
    }
  }
  treeRender() {
    const categorysTree = this.props.document.categorysTree
    return (
      <Tree
        multiple={false}
        onSelect={this.treeSelect}
        >
         {
          categorysTree.map(treenode=>(
            <TreeNode title={<span>
              <Icon style={{marginRight:'5px'}} type="folder" />
              {treenode.category}
              <span style={{float:'right'}}>
                <a style={{marginLeft:'100px'}} onClick={()=>this.setState({editVisible:true,selectCategoryName:treenode.category})} ><Icon type='edit'/>编辑</a>
                <a style={{marginLeft:'10px'}}  onClick={()=>this.setState({addVisible:true,parentId:treenode.id,levelTopIf:false,level:treenode.level})}><Icon type='plus'/>添加下级目录</a>
                <Popconfirm onConfirm={this.delHandle.bind(this,treenode.id)} title="确定删除？"  okText="确定" cancelText="取消">
                  <a style={{marginLeft:'10px'}}><Icon type='delete'/>删除</a> 
                </Popconfirm> 
              </span>   
              </span>} key={treenode.id}>
              {this.toTree(treenode.children)}
            </TreeNode>
          ))
         }
      </Tree>
    )
  }
  toTree(treenode) {
    if(treenode&&treenode.length>0) {
      return treenode.map(Tchildren => (
        <TreeNode title={<span>
            <Icon type="folder" />
          {Tchildren.category}
          <span style={{float:'right'}}>
            <a style={{marginLeft:'100px'}} onClick={()=>this.setState({editVisible:true,selectCategoryName:Tchildren.category})}><Icon type='edit'/>编辑</a>
            <a style={{marginLeft:'10px'}} onClick={()=>this.setState({addVisible:true,parentId:Tchildren.id,levelTopIf:false,level:Tchildren.level})}><Icon type='plus'/>添加下级目录</a>
            <Popconfirm onConfirm={this.delHandle.bind(this,Tchildren.id)} title="确定删除？"  okText="确定" cancelText="取消">
              <a style={{marginLeft:'10px'}}><Icon type='delete'/>删除</a> 
            </Popconfirm> 
          </span>   
          </span>} key={Tchildren.id}>
          {this.toTree(Tchildren.children)}
        </TreeNode>
      ))
    }
  }
  delHandle(id) {
     this.props.modifyCategory({id:id,isDelete:1})
  }
  addSubmit() {
    this.props.form.validateFields(['addName'],(err,values)=>{
      if(!err) {
        if(this.state.levelTopIf) {
          this.props.addCategorys({category: encodeURI(values.addName)})
        }else{
          this.props.addCategorys({category: encodeURI(values.addName),parentId: this.state.parentId,level:this.state.level+1})
        }
        this.setState({
          addVisible: false
        })
        this.props.form.resetFields();
      }
    })
  }
  editSubmit() {
    this.props.form.validateFields(['editName'],(err,values)=>{
      if(!err) {
        this.props.modifyCategory({category: encodeURI(values.editName),id:  this.state.selectCategoryId})
        this.setState({
          editVisible: false
        })
        this.props.form.resetFields();
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div>
        <div className="title role">目录
          <div className='abosulte' onClick={()=>this.setState({addVisible:true,levelTopIf:true})}>
            <Icon type='plus'/></div>
        </div>
        {this.treeRender()}
        <Modal
          title="添加下级目录" 
          visible={this.state.addVisible}
          style={{ top: 200 }}
          width='50%'
          okText='确定'
          cancelText='取消'
          onOk={this.addSubmit.bind(this)}
          onCancel={()=>{this.setState({addVisible:false});this.props.form.resetFields();}}
          >
          <Form layout='inline'>
            <FormItem label="名称">
              {getFieldDecorator('addName',{
                rules: [{ required: true,message: '请填写名称'  }],
              })(<Input type="text" />)}
            </FormItem>
          </Form>
        </Modal>

        <Modal
          title="编辑目录" 
          visible={this.state.editVisible}
          style={{ top: 200 }}
          width='50%'
          okText='确定'
          cancelText='取消'
          onOk={this.editSubmit.bind(this)}
          onCancel={()=>{this.setState({editVisible:false});this.props.form.resetFields();}}
          >
          <Form layout='inline'>
            <FormItem label="名称">
              {getFieldDecorator('editName',{
                initialValue: this.state.selectCategoryName?this.state.selectCategoryName:'',
                rules: [{ required: true,message: '请填写名称'  }],
              })(<Input type="text" />)}
            </FormItem>
          </Form>
        </Modal>
      </div>
    )
  }
}
const Category = Form.create()(Category1);
export default Category