<?php 
error_reporting(0);
	$username = session()->get('name');
	$useremail = session()->get('email'); 
	$usermobile = session()->get('mobile'); 
	$useridlog = session()->get('id');
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
		<div>
			 <div class="container-fluid">
				<div class="row">
					<div class="col-md-12 p-0 euz_mt_top_25">
						<img id="imgseminar" src="{{ url('admin/public/img/logo/'.$settings[0]->trabanner) }}" class="img-fluid w-100" alt="">
					</div>
				</div>
			</div>	
			<div class="container">
				<div class="row mt-5">
				    
				    <!---<div class="col-md-12">
						<h2 class="font-weight-bold">Trainings</h2>
					</div>--->
				    
					<div class="col-md-12">
						<ol class="breadcrumb bgdetailproduct">
							<li class="breadcrumb-item"><a class="font-weight-bold text-white" href="<?php echo url('/Seminar'); ?>">Trainings</a></li>
							<li class="breadcrumb-item active"><span class="txt_ylo">Training details</span></li>
						</ol>
					</div>
					<div class="col-md-12">
					    <h3 class="font-weight-bold"><?php echo $retraining[0]->title; ?>
					    <label class="euz_label_grey mb-0 float-right"><span class="durec float-right">&nbsp;Duration : <?php echo $retraining[0]->duration; ?></span>
					    
					    
					    <?php if ($retraining[0]->dates=='nodate'){
					    
					    ?>
						<span class="durec float-right"><?php //echo date("j M Y", $retraining[0]->startdate); ?>  </span>
						<?php } else {?>
						<span class="durec float-right"><?php echo date("j M Y", $retraining[0]->startdate); ?> 
					
						<?php if(!empty($retraining[0]->enddate)) { ?>-<?php echo date("j M Y", $retraining[0]->enddate); ?><?php } ?>
						
						
						
						| </span>
						
						<?php } ?>
						
						</label>
					    </h3>
					    <p class="pfee">Training Fee : <?php if(empty($retraining[0]->fee)) { echo "Free"; } else { 

							//echo "€".$retraining[0]->fee; 
echo "€".number_format((float) $retraining[0]->fee, 2, '.', '');


						} ?></p>
					</div>
				</div>				
				<div class="my-4" style="width:100%;display: flow-root;">
					<div class="leftcol mr-5">
						<div class="divslidertraining">
							<div id="speak" class="carousel slide" data-ride="carousel">
								<ul class="carousel-indicators">
									<li data-target="#speak" data-slide-to="0" class="active"></li>
									<?php if(!empty($retraining[0]->sliderimg2)) { ?>
									<li data-target="#speak" data-slide-to="1" class=""></li>
									<?php } if(!empty($retraining[0]->sliderimg3)) { ?>
									<li data-target="#speak" data-slide-to="2" class=""></li>
									<?php } if(!empty($retraining[0]->sliderimg4)) { ?>
									<li data-target="#speak" data-slide-to="3" class=""></li>
									<?php } if(!empty($retraining[0]->sliderimg5)) { ?>
									<li data-target="#speak" data-slide-to="4" class=""></li>
									<?php } ?>
								</ul>
								<div class="carousel-inner">
									<div class="carousel-item active ">
										<center><img src="<?php echo url('/admin/public/img/training/'.$retraining[0]->sliderimg1); ?>" class="img-fluid" alt="<?php echo $retraining[0]->title; ?>"></center>
									</div>
									<?php if(!empty($retraining[0]->sliderimg2)) { ?>
									<div class="carousel-item ">
										<center><img src="<?php echo url('/admin/public/img/training/'.$retraining[0]->sliderimg2); ?>" class="img-fluid" alt="<?php echo $retraining[0]->title; ?>"></center>
									</div>
									<?php } if(!empty($retraining[0]->sliderimg3)) { ?>
									<div class="carousel-item ">
										<center><img src="<?php echo url('/admin/public/img/training/'.$retraining[0]->sliderimg3); ?>" class="img-fluid" alt="<?php echo $retraining[0]->title; ?>"></center>
									</div>
									<?php } if(!empty($retraining[0]->sliderimg4)) { ?>
									<div class="carousel-item ">
										<center><img src="<?php echo url('/admin/public/img/training/'.$retraining[0]->sliderimg4); ?>" class="img-fluid" alt="<?php echo $retraining[0]->title; ?>"></center>
									</div>
									<?php } if(!empty($retraining[0]->sliderimg5)) { ?>
									<div class="carousel-item ">
										<center><img src="<?php echo url('/admin/public/img/training/'.$retraining[0]->sliderimg5); ?>" class="img-fluid" alt="<?php echo $retraining[0]->title; ?>"></center>
									</div>
									<?php } ?>
								</div>								
								<a class="carousel-control-prev" href="#speak" data-slide="prev" style="opacity:1;"><img src="{{ url('/Content/image/left.png') }}" height="25px"></a>
								<a class="carousel-control-next" href="#speak" data-slide="next" style="opacity:1;"><img src="{{ url('/Content/image/right.png') }}" height="25px"></a>
								
							</div>
						</div>
						<div class="row">
					       <?php if(!empty($retraining[0]->pdf)) { ?>
							<div class="col-md-12 mt-3">
								<center>
									<a href="<?php echo url('/admin/public/pdf/'.$retraining[0]->pdf); ?>" class="btn btn-custom" style="width:80%;" target="_blank">
										<label class="mb-0 labtex text-white"><?php echo $retraining[0]->pdfname; ?></label>
									</a>
								</center>
							</div>
							<?php } if(!empty($retraining[0]->pdf1)) { ?>
							<div class="col-md-12 mt-3">
								<center>
									<a href="<?php echo url('/admin/public/pdf/'.$retraining[0]->pdf1); ?>" class="btn btn-custom" style="width:80%;" target="_blank">
										<label class="mb-0 labtex text-white"><?php echo $retraining[0]->pdfname1; ?></label>
									</a>
								</center>
							</div>
							<?php } if(!empty($retraining[0]->pdf2)) { ?>
							<div class="col-md-12 mt-3">
								<center>
									<a href="<?php echo url('/admin/public/pdf/'.$retraining[0]->pdf2); ?>" class="btn btn-custom" style="width:80%;" target="_blank">
										<label class="mb-0 labtex text-white"><?php echo $retraining[0]->pdfname2; ?></label>
									</a>
								</center>
							</div>
							<?php } if(!empty($retraining[0]->pdf3)) { ?>
							<div class="col-md-12 mt-3">
								<center>
									<a href="<?php echo url('/admin/public/pdf/'.$retraining[0]->pdf3); ?>" class="btn btn-custom" style="width:80%;" target="_blank">
										<label class="mb-0 labtex text-white"><?php echo $retraining[0]->pdfname3; ?></label>
									</a>
								</center>
							</div>
							<?php } ?>
						</div> 
					</div>		


							  
					<div class="rightcols">
						<p class="text-dark text-justify lineh27 mt-4 ptrainingdesc"><?php echo $retraining[0]->content; ?></p>	
						<?php if(!empty($retraining[0]->fee)) { ?>
						<div class="table-responsive">
							<table class="table">
								<tbody>
									<?php /*<tr>
										<?php $curtime = time(); ?>
										<th class="thead-dark" style="width:20%;">Price</th>
										<td style="width:15%;"><?php if(!empty($retraining[0]->fee)) { echo $retraining[0]->fee; ?> € <?php } else { echo "Free"; } ?></td>
										<?php if(!empty($retraining[0]->fee)) { ?>
										<th style="width:20%;" class="thead-dark">Discount EndDate</th>
										<td style="width:50%;"><?php echo date('d-m-Y', $retraining[0]->disdate); ?></td>
										<?php } ?>
									</tr>*/ ?>
									<tr class="td_euz">
										<?php $curtime = time();
										$curdtintime=Date('m/d/Y');
										 $curdt=strtotime($curdtintime);
														//echo "<br>jjjj<br>";
														 $smdt=$retraining[0]->disdate;
										
										?>
										<th class="thead-dark" style="width:30%;">Price</th>
										<td colspan="2"><?php if(!empty($retraining[0]->fee)) { 
											//echo $retraining[0]->fee;

                                            echo number_format((float) $retraining[0]->fee, 2, '.', '');
											 ?> € <?php } else { echo "Free"; } ?></td>
									</tr>
									<tr class="td_euz">
										<?php if(!empty($retraining[0]->discount)) { ?>
										<th class="thead-dark">Discount EndDate</th>
										<td colspan="2"><?php echo date('d-m-Y', $retraining[0]->disdate); ?></td>
										<?php } ?>
									</tr>
									<?php if(!empty($retraining[0]->fee)) { ?>
									<?php //if($retraining[0]->disdate > $curtime) {
									
										if ($smdt >=$curdt){
									
									
									?>				
									<tr class="td_euz">
										<th class="thead-dark">Discount Amount</th>
										<!--<td style="width:12%;">-<?php //echo (int) ($retraining[0]->discount / 100 * $retraining[0]->fee); ?> €</td>-->
										
										<?php 
													$discamt=$retraining[0]->discountinamt;
													$rdselected=$retraining[0]->rdselected;
													if ($rdselected==3){
													?>
														<td style="width:12%;">-<?php //echo $discamt 
echo number_format((float)$discamt, 2, '.', '');



														?> €</td>
													<?php } else {?>
														<td style="width:12%;">-<?php //echo (int) ($retraining[0]->discount / 100 * $retraining[0]->fee); 

                                                             echo number_format((float)$retraining[0]->discount / 100 * $retraining[0]->fee, 2, '.', '');



														?> €</td>
														<?php }?>
										
										
										
										
										
										<td colspan="2"><?php echo $retraining[0]->disdesc; ?></td>
									</tr>
									<?php } 
										if ($smdt >=$curdt){
									//if($retraining[0]->disdate > $curtime) { ?>
									<?php 
										/*$per = (int) ($retraining[0]->discount / 100 * $retraining[0]->fee); 
										$vatper = (int) ($retraining[0]->vat / 100 * $retraining[0]->fee);
										$vat = (int) ($vatper + $retraining[0]->fee - $per);
										} else {
										$vatper = (int) ($retraining[0]->vat / 100 * $retraining[0]->fee);
										$vat = (int) ($retraining[0]->fee + $vatper);
										} */
									?>
										<?php 
													$discamt= $retraining[0]->discountinamt;
													$rdselected= $retraining[0]->rdselected;
														if ($rdselected==3){
													    $per=$discamt;
													}
													else{
													$per =($retraining[0]->discount / 100 * $retraining[0]->fee);
													}
														//$per = (int) ($seminar[0]->discount / 100 * $seminar[0]->fee); 
														//$vatper = (int) ($seminar[0]->vat / 100 * $seminar[0]->fee);
														//$vat = (int) ($vatper + $seminar[0]->fee - $per);
														
												
													//echo "jjj";
												 $afterdis=( $retraining[0]->fee-$per);
			//alert(afterdis);
			$per2= $retraining[0]->vat;
			$vatper = $per2 / 100 *$afterdis;
			//alert(vatper);
		 $payableamt=$afterdis+round($vatper,2);
										//echo $totalR = ($seminar[0]->fee -$afterdis + $vatper);				
														
														
														
														} else {
														    //echo "entered";
														//$vatper = (int) ($seminar[0]->vat / 100 * $seminar[0]->fee);
														$orginalamt= $retraining[0]->fee;
														$per2= $retraining[0]->vat;
														$vatper = $per2 / 100 *$orginalamt;
														 $payableamt=$orginalamt+round($vatper,2);
															//$vatper = $per2 / 100 *$afterdis;
													//echo	$vat = (int) ($seminar[0]->fee + $vatper);
														} 
													?>
													
									
									
									
									
									
									
									
									
									<tr class="td_euz">
										<th class="thead-dark">VAT Amount</th>
										<td colspan="3"><?php //echo round($vatper,2); 
                                           echo number_format((float)$vatper, 2, '.', '');


										?> €</td>
									</tr>
									<tr class="thead-light td_euz">
										<th>Payable Amount</th>
										<td colspan="3"><b><?php //echo $vat;
										//echo round($payableamt,2);
										echo number_format((float)$payableamt, 2, '.', '');
										
										?> €</b></td>
									</tr>
									<?php //if($retraining[0]->disdate > $curtime) {	 ?>	
									<?php if(!empty($retraining[0]->firstamt)) { ?>
									<tr class="td_euz">
										<th colspan="4">Payment Option/s</th>
									</tr>
									
									<tr class="td_euz">
										<th class="thead-dark">Deposit</th>
										<td style="width: 8%;"><?php //echo $retraining[0]->firstamt;
                                              echo number_format((float)$retraining[0]->firstamt, 2, '.', '');
$famount=round($retraining[0]->firstamt,2);
										 ?> €</td>
										<td colspan="2"><?php echo $retraining[0]->firstdesc; ?></td>
									</tr>
									<tr class="td_euz">
										<th class="thead-dark">Balance Amount</th>
										<td style="width: 8%;"><?php //echo $retraining[0]->secondamt; 
                                         //echo number_format((float)$retraining[0]->secondamt, 2, '.', '');
$balamt=($payableamt-$famount);
                                                           echo number_format((float)$balamt, 2, '.', '');

										?> €</td>
										<td colspan="2"><?php echo $retraining[0]->seconddesc; ?></td>
									</tr>
									<?php } } //} ?>
								</tbody>
							</table>
						</div>
						<?php } ?>
						</div>	

						<?php if(!empty($retraining[0]->fee)) { ?>
						<?php if(empty($username)) { 
						
						if ($retraining[0]->dates=='singledate'){
						//$toddate=Date("Y-m-d H:i:s");
						
						$toddate=Date("Y-m-d");
							$strtimedt=strtotime($toddate);
							//echo $retraining[0]->startdate;
							
							if ($strtimedt<=$retraining[0]->startdate){
						
						
						
						?>				
						<input type="button" class="btn btn-cardbutn" value="Registration Form" data-toggle="modal" data-target="#Logregister">
						<?php 
						
							}
							
							
						}else if ($retraining[0]->dates=='multipledate'){
						    
						    $toddate=Date("Y-m-d");
						    //$toddate=Date("Y-m-d H:i:s");
							$strtimedt=strtotime($toddate);
							//echo $seminar[0]->enddate;
							
							if ($strtimedt<=$retraining[0]->enddate){
						
						
						
						?>				
						<input type="button" class="btn btn-cardbutn" value="Registration Form" data-toggle="modal" data-target="#Logregister">
						<?php 
						
							}
						    
						    
						    
						    
						    
						}else{?>
						
						<input type="button" class="btn btn-cardbutn" value="Registration Form" data-toggle="modal" data-target="#Logregister">
						
						
						<?php } 
						
						} else { ?>
						<input type="button" class="btn btn-cardbutn float-right" value="Payment Form" data-toggle="modal" data-target="#payoption">
						<?php } } else { if(empty($username)) { ?>
						<div class="col-lg-12 my-3">
						    
						    
							<!--<input type="button" class="btn btn-cardbutn float-right" value="Registration Formu" data-toggle="modal" data-target="#newaccount">-->
							
						<?php if ($retraining[0]->dates=='singledate'){
						//$toddate=Date("Y-m-d H:i:s");
						
						$toddate=Date("Y-m-d");
							$strtimedt=strtotime($toddate);
							//echo $retraining[0]->startdate;
							
							if ($strtimedt<=$retraining[0]->startdate){
						
					
						
						?>				
						<!--<input type="button" class="btn btn-cardbutn" value="Registration Form" data-toggle="modal" data-target="#Logregister">-->
						<input type="button" class="btn btn-cardbutn float-right" value="Registration Form" data-toggle="modal" data-target="#newaccount">
						<?php 
						
							}
							
							
						}else if ($retraining[0]->dates=='multipledate'){
						    
						    $toddate=Date("Y-m-d");
						    //$toddate=Date("Y-m-d H:i:s");
							$strtimedt=strtotime($toddate);
							//echo $seminar[0]->enddate;
							
							if ($strtimedt<=$retraining[0]->enddate){
						
						
						
						?>				
						<!--<input type="button" class="btn btn-cardbutn" value="Registration Formtt" data-toggle="modal" data-target="#Logregister">-->
						<input type="button" class="btn btn-cardbutn float-right" value="Registration Form" data-toggle="modal" data-target="#newaccount">
						<?php 
						
							}
						    
						    
						    
						    
						    
						}else{?>
						
						<!--<input type="button" class="btn btn-cardbutn" value="Registration Formt" data-toggle="modal" data-target="#Logregister">-->
						
						<input type="button" class="btn btn-cardbutn float-right" value="Registration Form" data-toggle="modal" data-target="#newaccount">
						<?php } ?>
							
							
							
							
							
							
							
							
							
							
							
							
						</div>
						<?php } } ?>
					</div>
				</div>
			</div>
		</div>
    </div>
    
	<div class="modal fade" id="Logregister" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true" data-keyboard="false" data-backdrop="static">
		<div class="modal-dialog modal-lg modal-dialog-centered" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">×</span>
					</button>
				</div>
				<div class="modal-body py-5">
					<div class="row">
						<div class="col-md-6">
							<center>
								<h5 class="text-dark text-center font-weight-bold lineh27 pabout">If you have already an account</h5>
								<!--<a class="btn btn-cardbutn text-white my-2" href="{{ url('/userlogin') }}">
									<i class="fas fa-user"></i>
									Login
								</a>-->
								<a class="btn btn-cardbutn text-white my-2" href="{{ url('/userlogin?ti='.$modtit) }}">
									<i class="fas fa-user"></i>
									Login
								</a>
								
								
							</center>
						</div>
						<div class="col-md-6" style="border-left: #e9ecef solid 1px;">
							<center>
								<h5 class="text-dark text-center font-weight-bold lineh27 pabout">If you don't have an account Click here!</h5>
								<a class="btn btn-cardbutn text-white my-2" href="#" data-toggle="modal" data-target="#register">
									<i class="fas fa-user-plus"></i>
									Register
								</a>
							</center>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	<?php $modtit=$retraining[0]->title;
	$modtype=2;
	
	
	?>
	@include('registerpoptra')
	@include('paypoptra')
	@include('logreg')
	@include('footer') 
	<script>
		$(function () 
		{
			$(".anavelink").css({ "color": "#58595b"});
			$("#Training").css({ "color": "#fbdc00", "border-bottom": "#fbdc00 solid 5px", "font-weight": "600" });
		});
		$('#comTrainingtype').on('change', function () 
		{
			var array = $(this).val();
			//console.log(array);
			//var stateID = array;
            getProducts(array);
        });
        function getProducts(product_category_id) 
		{
            $.get("{{url('/training/get-training')}}/" + product_category_id, function (data) 
			{
                $("#subcatname").html(data);
            });
        }
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
		function isNumberKey(evt)
		{
			var charCode = (evt.which) ? evt.which : event.keyCode
			if (charCode > 31 && (charCode < 48 || charCode > 57))
			return false;

			return true;
		}
	</script>		
</body>
</html>



