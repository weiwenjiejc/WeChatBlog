//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    "lunboData": [{
        "imgUrl": "../../images/lunbo/lunbo1.jpg",
        "desc": "微慕WordPress小程序专业版v2.0"
      },
      {

        "imgUrl": "../../images/lunbo/lunbo2.jpg",
        "desc": "微慕WordPress小程序增强版"
      },
      {
        "imgUrl": "../../images/lunbo/lunbo3.jpg",
        "desc": "利用WordPress REST API 开发微信小程序从入门到放弃"
      }
    ],
    "navData": [{
      "imgUrl": "../../images/uploads/minapper.jpg",
      "desc": "微慕"
    }, {
      "imgUrl": "../../images/uploads/minapper.jpg",
      "desc": "热文2"
    }, {
      "imgUrl": "../../images/uploads/minapper.jpg",
        "desc": "热文3"
    }, {
      "imgUrl": "../../images/uploads/minapper.jpg",
        "desc": "热文4"
    }, {
      "imgUrl": "../../images/uploads/minapper.jpg",
        "desc": "热文5"
    }, {
      "imgUrl": "../../images/uploads/minapper.jpg",
        "desc": "热文6"
    }],
    "listData": []
  },
  redictDetail: function(e) {
    // console.log('查看文章');
    var id = e.currentTarget.id,
      url = '../detail/detail?id=' + id;
    console.log(id)
    wx.navigateTo({
      url: url
    })
  },
  onLoad: function(options){
    var data = app.globalData.articleList;
    this.setData({
      listData:data
    })
  }
})