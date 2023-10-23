<div class="sdlms-container px-0">
    <div class="sdlms-section session-view sdlms-form-elements">
      <div class="sdlms-section-header shadow-none custom-padding-x-40 primary-header align-items-center justify-content-between ">
        <div class="d-flex align-items-center sdlms-text-white-20px ">Project</div>
      </div>
      <div class="col-md-4 p-md-2" collapse>
        <div class="dtThone-journey-board sdlms-section position-fixed" style="z-index:5; left:0; top: 65px; height: calc(100% - 65px); border-top-left-radius: 0" collapse-right>
          <div class="sdlms-section-header shadow-none secondary-header cursor-pointer font-weight-500 sdlms-text-white-22px">
            <div class="sdlms-text-white-17px text-center" collapse-header>
              Journey Board
            </div>
            <span class="sdlms-floating-right">
              <svg collapse-menu-icon width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 13.3333V16H24V13.3333H0ZM0 6.66667V9.33333H24V6.66667H0ZM0 0V2.66667H24V0H0Z" fill="white" />
              </svg>
            </span>
          </div>
          <div class="sdlms-section-body w-100 p-3" style="overflow: scroll; height:100%">
            <div expanded-tasks>
            </div>
            <div class="col-2" collapsed-tasks>
              <div number-list></div>
            </div>
          </div>
        </div>
      </div>
      <div class="sdlms-section d-flex position-fixed" style="right:0; bottom:10%; z-index:5" tool-bar>
        <div class="sdlms-button button-primary cursor-pointer"><svg width="10" height="12" viewBox="0 0 11 16" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:20px" collapse-icon>
            <path
              d="M0.342285 6.98486L6.98291 0.344238C7.44189 -0.114746 8.18408 -0.114746 8.63818 0.344238L9.7417 1.44775C10.2007 1.90674 10.2007 2.64893 9.7417 3.10303L5.03467 7.81006L9.7417 12.5171C10.2007 12.9761 10.2007 13.7183 9.7417 14.1724L8.63818 15.2759C8.1792 15.7349 7.43701 15.7349 6.98291 15.2759L0.342285 8.63525C-0.116699 8.18604 -0.116699 7.44385 0.342285 6.98486Z"
              fill="white" />
          </svg>
        </div>
        <div class="font-weight-bold" collapse-body>
          <div class="d-flex">
            <button toc>TOC</button>
            <button dr>DR</button>
          </div>
        </div>
      </div>
      <h1 class="sdlms-text-black-22px task-heading mt-4 text-center"> Prepare wireframes for your project </h1>
      <div class="col-md-11 sdlms-section-body" style="margin-left:40px;">
        <div class="col-12 p-0 pt-4">
          <div class="row" id="storyboard-asset">
            <div class="dtthon-display-asset col-md-6">
            <div class="col-md-6 my-2 mx-auto">
  <div class="sdlms-section sdlms-form-elements">
      <div class="sdlms-section-header shadow-none secondary-header align-items-center justify-content-between p-1 pl-3"
          header-asset-div>
          <div class="d-flex align-items-center sdlms-text-white-20px" header>
              <div class="d-flex justify-content-center align-items-center w-100 cursor-pointer" header-text>
                  <span asset-selection-label class="pt-1">display asset</span>
              </div>
          </div>

      </div>
      <div class="sdlms-section-body">
          <div class="d-flex">
            <div class="col-md-12 pl-0">Asset heading
            </div>
          </div>
          <div class="d-flex">
            <div class="col-md-12 pl-0">

<br> <br>
            Here you have to show asset


            </div>
          </div>
          <div class="d-flex">
              <div class=" col-12 pl-0">
              <br>
              
<br><br>
              </div>
          </div>

      </div>
  </div>
</div>
            </div>
            <div class="dtthon-input-asset col-md-6">
            <div class="expanded pr-0">
                                <div class="w-100">
                                    <div class=" pl-0" student-assets>
                                        <div class="sdlms-section">
                                            <div
                                                class="sdlms-section-header cursor-pointer font-weight-500 sdlms-text-white-20px">
                                                <div class="sdlms-assets-tab position-relative d-flex align-items-center justify-content-between"
                                                    id="nav-tab" role="tablist">
                                                    <a class="d-flex sdlms-asset-tab sdlms-asset-tab-fixing-width tab1 justify-content-center sdlms-sessions"
                                                        id="nav-student-thread-tab" data-toggle="tab"
                                                        href="javascript:void(0)" data-href="#nav-student-thread-tab-panel"
                                                        role="tab" aria-controls="nav-home" aria-selected="false"
                                                        asset-tab="middle-asset"
                                                        data-assetOption="eaglebuilder"
                                                        >
                                                        <!-- IF isTeacher -->
                                                        Planned <span class="hidden-on-collapsed">&nbsp;Eagle
                                                            Builder</span><span class="shown-on-collapsed">&nbsp;EB</span>
                                                        <!-- ELSE -->
                                                        Thread Builder
                                                        <!--END isTeacher -->
                                                    </a>
                                                    <a class="d-flex sdlms-asset-tab sdlms-asset-tab-fixing-width tab2 justify-content-center sdlms-sessiosn"
                                                        id="nav-student-eagle-tab" data-toggle="tab"
                                                        data-href="#nav-student-eagle-tab-panel" href="javascript:void(0)"
                                                        role="tab" aria-controls="nav-profile" aria-selected="false">
                                                        <!-- IF isTeacher -->
                                                        Actual <span class="text-ellipse-2 hidden-on-collapsed">&nbsp;Eagle
                                                            Builder</span><span class="shown-on-collapsed">&nbsp;EB</span>
                                                        <!-- ELSE -->
                                                        Eagle Builder
                                                        <!--END isTeacher -->
                                                    </a>
                                                </div>
                                            </div>
    
                                            <div class="sdlms-section-body px-3 pt-4">
                                                <div class="row">
                                                    <div class="tab-content w-100" id="nav-tabContent">
                                                        <div class="sdlms-assets-tab-content tab-pane fade w-100"
                                                            id="nav-student-thread-tab-panel" role="tabpanel"
                                                            aria-labelledby="nav-student-thread-tab">
                                                            <div class="sdlms-asset sdlms-thread-builder"
                                                                id="studentThreadBuilder"></div>
                                                        </div>
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
                            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="pl-0 mt-4 d-flex align-items-center justify-content-end">
      <button type="submit" id="create-profile" class="sdlms-button button-primary button-lg d-flex align-items-center">Next</button>
    </div>
  </div>