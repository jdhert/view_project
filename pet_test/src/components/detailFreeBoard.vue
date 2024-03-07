<template>
  <div class="modal">
    <div class="preview">
      <carousel :items-to-show="1">
        <slide v-for="slide in slides" :key="slide.id">
          <img :src="slide.src" :alt="slide.alt" class="dog-image" />
        </slide>
        <template #addons>
        <navigation />
       </template>
      </carousel>
      <div class="content">
        <div class="header">
        <div class="profile-info">
            <img class="profile-image" src="../assets/images/profil11.png" alt="Profile" />
            <h1 class="username">{{ this.selectedCard.writer }}</h1>
            <button type="button" class="btn-close" @click="$emit('closeModal')" aria-label="Close">
               <svg xmlns="http://www.w3.org/2000/svg">
               <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
               </svg>
            </button>
       </div>
          <div class="text-content">
            <div class="intro">
              <div class="scrollable-content" style="max-height: 130px; overflow-y: auto;">
                <p>{{ this.selectedCard.content }}</p>
              </div>
            </div>
            <div class="hashtags" style="display: flex; flex-wrap: wrap;">
              <a  v-for="tag of tags" style=" margin: 3px;" href="#" onclick="handleClick('{{this.selectedCard.tag}}')">{{ '#' +tag }}</a>
            </div>
              <div class="time-like">
                <div class="time-posted">{{ this.selectedCard.createdAt.slice(0,10) }}</div>
                    <div class="like" @click="handleLike">게시글 좋아요 {{ this.selectedCard.likeCount }} <i :class="['fas', 'fa-heart', { 'filled': liked }]"></i>
                    </div>
                </div>
              </div>
            </div>
            <div class="cm-interactions" style="max-height: 250px; overflow-y: auto;">
              <div v-if="comments.length === 0" class="no-comment">아직 댓글이 없습니다.</div>
              <div class="comments" v-for="comment in comments" :key="comment.id">
                <div class="comment">
                  <img class="comment-profile-image" src="../assets/images/profil11.png" alt="Profile" />
                  <div class="comment-content">
                    <div class="comment-row-1">
                      <div class="user">{{ comment.name }}</div>
                      <div class="time-commented">{{ comment.createdAt.slice(0,10) }}</div>
                      <div class="comment-interactions1">
                        <button class="btn-edit-comment" @click="editComment(comment.id)">
                          <i class="fas fa-edit"></i> 
                        </button>
                        <button class="btn-delete-comment" @click="deleteComment(comment.id)">
                          <i class="fas fa-trash-alt"></i> 
                        </button>
                      </div>
                    </div>
                    <div class="like-commented">
                      <div class="user-comment">{{ comment.content }}</div>
                      <div class="comment-like" @click="handleLike(comment.id)">
                        <i class="fas fa-heart"></i>
                        <div>{{ comment.likeCount }}</div>  
                      </div>
                    </div>
                  </div> 
                </div>
                <div class="re-comment">답글 달기</div> 

                <!-- 대댓글 표시/숨김 토글 버튼 -->
                <div class="toggle-replies" @click="toggleReplies(comment.id)"> ── 답글 1개 더 보기
                <!--  ── 답글 {{ comment.replies.length }} 개 더 보기 -->
                </div>
                <!-- 대댓글 목록 -->
                <div v-if="comment.showReplies" class="replies">
                  <div v-for="reply in comment.replies" :key="reply.id" class="reply">
                    <!-- 대댓글 내용 표시 -->
                  </div>
                </div>

              </div>
            </div>
            <div class="comment-interactions">
              <div class="comment-count">댓글 {{ comments.length }} 개 <i class="far fa-comment"></i></div>
              <div class="view-count">조회수 {{ this.selectedCard.viewCount }} 개</div>
            </div>
            <div class="addcomment">
              <img class="addcomment-profile-image" src="../assets/images/profil22.png" alt="Profile" />
              <input type="text" class="comment-input" placeholder="댓글을 입력하세요">
              <button class="comment-button"><i class="far fa-paper-plane"></i></button>
            </div>
            <div v-if="isMine" class="interaction-info">
            <!-- 로그인한 경우에만 게시글 수정 및 삭제 버튼을 표시 -->
              <button type="button" class="btn-edit" @click="goToEdit">게시글 수정</button>
              <button type="button" class="btn-delete" @click="goToDelete">게시글 삭제</button>
            </div>
          </div>
        </div>
      </div>
  </template>
  
  <script>
  import 'vue3-carousel/dist/carousel.css'
  import axios from 'axios';
  import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
  
  export default {
      props : {
          showModal: Boolean,
          selectedCard: Object
      },
    name: 'preview',
    name: 'App',
    components: {
      Carousel,
      Slide,
      Pagination,
      Navigation,
    },
    data() {
      return {
        comments: [ ],
        slides: [
          {id: 1, src: require('../assets/images/dog55.jpg'), alt: 'slide1' },
          {id: 2, src: require('../assets/images/dog66.jpg'), alt: 'slide2' },
        ],
        tags : []
      };
    },
    computed:{
          isMine(){
            if(this.$cookies.get('id') == this.selectedCard.userId)
              return true;
            else return false;
          }
        },
    methods: {
      handleClick(tag) {
        // 클릭 이벤트 핸들러
        console.log("태그를 클릭했습니다:", tag);
        // 여기에 추가적인 동작을 정의할 수 있습니다.
      },
      handleLike() {
          // 좋아요 상태를 토글
        this.liked = !this.liked;
          // 좋아요 수 갱신
        if (this.liked) {
          this.likeCount++;
        } else {
          this.likeCount--;
        }
      },
      goToEdit(){
        this.$cookies.set('boardId', this.selectedCard.id);
        this.$router.push(`/editfree`);
      },
      goToDelete(){
        const id = this.selectedCard.id;
        console.log(id);
  
        this.$emit('deleteBoard', id);
  
        // this.axios.delete(`/api/free/${id}`)
        //   .then(() => {
        //     console.log('게시글이 성공적으로 삭제되었습니다.');
        //     this.$cookies.remove('boardId');
        //     this.$emit('closeModal');
        //     this.$router.push(`/freeboard3`);
        //   })
        //   .catch(error => {
        //     console.error('게시글 삭제 중 오류가 발생했습니다.', error);
        //   });
      },
      editComment(commentId) {
        // 이 메서드는 특정 ID를 기반으로 댓글을 수정하는 로직을 포함해야 합니다.
        // 예를 들어, 댓글을 수정하는 모달을 열거나 특정 양식을 보여줄 수 있습니다.
      console.log('댓글 수정:', commentId);
        // 여기에 댓글 수정에 필요한 로직을 추가하세요.
      },
      deleteComment(commentId) {
       // 이 메서드는 특정 ID를 기반으로 댓글을 삭제하는 로직을 포함해야 합니다.
       // 예를 들어, 삭제 전 확인 메시지를 표시하거나 서버로 요청을 보낼 수 있습니다.
        if (confirm('정말로 이 댓글을 삭제하시겠습니까?')) {
        console.log('댓글 삭제:', commentId);
      // 여기에 댓글 삭제에 필요한 로직을 추가하세요.
       }
      },
      toggleReplies(commentId) {
      const comment = this.comments.find(comment => comment.id === commentId);
      if (comment) {
        comment.showReplies = !comment.showReplies;
      }
    },
    },
    mounted() {
        this.axios.get(`/api/comment/${this.selectedCard.id}`).then((res) => {
        this.comments = [];
        this.comments = res.data;
      }).catch();
        this.axios.get(`/api/free/getTag/${this.selectedCard.id}`).then((res) => {
        this.tags = [];
        this.tags = res.data;
      }).catch();
    },
  }
  </script>
  <style scoped>
  @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');
  @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" integrity="sha512-fmJ4kaw6U5fSNAnusU4+eJ6qkhsQbS5ya1yW3zL/peXuRDGzH/ln5VTcBYIL3qy9z5H0bs2dnSC6LXw75RlcCw==');
  
    @font-face {
    font-family: 'Ownglyph_meetme-Rg';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2402_1@1.0/Ownglyph_meetme-Rg.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  
  @font-face {
      font-family: 'omyu_pretty';
      src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-01@1.0/omyu_pretty.woff2') format('woff2');
      font-weight: normal;
      font-style: normal;
  }
  
  h1, h2, h3, h4, h5, h6 {
      font-family: 'Ownglyph_meetme-Rg';
    margin-top: 0;
    margin-bottom: 0.5rem; 
    line-height: 1.5;
    color: rgba(0, 0, 0, 0.8);
    font-weight: 400;}
  
    .preview {
      background-color: white;
    margin-top: 150px;
    display: flex;
    align-items: center; /* 수직 가운데 정렬 */
    justify-content: center; /* 수평 가운데 정렬 */
    border-radius: 20px;
    max-width: 1600px;
    max-height: 1200px;
    border: 2px solid #ddd; /* 테두리 스타일 및 색상 설정 */
   
  }
  
  .profile-info {
    display: flex;
    align-items: center;
  }
  
  .username {
    font-size: 1.7rem;
    /* margin-top: 25px; */
    margin-left: 5px;
  }
  
  .intro {
    font-size: 1.1rem;
    margin-top: 20px;
    margin-bottom: 10px; 
    text-align: left;
  }
    
  /* .image-card {
    margin-top: 200px;
    max-width: 100%;
    height: 80vh;
  } */
  
  .content {
    /* margin-top: 200px; */
    /* max-width: 1200px; */
    width: 70%;
    /* height: 80vh; */
    padding: 0 20px;
  }
    .dog-image {
      max-width: 500px;
      max-height: 100%;
      display: block;
    }
    
  
    .profile-image {
      margin-top: -10px;
      border-radius: 50%;
      border: 4px solid;
      margin-right: 10px;
      width: 50px;
      height: 50px;
    }
  
    .comment-profile-image {
      margin-top: -10px;
      width: 35px;
      height: 35px;
      border: 1px solid;
      border-radius: 50%;
    }
    .comment-content{
      width: 100%;
    }
    .text-content p {
      font-family: 'omyu_pretty';
      font-weight: 500;
      font-size: 1.3rem;
      margin: 5px 0;
    }
    
    .hashtags {
      margin-top: 20px;
      font-family: 'omyu_pretty';
      text-align: left;
      color: #0b0c5ce5;
      font-size: 1.2rem;
    }
    
    .time-posted {
      margin-top: 3px;
      font-family: 'omyu_pretty';
      text-align: left;
      color: #999;
      font-size: 1.1rem;
    
    }
    .far {
      font-family: "Font Awesome 5 Free";
    }
    
    .interactions {
      font-family: 'omyu_pretty';
      border-top: 2px solid #ddd;
      padding-top: 10px;
      margin-top: 15px;
    }
  
    .cm-interactions {
      font-family: 'omyu_pretty';
      border-top: 2px solid #ddd;
      padding-top: 10px;
      margin-top: 15px;
    }
    .no-comment {
    font-family: 'omyu_pretty';
    text-align: center;
    font-size: 1.2rem;
    color: #999;
    margin-top: 20%;
    margin-bottom: 20%;
  }

  .comment-row-1 {
    display: flex;
  }
  .comment-interactions {
    font-family: 'omyu_pretty';
    border-top: 2px solid #ddd;
    padding-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between; /* 좌우로 요소들을 배치합니다. */
  }
  
  .comment-count,
  .view-count {
    font-family: 'omyu_pretty';
    display: inline-block;
  }
  
    .interaction-info {
    display: flex;
    justify-content: space-between;
  }
  
    .like {
      margin-top: -33px;
      font-family: 'omyu_pretty';
      color: #2222228c;
      font-size: 1.1rem;
      font-weight: bold;
      cursor: pointer;
      text-align: right;
    }
  
    .comment-like {
      font-family: 'omyu_pretty';
      font-size: 1rem;
      color: #999;
      margin-right: 2px; /* 아이콘과 숫자 사이의 간격 조정 */
      display: flex;
      align-items: center;
      width: 47px;
    }
  
    .i {
      font-family: "Montserrat", Arial, sans-serif;;
      font-size: 0.5rem;
      color: rgb(245, 5, 5);   /* 하트 아이콘의 색상 */
      margin-right: 3px; /* 아이콘과 숫자 사이의 간격 조정 */
    }
  
    .fa-heart {
    font-family: "Font Awesome 5 Free";
    font-size: 0.8rem;
    margin-right: 3px; /* 아이콘과 숫자 사이의 간격 조정 */
    color: rgb(245, 5, 5);
    
  }
    .fas.fa-heart.filled {
    color: rgb(245, 5, 5); /* 채워진 하트의 색상 */
  }
  
  .like-interactions {
    display: flex;
  }
    .comment {
    display: flex;
    flex-direction: row; /* 댓글 요소들을 가로로 배치 */
    align-items: center; /* 요소들을 세로 가운데 정렬 */
    padding: 10px 0; /* 위아래로 간격 추가 */
  }
  
  .user {
    font-size: 1rem;
    margin-left: 10px; 
    font-weight: bold;
  }
  .user-comment {
    font-size: 1rem;
    flex-grow: 1; /* 댓글 내용이 가능한 최대 너비를 가지도록 설정 */
    margin-left: 10px;
    margin-right: 10px;
    text-align: left;
  }
  
  .time-commented {
    font-size: 0.8rem;
    margin-top: 1px;
    margin-right: 5px;
    margin-left: 10px; 
    color: #999;
  }
  .like-commented {
    display: flex;
    justify-content: space-between;
  }
  
  
   .addcomment {
    font-family: 'omyu_pretty';
    font-size: 1rem;
    border-radius: 20px;
    margin-top: 15px;
    display: flex;
    align-items: center;
  }
  
  .addcomment-profile-image {
    background-color: white;
    border: 1px solid;
    border-radius: 50%;
    width: 40px; /* 이미지 너비 조정 */
    height: 40px; /* 이미지 높이 조정 */
  }
  
  .add-comment {
    margin-left: 30px; /* 이미지와 텍스트 사이 간격 조정 */
  }
  .comment-input {
    padding: 10px; /* 내부 여백 설정 */
    font-size: 1rem; /* 폰트 크기 설정 */
    font-family: 'Ownglyph_meetme-Rg';
    border: 1px solid #ced4da; /* 입력 상자 테두리 설정 */
    border-radius: 50px; /* 입력 상자 테두리 모서리를 둥글게 설정 */
    margin-left: 10px;
  }
  
  .comment-input:focus {
    outline: none; /* 포커스 상태일 때 외곽선 제거 */
    border-color: #007bff; /* 포커스 상태일 때 테두리 색상 변경 */
  }
  .comment-button {
    font-family: "Font Awesome 5 Free";
    font-size: 1.2rem;
    margin-left: 5px;
    padding: 10px;
    border: 1px solid #ced4da;
    border-radius: 50px;
  }
  
  .comment-button:focus {
    outline: none; /* 포커스 상태일 때 외곽선 제거 */
    border-color: #007bff; /* 포커스 상태일 때 테두리 색상 변경 */
  }
  
  .modal {
    position: relative;
    /* overflow: hidden; */
  }
  
  .modal .preview {
    background-color: white;
    margin-top: 150px;
    width: 1000px; /* 수정된 부분 */
    height: 750px; /* 수정된 부분 */
    border-radius: 20px;
    border: 2px solid #ddd;
    padding: 20px;
    /* overflow-y: auto; */
  }
  
  .modal .preview::-webkit-scrollbar { /* Webkit 브라우저용 스크롤바 */
    width: 8px;
  }
  
  .modal .preview::-webkit-scrollbar-thumb {
    background-color: #888; /* 스크롤바 색상 */
    border-radius: 4px; /* 스크롤바 모서리 둥글게 */
  }
  
  .modal .preview::-webkit-scrollbar-track {
    background-color: transparent; /* 스크롤바 트랙 배경색 */
  }
  
  .modal .preview {
    scrollbar-width: thin; /* Firefox용 스크롤바 */
  }
  
  .modal .preview::-webkit-scrollbar-thumb:hover {
    background-color: #555; /* 스크롤바 호버 시 색상 */
  }
  
  .btn-close {
    background-color: transparent;
    border: none;
    border-radius: 100%;
    padding: 0;
    cursor: pointer;
    width: 30px;
    height: 30px;
    transition: background-color 0.3s ease;
    position: absolute;
    top: 18%; 
    right: 25%; 
  }
  
  .btn-close:hover {
    background-color: rgba(255, 249, 249, 0.1);
  }
  
  a{
    text-decoration: none;
  }
  .carousel {
    width: 50%;
  }
  /* 캐러셀 내부 요소 간격 조절 */
  .carousel .slide {
    width:60%; /* carousel의 최대 너비를 화면 너비에 맞게 조절합니다. */
    margin: 0 auto; /* 가운데 정렬을 위해 좌우 마진을 자동으로 설정합니다. */
    padding: 0;
  }
  .carousel img {
    max-width: 100%; /* 이미지의 최대 너비를 부모 요소에 맞게 설정합니다. */
    max-height: 100%; /* 이미지의 최대 높이를 부모 요소에 맞게 설정합니다. */
    width: auto; /* 이미지의 너비를 자동으로 조정합니다. */
    height: 600px; /* 이미지의 높이를 자동으로 조정합니다. */
    margin: 10px; /* 이미지 주변의 여백을 제거합니다. */
    padding: 0px; /* 이미지 주변의 여백을 제거합니다. */
  }
  
  /* 화살표와 이미지 간격 조절 */
  .carousel .navigation {
    margin: 0 -800px; /* 화살표와 이미지 사이의 간격 조절 */
  }
  .dog-image {
    width: 80%;
  }
  .btn-edit,
  .btn-delete {
    margin-top: 10px;
    font-family: 'omyu_pretty';
    background-color: #999;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 10px 10px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .btn-edit {
    margin-right: 5px;
  }
  
  .interaction-info {
    display: flex;
    justify-content: flex-end; /* 버튼을 우측으로 정렬 */
  }
  
  
  .btn-edit:hover, .btn-delete:hover {
    background-color: #007bff;/* 마우스 호버 시 배경색 변경 */
  }
  .btn-edit-comment,
  .btn-delete-comment {
  font-family: 'omyu_pretty';
  font-size: 0.65rem;
  color: #333;
  background-color: transparent; /* 배경색 투명으로 설정 */
  border: none;
  border-radius: 5px;
  padding: 5px 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

  
.btn-edit-comment:hover,
.btn-delete-comment:hover {
  background-color: #ccc;
}

.re-comment {
  margin-top: -15px;
  display: flex;
  margin-left: 46px;
  font-size: 0.9rem;
  color: #999;
}

.toggle-replies{
  display: flex;
  margin-top: -3px;
  margin-left: 50px;
  font-size: 0.9rem;
  color: #5e5e5e;
}

  
  
  
</style>