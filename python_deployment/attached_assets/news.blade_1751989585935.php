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

	<style>

		td.day:hover 

		{

			background-color: #466675;

			color: #fff;

			cursor: pointer;

		}

		tr 

		{

			background-color: #8BC34A !important;

			text-align: center;

		}

		td.old.day 

		{

			color: #7d7d7d;

			background-color: #a9da70;

			border: #8BC34A solid 1px;

		}

		td.new.day 

		{

			color: #7d7d7d;

			background-color: #a9da70;

			border: #8BC34A solid 1px;

		}

		td.day 

		{

			padding: 7px !important;

			background-color: #cbf39c;

			border: #8BC34A solid 1px;

		}

		.datepicker-days 

		{

			padding: 0.5em;

		}

		th.prev, .datepicker-switch, .next 

		{

			color: #fff;

		}

		.dropdown-menu

		{

			width: 245px !important;

			background-color: #8BC34A;

		}

	</style>		

</head>

<body>	

	@include('header')

	<div class="body">

		<div>

			 <div class="container-fluid">

				<div class="row">

					<div class="col-md-12 p-0 euz_mt_top_25">

						<img src="Content/image/Img_636933288751220000.jpg" class="img-fluid w-100" >

					</div>

				</div>

			</div>			

			<div class="container">

				<div class="row my-5">

					<div class="col-lg-6 col-md-4"><h1 class="font-weight-bold">Νέα</h1></div>

					<!--<div class="col-lg-3 col-md-4">

						<div class="form-group">

							<div id="filterDate">

								<label>From Date</label>

								<div class="input-group date" data-date-format="dd/mm/yyyy">

									<input type="text" class="form-control ftdate" placeholder="dd/mm/yyyy" id="fromdate" ng-model="fromdate">

									<div class="input-group-addon">



									</div>

								</div>

							</div>

						</div>

					</div>

					<div class="col-lg-3 col-md-4">

						<div class="form-group">

							<div id="filterDate">

								<label>To Date</label>

								<div class="input-group date" data-date-format="dd/mm/yyyy">

									<input type="text" class="form-control ftdate" placeholder="dd/mm/yyyy" id="todate" ng-model="todate">

									<div class="input-group-addon">



									</div>

								</div>

							</div>

						</div>

					</div>-->

					<div class="col-md-12"><hr /></div>

				</div>

				<div class="row mb-5">

					<?php foreach($blogs as $blog) { ?>

					<div class="col-lg-12 col-md-12 my-2" style="opacity: 1;">

						<div class="p-2 rounded-0 border-0">

							<div class="row">

								<div class="col-md-3"><img class="card-img-top rounded-0 img-fluid" src="<?php echo url('/admin/public/img/blog/'.$blog->featured_image); ?>" alt="" style="width: 320px; height: 205px;"></div>

								<div class="col-md-9">

									<h5 class="card-title font-weight-bold"><?php echo $blog->name; ?>

										<span class="text-darkd float-right"><?php echo date("d M Y", strtotime($blog->publish_datetime)); ?></span>

									</h5>

									<p class="card-text text-justify cardtest my-2"><?php echo substr($blog->content, 0, 450); ?>...</p>

									<a href="<?php echo url('/newsdetail/'.$blog->id); ?>" class="btn btn-cardbutn float-right">More Info</a>

								</div>

							</div>

						</div>

						<hr>

					</div>

					<?php } ?>

				</div>

			</div>

		</div>   

	</div>   

	@include('footer') 

	<script src="{{ url('/Scripts/bootstrap-datepicker.min.js') }}"></script>

    <script>

        $('.input-group.date').datepicker({ format: "dd/mm/yyyy" });

		$(function () {

			$(".anavelink").css({ "color": "#676767", "font-weight": "600" });

			$("#News").css({ "color": "#7ac044", "border-bottom": "#7ac044 solid 1px", "font-weight": "600" });

		});

    </script>	

</body>

</html>







