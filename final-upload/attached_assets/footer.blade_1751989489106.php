<style>
	.fixed-bottom
	{
		background-color: #1d1d1dd1;
		font-size: 14px;
		line-height: 24px;
	}	
	.divider {
   border-top: 1px dashed rgba(255, 255, 255, 0.5); /* Dashed, semi-transparent white */
    width: 80%; /* Keeps it from stretching too wide */
    margin-left: 0px auto; /* Centers and adds spacing */

</style>

<script src="<?php echo url('Content/js/terms.js'); ?>"></script>


<button type="button" class="euz_btnfix"><i class="far fa-comment-alt"></i><span style="font-size:10px;">FOLLOW US</span></button>

<div class="euz_fixbox">
    <div class="euz_fixbox_inner"><a class="euz_soc" target="_blank" href="{{ $settings[0]->facebook }}"><i class="fab fa-facebook-f"></i></a></div>
    <div class="euz_fixbox_inner"><a class="euz_soc" target="_blank" href="{{ $settings[0]->youtube }}"><i class="fab fa-youtube"></i></a></div>
    <div class="euz_fixbox_inner"><a class="euz_soc" target="_blank" href="{{ $settings[0]->twitter }}"><i class="fab fa-instagram"></i></a></div>
</div>



<button type="button" class="euz_btnfix1"><i class="fas fa-phone-volume" style="font-size:40px;-webkit-transform: rotate(-50deg);-moz-transform: rotate(-50deg);"></i></button>

<div class="euz_fixbox1 p-4 bg-white">
    <i class="far fa-times-circle euz_ic"></i>
    <br>
    <p class="mb-0 ml-5">Phone <span style="font-family: Centurybold;">{{ $settings[0]->company_contact }}</span></p>
    <hr class="my-2 ml-5" style="border-top-color:#b1b3b4 !important;">
    <p class="mb-0 ml-5">Fax <span style="font-family: Centurybold;">{{ $settings[0]->fax }}</span></p>
   
</div>


<a href="{{ url('/Contact') }}" class="euz_btnfix2"><i class="far fa-envelope" style="font-size:40px;color:#212529;"></i></a>



<script>

$('.euz_fixbox, .euz_fixbox1').hide()

$(document).ready(function () {
  $(".euz_btnfix").click(function () {
    $(".euz_fixbox").animate({
      width: "toggle"
    });
  });
  
});
</script>
<script>
    $(document).ready(function(){
   $(".euz_btnfix1, .euz_ic").click(function () {
    $(".euz_fixbox1").animate({
      width: "toggle"
    });
  }); 
});
</script>
<div class="container-fluid">
	<div class="row footercustom">
		<div class="container">
			<div class="row py-5">
				<div class="col-md-5">
					<h4 class="font-weight-bold mb-3">Address</h4>
					<ul class="ul">
						<li style="line-height: 26px;" class=""><i class="fas fa-map-marker-alt mr-2" style="margin-left: -20px;"></i><span>{{ $settings[0]->company_address }}</span></li>
						<li class=""><i class="far fa-envelope mr-2" style="margin-left: -20px;"></i><span class="">{{ $settings[0]->from_email }}</span></li>
						<li class=""><i class="fas fa-phone-volume mr-2" style="margin-left: -20px;"></i><span class="">{{ $settings[0]->company_contact }}</span></li>
						<li class=""><i class="fas fa-fax mr-2" style="margin-left: -20px;"></i><span class="">{{ $settings[0]->fax }}</span></li>
					</ul>
				</div>
				<div class="col-md-3">
                    <h4 class="font-weight-bold mb-3">Information</h4>
                    <ul class="ulinfo mb-0 pl-0">
                    <li class=""><a href="{{ url('/aboutus') }}" class="fotlink">About Us</a></li>
                    <li class=""><a href="{{ url('/Seminar') }}" class="fotlink">Education</a></li>
                    <!--<li class=""><a href="{{ url('/Training') }}" class="fotlink">Training</a></li>-->
                    <li class=""><a href="{{ url('/Events') }}" class="fotlink">Newsroom</a></li>
                    <li class=""><a href="{{ url('/Products') }}" class="fotlink">Products</a></li>
                    <!--<li class=""><a href="{{ url('/News') }}" class="fotlink">News</a></li>
                    <li class=""><a href="{{ url('/Faq') }}" class="fotlink">FAQ</a></li>-->
                    <li class=""><a href="{{ url('/Contact') }}" class="fotlink">Contact Us</a></li> 
                    <li class="divider"></li>
                    <li class=""><a href="{{ url('/policynotice') }}" class="fotlink"><i class="fa fa-address-card" style="margin-left: -20px;"></i> Privacy Notice</a></li>
                    <li class="divider"></li>
                    <li><a href="{{ url('/terms') }}" class="fotlink"><i class="fa fa-certificate" style="margin-left: -20px;"></i> Terms and Conditions </a></li>
                    <li class="divider"></li>
                    <li><a href="{{ url('/newsletter-consent') }}/" class="fotlink"><i class="fa fa-bullhorn" style="margin-left: -20px;"></i> Newsletter Consent</a></li>
                    <li class="divider"></li>

                    </ul>
                </div>

				<div class="col-md-4">
				<div class="col-md-12">
					@if(session()->has('quote'))
						<div class="alert alert-success">
							{{ session()->get('quote') }}
						</div>
					@endif
				</div>					
					<h4 class="font-weight-bold mb-3">Newsletter</h4>
					<form method="post" action="{{ url('/sendnews') }}">
						{{ csrf_field() }}
						<div class="input-group mb-3">
							<div style="position: relative; display: inline-block;">
    <input type="email" class="form-control footinput rounded-0" placeholder="Your Email" disabled />
    <a href="https://www.abletools.com.cy/newsletter-consent" 
       style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: transparent;"></a>
</div>

							<div class="input-group-append ml-2">
								<!--<button class="btn btn-foot" type="submit" name="subsccribe">Subscribe</button>-->
								<a href="https://www.abletools.com.cy/newsletter-consent" class="btn btn-foot">Newsletter Consent</a>

							</div>
						</div>
					</form>
					<h4 class="font-weight-bold mb-3">Follow Us</h4>
					<a class="mr-2 sp_facebook" target="_blank" href="{{ $settings[0]->facebook }}">
						<i class=" fab fa-facebook-f fontround">
						</i>
					</a>
					<a class="mr-2 sp_youtube" target="_blank" href="{{ $settings[0]->youtube }}">
						<i class="fab fa-youtube fontround"></i>
					</a>
					<a class="mr-2 sp_twitter" target="_blank" href="{{ $settings[0]->twitter }}">
						<i class="fab fa-instagram fontround"></i>
					</a>
				</div>
			</div>
			<div class="row footerbortop p-1">
				<div class="col-md-6 p-0">
					Copyrights © AbleTools <?php echo date("Y"); ?>. All Rights Reserved.
				</div>
				<div class="col-md-6 text-right p-0">
					<a class="footertext">Powered by</a>&nbsp;<b><a href="https://eurozapp.com/" target="_blank" class="footertext">Eurozapp</a></b>
				</div>
			</div>
		</div>
	</div>
</div>