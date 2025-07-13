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
			<div class="container-fluid">				
				<div class="row toploginuser">
					@if(session()->has('reg'))
						<div class="col-md-12">						
							<div class="alert alert-success">
								{{ session()->get('reg') }}
							</div>						
						</div>
					@endif
					@if(session()->has('regfail'))
					<div class="col-md-12">						
						<div class="alert alert-danger">
							{{ session()->get('regfail') }}
						</div>						
					</div>
					@endif
					@if(session()->has('logfail'))
					<div class="col-md-12">						
						<div class="alert alert-danger">
							{{ session()->get('logfail') }}
						</div>						
					</div>
					@endif
					<div class="offset-lg-4 col-lg-4 offset-md-3 col-md-6">
						<form class="" method="post" action="{{ url('/log') }}">
							{{ csrf_field() }}
							<div class="border p-4 bg-white invh">
								<center><img src="Content/image/mascot.png" class="image-fluid"></center>
								<hr>
								<div class="input-group">
									<input type="email" class="form-control" placeholder="Username" id="" name="name" required />
								</div>
								<div class="input-group mt-3">
									<input type="password" class="form-control" placeholder="Password" id="" name="pass" required />
								</div>
								<button type="submit" class="btn btn-customlogin text-white mt-3" style="width:100%;padding: 8px;" name="submit">Login</button>
								<br /><br />
								<center>
									<a href="#" class="h3print" data-toggle="modal" data-target="#newaccount">Create a new account</a><br>
								
								<a href="{{ url('/forget') }}" class="">Forgot Password</a></center>
							</div>
						</form>
					</div>
				</div>
			</div>
			@include('logreg')
		</div>	
	</div>
	@include('footer') 
    <script>
		$(function () {
			$(".anavelink").css({ "color": "#58595b" });
			$("#Userlogin").css({ "color": "#fbdc00", "border-bottom": "#fbdc00 solid 5px", "font-weight": "600" });
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



