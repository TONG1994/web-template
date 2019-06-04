import Common from '../../public/script/common';
function ModuleMenus() {
  this.mainMenus = [
    {
      name: 'DEMO',
      to: 'CMS',
      icon: 'dashboard',
      childItems: Common.getFilterList([
        {
          name: '样例',
          to: '/ChachongManage/CMS/CargoOwnerPage'
        },
      ])
    },
    {
      name: '基础管理',
      to: 'baseManage',
      icon: 'setting',
      childItems: Common.getFilterList([
        {
          name: '首页布局',
          to: '/ChachongManage/baseManage/AppIndexPage'
        },
        {
          name: '商家管理',
          to: '/ChachongManage/baseManage/SellerManagePage'
        },
      ])
    },
    {
      name: '商品管理',
      to: 'GOODS',
      icon: 'dropbox',
      childItems: Common.getFilterList([
        {
          name: '商品分类',
          to: '/ChachongManage/GOODS/GoodsClassifyPage'
        },
        {
          name: '商品品牌',
          to: '/ChachongManage/GOODS/GoodsBrandPage'
        },
        {
          name: '发布新商品',
          to: '/ChachongManage/GOODS/NewGoodsPage'
        },
        {
          name: '全部商品',
          to: '/ChachongManage/GOODS/AllGoodsPage'
        },
      ])
    },
    {
      name:'交易管理',
      to: 'transactionManagement',
      icon: 'profile',
      childItems:Common.getFilterList([
        {
          name: '全部订单',
          to: '/ChachongManage/transactionManagement/AllOrderPage'
        }
      ])
    },
    {
      name: '账号管理',
      to: 'accountManage',
      icon: 'team',
      childItems: Common.getFilterList([
        {
          name: '商家用户账号',
          to: '/ChachongManage/accountManage/merchantUserAccountPage'
        },
      ])
    },
  ];
  this.topMenus = [];
}

module.exports = new ModuleMenus(this);
