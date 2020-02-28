// https://github.com/ghiculescu/jekyll-table-of-contents
(function($) {
  $.fn.toc = function(options) {
    var defaults = {
        noBackToTopLinks: false,
        title: '<i>Content 目录</i>',
        minimumHeaders: 3,
        headers: 'h1, h2, h3, h4, h5, h6',
        listType: 'ol', // values: [ol|ul]
        showEffect: 'show', // values: [show|slideDown|fadeIn|none]
        showSpeed: 'slow', // set to 0 to deactivate effect
        classes: {
          list: '',
          item: '',
        },
        wrapDomSelector: '.post-container', // 要生成目录的内容dom结构选择器
      },
      settings = $.extend(defaults, options);

    function fixedEncodeURIComponent(str) {
      return decodeURIComponent(str).replace(/[!'()*]/g, function(c) {
        return '%' + c.charCodeAt(0).toString(16);
      });
    }

    function createLink(header) {
      var innerText =
        header.textContent === undefined ? header.innerText : header.textContent;
      return (
        "<a href='#" + fixedEncodeURIComponent(header.id) + "'>" + innerText + '</a>'
      );
    }

    var headers = $(settings.headers, $(settings.wrapDomSelector)).filter(function() {
        // get all headers with an ID
        var previousSiblingName = $(this)
          .prev()
          .attr('name');
        if (!this.id && previousSiblingName) {
          this.id = $(this).attr('id', previousSiblingName.replace(/\./g, '-'));
        }
        return this.id;
      }),
      output = $(this);

    if (!headers.length || headers.length < settings.minimumHeaders || !output.length) {
      $(this).hide();
      return;
    }

    if (0 === settings.showSpeed) {
      settings.showEffect = 'none';
    }

    var render = {
      show: function() {
        output
          .hide()
          .html(html)
          .show(settings.showSpeed);
      },
      slideDown: function() {
        output
          .hide()
          .html(html)
          .slideDown(settings.showSpeed);
      },
      fadeIn: function() {
        output
          .hide()
          .html(html)
          .fadeIn(settings.showSpeed);
      },
      none: function() {
        output.html(html);
      },
    };

    var get_level = function(ele) {
      return parseInt(ele.nodeName.replace('H', ''), 10);
    };
    var highest_level = headers
      .map(function(_, ele) {
        return get_level(ele);
      })
      .get()
      .sort()[0];
    var return_to_top = '<i class="icon-arrow-up back-to-top"> </i>';

    var level = get_level(headers[0]),
      this_level,
      html =
        settings.title +
        ' <' +
        settings.listType +
        ' class="' +
        settings.classes.list +
        '">';
    headers
      .on('click', function() {
        if (!settings.noBackToTopLinks) {
          window.location.hash = this.id;
        }
      })
      .addClass('clickable-header')
      .each(function(_, header) {
        this_level = get_level(header);
        if (!settings.noBackToTopLinks && this_level === highest_level) {
          $(header)
            .addClass('top-level-header')
            .after(return_to_top);
        }
        if (this_level === level)
          // same level as before; same indenting
          html += '<li class="' + settings.classes.item + '">' + createLink(header);
        else if (this_level <= level) {
          // higher level than before; end parent ol
          for (var i = this_level; i < level; i++) {
            html += '</li></' + settings.listType + '>';
          }
          html += '<li class="' + settings.classes.item + '">' + createLink(header);
        } else if (this_level > level) {
          // lower level than before; expand the previous to contain a ol
          for (i = this_level; i > level; i--) {
            html +=
              '<' +
              settings.listType +
              ' class="' +
              settings.classes.list +
              '">' +
              '<li class="' +
              settings.classes.item +
              '">';
          }
          html += createLink(header);
        }
        level = this_level; // update for the next one
      });
    html += '</' + settings.listType + '>';
    if (!settings.noBackToTopLinks) {
      $(document).on('click', '.back-to-top', function() {
        $(window).scrollTop(0);
        window.location.hash = '';
      });
    }

    render[settings.showEffect]();
  };
})(jQuery);

/**
 * 给目录增加滚动吸顶效果
 * 使用.Xuer-slide-content类进行定位
 */
$(document).ready(function() {
  $('#toc').toc({
    listType: 'ul',
    wrapDomSelector: '.post-container',
  });

  // 给目录增加滚动吸顶效果
  // 使用.Xuer-slide-content类进行定位
  $(window).scroll(function() {
    var slideTop = $('.Xuer-slide-content').offset().top;
    var bodySrollTop = $(document).scrollTop();

    // 滚动距离大于元素距离，吸顶固定
    if (bodySrollTop > slideTop) {
      $('#toc').addClass('fixed');
    }
    // 滚动距离小于元素距离，在回到原来文档位置
    else {
      $('#toc').removeClass('fixed');
    }

    // 页面滚动，目录也随着改变到当前索引
    var contentLinks = $('#toc a'); // 获取所有目录链接
    var winHeight = $(window).height();
    var currentTop;

    for (var i = 0, len = contentLinks.length; i < len; i++) {
      currentTop = $(decodeURIComponent(contentLinks[i].hash)).offset().top;
      if (currentTop > bodySrollTop && currentTop < bodySrollTop + winHeight) {
        $('#toc a').removeClass('current');
        $(contentLinks[i]).addClass('current');
        break;
      }
    }
  });

  // 点击目录跳转锚点，平滑滚动
  $('#toc a').click(function() {
    $('html').animate(
      { scrollTop: $(decodeURIComponent($(this).attr('href'))).offset().top - 20 },
      500
    );
    setTimeout(
      function() {
        $('#toc a').removeClass('current');
        $(this).addClass('current');
      }.bind(this),
      600
    );
  });
});
