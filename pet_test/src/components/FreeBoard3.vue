<template>
  <header class="banner">
      <h1 class="banner-title">반려동물의 실시간 인기 사진첩</h1>
  </header>
  <section class="ftco-section bg-light">
    <div class="freeboard">
      <div class="row1 d-flex">
        <div v-for="(post, index) in posts" :key="index" class="col-md-4 d-flex">
          <div class="content-entry align-self-stretch">
            <a @click="openModal(post)" class="block-20 rounded" :style="{backgroundImage:'url(' +  require('@/assets/images/' + post.image) + ')'}"></a>
            <div class="text p-4">
              <div class="meta mb-2">
                <div><a :href="post.date.url">{{ post.date }}</a></div>
                <div><a :href="post.author.url">{{ post.author }}</a></div>
                <div class="meta-chat">
                  <span class="fa fa-comment"></span> {{ post.comments }}
                  <span class="fa fa-heart" style="margin-left: 5px;"></span> {{ post.likes }}
                </div>
              </div>
              <h3 class="heading"><a :href="post.url">{{ post.title }}</a></h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <header>
      <img src="../assets/images/banner.png" alt="Banner" class="banner-image">  
      <h2>반려동물과의 일상을 사진과 함께 사람들과 공유하세요</h2>
  </header>
  <div class="search-bar" style="display: flex; align-items: center;">
  <div class="search-bar1">
    <select class="search-select1" v-model="type1">
      <option value="Latest">최신순</option>
      <option value="Oldest">오래된순</option>
    </select>
  </div>
  <div style="flex-grow: 0.08;"> <!-- search-bar1과 나머지 요소를 구분하기 위한 빈 div -->
    <select class="search-select" v-model="type">
      <option value="writer">작성자</option>
      <option value="content">내용</option>
      <option value="tag">태그</option>
    </select>
  </div>
  <form @submit.prevent="searching">
    <input type="search" class="search-input"  placeholder="검색어를 입력할거냥" v-model="search">
    <input type="submit" class="search-button" value="검색">
  </form>
</div>
  <section class="ftco-section1 bg-light">
    <div class="freeboard2">
      <div class="row2">
        <div class="col-md-4 addpost-item" v-for="(addpost, index) in addposts" :key="index">
      <div class="content-entry align-self-stretch">
        <a @click="openModal(addpost)" class="block-20 rounded" :style="{backgroundImage:'url(' +  require('@/assets/images/' + 'gallery-6.jpg') + ')'}"></a>
        <div class="text p-4">
          <div class="meta">
            <div class="createdAt"><a href="addpost.date.url">{{ addpost.createdAt }}</a></div>
            <div class="wirter"><a href="addpost.author.url">{{ addpost.writer }}</a></div>
            <div class="meta-chat">
              <span class="fa fa-comment"></span> {{ addpost.commentCount }}
              <span class="fa fa-heart" style="margin-left: 5px;"></span> {{ addpost.likeCount }}
            </div>
          </div>
          <h3 class="heading"><a :href="addpost.url">{{ addpost.title }}</a></h3>
        </div>
      </div>
    </div>
  </div>
</div>
</section>
<button v-if="isLogin" class="btn btn-success mt-3 custom-button" @click="goToWrite">글쓰기</button>

        <!-- <div class="pagination">
            <button class="page-link">«</button>
            <button class="page-link" v-for="n in maxpage" :key="n" @click="currentSwap(n)">{{ n }}</button>
            <button class="page-link">»</button>
        </div>
 -->

<div class="row mt-5">
        <div class="col text-center">
          <div class="block-27">
            <ul>
              <li><a href="#" @click="currentSwap(this.currentpage-1)">&lt;</a></li>
              <li><a href="#"  v-for="n in maxPage" :key="n" @click="currentSwap(n)" style="margin: 5px;">{{ n }}</a></li>
              <li><a href="#" @click="currentSwap(this.currentpage+1)">&gt;</a></li>
            </ul>
          </div>
        </div>
      </div>
      <detailFreeBoard v-if="showModal" :selectedCard="selectedCard" @closeModal="showModal = false" @deleteBoard="realDelete"/>
 
</template>

<script>
import detailFreeBoard from './detailFreeBoard.vue';

export default {
  emis: ['forceRerender'],
  computed:{
        isLogin() {
            return this.$cookies.isKey('id') ? true : false;
        }
    },
  components : {
		detailFreeBoard
	},
  props: {
    showModal: Boolean,
    selectedCard: Object
  },
  data() {
    return {
      showModal: false, // 모달창 열림 여부
      selectedCard: {}, // 선택된 카드 정보,
      posts: [
      { id: 1, title: '댕댕이랑 냥냥이랑 산책하는 날', image: 'image_5.jpg', date: 'february 07, 2024', author: '냥냥이', comments: 135, likes: 100, liked: false },
      { id: 2, title: '댕댕이랑 냥냥이랑 산책하는 날', image: 'image_4.jpg', date: 'february 14, 2024', author: '댕댕이', comments: 177, likes: 200, liked: false },
      { id: 3, title: '댕댕이랑 냥냥이랑 산책하는 날', image: 'image_6.jpg', date: 'february 25, 2024', author: '댕댕이레코즈', comments: 120, likes: 150, liked: false },
      // Add other posts here 상단 인기 게시글
    ],
    addposts: [
      // { id: 1, title: '댕댕이랑 냥냥이랑 산책하는 날', image: 'gallery-3.jpg', date: 'february 07, 2024', author: '냥냥이', comments: 135, likes: 100, liked: false },
      // { id: 2, title: '댕댕이랑 냥냥이랑 산책하는 날', image: 'gallery-4.jpg', date: 'february 14, 2024', author: '댕댕이', comments: 177, likes: 200, liked: false },
      // { id: 3, title: '댕댕이랑 냥냥이랑 산책하는 날', image: 'gallery-5.jpg', date: 'february 25, 2024', author: '댕댕이레코즈', comments: 120, likes: 150, liked: false },
      // { id: 3, title: '댕댕이랑 냥냥이랑 산책하는 날', image: 'gallery-6.jpg', date: 'february 25, 2024', author: '댕댕이레코즈', comments: 120, likes: 150, liked: false },
      // { id: 1, title: '댕댕이랑 냥냥이랑 산책하는 날', image: 'gallery-3.jpg', date: 'february 07, 2024', author: '냥냥이', comments: 135, likes: 100, liked: false },
      // { id: 2, title: '댕댕이랑 냥냥이랑 산책하는 날', image: 'gallery-4.jpg', date: 'february 14, 2024', author: '댕댕이', comments: 177, likes: 200, liked: false },
      // { id: 3, title: '댕댕이랑 냥냥이랑 산책하는 날', image: 'gallery-5.jpg', date: 'february 25, 2024', author: '댕댕이레코즈', comments: 120, likes: 150, liked: false },
      // { id: 3, title: '댕댕이랑 냥냥이랑 산책하는 날', image: 'gallery-6.jpg', date: 'february 25, 2024', author: '댕댕이레코즈', comments: 120, likes: 150, liked: false },
  ],
    maxPage : 1,
    currentpage : 1,
    search : "",
    type : "writer",
    type1 : "Latest"
  }
  },
  methods: {
      goToWrite() {
        this.$router.push(`/addphoto`); 
      }, 
      currentSwap(n) {
            this.currentpage = n;
            if(this.currentpage == 0)
              this.currentpage = 1;
            if(this.currentpage > this.maxPage)
              this.currentpage = this.maxPage;
            this.getBoard();
      },
      getBoard() {
            this.addposts = [];
            this.axios.get(`/api/free/${this.currentpage}`).then((res) => {
                this.addposts = res.data;
            }).catch();
      },
      openModal(post) {
            this.selectedCard = post;
            this.showModal = true;
      },
      closeModal() {
      this.$emit('closeModal');
    },
      searching() {
        this.addposts = [];
        this.axios.get(`/api/free/search/${this.currentpage}`, {
          params: { 
            search: this.search,
            type: this.type
          }
        }).then((res) => {
          console.log(res.data);
          this.addposts = res.data;
          this.maxPage= Math.ceil(this.addposts[0].totalRowCount/8);
          if(this.maxPage == 0)
            this.maxPage = 1;
        }).catch((error) => {
          console.error(error);
        });
        this.search = "";
      },
      openModal(post) {
            this.selectedCard = post;
            this.showModal = true;
      },
        closeModal() {
        this.$emit('closeModal');
      },
      realDelete(id){

        this.showModal = false;
        this.axios.delete(`/api/free/${id}`)
        .then(() => {
          console.log('게시글이 성공적으로 삭제되었습니다.');
          this.$cookies.remove('boardId');
          this.$router.push(`/freeboard3`);
        })
        .catch(error => {
          console.error('게시글 삭제 중 오류가 발생했습니다.', error);
        });

      }
  },
  async mounted(){
    await this.axios.get(`/api/free/${this.currentpage}`).then((res) => {
            this.addposts = res.data;
            this.maxPage = Math.ceil(this.addposts[0].totalRowCount/8) ;
        }).catch((error) => {
            console.error('Error fetching data:', error);
        });
      },
  }

</script>

<style scoped>



@font-face {
font-family: 'Ownglyph_meetme-Rg';
src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2402_1@1.0/Ownglyph_meetme-Rg.woff2') format('woff2');
font-weight: normal;
font-style: normal;
}



.banner {
margin-top: 120px;
text-align: center;
}

.banner-title {
font-family: 'Ownglyph_meetme-Rg';
font-size: 2.3rem;
}

.banner-subtitle {
font-family: 'Ownglyph_meetme-Rg';
font-size: 1.3rem;
color: #777;
}
.banner-image {
  margin-top: 50px;
      width: 50%;
  }
  
.freeboard {
display: flex;
justify-content: center; /* 가운데 정렬합니다 */
max-width: 1200px;
/* 원하는 너비로 조정 */
margin: 0 auto;
/* 가운데 정렬 */
background-color: white;
}

.freeboard2 {
    display: grid;
    grid-template-columns: repeat(4, 1fr); /* 한 줄에 4개의 열을 생성 */
    gap: 20px; /* 아이템 사이의 간격 */
    justify-items: start; /* 아이템을 왼쪽 정렬 */
    max-width: 1450px;
    margin: 0 auto; /* 페이지 중앙 정렬 */
    background-color: white;
}
.col-md-4 {
  margin-top: 20px;
  margin-right: 25x;
  margin-left: 25px;
}

.search-bar {
  display: flex;
  align-items: center;
  width: 1000px; /* 원하는 너비로 조정하세요 */
  margin: 0 auto; /* 가운데 정렬 */
    border: 3px solid #4ea3ff; /* 테두리 추가 */
  border-radius: 50px; /* 테두리의 모양을 더 둥글게 만들기 위해 추가 */
  padding: 5px; /* 내부 여백 추가 */

}

.search-bar1 {
  margin-right: 5px;
}

.search-select1 {
  font-family: 'Ownglyph_meetme-Rg';
  color: #222222;
  border-radius: 50px;
  width: 130px;
  border: none;
  border: 2px solid #4ea3ff; /* 테두리의 스타일과 색상을 지정합니다 */
  background: #fcfdff; 
  padding: 10px;
  font-size: 20px;
  text-align: center;
  outline: none;
}
.search-select {
  font-family: 'Ownglyph_meetme-Rg';
  color: #222222;
  border-radius: 50px; /* 테두리의 둥근 정도를 조절합니다 */
  width: 130px;
  border: 2px solid #4ea3ff; /* 테두리의 스타일과 색상을 지정합니다 */
  background: #fcfdff;
  padding: 10px;
  font-size: 20px;
  text-align: center;
  outline: none;
}


.search-input {
  font-family: 'Ownglyph_meetme-Rg';
  width: 610px;
  border: none;
  background: none;
  padding: 5px;
  font-size: 20px;
  border-radius: 60px;
  text-align: center;
  outline: none;
}

.search-select option {
color: #222222;
background-color: #fcfdff;
padding: 5px;
border-radius: 60px;
font-size: 20px;
}

.search-select option:hover {
background-color: #4ea3ff;
color: #ffffff;
}
.search-button {
  font-family: 'Ownglyph_meetme-Rg';
  color: #ffffff;
  border: none;
  background-color: #8d8d8d;
  font-size: 20px;
  border-radius: 80px;
  cursor: pointer;
  outline: none;
}
.search-button:hover {
background-color: #4ea3ff;
}
h1, h2, h3, h4, h5, h6 {
  font-family: 'Ownglyph_meetme-Rg';
margin-top: 0;
margin-bottom: 0.5rem; 
line-height: 1.5;
color: rgba(0, 0, 0, 0.8);
font-weight: 400;}


a {
color: #007bff;
text-decoration: none;
background-color: transparent; }
a:hover {
  color: #0056b3;
  text-decoration: underline; }

  .rounded {
border-radius: 0.25rem !important; }

a {
-webkit-transition: .3s all ease;
-o-transition: .3s all ease;
transition: .3s all ease;
color:  #007bff; }
a:hover, a:focus {
  text-decoration: none;
  color:  #007bff;
  outline: none !important; }

  /* .bg-light {
background: #f8f9fd !important; } */

.bg-secondary {
background: #207dff !important; }

.bg-primary {
background:  #007bff !important; }

.p-4 {
padding: 1.5rem !important; }

a.text-dark:hover, a.text-dark:focus {
color: #121416 !important; }

.freeboard {
font-family: "Montserrat", Arial, sans-serif;
background: #fff;
font-size: 15px;
line-height: 1.8;
font-weight: 400;
color: gray; }
.freeboard.menu-show {
  overflow: hidden;
  position: fixed;
  height: 100%;
  width: 100%; }

.row1 {
display: -webkit-box;
display: -ms-flexbox;
display: flex;
-ms-flex-wrap: wrap;
flex-wrap: wrap;
margin-right: -15px;
margin-left: -15px; }




/*이미지 css부분*/
.block-20 {
    overflow: hidden;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    height: 250px;
    position: relative;
    display: block;
}

.block-20 img {
height: 250px;
}


.row2 {
    display: grid;
    grid-template-columns: repeat(4, 1fr); /* 한 줄에 4개의 열을 생성 */
    gap: 20px; /* 열 사이의 간격 설정 */
    margin: 0 auto;
    max-width: 1450px;
    background-color: white;
}


/* 컨텐츠 부분*/
.content-entry {
background: #fff;
-webkit-box-shadow: 0px 10px 18px -8px rgba(0, 0, 0, 0.1);
-moz-box-shadow: 0px 10px 18px -8px rgba(0, 0, 0, 0.1);
box-shadow: 0px 10px 18px -8px rgba(0, 0, 0, 0.1); }

.content-entry .text {
  position: relative;
  border-top: 0;
  border-radius: 2px; }
  .content-entry .text .tag {
    color: #b3b3b3; }
    .content-entry .text .heading {
    font-size: 18px;
    margin-bottom: 16px;
    font-weight: 400; 
    cursor: pointer;}
    .content-entry .text .heading a {
      color: #000000; }
      .content-entry .text .heading a:hover, .blog-entry .text .heading a:focus, .blog-entry .text .heading a:active {
        color:  #007bff; }
        .content-entry .text .meta-chat {
    color:  #007bff; }
    .content-entry .text .read {
    color: #000000;
    font-size: 14px; }
    .content-entry .meta > div {
  display: inline-block;
  margin-right: 5px;
  margin-bottom: 5px;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px; }
  .content-entry .meta > div a {
    color: #999999;
    font-weight: 500; }
    .content-entry .meta > div a:hover {
      color: #333333; }
      .content-entry .btn-custom {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 500;
  color:  #007bff; }

  .content-entry .meta .createdAt {
    width: 100%;
  }

  form {
    margin-bottom: 0px;
  }
  

  .addpost-item {
margin: 20px; /* 원하는 간격으로 조정 */
width: 300px; 
}

/*페이지네이션 부분*/
.mt-5 {
  display: flex;
justify-content: center;
}

.block-27 {
margin-top: 50px; /* 페이지네이션과의 간격 조정 */
justify-items: center; /* 페이지네이션 가운데 정렬 */
}

.block-27 ul {
padding: 0;
margin: 0;
display: inline-block;
}

.block-27 ul li {
display: inline-block;
margin-bottom: 4px;
font-weight: 400;
margin-right: 5px; /* 페이지네이션 간격 조정 */
}

.block-27 ul li a,
.block-27 ul li span {
color: gray;
text-align: center;
display: inline-block;
width: 40px;
height: 40px;
line-height: 40px;
border-radius: 50%;
border: 2px solid #e6e6e6;
}

.block-27 ul li.active a,
.block-27 ul li.active span {
background: #007bff;
color: #fff;
border: 1px solid transparent;
}
.custom-button {
  font-family: 'Ownglyph_meetme-Rg';
  margin-top: -300px;
  margin-left: 1260px;
  /* 왼쪽 여백을 auto로 설정하여 오른쪽으로 정렬 */
  padding: 10px 20px;
  font-size: 16px;
  background-color: #8d8d8d;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

/* 모달창 */
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
	  margin: 0;
	  padding: 0;
    background: rgba(0, 0, 0, 0.5);
}
.modal.show {
  display: block;
}
.preview {
	position: fixed;
	margin: 0.5rem auto; 
	margin-top: 100px;
	pointer-events: none;
}
.preview {
	position: relative;
	display: flex;
	flex-direction: column;
	pointer-events: auto;
	background-color: #fff;
	background-clip: padding-box;
	border: 1px solid rgba(0, 0, 0, 0.2);
	border-radius: 0.3rem;
	outline: 0;
}
.preview {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-bottom: 1px solid #dee2e6;
  background-color: #f7f7f7;
}

.modal {
  display: flex;
  justify-content: center;
}

.btn-close {
  background-color: transparent;
  border: none;
  border-radius: 100%;
  padding: 0;
  cursor: pointer;
  width: 15px;
  height: 15px;
  transition: background-color 0.3s ease;
  position: absolute; /* preview를 기준으로 절대 위치 지정 */
  top: 10px; /* preview 상단에서의 위치 */
  right: 10px; /* preview 우측에서의 위치 */
}


.btn-close:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

@media (max-width: 1200px) {
  .addpost-item {
    width: 33.33%; /* 세 개의 요소가 한 줄에 배치될 수 있도록 너비 조정 */
  }
}

@media (max-width: 768px) {
  .addpost-item {
    width: 50%; /* 두 개의 요소가 한 줄에 배치될 수 있도록 너비 조정 */
  }
}

@media (max-width: 576px) {
  .addpost-item {
    width: 100%; /* 한 개의 요소만 한 줄에 배치될 수 있도록 너비 조정 */
  }
}


.btn-close {
  background-color: transparent;
  border: none;
  border-radius: 100%;
  padding: 0;
  cursor: pointer;
  width: 15px;
  height: 15px;
  transition: background-color 0.3s ease;
  align-self: flex-end;
}
.btn-close:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
/* .modal-header {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-bottom: 1px solid #dee2e6;
  background-color: #f7f7f7;
} */
/* .modal-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: bold;
}
.modal-body {
  position: relative;
  flex: 1 1 auto;
  padding: 1rem;
}
.modal-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0.75rem;
  border-top: 1px solid #dee2e6;
  background-color: #f7f7f7;
} */


</style>


