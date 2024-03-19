<template>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <div class="modal" :class="{ 'show': showQnaModal }">
        <div class="modal-dialog">
            <div class="modal-content">
                <!-- 모달 내용 -->
                <div class="modal-top">
                    <button type="button" class="btn-close fixed-button" @click="$emit('closeModal')" aria-label="Close">
                     <img src="../assets/images/x.png" alt="Close" />
                    </button>
                </div>
                <div class="modal-header">
                    <div class="allTags">
                        <div class="tag" :class="getTagClass(selectedPost.category)">{{selectedPost.category}}</div>
                        <div class="hashtags">
                            <a v-for="tag of tags" href="#" @click="emitTagSearch(tag)" >{{ '#' +tag }}</a>
                        </div>
                        <div v-if="isMine" class="interaction-info">
                            <button type="button" class="btn-edit" @click="goToEditPost">게시글 수정</button>
                            <button type="button" class="btn-delete" @click="goToDeletePost">게시글 삭제</button>
                        </div>
                    </div>
                    <h6 class="modal-title"><p class="modal-title-icon">Q.</p> {{selectedPost.title}}</h6>
                    <div class="modal-title-writer-date">
                        <div class="writer">작성자: {{selectedPost.writer}}</div>
                        <div class="createdAt">작성일자: {{ selectedPost.createdAt }}</div>
                    </div>
                    <div class="like-view">
                        <div class="like" @click="toggleLike(selectedPost)">좋아요 {{ this.selectedPost.likeCount }} <i :class="['fas', 'fa-heart', { 'filled': selectedPost.liked }]"></i></div>
                        <div class="view-count">조회수 {{ this.selectedPost.viewCount }}</div>
                    </div>
                </div>

                <div class="modal-body2" :class="{ 'image-modal-open': showQnaImageModal }">
                    <div id="carouselExample" class="carousel slide">
                        <div class="carousel-inner" ref="itemsCarousel">
                            <div v-for="(image, index) in images" :key="image.id" :class="['carousel-item', index === imageIndex ? 'active' : '']">
                                <img :src="image.src" class="img d-block w-100" alt="..." @click="openImageModal(image)">
                                <QuestionBoardImageModal v-if="showQnaImageModal" :selectedImage="selectedImage" @closeModal="closeModal" :image="image" @closeImageModal="closeImageModal()"/>
                            </div>
                        </div>
                        <button @click="scrollLeft" class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button @click="scrollRight" class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>

                <div class="modal-body1">{{this.selectedPost.content}}</div>

                <div class="cm-interactions" style="max-height: 175px; overflow-y: auto; min-height: 175px;">
                    <div v-if="comments.length === 0" class="no-comment">아직 댓글이 없습니다.</div>
                    <div class="comments" v-for="comment in comments" :key="comment.id">
                        <div class="comment">
                            <img class="comment-profile-image" src="../assets/images/profil11.png" alt="Profile" />
                            <div class="comment-content">
                                <div class="comment-row-1">
                                    <div class="user">{{ comment.name }}</div>
                                    <div class="time-commented">{{ comment.createdAt.slice(0, 10) }}</div>
                                    <div v-if="$cookies.get('id') == comment.userId" class="comment-interactions1">
                                        <button class="btn-edit-comment" @click.prevent="editComment(comment)">
                                            <i class="fas fa-edit"></i> 
                                        </button>
                                        <button class="btn-delete-comment" @click.prevent="deleteComment(comment.id)">
                                            <i class="fas fa-trash-alt"></i> 
                                        </button>
                                    </div>
                                </div>
                                <div class="like-commented">
                                    <div v-if="!comment.isEditing" class="user-comment">{{ comment.content }}</div>
                                    <div v-if="comment.isEditing" class="user-comment">
                                        <input type="text" class="editCommnet-input" v-model="comment.newContent" @keydown.enter="saveEditComment(comment)" />
                                    </div>
                                    <div class="comment-like" @click="toggleCommentLike(comment)">
                                        <i :class="['fas', 'fa-heart', { 'filled': comment.liked }]"></i>
                                        <div>{{ comment.likeCount }}</div>  
                                    </div>
                                </div>
                            </div> 
                        </div>
                        <div class="re-comment">답글 달기</div> 
                        <div class="toggle-replies" @click="toggleReplies(comment.id)"> ── 답글 1개 더 보기</div>
                        <div v-if="comment.showReplies" class="replies">
                            <div v-for="reply in comment.replies" :key="reply.id" class="reply">
                                <!-- 대댓글 내용 표시 -->
                            </div>
                        </div>
                    </div>
                </div>
                <div class="comment-interactions">
                    <div class="comment-count">댓글 {{ comments.length }} 개 <i class="far fa-comment"></i></div>
                </div>
                <form class="addcomment" v-if="isLogin" @submit.prevent="addComent">
                    <img class="addcomment-profile-image" src="../assets/images/profil22.png" alt="Profile" />
                    <input type="text" class="comment-input" placeholder="댓글을 입력하세요" v-model="commentLine">
                    <button class="comment-button"><i class="far fa-paper-plane"></i></button>
                </form>
            </div>
        </div>
    </div>
</template>


<script>
import QuestionBoardImageModal from './QuestionBoardImageModal.vue';

export default ({
  components: {
    QuestionBoardImageModal
  },
  data() {
    return {
      newContent: '',
      comments: [],
    //   isEditing: false,
      imageIndex: 0,
      tags: [],
      commentLine: "",
      showQnaImageModal: false,
      selectedImage: {}
    }
  },
  computed: {
    isMine() {
      return this.$cookies.get('id') == this.selectedPost.userId ? true : false;
    },
    isLogin() {
      return this.$cookies.isKey('id') ? true : false;
    },
  },

  props: {
    showQnaModal: Boolean,
    selectedPost: Object,
    images: Array
  },

  methods: {
    scrollLeft() {
      // Scroll to the left
      this.imageIndex = Math.max(0, this.imageIndex - 1);
    },
    scrollRight() {
      // Scroll to the right
      this.imageIndex = Math.min(this.images.length - 1, this.imageIndex + 1);
    },
    emitTagSearch(tag) {
      this.$emit('tagSearch', tag);
    },
    openImageModal(image) {
      this.selectedImage = image;
      this.showQnaImageModal = true;
    },
    closeImageModal() {
      this.showQnaImageModal = false;
    },
    toggleLike(selectedPost) {
      let liked = !selectedPost.liked;
      selectedPost.liked = liked;

      if (liked) {
        selectedPost.likeCount++;
      } else {
        selectedPost.likeCount--;
      }
      localStorage.setItem(`LIKED_${selectedPost.id}`, liked);
      this.updateLikeStatus(selectedPost.id, liked);
    },
    updateLikeStatus(postId, liked) {
      this.axios.put(`/api/qna/${postId}/like`, null, {
          params: { liked }
        })
        .then(() => {
          console.log('게시글 좋아요 상태가 업데이트되었습니다.');
        })
        .catch(error => {
          console.error('게시글 좋아요 상태를 업데이트하는 중 오류가 발생했습니다.', error);
        });
    },
    goToEditPost() {
      this.$cookies.set('boardId', this.selectedPost.id);
      this.$router.push(`/editqna`);
    },
    goToDeletePost(){
        const id = this.selectedPost.id;
        this.$emit('deleteBoard', id);
      },
    addComent() {
      this.axios.post('/api/comment', {
          content: this.commentLine,
          id: this.selectedPost.id,
          userId: this.$cookies.get('id'),
        }).then(() => {
          this.commentLine = "";
          this.axios.get(`/api/comment/${this.selectedPost.id}`).then((res) => {
            this.comments = res.data;
          }).catch();
        }).catch();
    },
    editComment(comment) {
    comment.isEditing = !comment.isEditing;
    comment.oldContent = comment.content;
    comment.newContent = comment.content;
    },
    saveEditComment(comment) {
      this.axios.put(`/api/comment/${comment.id}`, {
          id: comment.id,
          content: comment.newContent
        }).then(() => {
          comment.content = comment.newContent;
          comment.isEditing = false;
        })
        .catch(error => {
          console.error('댓글 수정 중 오류가 발생했습니다.', error);
        });
    },
    deleteComment(commentId) {
      this.axios.delete(`/api/comment/${commentId}`)
        .then(() => {
          this.comments = this.comments.filter(comment => comment.id !== commentId);
        })
        .catch(error => {
          console.error('댓글 삭제 중 오류가 발생했습니다.', error);
        });
    },
    toggleCommentLike(comment) {
      let liked = !comment.liked;
      comment.liked = liked;
      if (liked) {
        comment.likeCount++;
      } else {
        comment.likeCount--;
      }
      localStorage.setItem(`LIKED_COMMENT_${comment.id}`, liked);
      this.updateCommentLikeStatus(comment.id, liked);
    },
    updateCommentLikeStatus(commentId, liked) {
      this.axios.put(`/api/qna/${commentId}/commentLike`, null, {
          params: { liked }
        })
        .then(() => {
          console.log('댓글 좋아요 상태가 업데이트 되었습니다.');
        })
        .catch(error => {
          console.error('댓글 좋아요 상태를 업데이트하는 중 오류가 발생했습니다.', error);
        });
    },
    fetchComments() {
      this.axios.get(`/api/comment/${this.selectedPost.id}`).then((res) => {
        this.comments = [];
        this.comments = res.data;
        // 댓글 데이터를 받아온 후에 로컬 스토리지에 댓글 좋아요 상태를 설정
        this.comments.forEach(comment => {
          const commentLiked = localStorage.getItem(`LIKED_COMMENT_${comment.id}`);
          if (commentLiked === 'true') {
            comment.liked = true;
          } else {
            comment.liked = false;
          }
        });
      }).catch(error => {
        console.error('댓글을 불러오는 중 오류가 발생했습니다.', error);
      });
    },
    toggleReplies(commentId) {
      const comment = this.comments.find(comment => comment.id === commentId);
      if (comment) {
        comment.showReplies = !comment.showReplies;
      }
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
    }
  },
  mounted() {
    this.axios.get(`/api/comment/${this.selectedPost.id}`).then((res) => {
      this.comments = [];
      this.comments = res.data;
    }).catch();
    this.axios.get(`/api/free/getTag/${this.selectedPost.id}`).then((res) => {
      this.tags = [];
      this.tags = res.data;
    }).catch();

    this.fetchComments();
    const postLiked = localStorage.getItem(`LIKED_${this.selectedPost.id}`);
    if (postLiked === 'true') {
      this.selectedPost.liked = true;
    } else {
      this.selectedPost.liked = false;
    }
  }
});
</script>


<style scoped>
  @font-face {
    font-family: 'omyu_pretty';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-01@1.0/omyu_pretty.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }


* {
    font-family: 'omyu_pretty';
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
    background-color: rgba(0, 0, 0, 0.5); /* 검정색 투명 배경을 나타내는 rgba 값 */
    display: flex;
    justify-content: center; /* 수평 가운데 정렬 */
    align-items: center; /* 수직 가운데 정렬 */
    top: 50%; /* 화면 세로 중앙 */
    left: 50%; /* 화면 가로 중앙 */
    transform: translate(-50%, -50%); /* 가운데 정렬 */
}
.modal.show {
  display: flex !important; /* Important 추가 */
}
.modal > .modal-dialog {
    position: fixed; /* 변경 */
    margin: auto; /* 변경 */
    pointer-events: auto; /* 변경 */
    width: 80%;
    max-width: 1000px; /* 모달의 최대 너비를 지정합니다. */
    height: 90%;
    max-height: 1000px;
}
.modal-content {
    position: relative;
    display: flex;
    flex-direction: column;
    pointer-events: auto;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 0.8rem;
    outline: 0;
    width: 100%; /* 변경 */
    height: 100%; /* 변경 */
}
.interaction-info {
   display: flex;
   justify-content: flex-end;
}

.allTags {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 15px; 
    text-decoration: none;
    width: 100%;
}
.tag {
    display: inline-block;
    padding: 5px 15px; 
    border-radius: 15px; 
    color: #fff;
    background-color: #007bff;
 
}
.hashtags {
    margin-left: 10px;
    margin-right: auto;
}

a {
    margin-left: 3px;
    margin-right: 3px;
    text-decoration: none;
}

.btn-edit,
.btn-delete {
    /* margin-top: 10px; */
    font-family: 'omyu_pretty';
    background-color: #999;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}
  
.btn-edit {
    margin-right: 5px;
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
  }

  .fixed-button {
  position: fixed;
  top: 60px;
  right: 500px; 
  z-index: 999; 
  }
  
  .btn-close:hover {
    background-color: rgba(255, 249, 249, 0.1);
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
.modal-footer {
    position: absolute; /* 절대 위치 설정 */
    bottom: 0; /* 아래쪽으로 고정 */
    right: 0; /* 오른쪽으로 고정 */
    padding: 0.75rem;
    border-top: 1px solid #dee2e6;
    background-color: #f7f7f7;
}
.modal-top {
    display: flex; /* Flexbox를 활용합니다. */
    justify-content: space-between; /* 요소들을 양끝으로 분리합니다. */
    margin-top: 5px;
}

.modal-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 50px;
    padding-left: 50px;
    padding-right: 50px;
    padding-bottom: 20px;
    border-bottom: 1px solid #dee2e6;
    background-color: #ececec;
    /* margin-top: 15px; */
    position: absolute;
    /* top: 20px; */
    left: 0;
    width: 100%;
}

.modal-title {
    display: flex;
    /* flex-direction: row; */
    align-items: center;
    margin: 0;
    font-size: 28px;
    font-weight: bold;
}
.modal-title-icon {
    color: #34aaf8;
    font-weight: bold;
    margin-right: 5px;
}
.modal-title-writer-date {
    display: flex;
    align-items: center;
    justify-content: space-between; 
    font-size: 16px;
    width: 100%;
}
.modal-title-writer-date .writer {
    text-align: auto;
    font-size: 18px;
}
.modal-title-writer-date .createdAt {
    text-align: auto;
    font-size: 18px;
}
.like-view {
    display: flex;
    justify-content: flex-end;
    width: 100%;
}
.like {
    margin-right: 10px;
}

.modal-body1 {
    font-size: 16px;
    position: absolute;
    top: 54%;
    left: 50%;
    transform: translate(-50%, -50%);
    overflow-y: auto; 
    height: 135px; 
    width: 90%;
}
/* 캐러셀 스타일링 */
.modal-body2 {
    top: 25%;
    height: 160px;
    position: relative;
}
.carousel-inner {
    display: flex;
    transition: all 3s;
    justify-content: center;
    align-items: center;
    height: 100%;
}
.carousel-item img, .carousel-item.active img {
    margin-left: auto;
    margin-right: auto;
    margin-top: 10px;
    margin-bottom: 10px;
    /* height: 125px; */
    height: 150px;
    width: 100%;
    object-fit: contain;
    transform: translateX(-50%); 
}
.carousel-control-prev,
.carousel-control-next {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px; /* 이전/다음 버튼의 너비 조정 */
    height: 20px; /* 이전/다음 버튼의 높이 조정 */
    background-color: rgba(0, 0, 0, 0.5); /* 배경색 지정 */
    border-radius: 50%; /* 원형 모양으로 버튼 모양 조정 */
    transition: background-color 0.3s ease; /* hover 효과를 위한 전환 */
    position: absolute; /* 절대 위치 지정 */
    top: 50%; /* 상단으로부터 50% 위치 */
    transform: translateY(-50%); /* 세로 가운데 정렬 */
}
.carousel-control-prev {
    left: 30%; /* 좌측에서부터 0 위치 */
}
.carousel-control-next {
    right: 30%; /* 우측에서부터 0 위치 */
}
.image-modal-open .carousel-control-prev,
.image-modal-open .carousel-control-next {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 3rem; /* 이전/다음 버튼의 너비 조정 */
    height: 3rem; /* 이전/다음 버튼의 높이 조정 */
    background-color: rgb(0, 0, 0); /* 배경색 지정 */
    border-radius: 50%; /* 원형 모양으로 버튼 모양 조정 */
    transition: background-color 0.3s ease; /* hover 효과를 위한 전환 */
    position: absolute; /* 절대 위치 지정 */
    top: 245%; /* 상단으로부터 50% 위치 */
    transform: translateY(-50%); /* 세로 가운데 정렬 */
}
.image-modal-open .carousel-control-prev {
    left: 40%; /* 좌측에서부터 0 위치 */
}
.image-modal-open .carousel-control-next {
    right: 40%; /* 우측에서부터 0 위치 */
}
.carousel-control-prev:hover,
.carousel-control-next:hover {
    background-color: rgba(0, 0, 0, 0.8); /* 호버시 색상 변경 */
}
.carousel-control-prev-icon,
.carousel-control-next-icon {
    width: 10px;
    height: 10px;
    font-size: 5px; /* 아이콘 크기 조정 */
    color: #fff; /* 아이콘 색상 지정 */
}

.cm-interactions {
    padding-bottom: 10px;
    position: absolute;
    top: 65%;
    left: 5%;
    font-family: 'omyu_pretty';
    border-top: 2px solid #ddd;
    border-bottom: 2px solid #ddd;
    /* padding-top: 10px; */
    /* margin-top: 375px; */
    margin-bottom: 15px;
    width: 90%;
    }
    .no-comment {
      margin-top: 70px;
    }
.comment-row-1 {
    display: flex;
    align-items: center;
  }

.comment-interactions {
    margin-top: auto;
    font-family: 'omyu_pretty';
    /* border-top: 2px solid #ddd; */
    padding-top: 10px;
    display: flex;
    margin-left: 35px;
  }
  
  .view-count {
    font-family: 'omyu_pretty';
    display: inline-block;
  }

  .comment-count {
    font-family: 'omyu_pretty';
    display: inline-block;
    margin-left: auto;
    margin-right: 52px;
  }



.comment-like {
      font-family: 'omyu_pretty';
      font-size: 1rem;
      color: #999;
      margin-right: 3px; /* 아이콘과 숫자 사이의 간격 조정 */
      display: flex;
      align-items: center;
      width: 47px;
    }
  
    .i {
      font-family: "Font Awesome 5 Free";
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
  .fas.fa-heart{
    color: rgb(221, 221, 221);

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
    width: 90%;
    margin-left: auto;
    margin-right: 50px;
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
  .toggle-replies {
    display: flex;
    margin-left: auto;
    width: 89%;
  }
  .editCommnet-input {
    font-family: 'Ownglyph_meetme-Rg';
    font-size: 0.8rem;
  }
  .comment-button {
    font-family: "Font Awesome 5 Free";
    font-size: 1rem;
    margin-left: 5px;
    padding: 10px;
    border: 1px solid #ced4da;
    border-radius: 50px;
  }
  
  .comment-button:focus {
    outline: none; /* 포커스 상태일 때 외곽선 제거 */
    border-color: #007bff; /* 포커스 상태일 때 테두리 색상 변경 */
  }
  .comment-profile-image {
      margin-top: -18px;
      width: 35px;
      height: 35px;
      border: 1px solid;
      border-radius: 50%;
   }
   .comment-content{
      width: 100%;
   }
   .re-comment {
  margin-top: -15px;
  display: flex;
  margin-left: 46px;
  font-size: 0.9rem;
  color: #999;
}
</style> 
