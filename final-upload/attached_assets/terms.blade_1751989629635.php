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
                    <img alt="Privacy" class="img-fluid w-100" src="<?php echo url('/admin/public/img/page/'.$privacy[0]->img); ?>">
                </div>
            </div>
            <div class="row">
                <div class="container">
                    <div class="row my-5">
                        <div class="col-md-12">
                            <h1 class="font-weight-bold mt-5">Terms and Conditions</h1><hr />                           
                            <?php echo $privacy[0]->description; ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
	</div>
	@include('footer') 	
    <script>       
		$(function () {
			$(".anavelink").css({ "color": "#58595b" });			
		});
    </script>	
</body>
</html>



