<template>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <div class="modal" :class="{ 'show': showQnaModal }">
		<div class="modal-dialog">
			<div class="modal-content">
				<!-- 모달 내용 -->
				<section class="modal-top">
					<br>
                    <span class="tag" :class="getTagClass(selectedPost.category)">{{selectedPost.category }}</span>
					<button type="button" class="btn-close ms-auto" aria-label="Close" @click="$emit('closeModal')"></button>
				</section>
				<section class="modal-header">
					<h6 class="modal-title" style="font-size: 20pt"><p class="modal-title-icon">Q.</p> {{selectedPost.title}}</h6>
					<div class="modal-title-writer-date">
						<p style="font-size: 13pt; font-weight: bold; margin-bottom: -5px;"> 작성자: {{selectedPost.writer}}</p>
						<p style="font-size: 10pt; font-weight: bold; margin-bottom: -5px;"> 작성일자: {{ selectedPost.createdAt }}</p>
					</div>
                    <div class="hashtags" style="display: flex; flex-wrap: wrap;">
                      <a  v-for="tag of tags" style=" margin: 3px;" href="#" @click="emitTagSearch(tag)" >{{ '#' +tag }}</a>
                    </div>
                    <div class="like-view">
                        <div class="like" @click="handleLike">좋아요 {{ this.selectedPost.likeCount }} <i class="far fa-heart"></i></div>
                        <div class="view-count" style="margin-left: 15px;">조회수 {{ this.selectedPost.viewCount }} <i class="fas fa-eye"></i></div>
                    </div>
				</section>
				<section class="modal-body1">
					<div>
					    <p clas="modal-body1" style="font-size: 13pt; overflow-y: auto;">{{this.selectedPost.content}}</p>
					</div>
                </section>
                <section class="modal-body2" :class="{ 'image-modal-open': showQnaImageModal }">
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
                </section>
                <br>
                <section class="modal-comment">
                    <h6 style="margin-bottom: 0; border-bottom: 1px solid black;"> 댓글 {{ comments.length }}개</h6>
                    <div class="comment-container">
                        <div class="comment-card" v-for="(comment, index) in comments" :key="index">
                            <div class="comment-header">
                                <p class="writer" style="font-size: 11pt; font-weight: bold;">{{ comment.name }}</p>
                                <div class="comment-button">
                                        <button class="content-btn1">댓글</button>
                                        <button class="content-btn2">댓글 수정</button>
                                        <button class="content-btn2">댓글 삭제</button>
                                </div>
                            </div>
                            <p class="comment-content" style="font-size: 11pt; margin-left: 50px;">{{ comment.content }}</p>
<!-- 대댓글 기능 아직 제대로 구현하지 못함: v-if로 대댓글이 있는 comment에 대해서만 details 태그 요소를 보여주도록 구현해야 하는데, 문제 직면 -->
                            <details class="detail-replies" @click="detailComments(comment.id)">
                                <summary style="font-size: 9.5pt;"> {{ detailCommentsList.length }}개 댓글</summary>
                                <div class="detail-comment" style="border-top: 0.5px solid black;" v-for="(detailComment, index) in detailCommentsList" :key="index">
                                    <div class="detail-comment-header">
                                        <p class="detail-comment-writer" style="font-size: 11pt; font-weight: bold;">{{ detailComment.name }}</p>
                                        <div class="detail-comment-button">
                                            <button class="content-btn1">댓글</button>
                                            <button class="content-btn2">댓글 수정</button>
                                            <button class="content-btn3">댓글 삭제</button>
                                        </div>
                                    </div>
                                    <p class="detail-comment-content" style="font-size: 11pt;">{{ detailComment.content }}</p>
                                </div>
                            </details>
					    </div>
                    </div>
                    <nav aria-label="...">
                      <ul class="pagination">
                        <li class="page-item disabled">
                          <a class="page-link">Previous</a>
                        </li>
                        <li class="page-item"><a class="page-link" href="#">1</a></li>
                        <li class="page-item active" aria-current="page">
                          <a class="page-link" href="#">2</a>
                        </li>
                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                        <li class="page-item">
                          <a class="page-link" href="#">Next</a>
                        </li>
                      </ul>
                    </nav>
                    <br>
                    <form class="comment-input-container" v-if="isLogin" @submit.prevent="addComment">
                        <textarea class="comment-input" type="text" placeholder="댓글을 입력해 주세요 (최대 300글자)" v-model="commentLine"></textarea>
                        <button type="submit" class="btn btn-primary"> <i class="fas fa-paper-plane"></i> </button>
                    </form>
                    <br>
                    <button v-if="showUpdate" type="button" class="btn btn-primary btn-edit-post" @click="goToEditPost">게시글 수정</button>
                    <button v-if="showUpdate" type="button" class="btn btn-primary btn-delete-post" @click="goToDeletePost">게시글 삭제</button>
                </section>
			</div>
		</div>
	</div>
</template>


<script>
import QuestionBoardImageModal from './QuestionBoardImageModal.vue';

export default ({
   components : {
       QuestionBoardImageModal
   },
   data() {
     return {
       commentInput: '',
       maxLength: 300,  // 원하는 최대 글자수를 설정해주세요.
       imageIndex: 0,  // 현재 보여지는 이미지의 인덱스
       tags: [],
       comments: [],
       detailCommentsList: [],
       showUpdate : false,
       showQnaImageModal : false,
       selectedImage: {}
     }
   },
   watch: {
     commentInput(value) {
       if (value.length > this.maxLength) {
         this.commentInput = value.slice(0, this.maxLength);
       }
     }
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
     goToEditPost() {
        this.$cookies.set('boardId', this.selectedPost.id);
        this.$router.push(`/editqna`);
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
     addComment(){
        this.axios.post('/api/comment', {
          content : this.commentLine,
          id : this.selectedPost.id,
          userId : this.$cookies.get('id'),   
        }).then(() => {
          this.commentLine = "";
          this.axios.get(`/api/comment/${this.selectedPost.id}`).then((res) => {
            this.comments = res.data;
            }).catch();
        }).catch();
     },
     detailComments(id) {
        this.axios.get(`/api/comment/detailcomment`,{
            params: {
                parentCommentId: id,
                id: this.selectedPost.id
            }
        }).then((res) => {
          this.detailCommentsList = [];
          this.detailCommentsList = res.data;
        }).catch();
     }
   },
   computed:{
        isMine() {
          return this.$cookies.get('id') == this.selectedPost.userId ? true : false;
        },
        isLogin() {
          return this.$cookies.isKey('id') ? true : false;
        },
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

        if (this.selectedPost.userId == this.$cookies.get('id')) 
            return this.showUpdate = true;
    }
});
</script>

<style scoped>
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
    width: 70%;
    max-width: 1400px; /* 모달의 최대 너비를 지정합니다. */
    height: 90%;
    max-height: 1250px;
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

.tag {
    display: inline-block;
    padding: 3px 8px; /* 더 작은 내부 패딩을 지정합니다. */
    border-radius: 15px; /* 더 작은 border-radius를 적용합니다. */
    color: #fff;
    background-color: #007bff; /* 배경색을 지정합니다. */
    margin-left: 10px; /* 왼쪽 여백을 줄입니다. */
    font-size: 12px; /* 폰트 크기를 조정합니다. */
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

.modal-header {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0.5rem;
    border-bottom: 1px solid #dee2e6;
    background-color: #f7f7f7;
    margin-top: 15px;
    position: absolute;
    top: 20px;
    left: 0;
    width: 100%;
}

.modal-title {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0;
    font-size: 3rem;
    font-weight: bold;
}
.modal-title-icon {
    color: #34aaf8;
    font-weight: bold;
    margin-right: 5px;
}
.modal-title-writer-date {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
.like-view {
    display: flex;
    justify-content: flex-end;
}
.modal-body1 {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    overflow-y: auto; /* 스크롤 기능 추가 */
    height: 135px; /* 높이 제한을 늘립니다. */
    width: 95%; /* 너비 제한을 늘립니다. */
    margin: auto; /* 가로 가운데 정렬 */
}
/* 캐러셀 스타일링 */
.modal-body2 {
    position: relative; /* 위치 고정 */
    top: 36%;
    height: 125px;
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
    height: 125px;
    width: auto;
    object-fit: contain;
    transform: translateX(-50%); 
}
.carousel-control-prev,
.carousel-control-next {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 3rem; /* 이전/다음 버튼의 너비 조정 */
    height: 3rem; /* 이전/다음 버튼의 높이 조정 */
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
    font-size: 1.5rem; /* 아이콘 크기 조정 */
    color: #fff; /* 아이콘 색상 지정 */
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
.btn-close {
    z-index: 1;
    padding: 0.5rem 0.5rem;
    margin: 0rem 1rem -0.5rem auto; /* 오른쪽 마진을 조절합니다. */
}

.modal-comment {
    position: relative;
    top: 36%;
    left: 50%;
    width: 65%;
    transform: translateX(-50%);
    height: 270px;
}
.comment-card {
    border-top: 0.5px solid black;
}
.comment-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.comment-content {
    margin-left: 15px;
}
.comment-button > button.content-btn1 {
    margin-left: auto; /* 버튼을 가장 오른쪽으로 이동 */
    padding: 0.1rem 0.1rem; /* 버튼의 안쪽 여백을 더 줄입니다. */
    font-size: 0.7rem; /* 버튼 텍스트의 크기를 더 작게 조절합니다. */
    line-height: 0.5rem; /* 버튼 텍스트의 높이를 더 낮춥니다. */
    border-radius: 0.25rem; /* 버튼의 모서리를 둥글게 만듭니다. */
}
.comment-button > button.content-btn2 {
    margin-left: 3px; /* 버튼을 가장 오른쪽으로 이동 */
    padding: 0.1rem 0.1rem; /* 버튼의 안쪽 여백을 더 줄입니다. */
    font-size: 0.7rem; /* 버튼 텍스트의 크기를 더 작게 조절합니다. */
    line-height: 0.5rem; /* 버튼 텍스트의 높이를 더 낮춥니다. */
    border-radius: 0.25rem; /* 버튼의 모서리를 둥글게 만듭니다. */
}
.comment-button > button.content-btn3 {
    margin-left: 3px; /* 버튼을 가장 오른쪽으로 이동 */
    padding: 0.1rem 0.1rem; /* 버튼의 안쪽 여백을 더 줄입니다. */
    font-size: 0.7rem; /* 버튼 텍스트의 크기를 더 작게 조절합니다. */
    line-height: 0.5rem; /* 버튼 텍스트의 높이를 더 낮춥니다. */
    border-radius: 0.25rem; /* 버튼의 모서리를 둥글게 만듭니다. */
}
.writer {
    text-align: left;
    margin-bottom: 0px;
}
.comment-container {
    overflow-y: auto; /* 세로 스크롤이 필요할 때만 스크롤이 나타나도록 설정합니다. */
    height: 160px;

}
.comment-input {
    overflow-y: auto; /* 세로 스크롤이 필요할 때만 스크롤이 나타나도록 설정합니다. */
    height: 5rem;
    resize: none; /* 사용자가 크기를 조정하지 못하도록 설정합니다. */
}
.comment-input-container {
    position: relative;
    display: flex;
    justify-content: end;
    margin-top: 5px;
}
.detail-replies {
    margin-left: 50px;
    text-align: left;
}
.detail-comment {
  margin-left: 15px;
}
.detail-comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.detail-comment-writer {
    margin-bottom: 0;
}
.detail-comment-content {
  text-align: left;
  padding-top: 10px; /* 내용과 헤더 사이의 간격을 조정합니다. */
  margin-top: 0;
  margin-bottom: 0;
  padding-top: 0;
}
.detail-comment-button > button.content-btn1 {
    margin-left: 3px; /* 버튼을 가장 오른쪽으로 이동 */
    padding: 0.1rem 0.1rem; /* 버튼의 안쪽 여백을 더 줄입니다. */
    font-size: 0.7rem; /* 버튼 텍스트의 크기를 더 작게 조절합니다. */
    line-height: 0.5rem; /* 버튼 텍스트의 높이를 더 낮춥니다. */
    border-radius: 0.25rem; /* 버튼의 모서리를 둥글게 만듭니다. */
}
.detail-comment-button > button.content-btn2 {
    margin-left: 3px; /* 버튼을 가장 오른쪽으로 이동 */
    padding: 0.1rem 0.1rem; /* 버튼의 안쪽 여백을 더 줄입니다. */
    font-size: 0.7rem; /* 버튼 텍스트의 크기를 더 작게 조절합니다. */
    line-height: 0.5rem; /* 버튼 텍스트의 높이를 더 낮춥니다. */
    border-radius: 0.25rem; /* 버튼의 모서리를 둥글게 만듭니다. */
}
.detail-comment-button > button.content-btn3 {
    margin-left: 3px; /* 버튼을 가장 오른쪽으로 이동 */
    padding: 0.1rem 0.1rem; /* 버튼의 안쪽 여백을 더 줄입니다. */
    font-size: 0.7rem; /* 버튼 텍스트의 크기를 더 작게 조절합니다. */
    line-height: 0.5rem; /* 버튼 텍스트의 높이를 더 낮춥니다. */
    border-radius: 0.25rem; /* 버튼의 모서리를 둥글게 만듭니다. */
}

.pagination {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 2px;
    padding: 0.1rem 0.1rem; /* 버튼의 안쪽 여백을 더 줄입니다. */
    font-size: 0.7rem; /* 버튼 텍스트의 크기를 더 작게 조절합니다. */
    line-height: 0.5rem; /* 버튼 텍스트의 높이를 더 낮춥니다. */
    left: 30%;
    right: 30%;
}
.btn-edit-post {
    position: absolute;
    bottom: -25%;
    right: -25%;
}
.btn-delete-post {
    position: absolute;
    bottom: -9%;
    right: -25%;
}
</style> 