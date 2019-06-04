'use strict'
import React from 'react'
import {Radio, Icon, Button, Row, Col, Badge, Select} from 'antd'
import FormUtil from '../../../../lib/Components/FormUtil'

const RadioGroup = Radio.Group
const Option = Select.Option

let colWidth = [6, 12, 18, 24]

export default {
  /**
   *  filter
   *  不做数据筛选
   */
  
  initFilterForm(data) {
    data.userCode = '初始值1'
    data.userType = ''
  },
  
  getFilterFormRule: function (form) {
    return [
      {id: 'userCode', desc: 'xxx',},
      {id: 'userType', desc: 'xx',},
    ]
  },
  
  getFilterForm(form, data, attrList) {
    
    let attr = FormUtil.getParam(form, attrList)
    let attrMap = attr.attrMap
    let itemLayouts = FormUtil.getFromSpan()[1]
    let hints = form.state.hints
    let props = {
      $this: form,
      data,
      hints,
      itemLayouts,
      attrMap
    }
    const operaCom = [
      <div className='table-operation' key='operation'>
        <span className='filter-reset'><a onClick={form.onReset}>重置</a></span>
        <Button type='primary btn-margin' onClick={form.onSearch}>查询</Button>
        <Button type='primary btn-margin' onClick={form.onCreate}>新增</Button>
      </div>
    ]
    let selectCom = (
        <Select onChange={form.onSelectFilter} value={data.userType}>
          <Option value="">-请选择-</Option>
          <Option value="10">未审核</Option>
          <Option value="11">审核中</Option>
          <Option value="12">审核通过</Option>
          <Option value="14">不通过</Option>
        </Select>
    )
    /**
     *  filter样式展示
     */
    let listArray = [
      {key: 'userCode', label: '过滤条件1',},
      {key: 'userType', label: '过滤条件2', component: selectCom},
    ]
    let formItems = FormUtil.getFilterItems(props, listArray)
    return [...formItems, ...operaCom]
  },
  
  
  /**
   *  table
   */
  tableViews: [
    {
      name: 'XxxTable',
      cols: ['name', 'phone', 'age', 'time'],
      func: 'getSellerManageTableColumns'
    }
  ],
  getSellerManageTableColumns($this) {
    return [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        width: 200,
        render(text, record) {
          return <a onClick={() => $this.onClickUserCode(record)}>{text}</a>
        }
      },
      {
        title: '手机号',
        dataIndex: 'phone',
        key: 'phone',
        width: 200
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
        width: 200,
      },
      {
        title: '时间',
        dataIndex: 'time',
        key: 'time',
        width: 200,
      },
    ]
  },
  /**
   *  form
   */
  // 初始化数据
  initSellerManageForm($this, data) {
    //传入string为初始化值为"",传入数组初始值为第二项
    $this.state.hints = {}
    let fieldList = [
      'vendorName',
      'area',
      'address',
      'principal',
      'principalTelephone',
      'companyProfile',
      'accountName',
      'depositBank',
      'accountOpeningBranch',
      'cardNo',
      'linkman',
      'phone',
    ]
    fieldList.map(item => {
      if (typeof item === "string") {
        data[item] = ''
      } else {
        data[item[0]] = item[1]
      }
    })
  },
  /**
   *  获取校验规则
   */
  getSellerManageFormRule(form,attrList) {
    let attrMap = FormUtil.getRuleObj(attrList);
    return [
        {id: 'vendorName', desc: '商家名称', required: true,max:50},
        {id: 'area', desc: '所在区域',...attrMap.area},
        {id: 'address', desc: '详细地址', required: true,max:50},
        {id: 'principal', desc: '负责人', required: true,max:16},
        {id: 'principalTelephone', desc: '负责人电话', required: true,max:15,...attrMap.principalTelephone},
        {id: 'companyProfile', desc: '企业状况',max:100},
        {id: 'accountName', desc: '开户名称', required: true,max:50},
        {id: 'depositBank', desc: '开户银行', required: true,max:50},
        {id: 'accountOpeningBranch', desc: '开户支行', required: true,max:50},
        {id: 'cardNo', desc: '银行卡号', required: true,...attrMap.cardNo},
        {id: 'linkman', desc: '联系人',max:16 },
        {id: 'phone', desc: '联系电话',max:15,...attrMap.phone},
    ]
  }
}

