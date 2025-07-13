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
				<!--<div class="col-md-12 p-0 euz_mt_top_25">
					<iframe width="100%" height="450" frameborder="0" style="border:0" allowfullscreen="" src="{{ $settings[0]->map }}"></iframe>
				</div>-->
				<div class="col-md-12 euz_fortempbanner p-0">
		            <div class="container">
		                <div class="row">
		                    <div class="col-md-12">
		                        <h1 class="font-weight-bold text-white euz_con">Contact Us</h1>
		                    </div>
		                </div>
		            </div>
		        </div>
			</div>
			<div class="col-md-12">
				@if(session()->has('quote'))
					<div class="alert alert-success">
						{{ session()->get('quote') }}
						{{{ $errors->first('quote') }}}
					</div>
				@endif
			</div>
			<div class="row">
				<div class="container">
					<div class="row my-5">
						<div class="col-md-7">
							<form method="post" action="{{ url('/sendcontact') }}" class="row">
								{{ csrf_field() }}
								<!--<div class="input-group">
									<input type="text" class="form-control f3" placeholder="First Name" id="" name="fname" />
									<input type="text" class="form-control f3" placeholder="Last Name" id="" name="lname" /><br />                           
								</div>-->
								<div class="form-group col-md-6">
								    <label>Your First Name *</label>
									<input type="text" class="form-control f3 rounded-0" placeholder="First Name" id="fname" name="fname" required value="{{ session()->get('fname') }}" />                           
								</div>
								<div class="form-group col-md-6">
								    <label>Your Last Name *</label>
									<input type="text" class="form-control f3 rounded-0" placeholder="Last Name" id="lname" name="lname" required value="{{ session()->get('lname') }}" />                       
								</div>
								<!--<div class="form-group mt-3 col-md-12">
								    <label>Subject *</label>
									<select class="form-control rounded-0" id="" name="subject" >
										<option value="">--Select Subject--</option>
										<option value="Customer Service">Εξυπηρέτηση πελατών</option>
										<option value="Webmaster">Webmaster</option>
									</select>
								</div>-->
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
								    	<input type="hidden" class="form-control f3 rounded-0" placeholder="Your Phone Number" id="refresh" name="refresh" required value=0>
									<input type="submit" class="btn btn-customslider rounded-0" value="Submit" style="width: 200px;padding: 10px;">
								</div>
								
							</form>
						</div>
						<div class="col-md-5 bg-light p-4">
							<h2 class="font-weight-bold mb-3">Address</h2><hr />
							<ul class="ulcontact pl-0" style="font-size:16px;">
								<li style="line-height: 26px;" class="ng-binding">{{ $settings[0]->company_address }}</li>
								<li class="ng-binding"><b>Email : </b>{{ $settings[0]->from_email }}</li>
								<li class="ng-binding"><b>Phone : </b>{{ $settings[0]->company_contact }}</li>
								<li class="ng-binding"><b>Fax : </b>{{ $settings[0]->fax }}</li>
							</ul>
							<hr />
							<iframe width="100%" height="280" frameborder="0" style="border:0" allowfullscreen="" src="{{ $settings[0]->map }}"></iframe>
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
			$("#Contact").css({ "color": "#fbdc00", "border-bottom": "#fbdc00 solid 5px", "font-weight": "600"});
		});
		
		
	

function reload()
{
	//alert("hai");
	$('#refresh').val(1);
	$('#fname').prop('required',false);
	$('#lname').prop('required',false);
		$('#tel').prop('required',false);
		$('#email').prop('required',false);
		$('#subject').prop('required',false);
			$('#msg').prop('required',false);
			$("#capresptext").prop('required',false);
//img=document.getElementById("capt");
//location.reload(true);
//$( "#here" ).load("#here");
//$("#here").innerHTML('2');
//alert(n1);
//img=$(".ct");
//img.src="captcha.php";
//img.src="<?php echo url('/image/doc/captcha.php'); ?>";


//var htm='<p><img src="<?php echo url('/public/upload/captcha.php'); ?>" id="capt" class="ct" >&nbsp;</p><p><input type="text" name="g-recaptcha-response"  > ';
//$('#custom_captcha').html(htm);
/*name = $('#name').val();
        email = $('#email').val();
        mobile_number = $('#mobile_number').val();
        subject = $('#subject').val();
        message = $('#message').val();*/

        /*$.ajax({
          url: "/sendcontact",
          type:"POST",
          data:{
            "_token": "{{ csrf_token() }}",
            refresh:1,
          
          },
          success:function(response){
            console.log(response);
          },
         });*/









}
 
$(document).ready(function(){
 //var n1=$("#n1").val();
 //$("#n1").val(n1);

 
var htm='<p><img src="<?php echo url('public/upload/captcha.php'); ?>" id="capt">&nbsp;<input width="30" height="30" type="image" src="<?php echo url('public/upload/reload.png'); ?>" onClick="reload();"  ></p><p><input id="capresptext" class="form-control f3 rounded-0"  type="text" required name="g-recaptcha-response"  > ';
//var htm='<p><img src="<?php echo url('public/upload/captcha.php'); ?>" id="capt" class="ct" ></p><p><input type="text" class="form-control f3 rounded-0" name="g-recaptcha-response" required > ';
$('#custom_captcha').html(htm);


//set the captcha data in element having id > custom_captcha . you can change as your div/Element id
 
 
 
});
</script>	
		
		
		
		
  	
</body>
</html>



