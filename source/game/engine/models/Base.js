Base = new Class({
  save: {},
  set: function (k,v) {
    this.save[k] = v;
  },
  get: function(k) {
    var meth = 'get'+k.capitalize();
    if (this[meth]) {
      return this[meth]();
    }
    return this.save[k] || null;
  }
});
