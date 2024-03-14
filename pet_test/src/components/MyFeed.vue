<template>
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
	<body id="top">
		<section id="MyBanner">
			<div class="inner"></div>
		</section>
		<!-- Page Content-->
		<section class="py-5">
			<div class="container px-5 my-5" style="box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
				<div class="row gx-5">
					<div class="col-lg-3" id="MyDetail">
						<div class="d-flex align-items-center mt-lg-5 mb-4" id="mt-lg-5">
							<img class="img-fluid rounded-circle" :src="this.user.imgPath" alt="..." id="profil-img"/>
							<div class="Myprofil">
								<div class="" id="myname">
									<div class="fw-bold">{{this.user.name}}</div>
									<div class="text-muted d-flex align-items-center">{{this.user.email}}</div>
								</div>
								<div id="contentCount">
									<div class="text-muted" id="PageCount">게시물 수 : {{ this.user.boardCount }}</div><hr>
									<div class="text-muted" id="PageCount">댓글 수 : {{ this.user.commentCount }}</div><hr>
									<div class="text-muted" id="PageCount">기록일지 수 : {{  this.user.diaryCount }}</div><hr>
								</div>
							</div>
						</div>
					</div>
					
					<div class="col-lg-9" id="content">
					<!-- Post content-->
						<article>
								<!-- 2nd section-->
								<section>
									<div class="card board-container">
										<ul class="tabs">
											<li class="tab-link" :class="{ 'current': currentTab === tab.id }" v-for="tab in tabs" :key="tab.id" @click="changeTab(tab.id)" :data-tab="tab.id">{{ tab.content }}</li>
										</ul>
											<div class="board-header">
												<h4 class="header-title">제목</h4>
												<h4 class="header-name">좋아요</h4>
												<h4 class="header-date">조회 수</h4>
												<h4 class="header-date">날짜</h4>
											</div>
											<div class="board-content">
												<div class="board-item" v-for="post in posts" :key="post">
													<div class="item-header">
														<h5><a href="#">{{ post.title }}</a></h5>
														<div class="item-content">
															<p><a href="#">{{ post.petName }}</a></p>
														</div>
														<span>{{ post.createdAt }}</span>
													</div>
													<hr class="item-divider">
												</div>
											</div>
											<div class="pagination">
												<button class="page-link">«</button>
												<button class="page-link" v-for="n in maxpage" :key="n" @click="currentSwap(n)">{{ n }}</button>
												<button class="page-link">»</button>
											</div>
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

<script>
	export default {
	  data() {
		return {
		  posts: [ ],
		  user:{ },
		  maxpage : 5,
		  currentTab: 'tab-1',
      	  tabs: [
        	{ id: 'tab-1', content: '마이 피드' },
        	{ id: 'tab-2', content: '마이 Q&A' },
        	{ id: 'tab-3', content: '좋아요 한 글' },
			{ id: 'tab-4', content: '내 댓글' },
			{ id: 'tab-5', content: '내 기록일지' }
      		]
			, page : 1
		};
	  },
	  mounted() {
	    if (!this.$cookies.get("id")) {
	    	alert("로그인이 필요합니다.");
	    	this.$router.push('/login');
	    	return;
	    }
		this.axios.get(`/api/myinfo/${this.$cookies.get("id")}`).then((res) => {
			this.user = res.data;
		}).catch();
		this.axios.get(`/api/free/getMyBoard/${this.$cookies.get('id')}`,{
			params: { 
        		subject: 0,
        		page: this.page,
        }}).then((res) => {
				this.posts = res.data;
		}).catch();
	  },

	  methods: {
    	changeTab(tabId) {
      		this.currentTab = tabId;
			switch ( this.currentTab ) {
				case "tab-1":
					this.axios.get(`/api/free/getMyBoard/${this.$cookies.get('id')}`,{
						params: { 
        				    subject: 0,
        				    page: this.page,
        				}
					}).then((res) => {
						this.posts = res.data;
					}).catch();
					break; 
				case "tab-2":
				this.axios.get(`/api/free/getMyBoard/${this.$cookies.get('id')}`,{
						params: { 
        				    subject: 1,
        				    page: this.page,
        				}
					}).then((res) => {
						this.posts = res.data;
					}).catch();
					break; 
				case "tab-3":
					this.posts = [ 
						{ id: 8, title: '123산책 1일차', date: '2024-02-22', content: '두부김치1'}, 
						{ id: 8, title: '123산책 1일차', date: '2024-02-22', content: '두부김치2'}, 
						{ id: 8, title: '123산책 1일차', date: '2024-02-22', content: '두부김치3'}, 
						{ id: 8, title: '123산책 1일차', date: '2024-02-22', content: '두부김치4'}, 
					];
					break; 	
				case "tab-4":
				this.axios.get(`/api/comment/mycomment/${this.$cookies.get('id')}`
					).then((res) => {
						this.posts = res.data;
					}).catch();
					break; 	
				case "tab-5":
					this.axios.get(`/api/myinfo/diary/${this.$cookies.get('id')}`).then((res) =>{
						this.posts = res.data;
					}).catch();
					break; 	
			}
    	},
		filteredPosts(tabId) {
      		return this.posts.filter(post => {
        		return post.tab === tabId;
      		});
    	},
  		}
  	}
</script>

	
<style scoped>
	@import '../assets/css/skel.css';
	@import '../assets/css/style.css';
	@import '../assets/css/style-xlarge.css';
/* Font */

@import url('https://fonts.googleapis.com/css2?family=Black+Han+Sans&display=swap');

@font-face {
    font-family: 'KBO-Dia-Gothic_bold';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-2@1.0/KBO-Dia-Gothic_bold.woff') format('woff');
    font-weight: 700;
    font-style: normal;
}

@font-face {
    font-family: 'SUITE-Regular';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-2@1.0/SUITE-Regular.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
}

@font-face {
    font-family: 'Ownglyph_meetme-Rg';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2402_1@1.0/Ownglyph_meetme-Rg.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}

/* MyBanner */

#MyBanner {
    background-image: url(../assets/images/MyPage.jpg);
    background-size: cover;
    background-position: center ;
    background-repeat: no-repeat;
    color: #d8d8d8;
    padding: 14em 0;
    margin-top: 90px;
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

.gx-5 {
    flex-direction: column;
    align-items: center;
	position: relative;
	top: -100px;
}

.py-5 {
    background-color: #fafafa;
    margin-bottom: -330px;
}

.px-5 {
    position: relative;
    top: -330px;
    background-color: white;
    padding: 30px;
    border-radius: 5px;
    min-width: 950px;
	padding-bottom: 0; 
}

#content {
    width: 95%;
}

.myPetList {
    margin-bottom: 5rem;
}

#PostHeader {
    text-align: left;
    margin-top: 10px;
    /* margin-bottom: 0.5rem!important; */
}

.mb-1 {
    display: inline;
    font-family: 'KBO-Dia-Gothic_bold'; 
    letter-spacing: normal;
    margin-left: 15px;
    font-size: 35px;
    color: #1897f1;
}

.mb-2 {
    display: inline;
    margin-left: 10px;
    font-family: 'SUITE-Regular';
    font-weight: bold;
}


/* board */

   .board-container {
    background-color: #fff; /* White background */
    border: 1px solid #DEE2E6; /* Light grey border */
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    /* padding: 1rem; */
    margin: auto;
  }

  .board-header {
    font-family: 'Ownglyph_meetme-Rg';
    background-color: aliceblue;
    display: flex;
    justify-content: end;
    padding-top: 0.8rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #DEE2E6;
    gap: 50px;
  }

  .header-title {
    width: 50%;
  }

  .header-name {
    width: 12%;
  }

  .header-date {
    width: 22%;

  }
  .board-content {
    margin-bottom: 25px;
  }

  .board-item {
    background-color: white;
    padding: 0.5rem 0;
    margin-left: 1rem;
    margin-right: 1rem;
    border-bottom: 1px solid #DEE2E6; /* Light grey border for each item */
  }

  .item-header {
    font-family: 'Ownglyph_meetme-Rg';
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .item-header > * {
    margin: 0;
    font-size: 18px;
    color: #495057; /* Dark grey color for text */
  }

  .item-header img {
    margin-left: 5px;
    width: 22px;
  }

  .item-header h5 {
    width: 50%;
  }

  .item-header > .item-content {
    width: 20%;
  }

  .item-header > .item-content > p a {
    color: inherit;
    text-decoration: none;
  }

  .item-header span {
    width: 20%;
  }

  .item-details {
    text-align: right;
  }

  .item-author {
    font-size: 0.875rem;
    color: #6C757D; /* Light grey color for author */
  }

  .item-date {
    font-size: 0.875rem;
    color: #ADB5BD; /* Even lighter grey for date */
    margin-left: 0.5rem;
  }

  .item-content p {
    margin: 0;
    color: #495057; /* Match the title color */
  }
  
  .item-divider {
    display: none; /* Remove the hr as we're using border-bottom for each item */
  }

  /* Board_Pagination*/

.pagination {
    display: flex;
    justify-content: center;
    gap: 10px;
	margin-bottom: 20px;
}

.page-link {
    font-family: 'Ownglyph_meetme-Rg';
    border: none;
    background-color: transparent;
    color: #333;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
}

.page-link:hover {
    background-color: #f0f0f0;
}

/* sideBar */

#MyDetail {
    width: 90%;    
	background-color: white;
    border: 3px solid #f0f0f0;
    border-radius: 10px;
	margin-bottom: 2rem;
}

#mt-lg-5 {
    /* div 내에 중앙 정렬 */
    display : flex;
    justify-content: left;
    align-items : center;
    /* 여러 요소 세로 정렬 */
    flex-direction: row;
	margin-top: 0px !important;
	margin-bottom: 0px !important;
}

#profil-img {
	width: 150px;
	margin: 10px;
    /* border 테두리 지정 */
    border: 5px;
    border-style: solid;
    border-color: #BDE3FF;
}

.Myprofil {
    display: inline;
	margin-left: 50px;
}

#myname {
	display: flex;
    margin-bottom: 1rem !important;
}

#myname .fw-bold {
    font-family: 'Ownglyph_meetme-Rg';
    font-size: 28px;
	margin-right: 1rem;
}

#contentCount {
	display: flex;
    text-align: left;
    width: 300px;
}

#PageCount {
    color: #929292 !important;
    font-family: 'Ownglyph_meetme-Rg';
    font-size: 20px;
    border-bottom: 0rem !important;
	margin-right: 1em;
}

hr {
    margin-top: 0rem !important;
    /* size: 0.1px;
    background-color:#85ccff;
    height: 2px; */
}

/* tab */

ul.tabs {
    margin: 0;
    padding: 0;
    list-style: none;
	display: flex;
}

ul.tabs li {
	font-family: 'Ownglyph_meetme-Rg';
	font-size: 20px;
    background: none;
    color: #222;
	background-color: rgb(245, 250, 255);
    display: inline-block;
    border-bottom: 1px solid #DEE2E6;
	border-right: 1px solid #DEE2E6;
    padding: 10px 15px;
    cursor: pointer;
	flex-grow: 1;
}
  
ul.tabs li.current {
    background: aliceblue;
    color: #222;
	border-bottom: 0px solid aliceblue;
}
  
</style>
