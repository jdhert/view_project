<template>
    <div class="container">
        <header class="banner">
            <h1 class="banner-title">반려동물 무엇이든 물어보라냥</h1>
            <h3 class="banner-subtitle">반려동물의 궁금증을 사람들과 공유해보세요</h3>
            <img src="../assets/images/img6.png" alt="Banner" class="banner-image">
            <br>
        </header>
        <div class="search-bar" style="display: flex; align-items: center;">
            <div class="search-bar1">
                <select class="search-select1" v-model="type1">
                    <option value="Latest">최신순</option>
                    <option value="Oldest">오래된순</option>
                </select>
            </div>
            <div style="flex-grow: 0.08;"> 
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
<!-- 
        <form @submit.prevent="searching">
        <div class="search-bar">
            <select class="search-select" v-model="type">
                <option value="writer">작성자</option>
                <option value="title">제목</option>
                <option value="content">내용</option>
                <option value="tag">태그</option>
            </select>
            <br>
            <input type="search" class="search-input" placeholder="검색어를 입력할거냥" v-model="search">
            <button class="search-button">검색</button>
        </div>
        </form> -->
        <div class="content">
            <div class="card-columns">
                <div class="card" v-for="(post, index) in posts" :key="post.id"
                    :style="{ width: getCardWidth(posts.length) }"  @click="openModal(post)">
                    <div class="card-header">
                        <span class="tag" :class="getTagClass(post.category)">{{ post.category }}</span>
                        <h2 class="card-title">{{ post.title }}</h2>
                    </div>
                    <div class="card-body">
                        <p>{{ truncateText(post.content, 90) }}</p>
                    </div>
                    <div class="card-footer">
                        <span class="date">{{ post.createdAt }}</span>
                        <span class="comments">{{ post.commentCount }} comments</span>
                    </div>
                </div>
            </div>
        </div>
        <QuestionBoardModal v-if="showQnaModal" :selectedPost="selectedPost" @closeModal="closeModal" :comments="comments" :images="images"/>

        <button v-if="isLogin" class="btn btn-success mt-3 custom-button" @click="goToWrite">글쓰기</button>

        <div class="pagination">
            <button class="page-link">«</button>
            <button class="page-link" v-for="n in maxpage" :key="n" @click="currentSwap(n)">{{ n }}</button>
            <button class="page-link">»</button>
        </div>
    </div>
</template>
  
<script>
import QuestionBoardModal from './QuestionBoardModal.vue';

export default {
    components : {
		QuestionBoardModal
	},
    computed:{
        isLogin() {
            return this.$cookies.isKey('id') ? true : false;
        }
    },
    data() {
        return {
            posts: [],
            currentpage: 1,
            maxpage: 1,
            showQnaModal: false,
            selectedPost: {},
            images: [
              { id: 1, src: require('../assets/images/image_2.jpg') },
              { id: 2, src: require('../assets/images/image_4.jpg') },
              { id: 3, src: require('../assets/images/image_3.jpg') }
            ],
            comments : [ {
                writer : "작성자1",
                content : "댓글내용"
            },
            {
                writer : "작성자2",
                content : "댓글내용"
            },
            {
                writer : "작성자2",
                content : "댓글내용"
            },
            {
                writer : "작성자1",
                content : "댓글내용"
            }
            ],
            search : "",
            type : "writer"
        };
    },
    mounted() {
        this.axios.get(`/api/qna/${this.currentpage}`).then((res) => {
            this.posts = res.data;
            if(this.posts[0].totalRowCount <= 4)
                this.maxpage = 1;
            else this.maxpage = Math.ceil((this.posts[0].totalRowCount - 4) / 7) + 1;
        }).catch();
    },
    methods: {
        currentSwap(n) {
            this.currentpage = n;
            this.getBoard();
        },
        getBoard() {
            this.posts = [];
            this.axios.get(`/api/qna/${this.currentpage}`).then((res) => {
                this.posts = res.data;
            }).catch();
        },
        getTagClass(tag) {
            switch (tag) {
                case '고양이':
                    return 'cat';
                case '강아지':
                    return 'dog';
                case '소동물':
                    return 'small-animal';
                default:
                    return 'other';
            }
        },
        getCardWidth(postCount) {
            if (postCount === 1) {
                return '25%'; // 화면 너비의 25%
            }
            else if (postCount === 2) {
                return '50%'; // 화면 너비의 50%
            }
            else if (postCount === 3) {
                return '75%'; // 화면 너비의 75%
            }
            else if (postCount >= 4) {
                return '100%'; // 화면 너비의 100%
            }
        },
        goToWrite() {
            this.$router.push(`/addqna`);
        },
        openModal(post) {
            this.selectedPost = post;
            this.showQnaModal = true;
        },
        closeModal() {
            this.showQnaModal = false;
        },
        truncateText(text, maxLength) {
            if (text.length > maxLength) {
                return text.slice(0, maxLength) + '...';
            } else {
                return text;
            }
        },
        searching() {
        this.posts = [];
        this.axios.get(`/api/qna/search/${this.currentpage}`, {
          params: { 
            search: this.search,
            type: this.type
          }
        }).then((res) => {
            this.posts = res.data;
            if(res.data == null) 
                this.maxpage = 1;
            else {
                this.maxpage= Math.ceil(this.posts[0].totalRowCount/8);
                if(this.maxpage == 0)
                    this.maxpage = 1;
            }
        }).catch((error) => {
            console.error(error);
        });
        this.search = "";
      },
    }
}

</script>
  
<style scoped>
@font-face {
    font-family: 'Ownglyph_meetme-Rg';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2402_1@1.0/Ownglyph_meetme-Rg.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}

* {
    font-family: 'Ownglyph_meetme-Rg';
}

.container {
    max-width: 1450px;
    margin-top: 120px;
    padding: 20px;
}

.banner {
    margin-top: 0px;
    text-align: center;
}

.banner-image {
    width: 60%;
    height: auto;
    margin-bottom: 20px;
}

.banner-title {
    font-family: 'Ownglyph_meetme-Rg';
    font-size: 2.3rem;
    margin-bottom: 10px;
}

.banner-subtitle {
    font-family: 'Ownglyph_meetme-Rg';
    font-size: 1.3rem;
    color: #777;
}


.content {
    margin-bottom: 30px;
}

.card-columns {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
}

.card {
    background-color: #fff;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    overflow: hidden;
}

.card-body {
    font-size: 1.rem;
}

.card-header {
    margin-top: 20px;
    padding: 20px;
    border-radius: 5px;
    background-color: #ececec;
    height: 120px;
}

.tag {
    display: inline-block;
    padding: 5px 10px;
    border-radius: 20px;
    color: #fff;
}


.cat {
    background-color: #f87495;
}

.dog {
    background-color: #61bffd;
}

.small-animal,
.other {
    background-color: #12af41;
}


.card-title {
    font-size: 1.2rem;
    margin: 10px 0;
}

.card-body {
    padding: 20px;
    height: 100px;
}

.card-footer {
    padding: 20px;
    background-color: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #777;
}

.custom-button {
    margin-left: 1280px;
    /* 왼쪽 여백을 auto로 설정하여 오른쪽으로 정렬 */
    padding: 10px 20px;
    background-color: #8d8d8d;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.pagination {
    display: flex;
    justify-content: center;
    gap: 10px;
}

.page-link {
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

form{
    margin: 0px;
}
@media (min-width: 768px) {
    .card-columns {
        column-count: 3;
        column-width: 80%;
    }
}


</style>