/**
 *   Create by Malson on 2019/2/27
 */

import React from 'react'
import {Row, Col, Button, Upload, Modal} from 'antd'
import FormUtils from '@/lib/Components/FormUtils'
import FormDef from './NewGoodsForm'
// 引入编辑器组件
import BraftEditor from 'braft-editor'
import DocTemplate from './DocTemplate';
import '../style/index.scss';

let Utils = require('@/public/script/utils')
let Common = require('@/public/script/common')


class NewGoodsModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      formData: {},    //每个form页面必传
      modalType: '',   //每个form页面必传  是否可以编辑
      visible: false,
      loading: false,
      flag: true,
      previewVisible:false,
      previewImage:'',
        fileList: [{
            uid: '-1',
            name: 'xxx.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },{
            uid: '-1',
            name: 'xxx.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },{
            uid: '-1',
            name: 'xxx.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },{
            uid: '-1',
            name: 'xxx.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },{
            uid: '-1',
            name: 'xxx.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        }],
        editorState:BraftEditor.createEditorState(null),
    }
    //初始化数据信息
    FormDef.initNewGoodsForm(this, this.state.formData)
    
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
    this.state.validRules = FormDef.getNewGoodsFormRule(this)
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
    // if (Common.validator(this, this.state.formData)) {
    //   console.log('成功')
    // }

      // let htmlInfo = {
      //     html:this.state.editorState.toHTML(),
      //     title:adManage.title,
      //     userName,
      //     publishDate:adManage.upTime,
      // };
      // let innerHtml = DocTemplate(htmlInfo);
     let  innerHtml = this.buildPreviewHtml(); //生成的html
     console.log(innerHtml);
      let rawContent = this.state.editorState.toRAW(); //富文本编辑的内容
      let textData = Utils.deepCopyValue(JSON.parse(rawContent));
      if(JSON.stringify(textData.entityMap) == '{}'){
          //富文本编辑的没有内容
      }
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
      return FormUtils.getFormItem(this, {key: item.key, label: item.label,required:item.required, ...colpParam})
    })
  }
  //返回
  // onClickBack = () => {
  //   this.props.onClickBack()
  // }

    //图片显示
    handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }
    //富文本编辑器
    handleChange = (editorState) => {
        this.setState({ editorState });
    }

    buildPreviewHtml = ()=>{
        let htmlInfo = {
            html:this.state.editorState.toHTML(),
            title:'',
            userName: '',
            publishDate:'',
        };
        return DocTemplate(htmlInfo);
    }

    preview =() =>{
        if (window.previewWindow) {
            window.previewWindow.close()
        }
        window.previewWindow = window.open()
        window.previewWindow.document.write(this.buildPreviewHtml())
        window.previewWindow.document.close()

    }

    uploadFn = (param) => {
       //TODO
        const serverURL = Utils.xilaimanagerUrl + 'advertisement/upload';
        const xhr = new XMLHttpRequest;
        const fd = new FormData();
        const successFn = (event) => {
            // 假设服务端直接返回文件上传后的地址
            // 上传成功后调用param.success并传入上传后的文件地址
            let thisTarget = event.target;
            if(thisTarget.status===200 || thisTarget.statusText==="OK"){
                let response = thisTarget.response;
                try { response = JSON.parse(response)}catch (err){}
                if(response.errCode == null || response.errCode == '' || response.errCode == '000000'){
                    let url = response.object,
                        id = response.object.split("=")[1];
                    param.success({
                        url,
                        meta: {
                            id,
                            alt: '图片',
                        }
                    })
                }else{
                    if(response.errCode === 'AUTH11' || response.errCode === 'AUTH09'){
                      //TODO
                        // Utils.handleServer(result.errCode);
                    }else{
                        Common.warnMsg('图片上传失败[' + response.errCode + '][' + response.errDesc + ']');
                    }
                }

            }
            else{
                param.error({
                    msg: '上传错误！'
                });
            }
        };

        const progressFn = (event) => {
            // 上传进度发生变化时调用param.progress
            param.progress(event.loaded / event.total * 100)
        };

        const errorFn = (response) => {
            // 上传发生错误时调用param.error
            param.error({
                msg: '上传错误！'
            })
        };
        xhr.upload.addEventListener("progress", progressFn, false);
        xhr.addEventListener("load", successFn, false);
        xhr.addEventListener("error", errorFn, false);
        xhr.addEventListener("abort", errorFn, false);
        fd.append('file', param.file);
        xhr.open('POST', serverURL, true);
        xhr.send(fd);
    }


  render() {
    let {formData} = this.state
    //商品基本信息
    let goodsInfo = this.getComFormItem([
      {key: 'name', label: '分类',required:true},
      {key: 'phone', label: '商品名称',required:true},
      {key: 'age', label: '商家名称',required:true},
    ],)
    //销售信息
    let otherInfo = this.getComFormItem([
      {key: 'time', label: '时间'},
    ])
      //商品详情
      let goodsDetailInfo = this.getComFormItem([
          {key: 'name', label: '分类',required:true},
          {key: 'phone', label: '商品名称',required:true},
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

    //富文本编辑器
      const editorProps = {
          media: {
              allowPasteImage: true, // 是否允许直接粘贴剪贴板图片（例如QQ截图等）到编辑器
              image: true, // 开启图片插入功能
              uploadFn: this.uploadFn, // 指定上传函数，说明见下文
          },
          controls: [
              'undo', 'redo', 'separator','split', 'font-size','separator','line-height','separator','letter-spacing','separator',
              'text-color', 'bold', 'italic', 'underline', 'separator', 'strike-through','superscript','subscript',
              'remove-styles',  'separator','text-align',  'separator','split', 'blockquote', 'split', 'link', 'split', 'media', 'hr', 'separator','clear'
          ],
      };
      const extendControls = [
          {
              key: 'custom-button',
              type: 'button',
              text: '预览',
              onClick: this.preview,
          }
      ]
    return (
        <div>
          <div className='modal-form-wrap'>
            <div className='modal-list-box'>
              <div className='modal-list-title'>商品基本信息</div>
              {goodsInfo}
            </div>
            <div className='modal-list-box'>
              <div className='modal-list-title'>销售信息</div>
              {otherInfo}
            </div>
            <div className='modal-list-box'>
              <div className='modal-list-title'>商品详情</div>
                {goodsDetailInfo}
                <div style={{display:'inline-block'}}>
              <Upload
                  listType="picture-card"
                  fileList={this.state.fileList}
                  onPreview={this.handlePreview}
              >
              </Upload>
              <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={this.state.previewImage} />
              </Modal>
                </div>
              <div><span style={{color:'red',paddingRight:10}}>*</span>商品详情</div>
              <BraftEditor
                  placeholder="请输入正文内容"
                  onChange={this.handleChange}
                  value ={this.state.editorState}
                  extendControls={extendControls}
                  {...editorProps}
              />

            </div>
            <div className='modal-list-box'>
              <div className='modal-list-title'>其他信息</div>
                {otherInfo}
            </div>
            {modalBtn}
          </div>
        </div>
    )
  }
}

export default NewGoodsModal