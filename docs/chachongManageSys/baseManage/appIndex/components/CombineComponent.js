/*
*   Create by malson on 2019-04-11
*/
import React from 'react'
import {Icon} from 'antd'

class CombineComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  
  componentDidMount() {
  }
  
  onDragEnter = (e) => {
    e.preventDefault()
  }
  onDragLeave = (e) => {
    console.log('onDragLeave')
  }
  onDrop = (e) => {
    //e为起始dom
    this.props.handleDrop(e.target)
  }
  
  render() {
    let {combineData = [], curUuid} = this.props
    let combineRender = combineData.map((item, i) => {
      let data = item.data ? item.data : item.defaultData
      let selectClass = item.uuid === curUuid ? 'selected' : ''
      return (
          <div className={'combine-list-wrap ' + selectClass}
               onClick={() => this.props.handleSelectComponent(item.uuid)}
               key={item.uuid}
          >
            {item.showComponent(data)}
            <div className='combine-list-btn'>
              <div className='combine-list-btn-bg'>
                <div className='combine-list-btn-text'>
                  轮播图
                </div>
                <div className='combine-list-btn-opera'>
                  <div className='combine-btn'>
                    {
                      i === 0 ? <Icon type="up" className='icon-disabled'/> :
                          <Icon type="up" onClick={() => this.props.handleClickUp(item.uuid)}/>
                    }
                  </div>
                  <div className='combine-btn'>
                    {
                      i === combineData.length - 1 ? <Icon type="down" className='icon-disabled'/> :
                          <Icon type="down" onClick={() => this.props.handleClickDown(item.uuid)}/>
                    }
                  </div>
                  <div className='combine-btn'>
                    <Icon type="delete" onClick={() => this.props.handleClickDelete(item.uuid)}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
      )
    })
    return (
        <div className='combine-wrap'>
          <div className='combine-box'
               id='combineBox'
               onDragEnter={this.onDragEnter}
               onDragOver={(e) => e.preventDefault()}
               onDragLeave={this.onDragLeave}
               onDrop={this.onDrop}
          >
            <div className='combine-title'/>
            {combineRender}
            <div className='combine-foot'/>
          </div>
        </div>
    )
  }
}

export default CombineComponent
