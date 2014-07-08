/**
 * Created by zd on 2014/5/10 0010.
 */
//最新应用ajax参数对象
var ajaxNew =
{
    "total_size":0,//总共的应用个数
    "start_position":1,//从第几个开始取
    "init_size":10,//第一次取的数目
    "load_size":5,//之后每次下拉加载的数目
    "url": $.apiRoot + "appV3/getNewApp.do",
    "detailUrl": $.htmlRoot + "game_detail.html",
    "onRefresh":false,
    "now":getDateStr(new Date()),
    "currentDateStr":""
};

//加载进来的推荐应用列表
var newList = [];

//从现有node根据给的data创建新node
function createItem($node, itemData)
{
    var $item = $node.clone();
    fillItem($item, itemData);
    return $item;
}

//ajax填充一个应用的信息，$item是一个zepto对象，itemData提供填充数据
function fillItem($item, itemData)
{
    var packageName = itemData.resPackagename;
    var ca = itemData.resCapacity/(1024*1024);
    //使用包名作为id
    $item.attr("id", itemData.resPackagename)
        .data("location", itemData.resLocation)
        .data("id", itemData.resId)
        .data("package", packageName)
        .data("icon", itemData.resIcons)
        .data("name", itemData.resName)
        .data("capacity", ca);

    bindGiftTapHandler($item, itemData);

    $item.find(".appIcon").data("icon", itemData.resIcons).attr("src", default_icon);

    $item.find(".tit strong").text(itemData.resName);
    $item.find(".tit p").text(ca.toFixed(1) + 'MB | ' + itemData.resDeveloper);

    //评分
    var rated = itemData.resRated;
    fillRate($item, rated);

    //状态
    fillState($item, packageName, phoneData);
}

//加载更多
function loadMore()
{
    if(!ajaxNew.onRefresh && ajaxNew.start_position <= ajaxNew.total_size)
    {
        ajaxNew.onRefresh = true;
        $.ajax(
            {
                url:ajaxNew.url,
                dataType:'jsonp',
                data:
                {
                    "resolution":userInfo.resolution,
                    "version":userInfo.version,
                    "phonetypeName":userInfo.phonetypeName,
                    "os_version":userInfo.os_version,
                    "language":userInfo.language,
                    "imei":userInfo.imei,
                    "imsi":userInfo.imsi,
                    "size":ajaxNew.load_size,
                    "start_position":ajaxNew.start_position,
                    "servicePrivider":userInfo.userState && userInfo.serviceProvider
                },
                jsonp:'jsonNew',
                success:function(data, textStatus, xhr)
                {
                    if(data.state === 1 && data.product)
                    {
                        var $container = $("#app-list-box");

                        newList = newList.concat(data.product);
                        var len = data.product.length;

                        for (var i = 0; i < len; ++i)
                        {
                            var releaseDateStr = getDateStr(new Date(data.product[i].resUpdatedate));
                            day = dateDiff(ajaxNew.currentDateStr, releaseDateStr);

                            //不在当天
                            if(day !== 0)
                            {
                                //昨天
                                if(dateDiff(ajaxNew.now, releaseDateStr) === 1)
                                {
                                    $container.append(createDate("昨天"));
                                }
                                else
                                {
                                    $container.append(createDate(releaseDateStr));
                                }
                                ajaxNew.currentDateStr = releaseDateStr;
                            }
                            var $item = createItem($(".app").eq(0), data.product[i]);
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
                                infoTapHandler($(this).parent().parent());
                                return false;
                            });
                        }

                        ajaxNew.start_position += len;

                        if(ajaxNew.start_position > ajaxNew.total_size)
                        {
                            $(".more").hide();
                            $(".ver-line").addClass('load-complete');
                        }
                        ajaxNew.onRefresh = false;
                    }
                },
                error:function(XMLHttpRequest, textStatus, errorThrown)
                {
                    ajaxNew.onRefresh = false;
                    console.log("failed ajax!");
                    $(".more").hide();
                    $(".ver-line").addClass('load-complete');
                }
            }
        );
    }
}

var default_icon, star_01, star_02, star_03;

//页面加载完毕执行函数
$(function()
{
    default_icon = $('.app').eq(0).find(".appIcon").attr("src");
    var $default_stars = $('.items-score').eq(0).find('img');
    star_01 = $default_stars.eq(0).attr('src');
    star_02 = $default_stars.eq(1).attr('src');
    star_03 = $default_stars.eq(2).attr('src');
    //最开始ajax加载10个应用
    $.ajax(
        {
            url:ajaxNew.url,
            dataType:'jsonp',
            data:
            {
                "resolution":userInfo.resolution,
                "version":userInfo.version,
                "phonetypeName":userInfo.phonetypeName,
                "os_version":userInfo.os_version,
                "language":userInfo.language,
                "imei":userInfo.imei,
                "imsi":userInfo.imsi,
                "size":ajaxNew.init_size,
                "start_position":ajaxNew.start_position,
                "servicePrivider":userInfo.userState && userInfo.serviceProvider
            },
            jsonp:'jsoncallback',
            success:function(data)
            {
                if(data.state === 1)//获取成功
                {
                    var $container = $("#app-list-box");
                    ajaxNew.total_size = data.products.total_size;
                    newList = newList.concat(data.product);
                    ajaxNew.start_position += data.product.length;

                    var len = data.product.length;
                    var $default_date = $('.date'), $default_app = $('.app'), day;
                    for(var i = 0; i < len; ++i)
                    {
                        if(i=== 0)
                        {
                            ajaxNew.currentDateStr = getDateStr(new Date(data.product[i].resUpdatedate));
                            day = dateDiff(ajaxNew.now, ajaxNew.currentDateStr);
                            //今天
                            if(day === 0)
                            {
                                $default_date.addClass('today').find('.date-content').text('今天');
                            }
                            //昨天
                            else if(day === 1)
                            {
                                $default_date.addClass('yesterday').find('.date-content').text('昨天');
                            }
                            else
                            {
                                $default_date.find('.date-content').text(ajaxNew.currentDateStr);
                            }
                            fillItem($default_app, data.product[i]);
                            $default_app.find(".appIcon").imglazyload({"urlName":"data-icon"});
                            //添加点击响应函数
                            $default_app.find(".btn").on("tap",function()
                            {
                                btnTapHandler($(this));
                                return false;
                            });
                            $default_app.find(".appInfo").on('tap', function()
                            {
                                infoTapHandler($(this).parent().parent());
                                return false;
                            });
                        }
                        else
                        {
                            var releaseDateStr = getDateStr(new Date(data.product[i].resUpdatedate));
                            day = dateDiff(ajaxNew.currentDateStr, releaseDateStr);

                            //不在当天
                            if(day !== 0)
                            {
                                //昨天
                                if(dateDiff(ajaxNew.now, releaseDateStr) === 1)
                                {
                                    $container.append(createDate("昨天"));
                                }
                                else
                                {
                                    $container.append(createDate(releaseDateStr));
                                }
                                ajaxNew.currentDateStr = releaseDateStr;
                            }
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
                                infoTapHandler($(this).parent().parent());
                                return false;
                            });
                        }
                    }

                    $.fn.imglazyload.detect();
                    //下拉加载
                    if(ajaxNew.start_position <= ajaxNew.total_size)
                    {
                        $(window).on("scroll", function()
                        {
                            var lazyheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop()) + parseFloat($('.more').height());
                            if ($(document).height() <= lazyheight)
                            {
                                loadMore();
                            }
                        });
                        $(window).trigger('scroll');
                    }
                    else
                    {
                        $(".more").hide();
                        $(".ver-line").addClass('load-complete');
                    }
                }
                else
                {
                    console.log("There is no app to load.");
                }
            },
            error:function()
            {
                console.log("load New app list error");
            }
        }
    );
});
