<template>
  <div class="modal">
    <div class="preview" @click.self="">
      <carousel :items-to-show="1">
        <slide v-for="slide in slides" :key="slide.id">
          <img :src="slide.src" :alt="slide.alt" class="dog-image" />
        </slide>
        <template #addons>
          <navigation />
        </template>
      </carousel>
      <div class="content">
        <button type="button" class="btn-close fixed-button" @click="$emit('closeModal')" aria-label="Close">
          <img src="../assets/images/x.png" alt="Close" />
        </button>
        <div class="header">
          <div class="profile-info" style="align-items: center;">
            <img class="profile-image" :src="this.selectedCard.userImg" alt="Profile" />
            <h1 class="username">{{ this.selectedCard.writer }}</h1>
            <div v-if="isMine" class="interaction-info">
              <button type="button" class="btn-edit" @click="goToEdit">게시글 수정</button>
              <button type="button" class="btn-delete" @click="goToDelete">게시글 삭제</button>
            </div>
          </div>
          <div class="text-content" style="min-height: 90px;"> 
            <div class="intro">
              <div class="scrollable-content" style="max-height: 130px; overflow-y: auto;">
                <p>{{ selectedCard.content }}</p>
              </div>
            </div>
          </div>
          <div class="hashtags" style="display: flex; flex-wrap: wrap;">
            <a v-for="tag of tags" style="margin: 3px;" href="#" @click="emitTagSearch(tag)">{{ '#' + tag }}</a>
          </div>
          <div class="time-like">
            <div class="time-posted">{{ selectedCard.createdAt.slice(0, 10) }}</div>
            <div class="like" @click="toggleLike(selectedCard)">게시글 좋아요 {{ selectedCard.likeCount }} <i :class="['fas', 'fa-heart', { 'filled': selectedCard.liked }]"></i></div>
          </div>
        </div>
        <div class="cm-interactions" style="max-height: 250px; overflow-y: auto; min-height: 250px;">
          <div v-if="comments.length === 0" class="no-comment">아직 댓글이 없습니다.</div>
          <div class="comments" v-for="comment in comments" :key="comment.id">
            <div class="comment">
              <img class="comment-profile-image" :src="comment.imgPath" alt="Profile" />
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
            <div class="re-comment" @click.prevent="toggleReplyInput(comment)">답글 달기</div>
            <div class="re-comment-input" v-if="replyInputStates[comment.id]">
              <input class="addNewComment" type="text" v-model="newReplyContent" @keydown.enter="saveNewReply(comment)" />
            </div>
            <div class="toggle-replies" @click.prevent="toggleReplies(comment)">
              {{ comment.showReplies ? '답글 숨기기' : (comment.replies && comment.replies.length > 0 ? '── 답글 ' + comment.replies.length + '개 더 보기' : '') }}
            </div>
            <div class="replies" v-if="comment.showReplies">
              <div v-for="reply in comment.replies" :key="reply.id" class="reply">
                <div class="reply-content">
                  <img class="reply-profile-image" :src="reply.imgPath" alt="Profile" />
                  <div class="comment-content">
                    <div class="comment-row-1">
                      <div class="user">{{ reply.name }}</div>
                      <div class="time-commented">{{ reply.createdAt.slice(0, 10) }}</div>
                      <div v-if="$cookies.get('id') == reply.userId" class="reply-comment-interactions1">
                        <button class="btn-edit-comment" @click.prevent="editReplyComment(reply)">
                          <i class="fas fa-edit"></i> 
                        </button>
                        <button class="btn-delete-comment" @click.prevent="deleteReplyComment(reply.id)">
                          <i class="fas fa-trash-alt"></i> 
                        </button>
                      </div>
                    </div>
                    <div class="like-commented">
                      <div v-if="!reply.isEditing" class="user-comment">{{ reply.content }}</div>
                      <div v-if="reply.isEditing" class="user-comment">
                        <input type="text" class="editCommnet-input" v-model="reply.newContent" @keydown.enter="saveEditReplyComment(reply)" />
                      </div>
                      <div class="comment-like" @click="toggleReplyLike(reply)">
                        <!-- <i :class="['fas', 'fa-heart', { 'filled': reply.liked }]"></i> -->
                        <i class="fas fa-heart" :class="{ 'filled': reply.liked }"></i>
                      <div>{{ reply.likeCount }}</div>  
                      </div>
                    </div>
                  </div> 
                </div>
                <div class="reply-re-comment" @click.prevent="toggleReplyInput(reply)">답글 달기</div>
                <div class="re-comment-input" v-if="replyInputStates[reply.id]">
                <input class="addNewComment" type="text" v-model="newReplyContent" @keydown.enter="saveNewReply(reply)" />
                </div>
                <div class="toggle-replies" @click.prevent="toggleReplies1(reply)">
                  {{ reply.showReplies ? '답글 숨기기' : (reply.child && reply.child > 0 ? '── 답글 ' + reply.child + '개 더 보기' : '') }}
                </div>




                <!--테스트 코드-->
                  
                <div class="replies" v-if="reply.showReplies">
                  <div v-for="reply2 in reply.replies" :key="reply2.id" class="reply">
                    <div v-html="reloadReply(reply2)"></div>
                  </div>
                </div>

                <div v-if="reply.showReplies">
                  <div v-html="reloadReplies(reply)"></div>
                </div>

                <!--테스트 코드 종료-->

              </div>
            </div>
          </div>
        </div>
        <div class="comment-interactions">
          <div class="comment-count">댓글 {{ calculateTotalCommentCount(comments) }} 개 <i class="far fa-comment"></i></div>
          <div class="view-count">조회수 {{ this.selectedCard.viewCount }} 개</div>
        </div>
        <form class="addcomment" v-if="isLogin" @submit.prevent="addComment">
          <img class="addcomment-profile-image" :src="this.$cookies.get(userImg)" alt="Profile" />
          <input type="text" class="comment-input" placeholder="댓글을 입력하세요" v-model="commentLine">
          <button class="comment-button"><i class="far fa-paper-plane"></i></button>
        </form>
      </div>
    </div>
  </div>
</template>

  
<script>
import axios from 'axios';
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';

export default {
  name: 'preview',
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  props: {
    showModal: Boolean,
    selectedCard: Object,
  },
  data() {
    return {
      newContent: '', // 새로운 댓글 저장하는 변수
      comments: [],
      isEditing: false,
      slides: [],
      tags: [],
      commentLine: "",
      updateButton: false,
      replyInputStates: {},
    };
  },
  computed: {
    isMine() {
      return this.$cookies.get('id') == this.selectedCard.userId;
    },
    isLogin() {
      return this.$cookies.isKey('id');
    },
  },
  methods: {
    reloadReply(reply2) {
      console.log(reply2);
      const isCurrentUser = this.$cookies.get('id') == reply2.userId;
      const editingClass = reply2.isEditing ? 'editing' : '';

      return `
        <div class="reply">
          <div class="reply-content">
            <img class="reply-profile-image" :src="reply2.imgPath" alt="Profile" />
            <div class="comment-content">
              <div class="comment-row-1">
                <div class="user">${reply2.name}</div>
                <div class="time-commented">${reply2.createdAt.slice(0, 10) }</div>
                <div v-if="${isCurrentUser}" class="reply-comment-interactions1">
                  <button class="btn-edit-comment" @click.prevent="editReplyComment(reply2)">
                    <i class="fas fa-edit"></i> 
                  </button>
                  <button class="btn-delete-comment" @click.prevent="deleteReplyComment(reply2.id)">
                    <i class="fas fa-trash-alt"></i> 
                  </button>
                </div>
              </div>
              <div class="like-commented">
                <div v-if="!${editingClass}" class="user-comment">{{ reply2.content }}</div>
                <div v-if="${editingClass}" class="user-comment">
                  <input type="text" class="editCommnet-input" v-model="reply2.newContent" @keydown.enter="saveEditReplyComment(reply2)" />
                </div>
                <div class="comment-like" @click="toggleReplyLike(reply2)">
                  <i class="fas fa-heart" :class="{ 'filled': reply2.liked }"></i>
                  <div>{{ reply2.likeCount }}</div>  
                </div>
              </div>
            </div> 
          </div>
          <div class="reply-re-comment" @click.prevent="toggleReplyInput(reply2)">답글 달기</div>
          <div class="re-comment-input" v-if="replyInputStates[reply2.id]">
            <input class="addNewComment" type="text" v-model="newReplyContent" @keydown.enter="saveNewReply(reply2)" />
          </div>
          <div class="toggle-replies" @click.prevent="toggleReplies1(reply2)">
            {{ reply2.showReplies ? '답글 숨기기' : (reply2.child && reply2.child > 0 ? '── 답글 ' + reply2.child + '개 더 보기' : '') }}
          </div>
        </div>
      `;
    },
    

    reloadReplies(reply) {
      if (!reply.showReplies || !reply.replies || reply.replies.length === 0) return '';

      let repliesHtml = '';
      for (const reply2 of reply.replies) {
        repliesHtml += this.reloadReply(reply2);
      }

      return `<div class="replies">${repliesHtml}</div>`;
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
      this.axios.put(`/api/free/${commentId}/commentLike`, null, {
        params: { liked }
      })
      .then(() => {
        console.log('댓글 좋아요 상태가 업데이트 되었습니다.');
      })
      .catch(error => {
        console.error('댓글 좋아요 상태를 업데이트하는 중 오류가 발생했습니다.', error);
      });
    },
    toggleReplyLike(reply) {
      let liked = !reply.liked;
      reply.liked = liked;
      if (liked) {
        reply.likeCount++;
      } else {
        reply.likeCount--;
      }
      localStorage.setItem(`LIKED_REPLY_${reply.id}`, liked);
      this.updateReplyLikeStatus(reply.id, liked);
    },
    updateReplyLikeStatus(replyId, liked) {
      this.axios.put(`/api/comment/${replyId}/replyLike`, null, {
        params: { liked }
      })    
      .then(() => {
        console.log('게시글 좋아요 상태가 업데이트되었습니다.');
      })
      .catch(error => {
        console.error('게시글 좋아요 상태를 업데이트하는 중 오류가 발생했습니다.', error);
      });
    },
    fetchComments() {
      this.axios.get(`/api/comment/${this.selectedCard.id}`)
      .then((res) => {
        this.comments = res.data;
        this.comments.forEach(comment => {
          const commentLiked = localStorage.getItem(`LIKED_COMMENT_${comment.id}`);
          comment.liked = commentLiked === 'true';
          this.fetchReplies(comment);
      

        if(comment.replies && comment.replies.length > 0) {
          comment.replies.forEach(reply => {
            const replyLiked = localStorage.getItem(`LIKED_REPLY_${reply.id}`);
            reply.liked = replyLiked === 'true';
          });           
        }
      });
        this.totalCommentCount = this.calculateTotalCommentCount(this.comments);
      }).catch(error => {
        console.error('댓글을 불러오는 중 오류가 발생했습니다.', error);
      });
    },
    toggleLike(selectedCard) {
      let liked = !selectedCard.liked;
      selectedCard.liked = liked;

      if (liked) {
        selectedCard.likeCount++;
      } else {
        selectedCard.likeCount--;
      }
      localStorage.setItem(`LIKED_${selectedCard.id}`, liked);
      this.updateLikeStatus(selectedCard.id, liked);
    },
    updateLikeStatus(postId, liked) {
      this.axios.put(`/api/free/${postId}/like`, null, {
        params: { liked }
      })    
      .then(() => {
        console.log('게시글 좋아요 상태가 업데이트되었습니다.');
      })
      .catch(error => {
        console.error('게시글 좋아요 상태를 업데이트하는 중 오류가 발생했습니다.', error);
      });
    },
    closeModal() {
      if (event.target === event.currentTarget) {
        this.$emit('closeModal');
      }
    },
    addComment() {
      this.axios.post('/api/comment', {
        content: this.commentLine,
        id: this.selectedCard.id,
        userId: this.$cookies.get('id'),   
      }).then(() => {
        this.commentLine = "";
        this.fetchComments();
      }).catch();
    },
    goToEdit() {
      this.$cookies.set('boardId', this.selectedCard.id);
      this.$router.push(`/editfree`);
    },
    goToDelete() {
      const id = this.selectedCard.id;
      this.$emit('deleteBoard', id);
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
      }).catch(error => {
        console.error('댓글 수정 중 오류가 발생했습니다.', error);
      });
    },
    saveNewReply(reply) {
      if (!this.newReplyContent) {
        console.error('댓글 내용이 유효하지 않습니다.');
        return;
      }
      
      this.axios.post(`api/comment/${reply.id}/replies`, {
        boardId: this.selectedCard.id,
        userId: this.$cookies.get('id'),   
        content: this.newReplyContent
      }).then(res => {
        console.log('댓글이 성공적으로 등록되었습니다.', res.data);

        if(!reply.replies) {
          reply.replies = [];
        }
        
        reply.replies.push(res.data);
        this.newReplyContent = '';
        this.replyInputStates[reply.id] = false;
      }).catch(error => {
        console.error('댓글 등록 중 오류가 발생했습니다.', error);
      });
    },
    editReplyComment(reply) {
      reply.isEditing = !reply.isEditing;
      reply.oldContent = reply.content;
      reply.newContent = reply.content;
    },
    saveEditReplyComment(reply) {
      const parentCommentId = reply.parentCommentId;

      this.axios.put(`/api/comment/${reply.id}/replies`, {
        commentId: reply.id,
        content: reply.newContent
      }).then(() => {
        reply.content = reply.newContent;
        reply.isEditing = false;
      }).catch(error => {
        console.error('댓글 수정 중 오류가 발생했습니다.', error);
      });
    },
    toggleReplyInput(comment) {
      if (this.replyInputStates[comment.id]) {
        this.replyInputStates[comment.id] = false; // 대댓글 입력 상자를 닫음
      } else {
        for (const id in this.replyInputStates) {
          if (Object.hasOwnProperty.call(this.replyInputStates, id)) {
            this.replyInputStates[id] = false;
          }
        }
        this.replyInputStates[comment.id] = true;
      }
    },  
    toggleReplies(comment) {
      if (typeof comment === 'object') {
        comment.showReplies = !comment.showReplies;
        if (comment.showReplies && !comment.replies) {
          this.fetchReplies(comment);
        }
      } else { 
        console.error('올바르지 않은 comment 객체입니다.');
      }
    },
    toggleReplies1(comment) {
      if (typeof comment === 'object') {
        comment.showReplies = !comment.showReplies;
        this.axios.get(`/api/comment/detailcomment`, {
          params: {
            id: this.selectedCard.id,
            parentCommentId: comment.id
          }
        }).then((res) => {
          if (res.data && res.data.length > 0){
            comment.replies = res.data;
            console.log(comment.replies);
            for(let s of comment.replies){
              if (!s.hasOwnProperty('showReplies'))
                s.showReplies = false;  
            }
          }
        }).catch();

      } else { 
        console.error('올바르지 않은 comment 객체입니다.');
      }
    },
    fetchReplies(comment) {
      if (!comment.hasOwnProperty('showReplies')) {
        comment.showReplies = false;
      }
      this.axios.get(`api/comment/detailcomment`, {
        params: {
          id: this.selectedCard.id,
          parentCommentId: comment.id
        }
      })
      .then(res => {
        if (res.data && res.data.length > 0){
          comment.replies = res.data;
          for(let s of comment.replies){
            if (!s.hasOwnProperty('showReplies'))
              s.showReplies = false;  
          }
        }
      })
      .catch(error => {
        console.error('답글을 가져오는 중 오류가 발생했습니다.', error);
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
    deleteReplyComment(replyId) {
      this.axios.delete(`/api/comment/${replyId}/replies`)
      .then(() => {
        this.comments.forEach(comment => {
          if (comment.replies && comment.replies.length > 0) {
            comment.replies = comment.replies.filter(reply => reply.id !== replyId);
          }
        });
      })
      .catch(error => {
        console.error('대댓글 삭제 중 오류가 발생했습니다.', error);
      });
    },
    emitTagSearch(tag) {
      this.$emit('tagSearch', tag);
    },
    calculateTotalCommentCount(comments) {
      let total = 0;
      comments.forEach(comment => {
        total += 1;
        if(comment.replies && comment.replies.length > 0) {
          total += comment.replies.length;
        }
      });
      return total;
    },
  },
  
  mounted() {
    this.fetchComments();
     
    this.axios.get(`/api/free/getTag/${this.selectedCard.id}`).then((res) => {
      this.tags = res.data;
    }).catch();
    
    const postLiked = localStorage.getItem(`LIKED_${this.selectedCard.id}`);
    this.selectedCard.liked = postLiked === 'true';

    this.axios.get(`/api/free/getImage/${this.selectedCard.id}`).then((res) =>{
      let b = 1;
      for(let i of res.data){
        this.slides.push({ id: b++, src: i, alt: 'slide1' });
      }
    }).catch();
  }
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
  p {
    margin: 0px;
  }
  .hashtags a:hover {
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
    transform: translateY(-5px);
  }
  
  .profile-info {
    display: flex;
    align-items: center;
  }
  
  .username {
    max-width: 299px;
    margin: auto;
    font-size: 1.7rem;

    margin-left: 5px;
  }
  h1 {
    margin-bottom: 0px;
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
    display: flex;
    flex-direction: column;
    /* margin-top: 200px; */
    /* max-width: 1200px; */
    width: 70%;
    /* height: 80vh; */
    padding: 0 20px;
  }
    .dog-image {
      max-width: 500vw;
      max-height: 100%;
      display: block;
    }

    .profile-image {
      /* margin-top: -10px; */
      border-radius: 50%;
      border: 4px solid;
      margin-right: 10px;
      width: 50px;
      height: 50px;
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

    .text-content p {
      font-family: 'omyu_pretty';
      font-weight: 500;
      font-size: 1.3rem;
      /* margin: 5px 0; */
    }
    
    .hashtags {
      /* margin-top: 20px; */
      font-family: 'omyu_pretty';
      text-align: left;
      color: #0b0c5ce5;
      font-size: 1.2rem;
    }

    .hashtags a:hover {
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
    transform: translateY(-5px);
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
      margin-bottom: 15px;
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
    color: rgb(238, 238, 238);

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

  .reply {
    flex-wrap: wrap;
    display: flex;
    flex-direction: row; /* 댓글 요소들을 가로로 배치 */
    align-items: center; /* 요소들을 세로 가운데 정렬 */
    margin-left: 15px;
    padding: 3px 0;
    width: 97%;
  }

  .reply-content {
    display: flex;
    
    align-items: center;
    margin-left: 15px;
    padding: 3px 0;
    width: 97%;
  }
  
  .reply-user,
  .user {
    font-size: 1rem;
    margin-left: 10px; 
    font-weight: bold;
  }
  .reply-user-commnet,
  .user-comment {
    font-size: 1rem;
    flex-grow: 1; /* 댓글 내용이 가능한 최대 너비를 가지도록 설정 */
    margin-left: 10px;
    margin-right: 10px;
    text-align: left;
  }
  
  .reply-time-commentd,
  .time-commented {
    font-size: 0.8rem;
    margin-top: 1px;
    margin-right: 5px;
    margin-left: 10px; 
    color: #999;
  }
  .reply-like-commented,
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
    width: 45px; /* 이미지 너비 조정 */
    height: 45px; /* 이미지 높이 조정 */
    overflow: hidden;
  }

  .reply-profile-image {
    margin-top: -10px;
    background-color: white;
    border: 1px solid;
    border-radius: 50%;
    width: 35px; /* 이미지 너비 조정 */
    height: 35px; /* 이미지 높이 조정 */
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
 
  .editCommnet-input {
    font-family: 'Ownglyph_meetme-Rg';
    font-size: 0.8rem;
  }
  .comment-button {
    font-family: "Font Awesome 5 Free";
    font-size: 1.2rem;
    margin-left: 5px;
    padding: 10px;
    border: 1px solid #ced4da;
    border-radius: 50px;
    cursor: pointer;
  }
  
  .comment-button:focus {
    outline: none; /* 포커스 상태일 때 외곽선 제거 */
    border-color: #007bff; /* 포커스 상태일 때 테두리 색상 변경 */
  }

  .addnewcomment {
    padding: 10px; 
    font-size: 0.8rem; 
    font-family: 'Ownglyph_meetme-Rg';
    border: 1px solid #ced4da; 
    border-radius: 50px; 
    margin-left: 10px;
  }
  
 input {
    font-family: 'Ownglyph_meetme-Rg' !important;
    font-size: 1rem;
    font-weight: 100;
  } 
  
  .re-comment-input input.addNewcomment {
    height: 1.8rem !important;
    font-family: 'Ownglyph_meetme-Rg' !important;
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
  }

  .fixed-button {
  position: fixed;
  top: 180px;
  right: 500px; 
  z-index: 999; 
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
    /* margin-top: 10px; */
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

.reply-re-comment {
  margin-top: -10px;
  margin-left: 62px;
  display: flex;
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