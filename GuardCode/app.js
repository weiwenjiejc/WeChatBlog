//app.js
var api = require('./libs/api')
App({
  onLaunch: function() {
    //加载天气数据
    this.loadWeatherData();
    //var article_comments=this.globalData.article_comments;
    var articles_comments=[{
      article_id:1,
      comments:[{
        author_url: "../../images/avatar/132.jpg",
        author_name: "张三",
        date: "2019-10-12",
        content: "真好"
      }]
    }];
    wx.setStorageSync('articles_comments',articles_comments)
    console.log('app.js articles_comments')
    console.log(articles_comments)
  },
  loadWeatherData: function () {
    var citySelected = wx.getStorageSync('citySelected') || [];
    if (citySelected.length == 0) {
      citySelected.unshift("__location__");//unshift() 方法可向数组的开头添加一个或更多元素，并返回新的长度。
      wx.setStorageSync('citySelected', citySelected);
    }
    //citySelected.push('淄博')
    var that = this
    for (var idx in citySelected) {
      var cityCode = citySelected[idx];
      api.loadWeatherData(cityCode, function (cityCode, data) {
        var weatherData = wx.getStorageSync('weatherData') || {};
        weatherData[cityCode] = data;
        wx.setStorageSync('weatherData', weatherData);
      });
    }
  },
  globalData: {
    article_comments:[],
    userInfo: null,
    loginUser: {
      userName: "",
      touxiang: "",
      flag: 0
    },
    articleList: [{
      "imgUrl": "../../images/listImg/list1.jpeg",
      "title": "许巍:此时此刻",
      "id": "1",
      "content": "这张专辑《此时此刻》表现出了许巍对于禅意的着迷。不过，至少从音乐的表现来看，许巍并不是真正意义上的皈依佛门，反而表现出一种混合、复杂的信仰和理想。《空谷幽兰》和《世处桃源》单从名字上，就可以感受到一种云雾缠绕、如入禅境的意味。",
      "date": "2019-10-19",
      "total_comments": "2",
      "like_count": "45",
      "pageviews": "153"
    }, {
      "imgUrl": "../../images/listImg/list2.jpg",
      "title": "七十华诞，鹰击长空",
      "id": "2",
      "content": "今天10点多，在电视机前看国庆阅兵，内心充满着振奋与激动。今天的中国，真正开始强大起来了。1949年开国大典阅兵的时候，我们只有17架飞机，当时，周总理说“我们的飞机少，让先参加检阅的飞机飞回来，再参加第二次检阅”，70年后的今天不用了。今天，我们不再因匮乏而不安，而能凭富强而从容。 作为一个70后， 我45岁了， 我有幸见证并亲历中国改革开放、 走向繁荣富强的40年。 我这一代人是幸运的， 生逢盛世； 这个时代， 赋予每个人很多奋斗的机会， 靠个人的努力和勤奋， 总会创造出属于个人的小成就。 ",
      "date": "2019-10-14",
      "total_comments": "2",
      "like_count": "454",
      "pageviews": "25"
    }, {
      "imgUrl": "../../images/listImg/list3.jpg",
      "title": "感恩母亲的节日",
      "id": "3",
      "content": "在抚养孩子的过程中，大多数情况下，母亲的付出远超过父亲。正因为承担起了生育和抚养的重担，人类才能不断的繁衍，全社会都应该感恩勇于做母亲的女性。每个女性在生育孩子的过程中，所要面对种种痛苦和艰难，只有做了母亲的人才能真切感受到。痛并快乐着，是每个母亲的坚强的选择。",
      "date": "2019-10-25",
      "total_comments": "1",
      "like_count": "23",
      "pageviews": "451"
    }, {
      "imgUrl": "../../images/listImg/list4.jpg",
      "title": "向死而生",
      "id": "4",
      "content": "前段时间，看到一个视频：台湾体育主播傅达仁安乐死。他晚年罹患胰腺癌，痛苦不堪，选择于2018年6月7日在瑞士安乐死。他的临终画面曝光，家人陪伴左右，唱歌送他走完最后一程。喝药前，他问：“一口吞吗？两口可以吗？”最后倒在儿子的怀里。看着视频，我想起了父亲，泪眼婆娑。",
      "date": "2019-04-05",
      "total_comments": "1",
      "like_count": "165",
      "pageviews": "154"
    }, {
      "imgUrl": "../../images/listImg/list5.jpg",
      "title": "再见了，google+",
      "id": "5",
      "content": "翻译过来就是google+没有找到盈利模式，google才不会傻傻的投入大量的人力物力去运营这个产品。从商业化的角度来看，google 这样做无可厚非。我有一个奢望，希望gmail存在的时间再长一些。考虑到访问的困难， 我现在重度使用的google产品只有搜索和gmail了。 任何一个产品， 任何一个公司， 都有产生和消亡的过程， 这过程无一例外。 只是在面对一个挺不错的产品要消失的时候， 总难免惆怅， 当然， 更可能是我变老了。 ",
      "date": "2019-11-01",
      "total_comments": "2",
      "like_count": "23",
      "pageviews": "515"
    }],
    commentList: [{
      id: 1,
      comments: [{
        author_url: "../../images/avatar/132.jpg",
        author_name: "张三",
        date: "2019-10-12",
        content: "真好"
      }, {
        author_url: "../../images/avatar/132.jpg",
        author_name: "张三",
        date: "2019-10-12",
        content: "真好"
      }, {
        author_url: "../../images/avatar/132.jpg",
        author_name: "张三",
        date: "2019-10-12",
        content: "真好"
      }]
    }]
  }
})