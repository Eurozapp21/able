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
				<div class="row">
					<div class="col-md-12 p-0 euz_mt_top_25">
						<img id="imgTraining" src="{{ url('/admin/public/img/logo/'.$settings[0]->trabanner) }}" class="img-fluid w-100" alt="txtalttext">
					</div>
				</div>
			</div>
			<div class="container">
				<div class="row  my-5">
					<div class="col-lg-8 col-md-7"><h1 class="font-weight-bold">Training</h1></div>
					<div class="col-lg-4 col-md-5">
						<div class="form-group">
							<select class="form-control" id="comTrainingtype" ng-model="comTrainingtype">
								<option value="">--Select Training--</option>
								<option value="1">Physical Training</option>
								<option value="2">Product Training</option>
								<option value="3">Helpers Training</option>
							</select>
						</div>
					</div>
					<div class="col-md-12"><hr /></div>
					
						<div class="col-md-12 my-5 w-100">
							<ul class="nav nav-tabs" role="tablist">
								<li class="nav-item">
									<a class="nav-link active" data-toggle="tab" href="#uptra">Upcoming Traning</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" data-toggle="tab" href="#retra">Recent Traning</a>
								</li>
							</ul>

							<!-- Tab panes -->
							<div class="tab-content bor bg-white">
								<div id="uptra" class="container tab-pane active">									
									<div class="row p-3">										
										<div class="col-md-12">											
											<div class="tab-content">
												<div id="menu1" class="container tab-pane active">
													<div class="row">
														<?php foreach($trainings as $training) { ?>
														<div class="col-lg-3 col-md-4 my-2">
															<a href="<?php echo url('/trainingdetail/'.$training->id); ?>">
																<div class="boximg">
																	<img class="card-img-top rounded-0" src="<?php echo url('/admin/public/img/training/'.$training->img); ?>" alt="" width="228px" height="146px">
																	<div class="inover"></div><div class="button text-white text-weight-bold">
																		<h4><?php echo $training->catname; ?></h4>
																	</div>
																	<div class="card-body px-2 py-3 euz_bgyelo">
																		<p class="card-title mb-0 text-white"><?php echo $training->title; ?></p>
																	</div>
																</div>
															</a>
														</div>
														<?php } ?>
													</div>
												</div>											  
											</div>											
										</div>										
									</div>									
								</div>
								<div id="retra" class="container tab-pane fade">
									<div class="row p-3">										
										<div class="col-md-12">
											<div class="tab-content">
												<div id="menu3" class="container tab-pane active">
													<div class="row">
														<?php foreach($retrainings as $retraining) { ?>
														<div class="col-lg-3 col-md-4 my-2">
															<a href="<?php echo url('/trainingdetail/'.$retraining->id); ?>">
																<div class="boximg">
																	<img class="card-img-top rounded-0" src="<?php echo url('/admin/public/img/training/'.$retraining->img); ?>" alt="" width="228px" height="146px">
																	<div class="inover"></div><div class="button text-white text-weight-bold">
																		<h4><?php echo $retraining->catname; ?></h4>
																	</div>
																	<div class="card-body px-2 py-3 euz_bgyelo">
																		<p class="card-title mb-0 text-white"><?php echo $retraining->title; ?></p>
																	</div>
																</div>
															</a>
														</div>
														<?php } ?>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					
				</div>								
			</div>
		</div>
    </div>    
	@include('footer') 
	<script>
		$(function () 
		{
			$(".anavelink").css({ "color": "#58595b"});
			$("#Training").css({ "color": "#fbdc00", "border-bottom": "#fbdc00 solid 5px", "font-weight": "600" });
		});
		$('#comTrainingtype').on('change', function () 
		{
			var list = $(this).val();
			$.ajax({
				type : 'get',
				datatype : 'html',
				url : "{{url('trainings')}}/" + list,
				data : 'id=' + list,
				success:function(data)
				{
					//alert("{{url('trainings')}}/" + list);
					window.location.href = "{{url('trainings')}}/" + list;
				}
			});
        });        
	</script>		
</body>
</html>



