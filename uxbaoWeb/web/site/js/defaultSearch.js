/**
 * Created by zd on 2014/5/7 0007.
 */

var ajaxDefaultSearch = {
    "url": $.apiRoot + "appV3/getTopSearch.do",
    "searchUrl": $.htmlRoot + 'search.html'
};

function createItem(itemData)
{
    var $item = $(($(".hot-search-list").find('li')[0]).cloneNode(true));
    $item.find('span').text(itemData);
    return $item;
}

$(function(){
    $('#search-text').on('focusin', function()
    {
        $('.search-box').addClass('active');
    }).on('focusout', function()
    {
        $('.search-box').removeClass('active');
    }).focus();

    $('#search-btn').on('click', function()
    {
        if($('#search-text').val() !== '')
        {
            location.href = ajaxDefaultSearch.searchUrl + '?search_text=' + $('#search-text').val();
        }
    });
    $.ajax({
        url:ajaxDefaultSearch.url,
        dataType:"jsonp",
        data:{
            "version":userInfo.version,
            "phonetypeName":userInfo.phonetypeName,
            "os_version":userInfo.os_version,
            "imei":userInfo.imei,
            "imsi":userInfo.imsi,
            "resolution":userInfo.resolution,
            "language":userInfo.language
        },
        jsonp:'jsonDefault',
        success:function(data)
        {
            if(data.state === 1)
            {
                var len = data.keywords.length;
                var $container = $('.hot-search-list');
                var $default_item = $container.find("li");
                for(var i = 0; i < len; ++i)
                {
                    var $item;
                    if($default_item[i])
                    {
                        $default_item.eq(i).find('span').text(data.keywords[i]);
                    }
                    else
                    {
                        $item = createItem(data.keywords[i]);
                        $container.append($item);
                    }
                }
                for(var j = len; j < $default_item.length; ++j)
                {
                    $default_item.eq(j).remove();
                }

                $container.find('span').on('click', function()
                {
                    location.href = ajaxDefaultSearch.searchUrl + '?search_text=' + $(this).text();
//                    isUxbao && window.activity.clickTip($(this).text());
                    return false;
                });
            }
        },
        error:function()
        {
            console.log("load search key words failed.")
        }
    });

});