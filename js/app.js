'use strict'

var API_URL = "http://localhost:8080/"

var app = app || {};

var Meeting = function(data) {
    this.title = m.prop(data.Title)
    this.date = m.prop(data.Date)
    this.image = m.prop(data.Image)
    this.information = m.prop(data.Information)
}

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
    list: function() {
        return m.request({
            method: "GET", 
            url: API_URL + "meetings", 
            unwrapSuccess: function (response) {
                return response.meetings
            },
            type: Meeting,
        })
    },
    vm: {
        init: function() {
            this.meetings = new meetings.list()
        }
    },
    controller: function() {
        meetings.vm.init()
    },
    view: function() {
        var meets = meetings.vm.meetings().map(function(meet) {
            return [
                m('h1', meet.title()),
                m('p', dateToString(new Date(meet.date() * 1000))),
                m('information', meet.information())
            ]
        })
        return m('div', [
            m('h1', "Møter"),
            meets
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

var dateToString = function(date) {
    var local = new Date(date);
    local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
}


m.route.mode = 'hash'
m.route(document.getElementById('right'), '/', {
    '/': home,
    '/bilder': pictures,
    '/moter': meetings,
    '/informasjon': information,
    '/kontaktoss': contact
})
