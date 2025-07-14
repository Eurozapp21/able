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
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
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
		<div class="container">
            <div class="row my-5 pt-5">
                <div class="col-lg-12 p-0"><h3 class="font-weight-bold">Enquiry on SOS Approach To Feeding<span class="text-darkd float-right">Created On: 11 December 2019</span></h3></div>
                <div class="col-md-12 p-0"><hr></div>
            </div>
            <div class="row my-3">
                <div class="col-md-12 p-0">
                    <ol class="breadcrumb bgdetailproduct rounded-0">
                        <li class="breadcrumb-item"><a class="font-weight-bold text-dark" href="/Enquiry">Enquiry</a></li>
                        <li class="breadcrumb-item active">View Enquiry</li>
                    </ol>
                </div>
            </div>
            <div class="col-lg-12 col-md-12 my-4">
                <div class="p-2">
                    <div class="row">
                        <div class="col-lg-2 col-sm-6"><div class="bor"><b>Enquiry No</b></div></div>
                        <div class="col-lg-4 col-sm-6 p-0"><div class="nobor"> : <span class="">ENQ<?php echo $userenquiry[0]->id; ?></span></div></div>
                        <?php if(empty($amt[0]->fee)) { ?>
                        <div class="col-lg-6 col-sm-6">
                            <div id="freestatus" style="margin-bottom:0px;" class="row"><div class="col-lg-6 col-sm-6"><div class="bor"><b style="color:#f57f25">Free Seminar</b></div></div></div>
                        </div>
                        <?php } else { ?>
                        <div class="col-lg-2 col-sm-6"><div class="bor"><b>Amount</b></div></div>
                        <div class="col-lg-4 col-sm-6 p-0"><div class="nobor"> : <span class=""><?php echo $amt[0]->fee; ?></span></div></div>
                        <?php } ?>
                        <div class="col-lg-2 col-sm-6"><div class="bor"><b>Enquiry Type</b></div></div>
                        <div class="col-lg-4 col-sm-6 p-0"><div class="nobor"> : <span class=""><?php echo $userenquiry[0]->type; ?></span></div></div>
                        <div class="col-lg-2 col-sm-6"><div class="bor"><b>Enquiry About</b></div></div>
                        <div class="col-lg-4 col-sm-6 p-0"><div class="nobor"> : <span class=""><?php echo $userenquiry[0]->about; ?></span></div></div>
                        <div class="col-lg-2 col-sm-6"><div class="bor"><b>Occupation</b></div></div>
                        <div class="col-lg-4 col-sm-6 p-0"><div class="nobor"> : <span class=""><?php echo $user[0]->occu; ?></span></div></div>
                        <div class="col-lg-2 col-sm-6"><div class="bor"><b>Name</b></div></div>
                        <div class="col-lg-4 col-sm-6 p-0"><div class="nobor"> : <span class=""><?php echo $user[0]->fname; ?></span></div></div>
                        <div class="col-lg-2 col-sm-6"><div class="bor"><b>Email</b></div></div>
                        <div class="col-lg-4 col-sm-6 p-0"><div class="nobor"> : <span class=""><?php echo $user[0]->email; ?></span></div></div>
                        <div class="col-lg-2 col-sm-6"><div class="bor"><b>Phone</b></div></div>
                        <div class="col-lg-4 col-sm-6 p-0"><div class="nobor"> : <span class=""><?php echo $user[0]->phone; ?></span></div></div>
                        <div class="col-lg-2 col-sm-6"><div class="bor"><b>City</b></div></div>
                        <div class="col-lg-4 col-sm-6 p-0"><div class="nobor"> : <span class=""><?php echo $user[0]->city; ?></span></div></div>
                        <div class="col-lg-2 col-sm-6"><div class="bor"><b>Postal Code</b></div></div>
                        <div class="col-lg-4 col-sm-6 p-0"><div class="nobor"> : <span class=""><?php echo $user[0]->postcode; ?></span></div></div>
                        <div class="col-lg-2 col-sm-6"><div class="bor"><b>Address</b></div></div>
                        <div class="col-lg-10 col-sm-6 p-0"><div class="nobor"> : <span class=""><?php echo $user[0]->address; ?></span></div></div>
                    </div>
                </div>
                <div class="row mb-5 border p-4" style=" background-color: #f1f2f3;">
                    <div id="adminusermessages"> 
                        <div class="col-lg-12 col-md-12 my-2">
                            <div class="p-2 rounded-0 border-0"> 
                                <div class="row">
                                    <div class="col-md-12 mb-3">
                                        <i class="fas fa-user-tie fontsearch"></i>&nbsp;<span class="h3print">User</span> 
                                    </div>
                                    <div class="col-md-12">
                                        <h5 class="card-title font-weight-bold"><span class="text-darkd"><?php echo date('d M Y', $userenquiry[0]->timestamp); ?></span></h5> 
                                        <p class="card-text text-justify cardtest my-2"><?php echo $userenquiry[0]->msg; ?></p>
                                    </div> 
                                </div>
                            </div>
                            <hr style="border-color: #eee !important;">
                        </div>
                        <?php foreach($chats as $chat) { ?>
                        <div class="col-lg-12 col-md-12 my-2">
                            <div class="p-2 rounded-0 border-0">
                                <div class="row">
                                    <?php if($chat->send == '1') { ?>
                                    <div class="col-md-12 mb-3">
                                        <i class="fas fa-headset fontsearch" style="background-color:#7ac044 !important;"></i>&nbsp;
                                        <span class="h3print" style="color:#7ac044 !important;">Admin</span> 
                                    </div>
                                    <?php } else { ?>
                                        <div class="col-md-12 mb-3">
                                        <i class="fas fa-user-tie fontsearch"></i>&nbsp;<span class="h3print">User</span> 
                                    </div>
                                    <?php } ?>
                                    <div class="col-md-12">
                                        <h5 class="card-title font-weight-bold"><span class="text-darkd"><?php echo date('d M Y', $chat->timestamp); ?></span></h5>
                                        <p class="card-text text-justify cardtest my-2"><?php echo $chat->msg; ?></p>
                                    </div>
                                </div>
                            </div> 
                            <hr style="border-color: #eee !important;"> 
                        </div>
                        <?php } ?>
                    </div>
                    <div class="col-lg-12 col-md-12 my-2">
                        <div class="p-2 rounded-0 border-0">
                            <form action="<?php echo url('/sendmsg'); ?>" method="post">
                                {{ csrf_field() }}
                                <div class="row">
                                    <div class="form-group col-lg-12 col-md-12">
                                        <label for="">Message</label>
                                        <textarea rows="5" type="text" class="form-control" id="txtreplymessage" name="msg"></textarea>
                                        <span style="color:red" class=""></span>
                                    </div>
                                    <input type="hidden" name="enqid" value="<?php echo $userenquiry[0]->id; ?>" />
                                    <div class="form-group col-lg-12 col-md-12">
                                        <input type="submit" class="btn btn-cardbutn" value="Submit">
                                    </div>
                                </div>
                            </form>
                        </div>
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



