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
        .curs
    	{
    		cursor:pointer;
    	}
    	.euz_min
    	{
    	height:200px;
    	}
    	.play {
        position: absolute;
        top: 35%;
        left: 44%;
        background: red;
        border-radius: 50%/10%;
        color: #fff;
        font-size: .5em;
        height: 3em;
        margin: 20px auto;
        padding: 0;
        text-align: center;
        text-indent: .1em;
        transition: all .15s ease-out;
        width: 4em;
    }
    .play:before {
        background: inherit;
        border-radius: 5%/50%;
        bottom: 9%;
        content: "";
        left: -5%;
        position: absolute;
        right: -5%;
        top: 9%;
    }
    .play:after {
        border-color: transparent transparent transparent #fff;
        border-style: solid;
        border-width: 1em 0 1em 1.732em;
        content: " ";
        font-size: .75em;
        height: 0;
        margin: -1em 0 0 -.75em;
        top: 50%;
        position: absolute;
        width: 0;
    }
      /* Main menu links default color */
    #mainMenu a, /* ID selector for main menu */
    .main-menu a, /* Class selector for main menu */
    .navbar .main-menu a, /* Additional specificity for Bootstrap navbar */
    .navbar-nav .nav-link, /* Bootstrap-specific navbar link selector */
    .menu-wrapper a { /* Adjust based on your structure */
        color: black !important; /* Default link color as black */
        text-decoration: none; /* Remove underline if necessary */
        transition: color 0.3s ease; /* Smooth transition on hover */
    }

    /* Main menu links hover color */
    #mainMenu a:hover,
    .main-menu a:hover,
    .navbar .main-menu a:hover,
    .navbar-nav .nav-link:hover,
    .menu-wrapper a:hover {
        color: yellow !important; /* Hover color as yellow */
    }
    </style>
	<script src="{{ url('/Content/js/jquery.min.js') }}"></script>   
    <script src="{{ url('/Content/js/bootstrap.bundle.js') }}"></script>		
</head>
<body>
    @include('header') 
    <div class="body">
        <div class="container-fluid">
            <!-- Main Content -->
          <div class="row">
				<div class="col-md-12 p-0 euz_mt_top_25">
					<img src="{{ url('/admin/public/img/logo/'.$settings[0]->probanner) }}" class="img-fluid w-100">
				</div>
			</div>	
			<div class="row">
				<div class="container">
					<div class="col-md-12" style="padding: 10px 0px;">
						@if(session()->has('quote'))
							<div class="alert alert-success">
								{{ session()->get('quote') }}
							</div>
						@endif
					</div>
					<div class="row my-5">					
						<div class="col-md-12 p-0">
							<ol class="breadcrumb bgdetailproduct">
								<li class="breadcrumb-item"><a class="euz_font12 euz_newfont  text-white" href="{{ url('/Products') }}">Products</a></li>
								<li class="breadcrumb-item"><a class="euz_font12 euz_newfont  text-white" href="<?php echo url('/subproduct/'.$category[0]->catid); ?>"><?php echo $category[0]->catname; ?></a></li>
								<?php if(!empty($category[0]->subcatname)) { ?>
								<li class="breadcrumb-item a_breadcrumbmain"><a class="euz_font12 euz_newfont  text-white ng-binding" href="<?php echo url('/subcategoryproductlist/'.$category[0]->subcatid); ?>"><?php echo ucwords(strtolower($category[0]->subcatname)); ?></a></li>
								<?php } ?>
								<?php if(!empty($category[0]->subcatname)) { ?>
								<li class="breadcrumb-item a_breadcrumbsub"><span class="euz_font12 euz_newfont txt_ylo"><?php echo ucwords(strtolower($category[0]->title)); ?></span></li>
								<?php } else { ?>
								<li class="breadcrumb-item ng-binding active"><span class="euz_font12 euz_newfont txt_ylo"><?php echo ucwords(strtolower($category[0]->title)); ?></span></li>
								<?php } ?>
								<!-- <li class="breadcrumb-item active ng-binding"><span class="euz_newfont euz_font12 txt_ylo">Product detail</span></li> -->
							</ol>
						</div>
						<!-- Left side-->
						<div class="col-md-4">
							<div class="row">
								<div class="col-md-12">
									<div id="carouselExampleControls" class="carousel slide carousel-fade loadProductSlider" data-ride="carousel" data-interval="4000">
										<div class="carousel-inner" data-toggle="modal" data-target="#myModal">
											<div class="carousel-item active imgdis">
												<center><img class="img-fluid" src="{{ url('admin/public/img/product/'.$category[0]->img) }}" alt="<?php echo $category[0]->title; ?>"></center>
											</div>
											<?php if(!empty($category[0]->img1)) { ?>
											<div class="carousel-item"><center><img class="img-fluid" src="{{ url('admin/public/img/product/'.$category[0]->img1) }}" alt="<?php echo $category[0]->title; ?>"></center></div>
											<?php } if(!empty($category[0]->img2)) { ?>
											<div class="carousel-item"><center><img class="img-fluid" src="{{ url('admin/public/img/product/'.$category[0]->img2) }}" alt="<?php echo $category[0]->title; ?>"></center></div>
											<?php } if(!empty($category[0]->img3)) { ?>
											<div class="carousel-item"><center><img class="img-fluid" src="{{ url('admin/public/img/product/'.$category[0]->img3) }}" alt="<?php echo $category[0]->title; ?>"></center></div>
											<?php } if(!empty($category[0]->img4)) { ?>
											<div class="carousel-item"><center><img class="img-fluid" src="{{ url('admin/public/img/product/'.$category[0]->img4) }}" alt="<?php echo $category[0]->title; ?>"></center></div>
											<?php } if(!empty($category[0]->img5)) { ?>
											<div class="carousel-item"><center><img class="img-fluid" src="{{ url('admin/public/img/product/'.$category[0]->img5) }}" alt="<?php echo $category[0]->title; ?>"></center></div>
											<?php } if(!empty($category[0]->img6)) { ?>
											<div class="carousel-item"><center><img class="img-fluid" src="{{ url('admin/public/img/product/'.$category[0]->img6) }}" alt="<?php echo $category[0]->title; ?>"></center></div>
											<?php } if(!empty($category[0]->img7)) { ?>
											<div class="carousel-item"><center><img class="img-fluid" src="{{ url('admin/public/img/product/'.$category[0]->img7) }}" alt="<?php echo $category[0]->title; ?>"></center></div>
											<?php } if(!empty($category[0]->img8)) { ?>
											<div class="carousel-item"><center><img class="img-fluid" src="{{ url('admin/public/img/product/'.$category[0]->img8) }}" alt="<?php echo $category[0]->title; ?>"></center></div>
											<?php } if(!empty($category[0]->img9)) { ?>
											<div class="carousel-item"><center><img class="img-fluid" src="{{ url('admin/public/img/product/'.$category[0]->img9) }}" alt="<?php echo $category[0]->title; ?>"></center></div>
											<?php } if(!empty($category[0]->video)) { ?>
											<div class="carousel-item"><center><iframe width="100%" height="315" src="{{ $category[0]->video }}?autoplay=1"></iframe></center></div>				
											<?php } ?>
										</div>
										<?php 
											if(empty($category[0]->img1)) 
											{
												$i = 1;
											}
											elseif(empty($category[0]->img2))
											{
												$i = 2;
											}
											elseif(empty($category[0]->img3))
											{
												$i = 3;
											}
											elseif(empty($category[0]->img4))
											{
												$i = 4;
											}
											elseif(empty($category[0]->img5))
											{
												$i = 5;
											}
											elseif(empty($category[0]->img6))
											{
												$i = 6;
											}
											elseif(empty($category[0]->img7))
											{
												$i = 7;
											}
											elseif(empty($category[0]->img8))
											{
												$i = 8;
											}
											elseif(empty($category[0]->img9))
											{
												$i = 9;
											}
											else
											{
												$i = 10;
											}
										?>
										<div class="menu-wrapper loadAccessoryimagethumb">
											<ul class="menu" id="style-2">
												<li data-target="#carouselExampleControls" data-slide-to="0" class="active item"><img class="d-block w-100" src="{{ url('admin/public/img/product/'.$category[0]->img) }}"></li>
												<?php if(!empty($category[0]->img1)) { ?>
												<li data-target="#carouselExampleControls" data-slide-to="1" class="item"><img class="d-block w-100" src="{{ url('admin/public/img/product/'.$category[0]->img1) }}" alt=""></li>
												<?php } if(!empty($category[0]->img2)) { ?>
													<li data-target="#carouselExampleControls" data-slide-to="2" class="item"><img class="d-block w-100" src="{{ url('admin/public/img/product/'.$category[0]->img2) }}" alt=""></li>
												<?php } if(!empty($category[0]->img3)) { ?>
													<li data-target="#carouselExampleControls" data-slide-to="3" class="item"><img class="d-block w-100" src="{{ url('admin/public/img/product/'.$category[0]->img3) }}" alt=""></li>
												<?php } if(!empty($category[0]->img4)) { ?>
													<li data-target="#carouselExampleControls" data-slide-to="4" class="item"><img class="d-block w-100" src="{{ url('admin/public/img/product/'.$category[0]->img4) }}" alt=""></li>
												<?php } if(!empty($category[0]->img5)) { ?>
													<li data-target="#carouselExampleControls" data-slide-to="5" class="item"><img class="d-block w-100" src="{{ url('admin/public/img/product/'.$category[0]->img5) }}" alt=""></li>
												<?php } if(!empty($category[0]->img6)) { ?>
													<li data-target="#carouselExampleControls" data-slide-to="6" class="item"><img class="d-block w-100" src="{{ url('admin/public/img/product/'.$category[0]->img6) }}" alt=""></li>
												<?php } if(!empty($category[0]->img7)) { ?>
													<li data-target="#carouselExampleControls" data-slide-to="7" class="item"><img class="d-block w-100" src="{{ url('admin/public/img/product/'.$category[0]->img7) }}" alt=""></li>
												<?php } if(!empty($category[0]->img8)) { ?>
													<li data-target="#carouselExampleControls" data-slide-to="8" class="item"><img class="d-block w-100" src="{{ url('admin/public/img/product/'.$category[0]->img8) }}" alt=""></li>
												<?php } if(!empty($category[0]->img9)) { ?>
													<li data-target="#carouselExampleControls" data-slide-to="9" class="item"><img class="d-block w-100" src="{{ url('admin/public/img/product/'.$category[0]->img9) }}" alt=""></li>
												<?php } if(!empty($category[0]->video)) { ?>
													<li data-target="#carouselExampleControls" data-slide-to="<?php echo $i; ?>" class="item"><img class="d-block w-100" src="{{ url('/Content/image/video.jpg') }}" alt=""></li>
												<?php } ?>	
											</ul>				
											<div class="paddles">
												<a class="left-paddle paddle amenubtn"><img src="{{ url('/Content/image/left.png') }}" height="25px"></a>
												<a class="right-paddle paddle amenubtn"><img src="{{ url('/Content/image/right.png') }}" height="25px"></a>
											</div>
											<script>
    $(document).ready(function () {
        // Left arrow functionality
        $(".left-paddle").click(function () {
            $("#carouselExampleControls").carousel("prev");
        });

        // Right arrow functionality
        $(".right-paddle").click(function () {
            $("#carouselExampleControls").carousel("next");
        });
    });
</script>

										</div>
									</div>
								</div>
								<?php if(!empty($category[0]->broucher)) { ?>
								<div class="col-md-12 my-2">
									<a href="{{ url('admin/public/broucher/'.$category[0]->broucher) }}" class="btn btn-cardbutn  w-100" target="_blank"><!--<label class="mb-0 labtex text-white"></label>--><i class="fas fa-download"></i> {{ $category[0]->broname1 }}</a>
								</div>
								<?php } ?>
								<?php if(!empty($category[0]->broucher1)) { ?>
								
								<div class="col-md-12 my-2">
									<a href="{{ url('admin/public/broucher/'.$category[0]->broucher1) }}" class="btn btn-cardbutn w-100" target="_blank"><!--<label class="mb-0 labtex text-white">--><i class="fas fa-download"></i> {{ $category[0]->broname2 }}<!--</label>--></a>
								</div>
								<?php } ?>
								<?php if(!empty($category[0]->broucher2)) { ?>
								<div class="col-md-12 my-2">
									<a href="{{ url('admin/public/broucher/'.$category[0]->broucher2) }}" class="btn btn-cardbutn w-100" target="_blank"><!--<label class="mb-0 labtex text-white">--><i class="fas fa-download"></i> {{ $category[0]->broname3 }}<!--</label>--></a>
								</div>
								<?php } ?>
								<?php if(!empty($category[0]->pdf)) { ?>
								<div class="col-md-12 my-2">
									<a href="{{ url('admin/public/pdf/'.$category[0]->pdf) }}" class="btn btn-cardbutn w-100" target="_blank"><!--<label class="mb-0 labtex text-white">--><i class="fas fa-download"></i> {{ $category[0]->pdfname1 }}<!--</label>--></a>
								</div>
								<?php } ?>
								<?php if(!empty($category[0]->pdf1)) { ?>
								<div class="col-md-12 my-2">
									<a href="{{ url('admin/public/pdf/'.$category[0]->pdf1) }}" class="btn btn-cardbutn w-100" target="_blank"><!--<label class="mb-0 labtex text-white">--><i class="fas fa-download"></i> {{ $category[0]->pdfname2 }}<!--</label>--></a>
								</div>
								<?php } ?>
								<?php if(!empty($category[0]->pdf2)) { ?>
								<div class="col-md-12 my-2">
									<a href="{{ url('admin/public/pdf/'.$category[0]->pdf2) }}" class="btn btn-cardbutn w-100" target="_blank"><!--<label class="mb-0 labtex text-white">--><i class="fas fa-download"></i> {{ $category[0]->pdfname3 }}<!--</label>--></a>
								</div>
								<?php } ?>
								<?php  if(!empty($category[0]->video1)) { ?>
								<div class="col-md-12 my-2">
								    <a href="#videoss" class="btn btn-cardbutn w-100" style="background: #fbdc00;color: #58595b;font-weight: 600;font-size: 14px;">
							        <img src="{{ url('Content/image/watch.png') }}" height="18px"> Watch Videos
							        </a> 
							    </div>
							    <?php } ?>
							</div>
						</div>
						<!-- Rigth Side-->
						
						<div class="col-md-8">
							<div class="row">
								<div class="col-md-12">
									<label class="subtitle mb-0 euz_labsubti"><?php echo $category[0]->title; ?></label>
									<!--Image width:90px height:40px-->
									<?php if ($category[0]->brandoption=='image'){?>
										<?php if(!empty($category[0]->brandimg)) { ?>
									<label class="mb-0 float-right"><img src="{{ url('admin/public/img/product/'.$category[0]->brandimg) }}" id="" class="img-fluid euz_brimg"></label>
									<?php } } else if ($category[0]->brandoption=='text'){?>
										<?php if(!empty($category[0]->brandtext)) { ?>
									<label class="mb-0 euz_bold float-right euz_brtext"><?php echo $category[0]->brandtext;?></label>
									<?php } }?>
									
									<p class="text-dark text-justify lineh27 mt-4 divproductDetails"><?php echo $category[0]->description; ?></p>
									
									 <?php if(!empty($category[0]->imgtdde)) { ?>
									    <img class="img-fluid w-100"" src="{{ url('admin/public/img/product/'.$category[0]->imgtdde) }}" alt="<?php echo $category[0]->title; ?>">
									     <br><br>
									    <?php } //else {?>
									
									
									
								</div>
							</div>
							<div class="row my-4">
								<?php if(!empty($category[0]->features)) { ?>
								<div class="col-md-12">
									<div class="m-0 colladetailopen mt-1 collapsequestion collapsed bgdetailproduct" data-toggle="collapse" data-target="#features" aria-expanded="true">
										Product Features
										<span class="collapsed"><b><i class="fas fa-plus float-right pt-1"></i></b></span><span class="expanded"><b><i class="fas fa-minus float-right pt-1"></i></b></span>
									</div>
									<div id="features" class="p-3 collapsedetail collapse bg-light show" style="">
									     <?php if(!empty($category[0]->imgtdfe)) { ?>
									    <img class="img-fluid w-100"" src="{{ url('admin/public/img/product/'.$category[0]->imgtdfe) }}" alt="<?php echo $category[0]->title; ?>">
									     <br><br>
									    <?php } ?>
									    
										<p class="text-dark text-justify lineh27 mt-4"><?php echo $category[0]->features; ?></p>
									</div>
								</div>
								<?php } if(!empty($category[0]->specification)) { ?>
								<div class="col-md-12">
									<div class="m-0 colladetailopen mt-1 collapsequestion collapsed bgdetailproduct" data-toggle="collapse" data-target="#specification" aria-expanded="false">
										Product Specification
										<span class="collapsed"><b><i class="fas fa-plus float-right pt-1"></i></b></span><span class="expanded"><b><i class="fas fa-minus float-right pt-1"></i></b></span>
									</div>
									<div id="specification" class="p-3 collapsedetail collapse bg-light" style="">
										<p class="text-dark text-justify lineh27 mt-4"><?php echo $category[0]->specification; ?></p>
									</div>
								</div>
								<?php } if(!empty($category[0]->optional)) { ?>
								<div class="col-md-12">
									<div class="m-0 colladetailopen mt-1 collapsequestion collapsed bgdetailproduct" data-toggle="collapse" data-target="#optional" aria-expanded="false">
										Product Optional
										<span class="collapsed"><b><i class="fas fa-plus float-right pt-1"></i></b></span><span class="expanded"><b><i class="fas fa-minus float-right pt-1"></i></b></span>
									</div>
									<div id="optional" class="p-3 collapsedetail collapse bg-light" style="">
										<p class="text-dark text-justify lineh27 mt-4"><?php echo $category[0]->optional; ?></p>
									</div>
								</div>
								<?php } if(!empty($category[0]->data) || !empty($category[0]->imgtd)) { ?>
								<div class="col-md-12" style="display: block;">
									<div class="m-0 colladetailopen mt-1 collapsequestion collapsed bgdetailproduct" data-toggle="collapse" data-target="#technical" aria-expanded="false">
										Technical Data
										<span class="collapsed"><b><i class="fas fa-plus float-right pt-1"></i></b></span><span class="expanded"><b><i class="fas fa-minus float-right pt-1"></i></b></span>
									</div>
									<div id="technical" class="p-3 collapsedetail bg-light table-responsive collapse">
									    <?php if(!empty($category[0]->imgtd)) { ?>
									    <img class="img-fluid w-100" src="{{ url('admin/public/img/product/'.$category[0]->imgtd) }}" alt="<?php echo $category[0]->title; ?>">
									     <br><br>
									    <?php } //else {?>
									    <!--<img src="http://abletools.com.cy/admin/public/img/img.jpg" class="img-fluid w-100">-->
									    <?php //} ?>
									    
									   
									    <?php echo $category[0]->data; ?></div>                            
								</div>
								<?php } if(!empty($category[0]->acc1)) { ?>
								<div class="col-md-12 divAccessory">
									<div class="m-0 colladetailopen mt-1 collapsequestion collapsed bgdetailproduct" data-toggle="collapse" data-target="#accessories" aria-expanded="false">
										Accessories
										<span class="collapsed"><b><i class="fas fa-plus float-right pt-1"></i></b></span><span class="expanded"><b><i class="fas fa-minus float-right pt-1"></i></b></span>
									</div>
									<div id="accessories" class="p-3 collapsedetail collapse bg-light" style="">
									   <!--<div class="row">
									        <div class="col-md-4">
									            <img class="d-block w-90 img-fluid" src="{{ url('admin/public/img/product/'.$category[0]->acc2) }}" alt="<?php echo $category[0]->title; ?>">
									         </div>
									        <div class="col-md-8">
									            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
									        </div>
									    </div>-->
										<div class="col-md-12">
											<div id="carouselExampleControls2" class="carousel slide carousel-fade loadAccessoryimage" data-ride="carousel" data-interval="4000">
												<!---<ul class="carousel-indicators">
												    <?php if(!empty($category[0]->acc1)) { ?>
													<li data-target="#carouselExampleControls2" data-slide-to="0" class="active" style="border-radius: 50%;height: 10px;width: 10px;box-shadow: 0 0 4px black;margin: 0 0.5em;"></li>
													<?php } if(!empty($category[0]->acc2)) { ?>
													<li data-target="#carouselExampleControls2" data-slide-to="1" style="border-radius: 50%;height: 10px;width: 10px;box-shadow: 0 0 4px black;margin: 0 0.5em;"></li>
													<?php } if(!empty($category[0]->acc3)) { ?>
													<li data-target="#carouselExampleControls2" data-slide-to="2" style="border-radius: 50%;height: 10px;width: 10px;box-shadow: 0 0 4px black;margin: 0 0.5em;"></li>
													<?php } if(!empty($category[0]->acc4)) { ?>
													<li data-target="#carouselExampleControls2" data-slide-to="3" style="border-radius: 50%;height: 10px;width: 10px;box-shadow: 0 0 4px black;margin: 0 0.5em;"></li>
													<?php } if(!empty($category[0]->acc5 )) { ?>
													<li data-target="#carouselExampleControls2" data-slide-to="4" style="border-radius: 50%;height: 10px;width: 10px;box-shadow: 0 0 4px black;margin: 0 0.5em;"></li>
													<?php } ?>
												</ul>-->
												<div class="carousel-inner">
												    <div class="carousel-item active "><center><img class="d-block w-90 img-fluid" src="{{ url('admin/public/img/product/'.$category[0]->acc1) }}" alt="<?php echo $category[0]->title; ?>"></center><?php echo $category[0]->assdesc1; ?></div>
												    <?php if(!empty($category[0]->acc2)) { ?>
													<div class="carousel-item <?php if(empty($category[0]->acc3)) { ?>carousel-item-next carousel-item-left<?php } ?>"><center><img class="d-block w-90 img-fluid" src="{{ url('admin/public/img/product/'.$category[0]->acc2) }}" alt="<?php echo $category[0]->title; ?>"></center><?php echo $category[0]->assdesc2; ?></div>
												    <?php } if(!empty($category[0]->acc3)) { ?>
													<div class="carousel-item <?php if(empty($category[0]->acc4)) { ?>carousel-item-next carousel-item-left<?php } ?>"><center><img class="d-block w-90 img-fluid" src="{{ url('admin/public/img/product/'.$category[0]->acc3) }}" alt="<?php echo $category[0]->title; ?>"></center><?php echo $category[0]->assdesc3; ?></div>
													<?php } if(!empty($category[0]->acc4)) { ?>
													<div class="carousel-item <?php if(empty($category[0]->acc5)) { ?>carousel-item-next carousel-item-left<?php } ?>"><center><img class="d-block w-90 img-fluid" src="{{ url('admin/public/img/product/'.$category[0]->acc4) }}" alt="<?php echo $category[0]->title; ?>"></center><?php echo $category[0]->assdesc4; ?><!--Lorem Ipsum is simply dummy text--></div>
													<?php } if(!empty($category[0]->acc5)) { ?>
													<div class="carousel-item "><center><img class="d-block w-90 img-fluid" src="{{ url('admin/public/img/product/'.$category[0]->acc5) }}" alt="<?php echo $category[0]->title; ?>"></center><?php echo $category[0]->assdesc5; ?></div>
													<?php } ?>
												</div>
											</div>											
											<div class="menu-wrapper loadAccessoryimagethumb">
												<ul class="menu" id="style-2">
												    <?php if(!empty($category[0]->acc1)) { ?>
													<li data-target="#carouselExampleControls2" data-slide-to="0" class="active item"><img class="d-block w-100" src="{{ url('admin/public/img/product/'.$category[0]->acc1) }}" alt="<?php echo $category[0]->title; ?>" ></li>
													<?php } if(!empty($category[0]->acc2)) { ?>
													<li data-target="#carouselExampleControls2" data-slide-to="1" class="item"><img class="d-block w-100" src="{{ url('admin/public/img/product/'.$category[0]->acc2) }}" alt="<?php echo $category[0]->title; ?>"></li>
													<?php } if(!empty($category[0]->acc3)) { ?>
													<li data-target="#carouselExampleControls2" data-slide-to="2" class="item"><img class="d-block w-100" src="{{ url('admin/public/img/product/'.$category[0]->acc3) }}" alt="<?php echo $category[0]->title; ?>"></li>
													<?php } if(!empty($category[0]->acc4)) { ?>
													<li data-target="#carouselExampleControls2" data-slide-to="3" class="item"><img class="d-block w-100" src="{{ url('admin/public/img/product/'.$category[0]->acc4) }}" alt="<?php echo $category[0]->title; ?>"></li>
													<?php } if(!empty($category[0]->acc5)) { ?>
													<li data-target="#carouselExampleControls2" data-slide-to="4" class="item"><img class="d-block w-100" src="{{ url('admin/public/img/product/'.$category[0]->acc5) }}" alt="<?php echo $category[0]->title; ?>"></li>
													<?php } ?>
												</ul>												
												<div class="paddles">
													<a class="left-paddle paddle amenubtn"><img src="{{ url('Content/image/left.png') }}" height="25px"></a>
													<a class="right-paddle paddle amenubtn"><img src="{{ url('Content/image/right.png') }}" height="25px"></a>
												</div>
											</div>
										</div>
									</div>
								</div>
								<?php } ?>
								<div class="col-md-12 mt-3" id="videoss" style="height:50px;"> </div>
                                <div class="col-md-12 mt-3">                      
                                    <?php  if(!empty($category[0]->video1)) { ?>
                                    <h5 class="font-weight-bold mb-3" style="border-bottom: #fbdc00 solid 1px;padding: 5px;font-size: 20px;">Videos</h5>
                                	<?php } ?>
                                	<?php if(!empty($category[0]->video1)) { ?>
                                	<div class="row">
                                		<div class="col-md-4">
                                			<div class="card rounded-0 bg_br curs" data-toggle="modal" data-target="#one1">
                                				<div class=""><img src="<?php echo url('/admin/public/img/product/'.$category[0]->videoimg1); ?>" class="img-fluid w-100"><div class="play"></div></div>
                                			</div>
                                		</div>
                                	    <?php } if(!empty($category[0]->video2)) { ?>
                                		<div class="col-md-4">
                                			<div class="card rounded-0 bg_br curs" data-toggle="modal" data-target="#one2">
                                				<div class=""><img src="<?php echo url('/admin/public/img/product/'.$category[0]->videoimg2); ?>" class="img-fluid w-100"><div class="play"></div></div>
                                			</div>
                                		</div>
                                    	<?php } if(!empty($category[0]->video3)) { ?>
                                		<div class="col-md-4">
                                			<div class="card rounded-0 bg_br curs" data-toggle="modal" data-target="#one3">
                                				<div class=""><img src="<?php echo url('/admin/public/img/product/'.$category[0]->videoimg3); ?>" class="img-fluid w-100"><div class="play"></div></div>
                                			</div>
                                		</div>
                                	    <?php } if(!empty($category[0]->video4)) { ?>
                                		<div class="col-md-4">
                                			<div class="card rounded-0 bg_br curs" data-toggle="modal" data-target="#one4">
                                				<div class=""><img src="<?php echo url('/admin/public/img/product/'.$category[0]->videoimg4); ?>" class="img-fluid w-100"><div class="play"></div></div>
                                			</div>
                                		</div>
                                	    <?php } if(!empty($category[0]->video5)) { ?>
                                		<div class="col-md-4">
                                			<div class="card rounded-0 bg_br curs" data-toggle="modal" data-target="#one5">
                                				<div class=""><img src="<?php echo url('/admin/public/img/product/'.$category[0]->videoimg5); ?>" class="img-fluid w-100"><div class="play"></div></div>
                                			</div>
                                		</div>
                                	    <?php } if(!empty($category[0]->video6)) { ?>
                                		<div class="col-md-4">
                                			<div class="card rounded-0 bg_br curs" data-toggle="modal" data-target="#one6">
                                				<div class=""><img src="<?php echo url('/admin/public/img/product/'.$category[0]->videoimg6); ?>" class="img-fluid w-100"><div class="play"></div></div>
                                			</div>
                                		</div>
                                	    <?php } if(!empty($category[0]->video7)) { ?>
                                		<div class="col-md-4">
                                			<div class="card rounded-0 bg_br curs" data-toggle="modal" data-target="#one7">
                                				<div class=""><img src="<?php echo url('/admin/public/img/product/'.$category[0]->videoimg7); ?>" class="img-fluid w-100"><div class="play"></div></div>
                                			</div>
                                		</div>
                                	    <?php } if(!empty($category[0]->video8)) { ?>
                                		<div class="col-md-4">
                                			<div class="card rounded-0 bg_br curs" data-toggle="modal" data-target="#one8">
                                				<div class=""><img src="<?php echo url('/admin/public/img/product/'.$category[0]->videoimg8); ?>" class="img-fluid w-100"><div class="play"></div></div>
                                			</div>
                                		</div>
                                	</div>
                                	<?php } ?>
                                </div>
                                <?php if(!empty($category[0]->video1)) { ?>
                                <div class="modal" id="one1">
                                  <div class="modal-dialog modal-lg modal-dialog-centered">
                                    <div class="modal-content">
                                		<div class="modal-body">
                                			<iframe width="100%" height="500" src="<?php echo $category[0]->video1; ?>" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" autoplay=1" allowfullscreen=""></iframe>
                                		</div>
                                		<div class="modal-footer">
                                			<button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                                		</div>
                                    </div>
                                  </div>
                                </div>
                                <?php } if(!empty($category[0]->video2)) { ?>
                                <div class="modal" id="one2">
                                  <div class="modal-dialog modal-lg modal-dialog-centered">
                                    <div class="modal-content">
                                		<div class="modal-body">
                                			<iframe width="100%" height="500" src="<?php echo $category[0]->video2; ?>" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
                                		</div>
                                		<div class="modal-footer">
                                			<button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                                		</div>
                                    </div>
                                  </div>
                                </div>
                                <?php } if(!empty($category[0]->video3)) { ?>
                                <div class="modal" id="one3">
                                  <div class="modal-dialog modal-lg modal-dialog-centered">
                                    <div class="modal-content">
                                		<div class="modal-body">
                                			<iframe width="100%" height="500" src="<?php echo $category[0]->video3; ?>" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
                                		</div>
                                		<div class="modal-footer">
                                			<button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                                		</div>
                                    </div>
                                  </div>
                                </div>
                                <?php } if(!empty($category[0]->video4)) { ?>
                                <div class="modal" id="one4">
                                  <div class="modal-dialog modal-lg modal-dialog-centered">
                                    <div class="modal-content">
                                		<div class="modal-body">
                                			<iframe width="100%" height="500" src="<?php echo $category[0]->video4; ?>" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
                                		</div>
                                		<div class="modal-footer">
                                			<button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                                		</div>
                                    </div>
                                  </div>
                                </div>
                                <?php } if(!empty($category[0]->video5)) { ?>
                                <div class="modal" id="one5">
                                  <div class="modal-dialog modal-lg modal-dialog-centered">
                                    <div class="modal-content">
                                		<div class="modal-body">
                                			<iframe width="100%" height="500" src="<?php echo $category[0]->video5; ?>" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
                                		</div>
                                		<div class="modal-footer">
                                			<button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                                		</div>
                                    </div>
                                  </div>
                                </div>
                                <?php } if(!empty($category[0]->video6)) { ?>
                                <div class="modal" id="one6">
                                  <div class="modal-dialog modal-lg modal-dialog-centered">
                                    <div class="modal-content">
                                		<div class="modal-body">
                                			<iframe width="100%" height="500" src="<?php echo $category[0]->video; ?>" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
                                		</div>
                                		<div class="modal-footer">
                                			<button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                                		</div>
                                    </div>
                                  </div>
                                </div>
                                <?php } if(!empty($category[0]->video7)) { ?>
                                <div class="modal" id="one7">
                                  <div class="modal-dialog modal-lg modal-dialog-centered">
                                    <div class="modal-content">
                                		<div class="modal-body">
                                			<iframe width="100%" height="500" src="<?php echo $category[0]->video7; ?>" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
                                		</div>
                                		<div class="modal-footer">
                                			<button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                                		</div>
                                    </div>
                                  </div>
                                </div>
                                <?php } if(!empty($category[0]->video8)) { ?>
                                <div class="modal" id="one8">
                                  <div class="modal-dialog modal-lg modal-dialog-centered">
                                    <div class="modal-content">
                                		<div class="modal-body">
                                			<iframe width="100%" height="500" src="<?php echo $category[0]->video8; ?>" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
                                		</div>
                                		<div class="modal-footer">
                                			<button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                                		</div>
                                    </div>
                                  </div>
                                </div>
                                <?php } ?>
							</div>
							 <!-- Enquiry Button -->
            <div class="col-md-12 mt-3">
                <a href="#" class="btn btn-cardbutn float-right" data-toggle="modal" data-target="#EnquiryProduct">
                    Enquiry Product
                </a>
            </div>
						

            
           

            <!-- Enquiry Form Modal -->
            <div class="modal fade" id="EnquiryProduct" tabindex="-1" role="dialog" aria-labelledby="EnquiryProductLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 id="EnquiryProductLabel" class="modal-title">Enquiry Product</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close" style="outline: none;">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <!-- Enquiry Form -->
                        <form id="enquiryForm">
                            @csrf
                            <div class="modal-body">
                                <div class="row">
                                    <!-- Form Fields -->
                                    <div class="form-group col-lg-6 col-md-6">
                                        <label for="about">Enquiry About</label>
                                        <input type="text" class="form-control" name="about" required value="{{ $category[0]->title }}" />
                                    </div>
                                    <div class="form-group col-lg-6 col-md-6">
                                        <label for="name">Name</label>
                                        <input type="text" class="form-control" name="name" required />
                                    </div>
                                    <div class="form-group col-lg-6 col-md-6">
                                        <label for="email">Email</label>
                                        <input type="email" class="form-control" name="email" required />
                                    </div>
                                    <div class="form-group col-lg-6 col-md-6">
                                        <label for="address">Address</label>
                                        <input type="text" class="form-control" name="address" required />
                                    </div>
                                    <div class="form-group col-lg-6 col-md-6">
                                        <label for="city">City</label>
                                        <input type="text" class="form-control" name="city" required />
                                    </div>
                                    <div class="form-group col-lg-6 col-md-6">
                                        <label for="postcode">Postal Code</label>
                                        <input type="text" class="form-control" name="postcode" required />
                                    </div>
                                    <div class="form-group col-lg-6 col-md-6">
                                        <label for="tel">Telephone</label>
                                        <input type="text" class="form-control" name="tel" required onkeypress="return isNumberKey(event)" />
                                    </div>
                                    <div class="form-group col-lg-12 col-md-12">
                                        <label for="msg">Message</label>
                                        <textarea name="msg" class="form-control" rows="5"></textarea>
                                    </div>
                                </div>
                            </div>
                            <!-- Modal Footer with Buttons -->
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal" style="outline: none;">Cancel</button>
                                <button type="submit" class="btn btn-primary" id="btnSubmit">Submit</button>
                            </div>
                        </form>

                        <!-- Success Message -->
                        <div id="successMessage" class="alert alert-success" style="display: none; margin: 0;">
                            Your enquiry has been submitted!
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    </div> </div></div>@include('footer') 
   
   
    <!-- AJAX Submission Script -->
    <script>
        $(document).ready(function () {
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });

            $('#enquiryForm').on('submit', function (e) {
                e.preventDefault(); // Prevent default form submission

                $.ajax({
                    url: '{{ url("/enquiry") }}', // Ensure this route is correct
                    type: 'POST',
                    data: $(this).serialize(),
                    success: function (response) {
                        $('#successMessage').show(); // Display success message
                        $('#enquiryForm')[0].reset(); // Reset form fields
                        setTimeout(function() {
                            $('#EnquiryProduct').modal('hide'); // Close modal
                            $('#successMessage').hide(); // Hide success message
                        }, 3000);
                    },
                    error: function (xhr, status, error) {
                        console.error("Error Status:", status);
                        console.error("XHR Object:", xhr);
                        console.error("Error:", error);
                        alert('An error occurred. Please try again.');
                    }
                });
            });
        });

        function isNumberKey(evt) {
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            return !(charCode > 31 && (charCode < 48 || charCode > 57));
        }
    </script>
</body>
</html>
