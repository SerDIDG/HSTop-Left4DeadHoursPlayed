var Tpl = {};

cm.define('Tpl.Counter', {
    'modules' : [
        'Params',
        'DataConfig'
    ],
    'params' : {
        'node' : cm.Node('div')
    }
},
function(params){
    var that = this;

    var init = function(){
        that.setParams(params);
        that.getDataConfig(that.params['node']);
        get();
    };

    var get = function(){
        var req = cm.ajax({
            'type' : 'json',
            'method' : 'get',
            'url' : 'https://gdata.youtube.com/feeds/api/users/guide4left/uploads?v=2&alt=json',
            'withCredentials' : true,
            'handler' : render
        });
    };

    var render = function(response){
        console.dir(response);
    };

    /* ******* MAIN ******* */

    init();
});