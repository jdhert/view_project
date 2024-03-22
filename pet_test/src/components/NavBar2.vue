<template>
 	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <nav class="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
	    <div class="container">
	    	<a class="navbar-brand" href="index.html"><span class="flaticon-pawprint-1 mr-2"></span>Pet sitting</a>
	      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
	        <span class="fa fa-bars"></span> Menu
	      </button>
	      <div class="collapse navbar-collapse" id="ftco-nav">
	        <ul class="navbar-nav ml-auto">
	        	<li class="nav-item active"><a href="index.html" class="nav-link">Home</a></li>
	        	<li class="nav-item"><a href="about.html" class="nav-link">About</a></li>
	        	<li class="nav-item"><a href="vet.html" class="nav-link">Veterinarian</a></li>
	        	<li class="nav-item"><a href="services.html" class="nav-link">Services</a></li>
	          <li class="nav-item"><a href="gallery.html" class="nav-link">Gallery</a></li>
	          <li class="nav-item"><a href="pricing.html" class="nav-link">Pricing</a></li>
	          <li class="nav-item"><a href="blog.html" class="nav-link">Blog</a></li>
	          <li class="nav-item"><a href="contact.html" class="nav-link">Contact</a></li>
	        </ul>
	      </div>
	    </div>
	  </nav>
    <!-- <div class="wrap">
			<div class="container">
				<div class="row">
					<div class="col-md-6 d-flex align-items-center">
						<p class="mb-0 phone pl-md-2">
							<a href="#" class="mr-2"><span class="fa fa-phone mr-1"></span> +00 1234 567</a> 
							<a href="#"><span class="fa fa-paper-plane mr-1"></span> youremail@email.com</a>
						</p>
					</div>
					<div class="col-md-6 d-flex justify-content-md-end">
						<div class="social-media">
			    		<p class="mb-0 d-flex">
			    			<a href="#" class="d-flex align-items-center justify-content-center"><span class="fa fa-facebook"><i class="sr-only">Facebook</i></span></a>
			    			<a href="#" class="d-flex align-items-center justify-content-center"><span class="fa fa-twitter"><i class="sr-only">Twitter</i></span></a>
			    			<a href="#" class="d-flex align-items-center justify-content-center"><span class="fa fa-instagram"><i class="sr-only">Instagram</i></span></a>
			    			<a href="#" class="d-flex align-items-center justify-content-center"><span class="fa fa-dribbble"><i class="sr-only">Dribbble</i></span></a>
			    		</p>
		        </div>
					</div>
				</div>
			</div>
		</div> -->
</template>
<script>
export default {
  computed : {
    isLoggedIn() {
      return (this.$store.state.isLoggedIn || (this.$cookies.isKey('id') ? true : false)) ? true : false;
    },
    // isLogin() {
    //   return this.$cookies.isKey('id') ? true : false;
    // }
  },
  methods : {
    logout() {
      this.axios.get('/api/login/logout').then(() => {
        // Vuex 상태 업데이트
        this.$store.commit('setLoginStatus', false);
        this.$store.commit('setUser', {});
        // 로그아웃 후 리다이렉트
        window.Kakao.Auth.logout();
        this.$store.dispatch('logout');
        this.$router.push('/login');
      }).catch(error => {
        console.error("로그아웃 시도 중 오류 발생:", error);
      });
    },
  }
}

</script>

<style scoped>

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  text-align: left;
  background-color: #fff; }

[tabindex="-1"]:focus {
  outline: 0 !important; }

p {
  margin-top: 0;
  margin-bottom: 1rem; }

a {
  color: #007bff;
  text-decoration: none;
  background-color: transparent; }
  a:hover {
    color: #0056b3;
    text-decoration: underline; }

a:not([href]):not([tabindex]) {
  color: inherit;
  text-decoration: none; }
  a:not([href]):not([tabindex]):hover, a:not([href]):not([tabindex]):focus {
    color: inherit;
    text-decoration: none; }
  a:not([href]):not([tabindex]):focus {
    outline: 0; }

.container {
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto; }
  @media (min-width: 576px) {
    .container {
      max-width: 540px; } }
  @media (min-width: 768px) {
    .container {
      max-width: 720px; } }
  @media (min-width: 992px) {
    .container {
      max-width: 960px; } }
  @media (min-width: 1200px) {
    .container {
      max-width: 1140px; } }

.row {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px; }

.collapse:not(.show) {
  display: none; }

.collapsing {
  position: relative;
  height: 0;
  overflow: hidden;
  -webkit-transition: height 0.35s ease;
  -o-transition: height 0.35s ease;
  transition: height 0.35s ease; }
  @media screen and (prefers-reduced-motion: reduce) {
    .collapsing {
      -webkit-transition: none;
      -o-transition: none;
      transition: none; } }

.nav-link {
  display: block;
  padding: 0.5rem 1rem; }
  .nav-link:hover, .nav-link:focus {
    text-decoration: none; }
  .nav-link.disabled {
    color: #6c757d;
    pointer-events: none;
    cursor: default; }

.navbar {
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding: 0.5rem 1rem; }
  .navbar > .container,
  .navbar > .container-fluid {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between; }

.navbar-brand {
  display: inline-block;
  padding-top: 0.3125rem;
  padding-bottom: 0.3125rem;
  margin-right: 1rem;
  font-size: 1.25rem;
  line-height: inherit;
  white-space: nowrap; }
  .navbar-brand:hover, .navbar-brand:focus {
    text-decoration: none; }

.navbar-nav {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  padding-left: 0;
  margin-bottom: 0;
  list-style: none; }
  .navbar-nav .nav-link {
    padding-right: 0;
    padding-left: 0; }
  .navbar-nav .dropdown-menu {
    position: static;
    float: none; }


.navbar-collapse {
  -ms-flex-preferred-size: 100%;
  flex-basis: 100%;
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center; }

.navbar-toggler {
  padding: 0.25rem 0.75rem;
  font-size: 1.25rem;
  line-height: 1;
  background-color: transparent;
  border: 1px solid transparent;
  border-radius: 0.25rem; }
  .navbar-toggler:hover, .navbar-toggler:focus {
    text-decoration: none; }
  .navbar-toggler:not(:disabled):not(.disabled) {
    cursor: pointer; }

.navbar-toggler-icon {
  display: inline-block;
  width: 1.5em;
  height: 1.5em;
  vertical-align: middle;
  content: "";
  background: no-repeat center center;
  background-size: 100% 100%; }

@media (max-width: 991.98px) {
  .navbar-expand-lg > .container,
  .navbar-expand-lg > .container-fluid {
    padding-right: 0;
    padding-left: 0; } }

@media (min-width: 992px) {
  .navbar-expand-lg {
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-flow: row nowrap;
    flex-flow: row nowrap;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start; }
    .navbar-expand-lg .navbar-nav {
      -webkit-box-orient: horizontal;
      -webkit-box-direction: normal;
      -ms-flex-direction: row;
      flex-direction: row; }
      .navbar-expand-lg .navbar-nav .dropdown-menu {
        position: absolute; }
      .navbar-expand-lg .navbar-nav .nav-link {
        padding-right: 0.5rem;
        padding-left: 0.5rem; }
    .navbar-expand-lg > .container,
    .navbar-expand-lg > .container-fluid {
      -ms-flex-wrap: nowrap;
      flex-wrap: nowrap; }
    .navbar-expand-lg .navbar-collapse {
      display: -webkit-box !important;
      display: -ms-flexbox !important;
      display: flex !important;
      -ms-flex-preferred-size: auto;
      flex-basis: auto; }
    .navbar-expand-lg .navbar-toggler {
      display: none; } }
  .accordion .card:first-of-type {
    border-bottom: 0;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0; }
  .accordion .card:last-of-type {
    border-top-left-radius: 0;
    border-top-right-radius: 0; }
  .accordion .card .card-header {
    margin-bottom: -1px; }

.d-flex {
  display: -webkit-box !important;
  display: -ms-flexbox !important;
  display: flex !important; }

.justify-content-center {
  -webkit-box-pack: center !important;
  -ms-flex-pack: center !important;
  justify-content: center !important; }

.align-items-center {
  -webkit-box-align: center !important;
  -ms-flex-align: center !important;
  align-items: center !important; }

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0; }

.mb-0,
.my-0 {
  margin-bottom: 0 !important; }

.mr-1,
.mx-1 {
  margin-right: 0.25rem !important; }

.mr-2,
.mx-2 {
  margin-right: 0.5rem !important; }

.ml-auto,
.mx-auto {
  margin-left: auto !important; }


@media print {
  *,
  *::before,
  *::after {
    text-shadow: none !important;
    -webkit-box-shadow: none !important;
    box-shadow: none !important; }
  a:not(.btn) {
    text-decoration: underline; }
  abbr[title]::after {
    content: " (" attr(title) ")"; }
  pre {
    white-space: pre-wrap !important; }
  pre,
  blockquote {
    border: 1px solid #adb5bd;
    page-break-inside: avoid; }
  thead {
    display: table-header-group; }
  tr,
  img {
    page-break-inside: avoid; }
  p,
  h2,
  h3 {
    orphans: 3;
    widows: 3; }
  h2,
  h3 {
    page-break-after: avoid; }
  @page {
    size: a3; }
  body {
    min-width: 992px !important; }
  .container {
    min-width: 992px !important; }
  .navbar {
    display: none; }
  .badge {
    border: 1px solid #000; }
  .table {
    border-collapse: collapse !important; }
    .table td,
    .table th {
      background-color: #fff !important; }
  .table-bordered th,
  .table-bordered td {
    border: 1px solid #dee2e6 !important; }
  .table-dark {
    color: inherit; }
    .table-dark th,
    .table-dark td,
    .table-dark thead th,
    .table-dark tbody + tbody {
      border-color: #dee2e6; }
  .table .thead-dark th {
    color: inherit;
    border-color: #dee2e6; } }


.wrap {
  position: relative;
  z-index: 0;
  width: 100%;
  background: #00bd56;
  background: #207dff;
  background: -moz-linear-gradient(45deg, #207dff 0%, #00bd55 100%);
  background: -webkit-gradient(left bottom, right top, color-stop(0%, #207dff), color-stop(100%, #00bd55));
  background: -webkit-linear-gradient(45deg, #207dff 0%, #00bd55 100%);
  background: -o-linear-gradient(45deg, #207dff 0%, #00bd55 100%);
  background: -ms-linear-gradient(45deg, #207dff 0%, #00bd55 100%);
  background: linear-gradient(45deg, #207dff 0%, #00bd55 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#207dff', endColorstr='#00bd55', GradientType=1 ); }
  .wrap .phone {
    z-index: 1; }
    .wrap .phone span {
      color: #fff; }
    .wrap .phone a {
      color: #fff;
      font-size: 12px; }

      
.social-media {
  display: inline-block; }
  .social-media p a {
    width: 40px;
    height: 40px;
    margin-right: 1px; }
    .social-media p a span {
      color: #fff; }
    .social-media p a:hover {
      background: #00bd56;
      border-color: #00bd56; }
      .social-media p a:hover span {
        color: #fff; }

.ftco-navbar-light {
  background: #fff !important;
  z-index: 3;
  padding: 0;
  -webkit-box-shadow: 0px 5px 20px -17px rgba(0, 0, 0, 0.34);
  -moz-box-shadow: 0px 5px 20px -17px rgba(0, 0, 0, 0.34);
  box-shadow: 0px 5px 20px -17px rgba(0, 0, 0, 0.34); }
  @media (max-width: 991.98px) {
    .ftco-navbar-light {
      background: #fff;
      position: relative;
      top: 0;
      padding: 10px 15px; } }
  .ftco-navbar-light .navbar-brand {
    color: #000000;
    font-weight: 800;
    font-size: 28px;
    line-height: 1; }
    .ftco-navbar-light .navbar-brand span {
      color: #00bd56; }
    .ftco-navbar-light .navbar-brand:hover, .ftco-navbar-light .navbar-brand:focus {
      color: #000000; }
    @media (max-width: 767.98px) {
      .ftco-navbar-light .navbar-brand {
        margin: 10px 0; } }
  @media (max-width: 991.98px) {
    .ftco-navbar-light .navbar-nav {
      padding-bottom: 10px; } }
  .ftco-navbar-light .navbar-nav > .nav-item > .nav-link {
    font-size: 14px;
    padding-top: 2.3rem;
    padding-bottom: 2.3rem;
    padding-left: 18px;
    padding-right: 18px;
    font-weight: 700;
    color: #000000;
    position: relative;
    text-transform: uppercase;
    opacity: 1 !important; }
    .ftco-navbar-light .navbar-nav > .nav-item > .nav-link:before {
      content: "";
      position: absolute;
      width: 100%;
      height: 2px;
      bottom: 0px;
      left: 0;
      background-color: #00bd56;
      visibility: hidden;
      -webkit-transform: scaleX(0);
      -ms-transform: scaleX(0);
      transform: scaleX(0);
      -webkit-transition: all 0.1s ease-in-out 0s;
      -o-transition: all 0.1s ease-in-out 0s;
      transition: all 0.1s ease-in-out 0s;
      z-index: -1; }
    .ftco-navbar-light .navbar-nav > .nav-item > .nav-link:hover {
      color: #00bd56; }
      .ftco-navbar-light .navbar-nav > .nav-item > .nav-link:hover:before {
        visibility: visible;
        background-color: #00bd56;
        -webkit-transform: scaleX(1);
        -ms-transform: scaleX(1);
        transform: scaleX(1); }
    @media (max-width: 991.98px) {
      .ftco-navbar-light .navbar-nav > .nav-item > .nav-link {
        padding-left: 0;
        padding-right: 0;
        padding-top: .9rem;
        padding-bottom: .9rem; }
        /* .ftco-navbar-light .navbar-nav > .nav-item > .nav-link:hover {
          color: #fff; }  */
        }
    @media (max-width: 767.98px) {
      .ftco-navbar-light .navbar-nav > .nav-item > .nav-link {
        border-bottom: 1px solid rgba(0, 0, 0, 0.05); } }
  .ftco-navbar-light .navbar-nav > .nav-item .dropdown-menu {
    border: none;
    background: #fff;
    -webkit-box-shadow: 0px 10px 34px -20px rgba(0, 0, 0, 0.41);
    -moz-box-shadow: 0px 10px 34px -20px rgba(0, 0, 0, 0.41);
    box-shadow: 0px 10px 34px -20px rgba(0, 0, 0, 0.41);
    border-radius: 4px; }
    .ftco-navbar-light .navbar-nav > .nav-item .dropdown-menu .dropdown-item {
      font-size: 12px;
      color: #000000; }
      .ftco-navbar-light .navbar-nav > .nav-item .dropdown-menu .dropdown-item:hover, .ftco-navbar-light .navbar-nav > .nav-item .dropdown-menu .dropdown-item:focus {
        background: #00bd56;
        color: #fff; }
    @media (max-width: 991.98px) {
      .ftco-navbar-light .navbar-nav > .nav-item .dropdown-menu {
        display: block !important;
        background: #fff;
        -webkit-box-shadow: none;
        box-shadow: none; } }
  .ftco-navbar-light .navbar-nav > .nav-item.cta > a {
    color: #fff;
    background: #00bd56;
    border-radius: 0px; }
    @media (max-width: 767.98px) {
      .ftco-navbar-light .navbar-nav > .nav-item.cta > a {
        padding-left: 15px;
        padding-right: 15px; } }
    @media (max-width: 991.98px) {
      .ftco-navbar-light .navbar-nav > .nav-item.cta > a {
        color: #fff;
        background: #00bd56;
        border-radius: 4px; } }
  .ftco-navbar-light .navbar-nav > .nav-item.active > a {
    color: #00bd56; }
    .ftco-navbar-light .navbar-nav > .nav-item.active > a:before {
      visibility: visible;
      background-color: #00bd56;
      -webkit-transform: scaleX(1);
      -ms-transform: scaleX(1);
      transform: scaleX(1); }
    @media (max-width: 991.98px) {
      .ftco-navbar-light .navbar-nav > .nav-item.active > a {
        color: #000000; }
        .ftco-navbar-light .navbar-nav > .nav-item.active > a:before {
          display: none; } }
  .ftco-navbar-light .navbar-toggler {
    border: none;
    color: rgba(0, 0, 0, 0.5) !important;
    cursor: pointer;
    padding-right: 0;
    text-transform: uppercase;
    font-size: 16px;
    letter-spacing: .1em; }
    .ftco-navbar-light .navbar-toggler:focus {
      outline: none !important; }
    
</style>