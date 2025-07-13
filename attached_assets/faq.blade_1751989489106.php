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

					<img id="imgNews" src="Content/image/Img_636933282244550000.jpg" class="img-fluid w-100" alt="">

				</div>

			</div>

			<div class="row">

				<div class="container">

					<div class="row my-5">

						<div class="col-md-12"><h1 class="font-weight-bold">FAQ</h1></div>

					</div>

					<div class="row my-5">

						<?php $i = 1; foreach($faqs as $faq) { ?>

						<div class="col-md-12">						

							<div class="p-2 m-0 rightcol mt-1 collapsequestion bgdetailproduct collapsed" data-toggle="collapse" data-target="#faq<?php echo $i; ?>" aria-expanded="false">

								<span><i class="fas fa-question fontcolorinsd mr-2"></i></span><?php echo $faq->question; ?><span class="collapsed"><b><i class="fas fa-plus float-right pt-1"></i></b></span><span class="expanded"><b><i class="fas fa-minus float-right pt-1"></i></b></span>

							</div>

							<div id="faq<?php echo $i; ?>" class="p-3 rightcolcon collapse" style="">

								<p><?php echo $faq->answer; ?></p>

							</div>																					

						</div>

						<?php $i++; } ?>

					</div>

				</div>

			</div>

		</div>   

	</div>   

	@include('footer') 

    <script>

		$(function () {

			$(".anavelink").css({ "color": "#676767", "font-weight": "600" });

			$("#Faq").css({ "color": "#7ac044", "border-bottom": "#7ac044 solid 1px", "font-weight": "600" });

		});

    </script>	

</body>

</html>







