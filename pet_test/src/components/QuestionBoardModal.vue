<template>
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
    <div class="modal" :class="{ 'show': showQnaModal }">
		<div class="modal-dialog">
			<div class="modal-content">
				<!-- 모달 내용 -->
				<section class="modal-top">
					<!-- <a v-for="(tag, index) in tags" :key="tag.id">{{ selectedPost.tag }}</a> -->
					<br>
					<button type="button" class="btn-close ms-auto" aria-label="Close" @click="$emit('closeModal')"></button>
				</section>
				<section class="modal-header">
					<h5 class="modal-title"><p class="modal-title-icon">Q.</p> {{ this.selectedPost.title }}</h5>
					<div class="modal-title-writer-date">
						<p style="font-size: 1.5rem; font-weight: bold;"> 작성자: {{this.selectedPost.writer }}</p>
						<p style="font-size: 13pt; font-weight: bold;"> 작성일자: {{ this.selectedPost.createdAt }}</p>
					</div>
				</section>
				<section class="modal-body1">
					<div>
					    <p clas="modal-body1-p" style="font-size: 17pt; overflow-y: auto;">{{ this.selectedPost.content }}</p>
					</div>
                </section>
                <section class="modal-body2">
                    <div id="carouselExample" class="carousel slide">
				    	<div class="carousel-inner" ref="itemsCarousel">
                            <div v-for="(image, index) in images" :key="image.id" :class="['carousel-item', index === imageIndex ? 'active' : '']">
                                <img :src="image.src" class="img d-block w-100" alt="...">
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
                    <h2> 댓글 </h2>
                    <div class="comment-container">
                        <div class="comment-card" v-for="comment in comments" :key="comment">
					    	<p class="writer" style="font-size: 15pt; font-weight: bold;">{{ comment.writer }}</p>
					    	<p class="content" style="font-size: 13pt;">{{ comment.content }}</p>
					    </div>
                    </div>
                    <nav class="Pagination" aria-label="...">
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
                    <div class="comment-input-container">
                        <textarea class="comment-input" type="text" placeholder="댓글을 입력해 주세요 (최대 300글자)" v-model="commentInput"></textarea>
                        <button type="submit" class="btn btn-primary"> <i class="fas fa-paper-plane"></i> </button>
                    </div>
                    <br>
                </section>
			</div>
		</div>
	</div>
</template>


<script>
export default ({
   data() {
     return {
       commentInput: '',
       maxLength: 300,  // 원하는 최대 글자수를 설정해주세요.
       imageIndex: 0,
       comments : []
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
     }
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
    width: 100%;
    max-width: 1400px; /* 모달의 최대 너비를 지정합니다. */
    height: 100%;
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
.modal-header {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0.5rem;
    border-bottom: 1px solid #dee2e6;
    background-color: #f7f7f7;
    margin-top: 15px;
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
    color: #61bffd;
    font-weight: bold;
    margin-right: 5px;
}
.modal-title-writer-date {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
.modal-body1 {
    position: static;
    margin: auto; /* 가로 가운데 정렬 */
    top: 50%; /* 수직 가운데 정렬 */
    transform: translateY(5px); /* 수직 가운데 정렬 */
    overflow-y: auto; /* 스크롤 기능 추가 */
    max-height: 90vh; /* 높이 제한을 늘립니다. */
    max-width: 1350px;
}

/* 캐러셀 스타일링 */
.modal-body2 {
    position: static; /* 위치 고정 */
    top: 40%; /* 상단에 고정 */
    margin-top: 15px;
}
.carousel-inner {
    display: flex;
    width: 300vw;
    transition: all 3s;
    justify-content: center;
    align-items: center; /* 이미지를 수직 및 수평 중앙으로 정렬 */
    height: 100%; /* 부모 요소의 높이에 맞게 설정합니다. */
}
.carousel-item {
    width: 80vh !important;
}
.w-100 {
    position : static;
    width: 35% !important;
    height: auto; 
    transform: translateX(-325px); /* 수직 가운데 정렬 */
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
    left: 300px; /* 좌측에서부터 0 위치 */
}
.carousel-control-next {
    right: 300px; /* 우측에서부터 0 위치 */
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
    display: flex;
    align-items: center;
    justify-content: flex-end;
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
    padding: 0.5rem 0.5rem;
    margin: 0rem 1rem -0.5rem auto; /* 오른쪽 마진을 조절합니다. */
}

.modal-comment {
    position: relative;
    margin-top: 0; /* 원하는 여백을 설정하세요 */
    left: 50%;
    width: 800px;
    transform: translateX(-50%);
}
.comment-card {
    border-top: 0.5px solid black;
}
.writer {
    text-align: left;
    margin-bottom: 3px;
}
.content {
    margin-left: 40px;
    margin-top: 20px;
}
.comment-container {
    overflow-y: auto; /* 세로 스크롤이 필요할 때만 스크롤이 나타나도록 설정합니다. */
    max-height: 280px;
}
.comment-input {
    overflow-y: auto; /* 세로 스크롤이 필요할 때만 스크롤이 나타나도록 설정합니다. */
    height: 5rem;
}
.comment-input-container {
    display: flex;
    justify-content: end;
}
.Pagination {
    display: flex;
    justify-content: center;
}
</style>