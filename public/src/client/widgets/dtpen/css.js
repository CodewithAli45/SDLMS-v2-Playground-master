"use strict";

define("forum/widgets/dtpen/css", [], function () {
    const { id } = ajaxify.data;
    const CSS = {
        STORAGE_KEY: ['dtpen_', id, '_css'].join('')
    };
    const Logger = new ConsoleLogger('DTPEN-CSS');



    /**
     * Initialize the CSS.
     */
    CSS.init = async function () {
        Logger.log('init');
        // const {id} = ajaxify.data;
        // CSS.STORAGE_KEY = ['dtpen_', id, '_css'].join('');

        let shadow = $('#css')[0].attachShadow({ mode: 'open' });
        this.dom = shadow;
        this.dom.innerHTML = this.elem();
        this.editor = this.dom.querySelector('#dtpen-output');

        this.events();
    }

    CSS.events = function () {
        this.editor.addEventListener('input', function (e) {
            CSS.write(e.target.innerHTML);
        });
        $('#format').on('click', function () {
            CSS.format();
        });

        CSS.draft();
        CSS.format();
    }

    CSS.elem = function () {
        return `<div id="dtpen-output" contenteditable="true"  style="height:100%;padding: 10px;border-left: 5px solid #ccc;white-space: pre-wrap;overflow: auto;">Write CSS here...</div>`;
    }
    CSS.write = function (css) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify({ updatedAt: new Date(Date.now()).toISOString(), content: css }));
    }

    CSS.draft = function () {
        let css = JSON.parse(localStorage.getItem(this.STORAGE_KEY));

        if (css) {
            this.editor.innerHTML = utils.escapeHTML(css.content);
        } else {
            this.editor.innerHTML = 'Write CSS code here';
        }
    }


    CSS.format = async function () {
        Logger.log('format');
        let css = JSON.parse(localStorage.getItem(this.STORAGE_KEY));
        if (css.content !== "") {
            app.formatCode(utils.decodeHTMLEntities(css.content), 'css', (err, formatted) => {
                Logger.log(err, formatted);
                this.editor.innerHTML = utils.escapeHTML(formatted);
            });
        }
    }



    return CSS;

});
