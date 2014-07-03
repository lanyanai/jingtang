/**
 * Created by zd on 2014/6/14 0014.
 */
window.requestAnimFrame = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame
        || window.mozRequestAnimationFrame || window.oRequestAnimationFrame
        || window.msRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60)
        }
})();

//专题应用ajax参数对象
var ajaxSubjectGame =
{
    "count":0,
    "total_size":0,//总共的应用个数
    "start_position":1,//从第几个开始取
    "init_size":20,//第一次取的数目
    "rescategory_id":38,
    'order_by':"new",
    'contentUrl':$.apiRoot + "appV3/getTopicById.do",
    "appUrl": $.apiRoot + "appV3/getCategoryProducts.do",
    "detailUrl": $.htmlRoot + "game_detail.html",
    "countUrl": $.apiRoot + "worldcup/getLotteryCnt.do",
    "lotteryUrl": $.apiRoot + "worldcup/getLotteryResult.do",
    "giftUrl": $.htmlRoot + "gift_detail.html",
    "infoUrl": $.apiRoot + "worldcup/saveLotteryInfo.do"
};

//加载进来的专题应用列表
var subjectGameList = [];
//空li字符串，创建用
function createItem(itemData, $tem)
{
    var $item = $tem.clone();
    fillItem($item, itemData);
    return $item;
}

//供android调用，更新页面的应用的状态，一种是安装包下载进度，还有就是下载完成，安装完成时
function updateState(packageName, state)
{
    var $item = $(document.getElementById(packageName));
    var $btn = $item.find(".btn");
    if(state >= 0 && state <= 100)
    {
        if(!$btn.hasClass("cancelBtn"))
        {
            $btn.removeClass().addClass("cancelBtn btn");
        }
        $item.find(".state").text(state + "%");
    }
    else if(state == "finishDownload")
    {
        $btn.removeClass().addClass("installBtn btn");
        $item.find(".state").text("安装");
    }
    else if(state == "finishInstall")
    {
        $btn.removeClass().addClass("openBtn btn");
        $item.find(".state").text("打开");
    }
    else if(state == "pause")
    {
        $btn.removeClass().addClass("continueBtn btn");
        $item.find(".state").text("继续");
    }
}

//判断packageName是否在list中，在的话返回索引，不在的话返回-1
function indexList(packageName, list)
{
    var len = list.length;
    for(var i = 0; i < len; ++i)
    {
        if(packageName == list[i].resPackagename)
        {
            return i;
        }
    }
    return -1;
}

//ajax填充打分
function fillRate($item, score)
{
    //分数
    $item.find(".items-score img").each(function(j, imgItem)
    {
        if(j - score < -0.5)
        {
            $(imgItem).attr("src", star_01);
        }
        else if(j - score == -0.5)
        {
            $(imgItem).attr("src", star_02);
        }
        else
        {
            $(imgItem).attr("src", star_03);
        }
    });
}

//根据本机信息填充状态
function fillState($item, packageName, phoneData)
{
    //在下载列表里
    var downloadIndex = indexList(packageName, phoneData.downloadList);
    if(downloadIndex != -1)
    {
        //下载完成。显示安装状态
        if(phoneData.downloadList[downloadIndex].downPercent == 100)
        {
            $item.find(".state").text("安装");
            $item.find(".btn").removeClass().addClass("btn installBtn");
        }
        //下载未完成，显示继续
        else
        {
            $item.find(".state").text("继续");
            $item.find(".btn").removeClass().addClass("btn continueBtn");
        }
    }
    //在升级列表里
    else if(indexList(packageName, phoneData.updateList) != -1)
    {
        $item.find(".state").text("升级");
        $item.find(".btn").removeClass().addClass("btn updateBtn");
    }
    //在已安装列表
    else if(indexList(packageName, phoneData.installList) != -1)
    {
        $item.find(".state").text("打开");
        $item.find(".btn").removeClass().addClass("btn openBtn");
    }
    //不在上述列表中
    else
    {
        $item.find(".state").text("下载");
        $item.find(".btn").removeClass().addClass("btn dlBtn");
    }
}

function indexOfGift(acId)
{
    var len = myGiftData.length;
    for(var i = 0; i < len; ++i)
    {
        if(myGiftData[i].acId === acId)
        {
            return i;
        }
    }
    return -1;
}

//ajax填充一个应用的信息，$item是一个zepto对象，itemData提供填充数据
function fillItem($item, itemData)
{
    var packageName = itemData.resPackagename;
    //使用包名作为id
    $item.attr("id", itemData.resPackagename)
        .data("location", itemData.resLocation)
        .data("id", itemData.resId)
        .data("package", packageName)
        .data("icon", itemData.resIcons)
        .data("name", itemData.resName);
    if(itemData.acId)
    {
        var index = indexOfGift(itemData.acId);
        //领过了
        if(index != -1)
        {
            $item.find('.relate-gift').show().on('tap', function()
            {
                isUxbao && window.uxbao.click(JSON.stringify
                    (
                        {
                            "type":12,
                            "title":itemData.acName,
                            "url":$.htmlRoot + "gift_detail.html" +  "?acId=" + itemData.acId + "&num=" + myGiftData[index].giftNo
                        }
                    )
                );
                return false;
            });
        }
        //没领过
        else
        {
            $item.find('.relate-gift').show().on('tap', function()
            {
                isUxbao && window.uxbao.click(JSON.stringify
                    (
                        {
                            "type":12,
                            "title":itemData.acName,
                            "url":$.htmlRoot + "gift_detail.html" +  "?acId=" + itemData.acId
                        }
                    )
                );
                return false;
            });
        }
    }
    else
    {
        $item.find('.relate-gift').hide().off('tap');
    }
    //$item.find(".number").text(i);
    $item.find(".appIcon").data("icon", itemData.resIcons).attr("src", default_icon);

    $item.find(".tit strong").text(itemData.resName);
    var ca = (itemData.resCapacity/(1024 * 1024)).toFixed(1);
    $item.find(".tit p").text(ca + 'MB | ' + itemData.resDeveloper);

    //评分
    var rated = itemData.resRated;
    fillRate($item, rated);

    //状态
    fillState($item, packageName, phoneData);
}

//tap点击函数
function btnTapHandler($target)
{
    var $item = $target.parent().parent();
    //通知android下载
    if($target.hasClass('dlBtn'))
    {
        ++ajaxSubjectGame.count;
        $('#lotteryCount').text(ajaxSubjectGame.count + '次');
    }
    if($target.hasClass('dlBtn') || $target.hasClass('continueBtn'))
    {
        $target.removeClass().addClass('cancelBtn btn');
        $target.find(".state").text('暂停');
        isUxbao && window.uxbao.click(
            JSON.stringify(
                {
                    "type":1,
                    "resPackagename":$item.data("package"),
                    "resId":$item.data("id"),
                    "resLocation":$item.data("location"),
                    "resIcons":$item.data("icon"),
                    "resName":$item.data("name")
                }
            )
        );
    }
    else if($target.hasClass('updateBtn'))
    {
        $target.removeClass('updateBtn').addClass('cancelBtn');
        $target.find(".state").text('暂停');
        isUxbao && window.uxbao.click(
            JSON.stringify(
                {
                    "type":1,
                    "resPackagename":$item.data("package"),
                    "resId":$item.data("id"),
                    "resLocation":$item.data("location"),
                    "resIcons":$item.data("icon"),
                    "resName":$item.data("name")
                }
            )
        );
    }
    //通知android暂停下载
    else if($target.hasClass('cancelBtn'))
    {
        $target.removeClass('cancelBtn').addClass('continueBtn');
        $target.find(".state").text('继续');
        isUxbao && window.uxbao.click(
            JSON.stringify(
                {
                    "type":5,
                    "resPackagename":$item.data("package"),
                    "resId":$item.data("id"),
                    "resLocation":$item.data("location"),
                    "resIcons":$item.data("icon"),
                    "resName":$item.data("name")
                }
            )
        );
    }
    //通知android打开此应用
    else if($target.hasClass("openBtn"))
    {
        isUxbao && window.uxbao.click(
            JSON.stringify(
                {
                    "type":3,
                    "resPackagename":$item.data("package"),
                    "resId":$item.data("id"),
                    "resLocation":$item.data("location"),
                    "resIcons":$item.data("icon"),
                    "resName":$item.data("name")
                }
            )
        );
    }
    //通知android安装此应用
    else if($target.hasClass("installBtn"))
    {
        isUxbao && window.uxbao.click(
            JSON.stringify(
                {
                    "type":6,
                    "resPackagename":$item.data("package"),
                    "resId":$item.data("id"),
                    "resLocation":$item.data("location"),
                    "resIcons":$item.data("icon"),
                    "resName":$item.data("name")
                }
            )
        );
    }
}

//进入游戏详情
function infoTapHandler($info)
{
    var $item = $info.parent().parent();
    var resId = $item.data("id");
    isUxbao && window.uxbao.click(
        JSON.stringify(
            {
                "type":2,
                "resId":resId,
                "url":ajaxSubjectGame.detailUrl + "?resId=" + resId,
                "resName":$item.data("name"),
                "resPackageName":$item.data("package")
            }
        )
    );
}

//将日期对象转换成日期字符串如2014.03.15
function getDateStr(date)
{
    var dateStr = "";
    dateStr += date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    if(month < 10)
    {
        dateStr += '.0' + month;
    }
    else
    {
        dateStr += '.' + month;
    }
    if(day < 10)
    {
        dateStr += '.0' + day;
    }
    else
    {
        dateStr += '.' + day;
    }
    return dateStr;
}

//随机整数
function fRandomBy(under, over){
    switch(arguments.length){
        case 1: return parseInt(Math.random()*under+1);
        case 2: return parseInt(Math.random()*(over-under+1) + under);
        default: return 0;
    }
}

//弹出获得礼包对话框
function showGiftDialog(giftData)
{
    var $giftDialog = $("#gift-dialog");
    $giftDialog.data('id', giftData.acId).data('name', giftData.acName).find('.giftName').text(giftData.acName);
    $giftDialog.dialog('open');
}

//弹出提示对话框
function showTipDialog(message)
{
    var $tipDialog = $('#tip-dialog');
    $tipDialog.find('p').text(message);
    $tipDialog.dialog('open');
}

//弹出信息填写对话框
function showInfoDialog(type)
{
    var $infoDialog = $("#info-dialog");
    if(type === 4 || type === 7 || type === 8)
    {
        $('#info-code').hide();
        $('#info-address').hide();
    }
    else
    {
        $('#info-code').show();
        $('#info-address').show();
    }

    $infoDialog.dialog('open');
}

var default_icon, star_01, star_02, star_03;

$(function()
{
    default_icon = $('.app').eq(0).find(".appIcon").attr("src");
    var $default_stars = $('.items-score').eq(0).find('img');
    star_01 = $default_stars.eq(0).attr('src');
    star_02 = $default_stars.eq(1).attr('src');
    star_03 = $default_stars.eq(2).attr('src');


    //专题内容
    $.ajax({
        url:ajaxSubjectGame.contentUrl,
        dataType:'jsonp',
        data:{
            "categoryId":ajaxSubjectGame.rescategory_id,
            "version":userInfo.version,
            "phonetypeName":userInfo.phonetypeName,
            "os_version":userInfo.os_version,
            "language":userInfo.language,
            "imei":userInfo.imei,
            "imsi":userInfo.imsi,
            "resolution":userInfo.resolution
        },
        jsonp:'jsonpSubjectDetail',
        success:function(data)
        {
            if(data.state === 1)
            {
                $('.headPic').data('icon', data.ResourcesCategory.rescategoryIcons).imglazyload({"urlName":"data-icon"});
                $('.subjectName').text(data.ResourcesCategory.rescategoryName);
                $('.subjectTime').text(getDateStr(new Date(data.ResourcesCategory.rescategoryCreateddate)));
                $('.description').text(data.ResourcesCategory.rescategoryDescription);
            }
        },
        error:function()
        {
            console.log("load subject detail failed.");
        }
    });

    //最开始ajax加载20个应用，一次全部加载
    $.ajax(
        {
            url:ajaxSubjectGame.appUrl,
            dataType:'jsonp',
            data:
            {
                "rescategory_id":ajaxSubjectGame.rescategory_id,
                "order_by":ajaxSubjectGame.order_by,
                "resolution":userInfo.resolution,
                "version":userInfo.version,
                "phonetypeName":userInfo.phonetypeName,
                "os_version":userInfo.os_version,
                "language":userInfo.language,
                "imei":userInfo.imei,
                "imsi":userInfo.imsi,
                "size":ajaxSubjectGame.init_size,
                "start_position":ajaxSubjectGame.start_position,
                "servicePrivider":userInfo.userState && userInfo.serviceProvider
            },
            jsonp:'jsonpSubjectGame',
            success:function(data)
            {
                if(data.state === 1)//获取成功
                {
                    ajaxSubjectGame.total_size = data.products.total_size;
                    subjectGameList = subjectGameList.concat(data.product);
                    var $templete = $('.app').clone();
                    var $container = $("#app-list-box").empty();
                    var len = data.product.length;

                    for (var i = 0; i < len; ++i)
                    {
                        var $item = createItem(data.product[i], $templete);
                        $container.append($item);
                        $item.find(".appIcon").imglazyload({"urlName":"data-icon"});
                        //添加点击响应函数
                        $item.find(".btn").on("tap",function()
                        {
                            btnTapHandler($(this));
                            return false;
                        });
                        $item.find(".appInfo").on('tap', function()
                        {
                            infoTapHandler($(this));
                            return false;
                        });
                    }
                    $.fn.imglazyload.detect();
                }
                else
                {
                    console.log("There is no app to load.");
                }
            },
            error:function()
            {
                console.log("load recommend app list error");
            }
        }
    );

    //获取抽奖次数
    $.ajax({
        url:ajaxSubjectGame.countUrl,
        dataType:"jsonp",
        data:{
            "imei":userInfo.imei,
            "imsi":userInfo.imsi
        },
        jsonp:'jsonpCount',
        success:function(data)
        {
            if(data.state === 1)
            {
                ajaxSubjectGame.count = data.lotteryCnt;
                $('#lotteryCount').text(ajaxSubjectGame.count + '次');
            }
            else
            {
                console.log("return error.");
            }
        },
        error:function()
        {
            console.log("load lottery count error");
        }
    });

    //提示对话框
    $("#tip-dialog").dialog({
        autoOpen:false,
        closeBtn:false,
        title:"提示",
        buttons: {
            "确定": function()
            {
                this.close();
            }
        }
    });

    //礼包对话框
    $("#gift-dialog").dialog({
        autoOpen:false,
        closeBtn:false,
        title:"礼包",
        buttons: {
            "取消": function(){
                this.close();
            },
            "确定": function(){
                var index = indexOfGift($('#gift-dialog').data('id'));
                //领过了
                if(index != -1)
                {
                    isUxbao && window.uxbao.click(JSON.stringify
                        (
                            {
                                "type":12,
                                "title":$('#gift-dialog').data('name'),
                                "url":ajaxSubjectGame.giftUrl +  "?acId=" + $('#gift-dialog').data('id') + "&num=" + myGiftData[index].giftNo
                            }
                        )
                    );
                }
                else
                {
                    isUxbao && window.uxbao.click(JSON.stringify
                        (
                            {
                                "type":12,
                                "title":$('#gift-dialog').data('name'),
                                "url":ajaxSubjectGame.giftUrl +  "?acId=" + $('#gift-dialog').data('id')
                            }
                        )
                    );
                }
                this.close();
            }
        }
    });

    //填写信息对话框
    $("#info-dialog").dialog({
        autoOpen:false,
        closeBtn:false,
        title:"填写领取奖品信息",
        buttons: {
            "取消": function(){
                this.close();
            },
            "确定": function(){
                var userName = $('#info-name').val();
                var phone = $('#info-phone').val();
                var code = $("#info-code").val();
                var address = $("#info-address").val();
                var self = this;
                if(prize === 4 || prize === 7 || prize === 8)
                {
                    if(!userName)
                    {
                        $('#info-name').trigger('focus');
                        return;
                    }
                    if(!phone)
                    {
                        $('#info-phone').trigger('focus');
                        return;
                    }
                    $.ajax({
                        url:ajaxSubjectGame.infoUrl,
                        dataType:'jsonp',
                        data:{
                            "lotteryId":prizeId,
                            "userName":userName,
                            "userPhoneNumber":phone,
                            "zipCode":"",
                            "userAddress":"",
                            "version":userInfo.version,
                            "phonetypeName":userInfo.phonetypeName,
                            "os_version":userInfo.os_version,
                            "language":userInfo.language,
                            "imei":userInfo.imei,
                            "imsi":userInfo.imsi
                        },
                        jsonp:"jsonpInfo",
                        success:function(data)
                        {
                            if(data.state === 1)
                            {
                                self.close();
                                showTipDialog("提交用户信息成功！");
                            }
                            else
                            {
                                self.close();
                                showTipDialog("提交用户信息失败！");
                            }
                        },
                        error:function()
                        {
                            self.close();
                            showTipDialog("提交用户信息失败！");
                        }
                    });
                }
                else
                {
                    if(!userName)
                    {
                        $('#info-name').trigger('focus');
                        return;
                    }
                    if(!phone)
                    {
                        $('#info-phone').trigger('focus');
                        return;
                    }
                    if(!code)
                    {
                        $('#info-code').trigger('focus');
                        return;
                    }
                    if(!address)
                    {
                        $('#info-address').trigger('focus');
                        return;
                    }
                    $.ajax({
                        url:ajaxSubjectGame.infoUrl,
                        dataType:'jsonp',
                        data:{
                            "lotteryId":prizeId,
                            "userName":userName,
                            "userPhoneNumber":phone,
                            "zipCode":code,
                            "userAddress":address,
                            "version":userInfo.version,
                            "phonetypeName":userInfo.phonetypeName,
                            "os_version":userInfo.os_version,
                            "language":userInfo.language,
                            "imei":userInfo.imei,
                            "imsi":userInfo.imsi
                        },
                        jsonp:"jsonpInfo",
                        success:function(data)
                        {
                            if(data.state === 1)
                            {
                                self.close();
                                showTipDialog("提交用户信息成功！");
                            }
                            else
                            {
                                self.close();
                                showTipDialog("提交用户信息失败！");
                            }
                        },
                        error:function()
                        {
                            self.close();
                            showTipDialog("提交用户信息失败！");
                        }
                    });
                }
            }
        }
    });

    //旋转
    var totalDeg = 360 * 3 + 0;
    var steps = [];
    var prizeDeg = [337.5, 22.5, 112.5, 67.5, 202.5, 247.5, 157.5, 292.5];//iphone，球衣，小霸王游戏机，30充值卡，小黄人，礼包，10元，5元
    var prize, prizeData, prizeId;
    var count = 0;
    var now = 0;
    var a = 0.01;
    var inner, timer, running = false;
    function countSteps() {
        var t = Math.sqrt(2 * totalDeg / a);
        var v = a * t;
        for (var i = 0; i < t; i++) {
            steps.push((2 * v * i - a * i * i) / 2)
        }
        steps.push(totalDeg)
    }
    function step() {
        inner.style.webkitTransform = 'rotate(' + steps[now++] + 'deg)';
        inner.style.MozTransform = 'rotate(' + steps[now++] + 'deg)';
        if (now < steps.length)
        {
            requestAnimFrame(step);
        }
        else
        {
            running = false;
            if(prize === 6)
            {
                setTimeout(function()
                {
                    showGiftDialog(prizeData);
                }, 500);
            }
            else
            {
                $('#info-dialog').data('id', prizeId);
                setTimeout(function()
                {
                    showInfoDialog(prize);
                }, 500);
            }
        }
    }
    function start(deg)
    {
        running = true;
        clearInterval(timer);
        totalDeg = 360 * 7 + deg + fRandomBy(-10, 10);
        steps = [];
        now = 0;
        countSteps();
        requestAnimFrame(step);
    }
    window.start = start;
    inner = document.getElementById('inner');
    i = 10;
    //点击抽奖
    $("#inner, #startBtn").tap(function()
    {
        if (running)
        {
            return;
        }

        $.ajax({
            url:ajaxSubjectGame.lotteryUrl,
            dataType:'jsonp',
            data:{
                "imei":userInfo.imei,
                "imsi":userInfo.imsi,
                "versionNumber":2
            },
            jsonp:'jsonpLottery',
            success:function(data)
            {
                //无次数可用
                if(data.state === -1)
                {
                    showTipDialog(data.message);
                }
                //正常抽奖
                else if(data.state === 1)
                {
                    --ajaxSubjectGame.count;
                    $('#lotteryCount').text(ajaxSubjectGame.count + '次');
                    prize = data.lotteryResult;
                    prizeId = data.lotteryId;
                    if(data.lotteryResult === 6)
                    {
                        //alert("六等奖");
                        prizeData = data.activity;
                    }
                    start(prizeDeg[data.lotteryResult - 1]);
                }
            },
            error:function()
            {
                console.log('connect error');
            }
        });

    });

});