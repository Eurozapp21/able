<?php
error_reporting(0);
$username = session()->get('name');
$useremail = session()->get('email');
$usermobile = session()->get('mobile');
$useridlog = session()->get('id');
?>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width" />
    <title>{{ $settings[0]->seo_title }}</title>
    <link rel="shortcut icon" href="{{ url('admin/public/img/logo/'.$settings[0]->favicon) }}" type="image/png" sizes="36x36">
    <link href="{{ url('/Content/css/fontawesome/css/all.css') }}" rel="stylesheet" />
    <link href="{{ url('/Content/css/bootstrap.css') }}" rel="stylesheet" />
    <link href="{{ url('/Content/css/styleEUZ.css') }}" rel="stylesheet" />
    <link href="{{ url('/Content/css/ablestyle.css') }}" rel="stylesheet" />
    <style>
        .dropdown-menu {
            width: 92%;
        }
        .euz_imgsd {
            width: 100px;
            float: left;
            margin-right: 15px;
            margin-top: 10px;
            height: 100px;
        }
        .video {
            font-size: 60px;
            color: red;
            border: 1px solid black;
            background: black;
            text-align: center;
            height: 100px;
            padding: 20px 0;
        }
    </style>
    <script src="{{ url('/Content/js/jquery.min.js') }}"></script>
    <script src="{{ url('/Content/js/bootstrap.bundle.js') }}"></script>
    <script src="{{ url('/Scripts/jquery.cookie.js') }}"></script>
    <script src="{{ url('/Content/js/smoov.js') }}"></script>
    <script src="{{ url('/Scripts/bootstrap3-typeahead.js') }}"></script>
    <script>
        $(document).ready(function () {
            $('.block').smoove({
                offset: '10%'
            });
            $(document).on("click", ".btnallcookies", function () {
                $(".cookiesbg").fadeOut();
            });
            $('#myCarouselvred').carousel({
                interval: 5000
            });
            $("#myCarouselvred").on("touchstart", function (event) {
                var yClick = event.originalEvent.touches[0].pageY;
                $(this).one("touchmove", function (event) {
                    var yMove = event.originalEvent.touches[0].pageY;
                    if (Math.floor(yClick - yMove) > 1) {
                        $(".carousel").carousel('next');
                    } else if (Math.floor(yClick - yMove) < -1) {
                        $(".carousel").carousel('prev');
                    }
                });
                $(".carousel").on("touchend", function () {
                    $(this).off("touchmove");
                });
            });
        });
    </script>
</head>
<body>
    @include('header')
    <div class="body">
        <div>
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-12 p-0 euz_mt_top_25">
                        <img id="imgseminar" src="{{ url('/admin/public/img/seminar/'.$seminar[0]->slider) }}" class="img-fluid w-100" alt="">
                    </div>
                </div>
            </div>
            <div class="container">
                <div class="row mt-5">
                    <div class="col-md-12">
                        <ol class="breadcrumb bgdetailproduct">
                            <li class="breadcrumb-item"><a class="font-weight-bold text-white" href="{{ url('/Seminar') }}">Seminars</a></li>
                            <li class="breadcrumb-item active"><span class="txt_ylo">Seminar detail</span></li>
                        </ol>
                    </div>
                </div>
                <div class="row my-5">
                    <div class="col-md-6">
                        <h3 class="font-weight-bold">{{ $seminar[0]->title }}</h3>
                        <h6 class="newcolor">{{ $seminar[0]->subtitle }} @if ($seminar[0]->onlineopt == 'Online Seminar')<span> | <span class="small text-success"><i class="fas fa-circle"></i> Online</span></span>@endif</h6>
                    </div>
                    <div class="col-md-6 text-right">
                        <label class="euz_label_grey mb-0"><span class="durec">{{ date('j M Y', $seminar[0]->startdate) }} - @if (!empty($seminar[0]->enddate)) {{ date('j M Y', $seminar[0]->enddate) }} @endif</span>&nbsp;|&nbsp;<span class="durec">Duration: {{ $seminar[0]->duration }} Seminar</span></label>
                    </div>
                    <div class="col-md-12 mb-2">
                        <p class="text-dark text-justify lineh27 mt-4 pSeminar">{!! $seminar[0]->description !!}</p>
                    </div>
                    <div class="col-lg-4 col-md-5 mt-4">
                        <div class="divSpeaker">
                            <div id="speak" class="carousel slide" data-ride="carousel">
                                <div class="carousel-inner">
                                    <div class="carousel-item active">
                                        <div class="euz_bgyelo pb-3" style="width: 90%;">
                                            <center>
                                                <img src="{{ url('/admin/public/img/seminar/'.$seminar[0]->spkimg1) }}" class="img-fluid w-100">
                                                <h5 class="text-white mt-3">{{ $seminar[0]->spkname1 }}</h5>
                                                <p class="text-white">{{ $seminar[0]->spkdes1 }}</p>
                                            </center>
                                        </div>
                                    </div>
                                    @if (!empty($seminar[0]->spkname2))
                                    <div class="carousel-item">
                                        <div class="euz_bgyelo pb-3" style="width: 90%;">
                                            <center>
                                                <img src="{{ url('/admin/public/img/seminar/'.$seminar[0]->spkimg2) }}" class="img-fluid w-100">
                                                <h5 class="text-white mt-3">{{ $seminar[0]->spkname2 }}</h5>
                                                <p class="text-white">{{ $seminar[0]->spkdes2 }}</p>
                                            </center>
                                        </div>
                                    </div>
                                    @endif
                                </div>
                                <!-- Controls (uncomment if needed)
                                <a class="carousel-control-prev" href="#speak" data-slide="prev" style="opacity:1;width: 22%;"><img src="{{ url('/Content/image/left.png') }}" height="25px"></a>
                                <a class="carousel-control-next" href="#speak" data-slide="next" style="opacity:1;width: 22%;"><img src="{{ url('/Content/image/right.png') }}" height="25px"></a>
                                -->
                            </div>
                        </div>
                        @if (!empty($seminar[0]->doc))
                        <div class="row">
                            <div class="col-md-12 mt-3">
                                <a href="{{ url('/admin/public/pdf/'.$seminar[0]->doc) }}" target="_blank">
                                    <p class="mb-0 text-white euz_btn_saminar mobre" style="width:90%;">{{ $seminar[0]->docname }}</p>
                                </a>
                            </div>
                        </div>
                        @endif
                        @if (!empty($seminar[0]->doc1))
                        <div class="row">
                            <div class="col-md-12 mt-3">
                                <a href="{{ url('/admin/public/pdf/'.$seminar[0]->doc1) }}" target="_blank">
                                    <p class="mb-0 text-white euz_btn_saminar mobre" style="width:90%;">{{ $seminar[0]->docname1 }}</p>
                                </a>
                            </div>
                        </div>
                        @endif
                        @if (!empty($seminar[0]->doc2))
                        <div class="row">
                            <div class="col-md-12 mt-3">
                                <a href="{{ url('/admin/public/pdf/'.$seminar[0]->doc2) }}" target="_blank">
                                    <p class="mb-0 text-white euz_btn_saminar mobre" style="width:90%;">{{ $seminar[0]->docname2 }}</p>
                                </a>
                            </div>
                        </div>
                        @endif
                        @if (!empty($seminar[0]->doc3))
                        <div class="row">
                            <div class="col-md-12 mt-3">
                                <a href="{{ url('/admin/public/pdf/'.$seminar[0]->doc3) }}" target="_blank">
                                    <p class="mb-0 text-white euz_btn_saminar mobre" style="width:90%;">{{ $seminar[0]->docname3 }}</p>
                                </a>
                            </div>
                        </div>
                        @endif
                        @if (!empty($seminar[0]->doc4))
                        <div class="row">
                            <div class="col-md-12 mt-3">
                                <a href="{{ url('/admin/public/pdf/'.$seminar[0]->doc4) }}" target="_blank">
                                    <p class="mb-0 text-white euz_btn_saminar mobre" style="width:90%;">{{ $seminar[0]->docname4 }}</p>
                                </a>
                            </div>
                        </div>
                        @endif
                    </div>
                    <div class="col-lg-8 col-md-7 mt-4">
                        <div class="row">
                            @if (!empty($seminar[0]->course))
                            <div class="col-md-12">
                                <div class="m-0 colladetailopen mt-1 collapsequestion collapsed bgdetailproduct" data-toggle="collapse" data-target="#Coursedetai" aria-expanded="false">
                                    Course Details
                                    <span class="collapsed"><b><i class="fas fa-plus float-right pt-1"></i></b></span><span class="expanded"><b><i class="fas fa-minus float-right pt-1"></i></b></span>
                                </div>
                                <div id="Coursedetai" class="p-3 collapsedetail collapse bg-light">
                                    <p class="collapsedetail cousedetails">{!! $seminar[0]->course !!}</p>
                                </div>
                            </div>
                            @endif
                            @if ($seminar[0]->spkname1 != '')
                            <div class="col-md-12">
                                <div class="m-0 colladetailopen mt-1 collapsequestion collapsed bgdetailproduct" data-toggle="collapse" data-target="#Spehy" aria-expanded="false">
                                    Speaker’s Biography
                                    <span class="collapsed"><b><i class="fas fa-plus float-right pt-1"></i></b></span><span class="expanded"><b><i class="fas fa-minus float-right pt-1"></i></b></span>
                                </div>
                                <div id="Spehy" class="p-3 collapsedetail collapse bg-light">
                                    <div class="col-md-12" id="speakerName1">
                                        <h5 class="font-weight-bold speaker">{{ $seminar[0]->spkname1 }}</h5>
                                        @if (!empty($seminar[0]->spkimg1))
                                        <img src="{{ url('/admin/public/img/seminar/'.$seminar[0]->spkimg1) }}" class="img-responsive euz_imgsd">
                                        @endif
                                        <p class="collapsedetail Speakerdetails">{!! $seminar[0]->spkdesc1 !!}</p>
                                        <div class="text-right">
                                            @if (!empty($seminar[0]->spkpdf1))
                                            <a href="{{ url('/admin/public/pdf/'.$seminar[0]->spkpdf1) }}" target="_blank" class="btn euz_btn_saminar" style="min-width: 15%;min-height: auto;padding: 5px 5px;">
                                                <label class="mb-0 labtex text-white">{{ $seminar[0]->spkpdfname1 }}</label>
                                            </a>
                                            @endif
                                        </div>
                                        @if (!empty($seminar[0]->spkname2))
                                        <h5 class="font-weight-bold speaker">{{ $seminar[0]->spkname2 }}</h5>
                                        @if (!empty($seminar[0]->spkimg2))
                                        <img src="{{ url('/admin/public/img/seminar/'.$seminar[0]->spkimg2) }}" class="img-responsive euz_imgsd">
                                        @endif
                                        <p class="collapsedetail Speakerdetails">{!! $seminar[0]->spkdesc2 !!}</p>
                                        <div class="text-right">
                                            @if (!empty($seminar[0]->spkpdf2))
                                            <a href="{{ url('/admin/public/pdf/'.$seminar[0]->spkpdf2) }}" target="_blank" class="btn euz_btn_saminar" style="min-width: 15%;min-height: auto;padding: 5px 5px;">
                                                <label class="mb-0 labtex text-white">{{ $seminar[0]->spkpdfname2 }}</label>
                                            </a>
                                            @endif
                                        </div>
                                        @endif
                                    </div>
                                </div>
                            </div>
                            @endif
                            @if ($seminar[0]->place != '')
                            <div class="col-md-12">
                                <div class="m-0 colladetailopen mt-1 collapsequestion collapsed bgdetailproduct" data-toggle="collapse" data-target="#accessories" aria-expanded="false">
                                    Event Venue
                                    <span class="collapsed"><b><i class="fas fa-plus float-right pt-1"></i></b></span><span class="expanded"><b><i class="fas fa-minus float-right pt-1"></i></b></span>
                                </div>
                                <div id="accessories" class="p-3 collapsedetail collapse bg-light" style="">
                                    <div class="col-md-12">
                                        <p class="">Place: {{ $seminar[0]->place }}</p>
                                        <p class="">Address: {{ $seminar[0]->address }}</p>
                                        @if (!empty($seminar[0]->map))
                                        <iframe width="100%" height="200" frameborder="0" style="border:0;" src="{{ $seminar[0]->map }}"></iframe>
                                        @endif
                                    </div>
                                </div>
                            </div>
                            @endif
                            @if (!empty($seminar[0]->semdesc))
                            <div class="col-md-12">
                                <div class="m-0 colladetailopen mt-1 collapsequestion collapsed bgdetailproduct" data-toggle="collapse" data-target="#SemiFees" aria-expanded="false">
                                    Seminar Fees
                                    <span class="collapsed"><b><i class="fas fa-plus float-right pt-1"></i></b></span><span class="expanded"><b><i class="fas fa-minus float-right pt-1"></i></b></span>
                                </div>
                                <div id="SemiFees" class="p-3 collapsedetail collapse bg-light">
                                    <div class="col-md-12">
                                        <h6>Description</h6>
                                        {!! $seminar[0]->semdesc !!}
                                    </div>
                                </div>
                            </div>
                            @endif
                            @if ($seminar[0]->tra != '')
                            <div class="col-md-12">
                                <div class="m-0 colladetailopen mt-1 collapsequestion collapsed bgdetailproduct" data-toggle="collapse" data-target="#Travetion" aria-expanded="false">
                                    Traveling/ Accommodation
                                    <span class="collapsed"><b><i class="fas fa-plus float-right pt-1"></i></b></span><span class="expanded"><b><i class="fas fa-minus float-right pt-1"></i></b></span>
                                </div>
                                <div id="Travetion" class="p-3 collapsedetail collapse bg-light">
                                    <div class="col-md-12">
                                        <p>{!! $seminar[0]->tra !!}</p>
                                    </div>
                                </div>
                            </div>
                            @endif
                            @if ($seminar[0]->terms != '')
                            <div class="col-md-12">
                                <div class="m-0 colladetailopen mt-1 collapsequestion collapsed bgdetailproduct" data-toggle="collapse" data-target="#Miscellaneous" aria-expanded="false">
                                    Terms and Condition
                                    <span class="collapsed"><b><i class="fas fa-plus float-right pt-1"></i></b></span><span class="expanded"><b><i class="fas fa-minus float-right pt-1"></i></b></span>
                                </div>
                                <div id="Miscellaneous" class="p-3 collapsedetail collapse bg-light">
                                    <div class="col-md-12">
                                        <p>{!! $seminar[0]->terms !!}</p>
                                    </div>
                                </div>
                            </div>
                            @endif
                            @if (!empty($seminar[0]->img))
                            <div class="col-md-12">
                                <div class="m-0 colladetailopen mt-1 collapsequestion collapsed bgdetailproduct" data-toggle="collapse" data-target="#imgllary" aria-expanded="false">
                                    Image Gallery/Video
                                    <span class="collapsed"><b><i class="fas fa-plus float-right pt-1"></i></b></span><span class="expanded"><b><i class="fas fa-minus float-right pt-1"></i></b></span>
                                </div>
                                <div id="imgllary" class="p-3 collapsedetail bg-light collapse" style="">
                                    <div class="row" id="imglist">
                                        @if (!empty($seminar[0]->img))
                                        <div class="col my-2">
                                            <img src="{{ url('/admin/public/img/seminar/'.$seminar[0]->img) }}" class="w-100 imgSeminarGallery" alt="" data-toggle="modal" data-target="#myModal1" onclick="show(0)">
                                        </div>
                                        @endif
                                        @if (!empty($seminar[0]->img1))
                                        <div class="col my-2">
                                            <img src="{{ url('/admin/public/img/seminar/'.$seminar[0]->img1) }}" class="w-100 imgSeminarGallery" alt="" data-toggle="modal" data-target="#myModal1" onclick="show(1)">
                                        </div>
                                        @endif
                                        @if (!empty($seminar[0]->img2))
                                        <div class="col my-2">
                                            <img src="{{ url('/admin/public/img/seminar/'.$seminar[0]->img2) }}" class="w-100 imgSeminarGallery" alt="" data-toggle="modal" data-target="#myModal1" onclick="show(2)">
                                        </div>
                                        @endif
                                        @if (!empty($seminar[0]->img3))
                                        <div class="col my-2">
                                            <img src="{{ url('/admin/public/img/seminar/'.$seminar[0]->img3) }}" class="w-100 imgSeminarGallery" alt="" data-toggle="modal" data-target="#myModal1" onclick="show(3)">
                                        </div>
                                        @endif
                                        @if (!empty($seminar[0]->img4))
                                        <div class="col my-2">
                                            <img src="{{ url('/admin/public/img/seminar/'.$seminar[0]->img4) }}" class="w-100 imgSeminarGallery" alt="" data-toggle="modal" data-target="#myModal1" onclick="show(4)">
                                        </div>
                                        @endif
                                        @if (!empty($seminar[0]->video))
                                        <div class="col my-2">
                                            <i class="fa fa-video imgSeminarGallery w-100 video" data-toggle="modal" data-target="#myModalvideo"></i>
                                        </div>
                                        @endif
                                    </div>
                                </div>
                            </div>
                            <div class="modal fade pr-0" id="myModal1" style="display: none;" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered modal-lg">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <button type="button" class="close" data-dismiss="modal">
                                                <span>×</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div id="carouselExampleControls" class="carousel slide carousel-fade loadProductSlider" data-ride="carousel" data-interval="4000">
                                                        <ul class="carousel-indicators">
                                                            @if (!empty($seminar[0]->img))
                                                            <li data-target="#carouselExampleControls" data-slide-to="0" class="active carbtn2" style="border-radius: 50%;height: 10px;width: 10px;margin: 0 0.5em;cursor:pointer;"></li>
                                                            @endif
                                                            @if (!empty($seminar[0]->img1))
                                                            <li data-target="#carouselExampleControls" data-slide-to="1" class="carbtn2" style="border-radius: 50%;height: 10px;width: 10px;margin: 0 0.5em;cursor:pointer;"></li>
                                                            @endif
                                                            @if (!empty($seminar[0]->img2))
                                                            <li data-target="#carouselExampleControls" data-slide-to="2" class="carbtn2" style="border-radius: 50%;height: 10px;width: 10px;margin: 0 0.5em;cursor:pointer;"></li>
                                                            @endif
                                                            @if (!empty($seminar[0]->img3))
                                                            <li data-target="#carouselExampleControls" data-slide-to="3" class="carbtn2" style="border-radius: 50%;height: 10px;width: 10px;margin: 0 0.5em;cursor:pointer;"></li>
                                                            @endif
                                                            @if (!empty($seminar[0]->img4))
                                                            <li data-target="#carouselExampleControls" data-slide-to="4" class="carbtn2" style="border-radius: 50%;height: 10px;width: 10px;margin: 0 0.5em;cursor:pointer;"></li>
                                                            @endif
                                                        </ul>
                                                        <div class="carousel-inner" data-toggle="modal" data-target="#myModal1">
                                                            @if (!empty($seminar[0]->img))
                                                            <div id="clitem" class="carousel-item active">
                                                                <center><img class="img-fluid" src="{{ url('/admin/public/img/seminar/'.$seminar[0]->img) }}" alt=""></center>
                                                            </div>
                                                            @endif
                                                            @if (!empty($seminar[0]->img1))
                                                            <div id="clitem1" class="carousel-item">
                                                                <center><img class="img-fluid" src="{{ url('/admin/public/img/seminar/'.$seminar[0]->img1) }}" alt=""></center>
                                                            </div>
                                                            @endif
                                                            @if (!empty($seminar[0]->img2))
                                                            <div id="clitem2" class="carousel-item">
                                                                <center><img class="img-fluid" src="{{ url('/admin/public/img/seminar/'.$seminar[0]->img2) }}" alt=""></center>
                                                            </div>
                                                            @endif
                                                            @if (!empty($seminar[0]->img3))
                                                            <div id="clitem3" class="carousel-item">
                                                                <center><img class="img-fluid" src="{{ url('/admin/public/img/seminar/'.$seminar[0]->img3) }}" alt=""></center>
                                                            </div>
                                                            @endif
                                                            @if (!empty($seminar[0]->img4))
                                                            <div id="clitem4" class="carousel-item">
                                                                <center><img class="img-fluid" src="{{ url('/admin/public/img/seminar/'.$seminar[0]->img4) }}" alt=""></center>
                                                            </div>
                                                            @endif
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal fade pr-0" id="myModalvideo" style="display: none;" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered modal-lg">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <button type="button" class="close" data-dismiss="modal">
                                                <span>×</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div id="carouselExampleControls" class="carousel slide carousel-fade loadProductSlider" data-ride="carousel" data-interval="4000">
                                                        <ul class="carousel-indicators">
                                                            <li data-target="#carouselExampleControls" data-slide-to="0" class="active carbtn2" style="border-radius: 50%;height: 10px;width: 10px;margin: 0 0.5em;cursor:pointer;"></li>
                                                            <li data-target="#carouselExampleControls" data-slide-to="1" class="carbtn2" style="border-radius: 50%;height: 10px;width: 10px;margin: 0 0.5em;cursor:pointer;"></li>
                                                        </ul>
                                                        <div class="carousel-inner" data-toggle="modal" data-target="#myModal">
                                                            <div class="carousel-item active">
                                                                <center><iframe width="100%" height="315" src="{{ $seminar[0]->video }}"></iframe></center>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            @endif
                            @if (!empty($seminar[0]->fee))
                            @if (empty($username))
                            @php
                            $toddate = date("Y-m-d");
                            $strtimedt = strtotime($toddate);
                            $enddate = $seminar[0]->enddate == 0 ? $seminar[0]->startdate : $seminar[0]->enddate;
                            @endphp
                            @if ($strtimedt <= $enddate)
                            <div class="row my-3">
    <div class="col-lg-12 my-3 d-flex justify-content-start">
        <a class="btn btn-cardbutn text-white my-2 mr-2" href="https://forms.office.com/e/LpJX2vWY8w?origin=lprLink" target="_blank">
            <i class="fas fa-user"> Registration Form </i>
        </a>
        <a class="btn btn-cardbutn text-white my-2" href="https://forms.office.com/e/bPjg9UMPa1?origin=lprLink" target="_blank">
            <i class="fas fa-user"> Φόρμα Εγγραφής </i>
        </a>
    </div>
</div>

                            
                            
                            
                            

                            @endif
                            @endif
                            @endif
                        </div>
                    </div>
                </div>
                <div class="modal fade" id="Logregister" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true" data-keyboard="false" data-backdrop="static">
                    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div class="modal-body py-5">
                                <div class="row">
                                    <div class="col-md-6">
                                        <center>
                                            <h5 class="text-dark text-center font-weight-bold lineh27 pabout">If you have already an account</h5>
                                            <a class="btn btn-cardbutn text-white my-2" href="{{ url('/userlogin?ti='.$modtit) }}"><i class="fas fa-user"></i> Login</a>
                                        </center>
                                    </div>
                                    <div class="col-md-6" style="border-left: #e9ecef solid 1px;">
                                        <center>
                                            <h5 class="text-dark text-center font-weight-bold lineh27 pabout">If you don't have an account Click here!</h5>
                                            <a class="btn btn-cardbutn text-white my-2" href="#" data-toggle="modal" data-target="#register">
                                                <i class="fas fa-user-plus"></i> Register
                                            </a>
                                        </center>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                @include('registerpop')
                @include('paypop')
                @include('logreg')
            </div>
        </div>
    </div>
    @include('footer')
    <script>
        $(function () {
            $(".anavelink").css({ "color": "#58595b" });
            $("#News").css({ "color": "#fbdc00", "border-bottom": "#fbdc00 solid 5px", "font-weight": "600" });
        });
        $('#comTrainingtype').on('change', function () {
            var array = $(this).val();
            getProducts(array);
        });
        function getProducts(product_category_id) {
            $.get("{{url('/training/get-training')}}/" + product_category_id, function (data) {
                $("#subcatname").html(data);
            });
        }
        $(function () {
            $("#btnSubmit").click(function () {
                var password = $("#txtPassword").val();
                var confirmPassword = $("#txtConfirmPassword").val();
                if (password != confirmPassword) {
                    alert("Passwords do not match.");
                    return false;
                }
                return true;
            });
        });
        function isNumberKey(evt) {
            var charCode = (evt.which) ? evt.which : event.keyCode
            if (charCode > 31 && (charCode < 48 || charCode > 57))
                return false;
            return true;
        }
        function show(val) {
            $(".carousel-item").removeClass("active");
            if (val == 0) {
                $("#clitem").addClass("active");
            } else if (val == 1) {
                $("#clitem1").addClass("active");
            } else if (val == 2) {
                $("#clitem2").addClass("active");
            } else if (val == 3) {
                $("#clitem3").addClass("active");
            } else if (val == 4) {
                $("#clitem4").addClass("active");
            }
        }
    </script>
</body>
</html>
