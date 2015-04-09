const jquery = require('jquery');
const cookie = require('jquery.cookie');

function extractNames(data) {
  var res = []
  for(var i = 0; i < data.length; i++) {
    res.push(data[i].name)
  }
  return res;
}

module.exports = {

  getBlueprintNames: function(string) {
    var res = jquery.cookie("_processes");
    if(res === undefined)
      return [];
    if(typeof(res) == "string")
      res = JSON.parse(res).names;
    else
      res = res.names

    return res;

  },

  setBlueprintNames: function(data) {
    var cookie_data = {
      names: extractNames(data)
    }
    
    jquery.cookie.json = true;
    jquery.cookie("_processes", cookie_data);
  },

  setUserKey: function(data) {
    jquery.cookie("_bf_user", data);
  },

  getUserKey  : function() {
    var res = jquery.cookie("_bf_user");
    return res;
  },

  removeUserKey: function() {
    jquery.removeCookie('_bf_user');
  }

}
