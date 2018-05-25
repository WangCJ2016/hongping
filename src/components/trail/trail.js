import React from 'react'
import { connect } from 'react-redux'
import { Tooltip,Button,Icon,Spin } from 'antd'
import './trail.scss'
import { getUwbRegionMap,areaImg, dataSuccess } from '../../redux/peo.redux'

@connect(
  state=>({peo:state.peo,sidebar:state.sidebar}),{
    getUwbRegionMap,areaImg,dataSuccess
  }
)
class Trail extends React.Component {
  constructor() {
    super()
    this.state = {
      animation:true,
      count:0,
      time: 100,
      trailWeather: false
    }
    this.start = this.start.bind(this)
    this.end = this.end.bind(this)
    this.faster = this.faster.bind(this)
    this.back = this.back.bind(this)
    this.changeTrailRender = this.changeTrailRender.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.peo.picture!==this.props.peo.picture) {
      this.end()
      this.setState({
        animation:true,
        count:0,
        time: 100
      })
    }

    if(nextProps.peo.picture&&nextProps.peo.areaRealWidth&&nextProps.peo.traildetail) {
     // console.log(nextProps.peo)
     
       this.canvasRender(nextProps.peo)
      
    }
  }
  
 async componentDidMount() {
    const queryArr = this.props.location.search.slice(1).split('&')
    const id = queryArr[0].split('=')[1]
    const name = (queryArr[1].split('=')[1])
    await this.props.areaImg({id:id})
    setTimeout(()=>{
      this.props.getUwbRegionMap({name: encodeURI(decodeURI(name))})
    },1000)
  }

  canvasRender({traildetail,locationX,locationY,trailWeather,areaRealWidth}) {
   if(traildetail.length === 0) return
   if(!this.outDiv) return
   console.log(areaRealWidth)
   if(!trailWeather) return
  // console.log(traildetail.length)
   //if(traildetail.length === this.props.peo.traildetail.length) return
   
   // this.props.dataSuccess({trailWeather:true})
    //this.setState({trailWeather: true})
    const canvas = this.canvas
    canvas.width=this.outDiv.offsetWidth
    canvas.height=this.outDiv.offsetHeight
    const context = canvas.getContext("2d");
    context.clearRect(0,0,10001,10000)
    const trails = traildetail
    const ratio = canvas.width / areaRealWidth 
    //设置对象起始点和终点
    trails.forEach(trail => {
      context.lineTo(ratio * (trail.locationX - locationX ), ratio * (trail.locationY - locationY ));
    }) 
    this.props.dataSuccess({trailWeather: false})
   //设置样式
    context.lineWidth = 4;
    context.strokeStyle = "red";
    //绘制
  
    context.stroke();
 
    this.setState({
     // trailWeather: false,
      trail: trails[0]
    })
  }
  changeTrailRender = (trail) => {
    if(!this.canvas || !trail) return
    const locationX = this.props.peo.locationX 
    const locationY = this.props.peo.locationY 
    const canvas = this.canvas
    const ratio = canvas.width / this.props.peo.areaRealWidth 
    return (
      <Tooltip  title={trail.reportTime}>
        <div className='activeTrail' style={{left:ratio * (trail.locationX-5 - locationX ),top:ratio * (trail.locationY-20- locationY)}}>
          <Icon type="user" style={{color:'red'}} />
        </div>
      </Tooltip>
    )
  }
  peoTipRender = () => {
    if(!this.canvas) return
    const canvas = this.canvas
    const locationX = this.props.peo.locationX 
    const locationY = this.props.peo.locationY 
    const ratio = canvas.width / this.props.peo.areaRealWidth 
    const trails = this.props.peo.traildetail
    const peoTipArr = []
    //设置对象起始点和终点
    trails.forEach((trail,index) => {
      if(index%20===0) {
        peoTipArr.push(
          <Tooltip key={index} title={trail.reportTime}>
            <div className="tipPeo" style={{left:ratio * (trail.locationX-5-locationX),top:ratio * (trail.locationY-5-locationY)}}></div>
          </Tooltip>
        )
      }
    }) 
    return peoTipArr
  }
  start() {
    if(this.timer) return
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
    if(this.state.time/2 >= 10) {
      if(this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
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
  clear=()=>{
    const canvas = this.canvas
    const context = canvas.getContext("2d");
    context.clearRect(0,0,canvas.width,canvas.height)
  }
  render() {
    
    return (
      <div>
        <div style={{position:'absolute',left:'50%',zIndex:1}}>
          <Button.Group >
            <Button type='primary' onClick={this.start}>开始</Button>
            <Button type='primary' onClick={this.end}>暂停</Button>
            <Button type='primary' onClick={this.faster}>快进</Button>
            <Button type='primary' onClick={this.back}>回放</Button>
            <Button type='primary' onClick={this.clear}>清除</Button>  
          </Button.Group>    
        </div>
          {
            this.props.peo.picture?
            <div className='peo-trail' style={{left:this.props.sidebar.homeLeftIf?'300px':'0'}}  >
              <canvas ref={(canvas)=>this.canvas=canvas} className='canvas' >
                你的浏览器还不支持canvas
              </canvas>
              <img id='img' src={this.props.peo.picture} ref={(outDiv)=>this.outDiv=outDiv}  alt="" />
              {this.changeTrailRender(this.state.trail)}
              
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