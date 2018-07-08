import React from 'react';
import { Table, Form, Input, Button } from 'antd'
import { connect } from 'react-redux'
import { remotePreviewGroupList } from '../../redux/video.redux'
import { getDevInfo} from '../../redux/setting.device.redux'
import { getScreenLength } from '../../utils'

const FormItem = Form.Item;

const CreateIdForm = Form.create()(props => {
    const { form, setTime } = props;
    const handleSubmit = () => {
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        form.resetFields();
         setTime(fieldsValue.time);
      });
    };
    return (
        <Form layout="inline" className='form-inline' onSubmit={handleSubmit}>
            <FormItem >
            {form.getFieldDecorator('time', {
                rules: [{ required: true, message: '请输入模板ID' }],
                initialValue: 10
            })(<Input placeholder="请输入循环时间(单位：’秒‘)" type='number' addonAfter="单位 秒"/>)}
            </FormItem>
            <FormItem>
                <Button
                    type="primary"
                    htmlType="submit"
                >
                    确定
                </Button>
             </FormItem>
        </Form>
    
    );
  });

@connect(
    state=>({video: state.video}),
    {
        remotePreviewGroupList, getDevInfo
    }
)
class VideoCirclePlay extends React.Component {
    constructor() {
        super()
        this.state = { 
            intervalTime: 10000
        }
        this.count = 0
        this.collapseChange = this.collapseChange.bind(this)
    }
    componentDidMount() {
        this.props.remotePreviewGroupList({devType:1})
    }
    setTime = (time) => {
        this.setState({
            intervalTime: time * 1000
        },() => {
            clearInterval(this.timer)
            this.timer = setInterval(()=>{
                if(this.count + 1 <= this.selectedIds.length) {
                    this.collapseChange(this.selectedIds[this.count])
                    this.count++
                }else{
                    this.count = 0
                }
            }, this.state.intervalTime) 
        })
    }
    onSelectChange = (selectedIds) => {
        this.selectedIds = selectedIds
        this.timer = setInterval(()=>{
            if(this.count + 1 <= this.selectedIds.length) {
                this.collapseChange(selectedIds[this.count])
                this.count++
            }else{
                this.count = 0
            }
        }, this.state.intervalTime)
    }
    async collapseChange (id) {
        const group =  this.props.video.previewGroup.filter(group => group.id===id)
        console.log(id, this.props.video.previewGroup)
        if(group[0].previews) {
          const length = group[0].previews.length
          const screenLength = getScreenLength(length)
          this.props.play.XzVideo_SetRealPlayScreen(screenLength)
          for(let i=0;i< group[0].previews.length;i++) {
            await this.props.getDevInfo({devId: group[0].previews[i].devId,type:group[0].previews[i].devType},'play',this.props.play,i)
          }
        }
      }
    render() {
        console.log(this.state.intervalTime)
        const columns = [
            {
                title: 'title',
                dataIndex: 'title'
            }
        ]
        const rowSelection = {
            onChange: this.onSelectChange,
          };
        const lists =  this.props.video.previewGroup
        return (
            <div className='video-areaTree'>
              <CreateIdForm 
                setTime = {this.setTime}
              ></CreateIdForm>
              <Table rowSelection={rowSelection} columns={columns} dataSource={lists} rowKey={record=>record.id}/>
            </div>
        );
    }
}

export default VideoCirclePlay;