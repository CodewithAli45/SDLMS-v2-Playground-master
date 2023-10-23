<div class="button-primary container mb-0 py-2 rounded-top">
	<p class="text-center mb-0 font-weight-500 sdlms-text-white-20px">Create Anecdote</p>
</div>

<div class="shadow container py-3 rounded-bottom">
	<form class="p-4">

		<div id="option-form" class="candidate-block-60">
			<p class="sdlms-text-black-16px text-center mb-2">Enter Anecdote</p>
			<div class="form-group">
				<label for="name-input">Enter participant name</label>
				<input type="text" name="name" class="form-control" id="name-input">
			</div>

			<div class="form-group">
				<label for="event-input">Enter event name</label>
				<input type="text" name="event_name" class="form-control" id="event-input">
			</div>

			<div class="form-group">
				<label for="anecdote-input">Enter Anecdote</label>
				<textarea class="form-control" name="anecdote" id="anecdote-input" rows="3" minlength="110"
					maxlength="300"></textarea>
			</div>
			<div class="form-group " style="width: 500px;">
				<label for="template-input">Choose a Template </label>
				<div class="d-flex">
					<div class="d-flex flex-column">
						<label for="template-1"></label>
						<select id="template-1" class="border-0 custom-select"
							style="background-color:rgba(0, 0, 0, 0.05);  font-size: var(--sdlms-font-size-18); border-radius:0.50rem;">
							<!-- BEGIN poster -->
							<option value="{@value}" name="template">{@value}</option>
							<!-- END poster -->
						</select>
					</div>
				</div>
			</div>
		</div>
		<hr>

		<div id="option-csv" class="candidate-block-60">

			<p class="sdlms-text-black-16px text-center mb-2">Upload CSV</p>

			<button class="sdlms-button button-secondary p-2 my-2 sdlms-text-white-14px" id="download-btn">Download
				sample CSV</button>

			<div class="custom-file mt-2">
				<input type="file" class="custom-file-input" id="csv-upload" aria-describedby="inputGroupFileAddon01"
					name="files[csv]"
					accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel">
				<label class="custom-file-label" id="csv-upload-label" for="csv-upload">Choose CSV</label>
			</div>

		</div>

		<hr>

		<div class="d-flex justify-content-center mt-2">
			<input type="submit" id="create-anecdote" value="Create Anecdote"
				class="btn button-primary p-2 sdlms-button" disabled>
		</div>

	</form>
</div>