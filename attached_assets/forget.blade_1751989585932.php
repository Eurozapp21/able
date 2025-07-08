<?php 
	$username = session()->get('name'); 
    if(!empty($username))
	{
		header('Location:'.url('/profile'));
		exit;
	}
?>
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
			<div class="container-fluid" style="background-color: rgba(174, 194, 218, 0.67">				
				<div class="row toploginuser">
					<div class="offset-lg-4 col-lg-4 offset-md-3 col-md-6">
						<form class="" method="post" action="{{ url('/forgetpass') }}">
							{{ csrf_field() }}
							<div class="border p-4 bg-white invh">
								<center>Forgot Password</center>
								<hr>
								<div class="input-group">
									<input type="email" class="form-control" placeholder="Enter Your Email" id="" name="name" required />
								</div>
								<button type="submit" class="btn btn-customlogin text-white mt-3" style="width:100%;padding: 8px;" name="submit">Submit</button>
								<br /><br />
							</div>
						</form>
					</div>
				</div>
			</div>
		{{---@include('logreg')---}}
		</div>	
	</div>
	@include('footer') 
    <script>
		$(function () {
			$(".anavelink").css({ "color": "#58595b" });
			$("#Userlogin").css({  "color": "#fbdc00", "border-bottom": "#fbdc00 solid 5px", "font-weight": "600" });
		});
    </script>
	<style>
		.pad1530
		{
			padding: 15px 30px;
		}
		.modal-footer
		{
			float: right;
			width: 100%;
		}
	</style>
</body>
</html>



