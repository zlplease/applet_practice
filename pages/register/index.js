Page({

  /**
   * 页面的初始数据
   */
  data: {
    account: '',
    password: '',
    repassword: '',
    smscode: '',
    info: '获取验证码', 
    timeleft: 60,
    disable: false
  },

  gettelephone: function(e){
      this.setData({
      account : e.detail.value
    })
  },

  getpassword: function(e){
    this.setData({
      password : e.detail.value
    })
  },

  getrepassword: function(e){
    this.setData({
      repassword : e.detail.value
    })
  },

  getcode: function(e){
    this.setData({
      smscode : e.detail.value
    })
  },

  sendcode: function(e){
    if(this.data.account==''){
      wx.showModal({
        content: "手机号不能为空",
        showCancel: false
      })
    }
    else if(!/^1(3|4|5|7|8)\d{9}$/.test(this.data.account)){
      wx.showModal({
        content: "输入的手机号不合法，请重新输入" ,
        showCancel: false
      })
    }
    else{
      var that = this;//success是一个闭包无法直接通过this来setDate
      wx.request({
      url: 'https://www.alohaplat.com/xyt/api/test/v1/users/register/sendSmsCode',
      method: "POST",
      data: {
        phone: this.data.account
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success :(res)=> {
        if(res.data.status!=0){
          wx.showModal({
            content: res.data.message,
            showCancel: false
          })
        }
        else{
          var time = that.data.timeleft
          var interval = setInterval(function(){
            time--;
            that.setData({
              info: time + '秒',
              disable: true
            })
            if(time <= 0){
              clearInterval(interval)//计时结束，恢复初始值
              that.setData({
                info: '重新发送',
                timeleft: 60,
                disable: false
              })
            }
          },1000)
        }
      }
    })
    }
    
  },

  finish: function(e){
    if(this.data.password!=this.data.repassword){
      wx.showModal({
        content: "密码不一致",
        showCancel: false
      })
    }
    else{
       wx.request({
      url: 'https://www.alohaplat.com/xyt/api/test/v1/users/register',
      method: "POST",
      data: {
        phone: this.data.account,
        password: this.data.password,
        smsCode: this.data.smscode
      },
      header: {
        'content-type': 'application/json'
      },
      success (res){
        console.log(res);
        if(res.data.status==400){
          wx.showModal({
            content: res.data.message,
            showCancel: false
          })
        }
        else{
          wx.reLaunch({
            url: '/pages/login/index',
          })
        }
      }
    })
    }
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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