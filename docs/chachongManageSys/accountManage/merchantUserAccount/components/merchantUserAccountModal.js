/**
 *   Create by Malson on 2019/2/27
 */

import React from 'react'
import { Row, Col, Button, Modal,Select} from 'antd'
const Option = Select.Option;
import FormUtils from '@/lib/Components/FormUtils'
import FormDef from './merchantUserAccountForm'

let Utils = require('@/public/script/utils')
let Common = require('@/public/script/common')


class merchantUserAccountModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      formData: {},    //每个form页面必传
      modalType: '',   //每个form页面必传  是否可以编辑
      visible: false,
      loading: false,
      flag: true,
      ModalText: '',
      visible: false,
    }
    //初始化数据信息
    FormDef.initCargoOwnerForm(this, this.state.formData)
    
    //使用公共input change必加
    this.handleOnChange = Utils.handleOnChange.bind(this, 'formData')
  }
  
  /**
   *  请求回调
   */
  onServiceChange = (data) => {
    this.setState({loading: false})
    if (data.errMsg) {
      this.setState({errMsg: data.errMsg})
      return
    }
    if (data.operation === 'retrieveInfo') {
    }
  }
  
  componentDidMount() {
    this.state.validRules = FormDef.getmerchantUserAccountFormRule(this)
    let {modalType, editData} = this.props
    if (modalType === 'detail') {
      this.setState({
        modalType: modalType,
        formData: editData
      })
    }
  }
  
  componentWillUnmount() {
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    return JSON.stringify(this.state) !== JSON.stringify(nextState)
  }
  
  /**
   *  点击确定，提交数据
   */
  onSubmit = () => {
    if (Common.validator(this, this.state.formData)) {
      //创建商家账号成功后弹出框显示信息。
      // this.setState({
      //   visible: true,
      // });
      Modal.success({
        title: '商家用户添加成功，请复制账号信息',
        content: <div><div>账号:  1234</div><div>密码:  1111</div><div>商家名称:  张胜男</div></div>,
        okText:'复制好了'
      });
    }
  }

  handleOk = () => {
    this.setState({
      visible: false,
    });
    this.onClickBack();
  }

  //获取块级
  /**
   *  list 为 [{}]
   *  对象内包括
   *      key   :  key
   *      label :  label
   */
  getComFormItem = (list = [], colpParam = {}) => {
    return list.map(item => {
      return FormUtils.getFormItem(this, {key: item.key, label: item.label, ...colpParam})
    })
  }
  //返回
  onClickBack = () => {
    this.props.onClickBack()
  }
   handleChange= (value) =>{
    console.log(`selected ${value}`);
  }
 
  handleBlur = () => {
    console.log('blur');
  }
  
  render() {
    let {formData} = this.state
    const { visible, confirmLoading, ModalText } = this.state;
    //个人信息
    const children = [];
    for (let i = 10; i < 36; i++) {
      children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
    }

    let select=(<Select
      showSearch
      style={{ width: 200 }}
      placeholder="Select a person"
      optionFilterProp="children"
      onChange={this.handleChange}
      onBlur={this.handleBlur}
      filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
    >
      {children}
    </Select>)
    let merchantUserAccountInfo = this.getComFormItem([
      {key: 'merchantUserAccount', label: '账号'},
      {key: 'merchant', label: '关联商家'},
    ],)
  
    let title = '新增',
        modalBtn = (
            <Row>
              <Col offset={9}>
                <Button type='primary' onClick={this.onSubmit} className='form-submit-btn'>确定</Button>
              </Col>
            </Row>
        )
    
    //详情页面  不显示输入框  不显示按钮
    if (this.props.modalType === 'detail') {
      title = '详情'
      modalBtn = ''
    }

    return (
        <div>
          <div className='modal-form-wrap'>
            <div className='modal-list-box'>
              {merchantUserAccountInfo}
            </div>
            {modalBtn}
          </div>

          {/* <Modal
            title="商家用户添加成功，请复制后粘贴保存"
            ModalText={ModalText}
            visible={visible}
            onOk={this.handleOk}
            confirmLoading={confirmLoading}
            icon="question-circle"
            footer={[
              <Button key="submit" type="primary" loading={confirmLoading} onClick={this.handleOk}>
                复制
              </Button>,
            ]}
          > </Modal> */}
        </div>
    )
  }
}

export default merchantUserAccountModal