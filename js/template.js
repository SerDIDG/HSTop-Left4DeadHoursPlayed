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
        var oauthToken = gapi.auth.getToken();

        var req = cm.ajax({
            'type' : 'json',
            'method' : 'get',
            'url' : 'https://gdata.youtube.com/feeds/api/users/guide4left/uploads',
            'params' : cm.obj2URI({
                'access_token' : oauthToken.access_token,
                'v' : 2,
                'alt' : 'json'
            }),
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