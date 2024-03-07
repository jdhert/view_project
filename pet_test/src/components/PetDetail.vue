<template>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
<body id="top">
    <section id="DetailBanner">
    </section>
    <!-- Page Content-->
    <section class="py-5">
        <div class="container px-5 my-5">
            <div class="PetDetail">
                <!-- Calender List-->
                <header class="mb-4" id="PostHeader">
                    <!-- Post title-->
                    <h1 class="fw-bolder mb-1">마이 펫</h1>
                    <!-- Post meta content-->
                    <div class="text-muted fst-italic mb-2">내 반려동물의 상세정보를 기록해주세요</div>
                    <hr>
                </header>
                <div class="row d-flex no-gutters" id="petProfil">
                    <div class="col-md-5 d-flex">
                        <img src="../assets/images/개새끼귀여워.jpg" class="img-fluid">
                    </div>
                    <div class="col-md-7 pl-md-5 py-md-5">
                        <div class="heading-section pt-md-5" id="PetName">
                            <div class="text-muted">Name</div>
                            <h2 class="mb-4 fw-bold">복딩이</h2>
                        </div>
                        <div class="row" id="status">
                            <div class="col-md-6 services-2 w-100 d-flex" id="PetAge">
                                <div class="icon d-flex align-items-center justify-content-center"></div>
                                <div class="text pl-3">
                                    <div class="text-muted">Age </div>
                                    <h4 class="fw-bold">12살</h4>
                                </div>
                            </div>
                            <div class="col-md-6 services-2 w-100 d-flex" id="PetWeight">
                                <div class="icon d-flex align-items-center justify-content-center"></div>
                                <div class="text pl-3">
                                    <div class="text-muted">Weight</div>
                                    <h4 class="fw-bold">2.7 kg</h4>
                                </div>
                            </div>
                            <div class="col-md-6 services-2 w-100 d-flex" id="PetSpecies">
                                <div class="icon d-flex align-items-center justify-content-center"></div>
                                <div class="text pl-3">
                                    <div class="text-muted">Species</div>
                                    <h4 class="fw-bold">강아지 (말티즈)</h4>
                                </div>
                            </div>
                        </div>
                        <div class="d-grid gap-2">
						    <button class="btn btn-lg btn-primary" type="button" id="mybtn" onclick = "location.href = '#'">정보 수정</button>							
					    </div>
                    </div>
                </div>  
            </div>
            <div class="PetDiary">
                <!-- Calender List-->
                <header class="mb-4" id="PostHeader">
                    <!-- Post title-->
                    <h1 class="fw-bolder mb-1">펫 기록일지</h1>
                    <!-- Post meta content-->
                    <div class="text-muted fst-italic mb-2">내 반려동물의 하루하루 일지를 작성해보세요</div>
                    <div class="text-muted" id="AllDiary"><a href="/diary">전체 보기</a></div>
                    <hr>
                </header>
                <div class="DiaryList2">
				    <div class="row">
                        <div class="col-md-4 ftco-animate" v-for="(addpost, index) in addposts" :key="index">
                            <div class="work mb-4 img d-flex align-items-end" id="DiaryImg" :style="{backgroundImage:'url(' +  require('@/assets/images/' + addpost.image) + ')'}">
            	                <div class="desc w-100 px-4">
	                                <div class="text w-100 mb-3">
	              	                    <span>{{ addpost.author }}</span>
	              	                    <h2><a href="work-single.html">{{ addpost.title }}</a></h2>
	                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr>
            </div>
        </div>


        <div class="PetCalc">
            <a href="/PetCalc"><div>
                <img src="../assets/images/동물그림-1.png">
                <h1>비만도<br>계산기</h1>
            </div></a>
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
									<ul class="alt"><li><a href="#">박세한 : </a></li>
										<li><a href="#">김미성 : </a></li>
										<li><a href="#">박현오 : </a></li>
										<li><a href="#">오시현 : </a></li>
										<li><a href="#">주나영 : </a></li>
									</ul></div>
								<div class="6u">
									<h3>Contact</h3>
									<ul class="alt"><li><a href="#">kkuldong12@gmail.com</a></li>
										<li><a href="#">abcde1234@gmail.com</a></li>
										<li><a href="#">efgh5678@gmail.com</a></li>
										<li><a href="#">lmno9012@gmail.com</a></li>
										<li><a href="#">pqrs3456@gmail.com</a></li>
									</ul></div>
							</div>
						</div>
						<div class="6u">
							<h2>백엔드 개발자 프로젝트</h2>
							<p>상기 서비스는 프로젝트 발표 및 포트폴리오를 목표로 하며 상업적인 용도로 이용될 소지가 없습니다. 또한 가져온 정보들은 모두 무료 오픈소스들을 이용하였습니다.</p>
							<ul class="icons"><li><a href="#" class="icon fa-twitter"><span class="label">Twitter</span></a></li>
								<li><a href="#" class="icon fa-facebook"><span class="label">Facebook</span></a></li>
								<li><a href="#" class="icon fa-instagram"><span class="label">Instagram</span></a></li>
								<li><a href="#" class="icon fa-linkedin"><span class="label">LinkedIn</span></a></li>
								<li><a href="#" class="icon fa-pinterest"><span class="label">Pinterest</span></a></li>
							</ul></div>
					</div>
				</div>
			</footer><div class="copyright">
			Made by: <a href="#">Kitri</a>
	</div>
</body>	 
</template>
        
<script>    
export default {
  data() {
    return {
    addposts: [
      { id: 1, title: '댕댕이랑 냥냥이랑 산책하는 날', image: 'diary_ex_01.jpg', date: 'february 07, 2024', author: '냥냥이'},
      { id: 2, title: '댕댕이랑 냥냥이랑 산책하는 날', image: 'diary_ex_02.jpg', date: 'february 14, 2024', author: '댕댕이'},
      { id: 3, title: '댕댕이랑 냥냥이랑 산책하는 날', image: 'diary_ex_03.jpg', date: 'february 25, 2024', author: '댕댕이레코즈'},
      { id: 3, title: '댕댕이랑 냥냥이랑 산책하는 날', image: 'diary_ex_01.jpg', date: 'february 25, 2024', author: '댕댕이레코즈'},
      { id: 1, title: '댕댕이랑 냥냥이랑 산책하는 날', image: 'diary_ex_02.jpg', date: 'february 07, 2024', author: '냥냥이'},
      { id: 2, title: '댕댕이랑 냥냥이랑 산책하는 날', image: 'diary_ex_03.jpg', date: 'february 14, 2024', author: '댕댕이'},
      { id: 3, title: '댕댕이랑 냥냥이랑 산책하는 날', image: 'diary_ex_01.jpg', date: 'february 25, 2024', author: '댕댕이레코즈'},
      { id: 3, title: '댕댕이랑 냥냥이랑 산책하는 날', image: 'diary_ex_02.jpg', date: 'february 25, 2024', author: '댕댕이레코즈'},
  ]
    }
  },
  methods: {
      goToWrite() {
        this.$router.push(`/addphoto`); 
      }
  }
}
</script>

<style scoped> 
@import '../assets/css/skel.css';
@import '../assets/css/style.css';
@import '../assets/css/style-xlarge.css';
@import '../assets/css/style-PetDetail.css';
@import '../assets/css/style-PetDiary.css';
</style>
