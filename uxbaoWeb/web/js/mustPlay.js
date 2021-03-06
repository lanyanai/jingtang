/**
 * Created by zd on 2014/5/4 0004.
 */
var ajaxMustCategory = {
    "url": $.apiRoot + "appV3/getCategory.do",
    "category":29
};

var ajaxMustGame = {
    "url": $.apiRoot + "appV3/getCategoryProducts.do",
    "size":8,
    "start_position":1,
    "order_by":"hot"
};

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
    $item.find('.company').text(ca.toFixed(1) + 'MB');

    //评分
    var rated = itemData.resRated;
    fillRate($item, rated);

    //状态
    fillState($item, packageName, phoneData);
}

function fillListItem($listItem, listItemData)
{
    $listItem.data('rescategoryId', listItemData.rescategoryId)
        .find('.list-top').find('span').text(listItemData.rescategoryName);
    $.ajax({
        url:ajaxMustGame.url,
        dataType:"jsonp",
        data:{
            "start_position":ajaxMustGame.start_position,
            "size":ajaxMustGame.size,
            "order_by":ajaxMustGame.order_by,
            "rescategory_id":listItemData.rescategoryId,
            "resolution":userInfo.resolution,
            "version":userInfo.version,
            "phonetypeName":userInfo.phonetypeName,
            "os_version":userInfo.os_version,
            "imei":userInfo.imei,
            "imsi":userInfo.imsi,
            "language":userInfo.language,
            "servicePrivider":userInfo.userState && userInfo.serviceProvider
        },
        jsonp:'jsonMustGame',
        success:function(data)
        {
            if(data.state === 1)//获取成功
            {
                $listItem.find('.app').each(function(i,item)
                {
                    var $item = $(this);
                    if(data.product[i])
                    {
                        fillItem($item, data.product[i]);
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
                    else
                    {
                        $item.remove();
                    }
                    $.fn.imglazyload.detect();
                });
            }
            else
            {
                console.log("There is no app to load.");
            }
        },
        error:function()
        {
            console.log("load app data error.");
        }
    });
}

function createListItem($node, itemData)
{
    var $listItem = $node.clone();
    fillListItem($listItem, itemData);
    return $listItem;
}

var default_icon, star_01, star_02, star_03;

$(function(){
    default_icon = $(".app").eq(0).find('.appIcon').attr('src');
    var $default_stars = $('.items-score').eq(0).find('img');
    star_01 = $default_stars.eq(0).attr('src');
    star_02 = $default_stars.eq(1).attr('src');
    star_03 = $default_stars.eq(2).attr('src');
    $.ajax({
        url:ajaxMustCategory.url,
        dataType:"jsonp",
        data:
        {
            "category":ajaxMustCategory.category,
            "version":userInfo.version,
            "phonetypeName":userInfo.phonetypeName,
            "os_version":userInfo.os_version,
            "imei":userInfo.imei,
            "imsi":userInfo.imsi
        },
        jsonp:'jsonMustCategory',
        success:function(data)
        {
            var len = data.product.length;
            var $defaultListItem = $(".appList");
            var $container = $("body");
            for(var i = 0; i < len; ++i)
            {
                var $list_item;
                if($defaultListItem[i])
                {
                    $list_item = $defaultListItem.eq(i);
                    fillListItem($list_item, data.product[i]);
                }
                else
                {
                    $list_item = createListItem($(".appList").eq(0), data.product[i]);
                    $container.append($list_item);
                }
                $list_item.find(".appIcon").imglazyload({"urlName": "data-icon"});
            }
            for(var j = len; j < $defaultListItem.length; ++j)
            {
                $defaultListItem.eq(j).remove();
            }
            $.fn.imglazyload.detect();
        },
        error:function()
        {
            console.log("load category data error.");
        }
    });
});