"use strict";

define("forum/widgets/dtpen/output", [], function () {
    const id = ajaxify.data.id;
    const OUTPUT = {
        STORAGE_KEYS: ['dtpen_html', 'dtpen_css', 'dtpen_js'].map(elem => elem.split('_').join(`_${id}_`))
    };
    const Logger = new ConsoleLogger('DTPEN-OUTPUT');

    /**
     * Initialize the OUTPUT.
     */
    OUTPUT.init = async function () {
        let shadow = $('#output')[0].attachShadow({ mode: 'open' });
        this.dom = shadow;
        this.dom.innerHTML = this.elem();
        this.previewer = this.dom.querySelector('#dtpen-output');
        // OUTPUT.previewer = this.dom.querySelector('#dtpen-output');
        this.events();

    }

    OUTPUT.elem = function () {
        return `<div id="dtpen-output"  style="height:100%;padding: 10px;border-left: 5px solid #ccc;"></div>`;
    }

    OUTPUT.events = function () {

        // storage event
        $(window).on('storage', function (e) {
            let key = e.originalEvent.key;
            if (OUTPUT.STORAGE_KEYS.includes(key)) {
                OUTPUT.draft(e.originalEvent);
                OUTPUT.render();
            }


        });

        OUTPUT.render();
    }

    OUTPUT.render = function () {
        let html = JSON.parse(localStorage.getItem('dtpen_' + id + '_html'));
        let css = JSON.parse(localStorage.getItem('dtpen_' + id + '_css'));
        let js = JSON.parse(localStorage.getItem('dtpen_' + id + '_js'));
        Logger.log('html :', html)
        Logger.log('a',utils.decodeHTMLEntities(html.content))
        if(html)
        this.previewer.innerHTML = utils.decodeHTMLEntities(html.content);

        this.previewer.innerHTML += `<style> 
         *{
            white-space: initial;
         }
         ${css ? utils.decodeHTMLEntities(css.content) : ''}
        </style>`;

        try {
            if(js)
            this.previewer.innerHTML += `<script>${eval(utils.decodeHTMLEntities(js.content))}</script>`;
        } catch (e) { 
            Logger.log('error :', e)
        }
    }

    OUTPUT.draft = function (originalEvent) {

        let oldKey = `${originalEvent.key}_old`;
        localStorage.setItem(oldKey, JSON.stringify({
            timestamp: new Date(Date.now()).toISOString(),
            key: oldKey,
            value: originalEvent.oldValue
        }));

    }
    return OUTPUT;

});
