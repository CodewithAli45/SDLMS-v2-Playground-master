"use strict";

/* globals define */

define("forum/sdlms/dtthon/DtStoryboard", ["api","sdlms/threadbuilder","sdlms/eaglebuilder"], function (api,threadbuilder,eb) {
	var DtStoryboard = {};
	DtStoryboard.init = function () {
        console.log("inited");
        DtStoryboard.initThreadBuilder(688);
        DtStoryboard.initEagleBuilder(688);
		$("[collapsed-tasks]").hide();
		$("[collapse-menu-icon]").on('click',function (e) {
			$("[save-btn]").toggle();
			$("[expanded-tasks],[collapsed-tasks]").toggle();
			$("[collapse-header]").text(
				$("[collapse-header]").text() == "" ? "Journey Board" : ""
			);
			$("[collapse]").toggleClass("col-md-2 col-md-1");
		});

		function getNumberList(count) {
			$("[number-list]").append(`
            <div class= "number-list number-list-active">${count}</div>
    `);
		}
		let totalTasks = $("[task-list]");
		for (let i = 0; i < totalTasks.length; i++) {
			count++;
			getNumberList(count);
		}
		$("[tool-bar] [collapse-body]").hide();

		$("[tool-bar]").on("click", "[collapse-icon]", function () {
			$("[collapse-body]").animate({
				width: "toggle",
			});
			$(this).toggleClass("rotate");
		});

		//in a display asset there would be no submit button only we have to give submit button in the input asset

		/* 
                	<div class="col-12 pl-0 d-flex mt-4 align-items-center justify-content-between">
    <button type="button"
        class="sdlms-button button-primary button-md d-flex align-items-center">Submit</button>
</div>

            
            */
	};
		// if(asset_type=='threadbuilder'){
        //     DtStoryboard.initThreadBuilder(688);
        // }
        // else if(asset_type=='eaglebuilder'){
        //     DtStoryboard.initEagleBuilder(264);
        // }
        // else if(asset_type=='article'){
        //     DtStoryboard.initEagleBuilder();
        // }
        // else if(asset_type=='assetLink'){
        //     DtStoryboard.initEagleBuilder();
        // }
        // else if(asset_type=='reflection'){
        //     DtStoryboard.initEagleBuilder();
        // }
        // else if(asset_type=='quiz'){
        //     DtStoryboard.initEagleBuilder();
        // }
        DtStoryboard.initThreadBuilder = (tid) => {
            let uid = app.user.uid;
            api.get(`/sdlms/${tid}/threadbuilder?uid=${uid}`, {}).then((r) => {
                console.log(r)
                let data = {
                    meta: r.meta,
                    threads: r.threads,
                    conclusion: r.conclusion || {},
                };
                new threadBuilder({
                    target: '#studentThreadBuilder',
                    action: "builder",
                    tid: tid,
                    id: r.id,
                    uid: uid,
                    with: data,
                    addFeedbacks: true,
                    uid: uid,
                });
                DtStoryboard.tbLoaded = true;
            });
        };
         DtStoryboard.initEagleBuilder = (tid) => {
            let uid = app.user.uid;
            api.get(`/sdlms/${tid}/eaglebuilder?uid=${uid}`, {}).then((r) => {
                let data = {
                    meta: r.meta,
                    tracks: r.tracks,
                    conclusion: r.conclusion || {},
                };
                new eagleBuilder({
                    target: '#studentEagleBuilder',
                    action: "builder",
                    tid: tid,
                    uid: uid,
                    id: r.id,
                    with: data,
                    addFeedbacks: true,
                });
                DtStoryboard.ebLoaded = true;
            });
           
         };
        
         



	return DtStoryboard;
});

