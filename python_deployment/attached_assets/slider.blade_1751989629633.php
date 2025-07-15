<div class="row">
	<div class="col-md-12 p-0 homeSlider euz_mt_top_25">
		<div id="carouselExampleControls" class="carousel slide carousel-fade" data-ride="carousel" data-interval="4000">
			<ul class="carousel-indicators">
			    <?php $i = 0; foreach($banners as $banner) { ?> 
			    <?php if($i == '0') { ?>
				<li data-target="#carouselExampleControls" data-slide-to="0" class="active" style="border-radius: 50%;height: 15px;width: 15px;box-shadow: 0 0 10px black;"></li>
				<?php } else { ?>
				<li data-target="#carouselExampleControls" data-slide-to="<?php echo $i; ?>" style="border-radius: 50%;height: 15px;width: 15px;box-shadow: 0 0 10px black;" class=""></li>
				<?php } $i++; } ?>
			</ul>
			<div class="carousel-inner">
				<?php $i = 1; foreach($banners as $banner) { ?> 
				<div class="carousel-item <?php if($i == '1') { ?> active <?php } ?>">
					<img class="d-block w-100" src="{{ url('admin/public/img/banner/'.$banner->banner_img) }}" alt="{{ $banner->banner_alt }}">
					<div class="carousel-caption d-none d-md-block container"><h1 class="h1font">{{ $banner->page_name }}</h1><p class="pfont">{{ $banner->banner_content }}</p><a href="<?php echo url('/Contact'); ?>" class="btn btn-customslider" <?php /* data-toggle="modal" data-target="#Enquiryfromhome"*/ ?>>Contact Us</a></div>
				</div>
				<?php $i++; } ?>				
			</div>
			<a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev"><span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="sr-only">Previous</span></a>
			<a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next"><span class="carousel-control-next-icon" aria-hidden="true"></span><span class="sr-only">Next</span></a>
		</div> 
	</div>
</div>