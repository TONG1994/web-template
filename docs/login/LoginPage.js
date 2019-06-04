let $ = require('jquery');
import React from 'react';
import {withRouter,browserHistory} from 'react-router';
import {Form, Button, Input, Icon, Checkbox, Col, Row, Spin,message,Alert} from 'antd';
import ErrorMsg from '../lib/Components/ErrorMsg';
import SlideBlockPage from './Components/SlideBlockPage';
import './style/login.scss';
import ResetPwdPage from './Components/ResetPasswdPage';
import LogActions from './action/LogActions';
import LogStores from './data/LogStores';
import Logo from './style/login_logo.png';
import error from './style/error_icon.svg';

const FormItem = Form.Item;

let Common = require('../public/script/common');
let LoginUtil = require('./LoginUtil');
let slideState = 'start';
let FormDef = require('./Components/LoginForm');

class LoginPage2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        userName: '',
        passwd: ''
      },
      loading: false,
      errMsg: '',
      hints: {},
      action: 'login',
      validRules: [],
      slideEnd: false,
    };
    let loginData = window.sessionStorage.getItem('loginData');
    if (loginData !== null && typeof (loginData) !== 'undefined') {
      let skip = false;
      let loc = this.props.location;
      if (loc !== null && typeof (loc) !== 'undefined') {
        let path = loc.pathname;
        if (path !== '') {
          if (loc.search !== '') {
            skip = true;
          } else if (path !== '/' && path !== '/index.html' && path !== '/test.html' && path !== '/electron.html') {
            skip = true;
          }
        }
      }
      
      if (skip && LoginUtil.loadContext()) {
        let menus = Common.getMenuList() || [];
        if (!menus.length) {
          message.error('您没有权限登录！');
          window.sessionStorage.removeItem('loginData');
          return;
        }
        let search = this.props.location.search.substring(1);
        if (search.indexOf('href') > -1) {
          search = '/' + search.split('=')[1];//对应404页面的href
        }
        // search = search.substring(0, search.lastIndexOf('/') + 1);
        this.props.router.push({
          pathname: search,
          state: {from: 'login'}
        });
      } else {
        let href = window.location.href;
        if (href.indexOf('linkid=') < 0) {
          window.sessionStorage.removeItem('loginData');
        }
      }
    }
  }
  
  
  componentDidMount() {
    let self = this;
    LoginUtil.downConfig(this).then((result) => {}, (value) => {
      Common.errMsg('加载配置文件错误');
    });
    this.state.validRules = FormDef.getFormRule(this);
    this.clear();
    //监听
    this.unsubscribe = LogStores.listen(this.onServiceChange);
    
    //绑定 enter
    $(document).on('keydown', (e) => {
      let theEvent = e || window.event;
      let code = theEvent.keyCode || theEvent.which || theEvent.charCode;
      if (code === 13) {
        this.clickLogin();
      }
    });
  };
  clear=()=>{
    FormDef.initForm(this.state.user);
    this.state.hints = {};
    this.setState({loading:false});
  }
  onServiceChange = (data) => {
    this.setState({loading: false});
    if (!data.errMsg || data.errMsg == '') {
      if (data.operation === 'login') {
        this.loginSuccess(data.recordSet);
      }
    } else if (data.errMsg && data.operation === 'login') {
      this.showError(data.errMsg);
      // this.onFailCheck();
    }
  };
  
  componentWillUnmount() {
    //解除页面内容绑定
    this.unsubscribe();
    $(document).off('keydown');
  };
  
  showError = (msg) => {
    this.setState({
      errMsg: msg
    });
  };
  // setSlideState = (state) => {
  //   slideState = state;
  //   if (state === 'end' && this.state.slideEnd) {
  //     this.setState({slideEnd: false, errMsg: ''});
  //   }else if (state === 'start' && !this.state.slideEnd) {
  //     this.setState({slideEnd: true});
  //   }
  // }
  // onSafetyNavi = (loginData) => {
  //   LoginUtil.safeNavi(this, loginData);
  // }
  // onFailCheck=()=>{
    //   this.slide.onMouseUp();
    //   this.setSlideState('start');
    //   this.slide.init();
    // }
  
  clickLogin = () => {
    // let passwd = this.state.user.passwd;
    // this.state.errMsg = '';
    // if (!Common.formValidator(this, this.state.user)) {
    //   return;
    // }
    this.loginSuccess()
    // let loginData = {
    //   password:"C4CA4238A0B923820DCC509A6F75849B",
    //   account:'admin',
    //   active:1
    // };
    // this.setState({loading: true});
    // LogActions.login(loginData);
    // return;
    // let password = Common.calcMD5(passwd);
    // let userName = this.state.user.userName;
    // if(!this.check(passwd,userName)){
    //     let loginData = {
    //         password:password,
    //         account:userName,
    //         active:1
    //     };
    //     this.setState({loading: true});
    //     LogActions.login(loginData);
    // }

    // if (slideState !== 'end') {
    // this.showError('请按住滑块，拖动到最右边!');
    //   return;
    // }

  };
  check = (passwd,userName) => {
      if (passwd == '') {
          if (userName == '') {
              this.showError('用户名和密码不能为空');
          } else {
              this.showError('密码不能为空');
          }
          return true;
      } else {
          if (userName == '') {
              this.showError('用户名不能为空');
              return true;
          }
          return false;
      }
  };

  
  // clickQuickLogin = () => {
  //    let loginData = {accountName:'admin',password:'admin123'};
  //   this.setState({loading: true});
  //   LogActions.login(loginData);
  // }
  
  loginSuccess = (loginData) => {
    let corpUuid = '';
    loginData = {"uuid":"126","account":"admin","jwt":"eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJoYmIiLCJzdWIiOiIxMjYiLCJpYXQiOjE1NTQzNjI3MDQsImV4cCI6MTU1NDQ0OTEwNH0.h8XCUaYFAV2xpDGiXHe0eDdtcqI59h1rKpRxPX5hpO_YRY3JSFv7YdPwnINCCZ_HptkncsVFAxTCuLGm_SZqVw","menuVos":[{"uuid":"1","name":"数据中心","path":"/HBBManager/dataCenter","parentUuid":null,"grade":"1","type":"0","description":null,"createTime":null,"editTime":null,"active":"1","orderNo":null,"editor":null},{"uuid":"2","name":"货主","path":"/HBBManager/dataCenter/CargoOwnerPage","parentUuid":"1","grade":"2","type":"0","description":null,"createTime":null,"editTime":null,"active":"1","orderNo":null,"editor":null},{"uuid":"3","name":"司机","path":"/HBBManager/dataCenter/DriverPage","parentUuid":"1","grade":"2","type":"0","description":null,"createTime":null,"editTime":null,"active":"1","orderNo":null,"editor":null},{"uuid":"4","name":"货源","path":"/HBBManager/dataCenter/CargoOriginPage","parentUuid":"1","grade":"2","type":"0","description":null,"createTime":null,"editTime":null,"active":"1","orderNo":null,"editor":null}]};
    LoginUtil.saveLoginData(loginData, corpUuid);
    //刷新界面  去到主页
    window.location.href = '/ChachongManage/CMS/CargoOwnerPage';
  };
  
  handleOnChange = (e) => {
    let user = this.state.user;
    let s = e.target.value.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    user[e.target.id]= s;
    // if(!Common.validator(this, user, e.target.id)){
    //   if(s.length > 20){
    //     user[e.target.id]= s.substr(0, 20);
    //   }
    // }
    this.setState({
      user: user,
      errMsg: ''
    });

    // if (this.state.errMsg) {
    //   this.onDismiss();
    // }
  }
  // onDismiss = () => {
  //   this.setState({
  //     errMsg: ''
  //   });
  // }
  reqPsd = () => {
    this.setState({action: 'resetpwd'});
  }
  onGoBack = () => {
    this.setState({action: 'login'});
  }
  onTickChange =(e)=> {
    console.log(`checked = ${e.target.checked}`);
  }
  
  render() {
    // let errMsg = this.state.errMsg;
    let layout = 'vertical';
   // let layoutItem = 'form-item-' + layout + ' ' + 'form-class';
    let items = FormDef.getForm(this, this.state.user, null,Common.modalForm, layout);
    let visible = (this.state.action === 'login') ? '' : 'none';
    let contactTable = '';
   // let year = new Date().getFullYear();
    const antIcon = <Icon type="loading" style={{color:'#fff',fontSize:14 }} spin />;
    let visibleMsg = this.state.errMsg==''?'hidden':'visible';
    if (this.state.action === 'login') {
      contactTable = (
          <div>
            <div className='log-wrap'>
              <div className='inner-wrap'>
                <div className='input-wrap'>
                  <div className='login-title'>
                    <div id="logo-img" className="image">
                      <img src={Logo} className='img'/>
                    </div>
                    <div id="logo-text" className="text">
                      <span>茶虫链能·管理工作台</span>
                    </div>
                  </div>
                  <div style={{marginBottom:'8px',marginLeft:8,marginRight:6,visibility:visibleMsg,fontSize:12}} >
                    <img src={error}/><span style={{color:'red',marginLeft:8,verticalAlign:'middle'}}>{this.state.errMsg}</span>
                  </div>
                 
                  <div style={{width: '100%', display: visible, position: 'relative'}}>
                    <Form layout={layout}>
                      {items}
                    </Form>
                    <div className="login-check-box">
                      <Checkbox onChange={this.onTickChange}>自动登录</Checkbox>
                    </div>
                    <div  className='login-btn-wrap' onClick={this.clickLogin}>
                      <Button type="primary" size="large" block>登陆</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="login-foot">
            <span>Copyright <i style={{fontFamily:'arial'}}>&copy; </i>2019&nbsp;&nbsp;&nbsp;茶虫链能技术部出品</span>
            {/*<p>Powered by 隆正信息科技有限公司 V1.2.091010</p>*/}
            </div>
          </div>
      )
      ;
    } else if (this.state.action === 'resetpwd') {
      contactTable = (<ResetPwdPage onGoBack={this.onGoBack}/>);
    }
    
    return (
        <div style={{width: '100%', height: '100%' ,backgroundColor:'#f7f7f7'}} className='log-wrap'>
          {contactTable}
        </div>
    );
  }
}

export default withRouter(LoginPage2);
