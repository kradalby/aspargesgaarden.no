'use strict'

var app = app || {};

var home = {
    controller: function() {},
    view: function() {
        return m('div', [
            m('h1', "Velkommen til oss"),
        ])
    }
}

var pictures = {
    controller: function() {},
    view: function() {
        var img = []
        for (var n = 1; n < 8; n++) {
            img.push(m("img", {
                class: "thumb", 
                src:"img/" + n + ".jpg", 
                onclick: function(e){
                    var currentPreview = document.getElementById("preview")
                    currentPreview.src = this.src
                }
            }))
        }

        return m('div', 
                 m("img", {id: "preview", src:"img/1.jpg"}),
                 img
                )
    }
}

var meetings = {
    controller: function() {},
    view: function() {
        return m('div', [
            m('h1', "Møter"),
        ])
    }
}

var information = {
    controller: function() {},
    view: function() {
        return m('div', [
            m('h1', "Informasjon"),
        ])
    }
}

var contact = {
    controller: function() {},
    view: function() {
        return m('div', [
            m('h1', "Kontakt informasjon"),
        ])
    }
}

m.route.mode = 'hash'
m.route(document.getElementById('right'), '/', {
    '/': home,
    '/bilder': pictures,
    '/moter': meetings,
    '/informasjon': information,
    '/kontaktoss': contact
})
