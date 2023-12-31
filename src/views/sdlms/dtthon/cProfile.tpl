    <div class="sdlms-section session-view sdlms-form-elements">
      <div class="sdlms-section-header shadow-none custom-padding-x-40 primary-header align-items-center justify-content-between ">
        <div class=" align-items-center sdlms-text-white-20px" style="text-align:center;"><span class="sdlms-floating-left"><svg width="26" height="18" viewBox="0 0 26 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.5261 18L13 15.8849L4.96494 9L13 2.11505L10.5261 0L0 9L10.5261 18Z" fill="white" />
              <line x1="5" y1="9" x2="26" y2="9" stroke="white" stroke-width="4" />
            </svg></span>
          Create Profile page of your Project</div>
      </div>
      <div class="sdlms-section-body">
        <div class="d-flex">
          <div class="col-6 pl-0">
            <div class="col-12 p-0">
              <div class="d-flex flex-column align-items-center sdlms-floating-label-input mt-4 justify-content-between">
                <div class="sdlms-floating-label label-style">Title</div>
                <textarea id="pTitle" class="form-control label-text" placeholder="Enter Text Here" name="project-title" rows="2"></textarea>
              </div>
            </div>
            <div class="col-12 p-0">
              <div class="d-flex flex-column align-items-center sdlms-floating-label-input mt-4 justify-content-between">
                <div class="sdlms-floating-label label-style">Image <span class="secondary-text"> (Optional) </span>
                </div>
                <textarea id="imageURL" class="form-control image-placeholder label-text" placeholder="Image URL" name="content" rows="2"></textarea>
              </div>
            </div>
          </div>
          <div class="col-6 pr-0">
            <div class="d-flex flex-column align-items-center sdlms-floating-label-input mt-4 justify-content-between">
              <div class="sdlms-floating-label label-style">Description</div>
              <textarea id="pDescription" class="form-control discript-textarea label-text" placeholder="Please enter description of the project" name="content" rows="6" maxlength="500"></textarea>
              <label class="holder"><span class="secondary-text">
                  <div id="the-count"><span id="current">0</span><span id="maximum">/500</span></div></label>
            </div>
          </div>
        </div>
        <div class="d-flex">
          <div class="col-6 pl-0">
            <div class="d-flex flex-column sdlms-floating-label-input mt-4 justify-content-between">
              <div class="sdlms-floating-label">Learning Outcomes
              </div>
              <div class="sdlms-form-elements container col-12 pl-0 pr-0">
                <textarea id=learnTask class="form-control add-more-values" placeholder="Please enter the learning outcomes for the project" name="content" rows="1"></textarea>
                <svg class="sdlms-floating-right" width="10" height="10" viewBox="0 0 10 10" class="mr-1" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.29703 4.13574V5.66504H0.525543V4.13574H9.29703ZM5.72867 0.400391V9.7168H4.10269V0.400391H5.72867Z" fill="#0029FF"></path>
                </svg>
              </div>
              <div id="learnAddedTasks"></div>
            </div>
          </div>
          <div class="col-6 pr-0">
            <div class="d-flex flex-column sdlms-floating-label-input mt-4 justify-content-between">
              <div class="sdlms-floating-label">Pre-requisites
              </div>
              <div class="sdlms-form-elements container col-12 pl-0 pr-0">
                <textarea id=preReqTask class="form-control add-more-values" placeholder="Please enter the pre-requisites for the project" name="content" rows="1"></textarea>
                <svg class="sdlms-floating-right" width="10" height="10" viewBox="0 0 10 10" class="mr-1" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.29703 4.13574V5.66504H0.525543V4.13574H9.29703ZM5.72867 0.400391V9.7168H4.10269V0.400391H5.72867Z" fill="#0029FF"></path>
                </svg>
              </div>
              <div id="preReqAddedTasks"></div>
            </div>
          </div>
        </div>
        <div class="d-flex">
          <div class="col-6 pl-0">
            <div class="row">
              <div class=" col-4">
                <div class="d-flex flex-column align-items-center mt-4 justify-content-between">
                  <div class="p-2 pl-3 pr-3" style="background-color:rgba(0, 0, 0, 0.05);  font-size: var(--sdlms-font-size-18); border-radius:0.50rem;">No of stages</div>
                  <div class="d-flex number justify-content-between">
                    <span class="plus m-2"><svg width="12" height="12" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.7606 7.008H15.8086V10.432H9.7606V16.448H6.3366V10.432H0.288598V7.008H6.3366V0.927999H9.7606V7.008Z" fill="black" />
                      </svg></span>
                    <div class="mt-2">
                      <input id="stages" type="text form-control" value="1" style="outline:none;">
                    </div>
                    <span class="minus m-2"><svg width="12" height="4" viewBox="0 0 15 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 0.609375H14.8416V3.96481H0V0.609375Z" fill="#323232" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div class="col-3 pr-0">
                <div class="d-flex flex-column align-items-center mt-4 justify-content-between">
                  <div class="dropdown" id="id_catagory">
                    <button class="btn dropdown-toggle p-2 pr-3 pl-3" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                      style="background-color:rgba(0, 0, 0, 0.05);  font-size: var(--sdlms-font-size-18); border-radius:0.50rem;">
                      Catagory
                    </button>
                    <div class="dropdown-menu cursor-pointer" aria-labelledby="dropdownMenuButton">
                      <div class="dropdown-item p">Project</div>
                      <div class="dropdown-item c">Course</div>
                      <div class="dropdown-item s">Selection</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-5">
                <div class="custom-commit" style="display:none">
                  <div class="d-flex flex-column align-items-center sdlms-floating-label-input mt-4 justify-content-between">
                    <div class="sdlms-floating-label label-style">Commit: Custom
                      <svg class="sdlms-floating-right custom-arrow" width="10" height="8" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.11523 10L9 3.81909L15.8848 10L18 8.09713L9 0L0 8.09713L2.11523 10Z" fill="black"/>
                      </svg>
                    </div>
                    <textarea id="pDeadline" class="form-control label-text" placeholder="Please enter commitment" name="content" rows="1"></textarea>
                  </div>
                </div>
                <div class="d-flex flex-column align-items-center mt-4 justify-content-between">
                  <div class="dropdown" id="id_commitment">
                    <button class="btn dropdown-toggle p-2 pr-3 pl-3" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                      style="background-color:rgba(0, 0, 0, 0.05);  font-size: var(--sdlms-font-size-18); border-radius:0.50rem;">
                      Commitment
                    </button>
                    <div class="dropdown-menu cursor-pointer" aria-labelledby="dropdownMenuButton">
                      <div class="dropdown-item">Part Time</div>
                      <div class="dropdown-item">Full Time</div>
                      <hr class="m-0">
                      <div class="dropdown-item custom-dropdown">Custom</div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
              </div>
            </div>
          </div>
          <div class="col-6 pr-0">
            <div class="d-flex flex-column align-items-center sdlms-floating-label-input mt-4 justify-content-between">
              <div class="sdlms-floating-label label-style">Deadline <span class="secondary-text"> (Optional) </span>
              </div>
              <textarea id="pDeadline" class="form-control label-text" placeholder="Please Enter the deadline of the project (dd-mm-yyyy)" name="content" rows="2"></textarea>
            </div>
          </div>
        </div>
        <div class="col-12 pr-0 pt-4 d-flex align-items-center justify-content-end">
          <button type="button" id="preview" class="sdlms-button button-primary button-md d-flex align-items-center br-rad">Preview</button>
        </div>
      </div>
    </div>
    <div class="pl-0 mt-4 d-flex align-items-center justify-content-end">
      <button type="submit" id="create-profile" class="sdlms-button button-primary button-lg d-flex align-items-center br-rad">Create</button>
    </div>