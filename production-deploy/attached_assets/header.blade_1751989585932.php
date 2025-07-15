<?php 
	$username = session()->get('name');
	$useremail = session()->get('email'); 
	$usermobile = session()->get('mobile'); 
	$useridlog = session()->get('id');  
?>
<!-- Meta Pixel Code -->
<style>
        /* Styling the downtime bar */
        #downtime-bar {
            display: none; /* Hidden by default */
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            background-color: red;
            color: white;
            text-align: center;
            padding: 10px;
            font-size: 16px;
            font-weight: bold;
            z-index: 1000;
        }
    </style>
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '3819658821582182'); 
fbq('track', 'PageView');
</script>
<noscript>
<img height="1" width="1" 
src="https://www.facebook.com/tr?id=3819658821582182&ev=PageView
&noscript=1"/>
</noscript>
<!-- End Meta Pixel Code -->
<!-- Google tag (gtag.js) --> <script async src="https://www.googletagmanager.com/gtag/js?id=AW-16565798708"></script> <script> window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'AW-16565798708'); </script> 

<div class="container-fluid">
	<div class="row fixed-top shadow">
		<div class="col-md-12">
			<nav class="navbar navbar-expand-md bg-white navbar-dark py-0 px-6">
				<a class="navbar-brand onlytabcls" href="{{ url('/') }}"><img src="{{ url('../admin/public/img/logo/'.$settings[0]->logo) }}" id="LogoImg" class="img-fluid" /></a>
				<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse euz_stroke" id="collapsibleNavbar">
					<ul class="navbar-nav ml-auto">						
						<li class="nav-item">
							<a class="nav-link anavelink" id="home" href="{{ url('/') }}"><i class="fas fa-home" style="font-size: 20px;"></i></a></a>
						</li>
						<?php if(!empty($username)) { ?>
						<li class="nav-item">
							<a class="nav-link anavelink" id="dashboard" href="{{ url('/dashboard') }}">Dashboard</a>
						</li>
						<li class="nav-item">
							<a class="nav-link anavelink" id="orderhistory" href="{{ url('/orderhistory') }}">Order history</a>
						</li>
						<li class="nav-item">
							<a class="nav-link anavelink" id="userenquiry" href="{{ url('/userenquiry') }}">Research</a>
						</li>
						<?php } ?>
						
						<?php foreach($menus as $menu) { ?>
						
							<?php if($menu->id == '1') { ?>
							<?php if(empty($username)) { ?>
							<li class="nav-item">
								<a class="nav-link anavelink" id="aboutus" href="{{ url('/aboutus') }}"><?php echo $menu->name; ?></a>
							</li>
							<?php } } elseif($menu->id == '2') { ?>
							<li class="nav-item">
								<a class="nav-link anavelink" id="News" href="{{ url('/Seminar') }}"><?php echo $menu->name; ?></a>
							</li>
							<?php } elseif($menu->id == '9') { ?>
							<li class="nav-item">
								<a class="nav-link anavelink" id="Solution" href="{{ url('/Solution') }}"><?php echo $menu->name; ?></a>
							</li>
							<?php } elseif($menu->id == '8') { ?>
							<?php if(empty($username)) { ?>
							<li class="nav-item" style="display: none;">
								<a class="nav-link anavelink" id="News" href="{{ url('/News') }}"><?php echo $menu->name; ?></a>
							</li>
							<?php } } elseif($menu->id == '5') { ?>
							<li class="nav-item">
								<a class="nav-link anavelink" id="Events" href="{{ url('/Events') }}"><?php echo $menu->name; ?></a>
							</li>
							<?php } elseif($menu->id == '6') { ?>
							<?php if(empty($username)) { ?>
							<li class="nav-item">
								<a class="nav-link anavelink" id="Faq" href="{{ url('/Faq') }}"><?php echo $menu->name; ?></a>
							</li>
							<?php } } elseif($menu->id == '7') { ?>
							<?php if(empty($username)) { ?>
							<li class="nav-item">
								<a class="nav-link anavelink" id="Contact" href="{{ url('/Contact') }}"><?php echo $menu->name; ?></a>
							</li>
							<?php } } else { ?>
							<li class="nav-item">
								<a class="nav-link anavelink" id="<?php echo $menu->name; ?>" href="{{ url('/'.$menu->name) }}">{{ $menu->name }}</a>
							</li>
						<?php } } ?>
						<?php if(!empty($username)) { ?>
						<li class="nav-item"><a class="nav-link anavelink" id="Userlogin" href="<?php echo url('/profile'); ?>">Profile</a></li>
						<li class="nav-item"><a class="nav-link anavelink" id="" href="<?php echo url('/logout'); ?>">Logout</a></li>						
						<?php } else { ?>
						<li class="nav-item">
							<a class="nav-link anavelink" id="Userlogin" href="<?php echo url('/userlogin'); ?>">Login</a>
						</li>
						<?php } ?>
						


						
						<!--<li class="nav-item">							
							<a class="nav-link anavelink" href="https://abletools.com.cy/gr"><img src="{{ url('/Content/image/gr.png') }}" class="mr-2" /><span>EN/GR</span></a>
							
						</li>-->
						<li class="nav-item">
							<a class="nav-link anavelink" href="#" data-toggle="collapse" data-target="#demo"><i class="fas fa-search fontsearch"></i></a>
						</li>
					</ul>
				</div>
			</nav>
		</div>


		@include('sea')
	</div>
</div>

