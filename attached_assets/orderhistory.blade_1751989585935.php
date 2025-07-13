<?php 
	$username = session()->get('name'); 
    if(empty($username))
	{
		header('Location:'.url('/userlogin'));
		exit;
	}
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
		<div class="container" style="min-height:700px;">
            <div class="row  my-5 pt-5">		
                <div class="col-lg-8 col-md-7"><h3>Order History</h3></div>
                <div class="col-lg-4 col-md-5">
                    <div class="form-group">
                        <select class="form-control" id="comTrainingtype">
                            <option value="">--Select--</option>
                            <option value="Seminar">Seminar</option>
                            <option value="Training">Training</option>
                            <option value="Event">Event</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-12"><hr></div>
            </div>
            @if(session()->has('reg'))
            <div class="col-md-12">				
                <div class="alert alert-success">
                    {{ session()->get('reg') }}
                </div>				
            </div>
            @endif
			<div class="row my-5">
                <div class="col-md-12">
                    <div class="table-responsive tabresponsi">
                        <table class="table table-bordered" id="">
                            <thead class="thead-light">
                               <tr>
                                    <th scope="col">Sl.No</th>
                                    <th scope="col">Type</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Order Date</th>
                                    <th scope="col">Citizen</th>
                                    <th scope="col">VAT No</th>
                                    <th scope="col">Payment Type</th>
                                    <th scope="col">Payable Amount</th>
                                    <th scope="col">Date Of Payment</th>                                  
                                    <th scope="col">Paid Amount</th>
                                    <th scope="col">Date Of Second Payment</th>
                                    <th scope="col">Balance Amount</th>
                                    <th scope="col">Payment Status</th>
                                    <th scope="col">Invoice</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php $i = 1; foreach($payments as $payment) { ?>
                                <tr>
                                    <td><?php echo $i; ?></td>
                                    <td><?php echo $payment->page; ?></td>
                                    <td><?php echo $payment->title; ?></td>
                                    <td><?php echo $payment->timestamp; ?></td>
                                    
                                    <td><?php 
                                    echo "$payment->eurocitizen";
                                    
                                    ?></td>
                                    <td><?php echo $payment->vatno; ?></td>
                                    
                                    <td><?php echo $payment->paytype; ?></td>                                  
                                    <td><?php echo $payment->fullamt; ?></td> 
                                    <td><?php echo $payment->dofpay; ?></td>
                                    <td><?php echo $payment->paid; ?></td>
                                    <td><?php echo $payment->dofpaysec; ?></td>
                                    <td><?php echo $payment->bal; ?></td>
                                    <td><?php  $path='/admin/public/uploads/'.$payment->featured_image;
                                     $path2='/admin/public/uploads/'.$payment->featured_image2;
                                    
                                    ?>
                                        <?php if($payment->status == '0') { ?><span class="badge badge-warning">Pending</span><?php } ?></span>
                                         
                                        <?php if($payment->status == '1') { ?><span class="badge badge-success">success<?php } ?></span>
                                        <?php if($payment->status == '2') { ?><span class="badge badge-danger">Canceled<?php } ?></span>
                                    </td>
                                    <!--<td><a href="#" class="btn btn-primary euz_bbtn"  data-toggle="modal" data-target="#viewonl"><i class="fas fa-eye"></i></a>
                                        <a href="<?php echo url('/orderdelete/'.$payment->id); ?>" class="btn btn-danger euz_bbtn"><i class="fas fa-trash"></i></a>
                                    </td>-->
                                    <td width="14%"><?php if($payment->featured_image!='') { ?> <a href="<?php echo trim($path); ?>" target=_blank><span class="badge badge-warning">Invoice#01</span><?php  } ?></a></span>
                                         <?php if($payment->featured_image2!='') {  ?> <a href="<?php echo trim($path2);?>"  target=_blank ><span class="badge badge-warning">Invoice#02</span><?php } ?></a></span></td>
                                </tr>
                                <?php $i++; } ?>                       
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
		</div>	
	</div>
	@include('footer') 
    <script>
		$(function () {
			$(".anavelink").css({ "color": "#58595b" });
			$("#orderhistory").css({ "color": "#fbdc00", "border-bottom": "#fbdc00 solid 5px", "font-weight": "600" });
		});
		$('#comTrainingtype').on('change', function () 
		{
			var list = $(this).val();
			$.ajax({
				type : 'get',
				datatype : 'html',
				url : "{{url('orders')}}/" + list,
				data : 'id=' + list,
				success:function(data)
				{
					window.location.href = "{{url('orders')}}/" + list;
				}
			});
        });
    </script>
	<style>
		.pad1530
		{
			padding: 15px 30px;
		}
		.modal-footer
		{
			float: right;
			width: 100%;
		}
	</style>
</body>
</html>



