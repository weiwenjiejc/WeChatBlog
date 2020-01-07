//index.js
var api = require('../../libs/api')

//获取应用实例
var app = getApp()
Page({
  data: {
    userInfo: {},
    citySelected: {},
    weatherData: {},
    topCity: {},
    place: ""
  },

  //事件处理函数
  showDetailPage: function(e) {
    try {
      var cityCode = e.currentTarget.dataset.city_code || '';
    } catch (e) {}

    wx.navigateTo({
      url: '../detail/detail?city_code=' + cityCode
    })
  },
  // showSettingPage: function() {
  //   wx.navigateTo({
  //     url: '../setting/setting'
  //   })
  // },
  // updateTopCity: function(event) {
  //   var citySelected = wx.getStorageSync('citySelected');
  //   var weatherData = wx.getStorageSync('weatherData');
  //   var topCity = {
  //     left: "",
  //     center: "",
  //     right: "",
  //   };

  //   var current = event.detail.current;
  //   try {
  //     topCity.left = weatherData[citySelected[current - 1]].realtime.city_name;
  //   } catch (e) {}
  //   try {
  //     topCity.center = weatherData[citySelected[current]].realtime.city_name;
  //   } catch (e) {}
  //   try {
  //     topCity.right = weatherData[citySelected[current + 1]].realtime.city_name;
  //   } catch (e) {}

  //   this.setData({
  //     topCity: topCity,
  //   })
  // },

  onLoad: function() {
    wx.getLocation({
      success: function(res) {
        console.log('当前位置')
        console.log(res);
      },
    })
    var defaultCityCode = "__location__";
    var citySelected = wx.getStorageSync('citySelected');
    var weatherData = wx.getStorageSync('weatherData');
    if (citySelected.length == 0 || weatherData.length == 0) {
      var that = this
      api.loadWeatherData(defaultCityCode, function(cityCode, data) {
        var weatherData = {}
        weatherData[cityCode] = data;
        that.setHomeData([cityCode], weatherData);
      });
    } else {
      this.setHomeData(citySelected, weatherData);
    }
    //获得位置
    var that = this;
    wx.request({
      url: 'https://free-api.heweather.net/s6/weather/now?location=auto_ip&key=96cc60d303314e3d837fd705e40ce81c',
      success: function(res) {
        console.log('城市：6')
        // wx.showToast({
        //   title: res.data.HeWeather6[0].basic.location
        // })
        console.log(res.data)
        console.log(res.data.HeWeather6[0].basic.location)
        that.setData({
          place: res.data.HeWeather6[0].basic.location
        })
      }
    });
  },
  refreshWeather: function() {
    //获得位置
    var that = this;
    var t_location;
    wx.getLocation({
      success: function(res) {
        t_location = res.longitude +',' + res.latitude
      },
    })
    wx.request({
      url: 'https://free-api.heweather.net/s6/weather/now?location='+t_location+'&key=96cc60d303314e3d837fd705e40ce81c',
      success: function(res) {
        console.log('城市：')
        var location = res.data.HeWeather6[0].basic.location;
        console.log(res.data.HeWeather6[0].basic.location)
        that.setData({
          place: res.data.HeWeather6[0].basic.location
        });

        wx.showToast({
          title: location,
          icon: 'success',
          duration: 2000
        })

      }
    });
    var defaultCityCode = "__location__";
    var citySelected = wx.getStorageSync('citySelected');
    var weatherData = wx.getStorageSync('weatherData');
    if (citySelected.length == 0 || weatherData.length == 0) {
      var that = this
      api.loadWeatherData(defaultCityCode, function(cityCode, data) {
        var weatherData = {}
        weatherData[cityCode] = data;
        that.setHomeData([cityCode], weatherData);
      });
    } else {
      this.setHomeData(citySelected, weatherData);
    }
  },

  onShow: function() {
    var citySelected = wx.getStorageSync('citySelected');
    this.setData({
      citySelected: citySelected,
    })
  },

  setHomeData: function(citySelected, weatherData) {
    var topCity = {
      left: "",
      center: "",
      right: "",
    }
    try {
      topCity.center = weatherData[citySelected[0]].realtime.city_name;
    } catch (e) {}
    try {
      topCity.right = weatherData[citySelected[1]].realtime.city_name;
    } catch (e) {}

    this.setData({
      userInfo: app.globalData.userInfo,
      weatherData: weatherData,
      topCity: topCity,
      citySelected: citySelected,
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})