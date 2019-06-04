import React from 'react'
import {Radio, Icon, Button, Row, Col, Badge, Select} from 'antd'
import FormUtil from '../../../../lib/Components/FormUtil'

export default {
    
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

        /**
         *  filter样式展示
         */
        let listArray = [
          {key: 'goodsName', label: '商品名称',},
        ]
        let formItems = FormUtil.getFilterItems(props, listArray)
        return [...formItems, ...operaCom]
      },
}