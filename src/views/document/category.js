import React from 'react'
import { Icon,Tree,Modal,Form,Input } from 'antd'
import { connect } from 'react-redux'
import { levelTopCategorys,addCategorys,dataSuccess,filesList } from '../../redux/document.redux'
const TreeNode = Tree.TreeNode;
const FormItem = Form.Item

@connect(
  state=> ({document: state.document}),
  {
    levelTopCategorys,addCategorys,dataSuccess,filesList
  }
)
class Category1 extends React.Component {
  constructor() {
    super()
    this.state = {
      addVisible: false,
      levelTopIf: false,
      selectedKeys: []
    }
    this.addSubmit = this.addSubmit.bind(this)
    this.treeSelect = this.treeSelect.bind(this)
  }
  componentDidMount() {
    this.props.levelTopCategorys()
  }
  treeSelect(selectedKeys, e) {
    
    if(e.selected) {
      this.setState({
        selectedKeys: [selectedKeys[selectedKeys.length-1]]
      },()=>{
        this.props.dataSuccess({selectCategoryId: this.state.selectedKeys[0]})
        this.props.filesList({categoryId: this.state.selectedKeys[0]})
      })
    }
  }
  treeRender() {
    const levelTopCategorys = this.props.document.levelTopCategorys
    return (
      <Tree
      checkable={true}
      multiple={true}
      checkStrictly={true}
      selectedKeys={this.state.selectedKeys}
      onSelect={this.treeSelect}
      >
         {
          levelTopCategorys.map(treenode=>(
            <TreeNode title={<span>
              {treenode.category} 
              <span style={{float:'right'}}>
                <a style={{marginLeft:'100px'}}><Icon type='edit'/>编辑</a>
                <a style={{marginLeft:'10px'}}><Icon type='plus'/>添加下级目录</a>
                <a style={{marginLeft:'10px'}}><Icon type='delete'/>删除</a> 
              </span>   
              </span>} key={treenode.id}>
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
          {!Tchildren.type?<img className='type-icon' src={require('../../assets/imgs/area-icon.png')} alt=""/>
          :<img className='type-icon' src={require('../../assets/imgs/broadcast-icon.png')} alt=""/>}
          {Tchildren.name}
          {
            Tchildren.type?<a onClick={this.goLoc.bind(this,Tchildren.parentId)} style={{marginLeft:'10px'}}><img width={15} src={require('../../assets/imgs/loc_icon.png')} alt='' /> </a>:
           null
          }
          
          </span>} key={Tchildren.type?Tchildren.index:Tchildren.id}>
          {this.toTree(Tchildren.children)}
        </TreeNode>
      ))
    }
  }
  addSubmit() {
    this.props.form.validateFields(['addName'],(err,values)=>{
      if(!err) {
        if(this.state.levelTopIf) {
          this.props.addCategorys({category: encodeURI(values.addName)})
          this.setState({
            addVisible: false
          })
        }
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
          onCancel={()=>this.setState({addVisible:false})}
          >
          <Form layout='inline'>
            <FormItem label="名称">
              {getFieldDecorator('addName',{
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