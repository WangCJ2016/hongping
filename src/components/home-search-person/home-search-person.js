import React from 'react' 
import { Tabs, Pagination, Icon } from 'antd';
import './home-search-person.scss'
const TabPane = Tabs.TabPane;


class HomeSearchPerson extends React.Component {
  onChange() {}
  render() {
    return (
      <div className='home-search-person'>
        <Icon className='close' type='close'></Icon>
        <Tabs defaultActiveKey="1" onChange={this.onChange.bind(this)}>
          <TabPane tab="今天" key="1">
             <p className='title'>张三轨迹查询结果</p>
             <p className='title'>09:00-09:10 轨迹</p>
             <section className='trail'>
              <p className="start">开始：2017-09-21 09:00:00</p>
              <p className="end">结束：2017-09-21 09:00:00</p>
              <p className="address">洞室1</p>
             </section>
             <section className='trail'>
             <p className="start">开始：2017-09-21 09:00:00</p>
             <p className="end">结束：2017-09-21 09:00:00</p>
             <p className="address">洞室1</p>
            </section>
            <section className='trail'>
            <p className="start">开始：2017-09-21 09:00:00</p>
            <p className="end">结束：2017-09-21 09:00:00</p>
            <p className="address">洞室1</p>
           </section>
             <Pagination simple defaultCurrent={1} defaultPageSize={10} total={50} />
          </TabPane>
          <TabPane tab="昨天" key="2">Content of Tab Pane 2</TabPane>
        </Tabs>
      </div>
    )
  }
}

export default HomeSearchPerson