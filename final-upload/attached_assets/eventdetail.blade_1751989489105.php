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
</head>
<body>	
	@include('header') 
	<div class="body">
		<div>
			<div class="container">
				<div class="row">
					<div class="col-md-12 p-0 euz_mt_top_25">
						<img src="<?php if(!empty($event[0]->profile)) { echo url('/admin/public/img/event/'.$event[0]->slider); } ?>" class="img-fluid w-100">
					</div>
				</div>
			</div>
			<div class="container fullbor">
				<div class="row mt-5">
					<div class="col-md-12">
						<ol class="breadcrumb bgdetailproduct">
							<li class="breadcrumb-item"><a class="font-weight-bold text-white" href="{{ url('/Events') }}">Event</a></li>
							<li class="breadcrumb-item active"><span class="txt_ylo">Event detail</span></li>
						</ol>
					</div>
				</div>
				<div class="row mt-2 mb-5">
					<div class="col-md-6">
						<h3 class="font-weight-bold ng-binding"><?php echo $event[0]->title; ?></h3>
						<h6 class="newcolor ng-binding"><?php echo $event[0]->author; ?></h6>
					</div>
					<?php $modtit=$event[0]->title;?>
					<div class="col-md-6 text-right">
						<label class="euz_label_grey mb-0"><span class="durec ng-binding"><?php echo date("d M Y", $event[0]->startdate); ?> <?php if(!empty($event[0]->enddate)) { ?>- <?php echo date("d M Y", $event[0]->enddate); ?><?php } ?></span>&nbsp;|&nbsp;
						<span class="durec ng-binding">Duration : <?php echo $event[0]->duration; ?></span></label>
					</div>
					<div class="col-md-12 mb-4">
						<p class="text-dark text-justify lineh27 mt-4 pEventdesc"><?php echo $event[0]->description; ?></p>
					</div>
					<div class="col-lg-6">
						<p class="font-weight-bold">Event Venue &amp; Details</p>
						<p class="">Place : <?php echo $event[0]->place; ?></p>
						<p class="font-weight-bold">Event Venue</p>
						<p class="ng-binding"><?php echo $event[0]->venue; ?></p>
						<p class="font-weight-bold">Detail</p>
						<p class=" pfee"><?php //echo $event[0]->fee;
                             echo number_format((float)$event[0]->fee, 2, '.', '');

						 ?></p>
						<p class="text-dark text-justify lineh27 pvenuedetails"><?php if(!empty($event[0]->map)) { echo $event[0]->detail; } ?></p>
						<?php if(!empty($event[0]->map)) { ?>
						<iframe src="<?php echo $event[0]->map; ?>" width="100%" height="200" frameborder="0" style="border:0" allowfullscreen></iframe>
						<?php } ?>
						<?php if(!empty($event[0]->pdf)) { ?>
						<div class="row">
							<div class="col-md-4 mt-3" style="cursor: pointer;">
								<a href="<?php echo url('/admin/public/pdf/'.$event[0]->pdf); ?>" class="btn btn-cardbutn w-100" target="_blank">
									<label class="mb-0 text-white"><i class="fas fa-download"></i> <?php echo $event[0]->pdfname1; ?> </label>
								</a>
							</div>
						</div>
						<?php } ?>
						<?php if(!empty($event[0]->pdf1)) { ?>
						<div class="row">
							<div class="col-md-4 mt-3" style="cursor: pointer;">
								<a href="<?php echo url('/admin/public/pdf/'.$event[0]->pdf1); ?>" class="btn btn-cardbutn w-100" target="_blank">
									<label class="mb-0 text-white"><i class="fas fa-download"></i> <?php echo $event[0]->pdfname2; ?> </label>
								</a>
							</div>
						</div>
						<?php } ?>
						<?php if(!empty($event[0]->pdf2)) { ?>
						<div class="row">
							<div class="col-md-4 mt-3" style="cursor: pointer;">
								<a href="<?php echo url('/admin/public/pdf/'.$event[0]->pdf2); ?>" class="btn btn-cardbutn w-100" target="_blank">
									<label class="mb-0 text-white"><i class="fas fa-download"></i> <?php echo $event[0]->pdfname3; ?> </label>
								</a>
							</div>
						</div>
						<?php } ?>
						<?php if(!empty($event[0]->pdf3)) { ?>
						<div class="row">
							<div class="col-md-4 mt-3" style="cursor: pointer;">
								<a href="<?php echo url('/admin/public/pdf/'.$event[0]->pdf3); ?>" class="btn btn-cardbutn w-100" target="_blank">
									<label class="mb-0 text-white"><i class="fas fa-download"></i> <?php echo $event[0]->pdfname4; ?> </label>
								</a>
							</div>
						</div>
						<?php } ?>
					</div>
					<div class="col-lg-6">
						<?php if(!empty($event[0]->video)) { ?>
						<video playsinline="playsinline" autoplay="autoplay" muted="muted" loop="loop" style="width:100%;">
							<source src="<?php echo $event[0]->video; ?>" type="video/mp4">
						</video>
						<?php } ?>
						<?php if(!empty($event[0]->fee)) { ?>
						<div class="table-responsive">
							<table class="table">
								<tbody>
									<?php /*<tr>
										<?php $curtime = time(); ?>
										<th class="thead-dark" style="width:20%;">Price</th>
										<td style="width:15%;"><?php if(!empty($event[0]->fee)) { echo $event[0]->fee; ?> € <?php } else { echo "Free"; } ?></td>
										<?php if(!empty($event[0]->fee)) { ?>
										<th style="width:20%;" class="thead-dark">Discount EndDate</th>
										<td style="width:50%;"><?php echo date('d-m-Y', $event[0]->disdate); ?></td>
										<?php } ?>
									</tr> */ ?>
									<tr class="td_euz">
										<?php $curtime = time(); 
										
										$curdtintime=Date('m/d/Y');
														//echo "<br><br>";
														 $curdt=strtotime($curdtintime);
														//echo "<br>jjjj<br>";
														 $smdt=$event[0]->disdate;
										
										
										
										
										?>
										<th class="thead-dark" style="width:30%;">Price</th>
										<td colspan="2"><?php if(!empty($event[0]->fee)) { 

											//echo $event[0]->fee;
echo number_format((float)$event[0]->fee, 2, '.', '');

											 ?> € <?php } else { echo "Free"; } ?></td>
									</tr>
									<tr class="td_euz">
										<?php if(!empty($event[0]->discount)) { ?>
										<th class="thead-dark">Discount EndDate</th>
										<td colspan="2"><?php echo date('d-m-Y', $event[0]->disdate); ?></td>
										<?php } ?>
									</tr>
									<?php if(!empty($event[0]->fee)) { ?>
									<?php //if($event[0]->disdate > $curtime) {
										if ($smdt >=$curdt){
									
									
									
									?>				
									<tr class="td_euz">
										<th class="thead-dark">Discount Amount</th>
										
										
											<?php 
													$discamt=$event[0]->discountinamt;
													$rdselected=$event[0]->rdselected;
													if ($rdselected==3){
													?>
														<td style="width:15%;">-<?php //echo $discamt
echo number_format((float)$discamt, 2, '.', '');


														 ?> €</td>
													<?php } else {?>
														<td style="width:15%;">-<?php //echo (int) ($event[0]->discount / 100 * $event[0]->fee); 
echo number_format((float)($event[0]->discount / 100 * $event[0]->fee), 2, '.', '');


														?> €</td>
														<?php }?>
										
										
										<!--<td style="width:15%;">-<?php //echo (int) ($event[0]->discount / 100 * $event[0]->fee); ?> €</td>-->
										
										
										
										
										
										<td colspan="2"><?php echo $event[0]->disdesc; ?></td>
									</tr>
									<?php } 
										if ($smdt >=$curdt){
									
									//if($event[0]->disdate > $curtime) { ?>
									<?php 
									/*	$per = (int) ($event[0]->discount / 100 * $event[0]->fee); 
										$vatper = (int) ($event[0]->vat / 100 * $event[0]->fee);
										$vat = (int) ($vatper + $event[0]->fee - $per);
										} else {
										$vatper = (int) ($event[0]->vat / 100 * $event[0]->fee);
										$vat = (int) ($event[0]->fee + $vatper);
										} */
									?>
									
									
										<?php 
													$discamt= $event[0]->discountinamt;
													$rdselected= $event[0]->rdselected;
														if ($rdselected==3){
													    $per=$discamt;
													}
													else{
													$per =($event[0]->discount / 100 * $event[0]->fee);
													}
														//$per = (int) ($seminar[0]->discount / 100 * $seminar[0]->fee); 
														//$vatper = (int) ($seminar[0]->vat / 100 * $seminar[0]->fee);
														//$vat = (int) ($vatper + $seminar[0]->fee - $per);
														
												
													//echo "jjj";
												 $afterdis=( $event[0]->fee-$per);
			//alert(afterdis);
			$per2= $event[0]->vat;
			$vatper = $per2 / 100 *$afterdis;
			//alert(vatper);
		 $payableamt=$afterdis+round($vatper,2);
										//echo $totalR = ($seminar[0]->fee -$afterdis + $vatper);				
														
														
														
														} else {
														    //echo "entered";
														//$vatper = (int) ($seminar[0]->vat / 100 * $seminar[0]->fee);
														$orginalamt= $event[0]->fee;
														$per2= $event[0]->vat;
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
									<?php //if($event[0]->disdate > $curtime) {	 ?>	
									<?php if(!empty($event[0]->firstamt)) { ?>
									<tr class="td_euz">
										<th colspan="4">Payment Option/s</th>
									</tr>
									
									<tr class="td_euz">
										<th class="thead-dark">Deposit</th>
										<td><?php //echo $event[0]->firstamt;
echo number_format((float)$event[0]->firstamt, 2, '.', '');
$famount=round($event[0]->firstamt,2);

										 ?> €</td>
										<td colspan="2"><?php echo $event[0]->firstdesc; ?></td>
									</tr>
									<tr class="td_euz">
										<th class="thead-dark">Balance Amount</th>
										<td><?php //echo $event[0]->secondamt;
                                               //echo number_format((float)$event[0]->secondamt, 2, '.', '');
                                               $balamt=($payableamt-$famount);
                                               echo number_format((float)$balamt, 2, '.', '');
										 ?> €</td>
										<td colspan="2"><?php echo $event[0]->seconddesc; ?></td>
									</tr>
									<?php } } //} ?>
								</tbody>
							</table>
						</div> 

						<?php } ?>


						
						<br>					
						<a href="#" data-toggle="modal" data-target="#EnquiryProduct" class="btn btn-cardbutn my-1">Contact Details</a>
						<?php if(!empty($event[0]->fee)) { ?>
						<?php if(empty($username)) { 
						
						if ($event[0]->dates=='singledate'){
						$toddate=Date("Y-m-d");
							$strtimedt=strtotime($toddate);
							//echo $retraining[0]->startdate;
							
							if ($strtimedt<=$event[0]->startdate){
						
								
						
						?>				
						<input type="button" class="btn btn-cardbutn my-1" value="Registration Form" data-toggle="modal" data-target="#Logregister" id="contactus">
						<?php 
							}
						    
						}else{
						    
						 $toddate=Date("Y-m-d");
							$strtimedt=strtotime($toddate);
							//echo $seminar[0]->enddate;
							
							if ($strtimedt<=$event[0]->enddate){
						
						
						
						?>				
					<input type="button" class="btn btn-cardbutn my-1" value="Registration Form" data-toggle="modal" data-target="#Logregister" id="contactus">
						<?php 
						
							}    
						    
						    
						    
						    
						    
						    
						    
						    
					 	}
						
						
						
						
						} else { ?>
						<input type="button" class="btn btn-cardbutn my-1" value="Payment Form" data-toggle="modal" data-target="#payoption" id="contactus">
						<?php } } else { if(empty($username)) {
						
						
						?>
						<!--<input type="button" class="btn btn-cardbutn float-right" value="Registration Form" data-toggle="modal" data-target="#newaccount">-->
						
				<?php	if ($event[0]->dates=='singledate'){
						$toddate=Date("Y-m-d");
							$strtimedt=strtotime($toddate);
							//echo $retraining[0]->startdate;
							
							if ($strtimedt<=$event[0]->startdate){
						
								
						
						?>				
						<input type="button" class="btn btn-cardbutn float-right" value="Registration Form" data-toggle="modal" data-target="#newaccount">
						<?php 
							}
						    
						}else{
						    
						 $toddate=Date("Y-m-d");
							$strtimedt=strtotime($toddate);
							//echo $seminar[0]->enddate;
							
							if ($strtimedt<=$event[0]->enddate){
						
						
						
						?>				
				<input type="button" class="btn btn-cardbutn float-right" value="Registration Form" data-toggle="modal" data-target="#newaccount">
						<?php 
						
							}    
						    
						    
						    
						    
						    
						    
						    
						    
					 	}?>
							
						
						
						
						
						
						
						
						
						
						
						
						<?php 
						
						
						} } ?>
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
								<h5 class="text-dark text-center font-weight-bold lineh27 pabout">If you have an account</h5>
								<!--<a class="btn btn-cardbutn text-white my-2" href="{{ url('/userlogin') }}">-->
								
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
	
	<?php $modtype=3;?>
	@include('registerpopevent')
	@include('paypopevent')
	@include('logreg')
	<div class="modal fade" id="EnquiryProduct" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true">
		<div class="modal-dialog modal-lg modal-dialog-centered" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="">Event</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<form class="" method="post" action="{{ url('/enquiry') }}">
					{{ csrf_field() }}
					<div class="modal-body row">							
						<div class="form-group col-lg-6 col-md-6">
							<label for="">Enquiry About</label>
							<input type="text" class="form-control" id="" name="about" required value="<?php echo $event[0]->title; ?>" />
						</div>
						<div class="form-group col-lg-6 col-md-6">
							<label for="">Name</label>
							<input type="text" class="form-control" id="" name="name" required />
						</div>
						<div class="form-group col-lg-6 col-md-6">
							<label for="">Email</label>
							<input type="email" class="form-control IsEmailFields" id="" name="email" required />
						</div>
						<div class="form-group col-lg-6 col-md-6">
							<label for="">Address</label>
							<input type="text" class="form-control" id="" name="address" required />
						</div>
						<div class="form-group col-lg-6 col-md-6">
							<label for="">City</label>
							<input type="text" class="form-control" id="" name="city" required />
						</div>											
						<div class="form-group col-lg-6 col-md-6">
							<label for="">Postal Code</label>
							<input type="text" class="form-control" id="" name="postcode" required />
						</div>
						<div class="form-group col-lg-6 col-md-6">
							<label for="">Telephone</label>
							<input type="text" class="form-control" id="" name="tel" required onkeypress="return isNumberKey(event)" />
						</div>
						<div class="form-group col-lg-12 col-md-12">
							<label for="">Message</label>
							<textarea name="msg" class="form-control" rows="5"></textarea>
						</div>											
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-dismiss="modal" style="border-radius: 50px;">Cancel</button>
						<button type="submit" class="btn btn-cardbutn" id="btnSubmit">Submit</button>
					</div>
				</form>
			</div>
		</div>
	</div>	
	@include('footer') 
	<script src="{{ url('/Scripts/bootstrap-datepicker.min.js') }}"></script>
    <script>
        $('.input-group.date').datepicker({ format: "dd/mm/yyyy" });
		$(function () {
			$(".anavelink").css({ "color": "#58595b"});
			$("#Events").css({ "color": "#fbdc00", "border-bottom": "#fbdc00 solid 1px", "font-weight": "600" });
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



