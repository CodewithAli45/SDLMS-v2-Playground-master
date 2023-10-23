"use strict";

/* globals define */

define("forum/sdlms/dtthon/aStoryboard", ["api","sdlms/threadbuilder","sdlms/eaglebuilder"], function (api,threadbuilder,eb) {
	var aStoryboard = {};
	aStoryboard.init = function () {

        aStoryboard.initThreadBuilder(688);
        aStoryboard.initEagleBuilder(688);
		// Journey Board Samiha
$('[collapsed-tasks]').hide()
$('[collapse-menu-icon]').on("click", function(e) {
  $('[save-btn]').toggle()
  $('[expanded-tasks],[collapsed-tasks]').toggle();
  $('[collapse-header]').text($('[collapse-header]').text() == "" ? "Journey Board" : "")
  $('[collapse]').toggleClass("col-md-2 col-md-1")
});


function getNumberList(count) {
  $("[number-list]").append(`
  <div class= "number-list number-list-active">${count}</div>
  `)
}
let totalTasks = $("[task-list]")
for (let i = 0; i < totalTasks.length; i++) {
  count++
  getNumberList(count)
}
$("[tool-bar] [collapse-body]").hide();

$("[tool-bar]").on("click", "[collapse-icon]", function() {
  $("[collapse-body]").animate({
    width: "toggle"
  });
  $(this).toggleClass("rotate");
})

getNumberList(1)
getNumberList(2)
getNumberList(3)
getNumberList(4)


var asset_type = "Input Asset"; //to know type of asset
var description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
var asset_content = "Threadbuilder" //type of asset
var asset_heading = "You have to give Reflection here";
var asset_value = "movie.og"

var asset_header = `<div class="col-md-6 my-2 mx-auto">
  <div class="sdlms-section sdlms-form-elements">
      <div class="sdlms-section-header shadow-none secondary-header align-items-center justify-content-between p-1 pl-3"
          header-asset-div>
          <div class="d-flex align-items-center sdlms-text-white-20px" header>
              <div class="d-flex justify-content-center align-items-center w-100 cursor-pointer" header-text>
                  <span asset-selection-label class="pt-1">${asset_type}</span>
              </div>
          </div>
      </div>
      <div class="sdlms-section-body">
          <div class="d-flex">
            <div class="col-md-12 pl-0"><b>${asset_heading}</b>
            </div>
          </div>
          <div class="d-flex">
            <div class="col-md-12 pl-0" id="asset-content"> <br>`

if (asset_type) {
  switch (asset_content) {
    case 'Reflection':
      if (asset_type == "Input Asset")
        asset_content = `<textarea class="form-control" placeholder="Reflect as per given guidelines" name="content" rows="8"></textarea>`
      if (asset_type == "Display Asset")
        asset_content == `Show Reflection`
      break;
    case 'Threadbuilder':
      if (asset_type == "Input Asset")
        asset_content =  `<div class="w-100">
        <div class=" pl-0" student-assets>
            <div class="sdlms-section">
                <div
                    class="sdlms-section-header cursor-pointer font-weight-500 sdlms-text-white-20px">
                    <div class="sdlms-assets-tab position-relative d-flex align-items-center justify-content-between"
                        id="nav-tab" role="tablist">
                        <a class="d-flex sdlms-asset-tab sdlms-asset-tab-fixing-width tab3 justify-content-center sdlms-sessions"
                            id="nav-student-thread-tab" data-toggle="tab"
                            href="javascript:void(0)" data-href="#nav-student-thread-tab-panel"
                            role="tab" aria-controls="nav-home" aria-selected="false"
                            asset-tab="middle-asset"
                            data-assetOption="eaglebuilder"
                            >
                            Thread Builder
                        </a>
                    </div>
                </div>
    
                <div class="sdlms-section-body px-3 pt-4">
                    <div class="row">
                        <div class="tab-content w-100">
                                <div class="sdlms-asset sdlms-thread-builder"
                                    id="studentThreadBuilder"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>` //copy code of tb from tpl and
      if (asset_type == "Display Asset")
        asset_content = "Full Threadbuilder"
      break;
    case 'Eaglebuilder':
      if (asset_type == "Input Asset")
        asset_content = `<div class="expanded pr-0">
        <div class="w-100">
            <div class=" pl-0" student-assets>
                <div class="sdlms-section">
                    <div
                        class="sdlms-section-header cursor-pointer font-weight-500 sdlms-text-white-20px">
                        <div class="sdlms-assets-tab position-relative d-flex align-items-center justify-content-between"
                            id="nav-tab" role="tablist">
                            <a class="d-flex sdlms-asset-tab sdlms-asset-tab-fixing-width tab2 justify-content-center sdlms-sessiosn"
                                id="nav-student-eagle-tab" data-toggle="tab"
                                data-href="#nav-student-eagle-tab-panel" href="javascript:void(0)"
                                role="tab" aria-controls="nav-profile" aria-selected="false">
                                Eagle Builder
                            </a>
                        </div>
                    </div>

                    <div class="sdlms-section-body px-3 pt-4">
                        <div class="row">
                            <div class="tab-content w-100" id="nav-tabContent">
                                <div class="sdlms-assets-tab-content tab-pane fade w-100"
                                    id="nav-student-eagle-tab-panel" role="tabpanel"
                                    aria-labelledby="nav-student-eagle-tab">
                                    <div class="sdlms-asset sdlms-eagle-builder"
                                        id="studentEagleBuilder"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`
      if (asset_type == "Display Asset")
        asset_content = "Full Eaglebuilder"
      break;
    case 'Link':
      if (asset_type == "Input Asset")
        asset_content = `<textarea class="form-control" placeholder="Enter link" name="content" rows="2"></textarea>`
      if (asset_type == "Display Asset") {
        var link_type = asset_value.substring(asset_value.length - 4);
        if (link_type == '.png' || link_type == '.jpg' || link_type == '.gif') {
          asset_content = `<img src="${asset_value}" width=100%>`
        } else if (link_type == '.ogg') { //what should I give to render video
          asset_content = `<video width=100% controls src="https://youtu.be/9k4091VXK9M">
                             Your browser does not support the video tag.
                           </video>`
        } else {
          asset_content = `<a href = "${asset_value}"> ${asset_value}</a>`;
        }
      }
      case 'Quiz':
        break;
      case 'Article':
        break;
  }
}

var footer = `</div>
          </div>
          </div>
          <div class="d-flex">
              <div class=" col-12 pl-0">
<br>
${description}
              </div>
          </div>
      </div>
  </div>
</div>`

var button = `<div class="col-12 pl-0 d-flex mt-4 align-items-center justify-content-between">
      <button type="button"
          class="sdlms-button button-primary button-md d-flex align-items-center">Submit</button>
  </div>`


if (asset_type == "Input Asset")
  $('#storyboard-asset').append(asset_header + asset_content + button + footer)
if (asset_type == "Display Asset")
  $('#storyboard-asset').append(asset_header + asset_content + footer)
$('#storyboard-asset').append(asset_header)
$('#storyboard-asset').append(asset_header)
$('#storyboard-asset').append(asset_header)


//make for loop till the length of asset array and pop value everytime push it in the array...

	};

        aStoryboard.initThreadBuilder = (tid) => {
            let uid = app.user.uid;
            api.get(`/sdlms/${tid}/threadbuilder?uid=${uid}`, {}).then((r) => {
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
                aStoryboard.tbLoaded = true;
            });
        };
         aStoryboard.initEagleBuilder = (tid) => {
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
                aStoryboard.ebLoaded = true;
            });
         };

	return aStoryboard;
});