import React from 'react'
import { connect } from 'react-redux'
import { Tooltip,Button } from 'antd'
import './trail.scss'

@connect(
  state=>({peo:state.peo,sidebar:state.sidebar})
)
class Trail extends React.Component {
  constructor() {
    super()
    this.state = {
      animation:true,
      time:100
    }
  }
  componentWillReceiveProps(nextProps) {
    if(!this.props.peo.picture===nextProps.peo.picture) {
      this.canvasRender()
    }
  }
  canvasRender() {
    const canvas = this.canvas
    canvas.width=this.outDiv.clientWidth
    canvas.height=this.outDiv.clientHeight
    const context = canvas.getContext("2d")
    context.clearRect(0,0,1000,1000)
    this.context = context
    const trails = this.props.peo.traildetail
     //设置样式
     context.lineWidth = 2;
     context.strokeStyle = "#17b89f";
    //设置对象起始点和终点
    // context.beginPath()
    // context.lineTo(10,10)
    // context.lineTo(20,20)
    // context.stroke()
    // context.beginPath()
    // context.lineTo(100,100)
    // context.stroke()
    // context.beginPath()
    // context.lineTo(100,200)
    // context.stroke()
    const that = this
    for(let i=0;i<trails.length;i=i+2) {
      (function() {
        setTimeout(()=>{
          context.beginPath()
          context.lineTo(trails[i].locationX/10,trails[i].locationY/10)
          context.lineTo(trails[i+1].locationX/10,trails[i+1].locationY/10)
          context.closePath()
          context.stroke()
        },that.state.time*i)
      })()
    }
   
    //绘制
    
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
  onClick() {
    this.canvasRender()
  }
  render() {
    return (
      <div>
        <div style={{textAlign:'center'}}>
        <Button type='primary' onClick={this.onClick.bind(this)}>开始绘制</Button>
        <Button type='primary' onClick={()=>this.setState({time:10})}>快进</Button></div>
        
        <div className='peo-trail' style={{left:this.props.sidebar.homeLeftIf?'360px':'0'}} ref={(outDiv)=>this.outDiv=outDiv} >
          <canvas ref={(canvas)=>this.canvas=canvas} className='canvas' >
            你的浏览器还不支持canvas
          </canvas>
          <img id='img' src={this.props.peo.picture}  alt="" />
          {this.peoTipRender()}
        </div>
      </div>
    )
  }
}

export default Trail