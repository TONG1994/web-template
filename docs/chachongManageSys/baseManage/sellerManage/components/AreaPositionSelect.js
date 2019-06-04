import React from 'react';

import { Select } from 'antd';
const Option = Select.Option;
/**
 *  props 传入onchange接受回调
*/
import SellerManageActions from '../action/SellerManageActions';
import SellerManageStore from '../store/SellerManageStore';
let Common = require('../../../../public/script/common');
class AreaPosition extends React.Component{
  constructor(props){
    super(props);
    this.state={
      provinceArr:[],
      cityArr:[],
      townArr:[],
      province:undefined,
      city:undefined,
      town:undefined,
    }
  }
  componentDidMount(){
    this.getAddressFun = SellerManageStore.listen(this.getAddress);
    if(window.sessionStorage.address){
      let provinceArr=[];
      try {
        provinceArr = JSON.parse(window.sessionStorage.address);
      }catch (err){}
      this.setState({provinceArr});
      return;
    }
    SellerManageActions.getAddress();
  }
  getAddress = (data)=>{
    if(data.operation==='getAddress'){
      let provinceArr = data.recordSet[0];
      this.setState({provinceArr});
      window.sessionStorage.address = JSON.stringify(provinceArr);
    }
  }
  componentWillUnmount(){
    this.getAddressFun();
  }
  handleProvince=(value)=>{
    let provinceArr = this.state.provinceArr, cityArr=[];
    let obj = provinceArr ?  provinceArr.find(item => item.value === value) : {};
    cityArr = obj &&  obj.children ? obj.children :[];
    this.setState({ 
      province: value,
      cityArr,
      townArr:[],
      city:undefined,
      town:undefined,
    },()=>{
        this.props.handleArea();
    });
  }
  handleCity=(value)=>{
    let cityArr = this.state.cityArr, townArr=[];
    let obj = cityArr ?  cityArr.find(item => item.value === value) :{};
    townArr = obj && obj.children ? obj.children :[];
    this.setState({ 
      city: value,
      townArr,
      town:undefined ,
     },()=>{
        this.props.handleArea();
    });
  }
 
  handleTown=(value)=>{
    this.setState({ 
      town: value,
     },()=>{
        this.props.handleArea();
    });
  }
  getAddressFilter=()=>{
    let str = {province:this.state.province,city:this.state.city,town:this.state.town};
    return str;
  }
  clear=()=>{
    this.setState({
      cityArr:[],
      townArr:[],
      province:undefined,
      city:undefined,
      town:undefined,
    });
  }
  render(){
    const {
      ...attributes,
    } = this.props;
   let array1 = this.state.provinceArr,
    array2 = this.state.cityArr,
    array3 = this.state.townArr;
    return(
      <div>
        <Select {...this.props} name='province' value={this.state.province} style={{ width: 85, marginRight:5}} onChange={this.handleProvince} placeholder="省">
          <Select.Option value=''>省</Select.Option>
          {
            array1.map((lvl, i) => {
              return <Select.Option key={lvl.value} value={lvl.value}>{lvl.label}</Select.Option>
            })
          }
        </Select>
        <Select {...this.props} className='btn-margin' name='city' value={this.state.city} style={{ width: 85, marginRight:5}} onChange={this.handleCity} placeholder="市">
          <Select.Option value=''>市</Select.Option>
          {
            array2.map((lvl, i) => {
              return <Select.Option key={lvl.value} value={lvl.value}>{lvl.label}</Select.Option>
            })
          }
        </Select>
        <Select {...this.props} className='btn-margin' name="town" value={this.state.town} style={{ width: 80,}} onChange={this.handleTown} placeholder="区">
          <Select.Option value=''>区</Select.Option>
          {
            array3.map((lvl, i) => {
              return <Select.Option key={lvl.value} value={lvl.value}>{lvl.label}</Select.Option>
            })
          }
        </Select>
      </div>
     
       
    )
  }
}
export default AreaPosition;