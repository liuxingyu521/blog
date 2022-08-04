/*!
 * Clean Blog v1.0.0 (http://startbootstrap.com)
 * Copyright 2015 Start Bootstrap
 * Licensed under Apache 2.0 (https://github.com/IronSummitMedia/startbootstrap/blob/gh-pages/LICENSE)
 */

/**
 * 函数节流
 * @param  {function}  func        需要高频率执行函数
 * @param  {Number}  delay       限制下次函数执行的延迟时间
 */
function throttle(func, delay) {
  // 闭包内维护的计时器
  var timer = null;
  // var firstExec = true;

  return function() {
    var _this = this,
      args = arguments;

    // if (firstExec) {
    //   func.apply(_this, args);
    //   firstExec = false;
    // }

    // 如果还在上一个计时时间内，不作处理
    if (timer) return;

    // 否则，设定延迟时间后执行高频率函数
    timer = setTimeout(function() {
      timer = null;
      func.apply(_this, args);
    }, delay);
  };
}

$(function() {
  // Tooltip Init
  $("[data-toggle='tooltip']").tooltip();

  // responsive tables
  $('table').wrap("<div class='table-responsive'></div>");
  $('table').addClass('table');

  // responsive embed videos
  $('iframe[src*="youtube.com"]').wrap(
    '<div class="embed-responsive embed-responsive-16by9"></div>'
  );
  $('iframe[src*="youtube.com"]').addClass('embed-responsive-item');
  $('iframe[src*="vimeo.com"]').wrap(
    '<div class="embed-responsive embed-responsive-16by9"></div>'
  );
  $('iframe[src*="vimeo.com"]').addClass('embed-responsive-item');

  // Navigation Scripts to Show Header on Scroll-Up
  //primary navigation slide-in effect
  var MQL = 1170;
  if ($(window).width() > MQL) {
    var headerHeight = $('.navbar-custom').height();
    $(window).on(
      'scroll',
      {
        previousTop: 0,
      },
      function() {
        var currentTop = $(window).scrollTop();
        //check if user is scrolling up
        if (currentTop < this.previousTop) {
          //if scrolling up...
          if (currentTop > 0 && $('.navbar-custom').hasClass('is-fixed')) {
            $('.navbar-custom').addClass('is-visible');
          } else {
            $('.navbar-custom').removeClass('is-visible is-fixed');
          }
        } else {
          //if scrolling down...
          $('.navbar-custom').removeClass('is-visible');
          if (currentTop > headerHeight && !$('.navbar-custom').hasClass('is-fixed'))
            $('.navbar-custom').addClass('is-fixed');
        }
        this.previousTop = currentTop;
      }
    );
  }

  // search global
  $('.searchInput').on(
    'input propertychange',
    throttle(function(e) {
      var searchStr = e.target.value;

      getAllBlogs().then(function(blogList) {
        var searchResultList = findMathchBlog(blogList, searchStr);

        // 拼接显示列表 DOM
        var searchBoxListDom = searchResultList
          .map(function(item, index) {
            return (
              '<li data-url="' +
              item.link +
              '">' +
              '<div class="search-bar__result-box__list-title">' +
              (index + 1) +
              '、' +
              item.title +
              '</div>' +
              '<div class="search-bar__result-box__list-content">' +
              item.desc +
              '</div>' +
              '</li>'
            );
          })
          .join('');

        // 拼接显示结果总数 DOM
        var resultListNumStr =
          searchResultList.length > 0
            ? '搜索到 ' + searchResultList.length + ' 条相关文章'
            : searchStr
            ? '暂无相关文章内容，换个词叭～'
            : '开始搜索吧∼';

        $('.searchBox ul')
          .empty()
          .append($(searchBoxListDom));
        $('.searchBox .searchTip').text(resultListNumStr);
      });
    }, 500)
  );

  $('.searchInput').on('focus', function() {
    $(this).trigger('change');
    $('.searchBox').slideDown('fast');
  });
  $('.searchInput').on('blur', function() {
    setTimeout(function() {
      $('.searchBox').slideUp('fast');
    }, 200);
  });

  // 搜索跳转页面
  $('.searchBox').on('click', 'li', function() {
    setTimeout(
      function() {
        location.href = $(this).data('url');
      }.bind(this),
      200
    );
  });

  /**
   * 获取所有博客数据
   * 将 XML 格式转成 对象的形式返回
   */
  function getAllBlogs() {
    var localBlogsDataStr = sessionStorage.getItem('local-blogs-data');

    return new Promise(function(res, rej) {
      if (localBlogsDataStr) {
        try {
          var localBlogsData = JSON.parse(localBlogsDataStr);
          res(localBlogsData);
        } catch (error) {
          console.error('本地博客数据解析出错', error);
        }
      } else {
        $.ajax({
          url: '/feed.xml',
          type: 'get',
        }).then(
          function(data) {
            var articles = data.getElementsByTagName('item');
            var blogsList = [].slice.call(articles).map(function(item) {
              var title = item.getElementsByTagName('title')[0].textContent;
              var link = item.getElementsByTagName('link')[0].textContent;
              var pubDate = item.getElementsByTagName('pubDate')[0].textContent;
              var description = item
                .getElementsByTagName('description')[0]
                .textContent.replace(/<.*?>/g, ' ')
                .replace(/\s+/g, ' ');

              return {
                title: title,
                link: link,
                description: description,
                pubDate: new Date(pubDate).toLocaleString(),
              };
            });

            // 把数据存到当前会话
            var blogsDataStr = JSON.stringify(blogsList);
            sessionStorage.setItem('local-blogs-data', blogsDataStr);

            res(blogsList);
          },
          function(error) {
            rej(error);
          }
        );
      }
    });
  }

  /**
   * 筛选博客数据
   * @param {array} blogList 博客信息列表
   * @param {string} searchStr 搜索词
   * @returns {array} 陪陪搜索词的博客信息列表
   */
  function findMathchBlog(blogList, searchStr) {
    if (!searchStr) {
      return [];
    }

    var searchResults = blogList
      .filter(function(item) {
        return item.description.search(new RegExp(searchStr)) > -1;
      })
      .map(function(item) {
        var matchIndex = item.description.search(new RegExp(searchStr));
        item.desc =
          '... ' +
          item.description
            .substr(matchIndex < 8 ? 0 : matchIndex - 8, 20)
            .replace(new RegExp(searchStr), '<strong>' + searchStr + '</strong>');
        return item;
      });

    return searchResults || [];
  }
});
