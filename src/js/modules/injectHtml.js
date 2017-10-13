var $ = require('../vendor/jquery.js');
var handlebars = require('handlebars');
var marked = require('marked');

var lastUpdated = require('../modules/lastUpdated.js');
var entry = require('../templates/entry.html');

var data;

module.exports =  {
    init: function() {
        this.initHandlebars();
        this.getJson();
    },

    initHandlebars: function() {
        handlebars.registerHelper('marked', function(string) {
            return marked(string);
        });
    },

    getJson: function() {
        $.getJSON('https://interactive.guim.co.uk/docsdata-test/1lgrxIvdoZ0vpTtyR7SGmZmzCj-Ka0X22OIbO4eTn2eI.json', function(response) {
            data = response.sheets;

            for (var i in data.Furniture) {
                data[data.Furniture[i].key] = data.Furniture[i].option;
            }

            for (var i in data.Entries) {
                data.Entries[i].image = this.getImageUrl(data.Entries[i].image);

                if (data.Entries[i].sourceUrl.substring(0, 4) !== 'http') {
                    console.log(data.Entries[i].sourceUrl.substring(0, 4));
                    data.Entries[i].sourceUrl = 'http://' + data.Entries[i].sourceUrl;
                }
            }

            delete data.Main;

            this.injectHtml();
        }.bind(this));
    },

    getImageUrl: function(url) {
        if (url) {
            var newUrl = url.replace('.gutools', '.guim').replace('/images', '').replace('?crop=', '/') + '/140.jpg';
        }
        return newUrl;
    },

    injectHtml: function() {
        this.addEntries();
        this.addTimestamp();
    },

    addTimestamp: function() {
        $('.wein-header__last-updated').text('Last Updated ' + lastUpdated.convert(data.lastUpdated));
    },

    addEntries: function() {
        var template = handlebars.compile(entry);
        $('.wein-entries .gs-container').html(template(data.Entries));
    }
};
