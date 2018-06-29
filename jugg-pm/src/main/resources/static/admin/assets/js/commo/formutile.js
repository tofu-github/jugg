/**
 * 表单相关的工具方法文件
 */

/**
 * 将表单内容封装成
 * @returns {{}}
 */
$.fn.toJSON = function() {
    var o = {};
    var a = this.serializeArray();
    console.log("开始");
    for(var j=0; j< a.length;j++){
        var name = a[j].name;
        var value = a[j].value;
        var paths = name.split(".");
        makeJson(o,paths,value,0);
    }
    console.log( JSON.stringify(o));
    return o;
};
function makeJson(t, paths, value, index){
    var jsonKey = paths[index].endWith("[]")?paths[index].substr(0,paths[index].length-2):paths[index];
    if(index == (paths.length - 1)){
        if(paths[index].endWith("[]")){
            if( t[jsonKey]){
                t[jsonKey] = new Array();
            }
            t[jsonKey].push(value);
        }else {
            if(t[jsonKey] instanceof Array){
                t[jsonKey].push(value);
            }else
                t[jsonKey] = value;
        }
        return ;
    }else{
        if(!t[jsonKey] && !paths[index].endWith("[]")){
            t[jsonKey] = {};
            makeJson(t[jsonKey],paths,value,++index);
        }else if(!t[jsonKey] && paths[index].endWith("[]")){
            t[jsonKey] = new Array();
            makeArrayJson(t[jsonKey],paths,value,++index);
        }else if(t[jsonKey] && paths[index].endWith("[]")){
            makeArrayJson(t[jsonKey],paths,value,++index);
        }else{
            makeJson(t[jsonKey],paths,value,++index);
        }
    }
};

/**
 *
 * @param t
 * @param paths
 * @param value
 * @param index
 */
function makeArrayJson(t, paths, value, index){
    var jsonKey = paths[index].endWith("[]")?paths[index].substr(0,paths[index].length-2):paths[index];
    var addNew = true;
    for(var i=0; i < t.length; i++){
        if(!t[i][jsonKey] && t[i][jsonKey]!=""){
            addNew = false;
            makeJson(t[i],paths,value,index)
        }
    }
    if(addNew){
        t[t.length] = {};
        makeJson(t[t.length - 1],paths,value,index)
    }
}
String.prototype.endWith=function(s){
    if(s==null||s==""||this.length==0||s.length>this.length)
        return false;
    if(this.substring(this.length-s.length)==s)
        return true;
    else
        return false;
    return true;
}