import React from 'react'
import { connect } from 'react-redux'
import { Tooltip } from 'antd'
import './trail.scss'

@connect(
  state=>({peo:state.peo,sidebar:state.sidebar})
)
class Trail extends React.Component {
  state = {  }
  componentDidMount() {
    this.canvasRender()
  }
  componentDidUpdate() {
    this.canvasRender()
  }
  canvasRender() {
    const canvas = this.canvas
    canvas.width=this.outDiv.getBoundingClientRect().width
    canvas.height=this.outDiv.getBoundingClientRect().height
    const context = canvas.getContext("2d");
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
  }
  peoTipRender() {
    const trails = this.props.peo.traildetail
    const peoTipArr = []
    //设置对象起始点和终点
    trails.forEach((trail,index) => {
      if(index%50===0) {
        peoTipArr.push(
          <Tooltip title={trail.reportTime}>
            <div className="tipPeo" style={{left:trail.locationX/10-5,top:trail.locationY/10-5}}></div>
      </Tooltip>
        )
      }
    }) 
    return peoTipArr
  }
  render() {
    return (
      <div>
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