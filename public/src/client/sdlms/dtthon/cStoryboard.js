'use strict';

/* globals define */

define('forum/sdlms/dtthon/cStoryboard', ['api'], function(api) {
    var cstoryboard = {}
    cstoryboard.init = function (){

   
var asset = []
var task_name = []


$('[collapsed-tasks]').hide()
$('[collapse-menu-icon]').click(function(e) {
  $('[save-btn]').toggle()
  $('[expanded-tasks],[collapsed-tasks]').toggle();
  $('[collapse-header]').text($('[collapse-header]').text() == "" ? "Journey Board" : "")
  $('[collapse]').toggleClass("col-md-2 col-md-1")
});

if (true) {
  $(".dtThone-journey-board").find("[expanded-tasks]").prepend(`
  <div  class="sdlms-floating-label-input d-flex position-relative m-2">
  <input type="text" placeholder="Name of the task" class="bg-transparent p-2 border-0 " style="outline:none; width:90%" task-input>
  <span class="p-2"><svg class="add-btn" width="15" height="15" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M20.875 9.15625H13.8438V2.125C13.8438 1.26221 13.144 0.5625 12.2812 0.5625H10.7188C9.85596 0.5625 9.15625 1.26221 9.15625 2.125V9.15625H2.125C1.26221 9.15625 0.5625 9.85596 0.5625 10.7188V12.2812C0.5625 13.144 1.26221 13.8438 2.125 13.8438H9.15625V20.875C9.15625 21.7378 9.85596 22.4375 10.7188 22.4375H12.2812C13.144 22.4375 13.8438 21.7378 13.8438 20.875V13.8438H20.875C21.7378 13.8438 22.4375 13.144 22.4375 12.2812V10.7188C22.4375 9.85596 21.7378 9.15625 20.875 9.15625Z" fill="#0029FF"/></span>
  </svg>
  </div>
  <ol></ol>
  `)
}

$(".add-btn").on("click", addTask)

let count = 0
let idCount = 0

function addTask() {
  count++
  idCount++
  let task = $("[task-input]").val()
  $("[task-input]").val("")
  $(".task-heading").text(task)
  task_name.push(task);
  console.log(task_name);
  let id = idCount
  let taskId = "task-" + idCount
  let delBtnId = "del-btn-" + (idCount)
  $("[expanded-tasks] ol").append(`
  <div id="${id}" class="pr-2 py-2 d-flex justify-content-between">
    <li id="${taskId}" class="font-weight-bold px-4 text-wrap">${task}</li>
    <div class="pr-2">
      <svg id="${delBtnId}" width="11" height="14" viewBox="0 0 11 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.785714 12.4444C0.785714 13.3 1.49286 14 2.35714 14H8.64286C9.50714 14 10.2143 13.3 10.2143 12.4444V3.11111H0.785714V12.4444ZM2.35714 4.66667H8.64286V12.4444H2.35714V4.66667ZM8.25 0.777778L7.46429 0H3.53571L2.75 0.777778H0V2.33333H11V0.777778H8.25Z" fill="#0029FF"/>
      </svg>
    </div>
  </div>
  `)
  $(`svg#${delBtnId}`).on("click", () => {
    $(`div#${id}`).remove()


    task_name.pop() //how to pop the value with the particular id



    $("[number-list]").children().last().remove()
    count--
  })
  getNumberList(count)

  if (count == 2) {
    alert("You can't add more than one task")
  }
}

function getNumberList(count) {
  $("[number-list]").append(`
  <div class= "number-list">${count}</div>
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

$("#create-asset", function() {
  new Asset()
})

$("[create-assets]").on("click", "#create-asset", function() {
  new Asset()
})

class Asset {
  constructor(data) {
    this.builder();
  }
  builder(event) {
    let assetname = "Asset Name"
    let uniqueid = Math.floor(Math.random() * 100000 + 1);
    let html =
      `  <div class="col-md-6 my-2 mx-auto" uniqueid=${uniqueid}>
          <div class="sdlms-section sdlms-form-elements">
              <div class="sdlms-section-header shadow-none secondary-header align-items-center justify-content-between"
                  header-asset-div>
                  <div class="d-flex justify-content-center align-items-center w-100 cursor-pointer">
          <span class="sdlms-floating-right cursor-pointer" style="z-index: 1;" add-to-headerAsset>
              <svg width="25" height="11" viewBox="0 0 25 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M8.4911 18.2766L0.366101 10.1516C-0.122034 9.66351 -0.122034 8.87206 0.366101 8.38387L2.13383 6.6161C2.62196 6.12792 3.41346 6.12792 3.9016 6.6161L9.37499 12.0894L21.0984 0.366101C21.5865 -0.122034 22.378 -0.122034 22.8662 0.366101L24.6339 2.13387C25.122 2.62201 25.122 3.41346 24.6339 3.90165L10.2589 18.2767C9.77069 18.7648 8.97924 18.7648 8.4911 18.2766Z"
                      fill="#0029FF" />
              </svg>
          </span>
          <div class="d-flex align-items-center sdlms-text-white-20px w-100" new-header-asset>
              <textarea
                  class="form-control py-1 w-100" placeholder="Asset Name" name="content" rows="1"
                  col="10"></textarea>
          </div>
        </div>
              </div>
              <div class="sdlms-section-body">
                  <div class="d-flex">
                    <div class="col-md-12 pl-0">
                        <div class="d-flex flex-column align-items-center mt-4 justify-content-between">
                            <div class="sdlms-floating-label">Select Asset Option:</div>
                            <select class="asset_type_dropdown custom-select form-control label-radius align-item-center form-control"
                                id="inputGroupSelect02" style="z-index:5">
                                <option value="input" selected>Input Asset</option>
                                <option value="display">Display Asset</option>
                            </select>
                        </div>
                    </div>
                  </div>
                  <div class="d-flex">
                    <div class="col-md-12 pl-0 asset_content">
                        <div class="d-flex flex-column align-items-center mt-4 justify-content-between">
                            <div class="sdlms-floating-label">What you want as Asset??</div>
                            <select class="asset_content_dropdown custom-select form-control label-radius align-item-center form-control"
                                id="inputGroupSelect06" style="z-index:5">
                                <option value="re" selected>Reflection</option>
                                <option value="tb">Thread Builder</option>
                                <option value="eb">Eagle Builder</option>
                                <option value="ar">Article</option>
                                <option value="qz">Quiz</option>
                                <option value="ot">Other (Video, Image, Documentation)</option>
                            </select>
                        </div>
                    </div>
                  </div>
                  <div class="d-flex">
                  <div class="col-12 pl-0 custom-option" style="display:none">
                  <div class="d-flex flex-column align-items-center sdlms-floating-label-input mt-4 justify-content-between">
                    <div class="sdlms-floating-label">Custom Select</div>
                    <svg class="sdlms-floating-right custom-arrow mr-2 mb-2" width="12" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.11523 10L9 3.81909L15.8848 10L18 8.09713L9 0L0 8.09713L2.11523 10Z" fill="black"/>
                    </svg>
                    <textarea id="pTitle" class="form-control label-text" placeholder="Paste Your Link Here" name="project-title" rows="1"></textarea>
                  </div>
                </div>
                </div>
                  <div class="d-flex">
                      <div class=" col-12 pl-0">
                          <div
                              class="d-flex flex-column align-items-center sdlms-floating-label-input mt-4 justify-content-between">
                              <div class="sdlms-floating-label">Description</div>
                              <textarea class="form-control" placeholder="Enter the description of the asset" name="content"
                                  rows="4" no-of-characters maxlength="500" description></textarea>
                              <label class="holder"><span class="sdlms-text-primary-12px"><span
                                          show-characters>0</span>/200</span></label>
                          </div>
                      </div>
                  </div>
                  <div class="col-12 pl-0 d-flex mt-4 align-items-center justify-content-between">
                      <button type="button"
                          class="sdlms-button button-primary button-md d-flex align-items-center create-asset">Create Asset</button>
                  </div>
              </div>
          </div>
      </div>`;
    $("#storyboard-asset").append(html);
    // after adding the target
    $(`[uniqueid]`).on("click", "[edit-icon]", this.assetHeader);
    $(`[uniqueid]`).on("click", "[add-to-headerAsset]", this.renderTitle)
    $('[uniqueid]').on("input", "[description]", this.characterCount)
    $(`[uniqueid]`).on("click", "[delete-icon]", this.deleteAsset)
    $('[uniqueid]').on('change', ".asset_type_dropdown", this.content_asset)
  }
  assetHeader(e) {
    let html = `
        <div class="d-flex justify-content-center align-items-center w-100 cursor-pointer">
          <span class="sdlms-floating-right cursor-pointer" style="z-index: 1;" add-to-headerAsset>
              <svg width="25" height="11" viewBox="0 0 25 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M8.4911 18.2766L0.366101 10.1516C-0.122034 9.66351 -0.122034 8.87206 0.366101 8.38387L2.13383 6.6161C2.62196 6.12792 3.41346 6.12792 3.9016 6.6161L9.37499 12.0894L21.0984 0.366101C21.5865 -0.122034 22.378 -0.122034 22.8662 0.366101L24.6339 2.13387C25.122 2.62201 25.122 3.41346 24.6339 3.90165L10.2589 18.2767C9.77069 18.7648 8.97924 18.7648 8.4911 18.2766Z"
                      fill="#0029FF" />
              </svg>
          </span>
          <div class="d-flex align-items-center sdlms-text-white-20px w-100" new-header-asset>
              <textarea
                  class="form-control py-1 w-100" placeholder="Task Name" name="content" rows="1"
                  col="10"></textarea>
          </div>
        </div>
    `;
    $(this).parent().html(html);
    $(this).parent().toggleClass('p-1 pl-3')
    $(this).remove();
  }
  renderTitle(e) {
    let value = $(this).parent().find("textarea").val()
    let html = `
         <div class="d-flex align-items-center sdlms-text-white-20px" header>
                      <div class="d-flex justify-content-center align-items-center w-100 cursor-pointer" header-text>
                          <span asset-selection-label class="pt-1">${value?value:"Asset Name"}</span>
                      </div>
                  </div>
                  <div edit-icon>
                  <svg class= "sdlms-floating-left" width="20" height="20" viewBox="0 0 26 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M21.0517 2.54545H15.5521C14.9995 1.06909 13.5521 0 11.8416 0C10.1311 0 8.68375 1.06909 8.13114 2.54545H2.63147C1.18416 2.54545 0 3.69091 0 5.09091V25.4545C0 26.8545 1.18416 28 2.63147 28H21.0517C22.499 28 23.6832 26.8545 23.6832 25.4545V5.09091C23.6832 3.69091 22.499 2.54545 21.0517 2.54545ZM11.8416 2.54545C12.5653 2.54545 13.1573 3.11818 13.1573 3.81818C13.1573 4.51818 12.5653 5.09091 11.8416 5.09091C11.1179 5.09091 10.5259 4.51818 10.5259 3.81818C10.5259 3.11818 11.1179 2.54545 11.8416 2.54545ZM21.0517 25.4545H2.63147V5.09091H5.26293V8.90909H18.4203V5.09091H21.0517V25.4545Z"
                      fill="white" />
                    <path
                      d="M6.57812 18.8806V21.4361H9.20959L22.2448 8.65834L19.7355 6.10278L6.57812 18.8806ZM25.6563 5.4639C26.1123 4.99331 26.1123 4.65743 25.6563 4.18685L24.3405 2.90575C23.8845 2.43517 23.4809 2.43893 23.0248 2.90951L21.0512 4.82501L23.6827 7.38129L25.6563 5.4639Z"
                      fill="#0029FF" />
                  </svg>
                  </div>
                  <div delete-icon>
                    <svg class="sdlms-floating-right" width="20" height="20" viewBox="0 0 11 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.785714 12.4444C0.785714 13.3 1.49286 14 2.35714 14H8.64286C9.50714 14 10.2143 13.3 10.2143 12.4444V3.11111H0.785714V12.4444ZM2.35714 4.66667H8.64286V12.4444H2.35714V4.66667ZM8.25 0.777778L7.46429 0H3.53571L2.75 0.777778H0V2.33333H11V0.777778H8.25Z" fill="white"/>
                    </svg>
                  </div>`
    $(this).parents("[header-asset-div]").html(html)
  }
  characterCount() {
    let ML = $(this).attr("maxlength");
    let CL = $(this).val().length;
    if (CL >= ML) {
      return alert("You have reached the maximum number of characters.");
    } else {
      $(this).next().find("[show-characters]").text(CL)
    }
  }
  deleteAsset() {
    $(this).parents("[uniqueid]").remove()
  }
  content_asset() {
    if ($('.asset_type_dropdown').val() == 'display') {
      $('.asset_content_dropdown').on('change', function() {
        let content = $('.asset_content_dropdown').val()
        if (content == 'ot' || content == 'tb' || content == 'eb') {
          console.log("hello");
          $(".asset_content").hide();
          $(".custom-option").show();
        }
      })
    }
  }

}

$("body").on("click", ".custom-arrow", function() {
  console.log("hello");
  $(".custom-option").hide();
  $(".asset_content").show();
});


$("body").on("click", "#create-profile", function() {
  alert("Your task is created");
});


        $("body").on("click", ".create-asset", function (event) {
          event.preventDefault()
      
          let data = {
            tid: 643,
            task: JSON.stringify({
              task_title: task_name[0] , 
              task_description: "desc desc", 
              tools:[], 
              assets:[], 
              response_type:"link"
            })
          };
    
          api.post(`/apps/task`, data).then(function (res) {
            console.log(res);
          });
         
        });
    };
    return cstoryboard
});