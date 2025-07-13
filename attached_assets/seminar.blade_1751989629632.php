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
        .seminar-card, .training-card {
            margin-bottom: 20px;
        }
        .seminar-label, .training-label {
            position: absolute;
            top: 10px;
            left: 10px;
            background-color: #fbdc00;
            color: #fff;
            padding: 5px 10px;
            font-weight: bold;
        }
        .card-img-top {
            height: 200px;
            object-fit: cover;
        }
        .btn-cardbutn {
            margin-top: 10px;
        }
    </style>
    <script src="{{ url('/Content/js/jquery.min.js') }}"></script>
    <script src="{{ url('/Content/js/bootstrap.bundle.js') }}"></script>
    <script src="{{ url('/Scripts/jquery.cookie.js') }}"></script>
    <script src="{{ url('/Content/js/smoov.js') }}"></script>
    <script src="{{ url('/Scripts/bootstrap3-typeahead.js') }}"></script>
    <script>
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
    </script>
</head>
<body>
    @include('header')
    <div class="body">
        <div>
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-12 p-0 euz_mt_top_25">
                        <img id="imgseminar" src="{{ url('/admin/public/img/logo/'.$settings[0]->sembanner) }}" class="img-fluid w-100" alt="">
                    </div>
                </div>
            </div>
            <div class="container">
                <div class="row my-5">
                    <div class="euz_left">
                        <div class="col-md-12">
                            <h1 class="font-weight-bold">Seminars</h1>
                            <hr>
                        </div>
                        @foreach($seminars as $seminar)
                        <div class="col-lg-12 col-md-12 seminar-card">
                            <div class="card p-2 euz_bgyellow border-0">
                                <div class="row">
                                    <div class="col-md-12 position-relative">
                                        <img class="card-img-top" src="{{ url('/admin/public/img/seminar/'.$seminar->profile) }}" alt="">
                                        <label class="seminar-label">Upcoming Seminar</label>
                                    </div>
                                    <div class="col-md-12 mt-2">
                                        <h5 class="card-title">{{ $seminar->title }}</h5>
                                        <h6 class="font-weight-bold">{{ date('j M Y', $seminar->startdate) }}</h6>
                                        <!--<p class="card-text text-justify">{{ substr($seminar->description, 0, 60) }}</p> -->
                                        <a href="{{ url('/seminardetail/'.$seminar->id) }}" class="btn btn-cardbutn float-right">More Info</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        @endforeach
                        @foreach($reseminars as $reseminar)
                        <div class="col-lg-12 col-md-12 seminar-card">
                            <div class="card p-2 euz_bgyellow border-0">
                                <div class="row">
                                    <div class="col-md-12 position-relative">
                                        <img class="card-img-top" src="{{ url('/admin/public/img/seminar/'.$reseminar->profile) }}" alt="">
                                        <label class="seminar-label">Recent Seminar</label>
                                    </div>
                                    <div class="col-md-12 mt-2">
                                        <h5 class="card-title">{{ $reseminar->title }}</h5>
                                        <h6 class="font-weight-bold">{{ date('j M Y', $reseminar->startdate) }}</h6>
                                      <!--  <p class="card-text text-justify">{{ substr($reseminar->description, 0, 60) }}</p> -->
                                        <a href="{{ url('/seminardetail/'.$reseminar->id) }}" class="btn btn-cardbutn float-right">More Info</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        @endforeach
                    </div>
                    <div class="euz_middle"></div>
                    <div class="euz_right">
                        <div class="col-md-12">
                            <h1 class="font-weight-bold">Trainings</h1>
                            <hr>
                        </div>
                        @foreach($retrainings as $retraining)
                        <div class="col-lg-12 col-md-12 training-card">
                            <div class="card p-2 euz_bgyellow border-0">
                                <div class="row">
                                    <div class="col-md-12">
                                        <img class="card-img-top" src="{{ url('/admin/public/img/training/'.$retraining->img) }}" alt="">
                                    </div>
                                    <div class="col-md-12 mt-2">
                                        <h5 class="card-title">{{ $retraining->title }}</h5>
                                        @if ($retraining->dates != 'nodate')
                                        <h6 class="font-weight-bold">{{ date('j M Y', $retraining->startdate) }}</h6>
                                        @endif
                                       <!-- <p>{{ substr($retraining->content, 0, 60) }}</p> -->
                                        <a href="{{ url('/trainingdetail/'.$retraining->id) }}" class="btn btn-cardbutn float-right">More Info</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        @endforeach
                    </div>
                </div>
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
    </script>
</body>
</html>