import React from 'react'
import PropTypes from 'prop-types'
import * as _ from 'lodash' 

class Selection extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mouseDown: false,
      startPoint: null,
      endPoint: null,
      selectionBox: null,
      selectedItems: {},
      appendMode: false
    }
    this._onMouseDown = this._onMouseDown.bind(this)
    this._onMouseUp = this._onMouseUp.bind(this)
    this._onMouseMove = this._onMouseMove.bind(this)
  }
  _onMouseDown(e) {
    if(!this.props.dragSelectEnbled) {
        return
    }
    var ev = e || window.event
    this.setState({
      startPoint: {x:ev.clientX-60,y:ev.clientY-70},
      endPoint:{x:ev.clientX-60,y:ev.clientY-70},
      mouseDown:true
    })
    window.document.addEventListener('mousemove', this._onMouseMove);
    window.document.addEventListener('mouseup', this._onMouseUp);
  }
  _onMouseMove(e) {
    var ev = e || window.event
    this.setState({
      endPoint:{x:ev.clientX-60,y:ev.clientY-70},
    })
  }
  _onMouseUp(e) {
    window.document.removeEventListener('mousemove', this._onMouseMove);
    window.document.removeEventListener('mouseup', this._onMouseUp);
    const left = Math.min(this.state.startPoint.x,this.state.endPoint.x)
    const top = Math.min(this.state.startPoint.y,this.state.endPoint.y)
    const right = Math.max(this.state.startPoint.x,this.state.endPoint.x)
    const bottom = Math.max(this.state.startPoint.y,this.state.endPoint.y)
    this.props.mouseUp(left,top,right,bottom)
    this.setState({
      startPoint:null,
      endPoint:null
    })
  }
  
  renderSelectionBox() {
     const left = Math.min(this.state.startPoint.x,this.state.endPoint.x)
     const top = Math.min(this.state.startPoint.y,this.state.endPoint.y)
     const width = Math.abs(this.state.startPoint.x - this.state.endPoint.x)
     const height = Math.abs(this.state.startPoint.y - this.state.endPoint.y)
      return  (
        <div style={{
          background:'rgba(0,0,0,0.3)',
          border:'2px dashed #333',
          position:'absolute',
          zIndex:'99',
          left:left+'px',
          top:top+'px',
          width:width+'px',
          height:height+'px'
        }}>
        </div>
      )
    
  }
  render() {
    return(
      <div  style={{position:'absolute',left:0,right:0,top:0,bottom:0,zIndex:99,background:'rgba(255,255,255,0)'}} ref='selectionBox' onMouseDown={this._onMouseDown}>
        {this.props.children}
        {this.props.dragSelectEnbled&&this.state.mouseDown&&this.state.endPoint?this.renderSelectionBox():null}
      </div>
    )
  }
}

Selection.propTypes= {
  enabled: PropTypes.bool,
  onSelectionChange: PropTypes.func
}

Selection.defaultProps = {
  dragSelectEnbled: false,
  onSelectionChange: _.noop,
}
export default Selection