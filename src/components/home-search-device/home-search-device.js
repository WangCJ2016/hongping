import React from 'react'
import {Icon,Pagination} from 'antd'
import './home-search-camera.scss'
class HomeSearchCamera extends React.Component {
  state = {  }
  deivceRender() {
    const devices = this.props.searchDevice.result
    return devices.map(device => (
       <div className='table-row' key={device.id}>
            <span>
            <img className='camera' src={require(`../../assets/imgs/${device.icon}.png` )} alt=""/>
            </span>
            <span>{device.name}</span>
            <span>{device.index}</span>
            <Icon type="environment-o" style={{color: '#17b89f', fontSize:'18px'}} />
            <Icon type="eye-o" style={{color: '#17b89f',fontSize:'18px'}} />
         </div>
    ))
  }
  onChange(page) {
    if(this.props.cameraResult) {
      this.props.searchChannel({name:encodeURI(this.props.searchName),pageSize:10,pageNo:page})
    }
    if(this.props.bordcastResult) {
      this.props.searchBroadcast({name:encodeURI(this.props.searchName),pageSize:10,pageNo:page})
    }
  }
  render() {
    console.log(this.props)
    return (
      <div className="home-search-camera">
        {this.props.searchDevice?this.deivceRender():null}
        {this.props.searchDevice&&this.props.searchDevice.result.length>10?
          <Pagination simple defaultCurrent={1}  total={this.props.searchDevice.records} onChange={this.onChange.bind(this)}/>:null}
      </div>
    )
  }
}

export default HomeSearchCamera