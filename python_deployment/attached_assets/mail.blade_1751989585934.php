<?php
//$fname=$data['fname'];
//$fname="hai";
//$data['fname']="hai";
?>
<style>
	body
	{
		font-family: sans-serif;
	}
</style>
<div style='width:100%;float: left;'>
	<!--<img src='Content/image/abletools.png' style='width:150px;'>-->
	<img src="{{$message->embed(asset('public/upload/abletools.png'))}}">
	<div>
		<h3>Thanks for Registering,{{$fname}}</h3>
		<br>
		<h3 style='line-height: 2;'>{{$headingname}}</h3>
		<br>
		<p>Date and Time:</p>
		<p style='color:#B22222;'><b>{{$semdate}}</b></p>
		<p style='color:#B22222;'><b>Duration - {{$dur}}</b></p>
		<hr>
		<p style='color:#a5a5a5;'>In the meantime, there are a few things you can do ahead of time to get the most out of this seminar...</p>
		<br>
		<p style='color:#B22222;'><b>Mark Your Calendar.</b></p>
		<p style='color:#B22222;'><b>Stay Connect With Us.</b></p>
		<p style='color:#a5a5a5;'>Follow our <a href='https://m.facebook.com/abletools.com.cy/'>Facebook page</a></p>
		<br></br>
		<p style='color:#a5a5a5;'>Regards,</p>
		<p style='color:#a5a5a5;'><b>Soteris Kaimis</b></p>
		<p style='color:#a5a5a5;'>CEO of AbleTools</p>
		<br>
		<small>*IMPORTANT DISCLAIMER*</small>
		<ul>
			<li><small>All information, data and company’s names used in the seminars, workshops and coaching sessions attend with      ABLETOOLS are shown as examples only AND they DO NOT constitute any recommendation in particular.</small></li>
			<li><small>ALL investment carries risk and you are fully responsible for managing your own risks.</small></li>
			<li><small>You understand that comprehensive learning, guidance, and practice is required before you should carry out strategies learned from Beyond Insights’ workshops, seminars or coaching sessions.</small></li>
			<li><small>ABLETOOLS and the speakers, trainers, and coaches are not liable for any outcome from the investment decisions you make, as a direct or indirect result of what you learned from this session.</small></li>
			<li><small>All information and materials used in this seminar are intellectual properties ABLETOOLS., AND NOT to be used for ANY OTHER purpose other than personal consumption.</small></li>
			<li><small>Photo taking or video recording or audio recording without prior consent from the speakers or organizers is NOT permitted.</small></li>
			<li><small>By attending this seminar, you agree to participate fully in the seminar, and also agree to refrain from any activities that may distract the speakers and other participants.</small></li>

		</ul>
	</div>
</div>