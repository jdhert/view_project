<template>
  <div>
    <header class="banner">
      <h1 class="banner-title">G A L L E R Y</h1>
      <img src="../assets/images/banner.jpg" alt="Banner" class="banner-image">
      <br>
    </header>
    <section class="card-list bg-light">
      <div class="container_">
        <div class="row d-flex">
          <div class="col-md-3 d-flex" v-for="(post, index) in paginatedPosts" :key="index">
            <div class="blog-entry align-self-stretch">
              <router-link :to="'/photo/' + post.id" class="block-20 rounded"
                :style="{ backgroundImage: 'url(' + require('@/assets/images/' + post.image) + ')' }"></router-link>
              <div class="text p-4">
                <div class="meta mb-2">
                  <div><a href="#">{{ post.date }}</a></div>
                  <div><a href="#">{{ post.author }}</a></div>
                  <div>
                    <a href="#" class="meta-chat"><span class="fa fa-comment"></span> {{ post.comments }}</a>
                    <span class="like-count">
                      <i class="fa fa-heart" :class="{ 'fa-heart-o': !post.liked, 'fa-heart liked': post.liked }"
                        @click="toggleLike(post)"></i> {{ post.likes }}
                    </span>
                  </div>
                </div>
                <h3 class="heading"><router-link :to="'/blog/' + post.id">{{ post.title }}</router-link></h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <header class="banner_2">
      <h1 class="banner-title">집사의 사진기록</h1>
      <h3 class="banner-subtitle">반려동물과의 일상을 사진과 함께 공유해보세요</h3>
    </header>
    <div class="search-bar">
      <select class="search-select">
        <option>작성자</option>
        <option>작성일</option>
        <option>내용</option>
        <option>태그</option>
        <!-- Add more options here -->
      </select>
      <br>
      <input type="search" class="search-input" placeholder="검색어를 입력할거냥">
      <button class="search-button">검색</button>
    </div>
    <section class="additional-posts bg-light">
      <div class="container">
        <div class="row d-flex">
          <div class="col-md-3 d-flex" v-for="(post, index) in additionalPosts" :key="'additional_' + index">
            <div class="blog-entry align-self-stretch">
              <router-link :to="'/photo/' + post.id" class="block-20 rounded"
                :style="{ backgroundImage: 'url(' + require('@/assets/images/' + post.image) + ')' }"></router-link>
              <div class="text p-4">
                <div class="meta mb-2">
                  <div><a href="#">{{ post.date }}</a></div>
                  <div><a href="#">{{ post.author }}</a></div>
                  <div>
                    <a href="#" class="meta-chat"><span class="fa fa-comment"></span> {{ post.comments }}</a>
                    <span class="like-count">
                      <i class="fa fa-heart" :class="{ 'fa-heart-o': !post.liked, 'fa-heart liked': post.liked }"
                        @click="toggleLike(post)"></i> {{ post.likes }}
                    </span>
                  </div>
                </div>
                <h3 class="heading"><router-link :to="'/blog/' + post.id">{{ post.title }}</router-link></h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <button class="btn btn-success mt-3 custom-button" @click="goToWrite">글쓰기</button>
    <div class="row mt-5">
          <div class="col text-center">
            <div class="block-27">
              <ul>
                <li><a href="#">&lt;</a></li>
                <li class="active"><span>1</span></li>
                <li><a href="#">2</a></li>
                <li><a href="#">3</a></li>
                <li><a href="#">4</a></li>
                <li><a href="#">5</a></li>
                <li><a href="#">&gt;</a></li>
              </ul>
            </div>
          </div>
        </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: [
        { id: 1, title: '댕댕이랑 냥냥이랑 산책하는 날', image: 'image_4.jpg', date: 'february 07, 2024', author: '냥냥이', comments: 35, likes: 10, liked: false },
        { id: 2, title: '댕댕이랑 냥냥이랑 산책하는 날', image: 'image_1.jpg', date: 'february 14, 2024', author: '댕댕이', comments: 77, likes: 20, liked: false },
        { id: 3, title: '댕댕이랑 냥냥이랑 산책하는 날', image: 'image_3.jpg', date: 'february 25, 2024', author: '댕댕이레코즈', comments: 120, likes: 15, liked: false },
        // Add other posts here 상단 인기 게시글
      ],
      additionalPosts: [
        { id: 4, title: '댕댕이랑 냥냥이랑 산책하는 날', image: 'gallery-3.jpg', date: 'february 07, 2024', author: '냥냥이레코드', comments: 35, likes: 10, liked: false },
        { id: 5, title: '댕댕이랑 냥냥이랑 산책하는 날', image: 'gallery-4.jpg', date: 'february 14, 2024', author: '냥펀치', comments: 77, likes: 20, liked: false },
        { id: 6, title: '댕댕이랑 냥냥이랑 산책하는 날', image: 'gallery-5.jpg', date: 'february 25, 2024', author: '코기친구웰시', comments: 120, likes: 15, liked: false },
        { id: 7, title: '댕댕이랑 냥냥이랑 산책하는 날', image: 'gallery-6.jpg', date: 'february 07, 2024', author: '냥냥이레코드', comments: 35, likes: 10, liked: false },
        { id: 4, title: '댕댕이랑 냥냥이랑 산책하는 날', image: 'gallery-3.jpg', date: 'february 07, 2024', author: '냥냥이레코드', comments: 35, likes: 10, liked: false },
        { id: 5, title: '댕댕이랑 냥냥이랑 산책하는 날', image: 'gallery-4.jpg', date: 'february 14, 2024', author: '냥펀치', comments: 77, likes: 20, liked: false },
        { id: 6, title: '댕댕이랑 냥냥이랑 산책하는 날', image: 'gallery-5.jpg', date: 'february 25, 2024', author: '코기친구웰시', comments: 120, likes: 15, liked: false },
        { id: 7, title: '댕댕이랑 냥냥이랑 산책하는 날', image: 'gallery-6.jpg', date: 'february 07, 2024', author: '냥냥이레코드', comments: 35, likes: 10, liked: false },

        // 추가로 보여질 게시물
      ],
    };
  },
  computed: {
    paginatedPosts() {
      return this.posts;
    }
  },
  methods: {
    toggleLike(post) {
      post.liked = !post.liked;
      if (post.liked) {
        post.likes++;
      } else {
        post.likes--;
      }
    }
  }
};
</script>

<style scoped>
:root {
  --blue: #007bff;
  --green: #28a745;
  --teal: #20c997;
  --gray: #6c757d;
  --gray-dark: #343a40;
  --primary: #007bff;
  --secondary: #6c757d;
  --info: #17a2b8;
  --font-family-sans-serif: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  --font-family-monospace: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}

@font-face {
  font-family: 'Ownglyph_meetme-Rg';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2402_1@1.0/Ownglyph_meetme-Rg.woff2') format('woff2');
  font-weight: normal;
  font-style: normal;
}

* {
  font-family: 'Ownglyph_meetme-Rg';
}

.row > * {
  padding-left: 0em !important;
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
        width: 65%;
    }
.banner_2 {
  margin-top: 50px;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin-top: 0;
  margin-bottom: 0.5rem;
}

.card-list {
  margin-top: 50px;
  max-width: 1200px;
  /* 원하는 너비로 조정 */
  margin: 0 auto;
  /* 가운데 정렬 */
}

a {
  color: #007bff;
  font-family: 'Ownglyph_meetme-Rg';
  text-decoration: none;
  background-color: transparent;
}

a:hover {
  color: #0056b3;
  text-decoration: underline;
}

a:not([href]):not([tabindex]) {
  color: inherit;
  text-decoration: none;
}

a:not([href]):not([tabindex]):hover,
a:not([href]):not([tabindex]):focus {
  color: inherit;
  text-decoration: none;
}

a:not([href]):not([tabindex]):focus {
  outline: 0;
}


.container-fluid {
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}

.row {
  justify-content: center;
  gap: 3%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
  padding-top: 20px;
  padding-bottom: 20px;
}

.no-gutters {
  margin-right: 0;
  margin-left: 0;
}

.no-gutters>.col,
.no-gutters>[class*="col-"] {
  padding-right: 0;
  padding-left: 0;
}

.rounded {
  border-radius: 0.25rem !important;
}

.p-4 {
  padding: 1.5rem !important;
}

a.text-dark:hover,
a.text-dark:focus {
  color: #121416 !important;
}

body {
  font-family: 'Ownglyph_meetme-Rg';
  background: #fff;
  font-size: 15px;
  line-height: 1.8;
  font-weight: 400;
  color: gray;
}

body.menu-show {
  overflow: hidden;
  position: fixed;
  height: 100%;
  width: 100%;
}

a {
  -webkit-transition: .3s all ease;
  -o-transition: .3s all ease;
  transition: .3s all ease;
  color: #0056b3;
}

a:hover,
a:focus {
  text-decoration: none;
  color: #0056b3;
  outline: none !important;
}

h1,
h2,
h3,
h4,
h5,
.h1,
.h2,
.h3,
.h4,
.h5 {
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.8);
  font-weight: 400;
}

.bg-light {
  background: #f8f9fd !important;
}

.bg-secondary {
  background: #207dff !important;
}

.bg-primary {
  background: #00bd56 !important;
}

/* .col-md-3 {
  margin-top: 50px;
} */

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

/*컨텐츠 부분*/
.blog-entry {
  background: #fff;
  -webkit-box-shadow: 0px 10px 18px -8px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0px 10px 18px -8px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 10px 18px -8px rgba(0, 0, 0, 0.1);
}

.blog-entry .text {
  position: relative;
  border-top: 0;
  border-radius: 2px;
}

.blog-entry .text .tag {
  color: #b3b3b3;
}

.blog-entry .text .heading {
  font-size: 18px;
  margin-bottom: 16px;
  font-weight: 400;
}

.blog-entry .text .heading a {
  color: #000000;
}

.blog-entry .text .heading a:hover,
.blog-entry .text .heading a:focus,
.blog-entry .text .heading a:active {
  color: #007bff;
}

.blog-entry .text .meta-chat {
  color: #007bff;
}

.blog-entry .text .read {
  color: #000000;
  font-size: 14px;
}

.blog-entry .meta>div {
  display: inline-block;
  margin-right: 5px;
  margin-bottom: 5px;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.blog-entry .meta>div a {
  color: #999999;
  font-weight: 500;
}

.blog-entry .meta>div a:hover {
  color: #333333;
}

.blog-entry .btn-custom {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 500;
  color: #007bff;
}

/*페이지네이션 부분*/
.mt-5 {
  justify-content: center;
}

.mt-5 > div {
  padding-left: 0em;
} 
.block-27 {
  margin-top: 50px; /* 페이지네이션과의 간격 조정 */
  text-align: center; /* 페이지네이션 가운데 정렬 */
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

.search-bar {
    margin-top: 100px;
    /* 변경 */
    display: flex;
    justify-content: flex-end;
    /* 변경 */
    gap: 5px;
    margin: 8px 0 8px auto;
    /* 변경 */
    width: 100%;
    max-width: 440px;
    margin-left: 1120px;
}

.search-select,
.search-input {
    flex: 1;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.search-button {
    padding: 8px 20px;
    background-color: #8d8d8d;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.custom-button {
    margin-left: 1150px;
    margin-top: 20px;
    /* 왼쪽 여백을 auto로 설정하여 오른쪽으로 정렬 */
    padding: 10px 20px;
    font-size: 16px;
    background-color: #8d8d8d;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

</style>