module.exports = function(obj) {
  var mm = obj.getMonth() + 1; // getMonth() is zero-based
  var dd = obj.getDate();

  return [obj.getFullYear(),
          (mm>9 ? '' : '0') + mm,
          (dd>9 ? '' : '0') + dd
         ].join('');
};