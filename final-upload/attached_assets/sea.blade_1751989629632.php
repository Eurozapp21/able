<div class="col-md-12" style="background-color: #b9b9b9b0;">
    <center>
        <div id="demo" class="collapse">
            <hr style="margin-top:0rem;" />
            <form method="post" action="{{ url('/searchproduct') }}">
                <!--<div class="input-group  wi50"> -->
                <div class="input-group mb-3 wi50" >
                    {{ csrf_field() }}
                    <!--<input name="search" type="text" class="form-control"  id="country_name" placeholder="Search Products"  />-->
                    
                    <input name="search" type="text" class="form-control"  id="country_name" placeholder="Search Products"  />
                    <div id="countryList"></div>
                    <div class="input-group-append">
                        <button type="submit" class="btn btn-warning text-white" id="button-addon2">Search </button>
                    </div>                
                </div>
            </form>
        </div>
    </center>
</div>
<style>
    .pad15
    {
        padding: 0.375rem 15px;
    }
    #countryList a
    {
        padding: 10px 15px;
        color: black ;
    }
</style>
<script>
    $(document).ready(function()
    {
        $('#country_name').attr('placeholder', 'Search Products');
        $('#country_name').keyup(function()
        { 
            var query = $(this).val();
            if(query != '')
            {
                var _token = $('input[name="_token"]').val();
                $.ajax(
                {
                    url:"{{ route('autocomplete') }}",
                    method:"POST",
                    data:{query:query, _token:_token},
                    success:function(data)
                    {                     
                        $('#countryList').fadeIn();  
                        $('#countryList').html(data);
                    }
                });
            }
        });
       /* $(document).on('click', 'li', function()
        {  
            $('#country_name').val($(this).text());  
           $('#countryList').fadeOut();  
        });  */
    
    
    
    $(document).on('click', 'li', function()
        {  
            var seltext=$('#country_name').val();
           
            if (seltext!=''){
                $('#country_name').val($(this).text());
            }
            else{
               $('#country_name').attr('placeholder', 'Search Products');
               //$('#country_name').val('Search Products'); 
            }
             
           $('#countryList').fadeOut();  
        });
    });
    
</script>