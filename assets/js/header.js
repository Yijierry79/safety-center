$(function () {
    // 导航滚动隐藏方法
    handleScrollBehavior({
        headerSelector: '.header', //导航栏的CSS选择器
        hideClass: 'hideHeader', // 隐藏导航栏的CSS类
        hideThreshold: 50, //触发隐藏的滚动距离（像素）
        whiteClass: 'scrollHeader', //导航栏变白的CSS类
    });

    var windowW = $(window).width();
    var oindex = 0;


    if (!IsMo() && windowW > 1200) {
        //鼠标移入导航栏时展开
        $('.nav li').mouseenter(function () {

            oindex = $(this).index();
            $(this).addClass('hover').siblings().removeClass('hover');

            let $target = $('.nav-bg .nav-list').eq(oindex);
            if ($target.find('dl').length > 0) {

                let targetHeight = $target.outerHeight(true);
                $('.header .nav-bg').css({ 'height': targetHeight });

                $('.nav-bg .nav-list').not($target).removeClass('nav_show');
                if (!$target.hasClass('nav_show')) {
                    $target.addClass('nav_show');
                }

                $('.nav-submenu__cover').addClass('active');
            } else {
                $('.header .nav-bg').css({ 'height': '0vh' });
                $('.nav-bg .nav-list').removeClass('nav_show');
                $('.nav-submenu__cover').removeClass('active');
            }

        })
        // 鼠标移出导航栏时收起
        $('.header .nav_con').mouseleave(function () {
            $('.nav li').removeClass('hover');
            $('.header .nav-bg').css({ 'height': '0vh' });
            $('.nav-bg .nav-list').removeClass('nav_show');
            $('.nav-submenu__cover').removeClass('active');
        });

        //判断是否有 .img
        $('.nav-bg .nav-list').each(function (index) {
            if (!$(this).find('.img').length > 0) {
                $(this).addClass('has_no_img');
            }
        })
    }
    if (IsMo() || windowW < 1200) {

        $('.header .nav li').each(function () {
            if ($(this).find('.mo_nav .p').length) {
                $(this).addClass('has_two')
            } else {
                $(this).find('.mo_nav').remove();
            }
        })
        $('.header .nav .p').each(function () {
            if ($(this).find('.three_nav p').length) {
                $(this).addClass('has_three')
            } else {
                $(this).find('.three_nav').remove();
            }
        })

        $('.header .nav li .TWnavBtn').click(function (e) {
            e.stopPropagation();
            let $this = $(this).parents('li');
            $this.addClass('hover').siblings().removeClass('hover');

            $('.header .nav li').find('.mo_nav').stop().slideUp(500);
            
            if ($this.find('.mo_nav').length > 0) {
                if ($this.find('.mo_nav').css('display') == 'none') {
                    $this.find('.mo_nav').stop().slideDown(500);
                }else{
                    $this.removeClass('hover');
                }
            }
        });
        $('.header .nav .p .THnavBtn').click(function (e) {
            e.stopPropagation();
            let $this = $(this).parents('.p');
            $this.addClass('hover').siblings().removeClass('hover');

            $('.header .nav .p').find('.three_nav').stop().slideUp(500);

            if ($this.find('.three_nav').length > 0) {
                if ($this.find('.three_nav').css('display') == 'none') {
                    $this.find('.three_nav').stop().slideDown(500);
                }else{
                    $this.removeClass('hover');
                }
            }
        });
        $('.header .nav_con').click(function () {
            $('.header .nav li').removeClass('hover');
            $('.header .mo_nav').stop().slideUp(500);
            $('.header .three_nav').stop().slideUp(500);
        })

    }



    $('.nav_btn').click(function () {
        $(this).toggleClass('click');
        $('.header').toggleClass('bg');
        var toggN = $(this).parent().find('.nav_con');
        if (toggN.css('display') == 'none') {
            toggN.slideDown();
        } else {
            toggN.slideUp();
            $('.header .nav li').removeClass('hover');
            $('.header .mo_nav').stop().slideUp(500);
            $('.header .three_nav').stop().slideUp(500);
        }

    });


    //搜索
    var searchBox = $('.search-drop-down');
    $('.header .search').on('click', function () {
        searchBox.slideDown(500);
    });
    $('.search-drop-down #close').on('click', function () {
        searchBox.slideUp();
        searchBox.find('input').val('')
    });

    //输入框验证
    const searchInput = document.querySelector("#search");
    const errorMsg = document.querySelector(".errorMsg");

    // 清除危险字符
    function sanitizeInput(value) {
        // 包含: < > ' " ; -- ( ) { } [ ] % = +
        return value.replace(/[<>'"();{}[\]%=+]/g, "");
    }
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            const oldValue = e.target.value;
            const newValue = sanitizeInput(oldValue);

            if (oldValue !== newValue) {
                e.target.value = newValue;
                e.target.style.borderColor = "#d9534f"; // 红色边框
                errorMsg.classList.add("show");
            } else {
                e.target.style.borderColor = "#ffffff"; // 绿色边框
                errorMsg.classList.remove("show");
            }
        });
    }


})
