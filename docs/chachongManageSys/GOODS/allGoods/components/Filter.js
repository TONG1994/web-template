import React from 'react'
import { Button, Input, Select } from 'antd'
import FormDef from './AllGoodsForm'

let Utils = require('../../../../public/script/utils')
class Filter extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            hints: {},
            validRules: [],
            filter: {},
            update: true
        }
        //初始化条件
        // FormDef.initFilterForm(this.state.filter)
        //使用公共input change必加(能在input框中输入数据)
        this.handleOnChange = Utils.handleOnChange.bind(this, 'filter')
    }


    render() {
        let items = FormDef.getFilterForm(this, this.state.filter)
        return (
            <div className='filter-wrap'>
                {items}
            </div>
        )
    }

}
module.exports = Filter