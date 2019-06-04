/**
 *   Create by Malson on 2019/2/27
 */

import React from 'react'
import {Row, Col, Button, Input} from 'antd'
const { TextArea } = Input;
import FormUtils from '@/lib/Components/FormUtils'
import FormDef from './SellerManageForm'
import AreaPosition from './AreaPositionSelect';

let Utils = require('@/public/script/utils')
let Common = require('@/public/script/common')


class SellerManageModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      formData: {},    //每个form页面必传
      modalType: '',   //每个form页面必传  是否可以编辑
      visible: false,
      loading: false,
      flag: true,
    }
    //初始化数据信息
    FormDef.initSellerManageForm(this, this.state.formData)
    
    //使用公共input change必加
    this.handleOnChange = Utils.handleOnChange.bind(this, 'formData')
  }
  
  /**
   *  请求回调
   */
  onServiceChange = (data) => {
    this.setState({loading: false})
    if (data.errMsg) {
      this.setState({errMsg: data.errMsg})
      return
    }
    if (data.operation === 'retrieveInfo') {
    }
  }
  
  componentDidMount() {
      let attrList = [
          {
              name: 'area',
              validator: this.checkArea
          },
          {
              name: 'principalTelephone',
              validator: this.checkNumber
          },
          {
              name: 'cardNo',
              validator: this.checkCardNo
          },
          {
              name: 'phone',
              validator: this.checkNumber
          },

      ];
    this.state.validRules = FormDef.getSellerManageFormRule(this,attrList)
    let {modalType, editData} = this.props
    if (modalType === 'detail') {
      this.setState({
        modalType: modalType,
        formData: editData
      })
    }
  }
    checkArea = () =>{
      let {province,city,district} = this.state.formData;
      if(province == undefined){
          return '请选择【省】';
      }
        if(city == undefined){
            return '请选择【市】';
        }
        if(district == undefined){
            return '请选择【区】';
        }
    }
    //数字验证
    checkNumber = (value) =>{
       let number =   /^\d+$/;
       if(value !='' && !number.test(value)){
           return '请输入数字';
       }
    }

    checkCardNo = (value) =>{
       value = value.replace(/\s/g, '');
        let number =   /^\d+$/;
        if(value !='' && !number.test(value)){
            return '请输入数字';
        }
        if(value.length < 16){
            return '【银行卡号】最少输入【16】个字符';
        }
        if(value.length > 19){
            return '【银行卡号】最多输入【19】个字符';
        }
    }
  
  componentWillUnmount() {
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    return JSON.stringify(this.state) !== JSON.stringify(nextState)
  }
  
  //获取块级
  /**
   *  list 为 [{}]
   *  对象内包括
   *      key   :  key
   *      label :  label
   */
  getComFormItem = (list = [], colpParam = {},isRender) => {
      if(isRender){
          //不需要修改的
          return list.map( item =>{
              let spanHtm = <span>{this.state.formData[item.key]}</span>
              return FormUtils.getFormItem(this,{key:item.key,label:item.label,required:item.required,...colpParam},{component:spanHtm})
          })
      }
      return list.map( item =>{
          return FormUtils.getFormItem(this, {key: item.key, label: item.label,required:item.required, ...colpParam},{component:item.component})
      })
  }

    /**
     *  点击确定，提交数据
     */
    onSubmit = () => {
        if (Common.validator(this, this.state.formData)) {
            console.log('成功')
        }
    }
    //处理省市区
    handleArea=()=>{
        let area = this.address.getAddressFilter();
        this.state.formData.province = area.province;
        this.state.formData.city = area.city;
        this.state.formData.district = area.town;
        this.setState({loading:false},()=>{
            Common.validator(this,this.state.formData,'area')
        });
    }
  //返回
  onClickBack = () => {
    this.props.onClickBack()
  }

  //银行卡号的处理
    handleOnChangeCardNo = (e)=>{
        // let value =  e.target.value.replace(/\s/g, ''),val;
        let tmp = e.target.value.replace(/\s/g, ''),val='';
        for (var i=0;i<tmp.length;i++)
        {
            if (i%4===0 && i>0)
            {
                val = val + " " + tmp.charAt(i);
            } else {
                val = val + tmp.charAt(i);

            }
        }
        this.state.formData.cardNo = val;
        this.setState({loading:false},()=>{
            Common.validator(this,this.state.formData, 'cardNo');
        });

    }
  
  render() {
      //处理详细地址，公司状况
      let addressText = this.state.modalType === 'detail'? <span>{this.state.formData['address']}</span> : <TextArea rows={3} name='address' id='address' value={this.state.formData['address']} style={{resize:'none',marginTop:5}} onChange={this.handleOnChange} placeholder='请输入详细地址'/>;
      let companyProfileText = this.state.modalType === 'detail'? <span>{this.state.formData['companyProfile']}</span> : <TextArea rows={3} name='companyProfile' id='companyProfile' value={this.state.formData['companyProfile']} style={{resize:'none',marginTop:5}} onChange={this.handleOnChange} placeholder='请输入公司状况'/>;
      //处理银行卡号
      let cardNoInput = this.state.modalType === 'detail'? <span>{this.state.formData['cardNo']}</span> : <Input name='cardNo' id='cardNo' value={this.state.formData['cardNo']} onChange={this.handleOnChangeCardNo} placeholder='请输入银行卡号'/>;

      let area = <AreaPosition  name='orgAddress'   id='orgAddress' ref={ref=>this.address=ref} handleArea={this.handleArea} />
    let sellerManageInfo = this.getComFormItem([
      {key: 'vendorName', label: '商家名称',required:true},
      {key: 'area', label: '所在区域',required:true,component:area},
      {key: 'address', label: '详细地址',required:true,component:addressText},
      {key: 'principal', label: '负责人',required:true},
      {key: 'principalTelephone', label: '负责人电话',required:true},
      {key: 'companyProfile', label: '企业状况',component:companyProfileText},
    ])
    //财务信息
    let financeInfo = this.getComFormItem([
        {key: 'accountName', label: '开户名称'},
        {key: 'depositBank', label: '开户银行'},
        {key: 'accountOpeningBranch', label: '开户支行'},
        {key: 'cardNo', label: '银行卡号',component:cardNoInput},
    ],{required:true})
      //常用联系人信息
      let contactsInfo = this.getComFormItem([
          {key: 'linkman', label: '联系人'},
          {key: 'phone', label: '联系电话'},
      ])
    let title = '新增',
        modalBtn = (
            <Row>
              <Col offset={9}>
                <Button type='primary' onClick={this.onSubmit} className='form-submit-btn'>确定</Button>
              </Col>
            </Row>
        )
    
    //详情页面  不显示输入框  不显示按钮
    if (this.props.modalType === 'detail') {
      title = '详情'
      modalBtn = ''
    }
    return (
        <div>
          <div className='modal-form-wrap'>
            <div className='modal-list-box'>
              <div className='modal-list-title'></div>
              {sellerManageInfo}
            </div>
            <div className='modal-list-box'>
              <div className='modal-list-title'>财务信息</div>
              {financeInfo}
            </div>
            <div className='modal-list-box'>
              <div className='modal-list-title'>常用联系人</div>
                {contactsInfo}
            </div>
            {modalBtn}
          </div>
        </div>
    )
  }
}

export default SellerManageModal