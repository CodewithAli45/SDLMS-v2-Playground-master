<!-- IMPORT library/OwlCarousel.tpl -->

<section class="h-100">
   <div class="col-12 d-flex h-100">

      <div class="col-4 h-100  left-profile-container user-bio-container overflow-auto bg-grey-light">

         <div class="d-flex p-3 user-basic-info bg-grey-light">
            <!-- User Picture -->
            <div class="user-profile-picture pe-3 d-flex align-items-center justify-content-center">
               <img class="profie-picture" src="{profile.picture}">
            </div>
            <div class="user-bio">
               <!-- User Name -->
               <div class="user-profile-name">
                  <h3>{profile.name}</h3>
               </div>
               <!-- User Bio -->
               <div class="user-profile-bio">
                  {profile.bio}
               </div>
            </div>
         </div>

         <div class="user-stats p-3 d-flex justify-content-center">
            <!-- BEGIN profile.stats -->
            <div class="stats">
               <div class="stats-number" animate-numbers="{profile.stats.value}"></div>
               <div class="stats-type"> {profile.stats.name} </div>
            </div>
            <!-- END profile.stats -->
         </div>

         <hr class="w-75 mx-auto">

         <div class="w-75 mx-auto">
             <button class="button-primary w-100 btn-block" id="showComments">
                  Ask a Question
             </button>
         </div>

         <!-- BEGIN profile.left -->
         <!-- IF profile.left.separator -->
         <hr class="w-75 mx-auto">
         <!-- ENDIF profile.left.separator -->
         
         <!-- IF !profile.left.separator -->
         <div class="user-quick-view p-3">
            <!-- IF profile.left.title -->
            <h4> {profile.left.title}</h4>
            <!-- ENDIF profile.left.title -->
            <!-- IF profile.left.data -->
            <ul>
               <!-- BEGIN profile.left.data -->
               <li <!-- IF profile.left.data.link -->href="#section{profile.left.data.link}"<!-- ENDIF profile.left.data.link -->> {profile.left.data.content} </li>
               <!-- END profile.left.data -->
            </ul>
            <!-- ENDIF profile.left.data -->
         </div>
         <!-- ENDIF !profile.left.separator -->

         <!-- END profile.left -->

      </div>

      <div class="col-8 h-100 ps-3 right-profile-container">

         <div class="h-100 overflow-auto p-3 user-bio-container bg-grey-light">

            <div class="d-flex flex-wrap">

               <!-- BEGIN profile.right -->
               <!-- IF profile.right.separator -->
               <hr class="w-75 mx-auto">
               <!-- ENDIF profile.right.separator -->
               <!-- IF profile.right.carousel -->
               <!-- IMPORT partials/profile/carousel.tpl -->
               <!-- ENDIF profile.right.carousel -->
               <div class="col-sm-12 col-md-<!-- IF profile.right.container -->6<!-- ENDIF profile.right.container --> pe-3" <!-- IF profile.right.id -->id="section{profile.right.id}"<!-- ENDIF profile.right.id -->>
                  <!-- IF profile.right.title -->
                  <h4> {profile.right.title}</h4>
                  <!-- ENDIF profile.right.title -->
                  <div class="section-info">
                     <!-- IF profile.right.data -->
                     <ul>
                        <!-- BEGIN profile.right.data -->
                        <li> {profile.right.data.content} </li>
                        <!-- END profile.right.data -->
                     </ul>
                     <!-- ENDIF profile.right.data -->
                     <!-- IF profile.right.content -->
                     {profile.right.content}
                     <!-- ENDIF profile.right.content -->
                  </div>
               </div>
               <!-- END profile.right -->

               <hr class="w-75 mx-auto">
               <div class="w-100" id="comments">
                  <iframe auto-height=".user-bio-container" class="w-100" src="/widgets/comments?profileId={profileId}"></iframe>
               </div>
            </div>

         </div>

      </div>

   </div>
</section>