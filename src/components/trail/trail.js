import React from 'react'
import { connect } from 'react-redux'
import { Tooltip,Button,Icon,Spin } from 'antd'
import './trail.scss'

@connect(
  state=>({peo:state.peo,sidebar:state.sidebar})
)
class Trail extends React.Component {
  constructor() {
    super()
    this.state = {
      animation:true,
      count:0,
      time: 100
    }
    this.start = this.start.bind(this)
    this.end = this.end.bind(this)
    this.faster = this.faster.bind(this)
    this.back = this.back.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.peo.picture) {
      setTimeout(()=>{
        this.canvasRender()
      })
    }
  }
  componentDidMount() {
    if(this.props.peo.picture) {
      setTimeout(()=>{
        this.canvasRender()
      })
    }
  }
  canvasRender() {
    const canvas = this.canvas
    canvas.width=this.outDiv.getBoundingClientRect().width
    canvas.height=this.outDiv.getBoundingClientRect().height
    const context = canvas.getContext("2d");
    context.clearRect(0,0,canvas.width,canvas.height)
    const trails = this.props.peo.traildetail
    //设置对象起始点和终点
    trails.forEach(trail => {
      context.lineTo(trail.locationX/10,trail.locationY/10);
    }) 
   //设置样式
    context.lineWidth = 2;
    context.strokeStyle = "#17b89f";
    //绘制
    context.stroke();
    this.setState({
      trail: trails[0]
    })
  }
  changeTrailRender(trail) {
    return (
      <Tooltip  title={trail.reportTime}>
        <div className='activeTrail' style={{left:trail.locationX/10-5,top:trail.locationY/10-20}}>
          <Icon type="user" />
        </div>
      </Tooltip>
    )
  }
  peoTipRender() {
    const trails = this.props.peo.traildetail
    const peoTipArr = []
    //设置对象起始点和终点
    trails.forEach((trail,index) => {
      if(index%50===0) {
        peoTipArr.push(
          <Tooltip key={index} title={trail.reportTime}>
            <div className="tipPeo" style={{left:trail.locationX/10-5,top:trail.locationY/10-5}}></div>
          </Tooltip>
        )
      }
    }) 
    return peoTipArr
  }
  start() {
    const trails = this.props.peo.traildetail
    const length = trails.length
    this.timer = setInterval(()=>{
      if(this.state.count < length) {
        this.setState({
          trail: trails[this.state.count],
          count: this.state.count+1 
        })
      }else {
        clearInterval(this.timer)
        this.timer = null
      }
    },this.state.time)
  }
  end() {
    if(this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
  }
  faster() {
    if(this.timer&&this.state.time/2 >= 10) {
      clearInterval(this.timer)
      this.setState({time: this.state.time/2},()=>{
        this.start()
      })
    }
  }
  back() {
    if(!this.timer) {
      this.setState({
        time: 100,
        count: 0
      },()=>{
        this.start()
      })
    }
  }
  render() {
    return (
      <div>
        <div style={{position:'absolute',left:'50%'}}>
          <Button.Group >
            <Button type='primary' onClick={this.start}>开始</Button>
            <Button type='primary' onClick={this.end}>暂停</Button>
            <Button type='primary' onClick={this.faster}>快进</Button>
            <Button type='primary' onClick={this.back}>回放</Button>
          </Button.Group>    
        </div>
          {
            this.props.peo.picture?
            <div className='peo-trail' style={{left:this.props.sidebar.homeLeftIf?'360px':'0'}} ref={(outDiv)=>this.outDiv=outDiv} >
              <canvas ref={(canvas)=>this.canvas=canvas} className='canvas' >
                你的浏览器还不支持canvas
              </canvas>
              <img id='img' src={this.props.peo.picture}  alt="" />
              {this.state.trail?this.changeTrailRender(this.state.trail):null}
              {this.peoTipRender()}
            </div>
            :
            <div style={{width: '100%',height:'100%',textAlign:'center'}}>
              <Spin size="large" style={{marginTop: '200px'}} />
            </div>       
          }        
      </div>
    )
  }
}

export default Trail