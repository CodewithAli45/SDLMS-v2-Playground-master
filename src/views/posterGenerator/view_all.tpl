<div class="container">
	<div class="session-view sdlms-form-elements sdlms-section">
		<div class="sdlms-section-header justify-content-between font-weight-500 sdlms-text-white-20px" tabheader=""
			style="box-shadow: 0 0 2px 0 #00000050;">
			<div class="sdlms-assets-tab cursor-pointer position-relative d-flex align-items-center sdlms-sessions-control"
				style="background: white;">
				<div class="d-flex sdlms-asset-tab w-50 justify-content-center sdlms-sessions" data-type="navigation"
					data-navigate="-1" data-state="/poster/profiles">Profiles</div>
				<div class="d-flex sdlms-asset-tab w-50 justify-content-center sdlms-sessions active"
					data-type="navigation" data-navigate="-1" data-state="/posters">Anecdotes</div>
			</div>
		</div>
		<div class="sdlms-section-body">
			<div class="pl-0 row">
				<div class="col-4 sdlms-form-elements">
					<div class="d-flex align-items-center justify-content-between" sdlms-assest-search-bar="">
						<input type="text" id="dtthon-explore-search-bar" placeholder="Search by Name" class="form-control sdlms-text-tertiary-16px font-weight-400">
						<label for="dtthon-explore-search-bar" style="position: relative; right: 35px;">
							<i class="fa fa-search mt-2" style="color: #afafac;" aria-hidden="true"></i>
						</label>
					</div>
				</div>
				<div class="col-4 pt-2">
					<!-- <input type="checkbox" id="myProjects" checked /> <label for="myProjects">Display my Projects</label> -->
				</div>
				<div class="col-4 d-flex justify-content-end">
					<button type="button" class="sdlms-button button-primary button-lg d-flex align-items-center justify-contentt-end" createanecdote="">
						<span class="sdlms-text-white-20px">Create new anecdote</span>
					</button>
				</div>
			</div>
			<div class="posters-container mb-5"></div>
			<!-- IMPORT sdlms/assets/navigation.tpl -->
		</div>
	</div>


</div>