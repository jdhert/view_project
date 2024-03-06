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
							<img class="img-fluid rounded-circle" :src="this.user.imgPath" alt="..." id="profil-img"/>
							<div class="" id="myname">
								<div class="fw-bold">{{this.user.name}}</div>
								<div class="text-muted">{{this.user.email}}</div>
							</div>
							<div id="myButten">
								<button type="button" class="btn btn-info" id="mybtn" onclick = "location.href = '/diary'"><div class="fw-bold">내 일지</div></button>
								<button type="button" class="btn btn-info" id="mybtn" onclick = "location.href = '/myfeed'"><div class="fw-bold">내 활동</div></button>
							</div>
							<div id="contentCount">
								<div class="text-muted" id="PageCount">게시물 수 : {{ this.user.boardCount }}</div><hr>
								<div class="text-muted" id="PageCount">댓글 수 : {{ this.user.commentCount }}</div><hr>
								<div class="text-muted" id="PageCount">기록일지 수 : {{  this.user.diaryCount }}</div><hr>
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
								<!-- 2nd section-->
								<section>
									<header class="mb-4" id="PostHeader">
										<h1 class="fw-bolder mb-1">내 활동</h1>
										<div class="text-muted fst-italic mb-2">내 활동 내역 페이지입니다</div>
										<hr>
									</header>
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
	
<style scoped>
	@import '../assets/css/skel.css';
	@import '../assets/css/style.css';
	@import '../assets/css/style-xlarge.css';
	@import '../assets/css/style-MyFeed.css';

	.pagination {
		margin-bottom: 10px;
	}
</style>
	
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
  		},
}
</script>