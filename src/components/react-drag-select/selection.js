import React,{ReactDOM} from 'react'
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
  }

  render() {
    var className = 'selection ' + (this.state.mouseDown ? 'dragging' : '');
    return(
      <div className={className} style={{width:'500px',height:'500px',backgroundColor:'red'}} ref='selectionBox' onMouseDown={this._onMouseDown}>
        {this.renderChildren()}
        {this.renderSelectionBox()}
      </div>
    )
  }
}

Selection.propTypes= {
  enabled: PropTypes.bool,
  onSelectionChange: PropTypes.func
}

Selection.defaultProps = {
  enabled: true,
  onSelectionChange: _.noop,
}
export default Selection