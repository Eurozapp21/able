
<?php error_reporting(0);?>

<div class="modal fade" id="newaccount" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true">
	<div class="modal-dialog modal-lg modal-dialog-centered euz_model_lg" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="">Registration Form </h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<!--<form class="popmodalfrmlog formlog" method="post" id="frm" action="{{ url('/storelog') }}"  onsubmit="return val()";>-->
			<form class="popmodalfrmlog formlog" method="post" id="frm" action="{{ url('/storelog') }}" >
                {{ csrf_field() }}
                <div class="modal-body">							
                    <div class="row border p-3 m-2 nextmod1">
                        <div class="col-md-12">
							<h5 class="font-weight-bold" id="">Participant Details </h5><hr>
						</div>
						<div class="form-group col-lg-3 col-md-4">
                            <input type="radio" class="" id="eushow" onclick="showtxt()" name="citi" value="EU Citizen" required /><label for="" class="ml-2">EU Citizen</label><span style="color: #fbdc00;"> *</span>
                        </div>
                        
                        <div class="form-group col-lg-6 col-md-4 yesno">
                            <label class="mr-2 euz_wi">Do you have Vat Number?</label>
                            <input type="radio" class="" id="eushowyes" name="dovatno" value="1" onclick="showhavingvatno()" /><label for="" class="ml-2">Yes</label><span style="color: #fbdc00;"> *</span>
                            <input type="radio" class="" id="eushowno" name="dovatno"  value="2" onclick="hidehavingvatno()" /><label for="" class="ml-2">No</label><span style="color: #fbdc00;"> *</span>
                        </div>
                        
                        <div class="form-group col-lg-3 col-md-4">
                            <input type="radio" class="" id="euhide" onclick="hidetxt()" name="citi" value="Non-EU Citizen" required /><label for="" class="ml-2">Non-EU Citizen</label><span style="color: #fbdc00;"> *</span>
                        </div>
                        
						<div class="form-group col-lg-3 col-md-4">
                            <label for="" class="eudiv">VAT Number</label><span style="color: #fbdc00;" class="eudiv"> *</span>
                            <input type="text" class="form-control eudiv" id="vatno1log" name="vatno"  />
                        </div>
                        <div class="form-group col-lg-3 col-md-4">
                            <label for="" class="eudiv">Re-Enter VAT Number</label><span style="color: #fbdc00;" class="eudiv"> *</span>
                            <input type="text" class="form-control eudiv" id="revatno1log" name="revatno"  />
                        </div>
                        
                        
                        <div class="form-group col-lg-3 col-md-4">
                            <label for=""> Name</label><span style="color: #fbdc00;"> *</span>
                            <input type="text" class="form-control" id="fnamelog" name="fname" required />
                        </div>
                        <div class="form-group col-lg-3 col-md-4">
                            <label for="">Surname</label>
                            <input type="text" class="form-control" id="" name="lname" />
                        </div>
                        <div class="form-group col-lg-3 col-md-4">
                            <label for="">Title</label><span style="color: #fbdc00;"> *</span>
                            
                            <?php if ($modtit==''){?>
                            <input type="text" class="form-control" id="" name="title" required  value="<?php echo $_GET['ti']; ?>" <?php if ($_GET['ti']!=''){?> readonly <?php } ?> />
                            
                            <?php } else {?>
                            <input type="text" class="form-control" id="" name="title" required  value="<?php echo $modtit; ?>" <?php if ($modtit!=''){?> readonly <?php } ?> />
                        <?php } ?>
                        </div>
                        <div class="form-group col-lg-3 col-md-4">
                            <label for="">Company/ Org</label>
                            <input type="text" class="form-control" id="" name="org" />
                        </div>
                        <div class="form-group col-lg-3 col-md-4">
                            <label for="">Address</label>
                            <input type="text" class="form-control" id="" name="address" />
                        </div>
                        <div class="form-group col-lg-3 col-md-4">
                            <label for="">City</label>
                            <input type="text" class="form-control" id="" name="city" />
                        </div>
                        <div class="form-group col-lg-3 col-md-4">
                            <label for="">Postal code</label>
                            <input type="text" class="form-control" id="" name="postcode" />
                        </div>
                          <input type="hidden" name="modtype" value="<?php echo $modtype;?>" />

<?php if ($modtype==1){?>
                            <input type="hidden" name="headingtypelog" value=1 />
						<input type="hidden" name="headingidlog" value="<?php echo $seminar[0]->id; ?>" />
                            <?php } ?>
<?php if ($modtype==2){?>
                            <input type="hidden" name="headingtype" value=2 />
						<input type="hidden" name="headingidlog" value="<?php echo $retraining[0]->id; ?>" />
                            <?php } ?>
                            <?php if ($modtype==3){?>
                            <input type="hidden" name="headingtypelog" value=3 />
						<input type="hidden" name="headingidlog" value="<?php echo $event[0]->id; ?>" />
                            <?php } ?>
                        <div class="form-group col-lg-3 col-md-4">
                            <label for="">Country</label>
                            <input type="text" class="form-control" id="" name="country" />
                        </div>
                        <div class="form-group col-lg-3 col-md-4">
                            <label for="">Tel.</label>
                            <input type="text" class="form-control IsNumberFields" id="" name="phone" required onkeypress="return isNumberKey(event)" />
                        </div>
                        <div class="form-group col-lg-3 col-md-4">
                            <label for="">Fax</label>
                            <input type="text" class="form-control" id="" name="fax" />
                        </div>
                        <div class="form-group col-lg-3 col-md-4">
                            <label for="">Mobile</label><span style="color: #fbdc00;"> *</span>
                            <input type="text" class="form-control" id="" name="mobile" required onkeypress="return isNumberKey(event)"/>
                        </div>
                        <div class="form-group col-lg-3 col-md-4">
                            <label for="">Email</label><span style="color: #fbdc00;"> *</span>
                            <input type="email" class="form-control IsEmailFields" id="emaillog" name="emailreg" required />
                        </div>                      
                        <div class="form-group col-lg-3 col-md-4">
                            <label for="">Password</label><span style="color: #fbdc00;"> *</span>
                            <input type="password" class="form-control" id="txtPassword1" name="pass" required />
                        </div>
                        <div class="form-group col-lg-3 col-md-4">
                            <label for="">Re-Enter Password</label><span style="color: #fbdc00;"> *</span>
                            <input type="password" class="form-control" id="txtConfirmPassword1" name="conpass" required />
                        </div> 
                        <!--<div class="col-md-12">
							<input type="checkbox" name="discheck" id="discheck1" style="margin-left: 10px;" /> I need invoice
						</div>-->
                    </div>
                    <div class="row border p-3 m-2 nextmod1 secform" style="display: none;">
						<div class="col-md-12">
							<h5 class="font-weight-bold" id="">Στοιχεία Τιμολογίου / Invoice Information</h5><hr>
						</div>
					
                        <div class="form-group col-lg-3 col-md-4">
                            <label for="">Organization Name</label>
                            <input type="text" class="form-control" id="" name="orgname">
                        </div>
						<div class="form-group col-lg-3 col-md-4">
                            <label for="">Address 1</label>
                            <input type="text" class="form-control" id="" name="address1">
                        </div>
						<div class="form-group col-lg-3 col-md-4">
                            <label for="">Address 2</label>
                            <input type="text" class="form-control" id="" name="address2">
                        </div>
						<!--<div class="form-group col-lg-3 col-md-4">
                            <label for="">T.I.C</label>
                            <input type="text" class="form-control" id="" name="tic">
                        </div>--->
						<div class="form-group col-lg-3 col-md-4">
                            <label for="">Others</label>
                            <input type="text" class="form-control" id="" name="day">
                        </div>
						<div class="form-group col-lg-3 col-md-4">
                            <label for="">Occupation</label>
                            <input type="text" class="form-control" id="" name="occu">
                            
                          
                            
                        </div>
                    </div>
                </div>
                
                
                <div class="row border p-3 m-2 nextmod1 termsdiv" style="display: none;">
                        <div class="col-md-12">
    			    		<h5 class="font-weight-bold" id="">Terms and Conditions</h5><hr>
    			    	</div>
    			    	<div class="col-md-12">
    			    	    <?php if  ($seminar[0]->onlineopt!="Online Seminar"){?>
    			    		<?php echo $seminar[0]->terms; ?>
    			    		<?php } ?>
    			    		
    			    		<?php //if  ($seminar[0]->onlineopt=="Online Seminar"){?>
    			    		
    			    		<!--<p>Denial of Responsibility:
All the information contained in this flyer is accurate at the time of release. Organizers of this event have the right to make changes to the program, topics, and speakers as deemed necessary without prior notification.
<br>
Cancelation Policy
Cancellation will have to be send in written until January 15, 2021 .
- A €90 administrative fee will be applied to all refunds.
- No refunds will be issued for cancellations received on  February 5th, 2020 or later, but registration may be substituted for another attendee.
AbleTools Ltd must be notified of substitutions at least 24 hours in writing (email acceptable) before the start of the event otherwise the substitution cannot be honored. If the organizers cancel the course, full amount of registration fees will be returned.
The organizer is not responsible for delays or cancellations due to weather, airline mechanical or scheduling issues, acts of God and acts of terrorism. If the conference is cancelled due to weather, airline mechanical or scheduling issues, acts of God and acts of terrorism, AbleTools ltd will make good faith effort to reschedule this Conference at the first possible mutually decided upon date between the HOST and SPEAKER.
</p>
                   <input type="radio" name="terms2agr" id="terms2agr1log" style="margin-left: 10px;"  onclick="enableterms2log();" /> I Agree
                   <input type="radio" name="terms2agr" id="terms2agr2log" style="margin-left: 10px;"  onclick="disterms2log();" /> I dis Agree-->
                   <?php //}?>
    			    	</div>
				    </div>
            <div class="row border p-3 m-2 nextmod1 termsdiv2" style="display: none;">
                        <!--<div class="col-md-12">
    			    		<h5 class="font-weight-bold" id="">Attendance Policies</h5><hr>
    			    	</div>
    			    	<div class="col-md-12">
    			    	    <p align="center"><h4 align="center">Conference Learning Expectations & Requirements for 
SOS Certificate of Attendance- CYPRUS</h4>
</p>
<p>As we adapt the live-taught SOS Approach to Feeding Conference to an on-line streaming format secondary to the Coronavirus pandemic, we have created these Guidelines and Instructions to ensure that participants meet all the learning outcomes necessary to begin correctly using and safely practicing the SOS Approach to Feeding program.</p>
<p><u>Technical Requirements</u>
<br>
<ul><li>A computer is the preferred device for participating in this on-line Conference.  Taking the conference on a phone is not permitted.  A tablet might be allowable if the other requirements below can be met with that tablet</li>
<li><b></b>You MUST be able to hard-wire your computer directly into the Internet connection via and Ethernet cord.</b>  WiFi connections to the internet are not sufficient and will not provide you with enough clarity to view videos and Speaker demonstrations.  In addition, WiFi connections cause many technical problems resulting in too much time lost from the conference</li>
<li>A working Webcam on your computer is required (most laptops have the camera embedded).</li>
<li>Headphones/Earbuds to listen to the conference from your device are suggested to provide you with the clearest signal and the least amount of background noise and static interference</li>
<li><b>YOU ARE REQUIRED TO ATTEND ONE OF THE CONFERENCE TEST RUN SESSIONS</b> during the week prior to the conference.  Your Conference Welcome Email sent 2 weeks prior to the Conference Start Date will give you the Zoom Links and the dates + times for those Test Run sessions.  THESE TEST RUNS ARE TO CHECK YOUR ABILITY TO COMMUNICATE DIRECTLY AND CORRECTLY WITH THE SPEAKERS DURING THE CONFERENCE ITSELF.  Therefore, it will be best that you take the Test Run from the computer that you will be taking the Conference on</li>
</ul>
<u><b>Conference Guidelines and Expectations</b></u><br>
In order to comply with SOS Approach to Feeding attendance requirements and Professional Continuing Education Credit (<b>if</b> offered; please check with Conference HOST regarding whether any CEU’s are offered PRIOR to registering), the following methods will be used to verify that participants are learning the materials and actively participating throughout the entire the SOS Approach to Feeding Online Conference.
<ul><li><b>Conference participants are required to sign into Zoom each day</b></li>
<ul><li>The login process will mirror the typical sign-in/sign-out requirements which are used in the SOS Approach to Feeding’s in-person conferences and set forth by most Professional Associations.</li>
<li>This information will be tracked and provided to each appropriate Professional Association to meet continuing education credit standards (<b>if</b> CE’s are offered)</li>
<li>If the participant has not logged in, an SOS Conference Administrator will contact the participant to identify and problem solve any potential technical issues interfering with login.</li>
<ul><li><b>If you are encountering any technical issues, we have support staff available to assist you.  Please contact us at info@sosapproach.com or by calling #1-720-672-1143 as soon as possible</b></li></ul>
</li>
<li>If the participant has not logged in and the issue is determined to be something other than a technical issue, an SOS Conference Administrator will work with the participant to determine a plan for resolving the issue.</li>
<li>Participants are REQUIRED to arrive on-time for each day of the Conference and to attend the Conference in its’ entirety.</li>
</ul>

<li><b>Conference participants will be expected to answer 8-10 Test Questions twice each day </b><font color="red"><b>IN ENGLISH</b></font> to demonstrate understanding of materials presented.  If the Participant feels that they must have the SOS Tests presented to them in Greek in order to accurately pass the tests, the Participants MUST notify the HOST of this need during the registration process in advance of the Conference itself.</li>
<ul><li>Schedule of test questions</li>
<ul><li>Days 1 and 2</li>
<ul><li>Beginning of Dinner break (6:15pm to 6:30pm)</li>
<li>End of the day (9:00pm to 9:15pm).</li>
</ul>
<li>Days 3, 4 and 5</li>
<ul><li>Beginning of Dinner break (7:15pm to 7:30pm)</li>
<li>End of the day (10:00pm to 10:15pm)</li>
</ul>



</ul>

</li>

<li>Participants will receive Test Questions via Survey Monkey.  Participants are expected to submit their answers prior to taking their scheduled break or leaving for the end of the day. Answers will be reviewed and scored by SOS Approach to Feeding Conference Administrators.
</li>
<li>Participants who do not answer the questions for each section will be contacted by an SOS Approach to Feeding Conference Administrator to problem solve any difficulties on the participant’s part in answering the questions.
</li>
<li><b>To receive a Certificate of Attendance/Completion (via email), participants must answer 80% of the Test Questions correctly.</b>  If a participant does not pass, they will be contacted by an SOS Approach to Feeding Conference Administrator to identify next steps</li>
</ul>
<li><b>Participants will be expected to engage in Teaching Exercises as demonstrated and taught in the conference.</b></li>
<ul><li>The Postural Stability Exercise will require you sit in a typical office/kitchen chair.</li>
<li>The Breathing Exercise will require you observe one of the SOS Professors, as well as engage in a short, shallow breathing exercise yourself.</li>
<li>The Developmental Food Continuum/Oral-Motor Exercises will require you to follow an SOS Professor in practicing with and eating various foods.  <b>THE FOOD REQUIREMENT LIST WILL BE SENT TO YOU IN A SEPARATE CONFERENCE WELCOME EMAIL </b>2 weeks prior to the Conference Start Date.</li>
<li>The Food Hierarchy Exercise will require that you create and submit a Food Hierarchy to the SOS Professors</li>
<li>The Steps to Eating Hierarchy Exercises will require you to play with food</li>
<li>As part of this conference, you will be seen, and be able to see your colleagues participating in these physical exercises.</li>
</ul>
<li><b>Conference participants will be expected to submit Comments via the Zoom Chat Box <font color="red"><b>IN ENGLISH ONLY</b></font> in response to questions asked of them by the Speaker at least twice and up to four times daily.  These Comments will include your reactions to the Teaching Exercises.</b></li>
<ul><li>If participants do not submit a comment when prompted, an SOS Approach to Feeding Conference Administrator will contact the participant to problem solve any difficulties on the participant’s part in providing their comments</li></ul>
<li><b>Participants will be required to have their computer camera on throughout the online conference to help verify attendance and participation in the Teaching Exercises.</b></li>
<ul><li>We certainly understand that you may need to step away from the conference for a moment.  However, please be aware that you will be missing important Conference materials if you are away from your computer and the Conference for more than a few minutes at a time.  Therefore, we strongly encourage you to wait until the scheduled breaks </li></ul>
<li><b>Participants must provide a contact number and preferred email address where they will be available throughout the Conference to the SOS Conference Administrators PRIOR to the start of the Conference in case a Conference Administrator needs to contact you.</b></li>

</ul>
<b><u>Additional Conference Requirements for Students:</u></b>
<ul><li>The Student is ideally in their last year of graduate work in their program</li>
<li>The Student is under the supervision of a Professor from their program who is aware that the student is attending the training</li>
<li>This Professor must already be fully SOS Trained or must attend the same training conference as the student</li>
<li>This Professor gives the student written permission from the Graduate program to attend our training – especially if the student is only in their 2nd or 3rd year of the program – and this permission letter is submitted with their registration form</li>
<li>The Professor ensures that the student is not practicing the SOS Approach to Feeding program independently (I.E. the professor is present in the sessions with the Student and accepts responsibility and provides supervision for the student engaging in any treatment using the SOS program)</li>

</ul>
<b>Please note, due to the Time Zone differences between Cyprus and the Speaker’s homes in the USA, as well as the extra time required for the participant comments and on-line format during this Conference, the SOS Approach to Feeding Online Conference is extended to 5 days – Saturday (2:00pm – 9pm), Sunday (2:00pm- 9:00pm) and Monday, Tuesday and Wednesday (3:00 am – 10:00 pm) Cyprus (GMT+3) Time Zone</b><br>
<table border="1" align="center">
<tr><th>DATE</th><th>CYPRUS HOST TIME</th></tr>
    <tr><td>February 27, 2021</td><td>2pm to 9pm </td></tr>
    <tr><td>February 28, 2021</td><td>2pm to 9pm </td></tr>
    <tr><td>March 1, 2021</td><td>3pm to 10pm </td></tr>
    <tr><td>March 2, 2021</td><td>3pm to 10pm </td></tr>
     <tr><td>March 3, 2021</td><td>3pm to 10pm </td></tr>
    </table>
** Participants are expected to attend the Conference for the entire length of each day in order to receive their Certificate of Attendance. Participants will miss crucial information needed to be able to correctly use the SOS Approach to Feeding program if they come late or leave the Conference early and/or if they step away from their computer for any extended length of time
</p>-->
    			    		<?php //echo $seminar[0]->terms; ?><?php //if  ($seminar[0]->onlineopt=="Online Seminar"){?>
                   <!--<input type="radio" name="terms3agr" id="terms3agr1log" style="margin-left: 10px;"  onclick="enableterms3log();" /> I Agree
                   <input type="radio" name="terms3agr" id="terms3agr2log" style="margin-left: 10px;"  onclick="disterms3log();" /> I dis Agree-->
                   <?php //}?>
    			    	<!--</div>-->
				    </div>
				    
<div class="row border p-3 m-2 nextmod1 termsdiv3" style="display: none;">
                        <div class="col-md-12">
    			    		<h5 class="font-weight-bold" id="">Conference Language writing tests</h5><hr>
    			    	</div>
    			    	<div class="col-md-12">
    			    		<?php //echo $seminar[0]->terms; ?>
    			    		<!--<p><b>PLEASE BE AWARE THAT THIS CONFERENCE WILL BE PRESENTED AND TAUGHT IN ENGLISH, WITH LIVE GREEK TRANSLATION AVAILABLE.</b> 
    			    		<br>
Participants are expected to have mastery of the English language that is sufficient to:
<ol><li>Provide short written answers in English to questions asked of them verbally by the Speaker’s during the conference itself.</li>
<li>Respond to any administrative email or Private Chat sent to the participant in English.</li>
<li>Reply back to that email or Chat in English as the Speaker’s and Host Staff do not speak Greek.</li>
<li>Successfully understand and pass two short tests in English each day.  If a participant needs to take the tests in Greek, the participant must make this request during the registration process by sending email to education@abletools.com.cy</li>
</ol>
</p>-->
    			    		
    			    		<?php //if  ($seminar[0]->onlineopt=="Online Seminar"){?>
                  <!-- <input type="radio" name="terms4agr" id="terms4agr1log" style="margin-left: 10px;"  onclick="enableterms4log();" /> I Agree
                   <input type="radio" name="terms4agr" id="terms4agr2log" style="margin-left: 10px;"  onclick="disterms4log();" /> I dis Agree-->
                   <?php //}?>
    			    	</div>
				    </div>
				    
			<div class="row border p-3 m-2 nextmod1 termsdiv4" style="display: none;">
                        <!--<div class="col-md-12">
    			    		<h5 class="font-weight-bold" id="">Time Zone Requirements</h5><hr>
    			    	</div>-->
    			    	<div class="col-md-12">
    			    		<?php //echo $seminar[0]->terms; ?>
    			    	<!--	<ul><li>You must be within the eligible time zone in order to participate in the conference</li>
    			    		<li><b><font color="red">Eligible times for this conference would be for the participant to live no more than 8 hours BEHIND the Cyprus (GMT + 3) Time Zone, and no more than 2 hours AHEAD of Cyprus (GMT+3) time zone</font></b></li>
    			    		</ul-->
    			    		


    			    		
    			    		
    			    		
    			    		<?php //if  ($seminar[0]->onlineopt=="Online Seminar"){?>
                   <!--<input type="radio" name="terms5agr" id="terms5agr1log" style="margin-left: 10px;"  onclick="enableterms5log();" /> I Agree
                   <input type="radio" name="terms5agr" id="terms5agr2log" style="margin-left: 10px;"  onclick="disterms5log();" /> I dis Agree-->
                   <?php //}?>
    			    	</div>
				    </div>	        
                
                
                
                
                
                
                
                
                <div class="modal-footer">
                    <!--<input type="checkbox" name="terms" id="terms1" style="margin-left: 10px;" class="chkag1 ter1"/> <?php //if  ($seminar[0]->onlineopt=="Online Seminar"){?> <?php //echo $seminar[0]->regformlabel1; //} else {?> I Accept Terms and Conditions<?php //} ?>-->
                   
                   
                   
                   <?php if  ($seminar[0]->onlineopt!="Online Seminar"){?>
                    <input type="checkbox" name="terms" id="terms1" style="margin-left: 10px;" class="chkag1 ter1"  />I Accept Terms and Conditions
                    <?php } else{?>
                    <?php if (($seminar[0]->onlinecond1!='')&& ($seminar[0]->regformlabel1!='')){?>
                    <label class="euz_wi"><input type="checkbox" name="terms" id="terms1" style="margin-left: 10px;" class="chkag1 ter1"  /><?php echo "<a href='#' onclick=showagre1(); >".$seminar[0]->regformlabel1."</a>";?></label>
                    <?php }?>
                    
                    <?php }?>
                    
                    
                    
                    
                    <?php if  ($seminar[0]->onlineopt=="Online Seminar"){?>
                    <?php if (($seminar[0]->onlinecond2!='') && ($seminar[0]->regformlabel2!='')){?>
                   <label class="euz_wi"><input type="checkbox" name="terms2" id="terms2log" style="margin-left: 10px;"  class="chksem1 ter2 rt2" /> <?php echo "<a href='#' onclick=showagre2(); >".$seminar[0]->regformlabel2."</a>";?></label>
                   <?php }?>
                   <?php if (($seminar[0]->onlinecond3!='') && ($seminar[0]->regformlabel3!='')){?>
                   <label class="euz_wi"><input type="checkbox" name="terms3" id="terms3log" style="margin-left: 10px;"  class="chksem1 ter3" /> <?php echo "<a href='#' onclick=showagre3(); >".$seminar[0]->regformlabel3."</a>";?></label>
                   <?php }?>
                   <?php if (($seminar[0]->onlinecond4!='') && ($seminar[0]->regformlabel4!='')){?>
                   <label class="euz_wi"><input type="checkbox" name="terms4" id="terms4log" style="margin-left: 10px;"  class="chksem1 ter4" /> <?php echo "<a href='#' onclick=showagre4(); >".$seminar[0]->regformlabel4."</a>";?></label>
                   <?php }?>
                   <?php } ?>
                    
                    
                    
                    <button type="button" class="btn btn-cardbutn ml-2" data-dismiss="modal" style="border-radius: 50px;">Cancel</button>
					<button type="submit" class="btn btn-cardbutn ml-2 nextmod21 subterms" id="btnSubmit" name="btnSubmit" style="display: none;">Submit</button>
					<!--<button type="button" class="btn btn-cardbutn ml-2 nextmod21 subterms" id="btnSubmit" name="btnSubmit" style="display: none;">Submit</button>-->
                </div>
            </form>
		</div>
	</div>
</div>


<div class="modal fade" id="confirmmodallog">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
      
        <!-- Modal Header -->
        <div class="modal-header p-2">
          <button type="button" class="close" data-dismiss="modal" onclick="subfrmlog();">&times;</button>
        </div>
        
        <!-- Modal body -->
        <div class="modal-body text-center" style="font-family: sans-serif;">
          <h3>Congratulations <span class="txtname"></span></h3>
          <h4>You're REGISTERED.</h4>
          <i class="fas fa-check-circle my-3" style="font-size: 6rem;color: #fbdc00;"></i>
          <h6>IMPORTANT! Check Your Inbox for more details.</h6>
          <h6>We sent it to <b><span class="txtemail"></span></b></h6>
		  <h6>Don't see it? Be sure to check your junk or promotional folder.</h6>
        </div>
        
        <!-- Modal footer -->
        <div class="modal-footer d-none">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
        
      </div>
    </div>
</div>



<div class="modal fade front" id="agre1log" style="" >
    <div class="modal-dialog modal-dialog-centered euz_model_lg">
      <div class="modal-content">
      
        <!-- Modal Header -->
        <div class="modal-header p-2">
            <h5 class="modal-title" id=""><?php echo $seminar[0]->regformlabel1;?></h5>
          <button type="button" class="close closefeesem" data-dismiss="modal" >&times;</button>
        </div>
        
        <!-- Modal body -->
        <div class="modal-body" style="font-family: sans-serif;">
           
            <?php echo $seminar[0]->onlinecond1;?>
          
          <!--<h4>You're REGISTERED.</h4>
          <i class="fas fa-check-circle my-3" style="font-size: 6rem;color: #fbdc00;"></i>
          <h6>IMPORTANT! Check Your Inbox for more details.</h6>
          <h6>We sent it to <b><span class="txtemail"></span></b></h6>
		  <h6>Don't see it? Be sure to check your junk or promotional folder.</h6>-->
        </div>
        
        <!-- Modal footer -->
        <div class="modal-footer d-none">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
        
      </div>
    </div>
</div>



<div class="modal fade front" id="agre2log">
    <div class="modal-dialog modal-dialog-centered euz_model_lg">
      <div class="modal-content">
      
        <!-- Modal Header -->
        <div class="modal-header p-2">
            <h5 class="modal-title" id=""><?php echo $seminar[0]->regformlabel2;?></h5>
          <button type="button" class="close closefeesem" data-dismiss="modal" >&times;</button>
        </div>
        
        <!-- Modal body -->
        <div class="modal-body" style="font-family: sans-serif;">
            
            <?php echo $seminar[0]->onlinecond2;?>
          <!--<h3>Congratulations <span class="txtname"></span></h3>
          <h4>You're REGISTERED.</h4>
          <i class="fas fa-check-circle my-3" style="font-size: 6rem;color: #fbdc00;"></i>
          <h6>IMPORTANT! Check Your Inbox for more details.</h6>
          <h6>We sent it to <b><span class="txtemail"></span></b></h6>
		  <h6>Don't see it? Be sure to check your junk or promotional folder.</h6>-->
        </div>
        
        <!-- Modal footer -->
        <div class="modal-footer d-none">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
        
      </div>
    </div>
</div>


<div class="modal fade front" id="agre3log">
    <div class="modal-dialog modal-dialog-centered euz_model_lg">
      <div class="modal-content">
      
        <!-- Modal Header -->
        <div class="modal-header p-2">
            <h5 class="modal-title" id=""><?php echo $seminar[0]->regformlabel3;?></h5>
          <button type="button" class="close closefeesem" data-dismiss="modal" >&times;</button>
        </div>
        
        <!-- Modal body -->
        <div class="modal-body" style="font-family: sans-serif;">
           
            <?php echo $seminar[0]->onlinecond3;?>
          <!--<h3>Congratulations <span class="txtname"></span></h3>
          <h4>You're REGISTERED.</h4>
          <i class="fas fa-check-circle my-3" style="font-size: 6rem;color: #fbdc00;"></i>
          <h6>IMPORTANT! Check Your Inbox for more details.</h6>
          <h6>We sent it to <b><span class="txtemail"></span></b></h6>
		  <h6>Don't see it? Be sure to check your junk or promotional folder.</h6>-->
        </div>
        
        <!-- Modal footer -->
        <div class="modal-footer d-none">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
        
      </div>
    </div>
</div>


<div class="modal fade front" id="agre4log">
    <div class="modal-dialog modal-dialog-centered euz_model_lg">
      <div class="modal-content">
      
        <!-- Modal Header -->
        <div class="modal-header p-2">
            <h5 class="modal-title" id=""><?php echo $seminar[0]->regformlabel4;?></h5>
          <button type="button" class="close closefeesem" data-dismiss="modal" >&times;</button>
        </div>
        
        <!-- Modal body -->
        <div class="modal-body" style="font-family: sans-serif;">
            
            <?php echo $seminar[0]->onlinecond4;?>
          <!--<h3>Congratulations <span class="txtname"></span></h3>
          <h4>You're REGISTERED.</h4>
          <i class="fas fa-check-circle my-3" style="font-size: 6rem;color: #fbdc00;"></i>
          <h6>IMPORTANT! Check Your Inbox for more details.</h6>
          <h6>We sent it to <b><span class="txtemail"></span></b></h6>
		  <h6>Don't see it? Be sure to check your junk or promotional folder.</h6>-->
        </div>
        
        <!-- Modal footer -->
        <div class="modal-footer d-none">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
        
      </div>
    </div>
</div>





<script>
$(".yesno").hide();
$(".eudiv").hide();
$(document).ready(function() {

   
    /*$("#eushow").click(function(){
    
    	$("#citizentype").val(1);
    	$(".yesno").show();
    	
    });
    $("#euhide").click(function(){
        
        $("#citizentype").val(2);
    	$(".eudiv").hide();
    	$(".yesno").hide();
    });*/
   
$('.chksem1').removeAttr('checked');
    $('.chkag1').removeAttr('checked');
    
    
    
    
    
});

 $("#eushowyes").click(function(){
    	$(".eudiv").show();
    });
    $("#euhideno").click(function(){
    	$(".eudiv").hide();
    });
    
function showhavingvatno(){
     $(".eudiv").show();
     $("#hidvatno").val(1);
     var req1 = document.getElementById("vatno1log");
     req1.setAttribute('required','required');
     var req2 = document.getElementById("revatno1log");
     req2.setAttribute('required','required');
 }
 function hidehavingvatno(){
     $(".eudiv").hide();
     $("#hidvatno").val(2);
     var req1 = document.getElementById("vatno1log");
     	req1.removeAttribute('required','required');
     	var req2 = document.getElementById("revatno1log");
     req2.removeAttribute('required','required');
 }
/*$("#eushow").click(function(){
    	$(".eudiv").show();
    });
    $("#euhide").click(function(){
    	$(".eudiv").hide();
    });*/
    
    
    function showtxt(){
        	//$(".eudiv").show();
        	$("#citizentype").val(1);
    	$(".yesno").show();
        	
    }
    
    
    function hidetxt(){
        	//$(".eudiv").hide();
        	$("#citizentype").val(2);
    	$(".eudiv").hide();
    	$(".yesno").hide();
    	var req1 = document.getElementById("vatno1log");
     	req1.removeAttribute('required','required');
     	var req2 = document.getElementById("revatno1log");
     req2.removeAttribute('required','required');
        	
        	
    }
</script>
<script>
$(function () {
	/*	$("#btnSubmit").click(function () {
		    var vatno=$("#vatno").val();
        var revatno=$("#revatno").val();
			var password = $("#txtPassword").val();
			var confirmPassword = $("#txtConfirmPassword").val();
			if (password != confirmPassword) {
				alert("Passwords do not match.");
				return false;
			}
			
			event.preventDefault();

		});*/
		$("#discheck1").click(function () 
		{
			if ($(this).is(":checked")) 
			{
				$(".secform").show();
			} 
			else 
			{
				$(".secform").hide();
			}
		});
		$("#terms1").click(function () 
		{
			
			if ($(this).is(":checked")) 
			{
<?php if  ($seminar[0]->onlineopt!="Online Seminar"){?>
				$(".termsdiv").show();
				var isChecked1 = $("#terms1").is(":checked");
				
<?php } ?>


    
    
    
    <?php if  ($seminar[0]->onlineopt=="Online Seminar"){?>
<?php if  ($seminar[0]->Onlinecond1!=""){?>
    var isChecked1 = $("#terms1").is(":checked");
    
    <?php }else{?>
    var isChecked1 =true;
    <?php } }?>
    
    
    
    
    
    <?php if  ($seminar[0]->onlineopt!="Online Seminar"){?>
    
if ((isChecked1)) {
        
        $(".subterms").show();
    }else{
       
         $(".subterms").hide();
    }
    
    
    
    
    
    
    <?php } else { ?>
    
    
    /*var isChecked2 = $("#terms2log").is(":checked");
    var isChecked3 = $("#terms3log").is(":checked");
    var isChecked4 = $("#terms4log").is(":checked");*/
    
    <?php if  ($seminar[0]->onlinecond2!=""){?>
    var isChecked2 = $(".ter2").is(":checked");
    
    <?php }else{?>
    var isChecked2 =true;
    <?php }?>
    
    <?php if  ($seminar[0]->onlinecond3!=""){?>
    var isChecked3 = $(".ter3").is(":checked");
    
    <?php }else{?>
    var isChecked3 =true;
    <?php }?>
    
    
    <?php if  ($seminar[0]->onlinecond4!=""){?>
    var isChecked4 = $(".ter4").is(":checked");
    
    <?php }else{?>
    var isChecked4 =true;
    <?php }?>	
    
    
    
   /* var isCheckedr1 = $("#terms2agr1log").is(":checked");
   
    var isCheckedr2 = $("#terms3agr1log").is(":checked");
    var isCheckedr3 = $("#terms4agr1log").is(":checked");
    var isCheckedr4 = $("#terms5agr1log").is(":checked");*/
    
    
    
    
    //if ((isChecked1) && (isChecked2) && (isChecked3) && (isChecked4) && (isCheckedr1) && (isCheckedr2) && (isCheckedr3) && (isCheckedr4)) {
    if ((isChecked1) && (isChecked2) && (isChecked3) && (isChecked4)) { 
        
        $(".subterms").show();
    }else{
       
         $(".subterms").hide();
    }
    
    
<?php } ?>
    
    			} 
			else 
			{
				$(".subterms").hide();
				$(".termsdiv").hide();
			}	
			
			
			
			
			
			
			
			
		//end
			
		});
		
		
		$(".ter2").click(function () 
		{
		    
			/*if ($(this).is(":checked")) 
			{
				$(".subterms").show();
				$(".termsdiv2").show();
			} 
			else 
			{
				$(".subterms").hide();
			}*/
			
	if ($(this).is(":checked")) 
			{
				
				//$(".termsdiv2").show();
				
				
				<?php if  ($seminar[0]->onlineopt=="Online Seminar"){?>
<?php if  ($seminar[0]->onlinecond1!=""){?>
    var isChecked1 = $("#terms1").is(":checked");
    
    <?php }else{?>
    var isChecked1 =true;
    <?php } }?>
		
		<?php if  ($seminar[0]->onlinecond2!=""){?>
    var isChecked2 = $(".ter2").is(":checked");
    
    <?php }else{?>
    var isChecked2 =true;
    <?php }?>
    
    <?php if  ($seminar[0]->onlinecond3!=""){?>
    var isChecked3 = $(".ter3").is(":checked");
    
    <?php }else{?>
    var isChecked3 =true;
    <?php }?>
    
    
    <?php if  ($seminar[0]->onlinecond4!=""){?>
    var isChecked4 = $(".ter4").is(":checked");
    
    <?php }else{?>
    var isChecked4 =true;
    <?php }?>	
				
				
    
     /*var isChecked1 = $("#terms1").is(":checked");
    var isChecked2 = $("#terms2log").is(":checked");
    var isChecked3 = $("#terms3log").is(":checked");
    var isChecked4 = $("#terms4log").is(":checked");*/
    /*var isCheckedr1 = $("#terms2agr1log").is(":checked");
    
    var isCheckedr2 = $("#terms3agr1log").is(":checked");
    var isCheckedr3 = $("#terms4agr1log").is(":checked");
    var isCheckedr4 = $("#terms5agr1log").is(":checked");*/
    
    
    //if ((isChecked1) && (isChecked2) && (isChecked3) && (isChecked4)  && (isCheckedr1) && (isCheckedr2) && (isCheckedr3) && (isCheckedr4)) {
    //alert(isChecked1+"----"+isChecked2+"----"+isChecked3+"-----"+isChecked4);
    if ((isChecked1) && (isChecked2) && (isChecked3) && (isChecked4)) { 
        
        $(".subterms").show();
    }else{
       
         $(".subterms").hide();
    }
    
    
    
    
    
				
				
				
			} 
			else 
			{
$(".subterms").hide();
				$(".termsdiv2").hide();
			}		
			
			
			
			
			
			
			
		});
		
		
		$(".ter3").click(function () 
		{
		    
			
			
			if ($(this).is(":checked")) 
			{
				
				//$(".termsdiv3").show();
				
				
		
		 /*var isChecked1 = $("#terms1").is(":checked");
    var isChecked2 = $("#terms2log").is(":checked");
    var isChecked3 = $("#terms3log").is(":checked");
    var isChecked4 = $("#terms4log").is(":checked");
    
    var isCheckedr1 = $("#terms2agr1log").is(":checked");
    
    var isCheckedr2 = $("#terms3agr1log").is(":checked");
    var isCheckedr3 = $("#terms4agr1log").is(":checked");
    var isCheckedr4 = $("#terms5agr1log").is(":checked");*/
    
    	<?php if  ($seminar[0]->onlineopt=="Online Seminar"){?>
<?php if  ($seminar[0]->onlinecond1!=""){?>
    var isChecked1 = $("#terms1").is(":checked");
    
    <?php }else{?>
    var isChecked1 =true;
    <?php } }?>
	<?php if  ($seminar[0]->onlinecond2!=""){?>
    var isChecked2 = $(".ter2").is(":checked");
    
    <?php }else{?>
    var isChecked2 =true;
    <?php }?>
    
    <?php if  ($seminar[0]->onlinecond3!=""){?>
    var isChecked3 = $(".ter3").is(":checked");
    
    <?php }else{?>
    var isChecked3 =true;
    <?php }?>
    
    
    <?php if  ($seminar[0]->onlinecond4!=""){?>
    var isChecked4 = $(".ter4").is(":checked");
    
    <?php }else{?>
    var isChecked4 =true;
    <?php }?>	
    //if ((isChecked1) && (isChecked2) && (isChecked3) && (isChecked4)  && (isCheckedr1) && (isCheckedr2) && (isCheckedr3) && (isCheckedr4)) {
    if ((isChecked1) && (isChecked2) && (isChecked3) && (isChecked4)) { 
        //alert("All checked");
        $(".subterms").show();
    }else{
        //alert("some 1 missing");
         $(".subterms").hide();
    }
		
				
				
				
				
				
				
			} 
			else 
			{
$(".subterms").hide();
				$(".termsdiv3").hide();
			}	
			
			
			
			
			
			
			
			
			
		});
		
		
		$(".ter4").click(function () 
		{
		    
			
			
	if ($(this).is(":checked")) 
			{
				
			
			
			<?php if  ($seminar[0]->onlineopt=="Online Seminar"){?>
<?php if  ($seminar[0]->onlinecond1!=""){?>
    var isChecked1 = $("#terms1").is(":checked");
    
    <?php }else{?>
    var isChecked1 =true;
    <?php } }?>
		
	<?php if  ($seminar[0]->onlinecond2!=""){?>
    var isChecked2 = $(".ter2").is(":checked");
    
    <?php }else{?>
    var isChecked2 =true;
    <?php }?>
    
    <?php if  ($seminar[0]->onlinecond3!=""){?>
    var isChecked3 = $(".ter3").is(":checked");
    
    <?php }else{?>
    var isChecked3 =true;
    <?php }?>
    
    
    <?php if  ($seminar[0]->onlinecond4!=""){?>
    var isChecked4 = $(".ter4").is(":checked");
    
    <?php }else{?>
    var isChecked4 =true;
    <?php }?>	
			
    
     /*var isChecked1 = $("#terms1").is(":checked");
    var isChecked2 = $("#terms2log").is(":checked");
    var isChecked3 = $("#terms3log").is(":checked");
    var isChecked4 = $("#terms4log").is(":checked");
    
    var isCheckedr1 = $("#terms2agr1log").is(":checked");
    //alert(isCheckedr1);
    var isCheckedr2 = $("#terms3agr1log").is(":checked");
    var isCheckedr3 = $("#terms4agr1log").is(":checked");
    var isCheckedr4 = $("#terms5agr1log").is(":checked");
    if ((isChecked1) && (isChecked2) && (isChecked3) && (isChecked4)  && (isCheckedr1) && (isCheckedr2) && (isCheckedr3) && (isCheckedr4)) {*/
       if ((isChecked1) && (isChecked2) && (isChecked3) && (isChecked4)) { 
        $(".subterms").show();
    }else{
        
         $(".subterms").hide();
    }
				
				//}	
				
				
				//$(".termsdiv4").show();
			} 
			else 
			{
$(".subterms").hide();
				$(".termsdiv4").hide();
			}		
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
		});
		
		
		
		
		
		
		
		
		
	});
	
	function val(){
	    
	    
	     var vatno=$("#vatno1log").val();
        var revatno=$("#revatno1log").val();
			var password = $("#txtPassword1").val();
			var confirmPassword = $("#txtConfirmPassword1").val();
		
			if (password != confirmPassword) {
				alert("Passwords do not match...");
				return false;
			}else if (vatno != revatno){
            alert("Vat Number does not match.");
            return false;
			}
	 var email = $("#emaillog").val();
        $('.txtemail').html(email);
        var fname = $("#fnamelog").val();
        $('.txtname').html(fname);
        	$('#confirmmodallog').modal('show');
		
		
		
	    
	    
	    
	}

 //$('form').submit( function(event) {
 $('.formlog').submit( function(event) {
    var formId = this.id,
        form = this;
   //alert("eeentered me");
 var vatno=$("#vatno1log").val();
        var revatno=$("#revatno1log").val();
			var password = $("#txtPassword1").val();
			var confirmPassword = $("#txtConfirmPassword1").val();
		
			if (password != confirmPassword) {
				alert("Passwords do not match...");
				return false;
			}else if (vatno != revatno){
            alert("Vat Number does not match.");
            return false;
			}
else{
var email = $("#emaillog").val();
        $('.txtemail').html(email);
        var fname = $("#fnamelog").val();
        $('.txtname').html(fname);

$('#confirmmodallog').modal('show');
    event.preventDefault();

    setTimeout( function () { 
        form.submit();
    }, 5000);
    
}
}); 



	
	
	function enableterms2log(){
    //$('#terms2').prop('disabled', false);
     $(".rt2").prop('disabled', false);
    //ter2
    //alert("hai8");
    /*var isChecked1 = $("#terms1").is(":checked");
    var isChecked2 = $("#terms2log").is(":checked");
    var isChecked3 = $("#terms3log").is(":checked");
    var isChecked4 = $("#terms4log").is(":checked");
    var isCheckedr1 = $("#terms2agr1log").is(":checked");
   
    var isCheckedr2 = $("#terms3agr1log").is(":checked");
    var isCheckedr3 = $("#terms4agr1log").is(":checked");
    var isCheckedr4 = $("#terms5agr1log").is(":checked");
    
    
    
    if ((isChecked1) && (isChecked2) && (isChecked3) && (isChecked4) && (isCheckedr1) && (isCheckedr2) && (isCheckedr3) && (isCheckedr4)) {
       
        $(".subterms").show();
    }else{
        
         $(".subterms").hide();
    }*/
    
    
    
    
}
	


function enableterms3log(){
    $('.ter3').prop('disabled', false);
    
     var isChecked1 = $("#terms1").is(":checked");
    var isChecked2 = $("#terms2log").is(":checked");
    var isChecked3 = $("#terms3log").is(":checked");
    var isChecked4 = $("#terms4log").is(":checked");
    var isCheckedr1 = $("#terms2agr1log").is(":checked");
    //alert(isCheckedr1);
    var isCheckedr2 = $("#terms3agr1log").is(":checked");
    var isCheckedr3 = $("#terms4agr1log").is(":checked");
    var isCheckedr4 = $("#terms5agr1log").is(":checked");
    
    
    
    
    if ((isChecked1) && (isChecked2) && (isChecked3) && (isChecked4) && (isCheckedr1) && (isCheckedr2) && (isCheckedr3) && (isCheckedr4)) {
        //alert("All checked");
        $(".subterms").show();
    }else{
        //alert("some 1 missing");
         $(".subterms").hide();
    }
    
    
    
}	
	
function enableterms4log(){
    $('.ter4').prop('disabled', false);
    
     var isChecked1 = $("#terms1").is(":checked");
    var isChecked2 = $("#terms2log").is(":checked");
    var isChecked3 = $("#terms3log").is(":checked");
    var isChecked4 = $("#terms4log").is(":checked");
    var isCheckedr1 = $("#terms2agr1log").is(":checked");
    //alert(isCheckedr1);
    var isCheckedr2 = $("#terms3agr1log").is(":checked");
    var isCheckedr3 = $("#terms4agr1log").is(":checked");
    var isCheckedr4 = $("#terms5agr1log").is(":checked");
    
    
    
    
    if ((isChecked1) && (isChecked2) && (isChecked3) && (isChecked4) && (isCheckedr1) && (isCheckedr2) && (isCheckedr3) && (isCheckedr4)) {
        //alert("All checked");
        $(".subterms").show();
    }else{
        //alert("some 1 missing");
         $(".subterms").hide();
    }
    
    
    
    
}
function enableterms5log(){
    $('.ter5').prop('disabled', false);
	/*if ($('.chksem input[type="checkbox"]').not(':checked').length == 0) {
        
        $(".subterms").show();
       
    } else {
       
        $(".subterms").hide();
    }*/
     var isChecked1 = $("#terms1").is(":checked");
    var isChecked2 = $("#terms2log").is(":checked");
    var isChecked3 = $("#terms3log").is(":checked");
    var isChecked4 = $("#terms4log").is(":checked");
   var isCheckedr1 = $("#terms2agr1log").is(":checked");
    //alert(isCheckedr1);
    var isCheckedr2 = $("#terms3agr1log").is(":checked");
    var isCheckedr3 = $("#terms4agr1log").is(":checked");
    var isCheckedr4 = $("#terms5agr1log").is(":checked");
    
    
    
    
    if ((isChecked1) && (isChecked2) && (isChecked3) && (isChecked4) && (isCheckedr1) && (isCheckedr2) && (isCheckedr3) && (isCheckedr4)) {
        //alert("All checked");
        $(".subterms").show();
    }else{
        //alert("some 1 missing");
         $(".subterms").hide();
    }
    
    
    
    
    
    
    
}	

function disterms2log(){
    $(".subterms").hide();
}
function disterms3log(){
    $(".subterms").hide();
}
function disterms4log(){
    $(".subterms").hide();
}

function disterms5log(){
    $(".subterms").hide();
}	
	
function subfrmlog(){
   //alert("enter dismisslog---");
    $(".popmodalfrmlog").submit();
    
}	

function showagre1(){
    $('#agre1log').modal('show'); 
     
 }   
 
 function showagre2(){
    $('#agre2log').modal('show'); 
     
 }  
 
 
 function showagre3(){
    $('#agre3log').modal('show'); 
     
 }  
 
 
 function showagre4(){
    $('#agre4log').modal('show'); 
     
 }  	
</script>

<style>
    .front{
        z-index:999999999999999 !important;
    }
    
</style>