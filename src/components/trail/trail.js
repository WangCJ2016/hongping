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
      animation:true
    }
  }
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
    //context.clearRect(0,0,this.outDiv.getBoundingClientRect().width,this.outDiv.getBoundingClientRect().height);
    
    const trails = this.props.peo.traildetail
     //设置样式
     context.lineWidth = 2;
     context.strokeStyle = "#17b89f";
    //设置对象起始点和终点
    const that = this
    for(let i=0;i<trails.length;i++) {
      (function() {
       const timer = setTimeout(()=>{
          if(!that.state.animation){
            clearTimeout(timer)
            return
          }
          context.lineTo(trails[i].locationX/10,trails[i].locationY/10);
          context.stroke();
        },100*i)
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
  render() {
    return (
      <div>
        <div style={{textAlign:'center'}}><Button type='primary' onClick={()=>this.setState({animation:false})}>暂停</Button><Button type='primary'>快进</Button></div>
        
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