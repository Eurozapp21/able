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
    			<div class="col-md-12">
    				@if(session()->has('quotesol'))
    					<div class="alert alert-success">
    						{{ session()->get('quotesol') }}
    						{{{ $errors->first('quotesol') }}}
    					</div>
    				@endif
    			</div>
    			<div class="row">
    				<div class="container">
    				    <div class="row my-5 px-4">
    						<div class="col-md-12 mt-5 p-0">
    							<ol class="breadcrumb bgdetailproduct">
    								<li class="breadcrumb-item"><a class="euz_font12 euz_newfont  text-white" href="{{ url('/Solution') }}">Solutions</a></li>
    								<li class="breadcrumb-item a_breadcrumbsub"><span class="euz_font12 euz_newfont txt_ylo"><?php echo $cat->title; ?></span></li>
    							</ol>
    						</div>
    						<div class="col-md-12 my-3">
    							<h1 class="font-weight-bold"><?php echo $cat->innertitle; ?></h1><hr>
    							<p class="text-dark text-justify lineh27"><?php echo $cat->content; ?></p>
    						</div>
    						
    						<div class="col-md-12 p-0 homeSlider my-5">
    							<div id="carouselExampleControls" class="carousel slide carousel-fade" data-ride="carousel" data-interval="4000" style="border-radius: 10px;">
    								<ul class="carousel-indicators">
    					                <?php if(!empty($cat->slider)) { ?>
    									<li data-target="#carouselExampleControls" data-slide-to="0" class="active" style="border-radius: 50%;height: 15px;width: 15px;box-shadow: 0 0 10px black;"></li>
    					                <?php } if(!empty($cat->slider2)) {?>
    									<li data-target="#carouselExampleControls" data-slide-to="1" style="border-radius: 50%;height: 15px;width: 15px;box-shadow: 0 0 10px black;" class=""></li>
    					                <?php } if(!empty($cat->slider3)) {?>
    									<li data-target="#carouselExampleControls" data-slide-to="2" style="border-radius: 50%;height: 15px;width: 15px;box-shadow: 0 0 10px black;" class=""></li>
    									<?php } if(!empty($cat->slider4)) {?>
    									<li data-target="#carouselExampleControls" data-slide-to="3" style="border-radius: 50%;height: 15px;width: 15px;box-shadow: 0 0 10px black;" class=""></li>
    									<?php } if(!empty($cat->slider5)) {?>
    									<li data-target="#carouselExampleControls" data-slide-to="4" style="border-radius: 50%;height: 15px;width: 15px;box-shadow: 0 0 10px black;" class=""></li>
    									<?php } if(!empty($cat->slider6)) {?>
    									<li data-target="#carouselExampleControls" data-slide-to="5" style="border-radius: 50%;height: 15px;width: 15px;box-shadow: 0 0 10px black;" class=""></li>
    									<?php } ?>
    								</ul>
    								<div class="carousel-inner">
    				                    <?php if(!empty($cat->slider)) { ?>
    									<div class="carousel-item  active ">
    										<img class="d-block w-100" src="{{ url('/admin/public/img/banner/'.$cat->slider) }}" alt="<?php echo $cat->title; ?>" />
    									</div>
    									<?php } if(!empty($cat->slider2)) {?>
    									<div class="carousel-item ">
    										<img class="d-block w-100" src="{{ url('/admin/public/img/banner/'.$cat->slider2) }}" alt="<?php echo $cat->title; ?>" />
    									</div>
    									<?php } if(!empty($cat->slider3)) {?>
    									<div class="carousel-item ">
    										<img class="d-block w-100" src="{{ url('/admin/public/img/banner/'.$cat->slider3) }}" alt="<?php echo $cat->title; ?>" />
    									</div>
    								    <?php } if(!empty($cat->slider4)) {?>
    									<div class="carousel-item ">
    										<img class="d-block w-100" src="{{ url('/admin/public/img/banner/'.$cat->slider4) }}" alt="<?php echo $cat->title; ?>" />
    									</div>
    									<?php } if(!empty($cat->slider5)) {?>
    									<div class="carousel-item ">
    										<img class="d-block w-100" src="{{ url('/admin/public/img/banner/'.$cat->slider5) }}" alt="<?php echo $cat->title; ?>" />
    									</div>
    									<?php } if(!empty($cat->slider6)) {?>
    									<div class="carousel-item ">
    										<img class="d-block w-100" src="{{ url('/admin/public/img/banner/'.$cat->slider6) }}" alt="<?php echo $cat->title; ?>" />
    									</div>
    									<?php } ?>
    								</div>
    								<a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev"><span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="sr-only">Previous</span></a>
    								<a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next"><span class="carousel-control-next-icon" aria-hidden="true"></span><span class="sr-only">Next</span></a>
    							</div> 
    						</div>
    						<div class="col-md-12 my-3">
    							<h1 class="font-weight-bold">Our Projects</h1><hr>
    						</div>
    						<?php $i = 0; foreach($products as $product) { ?>
    						<div class="col-md-12 my-4"><div class="row">
    						<div class="col-md-5 bg_br p-0" style="">
    							<div id="carouselExampleControls1" class="carousel slide carousel-fade" data-ride="carousel" data-interval="4000">
    								<ul class="carousel-indicators">
    					                <?php if(!empty($product->slider)) { ?>
    									<li data-target="#carouselExampleControls1" data-slide-to="0" class="active" style="border-radius: 50%;height: 15px;width: 15px;box-shadow: 0 0 10px black;"></li>
    					                <?php } if(!empty($product->slider2)) {?>
    									<li data-target="#carouselExampleControls1" data-slide-to="1" style="border-radius: 50%;height: 15px;width: 15px;box-shadow: 0 0 10px black;" class=""></li>
    					                <?php } if(!empty($product->slider3)) {?>
    									<li data-target="#carouselExampleControls1" data-slide-to="2" style="border-radius: 50%;height: 15px;width: 15px;box-shadow: 0 0 10px black;" class=""></li>
    									<?php } if(!empty($product->slider4)) {?>
    									<li data-target="#carouselExampleControls1" data-slide-to="3" style="border-radius: 50%;height: 15px;width: 15px;box-shadow: 0 0 10px black;" class=""></li>
    									<?php } if(!empty($product->slider5)) {?>
    									<li data-target="#carouselExampleControls1" data-slide-to="4" style="border-radius: 50%;height: 15px;width: 15px;box-shadow: 0 0 10px black;" class=""></li>
    									<?php } if(!empty($product->slider6)) {?>
    									<li data-target="#carouselExampleControls1" data-slide-to="5" style="border-radius: 50%;height: 15px;width: 15px;box-shadow: 0 0 10px black;" class=""></li>
    									<?php } ?>
    								</ul>
    								<div class="carousel-inner">
    				                    <?php if(!empty($product->slider)) { ?>
    									<div class="carousel-item  active ">
    										<img class="d-block w-100" src="{{ url('/admin/public/img/banner/'.$product->slider) }}" alt="<?php echo $cat->title; ?>"  style=""/>
    									</div>
    									<?php } if(!empty($product->slider2)) {?>
    									<div class="carousel-item ">
    										<img class="d-block w-100" src="{{ url('/admin/public/img/banner/'.$product->slider2) }}" alt="<?php echo $cat->title; ?>" style="" />
    									</div>
    									<?php } if(!empty($product->slider3)) {?>
    									<div class="carousel-item ">
    										<img class="d-block w-100" src="{{ url('/admin/public/img/banner/'.$product->slider3) }}" alt="<?php echo $cat->title; ?>" style="" />
    									</div>
    								    <?php } if(!empty($product->slider4)) {?>
    									<div class="carousel-item ">
    										<img class="d-block w-100" src="{{ url('/admin/public/img/banner/'.$product->slider4) }}" alt="<?php echo $cat->title; ?>" style="" />
    									</div>
    									<?php } if(!empty($product->slider5)) {?>
    									<div class="carousel-item ">
    										<img class="d-block w-100" src="{{ url('/admin/public/img/banner/'.$product->slider5) }}" alt="<?php echo $cat->title; ?>" style="" />
    									</div>
    									<?php } if(!empty($product->slider6)) {?>
    									<div class="carousel-item ">
    										<img class="d-block w-100" src="{{ url('/admin/public/img/banner/'.$product->slider6) }}" alt="<?php echo $cat->title; ?>" style="" />
    									</div>
    									<?php } ?>
    								</div>
    								<a class="carousel-control-prev" href="#carouselExampleControls1" role="button" data-slide="prev"><span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="sr-only">Previous</span></a>
    								<a class="carousel-control-next" href="#carouselExampleControls1" role="button" data-slide="next"><span class="carousel-control-next-icon" aria-hidden="true"></span><span class="sr-only">Next</span></a>
    							</div> 
    						</div>
    						<div class="col-md-7 bg_br p-4">
    							<h4 class="font-weight-bold"><?php echo $product->title; ?></h4>
    							<p class="text-dark text-justify lineh27 pabout"><?php echo $product->content; ?></p>
    						</div>
    						</div></div>
    						<?php } ?>
    						<div class="col-md-12 p-0 mt-5">
    				            <a href="#" class="btn btn-cardbutn euz_btnflix" data-toggle="modal" data-target="#getintouch">Talk to us about your project!</a>
    				        </div>
    						<div class="modal fade" id="getintouch" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true">
    							<div class="modal-dialog modal-lg modal-dialog-centered" role="document">
    								<div class="modal-content">
    									<div class="modal-header">
    										<h5 class="modal-title" id="">Get In Touch</h5>
    										<button type="button" class="close" data-dismiss="modal" aria-label="Close">
    											<span aria-hidden="true">&times;</span>
    										</button>
    									</div>
    									<div class="modal-body">
    										<form method="post" action="{{ url('/sendsolcontact') }}" class="row">
                								{{ csrf_field() }}
    											<div class="form-group col-md-6">
    												<label>Your First Name *</label>
    												<input type="text" class="form-control f3 rounded-0" placeholder="First Name" id="fname" name="fname" required value="{{ session()->get('fname') }}" />                           
    											</div>
    											<div class="form-group col-md-6">
    												<label>Your Last Name *</label>
    												<input type="text" class="form-control f3 rounded-0" placeholder="Last Name" id="lname" name="lname" required value="{{ session()->get('lname') }}" />                       
    											</div>
    											<div class="form-group mt-3 col-md-12">
    												<label>Subject *</label>
    												<input type="text" class="form-control f3 rounded-0" placeholder="Subject" id="subject" name="subject" required  value="{{ session()->get('subject') }}">
    											</div>
    											<div class="form-group mt-3 col-md-12">
    												<label>Your Email *</label>
    												<input type="email" class="form-control f3 rounded-0" placeholder="Your Email" id="email" name="email"  required  value="{{ session()->get('email') }}">
    											</div>
    											<div class="form-group mt-3 col-md-12">
    												<label>Your Phone Number *</label>
    												<input type="text" class="form-control f3 rounded-0" placeholder="Your Phone Number" id="tel" name="tel" required value="{{ session()->get('tel') }}">
    											</div>
    											<div class="form-group mt-3 col-md-12">
    												<label>Your Message *</label>
    												<textarea type="text" class="form-control f3 rounded-0" rows="5" placeholder="Your Message" id="msg" name="msg" required>{{ session()->get('msg1') }}</textarea><br />
    											</div>
												<div class="form-group mt-3 col-md-12">
    												<label>Please Enter the below captcha *</label>
        											<div id="custom_captcha"></div>
    											</div>
    											<div class="form-group mt-3 col-md-12">
													<input type="hidden" class="form-control f3 rounded-0" placeholder="" id="refresh" name="refresh" required value=0 />
    												<input type="submit" class="btn btn-customslider rounded-0" value="Submit" style="width: 200px;padding: 10px;">
    											</div>
    											
    										</form>
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
	@include('footer') 
	<script src="{{ url('/Scripts/bootstrap-datepicker.min.js') }}"></script>
    <script>
        $('.input-group.date').datepicker({ format: "dd/mm/yyyy" });
		$(function () {
			$(".anavelink").css({ "color": "#58595b" });
			$("#Solution").css({ "color": "#fbdc00", "border-bottom": "#fbdc00 solid 5px", "font-weight": "600" });
		});
		function reload()
        {
        	$('#refresh').val(1);
        	$('#fname').prop('required',false);
        	$('#lname').prop('required',false);
    		$('#tel').prop('required',false);
    		$('#email').prop('required',false);
    		$('#subject').prop('required',false);
			$('#msg').prop('required',false);
			$("#capresptext").prop('required',false);
        }
        $(document).ready(function()
        {
            var htm='<p><img src="<?php echo url('public/upload/captcha.php'); ?>" id="capt">&nbsp;<input width="30" height="30" type="image" src="<?php echo url('public/upload/reload.png'); ?>" onClick="reload();"  ></p><p><input id="capresptext" class="form-control f3 rounded-0"  type="text" required name="g-recaptcha-response"  > ';
            $('#custom_captcha').html(htm);
        });
    </script>	
</body>
</html>



