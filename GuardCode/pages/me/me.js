// pages/me/me.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    topBarItems: [{
      name: "作品"
    }, {
      name: "关注"
    }, {
      name: "浏览"
    }],
    openid: "",
    readLogs: [
      "我的个人博客之——阿里云空间选择",
      "如何快速建立自己的个人博客网站",
      "作为一个设计师,如果遭到质疑你是否能恪守自己的原则?",
      "即便是坑，我也想要拉你入伙！",
      "我是怎么评价自己的？"
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  userLogin: function(options) {
    console.log('flag');
    wx.authorize({
      scope: 'scope.userInfo',
      success: () => {
        console.log('yes')
      }
    })
    var temp = app.globalData.loginUser;
    console.log(temp.flag)
    var that = this;
    if (app.globalData.loginUser.flag == 1) {
      that.setData({
        caozuo: "登录"
      })
      app.globalData.loginUser.flag = 0;
      var t = {
        nickName: "尚未登陆"
      }
      that.setData({
        userInfo: t
      })
    } else {
      console.log('用户未登录：')
      wx.getSetting({
        success(res) {
          console.log(res)
          if (res.authSetting['scope.userInfo']) {
            console.log('用户授权了')
            wx.getUserInfo({
              success: function(res) {
                console.log('用户信息：')
                console.log(res.userInfo)
              }
            })
          } else {
            console.log('用户未授权')
            // wx.openSetting({
            //   success(res) {
            //     console.log('授权信息')
            //     console.log(res);
            //     // res.authSetting = {
            //     //   "scope.userInfo": true,
            //     //   "scope.userLocation": true
            //     // }
            //   }
            // });
          }
        }
      })

      //获取用户信息
      wx.getUserInfo({
        success: function(res) {
          that.data.userInfo = res.userInfo;


          var userName = res.userInfo.nickName;
          var touxiang = res.userInfo.avatarUrl;
          var user = {
            "userName": userName,
            "touxiang": touxiang,
            "flag": 1
          }

          app.globalData.loginUser = user;
          console.log()
          that.setData({
            userInfo: that.data.userInfo,
            openid: 1
          })
          that.setData({
            caozuo: "退出"
          })
        }
      })
    }

  },
  exitLogin: function() {
    this.setData({
      openid: ''
    })
  },
  onLoad: function(options) {
    console.log('onLoad')
    wx.getUserInfo({
      success:function(res){
        console.log('onLoad')
        console.log(res);
      },
      fail:function(res){
        console.log(res)
      }
    })
    this.setData({
      caozuo: "登录"
    });
    this.setData({
      userInfo: app.globalData.userInfo
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})