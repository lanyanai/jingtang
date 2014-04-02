/**
 * Created by zd on 14-3-9.
 */
//获取本机数据
//var phoneData = JSON.parse(window.uxbao.init());
var phoneData =
{
    "downloadList":
        [
            {
                "userresPaystatus": null,
                "author_email": null,
                "author_id": null,
                "downLength": null,
                "downPercent": 30,
                "downState": null,
                "resCapacity": null,
                "resDescription": null,
                "resDeveloper": null,
                "resDownloadnum": null,
                "resIcons": null,
                "resId": null,
                "resLocation": null,
                "resName": null,
                "resPackagename": "com.chukong.brave",
                "resPrice": null,
                "resRated": null,
                "resRecommendflag": null,
                "resScreenshots": null,
                "resVersion": null,
                "resVersionCode": 2,
                "rescategoryId": null,
                "totalLength": null,
                "_id": 0
            },
            {
                "userresPaystatus": null,
                "author_email": null,
                "author_id": null,
                "downLength": null,
                "downPercent": 20,
                "downState": null,
                "resCapacity": null,
                "resDescription": null,
                "resDeveloper": null,
                "resDownloadnum": null,
                "resIcons": null,
                "resId": null,
                "resLocation": null,
                "resName": null,
                "resPackagename": "com.uxbao",
                "resPrice": null,
                "resRated": null,
                "resRecommendflag": null,
                "resScreenshots": null,
                "resVersion": null,
                "resVersionCode": 4,
                "rescategoryId": null,
                "totalLength": null,
                "_id": 0
            },
            {
                "userresPaystatus": null,
                "author_email": null,
                "author_id": null,
                "downLength": null,
                "downPercent": 45,
                "downState": null,
                "resCapacity": null,
                "resDescription": null,
                "resDeveloper": null,
                "resDownloadnum": null,
                "resIcons": null,
                "resId": null,
                "resLocation": null,
                "resName": null,
                "resPackagename": "com.koogame.zaiyiqi",
                "resPrice": null,
                "resRated": null,
                "resRecommendflag": null,
                "resScreenshots": null,
                "resVersion": null,
                "resVersionCode": 5,
                "rescategoryId": null,
                "totalLength": null,
                "_id": 0
            }
        ],
    "updateList":
        [
            {
                "userresPaystatus": null,
                "author_email": null,
                "author_id": null,
                "downLength": null,
                "downPercent": null,
                "downState": null,
                "resCapacity": null,
                "resDescription": null,
                "resDeveloper": null,
                "resDownloadnum": null,
                "resIcons": null,
                "resId": null,
                "resLocation": null,
                "resName": null,
                "resPackagename": "com.supreme.tanks",
                "resPrice": null,
                "resRated": null,
                "resRecommendflag": null,
                "resScreenshots": null,
                "resVersion": null,
                "resVersionCode": 20,
                "rescategoryId": null,
                "totalLength": null,
                "_id": 0
            },
            {
                "userresPaystatus": null,
                "author_email": null,
                "author_id": null,
                "downLength": null,
                "downPercent": null,
                "downState": null,
                "resCapacity": null,
                "resDescription": null,
                "resDeveloper": null,
                "resDownloadnum": null,
                "resIcons": null,
                "resId": null,
                "resLocation": null,
                "resName": null,
                "resPackagename": "org.cocos2dx.FishingJoy2",
                "resPrice": null,
                "resRated": null,
                "resRecommendflag": null,
                "resScreenshots": null,
                "resVersion": null,
                "resVersionCode": 105,
                "rescategoryId": null,
                "totalLength": null,
                "_id": 0
            },
            {
                "userresPaystatus": null,
                "author_email": null,
                "author_id": null,
                "downLength": null,
                "downPercent": null,
                "downState": null,
                "resCapacity": null,
                "resDescription": null,
                "resDeveloper": null,
                "resDownloadnum": null,
                "resIcons": null,
                "resId": null,
                "resLocation": null,
                "resName": null,
                "resPackagename": "com.TongBanStudio.JTDDZ",
                "resPrice": null,
                "resRated": null,
                "resRecommendflag": null,
                "resScreenshots": null,
                "resVersion": null,
                "resVersionCode": 5,
                "rescategoryId": null,
                "totalLength": null,
                "_id": 0
            }
        ],
    "installList":
        [
            {
                "userresPaystatus": null,
                "author_email": null,
                "author_id": null,
                "downLength": null,
                "downPercent": null,
                "downState": null,
                "resCapacity": null,
                "resDescription": null,
                "resDeveloper": null,
                "resDownloadnum": null,
                "resIcons": null,
                "resId": null,
                "resLocation": null,
                "resName": null,
                "resPackagename": "com.andbase",
                "resPrice": null,
                "resRated": null,
                "resRecommendflag": null,
                "resScreenshots": null,
                "resVersion": null,
                "resVersionCode": 14,
                "rescategoryId": null,
                "totalLength": null,
                "_id": 0
            },
            {
                "userresPaystatus": null,
                "author_email": null,
                "author_id": null,
                "downLength": null,
                "downPercent": null,
                "downState": null,
                "resCapacity": null,
                "resDescription": null,
                "resDeveloper": null,
                "resDownloadnum": null,
                "resIcons": null,
                "resId": null,
                "resLocation": null,
                "resName": null,
                "resPackagename": "com.aspire.mm",
                "resPrice": null,
                "resRated": null,
                "resRecommendflag": null,
                "resScreenshots": null,
                "resVersion": null,
                "resVersionCode": 32,
                "rescategoryId": null,
                "totalLength": null,
                "_id": 0
            }
        ]
};

//推荐应用ajax参数对象
var ajaxRecommend =
{
    "total_size":0,//总共的应用个数
    "start_position":1,//从第几个开始取
    "init_size":10,//第一次取的数目
    "load_size":5,//之后每次下拉加载的数目
    "url":"http://115.29.177.196:8080/mystore/app/getrecommendproducts.do",
    "resolution":"200*200",
    "version":"2.3",
    "phonetypeName":"N7105",
    "os_version":"4.0",
    "language":"cn",
    "imei":"00000000",
    "imsi":"00000000",
    "base64":false,
    "onRefresh":false
};

//加载进来的推荐应用列表
var recommendList = [];
//空li字符串，创建用
function createItem(itemData, i)
{
    var $item = $($(".app")[0].cloneNode(true));
    fillItem($item, itemData, i);
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
            $(imgItem).attr("src", "images/jingpin/star_01.png");
        }
        else if(j - score == -0.5)
        {
            $(imgItem).attr("src", "images/jingpin/star_02.png");
        }
        else
        {
            $(imgItem).attr("src", "images/jingpin/star_03.png");
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

//ajax填充一个应用的信息，$item是一个zepto对象，itemData提供填充数据
function fillItem($item, itemData, i)
{
    var packageName = itemData.resPackagename;
    var defaultIcon = "images/jingpin/market.png";
    //使用包名作为id
    $item.attr("id", itemData.resPackagename)
        .attr("data-location", itemData.resLocation)
        .attr("data-id", itemData.resId)
        .attr("data-package", packageName)
        .attr("data-icon", itemData.resIcons)
        .attr("data-name", itemData.resName);

    //$item.find(".number").text(i);
    $item.find(".appIcon").attr("data-icon", itemData.resIcons).attr("src", defaultIcon);

    $item.find(".tit strong").text(itemData.resName);
    $item.find(".tit p").text(itemData.resDeveloper);

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
    if($target.hasClass('dlBtn') || $target.hasClass('continueBtn'))
    {
        $target.removeClass().addClass('cancelBtn btn');
        $target.find(".state").text('暂停');
        window.uxbao.click(
            JSON.stringify(
                {
                    "type":1,
                    "resPackagename":$item.attr("data-package"),
                    "resId":$item.attr("data-id"),
                    "resLocation":$item.attr("data-location"),
                    "resIcons":$item.attr("data-icon"),
                    "resName":$item.attr("data-name")
                }
            )
        );
    }
    else if($target.hasClass('updateBtn'))
    {
        $target.removeClass('updateBtn').addClass('cancelBtn');
        $target.find(".state").text('暂停');
        window.uxbao.click(
            JSON.stringify(
                {
                    "type":1,
                    "resPackagename":$item.attr("data-package"),
                    "resId":$item.attr("data-id"),
                    "resLocation":$item.attr("data-location"),
                    "resIcons":$item.attr("data-icon"),
                    "resName":$item.attr("data-name")
                }
            )
        );
    }
    //通知android暂停下载
    else if($target.hasClass('cancelBtn'))
    {
        $target.removeClass('cancelBtn').addClass('continueBtn');
        $target.find(".state").text('继续');
        window.uxbao.click(
            JSON.stringify(
                {
                    "type":5,
                    "resPackagename":$item.attr("data-package"),
                    "resId":$item.attr("data-id"),
                    "resLocation":$item.attr("data-location"),
                    "resIcons":$item.attr("data-icon"),
                    "resName":$item.attr("data-name")
                }
            )
        );
    }
    //通知android打开此应用
    else if($target.hasClass("openBtn"))
    {
        window.uxbao.click(
            JSON.stringify(
                {
                    "type":3,
                    "resPackagename":$item.attr("data-package"),
                    "resId":$item.attr("data-id"),
                    "resLocation":$item.attr("data-location"),
                    "resIcons":$item.attr("data-icon"),
                    "resName":$item.attr("data-name")
                }
            )
        );
    }
    //通知android安装此应用
    else if($target.hasClass("installBtn"))
    {
        window.uxbao.click(
            JSON.stringify(
                {
                    "type":6,
                    "resPackagename":$item.attr("data-package"),
                    "resId":$item.attr("data-id"),
                    "resLocation":$item.attr("data-location"),
                    "resIcons":$item.attr("data-icon"),
                    "resName":$item.attr("data-name")
                }
            )
        );
    }
}

//加载更多
function loadMore()
{
    if(!ajaxRecommend.onRefresh && ajaxRecommend.start_position <= ajaxRecommend.total_size)
    {
        ajaxRecommend.onRefresh = true;
        $.ajax(
            {
                url:ajaxRecommend.url,
                dataType:'jsonp',
                data:
                {
                    "resolution":ajaxRecommend.resolution,
                    "version":ajaxRecommend.version,
                    "phonetypeName":ajaxRecommend.phonetypeName,
                    "os_version":ajaxRecommend.os_version,
                    "language":ajaxRecommend.language,
                    "imei":ajaxRecommend.imei,
                    "imsi":ajaxRecommend.imsi,
                    "size":ajaxRecommend.load_size,
                    "start_position":ajaxRecommend.start_position,
                    "base64":ajaxRecommend.base64
                },
                jsonp:'jsonRecommend',
                success:function(data, textStatus, xhr)
                {
                    if(data.state === 1 && data.product)
                    {
                        var $container = $("#app-list-box");

                        recommendList = recommendList.concat(data.product);
                        var len = data.product.length;

                        for (var i = 0; i < len; ++i)
                        {
                            var $item = createItem(data.product[i]);
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

                        ajaxRecommend.start_position += len;

                        if(ajaxRecommend.start_position > ajaxRecommend.total_size)
                        {
                            $(".more").hide();
                        }
                        ajaxRecommend.onRefresh = false;
                    }
                },
                error:function(XMLHttpRequest, textStatus, errorThrown)
                {
                    ajaxRecommend.onRefresh = false;
                    console.log("failed ajax!");
                    $(".more").hide();
                }
            }
        );
    }
}

//进入游戏详情
function infoTapHandler($info)
{
    var $item = $info.parent().parent();
    var resId = $item.attr("data-id");
    window.uxbao.click(
        JSON.stringify(
            {
                "type":2,
                "resId":resId,
                "url":"http://115.29.177.196/游戏详情.html?resId=" + resId,
                "resName":$item.attr("data-name"),
                "resPackageName":$item.attr("data-package")
            }
        )
    );
}

//页面加载完毕执行函数
$(function()
{
    //最开始ajax加载10个应用
    $.ajax(
        {
            url:ajaxRecommend.url,
            dataType:'jsonp',
            data:
            {
                "resolution":ajaxRecommend.resolution,
                "version":ajaxRecommend.version,
                "phonetypeName":ajaxRecommend.phonetypeName,
                "os_version":ajaxRecommend.os_version,
                "language":ajaxRecommend.language,
                "imei":ajaxRecommend.imei,
                "imsi":ajaxRecommend.imsi,
                "size":ajaxRecommend.init_size,
                "start_position":ajaxRecommend.start_position,
                "base64":ajaxRecommend.base64
            },
            jsonp:'jsoncallback',
            success:function(data)
            {
                if(data.state === 1)//获取成功
                {
                    ajaxRecommend.total_size = data.products.total_size;
                    recommendList = recommendList.concat(data.product);
                    ajaxRecommend.start_position += data.product.length;
                    $(".app").each(function(i,item)
                    {
                        var $item = $(this);
                        fillItem($item, data.product[i], ajaxRecommend.start_position - data.product.length + i);
                        $item.find(".appIcon").imglazyload({"urlName":"data-icon"});
                        $.fn.imglazyload.detect();
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
                    });

                    //下拉加载
                    if(ajaxRecommend.start_position <= ajaxRecommend.total_size)
                    {
                        $(window).on("scroll", function()
                        {
                            lazyheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop()) + parseFloat($('.more').height());
                            if ($(document).height() <= lazyheight)
                            {
                                loadMore();
                            }
                        });
                    }
                    else
                    {
                        $(".more").hide();
                    }
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
});
