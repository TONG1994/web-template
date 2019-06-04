/*
*   Create by malson on 2019-04-10
*/

import React from 'react';
import { Icon  } from 'antd';
import ComponentTypes from './ComponentTypes';


class LeftComponents extends React.Component {
  constructor(props){
    super(props);
    this.state={
    
    }
  }
  componentDidMount(){}
  onDragStart = (e)=>{
    //兼容火狐
    if(window.navigator.userAgent.indexOf("Firefox") > -1){
      e.dataTransfer.setData("imgInfo", e.target.id)
    }
    //e为目标dom
    this.props.handleDragStart(e.target);
  }
  onDragEnd = (e)=>{
    //e为目标dom
    this.props.handleDragEnd(e.target);
  }
  render(){
    let components = ComponentTypes || [];
    let IconList = components.map((item,i)=>{
      return (
          <div className='left-li'
               datatype={item.type}
               data-id={item.dataId}
               draggable='true'
               onDragStart={this.onDragStart}
               onDragEnd={this.onDragEnd}
               key={i}
          >
            <div className='left-li-img'>
              <img src={item.icon} draggable='false' style={item.style}  />
            </div>
            <div className='left-li-text'>{item.name}</div>
          </div>
      )
    })
    return(
        <div className='left-wrap'>
          <div className='left-title'>
            <span>组件库</span>
          </div>
          <div className='left-ul'>
            {IconList}
          </div>
        </div>
    )
  }
}
export default LeftComponents;
