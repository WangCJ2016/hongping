import React from 'react'
import { Icon, Table, Modal, Form, Input,Transfer } from 'antd'
const FormItem = Form.Item


const data = [{
  key:1,
  name: '区域1',
  children:[{
    key:2,
    name: '通道1',
  }]
}]

const mockData = [];
for (let i = 0; i < 20; i++) {
  mockData.push({
    key: i.toString(),
    title: `content${i + 1}`,
    description: `description of content${i + 1}`,
    disabled: i % 3 < 1,
    children:[{
      key:i.toString()+2,
      title: `content${i + 1}`,
      description: `description of content${i + 1}`,
    }]
  });
}
class VideoCtrlYuzhizu1 extends React.Component {
  state = { 
    visible:false,
    yulanvisible:false
   }
  submit() {}
  render() {
    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '75%',
    }, {
      title: 'action',
      key: 'action',
      width: '25%',
      render: (text,record) => (
        <span>
          <Icon type='edit' onClick={()=>this.setState({visible:true})}/>
          <Icon type='delete'/>
        </span>
      )
    }];
    const { getFieldDecorator } = this.props.form;
    return (
        <div className='yuzhiwei'>
            <div className="add-group" onClick={()=>this.setState({yulanvisible:true})}>
              <Icon type='plus'/>添加预览组
            </div>
            <Table columns={columns}  dataSource={data} pagination={false} showHeader={false} />
           
            {/*添加预览组*/}
            <Modal title="设置预览组"
              visible={this.state.yulanvisible}
              style={{ top: 200 }}
              width='50%'
              okText='保存'
              cancelText='取消'
              onOk={this.submit.bind(this)}
              onCancel={()=>this.setState({yulanvisible:false})}
              >
              <Form layout='inline'>
                <FormItem label="预置位名称">
                  {getFieldDecorator('name',{
                    rules: [{ required: true,message: '请输入预置位名称'}],
                    // initialValue:selectChannel?selectChannel.name:''
                  })(<Input type="text" />)}
                </FormItem>
                <Transfer
                className='transfer'
                dataSource={mockData}
                titles={['Source', 'Target']}
                // targetKeys={state.targetKeys}
                // selectedKeys={state.selectedKeys}
                // onChange={this.handleChange}
                // onSelectChange={this.handleSelectChange}
                // onScroll={this.handleScroll}
                render={item => item.title} />
            </Form>
              </Modal>
            {/*设置预置位*/}
            <Modal title="设置预置位"
              visible={this.state.visible}
              style={{ top: 200 }}
              okText='保存'
              cancelText='取消'
              onOk={this.submit.bind(this)}
              onCancel={()=>this.setState({visible:false})}
              >
              <Form layout='inline'>
                <FormItem label="预置位名称">
                  {getFieldDecorator('name',{
                    rules: [{ required: true,message: '请输入预置位名称'}],
                    // initialValue:selectChannel?selectChannel.name:''
                  })(<Input type="text" />)}
                </FormItem>
              </Form>
          </Modal>
        </div>
    )
  }
}

const VideoCtrlYuzhizu = Form.create()(VideoCtrlYuzhizu1);
export default VideoCtrlYuzhizu