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
    data.merchantCode = ''
    data.merchantUserAccount = ''
  },
  
  getFilterFormRule: function (form) {
    return [
      {id: 'merchantCode', desc: 'xxx',},
      {id: 'merchantUserAccount', desc: 'xx',},
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
        <Button type='primary btn-margin' onClick={form.onCreate}>商家用户添加</Button>
      </div>
    ]

    /**
     *  filter样式展示
     */
    let listArray = [
      {key: 'merchantCode', label: '编号',},
      {key: 'merchantUserAccount', label: '账号',},
    ]
    let formItems = FormUtil.getFilterItems(props, listArray)
    return [...formItems, ...operaCom]
  },
  
  
  /**
   *  table
   */
  tableViews: [
    {
      name: 'merchantUserAccountTable',
      cols: ['merchantCode', 'account', 'merchantName', 'time','lastlogintime'],
      func: 'getmerchantUserAccountTableColumns'
    }
  ],
  getmerchantUserAccountTableColumns($this) {
    return [
      {
        title: '编号',
        dataIndex: 'merchantCode',
        key: 'merchantCode',
        width: 200,
        render(text, record) {
          return <a onClick={() => $this.onClickMerchantCode(record)}>{text}</a>
        }
      },
      {
        title: '账号',
        dataIndex: 'account',
        key: 'account',
        width: 200
      },
      {
        title: '商家名称',
        dataIndex: 'merchantName',
        key: 'merchantName',
        width: 200,
      },
      {
        title: '注册时间',
        dataIndex: 'time',
        key: 'time',
        width: 200,
      },
      {
        title: '最后登陆时间',
        dataIndex: 'lastlogintime',
        key: 'lastlogintime',
        width: 200,
      },
    ]
  },
  /**
   *  form
   */
  // 初始化数据
  initCargoOwnerForm($this, data) {
    //传入string为初始化值为"",传入数组初始值为第二项
    $this.state.hints = {}
    let fieldList = [
      'merchantUserAccount',
      'merchant',
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
  getmerchantUserAccountFormRule($this) {
    return [
      {id: 'merchantUserAccount', desc: '账号', required: true,max:15,min:5},
      {id: 'merchant', desc: '商家', required: true},
    ]
  }
}

