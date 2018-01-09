import React from 'react'
import { connect } from 'react-redux'
import { Icon, Table, Modal, Form, Input,Transfer } from 'antd'
import {videoAreaDevices} from '../../redux/video.redux'
import AreaTree from '../areaTree/areaTree'
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
    description: `description of content${i + 1}`
  });
}
@connect(
  state=>({video: state.video}),
  {
    videoAreaDevices
   }
)
class VideoCtrlYuzhizu1 extends React.Component {
  state = { 
    visible:false,
    yulanvisible:false
   }
   select() {}
  submit() {}
  handleChange(nextTargetKeys, direction, moveKeys) {
    console.log('targetKeys: ', nextTargetKeys);
    console.log('direction: ', direction);
    console.log('moveKeys: ', moveKeys);
  }
  handleSelectChange(sourceSelectedKeys, targetSelectedKeys) {
    console.log('sourceSelectedKeys: ', sourceSelectedKeys);
    console.log('targetSelectedKeys: ', targetSelectedKeys);
  }
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
    const areaDevices = this.props.video.areaDevices.map(device => ({...device,key:device.id}))
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
              className='yuzhiwimodal'
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
                <div className='clearfix'>
                  <div className="float-left area">
                    <div className="title">区域</div>
                    <AreaTree defaultExpandAll={true} select={this.props.videoAreaDevices}/>
                  </div>
                  <Transfer
                    className='transfer float-right'
                    dataSource={areaDevices}
                    titles={['通道', '预览组']}
                    render={item=>item.name}
                    targetKeys={this.state.targetKeys}
                    onChange={this.handleChange.bind(this)}
                    onSelectChange={this.handleSelectChange.bind(this)}
                    // onScroll={this.handleScroll}
                    />
                </div>
             </Form>
              </Modal>
      
        </div>
    )
  }
}

const VideoCtrlYuzhizu = Form.create()(VideoCtrlYuzhizu1);
export default VideoCtrlYuzhizu