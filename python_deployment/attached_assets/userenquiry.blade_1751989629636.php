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
            <div class="row my-5 pt-5">		
                <div class="col-lg-12 col-md-4"><h3>Enquiry</h3></div>
                <div class="col-md-12"><hr></div>
            </div>
            @if(session()->has('quote'))
            <div class="col-md-12">				
                <div class="alert alert-success">
                    {{ session()->get('quote') }}
                </div>				
            </div>
            @endif
            	
            <form class="row" method="post" action="<?php echo url('/userenquiryform'); ?>">
                {{ csrf_field() }}
                <div class="form-group col-lg-6 col-md-6">
                    <label for="">Enquiry Type</label>
                    <select class="form-control" id="catname" name="type">
                        <option value="" selected="selected">--Select Enquiry Type--</option>
                        <option value="Seminar">Seminar</option>
                        <option value="Training">Training</option>
                        <option value="Event">Event</option>
                        <option value="Product">Product</option>
                    </select>
                </div>
                <div class="form-group col-lg-6 col-md-6" >
                    <div id="subselect"></div>
                    <?php /* <select class="form-control" id="" name="about">
                        <option value="">--select--</option>
                        <?php foreach($services as $service) { ?>
                        <option value="<?php echo $service->title; ?>"><?php echo $service->title; ?></option>
                        <?php } ?>
                    </select> */ ?>	
                </div>
                <div class="form-group col-lg-12 col-md-12">
                    <label for="">Message</label>
                    <textarea rows="5" type="text" class="form-control" id="" name="msg"></textarea>
                </div>
                <div class="form-group col-lg-12 col-md-12">
                    <input type="submit" class="btn btn-cardbutn" value="Submit">
                </div>
            </form>
            <div class="row my-5">
                <div class="col-md-12">
                    <div class="table-responsive tabresponsi">
                        <table class="table table-bordered" id="">
                            <thead class="thead-light">
                                <tr>
                                    <th scope="col" style="width:5%">Sl.No</th>
                                    <th scope="col" style="width:20%">Enquiry No</th>
                                    <th scope="col" style="width:20%">Enquiry Type</th>
                                    <th scope="col" style="width:20%">Enquiry About</th>
                                    <th scope="col" style="width:20%">Enquiry Date</th>
                                    <th scope="col" style="width:15%">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php $i = 1; foreach($userenquirys as $userenquiry) { ?>
                                <tr>
                                    <td><?php echo $i; ?></td>
                                    <td>ENQ<?php echo $userenquiry->id; ?> <?php if($i == '1') { ?><span class="badge badge-danger">NEW</span><?php } ?></td>
                                    <td><?php echo $userenquiry->type; ?></td>
                                    <td><?php echo $userenquiry->about; ?></td>
                                    <td><?php echo date('d/m/Y', $userenquiry->timestamp); ?></td>
                                    <td><a href="<?php echo url('/userenquirydetail/'.$userenquiry->id); ?>" class="btn btn-primary euz_bbtn"><i class="fas fa-eye"></i></a></td>
                                </tr>
                                <?php $i++; }  ?>
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
			$("#userenquiry").css({ "color": "#fbdc00", "border-bottom": "#fbdc00 solid 5px", "font-weight": "600" });
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
        $(document).ready(function() {
            $('#catname').on("change", function(evt)
            {
                var str = $(this).val();
                console.log(str);
                getProducts(str);
            });
           function getProducts(product_category_id) 
    	   {
    		    $.get("{{url('/get-products')}}/" + product_category_id, function (data) 
    			{
    			    //alert(data);
                    $("#subselect").html(data);;
                });				
            }
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



