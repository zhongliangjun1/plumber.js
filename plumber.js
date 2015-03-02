(function(global){
    var modules = {};

    var ensureModule = function(name){
        if(!modules[name]){
            modules[name] = {
                ready:false,
                queue:[]
            };
        }
    };
    var executeModule = function(name){
        var queue = modules[name].queue ;
        var fn;
        while(fn = queue.shift()){
            fn.call(this);
        }
    };

    var plumber = {
        ready:function(name){
            ensureModule(name);
            modules[name].ready = true;
            executeModule(name);
        },
        execute:function(name,fn){
            ensureModule(name);
            modules[name].queue.push(fn);
            if(modules[name].ready){
                executeModule(name);
            }
        }
    };

    global.plumber = plumber;

})(this);
