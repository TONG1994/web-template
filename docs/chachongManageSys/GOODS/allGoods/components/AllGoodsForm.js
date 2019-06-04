import React from 'react'
import { Radio, Icon, Button, Row, Col, Badge, Select } from 'antd'
import FormUtil from '../../../../lib/Components/FormUtil'

export default {

  // initFilterForm(data) {
  //   data.goodsName = ''
  //   data.goodsClassify = ''
  //   data.business = ''
  // },


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
        <span className='filter-reset'><a>重置</a></span>
        <Button type='primary btn-margin'>查询</Button>
      </div>
    ]

    /**
     *  filter样式展示
     */
    let listArray = [
      { key: 'goodsName', label: '商品名称', },
      { key: 'goodsClassify', label: '商品分类', },
      { key: 'business', label: '商家', },
    ]
    let formItems = FormUtil.getFilterItems(props, listArray)
    return [...formItems, ...operaCom]
  },

  /**
  *  table
  */
  tableViews: [
    {
      name: 'AllGoodsTable',
      cols: ['photo', 'number', 'name', 'classify', 'businessName', 'priceAndstock'],
      func: 'getAllGoodsTableColumns'
    }
  ],
  getAllGoodsTableColumns($this){
    return [
      {
        title: '商品图片',
        dataIndex: 'photo',
        key: 'photo',
        width: 200,
      },
      {
        title: '商品编号',
        dataIndex: 'number',
        key: 'number',
        width: 200
      },
      {
        title: '商品名称',
        dataIndex: 'name',
        key: 'name',
        width: 200,
      },
      {
        title: '分类',
        dataIndex: 'classify',
        key: 'classify',
        width: 200,
      },
      {
        title: '商家',
        dataIndex: 'businessName',
        key: 'businessName',
        width: 200,
      },
      {
        title: '售价/库存',
        dataIndex: 'priceAndstock',
        key: 'priceAndstock',
        width: 200,
      },
    ]
  }

}
