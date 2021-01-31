Page({
  data: {
    account: '',
    password: '',
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

  register: function(e){
    wx.reLaunch({
      url: '/pages/register/index',
    })
  },

  loginapp: function(e){
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
      wx.request({
        url: 'https://www.alohaplat.com/xyt/api/test/v1/users/login',
        method: 'POST',
        data: {
          account: this.data.account,
          password: this.data.password
        },
        header: {
          'content-type': 'application/json'
        },
        success: function(res){
          if(res.data.status!=0){
            wx.showToast({
              title: res.data.message,
            })
          }
          else{
            wx.setStorageSync('token', res.data.data.access_token);
            wx.reLaunch({
              url: '/pages/changepsw/index',
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