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
    					<img class="img-fluid w-100" alt="About" src="{{ url('/admin/public/img/banner/'.$list->img) }}">
    				</div>
    			</div>
    			<div class="row">
				
				<div class="container">
				    <div class="row my-5 px-4">
						
						<div class="col-md-12 mt-5 p-0">
							<ol class="breadcrumb bgdetailproduct">
								<li class="breadcrumb-item"><a class="euz_font12 euz_newfont  text-white" href="{{ url('/Solution') }}">Solutions</a></li>
							</ol>
						</div>
						
						<div class="col-md-12 my-3">
							<h1 class="font-weight-bold"><?php echo $list->title; ?></h1><hr>
							<p class="text-dark text-justify lineh27"><?php echo $list->content; ?></p>
						</div>
						<div class="col-md-12 my-3">
							<h1 class="font-weight-bold"><?php echo $list->cattitle; ?></h1><hr>
						</div>
						<?php foreach($cats as $cat) { ?>
						<div class="col-md-6 py-4"><div class="row">
				        <div class="col-md-6">
				            <img src="{{ url('/admin/public/img/banner/'.$cat->img) }}" id="" class="img-fluid w-100 euz_br">
				        </div>
				        <div class="col-md-6">
				            <h4 class="font-weight-bold"><?php echo $cat->title; ?></h4>
							<p class="text-dark text-justify lineh27 pabout"><?php echo substr($cat->content, 0, 100); ?>..</p>
							<a href="{{ url('/Solution/'.$cat->id) }}" class="btn btn-read" value="">View more</a>
				        </div>
				        </div></div>
						<?php } ?>
						<div class="col-md-12 p-0 homeSlider mt-5 py-4">
                    		<div id="carouselExampleControls" class="carousel slide carousel-fade" data-ride="carousel" data-interval="4000" style="border-radius: 10px;">
                    			<ul class="carousel-indicators">
                    			    <?php $i = 0; foreach($sliders as $slider) { ?>
    			    				<li data-target="#carouselExampleControls" data-slide-to="<?php echo $i; ?>" class="<?php if($i == '0') { echo 'active'; } ?>" style="border-radius: 50%;height: 15px;width: 15px;box-shadow: 0 0 10px black;"></li>
    			    				<?php $i++; } ?>
    							</ul>
                    			<div class="carousel-inner">
                    				<?php $i = 0; foreach($sliders as $slider) { ?>
                    				<div class="carousel-item  <?php if($i == '0') { echo 'active'; } ?>">
                    					<img class="d-block w-100" src="{{ url('/admin/public/img/banner/'.$slider->img) }}" alt="Optimal protection and maximum freedom for every wheelchair user!">
                    				</div>
                    				 <?php $i++; } ?>
                    			</div>
                    			<a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev"><span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="sr-only">Previous</span></a>
                    			<a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next"><span class="carousel-control-next-icon" aria-hidden="true"></span><span class="sr-only">Next</span></a>
                    		</div> 
                    	</div>
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
			$("#Solution").css({ "color": "#fbdc00", "border-bottom": "#fbdc00 solid 5px", "font-weight": "600" });
		});
    </script>	
</body>
</html>



