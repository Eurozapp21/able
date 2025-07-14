<form class="" name="member_signup" method="post" action="https://www.paypal.com/cgi-bin/webscr">
    <input type='hidden' name='business' value='<?php echo $settings[0]->paypal; ?>'/> 
    <input type='hidden' name='item_name' value='<?php echo session()->get('ids'); ?>,<?php echo session()->get('title'); ?>,<?php echo session()->get('username'); ?>,<?php echo session()->get('useremail'); ?>,<?php echo session()->get('usermobile'); ?>,<?php echo session()->get('useridlog'); ?>,<?php echo session()->get('page'); ?>,<?php echo session()->get('type'); ?>,<?php echo session()->get('vat'); ?>,<?php echo session()->get('firstamt'); ?>,<?php echo session()->get('secondamt'); ?>'> 
    <input type='hidden' name='item_number' value='<?php echo session()->get('paytype'); ?>' id="paytypeonline"> 
    <input type='hidden' name='amount' value='<?php echo session()->get('amount'); ?>' id="amount"> 
    <input type='hidden' name='no_shipping' value='' id=""> 
    <input type='hidden' name='currency_code' value='EUR'> 
    <input type='hidden' name='notify_url' value='{{ url("/paypal/notify.php") }}' />
    <input type='hidden' name='cancel_return' value='{{ url("/") }}'>
    <input type='hidden' name='return' value='{{ url("/paypal/payment.php") }}'>
    <input type="hidden" name="cmd" value="_xclick">  
</form>
<script>
    window.onload = function()
    {
        document.forms['member_signup'].submit();
    }
</script>