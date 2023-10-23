"use strict";

define("forum/widgets/dtpen/js", [], function () {
    const { id } = ajaxify.data;
    const JS = {
        STORAGE_KEY: ['dtpen_', id, '_js'].join(''),
        editor: null
    };
    const Logger = new ConsoleLogger('DTPEN-JS');



    /**
     * Initialize the JS.
     */
    JS.init = async function () {
        Logger.log('init');
        // const { id } = ajaxify.data;

        // JS.STORAGE_KEY = ['dtpen_', id, '_js'].join('');

        let shadow = $('#js')[0].attachShadow({ mode: 'open' });
        this.dom = shadow;
        this.dom.innerHTML = this.elem();
        this.editor = this.dom.querySelector('#dtpen-output');
        this.events();


    }

    JS.draft = function () {
        let js = JSON.parse(localStorage.getItem(this.STORAGE_KEY));
        if (js) {
            this.editor.innerHTML = utils.escapeHTML(js.content);
        } else {
            this.editor.innerHTML = 'Write JS code here';
        }
    }
    JS.formatError = function (err) {
        let error = err.message;
        let line = error.match(/line (\d+)/);
        let column = error.match(/column (\d+)/);
        let message = error.match(/(.*)\n/);
        message = message ? message : error.match(/(.*)/);
        let prity = '';
        try {
            prity = `<div style="color:red;">${message[1]}</div>`;
            if (line && column) {
                prity += `<div style="color:blue;">line ${line[1]} column ${column[1]}</div>`;
            }
        } catch (error) {
            prity = `<div style="color:red;">${error.message}</div>`;
        }

        return prity;
    }

    JS.events = function () {
        this.editor.addEventListener('input', function (e) {
            $('#errors').html('');
            try {
                let js = e.target.innerHTML;
                eval(js);
                JS.write(js);
            } catch (error) {
                Logger.log(JSON.stringify(error, null, 2));
                $('#errors').html(JS.formatError(error))
            }
        });

        $('#format').on('click', function () {
            JS.format();
        });

        JS.draft();
        JS.format();
    }

    JS.elem = function () {
        return `<div id="dtpen-output" contenteditable="true"  style="height:100%;padding: 10px;border-left: 5px solid #ccc;white-space: pre-wrap;overflow: auto;">Write JS here...</div>`;
    }

    JS.write = function (js) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify({ updatedAt: new Date(Date.now()).toISOString(), content: js }));
    }

    JS.format = async function () {
        Logger.log('format');
        let js = JSON.parse(localStorage.getItem(this.STORAGE_KEY));
        if (js.content !== "") {
            app.formatCode(utils.decodeHTMLEntities(js.content), 'js', (err, formatted) => {
                Logger.log(err, formatted);
                this.editor.innerHTML = utils.escapeHTML(formatted);
            });
        }

    }


    return JS;

});
