/**
 *   商品品牌
 *   Create by Malson on 2019/4/10
 */

import React from 'react'
import DictTable from '../../../lib/Components/DictTable';
import FormDef from './components/GoodsBrandFrom'
import Filter from './components/Filter';
import FormModal from './components/GoodsBrandModal';
import CommonAnimate from '@/public/script/CommonAnimate'
import { Button, Divider } from 'antd'


class GoodsBrandPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,//页面table加载状态
            pageType: '',//页面类型，新增（''）的话显示table 其他显示表格页面
            editData: {},//编辑时数据
        }
    }

    //关闭弹窗
    onClickBack = () => {
        this.setState({ pageType: '' });
    }
    // add
    onFilterCreate = () => {
        this.setState({ pageType: 'add' });
    }
    render() {
        let { pageType} = this.state;
        let filterProps = {
            onFilterCreate: this.onFilterCreate,
        }
        let tablePage = (
            <div className='table-box'>
                <Filter ref={ref => this.Filter = ref} {...filterProps} />
                {/* TODO 添加表单 */}
            </div>
        )
        // let formPage = (
        //     <CommonAnimate>
        //         <div key='1'>
        //             <FormModal {...modalProps} />
        //         </div>
        //     </CommonAnimate>
        // )
        let showPage = tablePage
        let showTitle = (
            <div className='component-title'>
                <Divider type="vertical" className='line' />
                <span className='text'>商品品牌</span>
            </div>
        )
        if (pageType) {//进入表单
            // TODO 创建新增页面的表单
            // showPage = formPage;
            showTitle = (
                <div className='component-title'>
                    <Divider type="vertical" className='line' />
                    <span className='text'>添加品牌</span>
                    <Button type='default' onClick={this.onClickBack} >返回</Button>
                </div>
            )
        }

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

module.exports = GoodsBrandPage