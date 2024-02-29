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
							<button type="button" class="btn btn-info" id="mybtn" onclick = "location.href = '#'"><div class="fw-bold">내 일지</div></button>
							<button type="button" class="btn btn-info" id="mybtn" onclick = "location.href = '#'"><div class="fw-bold">내 활동</div></button>
						</div>
						<div id="contentCount">
							<div class="text-muted" id="PageCount">게시물 수 : 23</div><hr>
							<div class="text-muted" id="PageCount">댓글 수 : 34</div><hr>
							<div class="text-muted" id="PageCount">기록일지 수 : 12</div><hr>
						</div>
						<div class="d-grid gap-2">
							<button class="btn btn-lg btn-primary" type="button" id="mybtn" onclick = "location.href = '#'">회원정보 수정</button>
  						    <button class="btn btn-lg btn-primary" type="button" id="mybtn" onclick = "location.href = '#'">회원탈퇴</button>
						</div>
                    </div>
                </div>
				
                <div class="col-lg-9" id="col-lg-9">
                <!-- Post content-->
                <article>
				<div class="myPetList">
                	<!-- Post header-->
                    <header class="mb-4" id="PostHeader">
                    	<!-- Post title-->
                    	<h1 class="fw-bolder mb-1">마이 펫</h1>
                    	<!-- Post meta content-->
                    	<div class="text-muted fst-italic mb-2">나의 귀여운 아이들 한눈에!</div>
                    	<!-- Post categories-->
						<button class="btn btn-lg btn-primary" type="button" id="mybtn" onclick = "location.href = '#'">등록하기</button>
						<hr>
                	</header>
					<!-- Pet section-->
					<section>
						<div class="card bg-light">
							<div class="card-body">	
								<div class="d-flex" id="pet-card"><a href="/createPet">
									<div class="flex-shrink-0"><img class="rounded-circle" src="../assets/images/개새끼.jpg" alt="..." /></div>
									<div class="ms-3">
										<div id="card-src">
											<div class="fw-bold">이름</div>
											<div id="card-content">댕댕이<hr></div>
										</div>
										<div id="card-src">
											<div class="fw-bold">나이</div>
											<div id="card-content">4살<hr></div>
										</div>
										<div id="card-src">
											<div class="fw-bold">품종</div>
											<div id="card-content">강아지<hr></div>
										</div>
									</div>
									<div class="pet-datail">자세히 보기</div>
								</a></div>
								<div class="d-flex" id="pet-card"><a href="#createPet">
									<div class="flex-shrink-0"><img class="rounded-circle" src="../assets/images/개새끼귀여워.jpg" alt="..." /></div>
									<div class="ms-3">
										<div id="card-src">
											<div class="fw-bold">이름</div>
											<div id="card-content">댕댕이<hr></div>
										</div>
										<div id="card-src">
											<div class="fw-bold">나이</div>
											<div id="card-content">4살<hr></div>
										</div>
										<div id="card-src">
											<div class="fw-bold">품종</div>
											<div id="card-content">강아지<hr></div>
										</div>
									</div>
									<div class="pet-datail">자세히 보기</div>
								</a></div>
								<div class="d-flex" id="pet-card"><a href="#createPet">
									<div class="flex-shrink-0"><img class="rounded-circle" src="../assets/images/고얌미.jpg" alt="..." /></div>
									<div class="ms-3">
										<div id="card-src">
											<div class="fw-bold">이름</div>
											<div id="card-content">댕댕이<hr></div>
										</div>
										<div id="card-src">
											<div class="fw-bold">나이</div>
											<div id="card-content">4살<hr></div>
										</div>
										<div id="card-src">
											<div class="fw-bold">품종</div>
											<div id="card-content">강아지<hr></div>
										</div>
									</div>
									<div class="pet-datail">자세히 보기</div>
								</a></div>
								<div class="d-flex" id="pet-card"><a href="#createPet">
									<div class="flex-shrink-0"><img class="rounded-circle" src="../assets/images/올빼미.jpg" alt="..." /></div>
									<div class="ms-3">
										<div id="card-src">
											<div class="fw-bold">이름</div>
											<div id="card-content">댕댕이<hr></div>
										</div>
										<div id="card-src">
											<div class="fw-bold">나이</div>
											<div id="card-content">4살<hr></div>
										</div>
										<div id="card-src">
											<div class="fw-bold">품종</div>
											<div id="card-content">강아지<hr></div>
										</div>
									</div>
									<div class="pet-datail">자세히 보기</div>
								</a></div>
								<div class="d-flex" id="pet-card">
									<div class="flex-shrink-0"><a href=""><img class="rounded-circle" src="../assets/images/plus.png" alt="..." /></a></div>
									<h5 class="addPet">반려동물을 추가해주세요</h5>
								</div>
							</div>
						</div>
					</section>
				</div>
				<!-- 2nd section-->
				<section>
					<header class="mb-4" id="PostHeader">
                    	<h1 class="fw-bolder mb-1">내 기록일지</h1>
                    	<div class="text-muted fst-italic mb-2">하루하루 내 반려동물들의 이야기를 기록해주세요</div>
						<hr>
                	</header>
					<div class="card board-container">
    					<div class="board-header">
      						<h4 class="header-title">기록일지 제목</h4>
							<h4 class="header-name">이름</h4>
							<h4 class="header-date">날짜</h4>
    					</div>
    					<div class="board-content">
      						<div class="board-item" v-for="post in posts" :key="post.id">
        						<div class="item-header">
									<img src="../assets/images/CalenderIcon.png" class="calenderIcon">
          							<h5><a href="">{{ post.title }}</a></h5>
									<div class="item-content">
          								<p><a href="">{{ post.content }}</a></p>
        							</div>
          							<span>{{ post.date }}</span>
        						</div>
								<hr class="item-divider">
      						</div>
    					</div>
  					</div>


				</section>

				<section class="mb-5">
						<div class="mb-5-1">
						</div>
                    </section>
                </article>
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
@import '../assets/css/skel.css';
@import '../assets/css/style.css';
@import '../assets/css/style-xlarge.css';
@import '../assets/css/style-myPage.css';
</style>

<script>

export default {
  data() {
    return {
      // Sample data structure for posts, replace with actual data
      posts: [
        { id: 1, title: '산책 1일차', date: '2024-02-22', content: '김댕댕' },
		{ id: 2, title: '산책 1일차', date: '2024-02-22', content: '박댕댕' },
		{ id: 3, title: '산책 1일차', date: '2024-02-22', content: '송댕댕' },
		{ id: 4, title: '산책 1일차', date: '2024-02-22', content: '황댕댕' },
		{ id: 5, title: '산책 1일차', date: '2024-02-22', content: '냥댕냥' },
		{ id: 6, title: '산책 1일차', date: '2024-02-22', content: '뭘봐' },
		{ id: 7, title: '산책 1일차', date: '2024-02-22', content: '두부' },
		{ id: 8, title: '산책 1일차', date: '2024-02-22', content: '두부김치' },
	
        // ...other posts
      ],
	  totalBoard : 0,
	  totalCount : 0,
	  totalDiary : 0
    };
  },
  mounted() {

	
  }
}

</script>