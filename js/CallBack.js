// ************************************************
// 相关站无刷新异步操作时，用到的回调解释(路由)脚本
// ************************************************
var url = window.location.search;
var data;
var obj;
if (url.length > 0)
{
    data = decodeURIComponent(url.substring(1));
}
try
{
    obj = eval('(' + data + ')');
    
}
catch(e)
{
    obj = null;
}
if (obj != null)
{
    switch(obj.code)
    {
        case 10:
            var msg = obj.msg.split('|');
            if (msg[1] != null && msg[1] != "")
            {
                top.window.location.href = msg[1]+'&gourl='+encodeURIComponent(top.window.location.href);
                alert(msg[0]);
            }
            else
            {
                parent.OnFailed(msg[0], msg[2]=='true'?true:false);
            }
            break;
        case 11:
            parent.OnSucceed(obj.msg);
            break;
        case 21:
            parent.OnLogout(obj.msg);
            break;
    }
}