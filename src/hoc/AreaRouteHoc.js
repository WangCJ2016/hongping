import React from 'react';
import { connect } from 'react-redux';

import {areaInfo,selectAreaIdSuccess,getAreaInfo, dataSuccess} from '../redux/area.redux'
import { querySysInstallPlaces } from '../redux/setting.device.redux'

const AreaRouteHoc = (WrapCom) => {
    @connect(
        state=>({area: state.area}),
        {areaInfo,selectAreaIdSuccess,getAreaInfo,querySysInstallPlaces, dataSuccess}
      )  
     class NewCom extends React.Component {
        select = ({areaId}) => {
            this.props.selectAreaIdSuccess(areaId)
            this.props.areaInfo({id:areaId})
             this.props.querySysInstallPlaces({areaId: areaId})
            // if(this.props.area.installPlaceTimer) 
            // clearInterval(this.props.area.installPlaceTimer)
           
            // const timer = setInterval(()=>{
            //   this.props.querySysInstallPlaces({areaId: areaId})
            // },2000)
           // this.props.dataSuccess({installPlaceTimer:timer})
            this.props.getAreaInfo({id: areaId})
        }
        componentWillUnmount() {
            if(this.timer)  {
            }
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