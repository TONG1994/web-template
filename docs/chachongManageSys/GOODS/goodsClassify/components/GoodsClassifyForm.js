import React from 'react'
import { Radio, Icon, Button, Row, Col, Badge, Select } from 'antd'
import FormUtil from '../../../../lib/Components/FormUtil'


export default {

    //头部
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
                <Button type='primary btn-margin' onClick={form.onAdd}>添加分类</Button>
            </div>
        ]
        /**
         *  filter样式展示
         */
        let formItems = FormUtil.getFilterItems(props, [])
        return [...formItems, ...operaCom]
    },

    /**
     *  table
     */
    getGoodsClassifyTableColumns() {
        return [
            {
                title: '分类名称',
                dataIndex: 'name',
                key: 'name',
            }
        ]
    }
}