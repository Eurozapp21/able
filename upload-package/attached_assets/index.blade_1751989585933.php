<!DOCTYPE html>
<html>
<head><meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	
    <meta name="viewport" content="width=device-width" />
	<title>{{ $settings[0]->seo_title }}</title>     
	<link rel="shortcut icon" href="{{ url('admin/public/img/logo/'.$settings[0]->favicon) }}" type="image/png" sizes="36x36">
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
    <script src="{{ url('/Scripts/jquery.cookie.js') }}"></script>
	<script src="{{ url('/Content/js/smoov.js') }}"></script>
    <script src="{{ url('/Scripts/bootstrap3-typeahead.js') }}"></script>
    <script>
        $('.block').smoove({
            offset: '10%'
        });
        $(document).on("click", ".btnallcookies", function () {
            $(".cookiesbg").fadeOut();
        })		
		$('#myCarouselvred').carousel({
			interval: 5000
		});		
		//scroll slides on swipe for touch enabled devices
		$("#myCarouselvred").on("touchstart", function (event) {
			var yClick = event.originalEvent.touches[0].pageY;
			$(this).one("touchmove", function (event) 
			{
				var yMove = event.originalEvent.touches[0].pageY;
				if (Math.floor(yClick - yMove) > 1) {
					$(".carousel").carousel('next');
				}
				else if (Math.floor(yClick - yMove) < -1) {
					$(".carousel").carousel('prev');
				}
			});
			$(".carousel").on("touchend", function () 
			{
				$(this).off("touchmove");
			});
		});
    </script> 
    
    <!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-183035422-1">
</script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-183035422-1');
</script>
</head>
<body>	
	@include('header')   
    <div class="body">       
		<div class="container-fluid">
			<!--------------------------Section 01---------------------------------->
			@include('slider') 
			<!--------------------------Section 02---------------------------------->
			<div class="row section2">
				<div class="col-md-12 p-0">
					<div class="container">
						<div class="row">
							<div class="col-lg-7 col-md-12 px-5">
								<div class="row mt-4">
									<div class="col-md-12 mb-4">
										<h1 class="font-weight-bold">About Us</h1>
										<p class="text-dark text-justify lineh27 pabout"><?php echo $about[0]->des; ?></p>
										<a href="{{ url('/aboutus') }}" class="btn btn-read" value="" >Read more</a>
									</div>
									<div class="col-md-4 mt-2 text-center">
										<a href="{{ url('/Products') }}" class="section2link font-weight-bold">
											<div class="euz_bg_grey p-2 block" >
												<img src="Content/image/product.png" class="img-fluid lableproduct_about p-1" /><br>
												<?php echo $about[0]->title1; ?>
											</div>
										</a>
									</div>
									<div class="col-md-4 mt-2 text-center">
										<a href="{{ url('/Events') }}" class="section2link font-weight-bold">
											<div class="euz_bg_grey p-2 block" >
												<?php /*<img src="{{ url('admin/public/img/page/'.$about[0]->icon3) }}" class="img-fluid" /><br />*/ ?>
												<img src="Content/image/seminar.png" class="img-fluid lableproduct_about p-1" /><br>
												<?php echo $about[0]->title3; ?>

											</div>
										</a>
									</div> 
									<div class="col-md-4 mt-2 text-center">
										<a href="{{ url('/Seminar') }}" class="section2link font-weight-bold">
											<div class="euz_bg_grey p-2 block" >
												<img src="Content/image/traning.png" class="img-fluid lableproduct_about pl-1 pb-1" /><br>
												<?php echo $about[0]->title2; ?>
											</div>
										</a>
									</div>                           
								</div>
							</div>
							<div class="col-lg-5  mt-2 col-md-12 text-center">
								<img src="{{ url('admin/public/img/bottom/'.$other[0]->img1) }}" class="img-fluid shadowleft w-100" alt="" />
							</div>
						</div>
					</div>
				</div>
			</div>
			<!--------------------------Section 03---------------------------------->
			<div class="row section3">
				<div class="col-lg-6 col-md-12 pl-6 pt-13 fontdiv">
					<div class="row">
						<div class="col-md-12 mb-4">
							<h1 class="font-weight-bold">Products</h1>
						</div>
						<div class="divcategorylist w-100">
							<?php foreach($categories as $category) { ?>
							<div class="col-md-6 mt-3" style="float: left;">
								<a href="<?php if(!empty($category->catid)) { echo url('/subproduct/'.$category->catid); } else { echo url('/categoryproductlist/'.$category->id); } ?>" class="btn btn-customwhite">
									<label class="lableproduct"><center><img src="<?php echo url('/admin/public/img/icon/'.$category->icon); ?>" class="iconfalist" style="width: 30px; height: 30px;" /></center></label>
									<label class="ml-2 labtex" style="max-width: 100%;white-space: normal;"><?php echo $category->title; ?></label>
								</a>
							</div>
							<?php } ?>						
							<div class="col-md-6 mt-3" style="float: left;"><a href="<?php echo url('/Products'); ?>" class="btn btn-custominit borrad w-100"><label class="mb-0">View More</label></a></div>
						</div>
					</div>
				</div>
				<div class="col-md-6 p-0 des">
					<img src="{{ url('admin/public/img/bottom/'.$other[0]->img2) }}" id="img_homeprodImg" class="w-100 h-100" style="clip-path: polygon(0 0, 100% 0, 100% 100%, 20% 100%);"/>
					<!--<center><h1 class="h1fontinside block" data-move-y="200px" id="h1_producttext" data-move-x="-100px"><?php echo $other[0]->name; ?></h1></center>-->
				</div>
			</div>
			<!--------------------------Section 04---------------------------------->
			<div class="row section4">
				<div class="container">
					<div class="row">
						<div class="col-lg-6 col-md-12">
							<div class="embed-responsive embed-responsive-16by9 block">
								<iframe class="embed-responsive-item" id="iframeTraining" src="<?php echo $other[0]->video; ?>" allowfullscreen=""></iframe>
							</div>
						</div>
						<div class="col-lg-6 col-md-12">
							<!--<h1 class="font-weight-bold">Training</h1>-->
							<!--<h1 class="font-weight-bold">NewsRoom</h1>-->
							<h1 class="font-weight-bold"><?php echo $other[0]->title; ?></h1>
							<p class="text-dark text-justify lineh27">
							<!--<h5 class="font-weight-bold"><?php //echo $other[0]->title; ?></h5>-->
							
							<br><?php echo $other[0]->content; ?></p>
							<!--<a href ="{{ url('/Seminar') }}" class="btn btn-read">Read more</a>-->
							<a href ="{{ url($other[0]->readmore) }}" class="btn btn-read">Read more</a>
							<!--<a href ="{{ url('/newsdetail/'.$blogs[0]->id) }}" class="btn btn-read">Read more</a>-->
						</div>
					</div>
				</div>
			</div>
			<div class="row section6 bg-white pt-0">
				<div class="container">
					<div class="row">						
						<div class="col-lg-6 col-md-12 p-3">
							<div class="row">                       
								<div class="col-md-12 mb-3">
									<h3 class="font-weight-bold">Upcoming Seminars</h3>
									<hr class="m-0">
								</div>
								<?php foreach($seminars as $seminar) { ?>
								<div class="col-md-12">
    								<div class="card rounded-0 bg_br bordre">
    					        		<img src="<?php echo url('/admin/public/img/seminar/'.$seminar->profile); ?>" class="card-img-top img-fluid w-100">
    					        		<div class="card-body bg_br_top p-0 bg-white">
    					        			<div class="row ">
    					        				<div class="col-md-12">
    					        					<div class="diflow p-2">
    					        						<h5 class="font-weight-bold"><?php echo $seminar->title; ?></h5>
    					        						<p class="text-org mb-0 font-weight-bold"><?php echo date("j M Y", $seminar->startdate); ?></p>
    										            <p class="text-dark text-justify lineh27"><?php echo substr($seminar->description, 0, 80); ?></p>
    					        						<a href="<?php echo url('/seminardetail/'.$seminar->id); ?>" class="btn btn-cardbutn float-right euz_btnflix">More info</a>
    					        					</div>
    					        				</div>
    					        			</div>
    					        		</div>
    					        	</div>
					        	</div>
								<?php } ?>
							</div>
						</div>						
						<div class="col-lg-6 col-md-12 p-3">
							<div class="row">
								<div class="col-md-12 mb-3">
									<h3 class="font-weight-bold">Training</h3>
									<hr class="m-0">
								</div>
								<?php foreach($retrainings as $retraining) { ?>
								<div class="col-md-12">
    								<div class="card rounded-0 bg_br bordre">
    					        		<img src="<?php echo url('/admin/public/img/training/'.$retraining->img); ?>" class="card-img-top img-fluid w-100">
    					        		<div class="card-body bg_br_top p-0 bg-white">
    					        			<div class="row ">
    					        				<div class="col-md-12">
    					        					<div class="diflow p-2">
    					        						<h5 class="font-weight-bold"><?php echo $retraining->catname; ?></h5
    					        						<?php if ($retraining->dates=='nodate'){?>
    					        						    <p class="mb-0 font-weight-bold"><?php //echo date("j M Y", $retraining->startdate); ?></p>
    					        					    <?php	} else { ?>
    													<p class="mb-0 font-weight-bold"><?php echo date("j M Y", $retraining->startdate); ?></p>
    													<?php } ?>
    					        						<a href="<?php echo url('/trainingdetail/'.$retraining->id); ?>" class="btn btn-cardbutn float-right euz_btnflix">More info</a>
    					        					</div>
    					        				</div>
    					        			</div>
    					        		</div>
    					        	</div>
								</div>
								<?php } ?>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!--------------------------Section 05---------------------------------->
			<div class="row section5">
				<div class="container">
					<div class="row">
						<div class="col-md-12 text-center mb-3"><h1 class="font-weight-bold">Featured Products</h1></div>
						<div class="row divRandomProduct w-100">
							<div id="carouselExampleControlsone" class="carousel slide shomdesf w-100" data-ride="carousel">
								<div class="carousel-inner" style="padding: 0% 2%;">									 
									<div class="carousel-item active">
										<div class="row">
											<?php foreach ($products as $product) { ?>
											<div class="col-md-3 mt-2">
												<a href="<?php echo url('/productdetail/'.$product->id); ?> ">
													<div class="bg-white incms p-2">
														<img src="{{ url('admin/public/img/product/'.$product->img) }}" class="img-fluid zoom" alt="<?php echo $product->title; ?>">
														<div class="overlay"><div class="text"><input type="button" onclick="location.href = 'productdetail.html';" class="btn btn-customslider" value="More Info"></div></div>
													</div>
													<div class="boxgreen1 p-2"><p class="mb-0"><?php echo $product->title; ?><br><?php echo $product->catname; ?></p></div>
												</a>
											</div>
											<?php } ?>											
										</div>
									</div>									
									<div class="carousel-item">
										<div class="row">
											<?php foreach ($productsall as $productsal) { ?>
											<div class="col-md-3 mt-2">
												<a href="<?php echo url('/productdetail/'.$productsal->id); ?>">
													<div class="bg-white incms p-2">
														<img src="{{ url('admin/public/img/product/'.$productsal->img) }}" class="img-fluid zoom" alt="<?php echo $productsal->title; ?>">
														<div class="overlay"><div class="text"><input type="button" onclick="location.href = 'productdetail.html';" class="btn btn-customslider" value="More Info"></div></div>
													</div>
													<div class="boxgreen1 p-2"><p class="mb-0"><?php echo $productsal->title; ?><br><?php echo $productsal->catname; ?></p></div>
												</a>
											</div>
											<?php } ?>											
										</div>
									</div>
								</div>
								
								<a class="carousel-control-prev" href="#carouselExampleControlsone" role="button" data-slide="prev" style="width:1px;opacity: 1;">
									<span class="precls" aria-hidden="true" style=""><i class="fas fa-2x fa-angle-left"></i></span><span class="sr-only">Previous</span>
								</a>
								<a class="carousel-control-next" href="#carouselExampleControlsone" role="button" data-slide="next" style="width:1px;opacity: 1;">
									<span class="necls" aria-hidden="true" style=""><i class="fas fa-2x fa-angle-right"></i></span><span class="sr-only">Next</span>
								</a>
							</div>
						</div>

					</div>
				</div>
			</div>
			

			<!--------------------------Section 06---------------------------------->

			
			<!--------------------------Section 07---------------------------------->
			<div class="row section7 achievement d-none">
				<div class="col-lg-3 col-md-6 p-6 msg-send text-center">
					<a href="{{ url('/achivement/'.$pages[1]->id) }}" class="text-dark">
						<img src="{{ url('admin/public/img/page/'.$pages[1]->icon) }}" class="img-fluid">
						<h5 class="text-org">{{ $pages[1]->title }}</h5>
						<p class="text-white"><?php echo substr($pages[1]->description, 0, 80); ?></p>
					</a>
				</div>								
				<div class="col-lg-3 col-md-6 p-0">
					<img src="{{ url('admin/public/img/page/'.$pages[1]->img) }}" class="img-fluid block w-100" data-move-y="200px" data-move-x="-100px">
				</div>
				<div class="col-lg-3 col-md-6 p-6 msg-send text-center">
					<a href="{{ url('/achivement/'.$pages[0]->id) }}" class="text-dark">
						<img src="{{ url('admin/public/img/page/'.$pages[0]->icon) }}" class="img-fluid">
						<h5 class="text-org">{{ $pages[0]->title }}</h5>
						<p class="text-white"><?php echo substr($pages[0]->description, 0, 80); ?></p>
					</a>
				</div>								
				<div class="col-lg-3 col-md-6 p-0">
					<img src="{{ url('admin/public/img/page/'.$pages[0]->img) }}" class="img-fluid block w-100" data-move-y="200px" data-move-x="-100px">
				</div>				
				<div class="col-lg-3 col-md-6 p-0">
					<img src="{{ url('admin/public/img/page/'.$pages[2]->img) }}" class="img-fluid block  w-100" data-move-y="200px" data-move-x="-100px">
				</div>				
				<div class="col-lg-3 col-md-6 p-6 msg-receive text-center">
					<a href="{{ url('/achivement/'.$pages[2]->id) }}" class="text-dark">
						<img src="{{ url('admin/public/img/page/'.$pages[2]->icon) }}" class="img-fluid">
						<h5 class="text-org">{{ $pages[2]->title }}</h5>
						<p class="text-white"><?php echo substr($pages[2]->description, 0, 80); ?></p>
					</a>
				</div>				
				<div class="col-lg-3 col-md-6 p-0">
					<img src="{{ url('admin/public/img/page/'.$pages[3]->img) }}" class="img-fluid block  w-100">
				</div>				
				<div class="col-lg-3 col-md-6 p-6 msg-receive text-center">
					<a href="{{ url('/achivement/'.$pages[3]->id) }}" class="text-dark">
						<img src="{{ url('admin/public/img/page/'.$pages[3]->icon) }}" class="img-fluid">
						<h5 class="text-org">{{ $pages[3]->title }}</h5>
						<p class="text-white"><?php echo substr($pages[3]->description, 0, 80); ?></p>
					</a>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12 topfooter">
					<h3 class="font-weight-bold text-center text-white">YOUR ABILITY TO DREAM!</h3>
				</div>
			</div>
		</div>
		<div class="modal fade" id="Enquiryfromhome" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true">
			<div class="modal-dialog modal-lg modal-dialog-centered" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="">Contact Us</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<form class="row">

							<div class="form-group col-md-6">
								<input type="text" class="form-control f3" placeholder="First Name" id="txtfname" name="txtfname" ng-model="txtfname">
							</div>
							<div class="form-group col-md-6">
								<input type="text" class="form-control f3" placeholder="Last Name" id="txtlname" name="txtlname" ng-model="txtlname">
							</div>
							<div class="form-group col-md-6">
								<select class="form-control" id="comSubject" name="comSubject">
									<option value="">--Select Subject--</option>
									<option value="Customer Service">Customer Service</option>
									<option value="Webmaster">Webmaster</option>
								</select>
							</div>
							<div class="form-group col-md-6">
								<input type="text" class="form-control f3" placeholder="Your Email" id="txtemail" name="txtemail">
								<br />
							</div>
							<div class="form-group col-md-12">
								<textarea type="text" class="form-control f3" rows="5" placeholder="Your Message" id="txtmsg" name="txtmsg"></textarea><br />
							</div>
							<br />
						</form>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
						<input type="button" id="" class="btn btn-customslider" value="Submit">                
					</div>
				</div>
			</div>
		</div>
	</div>   
	@include('footer')
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-3-typeahead/4.0.1/bootstrap3-typeahead.min.js"></script>
	<script>
		$(function () 
		{
			$(".anavelink").css({ "color": "#58595b"});
			$("#home").css({ "color": "#fbdc00", "border-bottom": "#fbdc00 solid 5px", "font-weight": "600" });
		});		
	</script>
	<style>
		.btn-read:hover
		{
			color: #7ac044;
		}
	</style>
</body>
</html>



