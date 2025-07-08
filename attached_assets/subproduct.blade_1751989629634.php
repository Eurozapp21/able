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
					<img src="{{ url('/admin/public/img/logo/'.$settings[0]->probanner) }}" class="img-fluid w-100" />
				</div>
			</div>
			<div class="row">
				<div class="container">
				    <div class="col-md-12 mt-5 p-0">
						<!--<h3 class="font-weight-bold mt-5">Sub Categories</h3><hr />-->
						<ol class="breadcrumb bgdetailproduct">
							<li class="breadcrumb-item"><a class="euz_font12 euz_newfont  text-white" href="{{ url('/Products') }}"><?php
echo ucwords("Products");
?></a></li>
							<?php if(!empty($categories[0]->catname)) { ?>
							<li class="breadcrumb-item a_breadcrumbsub"><span class="euz_font12 euz_newfont txt_ylo"><?php echo ucwords(strtolower($categories[0]->catname)); ?></span></li>
							<?php } ?>
						</ol>
					</div>
					<div class="row my-4">
						<?php foreach($categories as $category) { ?>
						<div class="col-lg-3 col-md-4 mt-2">
							<a href="<?php echo url('/subcategoryproductlist/'.$category->id);  ?>">
								<div class="bg-white incms">
									<img src="{{ url('admin/public/img/page/'.$category->img) }}" class="img-fluid zoom" alt="<?php echo $category->title; ?>" />
									<div class="overlay"><div class="text"><input type="button" class="btn btn-customslider" value="More Info"></div></div>
								</div>
								<div class="boxgreen1 border p-2"><p class="mb-0"><?php echo $category->title; ?><!--<br><?php echo $category->catname; ?>--></p></div>
							</a>
						</div>
						<?php } ?>	
						<?php foreach($products as $product) { ?>
						<div class="col-lg-3 col-md-4 mt-2">
							<a href="<?php echo url('/productdetail/'.$product->id); ?>">
								<div class="bg-white incms">
									<img src="{{ url('admin/public/img/product/'.$product->img) }}" class="img-fluid zoom" alt="><?php echo $product->title; ?>">
									<div class="overlay"><div class="text"><input type="button" class="btn btn-customslider" value="More Info"></div></div>
								</div>
								<div class="boxgreen1 border p-2"><p class="mb-0"><?php echo $product->title; ?><!--<br><?php echo $product->catname; ?>--></p></div>
							</a>
						</div>
						<?php } ?>
					</div>            
				</div>
			</div>
			<?//php if(!empty($products)) { ?>
			<!---<div class="row">
				<div class="container">
				    <div class="col-md-12">
						<h3 class="font-weight-bold mt-5">Products</h3><hr />
					</div>
					<div class="row my-5">
												
					</div>           
				</div>
			</div>-->
			<?//php } ?>
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



