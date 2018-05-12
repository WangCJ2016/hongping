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
      time: 100
    }
    this.start = this.start.bind(this)
    this.end = this.end.bind(this)
    this.faster = this.faster.bind(this)
    this.back = this.back.bind(this)

  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.peo.picture&&nextProps.peo.areaRealWidth ) {
      setTimeout(()=>{
        this.canvasRender()
      })
    }

  }
  componentDidMount() {
    const queryArr = this.props.location.search.slice(1).split('&')
    const id = queryArr[0].split('=')[1]
    const name = (queryArr[1].split('=')[1])
    this.props.areaImg({id:id})
    this.props.getUwbRegionMap({name: encodeURI(decodeURI(name))})
  }

  canvasRender() {
    if(!this.props.peo.trailWeather) return
    const canvas = this.canvas
    console.log(this.outDiv)
    canvas.width=this.outDiv.offsetWidth
    canvas.height=this.outDiv.offsetHeight
    const context = canvas.getContext("2d");
    context.clearRect(0,0,canvas.width,canvas.height)
    const trails = this.props.peo.traildetail
    const ratio = canvas.width/this.props.peo.areaRealWidth 
    
    //设置对象起始点和终点
    trails.forEach(trail => {
      context.lineTo(ratio * trail.locationX,ratio * trail.locationY);
    }) 
   //设置样式
    context.lineWidth = 4;
    context.strokeStyle = "red";
    //绘制
    context.stroke();
    this.props.dataSuccess({trailWeather:false})
    this.setState({
      trail: trails[0]
    })
  }
  changeTrailRender = (trail) => {
    const canvas = this.canvas
    const ratio = canvas.width / this.props.peo.areaRealWidth 
    return (
      <Tooltip  title={trail.reportTime}>
        <div className='activeTrail' style={{left:ratio * trail.locationX-5,top:ratio * trail.locationY-20}}>
          <Icon type="user" style={{color:'red'}} />
        </div>
      </Tooltip>
    )
  }
  peoTipRender = () => {
    const canvas = this.canvas
    const ratio = canvas.width / this.props.peo.areaRealWidth 
    const trails = this.props.peo.traildetail
    const peoTipArr = []
    //设置对象起始点和终点
    trails.forEach((trail,index) => {
      if(index%20===0) {
        peoTipArr.push(
          <Tooltip key={index} title={trail.reportTime}>
            <div className="tipPeo" style={{left:ratio * trail.locationX-5,top:ratio * trail.locationY-5}}></div>
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
            <Button onClick={this.clear}>清楚</Button>
          </Button.Group>    
        </div>
          {
            this.props.peo.picture&&this.props.peo.areaRealWidth?
            <div className='peo-trail' style={{left:this.props.sidebar.homeLeftIf?'300px':'0'}} ref={(outDiv)=>this.outDiv=outDiv} >
              <canvas ref={(canvas)=>this.canvas=canvas} className='canvas' >
                你的浏览器还不支持canvas
              </canvas>
              <img id='img' src={this.props.peo.picture}  alt="" />
              {this.state.trail?this.changeTrailRender(this.state.trail):null}
              
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