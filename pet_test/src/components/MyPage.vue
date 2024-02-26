<template>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
<body id="top">
	<section id="MyBanner">
        <div class="inner"></div>
	</section>
	<!-- Page Content-->
	<section class="py-5">
        <div class="container px-5 my-5">
            <div class="row gx-5">
                <div class="col-lg-3" id="col-lg-3">
                    <div class="d-flex align-items-center mt-lg-5 mb-4" id="mt-lg-5">
                        <!-- <img class="img-fluid rounded-circle" src="https://dummyimage.com/50x50/ced4da/6c757d.jpg" alt="..." /> -->
						<img class="img-fluid rounded-circle" src="../assets/images/default.jpg" alt="..." id="profil-img"/>
                        <div class="" id="myname">
                            <div class="fw-bold">닉네임이 뭐에요</div>
                            <div class="text-muted">email@gmail.com</div>
                        </div>
						<div id="myButten">
							<button type="button" class="btn btn-info" id="mybtn"><div class="fw-bold">내 일지</div></button>
							<button type="button" class="btn btn-info" id="mybtn"><div class="fw-bold">내 활동</div></button>
						</div>
						<div id="contentCount">
							<div class="text-muted" id="PageCount">게시물 수 : 23</div><hr>
							<div class="text-muted" id="PageCount">댓글 수 : 34</div><hr>
							<div class="text-muted" id="PageCount">기록일지 수 : 12</div><hr>
						</div>
						<div class="d-grid gap-2">
							<button class="btn btn-lg btn-primary" type="button" id="mybtn">회원정보 수정</button>
  						    <button class="btn btn-lg btn-primary" type="button" id="mybtn">회원탈퇴</button>
						</div>
                    </div>
                </div>
                <div class="col-lg-9" id="col-lg-9">
                <!-- Post content-->
                <article>
                <!-- Post header-->
                    <header class="mb-4">
                    	<!-- Post title-->
                    	<h1 class="fw-bolder mb-1">Welcome to My Page!</h1>
                    	<!-- Post meta content-->
                    	<div class="text-muted fst-italic mb-2">January 1, 2023</div>
                    	<!-- Post categories-->
                    	<a class="badge bg-secondary text-decoration-none link-light" href="#!">Web Design</a>
                    	<a class="badge bg-secondary text-decoration-none link-light" href="#!">Freebies</a>
                	</header>
                    <!-- Preview image figure-->
                    <figure class="mb-4">
						<img class="img-fluid rounded" src="https://dummyimage.com/900x400/ced4da/6c757d.jpg" alt="..." />
					</figure>
                    <!-- Post content-->
                    <section class="mb-5">
                    	<p class="fs-5 mb-4">Science is an enterprise that should be cherished as an activity of the free human mind. Because it transforms who we are, how we live, and it gives us an understanding of our place in the universe.</p>
                        <p class="fs-5 mb-4">The universe is large and old, and the ingredients for life as we know it are everywhere, so there's no reason to think that Earth would be unique in that regard. Whether of not the life became intelligent is a different question, and we'll see if we find that.</p>
                        <p class="fs-5 mb-4">If you get asteroids about a kilometer in size, those are large enough and carry enough energy into our system to disrupt transportation, communication, the food chains, and that can be a really bad day on Earth.</p>
                        <h2 class="fw-bolder mb-4 mt-5">I have odd cosmic thoughts every day</h2>
                    	<p class="fs-5 mb-4">For me, the most fascinating interface is Twitter. I have odd cosmic thoughts every day and I realized I could hold them to myself or share them with people who might be interested.</p>
                        <p class="fs-5 mb-4">Venus has a runaway greenhouse effect. I kind of want to know what happened there because we're twirling knobs here on Earth without knowing the consequences of it. Mars once had running water. It's bone dry today. Something bad happened there as well.</p>
                    </section>
                </article>
                <!-- Comments section-->
                <section>
					<div class="card bg-light">
						<div class="card-body">
							<!-- Comment form-->
							<form class="mb-4"><textarea class="form-control" rows="3" placeholder="Join the discussion and leave a comment!"></textarea></form>
							<!-- Comment with nested comments-->
							<div class="d-flex mb-4">
							<!-- Parent comment-->
							<div class="flex-shrink-0"><img class="rounded-circle" src="https://dummyimage.com/50x50/ced4da/6c757d.jpg" alt="..." /></div>
								<div class="ms-3">
									<div class="fw-bold">Commenter Name</div>
									If you're going to lead a space frontier, it has to be government; it'll never be private enterprise. Because the space frontier is dangerous, and it's expensive, and it has unquantified risks.
									<!-- Child comment 1-->
									<div class="d-flex mt-4">
										<div class="flex-shrink-0"><img class="rounded-circle" src="https://dummyimage.com/50x50/ced4da/6c757d.jpg" alt="..." /></div>
										<div class="ms-3">
											<div class="fw-bold">Commenter Name</div>
											And under those conditions, you cannot establish a capital-market evaluation of that enterprise. You can't get investors.
										</div>
									</div>
								<!-- Child comment 2-->
									<div class="d-flex mt-4">
										<div class="flex-shrink-0"><img class="rounded-circle" src="https://dummyimage.com/50x50/ced4da/6c757d.jpg" alt="..." /></div>
										<div class="ms-3">
											<div class="fw-bold">Commenter Name</div>
											When you put money directly to a problem, it makes a good headline.
										</div>
									</div>
								</div>
							</div>
							<!-- Single comment-->
							<div class="d-flex">
								<div class="flex-shrink-0"><img class="rounded-circle" src="https://dummyimage.com/50x50/ced4da/6c757d.jpg" alt="..." /></div>
								<div class="ms-3">
									<div class="fw-bold">Commenter Name</div>
									When I look at the universe and all the ways the universe wants to kill us, I find it hard to reconcile that with statements of beneficence.
								</div>
							</div>
						</div>
					</div>
    			</section>
                </div>
            </div>
        </div>
    </section>
    
    <!-- Footer -->
    <footer id="footer">
        <div class="container">
			<div class="row double">
				<div class="6u">
					<div class="row collapse-at-2">
						<div class="6u">
							<h3>Contributors</h3>
							<ul class="alt">
                                <li><a href="#">박세한 : </a></li>
								<li><a href="#">김미성 : </a></li>
								<li><a href="#">박현오 : </a></li>
								<li><a href="#">오시현 : </a></li>
								<li><a href="#">주나영 : </a></li>
							</ul>
                        </div>
						<div class="6u">
							<h3>Contact</h3>
							<ul class="alt">
                                <li><a href="#">kkuldong12@gmail.com</a></li>
								<li><a href="#">abcde1234@gmail.com</a></li>
								<li><a href="#">efgh5678@gmail.com</a></li>
								<li><a href="#">lmno9012@gmail.com</a></li>
								<li><a href="#">pqrs3456@gmail.com</a></li>
							</ul>
                        </div>
					</div>
				</div>
				<div class="6u">
					<h2>백엔드 개발자 프로젝트</h2>
						<p>상기 서비스는 프로젝트 발표 및 포트폴리오를 목표로 하며 상업적인 용도로 이용될 소지가 없습니다. 또한 가져온 정보들은 모두 무료 오픈소스들을 이용하였습니다.</p>
							<ul class="icons">
								<li><a href="#" class="icon fa-twitter"><span class="label">Twitter</span></a></li>
								<li><a href="#" class="icon fa-facebook"><span class="label">Facebook</span></a></li>
								<li><a href="#" class="icon fa-instagram"><span class="label">Instagram</span></a></li>
								<li><a href="#" class="icon fa-linkedin"><span class="label">LinkedIn</span></a></li>
								<li><a href="#" class="icon fa-pinterest"><span class="label">Pinterest</span></a></li>
							</ul>
                </div>
			</div>
		</div>
	</footer>
    <div class="copyright">
		Made by: <a href="#">Kitri</a>
	</div>
</body>	 
</template>
<style>
	/* MyBanner */

	#MyBanner {
		color: white;
		background-image: url("../assets/images/MyPage.jpg");
		/* background-size: cover; */
		background-size: 75%;
		background-position: center center;
		background-repeat: no-repeat;
		color: #d8d8d8;
		padding: 14em 0;
		margin-top: 75px;
		text-align: center;
		position: relative;
		height: 200px;
	}

	#MyBanner:before {
		content: '';
 	 	position: absolute;
  		left: 50%;
 	 	top: 0;
 		transform: translateX(-50%); /* 가운데로 이동 */
  		width: 100%; /* 너비를 60%로 설정 */
  		height: 100%;
  		background: rgba(64, 72, 80, 0.25);			
	}

	#MyBanner .inner {
		position: relative;
		z-index: 1;
	}
	
	#MyBanner .inner :last-child {
		margin-bottom: 0;
	}

	/* content */
	.px-5 {
    	position: relative;
    	top: -275px;
    	background-color: white;
    	padding: 30px;
		border-radius: 5px;
	}

	#col-lg-9 {
	    width: 75%;
	}

	/* sideBar */

	#col-lg-3 {
    	width: 25%;
		box-shadow: 1px 0px 0 #f0f0f0;
	}

	#mt-lg-5 {
		/* div 내에 중앙 정렬 */
		display : flex;
	    justify-content: center;
	    align-items : center;
		/* 여러 요소 세로 정렬 */
		flex-direction: column;
	}

	#profil-img {
		margin-bottom: 1rem !important;
		/* border 테두리 지정 */
		border: 5px;
		border-style: solid;
		border-color: #BDE3FF;
	}

	#myname {
		margin-bottom: 1rem !important;

	}

	#myButten {
		margin-bottom: 1rem !important;
	}

	#myButten > button {
		border: 2px;
		border-style: solid;
		border-color: #cbe6fa;
		background-color: #b1dfff;
		margin-right: 1rem !important;
		margin-bottom: 0.5rem !important;
	}

	#myButten > button:hover {
		background-color: #85ccff;
		border: 2px;
		border-style: solid;
		border-color: #9ed2f8;
	}

	#myButten > button:active {
		background-color: #6ac1ff;
	}


	#myButten > button .fw-bold{
		color: white;
	}

	#contentCount {
		text-align: left;
		width: 140px;
	}

	#PageCount {
		color: #929292 !important;
		border-bottom: 0rem !important;
		font-weight: bold;
	}

	.d-grid {
		margin-top: 1rem !important;
		width: 190px;
	}

	.d-grid > button {
		background-color: #a7d3f3;
		border: 2px;
		border-style: solid;
		border-color: #a7d3f3;
	}

	.d-grid > button:hover {
		background-color: #85ccff;
		border: 2px;
		border-style: solid;
		border-color: #9ed2f8;
	}

	.d-grid > button:active {
		background-color: #6ac1ff !important;
		border-color: #9ed2f8 !important;
	}

	hr {
		margin-top: 0rem !important;
		size: 0.1px;
		background-color:#85ccff;
	    height: 2px;
	}
	
	#mybtn {
		color: white;
    	border-color: #ECEFF1;
		border: 3px solid;
		border-radius: 40px;
		font-weight: bold;
		letter-spacing: 2px;
    	text-transform: uppercase;
		font-size: 14px;
	}

</style>

<script>

</script>