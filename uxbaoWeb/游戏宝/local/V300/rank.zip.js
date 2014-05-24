var ajaxRank={"total_size":0,"start_position":1,"init_size":10,"load_size":5,"url":$.apiRoot+"appV3/getResRankList.do","detailUrl":$.htmlRoot+"game_detail.html","onRefresh":false};var recommendList=[];function createItem(itemData){var $item=$($(".app")[0].cloneNode(true));fillItem($item,itemData);return $item};function updateState(packageName,state){var $item=$(document.getElementById(packageName));var $btn=$item.find(".btn");if(state>=0&&state<=100){if(!$btn.hasClass("cancelBtn")){$btn.removeClass().addClass("cancelBtn btn")};$item.find(".state").text(state+"%")}else if(state=="finishDownload"){$btn.removeClass().addClass("installBtn btn");$item.find(".state").text("安装")}else if(state=="finishInstall"){$btn.removeClass().addClass("openBtn btn");$item.find(".state").text("打开")}else if(state=="pause"){$btn.removeClass().addClass("continueBtn btn");$item.find(".state").text("继续")}};function indexList(packageName,list){var len=list.length;for(var i=0;i<len;++i){if(packageName==list[i].resPackagename){return i}};return-1};function fillRate($item,score){$item.find(".items-score img").each(function(j,imgItem){if(j-score<-0.5){$(imgItem).attr("src",star_01)}else if(j-score==-0.5){$(imgItem).attr("src",star_02)}else{$(imgItem).attr("src",star_03)}})};function fillState($item,packageName,phoneData){var downloadIndex=indexList(packageName,phoneData.downloadList);if(downloadIndex!=-1){if(phoneData.downloadList[downloadIndex].downPercent==100){$item.find(".state").text("安装");$item.find(".btn").removeClass().addClass("btn installBtn")}else{$item.find(".state").text("继续");$item.find(".btn").removeClass().addClass("btn continueBtn")}}else if(indexList(packageName,phoneData.updateList)!=-1){$item.find(".state").text("升级");$item.find(".btn").removeClass().addClass("btn updateBtn")}else if(indexList(packageName,phoneData.installList)!=-1){$item.find(".state").text("打开");$item.find(".btn").removeClass().addClass("btn openBtn")}else{$item.find(".state").text("下载");$item.find(".btn").removeClass().addClass("btn dlBtn")}};function fillItem($item,itemData){var packageName=itemData.resPackagename;$item.attr("id",itemData.resPackagename).data("location",itemData.resLocation).data("id",itemData.resId).data("package",packageName).data("icon",itemData.resIcons).data("name",itemData.resName);$item.find(".appIcon").data("icon",itemData.resIcons).attr("src",default_icon);$item.find(".tit strong").text(itemData.resName);var ca=(itemData.resCapacity/(1024*1024)).toFixed(1);$item.find(".tit p").text(ca+'MB | '+itemData.resDeveloper);var rated=itemData.resRated;fillRate($item,rated);fillState($item,packageName,phoneData)};function btnTapHandler($target){var $item=$target.parent().parent();if($target.hasClass('dlBtn')||$target.hasClass('continueBtn')){$target.removeClass().addClass('cancelBtn btn');$target.find(".state").text('暂停');isUxbao&&window.uxbao.click(JSON.stringify({"type":1,"resPackagename":$item.data("package"),"resId":$item.data("id"),"resLocation":$item.data("location"),"resIcons":$item.data("icon"),"resName":$item.data("name")}))}else if($target.hasClass('updateBtn')){$target.removeClass('updateBtn').addClass('cancelBtn');$target.find(".state").text('暂停');isUxbao&&window.uxbao.click(JSON.stringify({"type":1,"resPackagename":$item.data("package"),"resId":$item.data("id"),"resLocation":$item.data("location"),"resIcons":$item.data("icon"),"resName":$item.data("name")}))}else if($target.hasClass('cancelBtn')){$target.removeClass('cancelBtn').addClass('continueBtn');$target.find(".state").text('继续');isUxbao&&window.uxbao.click(JSON.stringify({"type":5,"resPackagename":$item.data("package"),"resId":$item.data("id"),"resLocation":$item.data("location"),"resIcons":$item.data("icon"),"resName":$item.data("name")}))}else if($target.hasClass("openBtn")){isUxbao&&window.uxbao.click(JSON.stringify({"type":3,"resPackagename":$item.data("package"),"resId":$item.data("id"),"resLocation":$item.data("location"),"resIcons":$item.data("icon"),"resName":$item.data("name")}))}else if($target.hasClass("installBtn")){isUxbao&&window.uxbao.click(JSON.stringify({"type":6,"resPackagename":$item.data("package"),"resId":$item.data("id"),"resLocation":$item.data("location"),"resIcons":$item.data("icon"),"resName":$item.data("name")}))}};function loadMore(){if(!ajaxRank.onRefresh&&ajaxRank.start_position<=ajaxRank.total_size){ajaxRank.onRefresh=true;$.ajax({url:ajaxRank.url,dataType:'jsonp',data:{"resolution":userInfo.resolution,"version":userInfo.version,"phonetypeName":userInfo.phonetypeName,"os_version":userInfo.os_version,"language":userInfo.language,"imei":userInfo.imei,"imsi":userInfo.imsi,"size":ajaxRank.load_size,"start_position":ajaxRank.start_position},jsonp:'jsonRank',success:function(data,textStatus,xhr){if(data.state===1&&data.product){var $container=$("#app-list-box");recommendList=recommendList.concat(data.product);var len=data.product.length;for(var i=0;i<len;++i){var $item=createItem(data.product[i]);$container.append($item);$item.find(".appIcon").imglazyload({"urlName":"data-icon"});$item.find(".btn").on("tap",function(){btnTapHandler($(this));return false});$item.find(".appInfo").on('tap',function(){infoTapHandler($(this));return false})};ajaxRank.start_position+=len;if(ajaxRank.start_position>ajaxRank.total_size){$(".more").hide()};ajaxRank.onRefresh=false}},error:function(XMLHttpRequest,textStatus,errorThrown){ajaxRank.onRefresh=false;console.log("failed ajax!");$(".more").hide()}})}};function infoTapHandler($info){var $item=$info.parent().parent();var resId=$item.data("id");isUxbao&&window.uxbao.click(JSON.stringify({"type":2,"resId":resId,"url":ajaxRank.detailUrl+"?resId="+resId,"resName":$item.data("name"),"resPackageName":$item.data("package")}))};var default_icon,star_01,star_02,star_03;$(function(){default_icon=$('.app').eq(0).find(".appIcon").attr("src");var $default_stars=$('.items-score').eq(0).find('img');star_01=$default_stars.eq(0).attr('src');star_02=$default_stars.eq(1).attr('src');star_03=$default_stars.eq(2).attr('src');$.ajax({url:ajaxRank.url,dataType:'jsonp',data:{"resolution":userInfo.resolution,"version":userInfo.version,"phonetypeName":userInfo.phonetypeName,"os_version":userInfo.os_version,"language":userInfo.language,"imei":userInfo.imei,"imsi":userInfo.imsi,"size":ajaxRank.init_size,"start_position":ajaxRank.start_position},jsonp:'jsonRank',success:function(data){if(data.state===1){ajaxRank.total_size=data.products.total_size;recommendList=recommendList.concat(data.product);ajaxRank.start_position+=data.product.length;$(".app").each(function(i,item){var $item=$(this);if(data.product[i]){fillItem($item,data.product[i]);$item.find(".appIcon").imglazyload({"urlName":"data-icon"});$item.find(".btn").on("tap",function(){btnTapHandler($(this));return false});$item.find(".appInfo").on('tap',function(){infoTapHandler($(this));return false})}else{$item.remove()}});$.fn.imglazyload.detect();if(ajaxRank.start_position<=ajaxRank.total_size){$(window).on("scroll",function(){var lazyheight=parseFloat($(window).height())+parseFloat($(window).scrollTop())+parseFloat($('.more').height());if($(document).height()<=lazyheight){loadMore()}})}else{$(".more").hide()}}else{console.log("There is no app to load.")}},error:function(){console.log("load recommend app list error")}})});
