import React from 'react'
import { Icon,Modal,Form,Input,Table,Popconfirm } from 'antd'
import { connect } from 'react-redux'
import { uploadFile,delFile } from '../../redux/document.redux'
import FileSaver from 'file-saver'
import base64 from 'base-64'

const FormItem = Form.Item

@connect(
  state => ({document: state.document}),
  {
    uploadFile,delFile
  }
)
class FilesList1 extends React.Component {
  constructor() {
    super()
    this.state = {
      addVisible: false
    }
    this.onChange = this.onChange.bind(this)
    this.delHandle = this.delHandle.bind(this)
  }
 
  onChange(info) {
    const file = info.target.files[0]
    var reader = new FileReader(); //新建FileReader对象
    reader.readAsDataURL(file); 
    const that = this
    reader.onloadend = function() {
      that.props.uploadFile({
          title:file.name,
          categoryId:that.props.document.selectCategoryId,
          content: this.result
        })
    }
  }
  delHandle(id) {
    this.props.delFile({id: id,categoryId:this.props.document.selectCategoryId,})
  }
  downloadFile(fileName, content){
    var arr = content.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    } 
    FileSaver.saveAs(new Blob([u8arr], { type: mime }),fileName);
  }
  render() {
    const columns = [{
      title: 'title',
      dataIndex: 'title',
      key: 'title',
      width:'50%',
      render:(text,record)=>(
        <span>
          <Icon type="file" />
          <span style={{marginLeft:'5px'}}>{record.title}</span>
        </span>
      )
     },{
      title: 'action',
      dataIndex: 'action',
      key: 'action',
      width:'50%',
      render: (text, record) => (
        <span>
            <a  onClick={()=>this.downloadFile(record.title,record.content)}><Icon type='download'></Icon>下载</a>
            <Popconfirm onConfirm={this.delHandle.bind(this,record.id)} title="确定删除？"  okText="确定" cancelText="取消">
              <a style={{marginLeft:'15px'}}><Icon type='delete'></Icon>删除</a>
            </Popconfirm>
            
        </span>
      )
    }]
    const { getFieldDecorator } = this.props.form
    return (
      <div>
       <div className="title role">文件
         {
          this.props.document.selectCategoryId?
          <div className='abosulte'>
            <Icon type='plus'/>
            <input type="file" onChange={this.onChange} className='inputfile'/>
          </div>
          :null
         }  
          </div>
        <Table 
          columns={columns}
          size='small'
          showHeader={false}
          rowKey={(record)=>record.id}
          dataSource={this.props.document.filesList}
          ></Table>
          <img src={this.state.blob||""} alt=""/>
        <Modal
          title="添加文件" 
          visible={this.state.addVisible}
          style={{ top: 200 }}
          width='50%'
          okText='确定'
          cancelText='取消'
         
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

const FilesList = Form.create()(FilesList1)
export default FilesList


