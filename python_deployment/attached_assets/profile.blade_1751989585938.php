<?php 
	$username = session()->get('name'); 
    if(empty($username))
	{
		header('Location:'.url('/userlogin'));
		exit;
	}
?>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
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
			<div class="row mt-5 pt-5">
				<div class="col-lg-12 col-md-4"><h3 class="font-weight-bold">Your Profile</h3></div>
				<div class="col-md-12"><hr></div>
			</div>
			<form class="row border p-3 bgn" method="post" action="{{ url('/profileedit') }}">
				{{ csrf_field() }}
				<div class="form-group col-lg-6 col-md-6">
					<label for="">First Name</label>
					<input type="text" class="form-control" id="" name="fname" value="<?php echo $users[0]->fname; ?>" />
				</div>
				<div class="form-group col-lg-6 col-md-6">
					<label for="">Last Name</label>
					<input type="text" class="form-control" id="" name="lname" value="<?php echo $users[0]->lname; ?>" />
				</div>
				<div class="form-group col-lg-6 col-md-6">
					<label for="">Email</label>
					<input type="email" class="form-control" id="" name="email" value="<?php echo $users[0]->email; ?>" />
				</div>
				<div class="form-group col-lg-6 col-md-6">
					<label for="">Phone Number</label>
					<input type="text" class="form-control" id="" name="phone" value="<?php echo $users[0]->phone; ?>" />
				</div>
				<div class="form-group col-lg-6 col-md-6">
					<label for="">Country</label>
					<input type="text" class="form-control" id="" name="country" value="<?php echo $users[0]->country; ?>" />
				</div>
				<div class="form-group col-lg-6 col-md-6">
					<label for="">Address</label>
					<input type="text" class="form-control" id="" name="address" value="<?php echo $users[0]->address; ?>" />
				</div>
				<div class="form-group col-lg-6 col-md-6">
					<label for="">Postal Code</label>
					<input type="text" class="form-control" id="" name="postcode" value="<?php echo $users[0]->postcode; ?>" />
				</div>
				<div class="form-group col-lg-12 col-md-12">
					<input type="submit" class="btn btn-cardbutn" value="Submit">
				</div>
			</form>
			<div class="row  mt-5">
				<div class="col-lg-12 col-md-4"><h3 class="font-weight-bold">Change Your Password</h3></div>
				<div class="col-md-12"><hr></div>
			</div>
			<form class="row mb-5 border p-3 bgn ng-pristine ng-valid" method="post" action="{{ url('/updatepass') }}">
				{{ csrf_field() }}
				<div class="form-group col-lg-6 col-md-6">
					<label for="">UserName</label>
					<input type="text" class="form-control" id="" value="<?php echo $users[0]->email; ?>" disabled />
				</div>
				<div class="form-group col-lg-6 col-md-6">
					<label for="">Current Password</label>
					<input type="password" class="form-control" id="" value="<?php echo $users[0]->pass; ?>" disabled />
				</div>
				<div class="form-group col-lg-6 col-md-6">
					<label for="">New Password</label>
					<input type="password" class="form-control" id="txtPassword" name="pass" required />
				</div>
				<div class="form-group col-lg-6 col-md-6">
					<label for="">Re-Enter Password</label>
					<input type="password" class="form-control" id="txtConfirmPassword" name="conpass" required />
				</div>
				<div class="form-group col-lg-12 col-md-12">
					<input type="submit" class="btn btn-cardbutn" id="btnSubmit" value="Submit"  />
				</div>
			</form>
		</div>	
	</div>
	@include('footer') 
    <script>
		$(function () {
			$(".anavelink").css({ "color": "#58595b" });
			$("#Userlogin").css({ "color": "#fbdc00", "border-bottom": "#fbdc00 solid 5px", "font-weight": "600" });
		});
		$(function () {
			$("#btnSubmit").click(function () {
				var password = $("#txtPassword").val();
				var confirmPassword = $("#txtConfirmPassword").val();
				if (password != confirmPassword) {
					alert("Passwords do not match.");
					return false;
				}
				return true;
			});
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



