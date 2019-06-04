/**
 *   全部商品
 *   Create by Malson on 2019/4/10
 */

import React from 'react';
import { Button, Divider } from 'antd'
import DictTable from '../../../lib/Components/DictTable';
import Filter from './components/Filter';
import FormDef from './components/AllGoodsForm'
import AllGoodsStore from './store/AllGoodsStore'

const tableName = 'AllGoodsTable';

class AllGoodsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: {
                recordSet: [],
                errMsg: '',
                startPage: 1,
                pageRow: 10,
                totalRow: 0,
            },
            loading: false,//页面table加载状态
            pageType: '',//页面类型，新增（''）的话显示table 其他显示表格页面
            editData: {},//编辑时数据
        }
    }
    componentDidMount() {
        this.unsubcribe = AllGoodsStore.listen(this.onServiceChange);
        this.handleQueryClick();
    }
    onServiceChange = (data) => {
        if(data.errMsg){
            this.setState({errMsg:data.errMsg});
            return;
        }
        if (data.operation === 'retrieve') {
            let recordSet = data.recordSet.list;
            let cargoOwnerSet = {recordSet,errMsg:'',startPage:data.recordSet.startPage,pageRow:data.recordSet.pageRow,totalRow:data.recordSet.totalRow};
            this.setState({cargoOwnerSet});
        }
    }

    onTableChange = (pagination, filters, sorter) => {
        let sort = sorter.order === 'ascend' ? '1' : '0';
        let tableSort = this.state.tableSort;
        if (sort === tableSort) {
            return;
        } else {
            this.state.tableSort = sort;
            this.handleQueryClick();
        }
    }
    onTableRefresh = (current,pageRow)=>{
        this.state.cargoOwnerSet.startPage = current;
        this.state.cargoOwnerSet.pageRow = pageRow;
        this.handleQueryClick();
    }
    handleQueryClick = () => {
        this.setState({ loading: true });
        let recordSet = [];
        for (let i = 0; i < 50; i++) {
            recordSet.push({
                photo: ' 图片',
                number: '20190408',
                name: '阳春白雪',
                classify: "绿茶",
                businessName: '茶虫文化',
                priceAndstock: '3898/100'
            })
        }
        setTimeout(() => {
            this.state.tableData.recordSet = recordSet
            this.setState({ loading: false });
        }, 1000)
    }

    render() {
        let { startPage, totalRow, recordSet } = this.state.tableData;
        let attrProps = {
            self: this,
            tableName: tableName,
            primaryKey: 'uuid',
            fixedTool: false,    // 固定按钮，不滚动
            btnPosition: 'top',
            tableForm: FormDef,
            editCol: false,
            editTable: false,
            defView: 'AllGoodsTable',
            totalPage: totalRow,
            currentPage: startPage,
            onRefresh: this.onTableRefresh,
        };

        let tablePage = (
            <div className='table-box'>
                <Filter ref={ref => this.Filter = ref} />
                <DictTable
                    dataSource={recordSet}
                    loading={this.state.loading}
                    attrs={attrProps}
                    onChange={this.onTableChange}
                />
            </div>
        );

        let showPage = tablePage
        let showTitle = (
            <div className='component-title'>
                <Divider type="vertical" className='line' />
                <span className='text'>全部商品</span>
            </div>
        )

        return (
            <div className='grid-wrap'>
                {showTitle}
                <div className="grid-page">
                    {showPage}
                </div>
            </div>
        )
    }
}

module.exports = AllGoodsPage