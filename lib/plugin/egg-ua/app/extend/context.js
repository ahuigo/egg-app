// app/extend/context.js
module.exports = {
  get isIOS() {
    const iosReg = /iphone|ipad|ipod/i;
    return 'aaaaaaaaaaaaaahui';
    
    return iosReg.test(this.get('user-agent'));
  },
};

