<div class="sdlms-container" id="content" component="content">
    <div class="sdlms-section session-view sdlms-form-elements">
        <div
            class="sdlms-section-header shadow-none custom-padding-x-40 primary-header align-items-center justify-content-between">
            <div class="align-items-center sdlms-text-white-20px" style="text-align: center;">
                <span class="sdlms-floating-left" back-btn>
                    <svg width="26" height="18" viewBox="0 0 26 18" fill="none" xmlns="http://www.w3.org/2000/svg"
                        back-btn="">
                        <path d="M10.5261 18L13 15.8849L4.96494 9L13 2.11505L10.5261 0L0 9L10.5261 18Z" fill="white">
                        </path>
                        <line x1="5" y1="9" x2="26" y2="9" stroke="white" stroke-width="4"></line>
                    </svg>
                </span>
                <!--IF profiles-->
                <div  id="pageTitle">Edit Profile</div>
                <!--ELSE-->
                <div id="pageTitle">Create new profile</div>
                <!--ENDIF profiles-->
            </div>
        </div>
        <div class="sdlms-section-body">
            <div class="py-3 rounded-bottom">
                
                <form class="p-4 needs-validation" novalidate>
                    <div>
                    </div>
                    <div class="d-flex justify-content-center">
                        <!--IF profiles.image-->
                        <img src="{profiles.image}"
                            class="user-profile-lg" id="pfp-preview">
                        <!--ELSE-->
                            <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                            class="user-profile-lg" id="pfp-preview">
                        <!--ENDIF profiles.image-->

                    </div>

                    <div class="form-group d-flex justify-content-center mt-2">
                        <!--IF profiles.image-->
                        <label for="pfp-input"
                            class="sdlms-button button-primary px-2 py-1 sdlms-text-black-14px form-label"
                            id="pfp-input-label">Change picture</label>
                        <!--ELSE-->
                            <label for="pfp-input"
                            class="sdlms-button button-primary px-2 py-1 sdlms-text-black-14px form-label"
                            id="pfp-input-label">Upload picture</label>
                        <!--ENDIF profiles.image-->
                        <input type="file" accept="image/*" data-name="image" name="files[image]"
                            class="form-control-file d-none" required id="pfp-input">
                    </div>

                    <div class="form-group">
                        <label for="name-input form-label">Enter name</label>
                        <input type="text" data-name="name" name="name" class="form-control" id="name-input" value="{profiles.name}" required>
                        <div class="invalid-feedback">
                            Name is required.
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="designation-input form-label">Enter designation</label>
                        <input type="text" data-name="designation" name="designation" class="form-control"
                            id="designation-input" value="{profiles.designation}" required>
                        <div class="invalid-feedback">
                            Designation is required.
                        </div>
                    </div>

                    <div class="d-flex justify-content-center mt-4">
                        <!--IF profiles.name-->
                        <input type="submit" id="create-profile" value="Update profile"
                            class="btn button-primary p-2 sdlms-button">
                            <input type="button" id="delete-profile" value="Delete profile" class="btn btn-danger ml-2" style="
                            border-radius: 10px;
                        ">
                        <!--ELSE-->
                        <input type="submit" id="create-profile" value="Create profile"
                            class="btn button-primary p-2 sdlms-button">
                        <!--ENDIF profiles.name-->
                    </div>
                    
                </form>
               
            </div>
        </div>
    </div>

</div>