import React from 'react'
import { connect } from 'react-redux'

@connect(
  state=>({peo:state.peo})
)
class Trail extends React.Component {
  state = {  }
  componentDidUpdate() {
    const canvas = this.canvas
    const context = canvas.getContext("2d");
    const trails = this.props.peo.traildetail
    //设置对象起始点和终点
    trails.forEach(trail => {
      context.lineTo(trail.locationX,trail.locationY);
    })
   //设置样式
    context.lineWidth = 2;
    context.strokeStyle = "#F5270B";
    //绘制
    context.stroke();
  }
  render() {
    return (
      <div style={{overflow:'auto'}}>
      <canvas ref={(canvas)=>this.canvas=canvas} width="3000" height="1100">
        你的浏览器还不支持canvas
    </canvas>
      </div>
    )
  }
}

export default Trail