jQuery('input[type="email"]').on('keyup', function() {
    imh_check_email()
});
jQuery('body form').on('click', function() {
    imh_check_email()
});

function imh_check_email() {
    jQuery('div.mce_inline_error').remove();
    var arr = ['@gmail.', '@hotmail.', '@yahoo.', '@yandex.', '@me.', '@icloud.', '@msn.', '@live.', '@ive.', '@mail.', '@email.', '@outlook.', '@aol.'];
    var mailchimp_input = jQuery('.mc-field-group input[type="email"]'),
        popup_leads_input = jQuery('#popup_leads input[type="email"]'),
        email = mailchimp_input.val();
    if (email == '' || email == undefined)
        email = popup_leads_input.val();
    if (email == '' || email == undefined)
        email = jQuery('input[type="email"]').val();
    if (!jQuery(mailchimp_input).parents('.influencer_form').length)
        for (var e of arr) {
            if (email != undefined && email.includes(e)) {
                jQuery('<div for="mce-EMAIL" class="mce_inline_error">Please use your work email.</div>').insertAfter(mailchimp_input);
                jQuery('<div class="mce_inline_error">Please use your work email.</div>').insertAfter(popup_leads_input);
                jQuery('.wpcf7-response-output').addClass('wpcf7-validation-errors').css('display', 'block').html('Please use your work email.');
                jQuery('#mc-embedded-subscribe, #popup_leads .next_step, .wpcf7-form input[type="submit"]').prop('disabled', !0);
                break
            } else {
                jQuery('.wpcf7-response-output').css('display', 'none');
                jQuery('#mc-embedded-subscribe, #popup_leads .next_step, .wpcf7-form input[type="submit"]').prop('disabled', !1)
            }
        }
}
jQuery(document).ready(function() {
    if (jQuery('body').hasClass('page-id-2149')) {
        mixpanel.track("IMH newsletter subscribed");
        ga('send', 'event', 'IMH newsletter subscribed')
    }
    if (jQuery('body').hasClass('page-id-737')) {
        jQuery(".disabled_option option:first-of-type").attr("disabled", "disabled")
    }
    // jQuery('body').find('#sidr-main .sidr-inner').append('<div class="mobile_follower"><p>Follow us</p><div class="menu_social"><a href="https://twitter.com/influencerMH"><img src="' + theme_url + '/img/mobile_icon/twitter.png"></a><a href="https://www.facebook.com/influencermarketinghub/"><img src="' + theme_url + '/img/mobile_icon/facebook.png"></a><a href="https://www.linkedin.com/company/influencer-marketing-hub/"><img src="' + theme_url + '/img/mobile_icon/linkedin.png"></a><a href="https://www.instagram.com/influencermh/"><img src="' + theme_url + '/img/mobile_icon/insta.png"></a></div>');
    initScrollSpy()
});

function imhDetectCountry() {
    var imh_detected_country = 0;
    if (document.cookie.indexOf('imh_detected_country') > -1)
        imh_detected_country = jQuery.cookie('imh_detected_country');
    else jQuery.ajax({
        type: "post",
        url: ajaxurl,
        async: !1,
        cache: !1,
        data: {
            action: 'detect_country_ajax'
        },
        success: function(detected_country) {
            var date = new Date();
            date.setTime(date.getTime() + 432000000);
            document.cookie = 'imh_detected_country=' + detected_country + '; expires=' + date.toGMTString() + '; path=/';
            imh_detected_country = detected_country;
            imhExCountriesActions(imh_detected_country)
        },
        error: function(xhr, ajaxOptions, thrownError) {
            console.log(xhr.responseText)
        }
    });
    return imh_detected_country
}
if (!jQuery('body.single article').hasClass('category-influencermarketing')) {
    var imhDetectedCountry = imhDetectCountry();
    imhExCountriesActions(imhDetectedCountry)
}

function imhExCountriesActions(imhDetectedCountry) {
    if ((typeof excluded_countries !== 'undefined' && excluded_countries.includes(imhDetectedCountry)) || (typeof global_excluded_countries !== 'undefined' && global_excluded_countries.includes(imhDetectedCountry)))
        jQuery('.link a, .address a').hide()
}
var sections = [],
    current, topOf, clone;

function initScrollSpy() {
    topOf = jQuery('#toc-spy');
    if (topOf.length <= 0) return;
    clone = topOf.clone(!0);
    jQuery(clone).addClass('d-none stiky');
    clone[0].insertAdjacentHTML('afterbegin', '<div class="toc-title">index</div>');
    topOf.removeAttr('id');
    var in_main = document.createElement('div');
    in_main.classList.add('spier-block');
    in_main.append(clone[0]);
    document.querySelector('main').insertAdjacentElement('afterbegin', in_main);
    document.querySelector('main').classList.add('spier');
    items = jQuery(clone).find('li');
    scrollSpy();
    jQuery(window).scroll(function() {
        scrollSpy();
        isStikyScroll()
    })
}
var pos = undefined,
    items = [],
    to_show = 3;

function isStikyScroll() {
    if (!pos)
        pos = topOf.offset().top + (topOf.height() / 2)
    if (pos <= jQuery(window).scrollTop())
        clone.removeClass('d-none');
    if ((pos) > jQuery(window).scrollTop())
        clone.addClass('d-none')
}

function scrollSpy() {
    jQuery('#toc-spy').find('.toc_item').each(function() {
        sections.push(this.querySelector('a').getAttribute('href'))
    });
    for (var i = 0; i < sections.length; i++) {
        if ((jQuery(sections[i]).offset().top - 150) <= jQuery(window).scrollTop()) {
            current = sections[i]
        }
    }
    if ((jQuery(sections[0]).offset().top - 170) > jQuery(window).scrollTop()) {
        current = sections[0];
        jQuery(".toc.stiky a").removeClass('active')
    } else {
        jQuery(".toc.stiky a[href='" + current + "']").addClass('active');
        jQuery(".toc.stiky a").not("a[href='" + current + "']").removeClass('active')
    }
    var ind = items.index(jQuery(".toc.stiky a[href='" + current + "']").parents('li'));
    var min = ind - to_show,
        max = ind + to_show + 3;
    if (min < 0)
        min = 0;
    if (max > items.length - 1)
        max = items.length - 1;
    items.removeClass('show');
    items.each(function() {
        if (items.index(jQuery(this)) >= min && items.index(jQuery(this)) <= max) {
            jQuery(this).addClass('show')
        }
    });
    var mt = 0;
    if (ind == 0)
        mt = jQuery(items[1]).height() + jQuery(items[2]).height() + jQuery(items[3]).height();
    if (ind == 1)
        mt = jQuery(items[1]).height() + jQuery(items[2]).height();
    if (ind == 2)
        mt = jQuery(items[1]).height();
    if (ind == 3)
        mt = 0;
    jQuery(items[0]).css({
        'margin-top': mt + 'px',
    })
}
jQuery("body").change(function() {
    setTimeout(imhNewsletter, 3000)
});

function imhNewsletter() {
    if (jQuery('#yikes-mailchimp-container-3 p.yikes-easy-mc-hidden').hasClass('yikes-easy-mc-success-message')) {
        mixpanel.track("IMH newsletter subscribed");
        ga('send', 'event', 'IMH newsletter subscribed');
        console.log('mixpanel and GA "IMH newsletter subscribed" were sent!')
    }
}
jQuery('#mc-embedded-subscribe-form').submit(function() {
    var title = jQuery('.headline').html(),
        attr = jQuery(this).attr('attr-id'),
        $this = jQuery(this),
        mailchimp_input = jQuery('.mc-field-group input[type="email"]');
    if (attr == 'creatoriq') {
        title = 'Influencer Marketing Benchmark Report 2020';
        fbq('track', 'CreatorIQ Enquire Event')
    }
    setTimeout(function() {
        if (!jQuery(mailchimp_input).parents('.influencer_form').length) {
            if (jQuery('#mce-success-response').css('display') == 'block') {
                if ($this.hasClass('subscrForm'))
                    var url = "https://influencermarketinghub.com/thank-you-for-subscribing/";
                else if ($this.hasClass('neoreach'))
                    var url = "https://influencermarketinghub.com/thank-you-for-subscribing/?show_id=2139";
                else var url = "https://influencermarketinghub.com/ebook-subscribe-success/";
                ga('send', 'event', 'eBook Download', 'download', title);
                window.location.href = url
            }
        } else jQuery('#ipopup').hide()
    }, 2000)
});

function track_event(event, mix = !0, goa = !0) {
    if (mix)
        mixpanel.track(event);
    if (goa)
        ga('send', 'event', event)
}
jQuery('.post-3143 .head .address a').click(function() {
    mixpanel.track("Shane Barker Consulting website visit")
});

function imh_mixpanel_track(event) {
    var cook = event.replace(/\s+/g, '_').toLowerCase();
    var cur = jQuery.cookie(cook);
    if (!cur) {
        var date = new Date();
        date.setTime(date.getTime() + (30 * 24 * 60 * 60 * 1000));
        document.cookie = cook + '=1; expires=' + date.toGMTString() + '; path=/';
        mixpanel.track(event);
        ga('send', 'event', 'site', 'visit', event)
    }
}
var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = !1
};
TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];
    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1)
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1)
    }
    this.el.innerHTML = '<span class="write-text">' + this.txt + '</span>';
    var that = this;
    var delta = 200 - Math.random() * 100;
    if (i != 3) {
        if (this.isDeleting) {
            delta /= 2
        }
        if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = !0
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = !1;
            this.loopNum++;
            delta = 500
        }
        if (this.txt == "Brands") {
            return !1
        }
    }
    setTimeout(function() {
        that.tick()
    }, delta)
};
jQuery("#ppc_login_form_page").submit(function(event) {
    var login = jQuery(this).find('input[name="login"]').val();
    var pass = jQuery(this).find('input[name="pass"]').val();
    document.cookie = 'imh_ppc_id=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
    document.cookie = 'imh_ppc_passwd=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
    jQuery.ajax({
        url: ajaxurl,
        type: 'post',
        data: {
            action: 'ppc_login_ajax',
            login: login,
            pass: pass
        },
        success: function(response) {
            response = response.slice(0, -1);
            response = JSON.parse(response);
            var id = response.id;
            var date = new Date();
            date.setTime(date.getTime() + (30 * 24 * 60 * 60 * 1000));
            document.cookie = 'imh_ppc_id=' + id + ';expires=' + date.toGMTString() + ';path=/;';
            document.cookie = 'imh_ppc_passwd=' + pass + ';expires=' + date.toGMTString() + ';path=/;';
            window.location = response.url
        },
        error: function(xhr, ajaxOptions, thrownError) {
            console.log(thrownError)
        }
    });
    event.preventDefault()
});
jQuery('#ppc_restore_password').click(function() {
    jQuery("#ppc_login_form_page").animate({
        opacity: 0.25,
        left: "+=50",
        height: "toggle"
    }, 1000, function() {
        jQuery('#ppc_restore_password').fadeOut();
        jQuery("#ppc_restore_password_form").animate({
            left: "+=50",
            height: "toggle"
        }, 1000)
    })
});
jQuery("#ppc_restore_password_form").submit(function(event) {
    var login = jQuery(this).find('input[name="login"]').val();
    jQuery.ajax({
        url: ajaxurl,
        type: 'post',
        data: {
            action: 'ppc_restore_passwd_ajax',
            login: login
        },
        success: function(response) {
            if (response == 'yes0')
                jQuery('.result').html('Password has been sent to your email.');
            jQuery('#ppc_back_to_login').fadeIn();
            if (response == 'no0')
                jQuery('.result').html("Sorry, we didn't find this email in our database.")
        },
        error: function(xhr, ajaxOptions, thrownError) {
            console.log(thrownError)
        }
    });
    event.preventDefault()
});
jQuery(document).ready(function() {
    if (jQuery('body').hasClass("postid-5157")) {
        jQuery('.sort .sort_item').each(function() {
            var item = jQuery(this).index(),
                video_id = jQuery(this).attr("data-videoid"),
                workitem = jQuery(this);
            jQuery.getJSON("https://www.googleapis.com/youtube/v3/videos?part=statistics&id=" + video_id + "&key=" + youtube_keys[Math.floor(Math.random() * youtube_keys.length)], function(data) {
                var viewCount = data.items[0].statistics.viewCount;
                workitem.attr("data-viewcount", viewCount);
                workitem.find("h2").append("<span style='font-size: 18px;line-height: 16px;color: #a1a7b0;'> (" + numberWithCommas(viewCount, !1) + " views)</span>");
                item = item + 1;
                jQuery(".toc_list ul li:nth-child(" + item + ")").append("<span style='font-size: 12px;line-height: 16px;color: #a1a7b0;'> (" + numberWithCommas(viewCount, !1) + " views)</span>")
            })
        })
    }
    if (jQuery('body').hasClass("postid-5604")) {
        var user_array = ['summit1g', 'riotgames', 'syndicate', 'shroud', 'esl_csgo', 'imaqtpie', 'nightblue3', 'lirik', 'ninja', 'drdisrespectlive', 'sodapoppin', 'eleaguetv', 'timthetatman', 'loltyler1', 'dyrus', 'tsm_bjergsen', 'joshog', 'phantoml0rd', 'gosu', 'castro_1021'];
        user_array.forEach(function(item, i, arr) {
            jQuery.getJSON("https://api.twitch.tv/kraken/channels/" + item + "?client_id=km60mooofhuif0b8f78911eex29525", function(data) {
                if (data.status == 422) {
                    console.log("error")
                } else {
                    i++;
                    jQuery(".toc_list ul li:nth-child(" + i + ")").append("<span style='font-size: 12px;line-height: 16px;color: #a1a7b0;'> (" + numberWithCommas(data.followers) + " followers)</span>")
                }
            })
        })
    }
    if (jQuery('body').hasClass("postid-7701")) {
        var user_array = ['kittyplays', 'legendarylea', 'kaceytron', 'xminks', 'dinglederper', 'miss_rage', 'ms_vixen', 'katgunn', 'loserfruit', 'itshafu', 'kneecoleslaw', 'dizzykitten', 'becca', '2mgovercsquared', 'omgitsfirefoxx'];
        user_array.forEach(function(item, i, arr) {
            jQuery.getJSON("https://api.twitch.tv/kraken/channels/" + item + "?client_id=km60mooofhuif0b8f78911eex29525", function(data) {
                if (data.status == 422) {
                    console.log("error")
                } else {
                    i++;
                    jQuery(".toc_list ul li:nth-child(" + i + ")").append("<span style='font-size: 12px;line-height: 16px;color: #a1a7b0;'> (" + numberWithCommas(data.followers) + " followers)</span>")
                }
            })
        })
    }
    if (jQuery('body').hasClass("postid-6677")) {
        jQuery.ajax({
            url: ajaxurl,
            type: 'post',
            data: {
                action: 'get_pinterest_data',
            },
            success: function(response) {
                var obj = JSON.parse(response);
                var i = 1;
                jQuery.each(obj, function(key, value) {
                    i++;
                    if (value == 'null') {
                        jQuery(".toc_list ul li:nth-child(" + i + ")").append("<span style='font-size: 12px;line-height: 16px;color: #a1a7b0;'> (no data)</span>")
                    } else {
                        jQuery(".toc_list ul li:nth-child(" + i + ")").append("<span style='font-size: 12px;line-height: 16px;color: #a1a7b0;'> (" + numberWithCommas(value) + " followers)</span>")
                    }
                })
            },
            error: function(xhr, ajaxOptions, thrownError) {
                console.log(thrownError)
            }
        })
    }
});
jQuery(window).load(function() {
    del_href_mob_menu();
    var window_height = jQuery(window).height();
    var html_height = jQuery("#vce-main").height() + 212;
    if (window_height > html_height)
        jQuery("footer#footer").css({
            "position": "absolute",
            "bottom": "0"
        })
});

function numberWithCommas(x, round = !0) {
    if (round) {
        if (x / 1000000000 > 1)
            return Math.round(x / 1000000000).toString().replace(/\B(?=(\d{3}))/, ",") + "B";
        else if (x / 1000000 > 1)
            return Math.round(x / 1000000).toString().replace(/\B(?=(\d{3}))/, ",") + "M";
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    } else return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}
// jQuery(document).ready(function() {
//     var ad_post_array = [];
//     jQuery('.imh_google_ad').each(function() {
//         var ad_post_id = jQuery(this).attr('attr-post');
//         ad_post_array.push(ad_post_id)
//     });
//     jQuery.ajax({
//         url: ajaxurl,
//         type: 'post',
//         data: {
//             action: 'google_ad_shortcode_content',
//             id: ad_post_array,
//         },
//         success: function(response) {
//             var obj = jQuery.parseJSON(response);
//             var i = 0;
//             jQuery('.imh_google_ad').each(function() {
//                 jQuery(this).html(obj[i]);
//                 i++
//             })
//         },
//         error: function(xhr, ajaxOptions, thrownError) {
//             console.log(thrownError)
//         }
//     })
// });
jQuery(".vce-responsive-nav").click(function(e) {
    e.preventDefault();
    if (jQuery(this).hasClass("nav-open")) {
        jQuery(this).find('svg path').attr("d", "M207.6 256l107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z")
    } else {
        jQuery(this).find('svg path').attr("d", 'M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z')
    }
    jQuery("#sidr-main").addClass("dont_click_menu");
    setTimeout(function() {
        jQuery("#sidr-main").removeClass("dont_click_menu")
    }, 800);
    var isSafari = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/);
    var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    if (isSafari || (isSafari && iOS))
        jQuery('body').toggleClass("sidr_menu_active")
});
jQuery("body.sidr_menu_active").click(function() {
    jQuery('body').removeClass("sidr_menu_active")
});
jQuery(".vce-responsive-nav").on("vclick", "p", function() {
    jQuery("#sidr-main").addClass("dont_click_menu");
    setTimeout(function() {
        jQuery("#sidr-main").removeClass("dont_click_menu")
    }, 800)
});

function show_popup() {
    jQuery("#pp_inva.popup").fadeIn()
}
jQuery("#pp_inva.popup .close, #pp_inva.popup .form .close").click(function() {
    jQuery("#pp_inva.popup").fadeOut()
});
window.onscroll = function() {
    progress_bar()
};

function progress_bar() {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop,
        height = document.documentElement.scrollHeight - document.documentElement.clientHeight,
        scrolled = (winScroll / height) * 100,
        element = document.getElementById("pr_bar");
    if (element)
        element.style.width = scrolled + "%"
}
window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type'),
            period = elements[i].getAttribute('data-period');
        if (toRotate)
            new TxtType(elements[i], JSON.parse(toRotate), period)
    }
    var first_page = jQuery.cookie('imh_first_page'),
        influencers_pages = [14193, 19303, 18457, 19680, 21914, 14524, 20200, 20494, 24254, 2007, 13495, 13700, 13731, 20279, 29508, 39762];
    if (influencers_pages.indexOf(parseInt(first_page)) != -1) {
        jQuery('#menu-item-1364, ' + '#menu-item-2721, ' + '#menu-item-7409, ' + '#nav_menu-3, ' + '.freebookLink.menu-item, ' + '.bottom_mob_menu ul li:nth-child(2), ' + '.bottom_mob_menu ul li:nth-child(3), ' + '.sidr .sidr-inner .sidr-class-nav-menu li:nth-of-type(2), ' + '.sidr .sidr-inner .sidr-class-nav-menu li:nth-of-type(3), ' + '.sidr .sidr-inner .sidr-class-nav-menu li:nth-of-type(4), ' + '.search-header-wrap, .sidr-class-search-header-wrap, ' + '.main-box-inside .filter-button').css('display', 'none');
        jQuery('.bottom_mob_menu ul li:nth-child(2)').css('display', 'block');
        jQuery('.nav-menu li:first-of-type').after('<li class="menu-item"><a href="https://influencermarketinghub.com/instagram-money-calculator/">Instagram Calculator</a></li>')
    }
};

function del_href_mob_menu() {
    let window_width = window.screen.width;
    if (window_width < 1026) {
        jQuery(".sidr-class-sub-menu").prev().attr('href', '#')
    }
}
jQuery(window).resize(function() {
    del_href_mob_menu()
})