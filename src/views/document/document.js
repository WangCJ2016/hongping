import React from 'react'
import Category from './category'
import FilesList from './files'
import { Row,Col} from 'antd'
import './document.scss'

class Document extends React.Component {
  state = {  }
  
  render() {
    return (
      <div className='document'>
        <Row>
          <Col span={10}>
            <Category></Category>
          </Col>
          <Col span={4}></Col>
          <Col span={10}>
            <FilesList></FilesList>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Document