"use strict";

/* globals define */

define("forum/sdlms/dtthon/aProfile", function () {
	var aProfile = {};
	aProfile.init = function () {
		
var title = "React Native Developer"
var description = " Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages"

var learning_outcomes = "shagun"
var pre_requisites ="mishra"
var deadline="3rd May 2022"
var img_url="https://media.giphy.com/media/dalAKBkBak1S8/giphy.gif"
var profile_pic="https://media.giphy.com/media/xwmX2VqO7On8k/giphy.gif"
var company_site="abc.pvt.ltd"
var company_details="Lorem ipsum dolor sit amet, sit a consectetur adipiscing elit Lorem ipsum dolor sit amet, sit a Lorem ipsum dolor sit amet, sit a consectetur adipiscing elit Lorem ipsum dolor sit amet, sit a Lorem ipsum dolor sit amet, sit a consectetur adipiscing Lorem ipsum dolor sit amet, sit a consectetur adipiscing elit"
var pageTitle = "Project"

$('#pageTitle').append(`${pageTitle}`)

$('#details').append(`<div class="d-flex">
    <div class="col-md-8 pl-3">
      <div class="col-md-10 p-0 pb-4 project-heading font-weight-medium">
        ${title}
      </div>
      <div>
        <div class="pb-2 bold-font">
          Opportunity description
        </div>
        <div class="pb-3"> ${description} </div>
      </div>
      <div class="bold-font">
        Learning outcomes
      </div>
      <div>
        <ul class="lists">
          <li>Basic javascript</li>
          <li>Lörem ipsum spim decingar</li>
          <li>Lörem ipsum spim decingar</li>
        </ul>
      </div>
      <div class="bold-font">
        Pre-requisties
      </div>
      <div>
        <ul>
          <li>Lörem ipsum spim decingar</li>
          <li>Lörem ipsum spim decingar</li>
          <li>Lörem ipsum spim decingar</li>
        </ul>
      </div>
      <div>
        <div class="pt-3">
          <b>Deadline:</b>${deadline}
        </div>
      </div>
    </div>
    <div class="col-4 pb-3">
      <div class="pb-3">
        <img src="${img_url}" class="img-fluid profile-image" alt="Responsive image">
      </div>
      <div class="organization-profile">
        <div class="row">
          <div class="col-md-3 pr-0">
            <div class="pt-3 pl-3">
              <img class="organization-profile-image" src="${profile_pic}" alt="">
            </div>
          </div>
          <div class="col-md-9 pl-0 p-3">
            <div class="bold-font pb-1">
              By <a href="#">${company_site}</a>
            </div>
            <div class="pr-3 pb-1 organization-font">
            ${company_details}
              <a href="#">Know more</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`);

    $('.select-box').on('change', function() {
      if ($('.select-box').val() == 'Y') {
        $('.button').toggleClass(' button-primary apply-button').attr('disabled', false)
      }
      if($('.select-box').val() == 'N'){
        $('.button').toggleClass(' apply-button  button-primary').attr('disabled', true);
      }
    })
	};
	return aProfile;
});
