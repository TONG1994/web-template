/**
 *   商品分类
 *   Create by Malson on 2019/4/10
 */

import React from 'react';
import { Button, Divider, Tree, Input, Icon, Table } from 'antd'
import Filter from './components/Filter'
import FormDef from './components/GoodsClassifyForm'
import DictTable from '../../../lib/Components/DictTable';
const { TreeNode } = Tree;
const tableName = 'GoodsClassifyTable'

class GoodsClassifyPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: {
                recordSet: [],
            },
            loading: false,//页面table加载状态
            pageType: '',//页面类型，新增（''）的话显示table 其他显示表格页面
            editData: {},//编辑时数据
            inputAData: '',//一级类目input框输入的数据
            inputBData: '',//子分类input框输入的数据
        }
    }
    componentDidMount() {
        this.putData()
    }

    putData = () => {
        this.setState({ loading: true });
        let recordSet = [{
            key: 1,
            name: '一级类目',
            children: [{
                key: 11,
                name: '二级类目',
            }, {
                key: 12,
                name: '二级类目',
            }, {
                key: 13,
                name: <Input
                    style={{ width: 300 }}
                    placeholder="添加子分类"
                    onChange={this.inputBonChange}
                    onBlur={this.inputBOnBlur}
                />,
            }],
        }, {
            key: 2,
            name: '一级类目',
            children: [{
                key: 21,
                name: '二级类目',
            }, {
                key: 22,
                name: '二级类目',
            }, {
                key: 23,
                name: '二级类目',
            }],
        }];
        setTimeout(() => {
            this.state.tableData.recordSet = recordSet
            this.setState({ loading: false });
        }, 1000)
    }

    onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
    }

    //添加分类
    onAdd = () => {
        //TODO 新增一级类目
        this.setState({ loading: true });
        let recordSet = this.state.tableData.recordSet;
        let islast = typeof (recordSet[recordSet.length - 1].name);
        //判断数组最后name的类型是否为object，是就不新增input框，反之新增
        if (islast != typeof ({})) {
            let key = recordSet.length + 1
            recordSet.push({
                key: key,
                name: <Input
                    onChange={this.inputAonChange}
                    style={{ width: 300 }}
                    placeholder="添加分类"
                    onBlur={this.inputAOnBlur}
                />
            })
            this.state.tableData.recordSet = recordSet
            this.setState({ loading: false });
        }
    }
    //input框输入内容(一级类目)
    inputAonChange = (e) => {
        const { value } = e.target;
        this.state.inputAData = value
    }
    //input框失去焦点(一级类目)
    inputAOnBlur = () => {
        this.setState({ loading: true });
        let inputData = this.state.inputAData
        if (inputData == "") {
            //没有输入数据，删除input框
            let recordSet = this.state.tableData.recordSet;
            let delLast = recordSet.length - 1
            recordSet.splice(delLast)
            this.state.tableData.recordSet = recordSet
            this.setState({ loading: false });
        } else {
            //有数据，保存一级类目
            //TODO
            console.log("保存数据")
            this.setState({ loading: false });
        }
    }

    //input框输入内容(子分类)
    inputBonChange = (e) => {
        const { value } = e.target;
        this.state.inputBData = value
    }
    //input框失去焦点(子分类)
    inputBOnBlur = () => {
        this.setState({ loading: true });
        this.setState({ loading: false });
        let inputData = this.state.inputBData
        if (inputData != "") {
            //TODO
            console.log("保存数据")
        }
    }


    render() {
        let recordSet = this.state.tableData.recordSet;
        //获取表格结构
        let columns = FormDef.getGoodsClassifyTableColumns();
        let filterProps = {
            onFilterAdd: this.onAdd
        }
        //类目勾选时触发的方法
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            onSelect: (record, selected, selectedRows) => {
                console.log(record, selected, selectedRows);
            },
            onSelectAll: (selected, selectedRows, changeRows) => {
                console.log(selected, selectedRows, changeRows);
            },
        };
        let tablePage = (
            <div className='table-box'>
                <Filter ref={ref => this.Filter = ref} {...filterProps} />
                <Table
                    loading={this.state.loading}
                    columns={columns}
                    dataSource={recordSet}
                // rowSelection={rowSelection}
                />
            </div>
        )
        let showPage = tablePage;
        let showTitle = (
            <div className='component-title'>
                <Divider type="vertical" className='line' />
                <span className='text'>商品分类</span>
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
module.exports = GoodsClassifyPage;