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
</head>
<body>	
	@include('header') 
	<div class="body">
		<div class="container-fluid">
			<div class="row">
				<div class="col-md-12 p-0 euz_mt_top_25">
					<img id="imgachievement" class="img-fluid w-100" alt="alttext" src="{{ url('/Content/image/Img_636933285684400000.jpg') }}">
				</div>
			</div>
			<div class="row">
				<div class="container">
					<div class="row my-5 py-3">
						<div class="col-md-12 mb-3">
							<h2 class="font-weight-bold">Achievements</h2><hr>
						</div>
						<div class="row divachieve">
							<?php foreach($categories as $category) { ?>
							<div class="col-md-3 my-3">
								<div class="card">
									<img src="{{ url('admin/public/img/page/'.$category->img) }}" class="img-fluid card-img-top">
									<div class="card-block p-3">
										<h5 class="card-title font-weight-bold"><?php echo $category->title; ?></h5>
										<p class="text-dark text-justify lineh27"><?php echo substr($category->description, 0, 150); ?>...</p>
										<a href="{{ url('/achivement/'.$category->id) }}" class="btn btn-customcard">more info</a>
									</div>
								</div>
							</div>
							<?php } ?>							
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	@include('footer') 
	<script>
		$(function () {
			$(".anavelink").css({ "color": "#676767", "font-weight": "600" });
		});
	</script>	
</body>
</html>



