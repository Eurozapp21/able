<!DOCTYPE html>
<html>
<head><meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	
    <meta name="viewport" content="width=device-width" />
	<title>{{ $settings[0]->seo_title }}</title>     
	<link rel="shortcut icon" href="{{ url('/../admin/public/img/logo/'.$settings[0]->favicon) }}" type="image/png" sizes="36x36">
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
    <script src="{{ url('/Scripts/jquery.cookie.js') }}"></script>
	<script src="{{ url('/Content/js/smoov.js') }}"></script>
    <script src="{{ url('/Scripts/bootstrap3-typeahead.js') }}"></script>
    <script>
        $('.block').smoove({
            offset: '10%'
        });
        $(document).on("click", ".btnallcookies", function () {
            $(".cookiesbg").fadeOut();
        })		
		$('#myCarouselvred').carousel({
			interval: 5000
		});		
		//scroll slides on swipe for touch enabled devices
		$("#myCarouselvred").on("touchstart", function (event) {
			var yClick = event.originalEvent.touches[0].pageY;
			$(this).one("touchmove", function (event) 
			{
				var yMove = event.originalEvent.touches[0].pageY;
				if (Math.floor(yClick - yMove) > 1) {
					$(".carousel").carousel('next');
				}
				else if (Math.floor(yClick - yMove) < -1) {
					$(".carousel").carousel('prev');
				}
			});
			$(".carousel").on("touchend", function () 
			{
				$(this).off("touchmove");
			});
		});
    </script>   
</head>
<body>	
	@include('header')   
    <div class="body">       
		<div class="container-fluid">
			<div class="row">
				<div class="col-md-12 p-0 euz_mt_top_25">
					<img class="img-fluid w-100" alt="About" src="{{ url('/admin/public/img/page/'.$about[0]->banner_img) }}">
				</div>
			</div>
			<div class="row">
				<!--<div class="container"><?php echo $about[0]->description; ?></div>-->
				<div class="container">
				    <div class="row my-5">
				        <?php 
				            $i = 0; 
				            foreach($aboutlists as $aboutlist) 
				            {
				                if ($i % 2 == 0)
				                {
			            ?>
				        <div class="col-md-6 p-4">
				            <img src="{{ url('admin/public/img/about/'.$aboutlist->banner_img) }}" id="" class="img-fluid w-100 euz_br">
				        </div>
				        <div class="col-md-6 p-4">
				            <h3 class="">{{ $aboutlist->title }}</h3><hr>
				            <p class="text-justify">{{ $aboutlist->banner_content }}</p>
				        </div>
				        <?php } else { ?>
				        <div class="col-md-6 p-4">
				            <h3 class="">{{ $aboutlist->title }}</h3><hr>
				            <p class="text-justify">{{ $aboutlist->banner_content }}</p>
				        </div>
				        
				        <div class="col-md-6 p-4">
				            <img src="{{ url('admin/public/img/about/'.$aboutlist->banner_img) }}" id="" class="img-fluid w-100 euz_br">
				        </div>
				        <?php } $i++; } ?>
				    </div>
				</div>
			</div>
		</div>
	</div>   
	@include('footer') 
	<script>
		$(function () 
		{
			$(".anavelink").css({ "color": "#58595b" });
			$("#aboutus").css({ "color": "#fbdc00", "border-bottom": "#fbdc00 solid 5px", "font-weight": "600" });
		});
	</script>		
</body>
</html>



