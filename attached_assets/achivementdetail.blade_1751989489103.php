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
		<div class="container">
			<div class="row">
				<div class="col-md-12 p-0 euz_mt_top_25">
					<img id="imgachievementbanner" class="img-fluid w-100" src="{{ url('admin/public/img/page/'.$category[0]->bannerimg) }}">
				</div>
			</div>
			<div class="row">
				<div class="container">
					<div class="row my-5">
						<div class="col-md-12">
							<nav aria-label="breadcrumb">
								<ol class="breadcrumb">
									<li class="breadcrumb-item"><a href="{{ url('/achivementall') }}">Achievement</a></li>
									<li class="breadcrumb-item active"><?php echo $category[0]->title; ?></li>
								</ol>
							</nav>
						</div>
						<div class="col-md-12">
							<h3 class="font-weight-bold mt-4"><?php echo $category[0]->title; ?></h3><hr>
							<p class="texp text-justify lineh27"><?php echo $category[0]->description; ?></div></p>
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



