'use strict';

define('forum/posterGenerator/templategenerator/create', ['api'], function (api) {
    var create = {};
    const Logger = new ConsoleLogger('CANVAS');
    create.init = () => {
        Logger.log('Template Generator')
        create.events();
        create.editor()
    };
    create.events = () => {

        $("body").on("click","#back-button",function(e){
            e.preventDefault();
            location.href = "/generator/list";
        })
        // $("body").on("click", "#save-template", function (e) {
        //     e.preventDefault()
        //     let notparsedserilizeddata = drawer.api.getCanvasAsJSON();
        //     let serializedCanvasData = JSON.parse(drawer.api.getCanvasAsJSON());
        //     Logger.log(serializedCanvasData)

        //     api.post("/poster/savecanvas", { data: serializedCanvasData })
        //         .then((res) => {
        //             console.log(res)
        //         })
        //         .catch((err) => {
        //             console.log(err)
        //         })
        //     // serializedCanvasData.objects.forEach(obj => {
        //     //     if (obj.hasOwnProperty('text')) {
        //     //         const input = document.createElement('input');
        //     //         input.setAttribute('type', 'text');
        //     //         input.setAttribute('id', obj.text);
        //     //         $("#form").append(input);
        //     //     }
        //     // });
        // })
        function getValueByName(name, arr) {
            const element = arr.find(obj => obj.name === name);
            return element ? element.value : null;
        }
        $("body").on("click", "#save-template", function (e) {
            e.preventDefault();
            let data = $("#template-form").serializeArray()
            // $("#template-form").remove()
            console.log(data)
            
           
            let title = getValueByName("templateName", data);
            let description = getValueByName("templateDescription", data);

            
              
            // let notparsedserilizeddata = drawer.api.getCanvasAsJSON();
            let serializedCanvasData = drawer.api.getCanvasAsJSON();
            Logger.log(serializedCanvasData);
            doAjax({
                url: `/poster/savecanvas/${title}/${description}`,
                type: "POST",
                dataType: "json",
                contentType: "application/json",
                data: serializedCanvasData,
                success: function (res) {
                    location.href = "/generator/list"
                },
                error: function (err) {
                    Logger.log(err);
                }
            });
        });

    }
    create.editor = (height, width) => {

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

        // drawer is created as global property solely for debug purposes.
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
    };

    return create
});