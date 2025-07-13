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
		<div>
			<div class="container">
				<div class="row">
					<div class="col-md-12 p-0 euz_mt_top_25">
						<img src="<?php echo url('/admin/public/img/blog/'.$blog[0]->featured_image); ?>" class="img-fluid w-100">
					</div>
				</div>
			</div>
			<div class="container fullbor">
				<div class="row mt-5">
					<div class="col-md-12">
						<ol class="breadcrumb bgdetailproduct">
							<li class="breadcrumb-item"><a class="font-weight-bold text-white" href="{{ url('/Events') }}">News</a></li>
							<li class="breadcrumb-item active"><span class="txt_ylo"><?php echo $blog[0]->name; ?></span></li>
						</ol>
					</div>
					<div class="col-md-12">
						<h3 class="font-weight-bold"><?php echo $blog[0]->name; ?><br>
							<span class="txt_ylo ng-binding"><?php echo date("d M Y", strtotime($blog[0]->publish_datetime)); ?></span>
						</h3>
						<p class="text-dark text-justify lineh27 mt-4 pnews">
							<span style="color: rgb(52, 58, 64); font-family: arial, sans-serif; font-size: 15px; text-align: justify;"><?php echo $blog[0]->content; ?></span>
						</p>
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



