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
    next: function() {
        return m.request({
            method: "GET", 
            url: API_URL + "next", 
            //unwrapSuccess: function (response) {
            //    return response.meetings
            //},
            type: Meeting,
        })
    },
    vm: {
        init: function() {
            this.meetings = new home.next()
        }
    },
    controller: function() {
        home.vm.init()
    },
    view: function() {
        var meet = home.vm.meetings()
        return m('div', [
            m('h1', "Velkommen til oss!"),
            m('p',"Gården ligger i idylliske omgivelser i Tjølling, ned mot Viksfjord. Her leier vi ut lekre selskapslokaler med mange fasiliteter."),
            m('p',"Perfekt til Bryllup, Jubileum, konfirmasjoner, barnedåp, Julebord ol, eller møter og konferanser av ulik art. Kontakt oss for tilbud."),
            m('p',"I ”fjøset” kan man dekke til 68 personer. Det finnes både musikkanlegg (Sonos) og flere TV-skjermer, slik at man kan plugge inn sin egen PC eller mobil, for musikk, filmer eller Lysbildeshow. I tilknytning er det salonger med bar, scene etc. Fremkommelighet for alle. "),
            m('p',"Stort kjøkken med alt utstyr en kokk kan ønske seg. Vi kan formidler kontakt til profesjonelle kokker og catering. Det kan lages mat på stedet i flott storkjøkken med alle fasiliteter."),
            m('p',"Oppe på låven er det litt ”røffere” stil. Benker og bord til ca 120 personer. Her er det også Bar og scene."),
            m('p', "Det er rikelig med parkering."),
            //m('h1', meet.title()),
            //m('p', dateToString(new Date(meet.date() * 1000))),
            //m('information', meet.information())
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

var equipment = {
    controller: function() {},
    view: function() {
        return m('div', [
            m('h1', "Utstyr"),
            m('div', {}, [
                m('h3', {class: "padding-vertical"}, "Dekketøy"),
                m('ul', [
                    m('li', ""),
                ]),
            ]),
            m('div', {}, [
                m('h3', {class: "padding-vertical"}, "Teknisk"),
                m('ul', [
                    m('li', "Stereo anlegg"),
                    m('li', "Trådløsmusikk avspilling"),
                    m('li', "TV"),
                    m('li', ""),
                    m('li', ""),
                ]),
                m('p', {class: "padding-vertical"},
                  "Selskapslokelene er utstyrt med høytaleranlegg som trådløst styres gjennom en Sonos app. Leietagere kan enkelt ta med en smarttelefon eller laptop og spille musikk fra denne."
                 ),
                m('p',
                  "I spiseområdet er det også utstyrt med TVer som kan brukes til visning av film eller bilder."
                 ),
            ]),
            m('div', {}, [
                m('h3', {class: "padding-vertical"}, "Annet"),
                m('ul', [
                    m('li', ""),
                ]),
            ])
        ])
    }
}

var contact = {
    controller: function() {},
    view: function() {
        return m('div', [
            m('h1', "Kontakt informasjon"),
            m('div', {}, [
                m('h4', "Kristine Breiland Dalby"),
                m('h4', "90 91 98 12"),
                m('h4', "kristine@klatrerosen.no"),
                m('h4', "Østbyveien 75"),
                m('h4', "3280 Tjodalyng"),
            ]),
            m('iframe', {
                width: "600px", 
                height: "450px", 
                frameborder: "0", 
                style: "border:0", 
                src: "https://www.google.com/maps/embed/v1/place?q=%C3%98stbyveien%2075%2C%20Tjodalyng%2C%20Norway&key=AIzaSyCn1POUaVcRMs5y4lL73XkrfOAI8B5DotI"
            }, "")
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
    '/utstyr': equipment,
    '/kontaktoss': contact
})
