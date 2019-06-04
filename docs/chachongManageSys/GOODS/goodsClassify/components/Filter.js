import React from 'react'
import FormDef from './GoodsClassifyForm'
import '../main.css'

class Filter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hints: {},
            validRules: [],
            filter: {},
            update: true
        }
    }

    onAdd = () => {
        this.props.onFilterAdd()
    }

    render() {
        let items = FormDef.getFilterForm(this, this.state.filter)
        return (
            <div className="filter-wrap filterRight">
                {items}
            </div>
        )
    }
}

module.exports = Filter