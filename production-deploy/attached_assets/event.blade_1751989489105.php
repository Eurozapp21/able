<!DOCTYPE html>
<html>
<head><meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	
    <meta name="viewport" content="width=device-width" />
	<title>{{ $settings[0]->seo_title }}</title>     
	<link rel="shortcut icon" href="{{ url('/../admin/public/img/logo/'.$settings[0]->favicon) }}" type="image/png" sizes="36x36">
    <link href="{{ url('/Content/css/fontawesome/css/all.css') }}" rel="stylesheet" />
    <link href="{{ url('/Content/css/bootstrap.css') }}" rel="stylesheet" />
    <link href="{{ url('/Content/css/styleEUZ.css') }}" rel="stylesheet" />
    <link href="{{ url('/Content/css/ablestyle.css') }}" rel="stylesheet" />   
    <style>
        .dropdown-menu
        {
            width:92%;
        }
    </style>
	<script src="{{ url('/Content/js/jquery.min.js') }}"></script>   
    <script src="{{ url('/Content/js/bootstrap.bundle.js') }}"></script>
	<style>
		td.day:hover 
		{
			background-color: #466675;
			color: #fff;
			cursor: pointer;
		}
		tr 
		{
			background-color: #8BC34A !important;
			text-align: center;
		}
		td.old.day 
		{
			color: #7d7d7d;
			background-color: #a9da70;
			border: #8BC34A solid 1px;
		}
		td.new.day 
		{
			color: #7d7d7d;
			background-color: #a9da70;
			border: #8BC34A solid 1px;
		}
		td.day 
		{
			padding: 7px !important;
			background-color: #cbf39c;
			border: #8BC34A solid 1px;
		}
		.datepicker-days 
		{
			padding: 0.5em;
		}
		th.prev, .datepicker-switch, .next 
		{
			color: #fff;
		}
		.dropdown-menu
		{
			width: 245px !important;
			background-color: #8BC34A;
		}
	</style>		
</head>
<body>	
	@include('header') 
	<div class="body">
		<div>
			 <div class="container-fluid">
				<div class="row">
					<div class="col-md-12 p-0 euz_mt_top_25">
						<img src="{{ url('/admin/public/img/logo/'.$settings[0]->trabanner) }}" class="img-fluid w-100">
					</div>
					<!-- <div class="col-md-12 euz_fortempbanner p-0">
		                <div class="container">
		                    <div class="row">
		                        <div class="col-md-12">
		                            <h1 class="font-weight-bold text-white euz_con">Newsroom</h1>
		                        </div>
		                    </div>
		                </div>
		            </div> -->
				</div>
			</div>			
			<div class="container">
			    
			    <div class="row my-5">
			        
			        <div class="euz_left">
			            <div class="">
			                
			                <div class="col-md-12">
			                    <h1 class="font-weight-bold">Events</h1><hr>
			                </div>
			                
			                <?php foreach($events as $event) { ?>
					        <div class="col-lg-12 mb-3">
					        	<div class="card rounded-0 bg_br bordre">
					        		<img class="card-img-top border-0 rounded-0 img-fluid w-100" src="<?php echo url('../admin/public/img/event/'.$event->slider); ?>" alt="">
					        		<div class="card-body bg_br_top p-0 bg-white">
					        			<div class="row ">
					        				<div class="col-md-4 pr-0" style="border-right: #d1d3d4 solid 1px;">
					        					<div class="bgindate bg-white text-center font-weight-bold py-4" style="margin-top: 15px;">
					        						<h1><?php echo date("d", $event->startdate); ?></h1>
					        						<h4 class="tabsfont font-weight-bold"><?php echo date("M Y", $event->startdate); ?></h4>
					        					</div>
					        				</div>
					        				<div class="col-md-8">
					        					<div class="diflow p-2">
					        						<h5><?php echo $event->title; ?></h5>
					        						<p class="text-justify cardtest"><?php echo substr($event->description, 0, 50); ?>...</p>
					        						
					        					</div>
					        					<a href="{{ url('/eventdetail/'.$event->id) }}" class="btn btn-cardbutn float-right euz_btnflix">More info</a>	
					        				</div>
					        			</div>
					        		</div>
					        	
					        	</div>
					        </div>
					        <?php } ?>
			            </div>
			        </div>			        
			        <div class="euz_middle"></div>			        
			        <div class="euz_right">
			            <div class="">			                
			                <div class="col-md-12">
			                    <h1 class="font-weight-bold">News</h1><hr>
			                </div>			                
			                <?php foreach($blogs as $blog) { ?>   
    					    <div class="col-lg-12 col-md-12 mb-3" style="opacity: 1;">                               
                                <div class="card rounded-0 bg_br bordre">
					        		<img class="card-img-top border-0 rounded-0 img-fluid w-100" src="<?php echo url('../admin/public/img/blog/'.$blog->featured_image); ?>" alt="">
					        		<div class="card-body bg_br_top p-0 bg-white">
					        			<div class="row ">
					        				<div class="col-md-12">
					        					<div class="diflow p-2">
					        						<h5><?php echo $blog->name; ?></h5>
					        						<p class="text-justify cardtest"><?php echo substr($blog->content, 0, 50); ?>...</p>
					        						<a href="<?php echo url('/newsdetail/'.$blog->id); ?>" class="btn btn-cardbutn float-right euz_btnflix">More info</a>
					        					</div>
					        				</div>
					        			</div>
					        		</div>
					        		
					        	</div>                           
    					    	<!---<div class="p-2 rounded-0 border euz_max_height">
        
    					    		<div class="row">
        
    					    			<div class="col-md-12"><img class="card-img-top rounded-0 img-fluid" src="<?php //echo url('../admin/public/img/blog/'.$blog->featured_image); ?>" alt=""></div>
        
    					    			<div class="col-md-12">
        
    					    				<h5 class="card-title font-weight-bold"><?php //echo $blog->name; ?>
        
    					    					<br><span class="euz_texyelo"><?php //echo date("d M Y", strtotime($blog->publish_datetime)); ?></span>
        
    					    				</h5>
        
    					    				<p class="card-text text-justify cardtest my-2"><?php //echo substr($blog->content, 0, 280); ?>...</p>
        
    					    				<a href="<?php //echo url('/newsdetail/'.$blog->id); ?>" class="btn btn-cardbutn float-right">More info</a>
        
    					    			</div>
        
    					    		</div>
        
    					    	</div>--->
        
    					    </div>
        
    					    <?php } ?>
			            </div>
			        </div>
			        
			    </div>
			    
			    
				
			</div>
		</div> 
	</div>	
	@include('footer') 
	<script src="{{ url('/Scripts/bootstrap-datepicker.min.js') }}"></script>
    <script>
        $('.input-group.date').datepicker({ format: "dd/mm/yyyy" });
		$(function () {
			$(".anavelink").css({ "color": "#58595b" });
			$("#Events").css({ "color": "#fbdc00", "border-bottom": "#fbdc00 solid 5px", "font-weight": "600" });
		});
    </script>	
</body>
</html>



