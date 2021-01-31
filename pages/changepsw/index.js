Page({

  /**
   * 页面的初始数据
   */
  data: {
    oldpassword: '',
    newpassword: '',
    repassword: ''
  },

  oldpassword: function(e){
      this.setData({
      oldpassword : e.detail.value
    })
  },

  getpassword: function(e){
    this.setData({
      newpassword : e.detail.value
    })
  },

  getrepassword: function(e){
    this.setData({
      repassword : e.detail.value
    })
  },

  getcode: function(e){
    this.setData({
      smscode1 : e.detail.value
    })
  },

  finish: function(e){
    if(this.data.newpassword!=this.data.repassword){
      wx.showModal({
        content: "新密码不一致",
        showCancel: false
      })
    }
    else{
      wx.request({
      url: 'https://www.alohaplat.com/xyt/api/test/v1/users/password',
      method: "PUT",
      data: {
        oldPassword: this.data.oldpassword,
        newPassword: this.data.newpassword
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': wx.getStorageSync('token')
      },
      success (res){
        console.log(res);
        if(res.data.status!=0){
          wx.showModal({
            content: res.data.message,
            showCancel: false
          })
        }
        else{
          wx.reLaunch({
            url: '/pages/wait/index',
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