let Reflux = require('reflux')
let Utils = require('../../../../public/script/utils')
import Common from '../../../../public/script/common'

let AllGoodsStore = Reflux.createStore({
    listenables: [AllGoodsStore],
    filter: {},
    recordSet: [],
    startPage: 0,
    pageRow: 0,
    totalRow: 0,
})
module.exports = AllGoodsStore