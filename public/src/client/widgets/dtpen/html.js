"use strict";


define("forum/widgets/dtpen/html", [], function () {
    const { id } = ajaxify.data;

    const HTML = {
        STORAGE_KEY: ['dtpen_', id, '_html'].join('')
    };
    const Logger = new ConsoleLogger('DTPEN-HTML');

    Logger.log('id :', id)

    /**
     * Initialize the HTML.
     */
    HTML.init = async function () {
        // const {id} = ajaxify.data;

        // HTML.STORAGE_KEY = ['dtpen_', id, '_html'].join('');

        let shadow = $('#html')[0].attachShadow({ mode: 'open' });
        this.dom = shadow;
        this.dom.innerHTML = this.elem();
        this.editor = this.dom.querySelector('#dtpen-output');
        this.events();

    }

    HTML.write = function (html) {
        if (html.includes('<')) {
            html = utils.escapeHTML(html);
        }
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify({ updatedAt: new Date(Date.now()).toISOString(), content: html }));
    }

    HTML.events = function () {
        Logger.log('here :', this.editor)
        this.editor.addEventListener('input', function (e) {
            HTML.write(e.target.innerHTML);
        });

        $('#format').on('click', function () {
            HTML.format();
        });

        HTML.draft();
        if ($(this.editor).text().trim() !== '') {
            HTML.format();
        }

    }

    HTML.draft = function () {
        console.log('in draft')
        let html = JSON.parse(localStorage.getItem(this.STORAGE_KEY));
        console.log(this.STORAGE_KEY)
        Logger.log('here in draft', html)
        if (html.content) {
            this.editor.innerHTML = html.content
        } else {
            this.editor.innerHTML = 'Write html code here';
        }
    }

    HTML.elem = function () {
        return `<div id="dtpen-output" contenteditable="true"  style="height:100%;padding: 10px;border-left: 5px solid #ccc;white-space: pre-wrap;overflow: auto;">Write HTML here...</div>`;
    }

    HTML.format = async function () {

        let html = JSON.parse(localStorage.getItem(this.STORAGE_KEY));
        if (html.content !== "") {
            app.formatCode(utils.decodeHTMLEntities(html.content), 'html', (err, formatted) => {
                this.editor.innerHTML = utils.escapeHTML(formatted);
            });
        }

    }

    return HTML;

});
