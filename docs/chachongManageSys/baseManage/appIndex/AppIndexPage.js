import React from 'react'
import {Divider,Layout,Button,Popover} from 'antd'
import './style/appIndex.scss';
import ComponentTypes from './components/ComponentTypes';
import LeftComponents from './components/LeftComponents';
import CombineComponent from './components/CombineComponent';
import QRCode from './imgs/QR.png';

const { Content } = Layout;
let drag = false;

let Utils = require('@/public/script/utils');
class AppIndexPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      combineData:[],
      curUuid:''
    }
  }
  
  componentDidMount() {}
  //拖拽开始
  handleDragStart = (e)=>{
    drag = false;
  }
  //拖拽结束 拖动DOM
  handleDragEnd = (curTarget)=>{
    let dataId = curTarget.getAttribute('data-id');
    if(drag){
      this.createComponent(dataId);
    }
  }
  //拖拽放下  目标DOM
  handleDrop = (curTarget)=>{
    drag = true;
  }
  //新增组件
  createComponent = (id)=>{
    let uuid = Utils.generateUuid();
    let componentObj = ComponentTypes.filter(item=>item.dataId === id)[0];
    if(!componentObj) return;
    let { dataId,defaultData,name,type,showComponent} = componentObj;
    let obj = {
      dataId,
      defaultData,
      name,
      data:'',
      type,
      showComponent,
      uuid
    }
    let combineData = this.state.combineData;
    combineData.push(obj);
    this.setState({combineData,curUuid:uuid});
  }
  //选择
  handleSelectComponent = (curUuid)=>{
    let stateUuid = this.state.curUuid;
    if(curUuid === stateUuid){
      return
    }
    this.setState({curUuid});
  }
  //上移动
  handleClickUp = (uuid)=>{
  
  }
  //下移动
  handleClickDown = (uuid)=>{
  
  }
  //删除
  handleClickDelete = (uuid)=>{
    let combineData = this.state.combineData;
    combineData = combineData.filter(item=>item.uuid !== uuid);
    this.setState({combineData});
  }
  render() {
    console.log(QRCode)
    let { combineData,curUuid } = this.state;
    let QRCodeRender = (
        <div className='QR-wrap'>
          <img src={QRCode}  />
          <div className='QR-text'>请用茶虫app扫码预览</div>
        </div>
    )
    let showTitle = (
        <div className='component-title combine-title-wrap'>
          <Divider type="vertical" className='line'/>
          <span className='text'>首页布局</span>
          <div style={{float:'right'}}>
            <Popover content={ QRCodeRender }
                     trigger="click"
                     placement="bottom"
                     className='QR-popover-wrap'
            >
              <Button>预览</Button>
            </Popover>
            <Button type='primary' style={{marginLeft:15}}>发布</Button>
          </div>
        </div>
    )
    let leftProps = {
      handleDragEnd:this.handleDragEnd,
      handleDragStart:this.handleDragStart,
    };
    let combineProps = {
      handleDrop:this.handleDrop,
      handleSelectComponent:this.handleSelectComponent,
      handleClickUp:this.handleClickUp,
      handleClickDown:this.handleClickDown,
      handleClickDelete:this.handleClickDelete,
      combineData,
      curUuid
    }
    return (
        <Content className='content-wrap' style={{overflowY:'auto',overflowX:'hidden'}}>
          <div className='grid-wrap'>
            {showTitle}
            <div className="grid-page app-wrap">
              <div className='app-left'>
                <LeftComponents {...leftProps} />
              </div>
              <div className='app-content-wrap'>
                <div className='app-content'>
                  <CombineComponent {...combineProps} />
                </div>
              </div>
              <div className='app-right'></div>
            </div>
          </div>
        </Content>
    )
  }
}

export default AppIndexPage
