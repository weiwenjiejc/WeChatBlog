// pages/detail.js
var util = require("../../utils/util.js")
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    article_comments:[],
    isSwitch: 0,
    id: 0,
    article: {},
    commentsList: [],
    enableComment: "block",
    menuBackgroup: "block",
    display: "block",
    "pinglunUser": {},
    article_id:0
  },
  hiddenMenubox: function() {
    console.log('hiddenMenubox');
  },
  formSubmit: function(e) {
    var that = this;
    // 确认用户是否登录
    console.log('用户登录信息：')
    console.log(app.globalData.loginUser)

    var isLogin = app.globalData.loginUser.flag;
    var isSwitch = 0;
    if (isLogin == 0) {
      wx.showModal({
        title: '提示',
        content: '请登录后再来评论',
        success: function(res) {
          console.log(res)
          if (res.confirm) {
            console.log('用户点击确定')
            // wx.navigateTo({
            //   url: '../me/me',
            // })
            // that.setData({
            //   isSwitch:1
            // })
            // isSwitch=1;
            //获取用户信息
            // wx.getUserInfo({
            //   success: function (res) {
            //     console.log('登录用户信息：')

            //     // console.log(res)
            //     // console.log(res.userInfo)
            //     // // that.data.userInfo = res.userInfo;
            //     // app.globalData.userInfo = res.userInfo;
            //     // app.globalData.loginUser.userName = res.userInfo.nickName;
            //     // app.globalData.loginUser.touxiang =avatarUrl;
            //     // app.globalData.loginUser.flag = 1;
            //   }
            // })
          }
        }
      })
    } else {
      //已经登录
      console.log('formSubmit')
      var self = this;
      var comment = e.detail.value.inputComment;
      // var parent = self.data.parentID;
      // var postID = e.detail.value.inputPostID;
      // var formId = e.detail.formId;
      var inputData = {
        author_url: this.data.pinglunUser.avatarUrl,
        author_name: this.data.pinglunUser.nickName,
        date: "",
        content: comment
      }
      var time = util.formatTime(new Date());
      inputData.date = time;
      
      // wx.getUserInfo({
      //   success:function(res){
      //     console.log('getUserInfo:')
      //     inputData.author_name = res.userInfo.nickName;
      //     inputData.author_url = res.userInfo.avatarUrl;
      //     // console.log(res.userInfo.nickName)
      //     // console.log(res.userInfo.avatarUrl)
      //     // console.log(res.userInfo.nickName)
      //   }
      // })
      //console.log(e)

      // 从服务器读取评论信息


      var lao = this.data.commentsList;
      lao.push(inputData)
      console.log(lao)
      var articles_comments = wx.getStorageSync('articles_comments');
      console.log(articles_comments)
      var flag=true;
      for(var i = 0;i<articles_comments.length;i++){
        console.log('haha')
        if(articles_comments[i].article_id==this.data.article_id){
          flag = false;//数据库中已经存在了此文章的评论
          articles_comments[i].comments=lao;
          //更新本地缓存
        }
      }
      console.log('ceshi')
      if(flag==true){
        var article_comments={
          "article_id":this.data.article_id,
          "comments":lao
        }
        articles_comments.push(article_comments);
      }
      console.log('更新后的评论：')
      console.log(articles_comments)
      wx.setStorageSync('articles_comments', articles_comments);

      console.log(lao)
      this.setData({
        commentsList: lao,
        content: ''
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.getUserInfo({
      success: function(res) {
        that.setData({
          pinglunUser:res.userInfo
        })
      },
      fail:function(res){
        console.log(res)
      }
    })
    var article_id=options.id;
    this.setData({
      article_id:article_id
    })
    console.log('article_id:')
    console.log(article_id);
    var articles_comments=wx.getStorageSync('articles_comments');
    for(var i=0;i<articles_comments.length;i++){
      if(articles_comments[i].article_id==article_id){
        console.log(articles_comments[i])
        this.setData({
          article_comments:articles_comments[i].comments,
          //兼容以前的版本
          commentsList: articles_comments[i].comments
        })
      }
    }
    console.log('this.data.article_comments:')
    console.log(this.data.article_comments)
    var that = this;
    console.log(options)
    this.setData({
      id: options.id
    })
    //获得评论
    // wx.request({
    //   url: 'http://localhost:8080/myweb_war_exploded/comment/select',
    //   data: {
    //     id: this.data.id
    //   },
    //   success: function(res) {
    //     console.log(res.data)
    //     var lists = res.data;
    //     if(lists.length>=1){
    //       that.setData({
    //         commentsList: lists
    //       })
    //     }
    //   }
    // })
    // console.log(this.data.commentsList)
    //获得文章
    var xiabiao = options.id - 1;
    var id_article = app.globalData.articleList[xiabiao];
    console.log(id_article)
    this.setData({
      article: id_article
    })
    // var id_comment = app.globalData.commentList[xiabiao].comments;
    // console.log(id_comment);
    // this.setData({
    //   commentsList: id_comment
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  confirm: function() {
    console.log('confirm')
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