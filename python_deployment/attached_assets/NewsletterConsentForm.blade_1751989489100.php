<!DOCTYPE html>
<html>
<head><meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	
    <meta name="viewport" content="width=device-width" />
	<title>{{ $settings[0]->seo_title }}</title>     
	<link rel="shortcut icon" href="{{ url('/../admin/public/img/logo/'.$settings[0]->favicon) }}" type="image/png" sizes="36x36">
    <link href="{{ url('/Content/css/fontawesome/css/all.css') }}" rel="stylesheet" />
    <link href="{{ url('/Content/css/bootstrap.css') }}" rel="stylesheet" />
    <link href="{{ url('/Content/css/styleEUZ.css') }}" rel="stylesheet" />
    <link href="{{ url('/Content/css/ablestyle.css') }}" rel="stylesheet" />   
	<script src="{{ url('/Content/js/jquery.min.js') }}"></script>   
    <script src="{{ url('/Content/js/bootstrap.bundle.js') }}"></script>
    <script src="{{ url('/Scripts/jquery.cookie.js') }}"></script>
	<script src="{{ url('/Content/js/smoov.js') }}"></script>
    <script src="{{ url('/Scripts/bootstrap3-typeahead.js') }}"></script>
  
</head>
<body>	
	@include('header')   
    <div class="body">       
		<div class="container-fluid">
			<div class="row">
				<div class="col-md-12 p-0 euz_mt_top_25">
				    <div class="row">
	    <div class="container">
	        <br><br><br>
        <h2>Newsletter Consent Form</h2>
        <p>By subscribing to our newsletter and agreeing to receive marketing communications, you consent to the collection, processing, and use of your personal data, such as your name, surname and contact details for providing you with our newsletters, updates, upcoming events, promotional offers and marketing materials related to our services and products.</p>

        <!-- Success/Error Messages -->
        <div id="success-message" class="alert alert-success d-none"></div>
        <div id="error-message" class="alert alert-danger d-none"></div>

        <form id="newsletterForm">
            @csrf

            <div class="form-group">
                <label for="name">Name:</label>
                <input type="text" name="name" id="name" class="form-control" required>
            </div>

            <div class="form-group">
                <label for="surname">Surname:</label>
                <input type="text" name="surname" id="surname" class="form-control" required>
            </div>

            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" name="email" id="email" class="form-control" required>
            </div>

            <div class="form-group">
                <label for="phone">Phone:</label>
                <input type="text" name="phone" id="phone" class="form-control" required>
            </div>

            <h4>Consent:</h4>
            <p>I consent to receiving :</p>
            <div class="form-check">
                <input type="checkbox" name="consent_newsletter" id="consent_newsletter" class="form-check-input">
                <label class="form-check-label" for="consent_newsletter">Periodic newsletters and updates regarding Abletools products and services</label>
            </div>

            <div class="form-check">
                <input type="checkbox" name="consent_promotions" id="consent_promotions" class="form-check-input">
                <label class="form-check-label" for="consent_promotions">Special offers, discounts, and promotions from Abletools</label>
            </div>

            <div class="form-check">
                <input type="checkbox" name="consent_events" id="consent_events" class="form-check-input">
                <label class="form-check-label" for="consent_events">Invitations and information to events and webinars organized by Abletools</label>
            </div>
<hr>
            <h4>Preferred Method of Communication:</h4>
            <div class="form-check">
                <input type="checkbox" name="method_email" id="method_email" class="form-check-input" value="Email">
                <label class="form-check-label" for="method_email">Email</label>
            </div>

            <div class="form-check">
                <input type="checkbox" name="method_sms" id="method_sms" class="form-check-input" value="SMS">
                <label class="form-check-label" for="method_sms">SMS</label>
            </div>

            <div class="form-check">
                <input type="checkbox" name="method_call" id="method_call" class="form-check-input" value="Call">
                <label class="form-check-label" for="method_call">Call</label>
            </div>

            <br>
            <p>You may withdraw your consent at any time by contacting us at <a href="mailto:info@abletools.com.cy">info@abletools.com.cy</a>.</p>

           <button type="submit" class="btn btn-cardbutn">Submit</button>


            <br><br>
        </form>
    </div>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script>
        $(document).ready(function () {
            $("#newsletterForm").submit(function (event) {
                event.preventDefault(); // Prevent page reload

                $.ajax({
                    url: "{{ url('/process_newsletter_consent.php') }}",
                    type: "POST",
                    data: $(this).serialize(),
                    success: function (response) {
                        $("#success-message").removeClass('d-none').text(response);
                        $("#error-message").addClass('d-none');
                        $("#newsletterForm")[0].reset(); // Reset form
                    },
                    error: function () {
                        $("#error-message").removeClass('d-none').text("Error submitting form.");
                        $("#success-message").addClass('d-none');
                    }
                });
            });
        });
    </script>
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
			$(".anavelink").css({ "color": "#58595b" });
			$("#aboutus").css({ "color": "#fbdc00", "border-bottom": "#fbdc00 solid 5px", "font-weight": "600" });
		});
	</script>		
</body>
</html>



