import React from 'react';
import { connect } from 'react-redux';

import {areaInfo,selectAreaIdSuccess,getAreaInfo} from '../redux/area.redux'
import { querySysInstallPlaces } from '../redux/setting.device.redux'

const AreaRouteHoc = (WrapCom) => {
    @connect(
        null,
        {areaInfo,selectAreaIdSuccess,getAreaInfo,querySysInstallPlaces}
      )  
     class NewCom extends React.Component {
        select({areaId}) {
            this.props.selectAreaIdSuccess(areaId)
            this.props.areaInfo({id:areaId})
            this.props.querySysInstallPlaces({areaId: areaId})
            clearInterval(this.props.area.installPlaceTimer)
            clearInterval(this.timer)
            this.timer = setInterval(()=>{
              this.props.querySysInstallPlaces({areaId: areaId})
            },2000)
            this.props.getAreaInfo({id: areaId})
        }
        render() {
            return (
                <WrapCom  
                  areaRoute={this.select} 
                  {...this.props}
                 />
            );
        }
    }
    return NewCom
}
export default AreaRouteHoc