var $ = require('../vendor/jquery.js');

var pageUrl = window.location.href;
var title = 'The Weinstein allegations – a list';

module.exports =  {
    init: function() {
        this.setLinks();
    },

    setLinks: function() {
        $('.wein-share__button--twitter .wein-share__link').attr('href', this.getTwitterLink());
        $('.wein-share__button--facebook .wein-share__link').attr('href', this.getFacebookLink());
        $('.wein-share__button--email .wein-share__link').attr('href', this.getEmailLink());
    },

    getTwitterLink: function(id) {
        return 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(title) + 
                '&url=' + encodeURIComponent(pageUrl + (id ? '#' + id : '') + '?CMP=share_btn_tw');
    },

    getFacebookLink: function(id) {
        return 'https://www.facebook.com/dialog/share?app_id=180444840287&href=' + encodeURIComponent(pageUrl + '?CMP=share_btn_fb');
    },

    getEmailLink: function(id) {
        return 'mailto:?subject=' + encodeURIComponent(title) +
                '&body=' + encodeURIComponent(pageUrl + '?CMP=share_btn_link');
    }
};