var Tpl = {};

Tpl.Config = {
    'videosAll' : 0,
    'videosL4D' : 0,
    'firstL4D' : new Date('2011-08-25T02:32:26.000Z'),
    'lastL4D' : Date.now
};

Tpl.Callback = {
    'videosAll' : function(resplonse){
        Tpl.Config['videosAll'] = resplonse['data']['totalItems'];
    },
    'videosL4D' : function(resplonse){
        Tpl.Config['videosL4D'] = resplonse['data']['totalItems'];
        Tpl.Config['lastL4D'] = new Date(resplonse['data']['items'][0]['video']['uploaded']);
    }
};

cm.define('Tpl.Counter', {
    'modules' : [
        'Params',
        'DataConfig',
        'Langs'
    ],
    'params' : {
        'node' : cm.Node('div')
    }
},
function(params){
    var that = this;

    that.nodes = {};

    var init = function(){
        that.setParams(params);
        that.getDataConfig(that.params['node']);
        render();
    };

    var render = function(){
        var h = Math.floor(((Tpl.Config['lastL4D'] - Tpl.Config['firstL4D']) / 1000 / 60 / 60 / Tpl.Config['videosL4D']) * ((100 / Tpl.Config['videosAll']) * Tpl.Config['videosL4D']));
        // Structure
        that.nodes['container'] = cm.Node('div',
            cm.Node('div', {'class' : 'cm-box-content'},
                cm.Node('h2', 'Information:'),
                cm.Node('div', {'class' : 'cm-box-info'},
                    cm.Node('dl',
                        cm.Node('dt', that.lang('Total videos:')),
                        cm.Node('dd', Tpl.Config['videosAll'])
                    ),
                    cm.Node('dl',
                        cm.Node('dt', that.lang('Left 4 Dead videos:')),
                        cm.Node('dd', Tpl.Config['videosL4D'])
                    ),
                    cm.Node('dl',
                        cm.Node('dt', that.lang('First Left 4 Dead video:')),
                        cm.Node('dd', cm.dateFormat(Tpl.Config['firstL4D'], cm._config['displayDateTimeFormat']))
                    ),
                    cm.Node('dl',
                        cm.Node('dt', that.lang('Last Left 4 Dead video:')),
                        cm.Node('dd', cm.dateFormat(Tpl.Config['lastL4D'], cm._config['displayDateTimeFormat']))
                    )
                )
            ),
            cm.Node('div', {'class' : 'cm-box-content'},
                cm.Node('h2', 'Hours Played:'),
                cm.Node('h4', h)
            ),
            cm.Node('div', {'class' : 'cm-box-content'},
                cm.Node('h2', 'Algorithm:'),
                cm.Node('p', that.lang('Math.floor(((Last L4D video date in ms - First L4D video date in ms) / 1000 / 60 / 60 / Total L4D videos) * ((100 / Total videos) * Total L4D videos))'))
            )
        );
        // Append
        that.params['node'].appendChild(that.nodes['container']);
    };

    /* ******* MAIN ******* */

    init();
});