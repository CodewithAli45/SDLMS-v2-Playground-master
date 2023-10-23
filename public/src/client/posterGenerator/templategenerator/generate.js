'use strict';

// const { stringify } = require("../../../modules/helpers");

define('forum/posterGenerator/templategenerator/generate', ['api'], function (api) {
    var generate = {};
    const Logger = new ConsoleLogger('CANVAS');
    const data = ajaxify.data.template_data;
    let csvData;
    generate.init = () => {
        Logger.log("hello generate");
        generate.events()

    };
    generate.events = () => {
        $("body").on("click", "#back-button", function (e) {
            e.preventDefault();
            location.href = "/generator/list";
        })
        // function getValueByName(name, arr) {
        //     const element = arr.find(obj => obj.name === name);
        //     return element ? element.value : null;
        // }

        // $("body").on("click", "#postcanvas", function (e) {
        //     e.preventDefault()
        //     Logger.log($("#canvas-form").serializeArray())
        //     let data = $("#canvas-form").serializeArray()
        //     $("#canvas-form").remove()
        //     console.log(data)
        //     let payload = {
        //         "templateName": getValueByName("template-name", data),
        //         "height": getValueByName("height", data),
        //         "width": getValueByName("width", data),
        //         "categories": getValueByName("category", data),
        //     }
        //     // generate.generateor(getValueByName('height',data),getValueByName('width',data))
        //     api.post("/poster/generateTemplate", payload)
        //         .then(() => {
        //             console.log('nice')
        //         })
        //         .catch((err) => {
        //             console.log(err)
        //         })
        // })

        api.get("/poster/getTemplate/" + ajaxify.data.uid, {})
            .then((res) => {
                Logger.log(res)
                res.map((e) => {
                    Logger.log(e)
                    $("#my-table").append(`<button class="btn btn-secondary m-2" data-id="${e._id}" your-template>${e.templateName}</button>`)
                })
            })
            .catch((err) => {
                console.log(err)
            })

        // $("body").on("click","[your-template]",function(e){
        //     let id = $(this).data("id")
        //     console.log(id)
        //     location.href = "/templategenerator/"+id;
        // })

        generate.editor();

        $("body").on("change", "#csvFile", function (e) {
            e.preventDefault();

            $("#generate-template").removeAttr('disabled');

            const file = e.target.files[0]; // Get the selected file
            const reader = new FileReader(); // Create a FileReader object

            reader.onload = function (e) {
                csvData = e.target.result; // Assign the CSV content to the global variable
                // Process the CSV content here
            };

            reader.readAsText(file); // Read the file as text
        });

        $("body").on("click", "#generate-template", function (e) {
            e.preventDefault()

            let values = generate.csvToArray(csvData);
            values = values.map((value, i) => {
                let cloned = JSON.parse(JSON.stringify(generate._data));
                value.background = cloned.background;
                value.objects = generate.replaceVariablesValues(cloned.objects, value);
                return value;
            });

            let zip = new JSZip();
            let blobs = [];

            // function loadCanvas(index, callback) {
            //     if (index >= values.length) return callback();
            //     drawer.api.loadCanvasFromData(JSON.stringify(values[index]), function () {
            //         let blob = $('.lower-canvas ')[0].toDataURL("image/png");
            //         blobs.push(blob);
            //         notify(`(${(index + 1) * 100 / values.length}) % Completed`);
            //         loadCanvas(index + 1, callback);
            //     });
            // }

            var progressLabel = $('#progress-label');

            var progressBar = new ProgressBar.Line('#progress-bar-container', {
                // Options for ProgressBar.js
                strokeWidth: 4,
                easing: 'linear',
                duration: 200,
                color: '#CCCCCC',
                trailColor: '#E0E0E0',
                trailWidth: 4,
                svgStyle: { width: '100%', height: '100%' },
                from: { color: '#CCCCCC' },
                to: { color: '#0029FF' },
                step: function (state, bar) {
                    bar.path.setAttribute('stroke', state.color);
                }
            });
            function loadCanvas(index, callback) {
                if (index >= values.length) return callback();

                progressBar.animate((index + 1) * 100 / values.length / 100); // Start the animation

                drawer.api.loadCanvasFromData(JSON.stringify(values[index]), function () {
                    let blob = $('.lower-canvas ')[0].toDataURL("image/png");
                    blobs.push(blob);

                    // Update the progress bar
                    progressBar.set((index + 2) * 100 / values.length / 100);

                    if (index === values.length - 1) {
                        progressLabel.text('Downloaded');
                    } else {
                        progressLabel.text('Downloading...');
                    }

                    loadCanvas(index + 1, callback);
                });
            }



            function saveAs(blob, filename) {
                if (typeof navigator.msSaveBlob !== 'undefined') {
                    navigator.msSaveBlob(blob, filename);
                } else {
                    var link = document.createElement('a');
                    if (link.download !== undefined) {
                        // Browsers that support HTML5 download attribute
                        var url = URL.createObjectURL(blob);
                        link.setAttribute('href', url);
                        link.setAttribute('download', filename);
                        link.style.visibility = 'hidden';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    }
                }
            }

            loadCanvas(0, function () {
                blobs.forEach((blob, i) => zip.file(`poster-${i}.png`, blob.split(',')[1], { base64: true }));
                zip.generateAsync({ type: "blob" }).then((content) => saveAs(content, ajaxify.data.template_data.templateName + ".zip"));
            });

        })
    }

    generate.replaceVariablesValues = (objects, value) => {
        Logger.log("objects", objects)
        objects.forEach((obj) => {
            if (obj.type === 'ErasableText') {
                let text = obj.text.trim();
                text = text.replace(/{/g, '').replace(/}/g, '');
                obj.text = value[text] || "";
            }
        });

        return objects;
    }

    generate.csvToArray = (csvData) => {
        const lines = csvData.split('\n');
        const headers = lines[0].split(',');
        const result = [];

        for (let i = 1; i < lines.length; i++) {
            const obj = {};
            const currentLine = lines[i].split(',');

            for (let j = 0; j < headers.length; j++) {
                obj[headers[j].trim()] = currentLine[j].trim();
            }

            result.push(obj);
        }

        return result;
    }

    generate.simulateProgress = () => {
        var progressBar = $('.progress-fill');
        var percentageText = $('.percentage');

        var progress = 0;
        var interval = setInterval(function () {
            progress += 1;
            progressBar.style.width = progress + '%';
            percentageText.textContent = progress + '%';

            if (progress >= 100) {
                clearInterval(interval);
            }
        }, 50);
    }

    generate.posters = () => {

    }
    generate.editor = (height, width) => {

        let _availableHeight, _availableWidth;
        let availableHeight = $('#canvas-editor').height() - 90;
        let availableWidth = $('#canvas-editor').width();

        _availableHeight = availableHeight;
        _availableWidth = availableWidth;

        if (availableHeight < availableWidth) _availableWidth = availableHeight;
        else if (availableHeight > availableWidth) _availableHeight = availableWidth;

        width = width || _availableWidth;
        height = height || _availableHeight;
        let _width = width;
        let _height = height;

        if (_height < _width) _width = _height;
        else if (_height > _width) _height = _width;

        let zoom = _availableHeight / _width;
        zoom > 1 ? zoom = 1 : zoom = zoom;

        Logger.log(width, height, zoom)


        var drawerPlugins = ['Pencil',
            'Eraser',
            'Text',
            'Line',
            'ArrowOneSide',
            'ArrowTwoSide',
            'Triangle',
            'Rectangle',
            'Circle',
            'Image',
            'BackgroundImage',
            'Polygon',
            'ImageCrop',

            // Drawing options
            //'ColorHtml5',
            'Color',
            'ShapeBorder',
            'BrushSize',
            'OpacityOption',

            'LineWidth',
            'StrokeWidth',

            'Resize',
            'ShapeContextMenu',
            'CloseButton',
            'OvercanvasPopup',
            'OpenPopupButton',

            'TextLineHeight',
            'TextAlign',

            'TextFontFamily',
            'TextFontSize',
            'TextFontWeight',
            'TextFontStyle',
            'TextDecoration',
            'TextColor',
            'TextBackgroundColor'
        ];

        // drawer is editd as global property solely for debug purposes.
        // doing  in production is considered as bad practice
        window.drawer = new DrawerJs.Drawer(null, {
            plugins: drawerPlugins,
            corePlugins: [],
            exitOnOutsideClick: false,
            pluginsConfig: {
                Image: {
                    scaleDownLargeImage: true,
                    maxImageSizeKb: 10240, //1MB
                    cropIsActive: true
                },
                BackgroundImage: {
                    scaleDownLargeImage: true,
                    maxImageSizeKb: 10240, //1MB
                    //fixedBackgroundUrl: '/examples/redactor/images/vanGogh.jpg',
                    imagePosition: 'center', // one of  'center', 'stretch', 'top-left', 'top-right', 'bottom-left', 'bottom-right'
                    acceptedMIMETypes: ['image/jpeg', 'image/png', 'image/gif'],
                    dynamicRepositionImage: true,
                    dynamicRepositionImageThrottle: 100,
                    cropIsActive: false
                },
                Text: {
                    editIconMode: false,
                    editIconSize: 'large',
                    defaultValues: {
                        fontSize: 72,
                        lineHeight: 2,
                        textFontWeight: 'bold'
                    },
                    predefined: {
                        fontSize: [8, 12, 14, 16, 32, 40, 72],
                        lineHeight: [1, 2, 3, 4, 6]
                    }
                },
                Zoom: {
                    enabled: false
                }
            },
            toolbars: {
                drawingTools: {
                    position: 'custom',
                    positionType: 'outside',
                    customAnchorSelector: '#canvas-tools-area',
                    compactType: 'scrollable',
                    hidden: false,
                    toggleVisibilityButton: false,
                    fullscreenMode: {
                        position: 'top',
                        hidden: false,
                        toggleVisibilityButton: false
                    }
                },
                toolOptions: {
                    position: 'custom',
                    positionType: 'inside',
                    compactType: 'popup',
                    customAnchorSelector: '#canvas-tools-area',
                    hidden: false,
                    toggleVisibilityButton: false,
                    fullscreenMode: {
                        position: 'bottom',
                        compactType: 'popup',
                        hidden: false,
                        toggleVisibilityButton: false
                    }
                },
                settings: {
                    position: 'custom',
                    positionType: 'inside',
                    compactType: 'scrollable',
                    customAnchorSelector: '#canvas-tools-area',
                    hidden: false,
                    toggleVisibilityButton: false,
                    fullscreenMode: {
                        position: 'right',
                        hidden: false,
                        toggleVisibilityButton: false
                    }
                }
            },
            defaultImageUrl: 'https://media0.giphy.com/media/bcKmIWkUMCjVm/giphy.gif?cid=ecf05e477qdb4pvxqvfdj4cnziqz4uwrd9htv6qd1y2ktfy0&ep=v1_gifs_search&rid=giphy.gif&ct=g',
            defaultActivePlugin: {
                name: 'Pencil',
                mode: 'lastUsed'
            },
            debug: true,
            activeColor: '#a1be13',
            backgroundColor: '#ffffff',
            align: 'floating',
            lineAngleTooltip: {
                enabled: true,
                color: 'blue',
                fontSize: 15
            },
        }, _availableWidth,
            _availableHeight,
        );


        $('#canvas-editor-area').append(window.drawer.getHtml());

        window.drawer.onInsert();
        window.drawer.api.startEditing();

        $('#templateWidth').val(width);
        $('#templateHeight').val(height);
        $(`#templateSize option[value="${width}x${height}"]`).length ?
            $(`#templateSize option[value="${width}x${height}"]`).prop('selected', true) :
            $(`#templateSize option[value="custom"]`).prop('selected', true);

        let offset = $('#canvas-editor').offset();


        let toolBarWidth = $('#canvas-tools-area .toolbar-placeholder').last().width();

        $('#canvas-tools-area').css({
            left: `${availableWidth / 2 - toolBarWidth / 2}px`,
        });

        $('body').prepend(`
            <style>
               #redactor-drawer-box{
                   top: 0!important;
                   left:0 !important;
                   position: relative !important;
                   display: block !important;
               }
            </style>
        `)

        $('#redactor-drawer-box').appendTo('#canvas-editor-area');
        let url = ajaxify.data.template_data.data;
        // 
        function findVariables(jsonObj) {
            const variables = {};

            // Iterate over each object in the "objects" array
            for (const obj of jsonObj.objects) {
                // Check if the object type is "ErasableText"
                if (obj.type === 'ErasableText') {
                    const textValue = obj.text;
                    const regex = /{([^{}]*)}/g; // Use the 'g' flag for global search
                    let match;
                    // Iterate over all matches within the text value
                    while ((match = regex.exec(textValue)) !== null) {
                        const variableName = match[1];
                        variables[variableName] = ''; // Add variable name as key with an empty string as the initial value
                    }
                }
            }

            return variables;
        }

        $(window).on('after:render', function () {
            Logger.log($('.lower-canvas ')[0].toDataURL("image/png"))
        })

        async function getBase64ImageFromUrl(imageUrl) {
            var res = await fetch(imageUrl);
            var blob = await res.blob();

            return new Promise((resolve, reject) => {
                var reader = new FileReader();
                reader.addEventListener("load", function () {
                    resolve(reader.result);
                }, false);

                reader.onerror = () => {
                    return reject(this);
                };
                reader.readAsDataURL(blob);
            });
        }


        fetch(url)
            .then(response => response.json())
            .then(async (data) => {

                Promise.all(data.objects.map(async (obj) => {
                    if (obj.src) obj.src = await getBase64ImageFromUrl(obj.src);
                })).then(() => {
                    drawer.api.loadCanvasFromData(JSON.stringify(data));
                    generate._data = data;
                }).catch((err) => {
                    Logger.log(err)
                })

            })
            .catch(error => {
                // Handle any errors
                Logger.error(error);
            });
    };

    return generate
});