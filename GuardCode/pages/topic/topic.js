// pages/topic/topic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: "Page topic",
    categoriesList: [{
      "imgUrl": "../../images/fenlei/fenlei1.jpg",
      "name": "Java",
      "id": 1,
      "description": "记录观察生活、思考人生的思想火花。",
      "subimg":"../../images/subscription.png"
    }, {
        "imgUrl": "../../images/fenlei/fenlei1.jpg",
        "name": "C/C++",
        "id": 1,
        "description": "记录观察生活、思考人生的思想火花。",
        "subimg": "../../images/subscription.png"
      }, {
        "imgUrl": "../../images/fenlei/fenlei1.jpg",
        "name": "Python",
        "id": 1,
        "description": "记录观察生活、思考人生的思想火花。",
        "subimg": "../../images/subscription.png"
      }, {
        "imgUrl": "../../images/fenlei/fenlei1.jpg",
        "name": "PHP",
        "id": 1,
        "description": "记录观察生活、思考人生的思想火花。",
        "subimg": "../../images/subscription.png"
      }, {
        "imgUrl": "../../images/fenlei/fenlei1.jpg",
        "name": "Linux",
        "id": 1,
        "description": "记录观察生活、思考人生的思想火花。",
        "subimg": "../../images/subscription.png"
      }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '专题'
    });
  },
  redictIndex:function(e){
    console.log('跳转')
    console.log(e)
    wx.navigateTo({
      url: '../fenlei/fenlei?category=art',
      success:function(res){
        console.log(res)
      },
      fail:function(res){
        console.log(res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})