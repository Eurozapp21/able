<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hide HR with Text</title>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script>
        $(document).ready(function(){
            $('hr').each(function(){
                if($(this).text().trim().length > 0) {
                    $(this).hide();
                }
            });
        });
    </script>
</head>
<body>
    <div class="modal fade" id="payoption" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered euz_model_lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="">Registration Form -</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form class="" id="contactsForm" method="post">
                    {{ csrf_field() }}
                    <div class="modal-body">							
                        <div class="row border p-3 m-2 nextmod2pop">
                            <div class="col-md-12">
                                <h5 class="font-weight-bold" id="">Payment Method</h5><hr>
                            </div>
                            <div class="col-lg-8 pad0">
                                <div class="form-group col-lg-12 col-md-4">
                                    <div class="custom-control custom-radio custom-control-inline" onclick="show13();">
                                        <input type="radio" class="custom-control-input cash" id="customRadiopop" name="tratype" value="Cash Payment" required>
                                        <label class="custom-control-label" for="customRadiopop">Cash Payment</label>
                                    </div>
                                    <div class="custom-control custom-radio custom-control-inline" onclick="show13();">
                                        <input type="radio" class="custom-control-input bank" id="customRadio2pop" name="tratype" value="Bank Transaction">
                                        <label class="custom-control-label" for="customRadio2pop">Bank Transaction</label>
                                    </div>
                                    <div class="custom-control custom-radio custom-control-inline" onclick="show13();">
                                        <input type="radio" class="custom-control-input online" id="customRadio3pop" name="tratype" value="Online" />
                                        <label class="custom-control-label" for="customRadio3pop">Online</label>
                                    </div>
                                </div>
                                <div class="form-group col-lg-12" id="fulpop">
                                    <div class="custom-control custom-radio custom-control-inline" onclick="show11();">
                                        <input type="radio" class="custom-control-input" id="fullamountpop" name="paytype" value="Full Payment" required >
                                        <label class="custom-control-label" for="fullamountpop">Full Payment</label>
                                    </div>
                                    <?php if(!empty($seminar[0]->firstamt)) {?>
                                    <div class="custom-control custom-radio custom-control-inline" onclick="show12();">
                                        <input type="radio" class="custom-control-input" id="halfamountpop" name="paytype" value="Half Payment">
                                        <label class="custom-control-label" for="halfamountpop">Deposit</label>
                                    </div>
                                    <?php } ?>
                                </div>
                                <div class="form-group col-lg-3 col-md-4" id="fullpapop">
                                    <label for="">Full Payment</label>
                                    <!--<input type="text" class="form-control" id="fullamt" name="fullamt" value="<?php //if(!empty($seminar[0]->fee)) { echo $vat; } ?>" readonly>--->
                                    <input type="text" class="form-control" id="fullamt" name="fullamt" value="<?php if(!empty($seminar[0]->fee)) { echo $payableamt; /*$seminar[0]->payamt; */ } ?>" readonly>
                                    <input type="hidden" class="form-control" id="" name="ids" value="<?php echo $seminar[0]->id; ?>">
                                    <input type="hidden" class="form-control" id="" name="title" value="<?php echo $seminar[0]->title; ?>">
                                    <input type="hidden" class="form-control" id="" name="name" value="<?php echo $username; ?>">
                                    <input type="hidden" class="form-control" id="" name="email" value="<?php echo $useremail; ?>">
                                    <input type="hidden" class="form-control" id="" name="mobile" value="<?php echo $usermobile; ?>">
                                    <input type="hidden" class="form-control" id="" name="userid" value="<?php echo $useridlog; ?>">
                                    <input type="hidden" class="form-control" id="" name="page" value="Seminar">
                                    
                                    <input type='hidden' name='business' value='<?php echo $settings[0]->paypal; ?>'/> 
                                    <?php if(!empty($seminar[0]->fee)) { ?>
                                    <input type='hidden' name='item_name' value='<?php echo $seminar[0]->id; ?>,<?php echo $seminar[0]->title; ?>,<?php echo $username; ?>,<?php echo $useremail; ?>,<?php echo $usermobile; ?>,<?php echo $useridlog; ?>,Seminar,Online,<?php echo $payableamt; ?>,<?php echo $seminar[0]->firstamt; ?>,<?php echo $seminar[0]->secondamt; ?>'> 
                                    <?php } ?>
                                    <input type='hidden' name='item_number' value='' id="paytypeonline"> 
                                    <input type='hidden' name='amount' value='' id="amount"> 
                                    <input type='hidden' name='no_shipping' value='' id=""> 
                                    <input type='hidden' name='currency_code' value='EUR'> 
                                    <input type='hidden' name='notify_url' value='{{ url("/paypal/notify.php") }}' />
                                    <input type='hidden' name='cancel_return' value='{{ url("/") }}'>
                                    <input type='hidden' name='return' value='{{ url("/paypal/payment.php") }}'>
                                    <input type="hidden" name="cmd" value="_xclick"> 
                                    <!--<input type="submit" name="pay_now" id="pay_now" Value="Pay Now">-->
                                </div>
                                <div class="form-group col-lg-3 col-md-4" id="fullpapop1">
                                    <b for="" class="font-weight">Half Payment</b>
                                    <input type="text" class="form-control" id="halfamt" name="halfamt" value="<?php if(!empty($seminar[0]->fee)) { echo $seminar[0]->firstamt; } ?>" readonly>
                                </div>
                                <div class="form-group col-lg-12 col-md-12" id="fullpapop1comt">
                                    <p class="text-justify mb-0"><?php if(!empty($seminar[0]->fee)) { echo $seminar[0]->firstdesc; } ?></p>
                                </div>
                                <div class="form-group col-lg-3 col-md-4" id="fullpapop11">
                                    <b for="" class="font-weight">Balance Standing Amount</b>
                                    <input type="text" class="form-control" id="" name="balamt" value="<?php if(!empty($seminar[0]->fee)) { echo $balamt; /*$seminar[0]->secondamt;*/ } ?>" readonly>
                                </div>
                                <div class="form-group col-lg-12 col-md-12" id="fullpapop1comt1">
                                    <p class="text-justify"><?php if(!empty($seminar[0]->fee)) { echo $seminar[0]->seconddesc; } ?></p>
                                </div>
                            </div>
                            <div class="col-lg-4 form-group cashdis" style="display: none;">
                                <label for="">Cash Payment Details</label>
                                <textarea type="text" class="form-control" id="" rows="5" name=""><?php echo $seminar[0]->cash; ?></textarea>    
                            </div>
                            <div class="col-lg-4 form-group bankdis" style="display: none;">
                                <label for="">Bank Transaction Details</label>
                                <textarea type="text" class="form-control" id="" rows="5" name=""><?php echo $seminar[0]->bank; ?></textarea>    
                            </div>
                            <div class="col-lg-4 form-group onlinedis" style="display: none;">
                                <img

 class="img-fluid  w-50" src="<?php echo url('/Content/image/paypal.png'); ?>" />  
                            </div>
                            <div class="form-group col-lg-12">
                                <label for="">Comment</label>
                                <textarea type="text" class="form-control" id="" rows="5" name="comment"></textarea>
                            </div>
                            <div class="col-md-12">
                                <input type="checkbox" name="termspop" id="termspop" style="margin-left: 10px;" /> I Accept Terms and Conditions
                            </div>
                        </div>
                        <div class="row border p-3 m-2 nextmod2pop termspopdiv" style="display: none;">
                            <div class="col-md-12">
                                <h5 class="font-weight-bold" id="">Terms and Conditions</h5><hr>
                            </div>
                            <div class="col-md-12">
                                <?php echo $seminar[0]->terms; ?>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-cardbutn nextmod21 subtermspop" id="btnSubmit" style="display: none;">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <script>
        $(document).ready(function(){
            $(".cash").click(function(){
                if ($(this).is(":checked")) {
                    $(".cashdis").show();
                    $(".bankdis").hide();
                    $(".onlinedis").hide();
                } else {
                    $(".cashdis").hide();
                    $(".bankdis").show();
                }
            });
            $(".bank").click(function(){
                if ($(this).is(":checked")) {
                    $(".cashdis").hide();
                    $(".bankdis").show();
                    $(".onlinedis").hide();
                } else {
                    $(".cashdis").show();
                    $(".bankdis").hide();
                }
            });
            $(".online").click(function(){
                if ($(this).is(":checked")) {
                    $(".cashdis").hide();
                    $(".bankdis").hide();
                    $(".onlinedis").show();
                } else {
                    $(".onlinedis").hide();
                }
            });

            $("#termspop").click(function(){
                if ($(this).is(":checked")) {
                    $(".termspopdiv").show();
                    $(".subtermspop").show();
                } else {
                    $(".termspopdiv").hide();
                    $(".subtermspop").hide();
                }
            });

            $("#contactsForm").submit(function(){
                var selValue = $("input[name='tratype']:checked").val();
                var paytype = $("input[name='paytype']:checked").val();
                $('#paytypeonline').val(paytype);
                if(paytype == 'Full Payment') {
                    var fullamt = $('#fullamt').val();
                    $('#amount').val(fullamt);
                } else {
                    var halfamt = $('#halfamt').val();
                    $('#amount').val(halfamt);
                }
                if(selValue == 'Online') {
                    $('#contactsForm').attr('action', "https://www.paypal.com/cgi-bin/webscr");
                } else {
                    $('#contactsForm').attr('action', "{{ url('/payoption') }}");
                }
            });
        });

        function show11() {
            $("#fullpapop").show();
            $("#fullpapop1comt, #fullpapop1, #fullpapop1comt1, #fullpapop11").hide();
        }

        function show12() {
            $("#fullpapop").hide();
            $("#fullpapop1comt, #fullpapop1, #fullpapop1comt1, #fullpapop11").show();
        }

        function show13() {
            $("#fulpop").show();
        }
    </script>
</body>
</html>
