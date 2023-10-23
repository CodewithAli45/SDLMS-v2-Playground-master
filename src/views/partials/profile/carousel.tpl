 <div class="d-flex flex-wrap col-12">

     <!-- IF builders.rigor.count -->
     <div class="col-sm-12 col-md-{builders.config.cols} px-3">
         <h4> Rigor ({builders.rigor.count})</h4>
         <div class="owl-carousel position-relative" data-margin="{builders.config.margin}"
             data-items="{builders.config.items}" data-autoplayTimeout="1000" data-autoplay="1" data-loop="1"
             data-nav="1" data-dots="1">
             <!-- BEGIN builders.rigor.data -->
             <div class="single-item-card card p-3">
                 <h5> {builders.rigor.data.reason} </h5>
                 <div class="section-info text-ellipse-4">{builders.rigor.data.statement}</div>
             </div>
             <!-- END builders.rigor.data -->
         </div>
     </div>
     <!-- ENDIF builders.rigor.count -->




     <!-- IF builders.maturity.count -->
     <div class="col-sm-12 col-md-{builders.config.cols} px-3">
         <h4> Maturity ({builders.maturity.count})</h4>
         <div class="owl-carousel position-relative" data-margin="{builders.config.margin}"
             data-items="{builders.config.items}" data-autoplayTimeout="1000" data-autoplay="1" data-loop="1"
             data-nav="1" data-dots="1">
             <!-- BEGIN builders.maturity.data -->
             <div class="single-item-card card p-3">
                 <h5> {builders.maturity.data.reflection} </h5>
                 <div class="section-info text-ellipse-4 ">{builders.maturity.data.statement}</div>
             </div>
             <!-- END builders.maturity.data -->
         </div>
     </div>
     <!-- ENDIF builders.maturity.count -->


     <!-- IF builders.insight.count -->
     <div class="col-sm-12 col-md-{builders.config.cols} px-3">
         <h4> Insights ({builders.insight.count})</h4>
         <div class="owl-carousel position-relative" data-margin="{builders.config.margin}"
             data-items="{builders.config.items}" data-autoplayTimeout="1000" data-autoplay="1" data-loop="1"
             data-nav="1" data-dots="1">
             <!-- BEGIN builders.insight.data -->
             <div class="single-item-card card p-3">
                 <h5> {builders.insight.data.reflection} </h5>
                 <div class="section-info text-ellipse-4">{builders.insight.data.statement}</div>
                 <div class="section-info pt-2">
                     <span>&bull; {builders.insight.data.category} </span>
                     <span>&bull; {builders.insight.data.subCategory} </span>
                 </div>
             </div>
             <!-- END builders.insight.data -->
         </div>
     </div>
     <!-- ENDIF builders.insight.count -->


</div>