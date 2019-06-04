/*   eslint-disable   */

import ChachongManageLayout from './ChachongManageLayout';
import Home from '../login/LoginPage';
import Common from '../public/script/common';
import AsyncComponent from '../lib/Components/AsyncComponent';

// const CargoOriginPage = AsyncComponent(()=>import("./dataCenter/cargoOrigin/CargoOriginPage"));
import CargoOwnerPage from './CMS/xxx/XxxPage';

//基础管理
import AppIndexPage from './baseManage/appIndex/AppIndexPage';
import SellerManagePage from './baseManage/sellerManage/SellerManagePage';
import GoodsClassifyPage from './GOODS/goodsClassify/GoodsClassifyPage';
import GoodsBrandPage from './GOODS/goodsBrand/GoodsBrandPage';
import NewGoodsPage from './GOODS/newGoods/NewGoodsPage';
import AllGoodsPage from './GOODS/allGoods/AllGoodsPage';

//交易管理
import TransactionManagement from './transactionManagement/allOrders/AllOrderPage';

//账号管理
import merchantUserAccountPage from './accountManage/merchantUserAccount/merchantUserAccountPage';

/***************    基本路由    *********************/
let mainRoutes = [
  {
    path: 'CMS/CargoOwnerPage',
    component: CargoOwnerPage
  },
  {
    path: 'baseManage/AppIndexPage',
    component: AppIndexPage
  },
  {
     path: 'baseManage/SellerManagePage',
     component: SellerManagePage
  },
  {
    path: 'GOODS/GoodsClassifyPage',
    component: GoodsClassifyPage
  },
  {
    path: 'GOODS/GoodsBrandPage',
    component: GoodsBrandPage
  },
  {
    path: 'GOODS/NewGoodsPage',
    component: NewGoodsPage
  },
  {
    path: 'GOODS/AllGoodsPage',
    component: AllGoodsPage
  },
  {
    path: 'transactionManagement/AllOrderPage',
    component: TransactionManagement
  },
  {
    path: 'accountManage/merchantUserAccountPage',
    component: merchantUserAccountPage
  },
];

// 过滤 路由
let controlledDoorManageRoutesArr=getGivenMenuList(mainRoutes);
function getGivenMenuList(menuListSource){
 return menuListSource;
 let menuLists = Common.getMenuList() || [], menuListGiven=[], menuArr=[]; 
  menuLists.map(item=>{
  if(item && item.path){
   menuArr.push(item.path);
  }
 });
 if(menuArr.length !== menuLists.length){
   console.error('菜单数据列表数据有无效数据，请检查！');
   return;
 }
 menuListSource.map(item =>{
   let f = false;
   for(let i=0;i<menuArr.length;i++){
     if(menuArr[i].indexOf(item.path)!==-1){
       f = true;
       break;
     }
   }
   if(f){
     menuListGiven.push(item)
   };
 });
 return menuListGiven;
}

/***************   总路由    *********************/
let oriangeRoute = '/ChachongManage/';

module.exports = {
  path: '/ChachongManage',
  component: ChachongManageLayout,
  indexRoute: { component: Home },
  childRoutes: [
    {
      path: oriangeRoute,
      indexRoute: { component: CargoOwnerPage },
      childRoutes: mainRoutes
    },
  ]
};

