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
						              <button class="btn btn-lg btn-primary" type="button" id="mybtn" onclick = "location.href = '/petupdate'">정보 수정</button>							
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
                    <div class="col-md-4 ftco-animate">
                      <a href="/create"><div class="addDiary mb-4 img d-flex align-items-end" id="addDiary" onclick="">
                        <img src="../assets/images/plus.png" alt="Add Diary">
                      </div></a>
                    </div>                  
                  </div>
                </div>
                <hr>
            </div>
        </div>

        <div class="PetCalc">
            <a href="/bmi">
              <h2>비만도<br>계산기</h2>
            </a>
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
@import '../assets/css/style-myPage.css';

@font-face {
    font-family: 'Ownglyph_meetme-Rg';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2402_1@1.0/Ownglyph_meetme-Rg.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}

h2, h4 {
    font-family: 'Ownglyph_meetme-Rg';

}

#DetailBanner {
    background-image: url(../assets/images/bg_2-1.jpg);
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    color: #d8d8d8;
    padding: 15em 0;
    margin-top: 90px;
    text-align: center;
    position: relative;
    height: 200px;
}

#DetailBanner:before {
    content: '';
      position: absolute;
      left: 50%;
      top: 0;
     transform: translateX(-50%); /* 가운데로 이동 */
      width: 100%; /* 너비를 60%로 설정 */
      height: 100%;
      background: rgba(64, 72, 80, 0.25);			
}

.PetDetail {
    margin: 30px 50px 50px 50px;
}

#petProfil {
    margin: 0 auto; /* 수평 가운데 정렬을 위한 왼쪽과 오른쪽 마진을 자동으로 설정합니다. */
    margin-bottom: 2rem;
    margin-top: 2rem;
    max-width: 100%; 
    width: 100%;
    /* padding: 1.5rem; */
    /* background-color: #f8fbff; */
    justify-content: space-around;
}

.col-md-5 {
    padding-left: 0rem !important;
    width: 400px; 
    height: 400px; 
    overflow: hidden;
    justify-content: center;
    width: 400px;
}

.col-md-5 > img {
    align-self: stretch;
    align-items: center;
    justify-content: center;
    -webkit-box-pack: center;
    width: 400px;
    height: 400px;
    object-fit: cover;
    padding-right: 0px;

    border-radius: 100%;
    border: 5px;
    border-style: solid;
    border-color: #6fd6abbe;   
}

#status {
    margin : 0px 0px 0px 0px;
}

#status > .col-md-6 {
    padding-left: 30px !important;
    padding-right: 30px !important;

}

.col-md-7 {
    /* padding-left: 100px !important ; */
    padding-right: 12px !important;  
    width: 33% !important;
    
}

.mb-4 {
    margin-bottom: 1rem !important;
}

.pl-3 {
    text-align: left !important;
}

#PetName {
    padding-top: 1rem !important;
    padding-left: 30px !important;
    padding-right: 30px !important;
    text-align: left !important;
}

#PetAge {
    background-color: #f8fbff;
}

#PetSpecies {
    background-color: #f8fbff;
}

#AllDiary {
    display: inline;
    margin-left: 10px;
    font-family: 'Ownglyph_meetme-Rg';
    font-weight: bold;
    font-size: 24px;
}

#AllDiary > a {
    color: rgb(96, 184, 255);
    text-decoration: none;
}

.col-md-7 .d-grid {
    margin: 0 auto;
}

/* PetDiary */

.PetDiary { 
    margin: 70px 50px 50px 50px;
} 

/* PetCalc */

.PetCalc {
    position: fixed;
    width: 100px;
    height: 110px;
    top: 83%;
    margin-top: -50px;
    right: 1.5%;
    background:#fff3fb;
    background-image: url(../assets/images/PetScale.png);
    background-repeat: no-repeat;
    background-position: center;

    border-radius: 20px;
    border: 3px solid #f0f0f0;    
    /* box-shadow: 0 0 0 2px white; */
    text-shadow: 2px 2px 2px rgb(231, 231, 231);
}

.PetCalc > a > div {
    margin: 10px 2px 10px 2px;
}

.PetCalc > a {
    text-decoration-line: none;
    font-family: 'Ownglyph_meetme-Rg';
    color: rgb(0, 0, 0);
}

.PetCalc > a > * {
  position: relative;
  font-size: 27px;
  top: 105px
}

.DiaryList2 {
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto; 
  margin-top: 50px;
  margin-bottom: 30px;
}
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

.DiaryList2 .row {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
}

.DiaryList2 .row .col-md-4 {
  position: relative;
  /* width: 100%; */
  padding-right: 15px;
  padding-left: 15px; }

#DiaryImg {
  display: -webkit-box !important;
  display: -ms-flexbox !important;
  display: flex !important;
  -webkit-box-align: end !important;
  -ms-flex-align: end !important;
  align-items: flex-end !important; 
}

.work .px-4 {
  padding-left: 1.5rem !important; }
  
.work {
  display: block;
  width: 100%;
  height: 270px;
  margin-bottom: 0;
  background-position: top center !important;
  z-index: 0;
  position: relative;
  overflow: hidden;
  border-radius: 4px; }

.work:after {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  content: '';
  background: #fff;
  opacity: 0;
  z-index: 0;
  -moz-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  -webkit-transition: all 0.3s ease;
  -ms-transition: all 0.3s ease;
  transition: all 0.3s ease; }
          
.work .text {
  opacity: 0; }
            
@media (max-width: 991.98px) {          
.work .text {
  opacity: 1; } }
            
.work .text span {
  color: rgb(255, 255, 255); 
  font-family: 'Ownglyph_meetme-Rg';

}

.work h2 {
  color: #fff;
  line-height: 1.2;
  font-size: 16px;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 1px; }
            
.work h2 a {
  color: #fff; }

.work .desc {
  z-index: 1; }
          
.work .icon {
  position: absolute;
  top: 50%;
  right: 50%;
  width: 70px;
  height: 70px;
  content: '';
  z-index: 1;
  background: #00bd56;
  -webkit-transform: translate(50%, 50%);
  -ms-transform: translate(50%, 50%);
  transform: translate(50%, 50%);
  margin-top: -70px;
  opacity: 0;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  -ms-border-radius: 50%;
  border-radius: 50%;
  -moz-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  -webkit-transition: all 0.3s ease;
  -ms-transition: all 0.3s ease;
  transition: all 0.3s ease; }

@media (max-width: 991.98px) {
.work .icon {
  opacity: 1; } }

.work .icon span {
  color: #fff; }

.work:hover:after {
  opacity: .3; }
  
.work:hover .icon {            
  opacity: 1; }
          
.work:hover .text {            
  opacity: 1; }

.img {
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center; 
}

#mybtn {
  color: #000;
  font-size: 18px;
  background-color: aliceblue;
  font-family: 'Ownglyph_meetme-Rg';
  border-color: #ececec;
}

#mybtn:hover {
  background-color: rgb(198, 228, 255);
  border-color: #ececec;
}

#addDiary > img {
  width: 95%;
  height: auto;
  border: 2px solid #ececec;
  border-radius: 20px;
  display: block;
  margin: 0 auto;
}

</style>
