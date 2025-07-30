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
					<img src="{{ url('/admin/public/img/logo/'.$settings[0]->probanner) }}" class="img-fluid w-100">
				</div>
			</div>
			<div class="row">
				<div class="container">
					<div class="row my-5">
						<div class="col-md-12">
							<h3 class="font-weight-bold mt-5">Categories</h3><br><hr />
						</div>
						<div class="col-md-12">
						    
						    <div class="row">
							<?php foreach($categories as $category) { ?>
							<div class="col-md-3">
							<center>
								<div class="my-2 ">
									<a href="<?php if(!empty($category->catid)) { echo url('/subproduct/'.$category->catid); } else { echo url('/categoryproductlist/'.$category->id); } ?>">
										<div class=" bg-boxcustome text-center">
											<img src="<?php echo url('../admin/public/img/icon/'.$category->icon); ?>" class="iconfa5"  />
											<p class="font-weight-bold mt-3 ppfont"><?php echo $category->title; ?></p>
										</div>
									</a>
								</div>
							</center>
							</div>
							<?php } ?>	
							</div>
							
						</div>
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
			$("#Products").css({ "color": "#fbdc00", "border-bottom": "#fbdc00 solid 5px", "font-weight": "600" });
		});
    </script>	
</body>
</html>



