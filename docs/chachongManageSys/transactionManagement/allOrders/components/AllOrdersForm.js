'use strict';
import React from 'react';
import {Radio, Icon, Button, Row, Col, Badge, Select} from 'antd';
import FormUtil from '../../../../lib/Components/FormUtil';

const RadioGroup = Radio.Group;
const Option = Select.Option;

let colWidth = [6, 12, 18, 24];

export default{
   /**
   *  filter
   *  不做数据筛选
   */
  initFilterForm(data){
    data.orderCode = '';
    data.merchant = '';
    data.buyerPhone = '';
  },

  getFilterFormRule(form){
    return[
      {id: "orderCode", desc: "订单编号"},
      {id: "merchant", desc: "商家"},
      {id: "buyerPhone", desc: "买家手机号"}
    ]
  },

  getFilterForm(form,data,attrList){
    let attr = FormUtil.getParam(form,attrList);
    let attrMap = attr.attrMap;
    let itemLayouts = FormUtil.getFromSpan()[1];
    let hints = form.state.hints;
    let props = {
      $this: form,
      data,
      hints,
      itemLayouts,
      attrMap
    };
    const operaCom = [
      <div className="table-operation" key="operation">
        <span className="filter-reset"><a onClick={form.onReset}>重 置</a></span>
        <Button type="primary btn-margin" onClick={form.onSearch}>查 询</Button>
        <Button type="primary btn-margin" onClick={form.onCreate}>新 增</Button>
      </div>
    ];
    let listArray = [
      {key: "orderCode", label: "订单编号"},
      {key: "merchant", label: "商家"},
      {key: "buyerPhone", label: "买家手机号"}
    ]
    let fromItem = FormUtil.getFilterItems(props,listArray);
    return [...fromItem,...operaCom];
  },

  /**
   * table
   */
  tableViews: [
    {
      name: 'AllOrdersTable',
      cols: ['good', 'unitPrice', 'num', 'merchant','buyer','tradingStatus','actualPayment'],
      func: 'getAllOrdersTableColumns'
    }
  ],

  getAllOrdersTableColumns($this){
    return [
      {
        title:"商品",
        dataIndex: 'good',
        key:"good",
        width:200,
        render(text,record){
          return <a onClick={()=>$this.onClickUserCode(record)}>{text}</a>
        }
      },
      {
        title: '单价(元)',
        dataIndex: 'unitPrice',
        key: 'unitPrice',
        width: 200
      },
      {
        title: '数量',
        dataIndex: 'num',
        key: 'num',
        width: 200,
      },
      {
        title: '商家',
        dataIndex: 'merchant',
        key: 'merchant',
        width: 200,
      },
      {
        title: '买家',
        dataIndex: 'buyer',
        key: 'buyer',
        width: 200
      },
      {
        title: '交易状态',
        dataIndex: 'tradingStatus',
        key: 'tradingStatus',
        width: 200,
      },
      {
        title: '实收款(元)',
        dataIndex: 'actualPayment',
        key: 'actualPayment ',
        width: 200,
      },
    ]
  },

}

