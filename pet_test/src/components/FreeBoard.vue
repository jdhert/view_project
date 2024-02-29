<template>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css">
    <section class="header d-flex align-items-center justify-content-between">
        <div class="d-flex align-items-center">
            <img class="p-2 square-image" src="../assets/images/icon3.png">
            <div class="p-2">
                <h2 style="font-family: 'continuous', self">펫스타그램 (Petstagram)</h2>
                <p style="font-size: 19px;">반려동물과의 일상을 사람들과 공유하세요</p>
            </div>
        </div>
        <div class="p-2 d-flex align-items-center">
            <form class="formTag d-flex" role="search">
                <div class="d-flex align-items-center">
                    <select class="searchSelect p-2">
                        <option selected>--검색 선택--</option>
                        <option value="1">제목</option>
                        <option value="2">내용</option>
                        <option value="3">작성자</option>
                    </select>
                    <input class="p-2" type="search" aria-label="Search">
                </div>
                <button class="searchButton p-2" type="submit">검색</button>
            </form>
        </div>
    </section>
    <section class="page-section bg-light" id="portfolio">
        <br>
        <div class="container">
            <div class="text-center">
                <h2 style="font-weight: bold;">실시간 인기 글</h2>
            </div>
            <br>
            <div class="row">
                <div class="col-md-3">
                    <!-- Portfolio item 1-->
                    <div class="card" style="width: 18rem; height: 23rem;">
                        <img src="../assets/images/corgi.jpg" class="card-img-top img1" alt="...">
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-center">
                                <div>
                                    <button class="btn" @click="toggleHeart"><i :class="heartClass"></i></button>
                                    <button class="btn"><i class="far fa-comment"></i></button>
                                    <button class="btn"><i class="far fa-paper-plane"></i></button>
                                </div>
                                <button class="btn" @click="toggleBookmark"><i :class="bookmarkClass"></i></button>
                            </div>
                            <h6 class="card-title">웰시코기의 눈빛이 설레는 순간들을 공유합니다</h6>
                            <p class="card-text">작성자: 코기</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <!-- Portfolio item 2-->
                    <div class="card" style="width: 18rem; height: 23rem;">
                        <img src="../assets/images/corgi.jpg" class="card-img-top img1" alt="...">
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-center">
                                <div>
                                    <button class="btn" @click="toggleHeart"><i :class="heartClass"></i></button>
                                    <button class="btn"><i class="far fa-comment"></i></button>
                                    <button class="btn"><i class="far fa-paper-plane"></i></button>
                                </div>
                                <button class="btn" @click="toggleBookmark"><i :class="bookmarkClass"></i></button>
                            </div>
                            <h6 class="card-title">웰시코기의 눈빛이 설레는 순간들을 공유합니다</h6>
                            <p class="card-text">작성자: 코기</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <!-- Portfolio item 3-->
                    <div class="card" style="width: 18rem; height: 23rem;">
                        <img src="../assets/images/corgi.jpg" class="card-img-top img1" alt="...">
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-center">
                                <div>
                                    <button class="btn" @click="toggleHeart"><i :class="heartClass"></i></button>
                                    <button class="btn"><i class="far fa-comment"></i></button>
                                    <button class="btn"><i class="far fa-paper-plane"></i></button>
                                </div>
                                <button class="btn" @click="toggleBookmark"><i :class="bookmarkClass"></i></button>
                            </div>
                            <h6 class="card-title">웰시코기의 눈빛이 설레는 순간들을 공유합니다</h6>
                            <p class="card-text">작성자: 코기</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <!-- Portfolio item 4-->
                    <div class="card" style="width: 18rem; height: 23rem;">
                        <img src="../assets/images/corgi.jpg" class="card-img-top img1" alt="...">
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-center">
                                <div>
                                    <button class="btn" @click="toggleHeart"><i :class="heartClass"></i></button>
                                    <button class="btn"><i class="far fa-comment"></i></button>
                                    <button class="btn"><i class="far fa-paper-plane"></i></button>
                                </div>
                                <button class="btn" @click="toggleBookmark"><i :class="bookmarkClass"></i></button>
                            </div>
                            <h6 class="card-title">웰시코기의 눈빛이 설레는 순간들을 공유합니다</h6>
                            <p class="card-text">작성자: 코기</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <br>
    </section>
    <br>

    <div v-if="showModal" class="modal" tabindex="1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">하ㅏㅎ</h5>
          <button type="button" class="close" @click="closeModal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p>ㅋㅋ</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
        </div>
      </div>
    </div>
  </div>

    <section class="feed-container" style="width: 100rem;">
        <div class="cards">
          <div class="card" v-for="card in cards" :key="card.id" @click="openModal(card)">
            <div class="card-header">
              <img class="profile-pic" src="../assets/images/corgi.jpg" alt="user" />
              <div class="user-info">
                <div class="username">{{ card.username }}</div>
                <div class="post-time">{{ card.postTime }}</div>
              </div>
            </div>
            <img class="card-image" src="../assets/images/corgi.jpg" alt="post" />
            <div class="card-footer">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <button class="btn" @click="toggleHeart"><i :class="heartClass"></i></button>
                        <button class="btn"><i class="far fa-comment"></i></button>
                        <button class="btn"><i class="far fa-paper-plane"></i></button>
                    </div>
                    <button class="btn" @click="toggleBookmark"><i :class="bookmarkClass"></i></button>
                </div>
              <div class="description">{{ card.description }}</div>
            </div>
          </div>
        </div>
    </section>
    <br>
    <nav class="paginationTech" aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item"><a class="page-link" href="#">Previous</a></li>
        <li class="page-item"><a class="page-link" href="#">1</a></li>
        <li class="page-item"><a class="page-link" href="#">2</a></li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item"><a class="page-link" href="#">Next</a></li>
      </ul>
    </nav>
</template>
11:12
<script>
export default {
    data() {
        return {
            heartClicked: false,
            bookmarkClicked: false,
            showModal: true,
            selectedCard: "하하",
            cards: [
                // Fake data for the cards
                // {
                //   id: 1,
                //   username: 'doglover',
                //   userImage: '../assets/images/corgi.jpg',
                //   postTime: '2 hours ago',
                //   postImage: '../assets/images/corgi.jpg',
                //   likes: 321,
                //   description: 'Just a cute dog enjoying the sun!'
                // }
            ],
            pageCount: 1 // Assuming there are 1 pages for the pagination
        }
    },
    methods: {
        toggleHeart() {
            this.heartClicked = !this.heartClicked;
        },
        toggleBookmark() {
            this.bookmarkClicked = !this.bookmarkClicked;
        },
        openModal(card) {
            this.selectedCard = card;
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
        },
    },
    computed: {
        heartClass() {
            return this.heartClicked ? 'fas fa-heart' : 'far fa-heart';
        },
        bookmarkClass() {
            return this.bookmarkClicked ? 'fas fa-bookmark' : 'far fa-bookmark';
        }
    },
    goToPage(pageNumber) {
      // Logic to change the page
      console.log('Go to page', pageNumber);
    },
    mounted (){
        this.axios.get(`/api/free/${this.pageCount}`).then((res) => {
            for(let a of res.data){
                this.cards.push( { id : a.id, username: a.writer, userImage: '../asset/images/corgi.jpg',
                  postTime: a.createdAt,
                  postImage: 'dog-pic.jpg',
                  likes: a.likeCount,
                  description: a.content } )
            }
        })
    }
}
</script>
<style>
.header {
    margin-top: 85px;
}
.square-image {
    width: 75px; /* 이미지의 너비를 조절합니다. */
    height: 75px; /* 이미지의 높이를 너비와 동일하게 설정합니다. */
    object-fit: cover; /* 이미지를 자르지 않고 영역에 맞게 조절합니다. */
}
/* 검색창 구현 */
.formTag {
    border: 2px solid #000; /* 검정 테두리 설정 */
    border-radius: 75px; /* 모서리 둥글게 설정 */
    padding: 4px; /* 내부 여백 설정 */
    height: 50px;
}
.searchSelect {
    border-radius: 70px;
    width: 95px;
    z-index: 2;
    position: relative; /* 상대적 위치 설정 */
    height: 40px;
    font-size: 10pt;
}
input {
    border: 1px solid #F1F1F1;
    border-radius: -70px;
    width: 200px;
    height: 45px;
    z-index: 1;
    position: relative; /* 상대적 위치 설정 */
    height: 40px;
}
.searchButton {
    border-radius: 70px;
    z-index: 2;
    position: relative; /* 상대적 위치 설정 */
    margin-left: -5px; /* 좌측 마진을 음수 값으로 설정하여 요소를 겹치게 합니다. */
    height: 40px;
    font-weight: bold;
}
.page-section {
    background-image: url('../assets/images/activity_banner.jpg'); /* 배경 이미지 경로 지정 */
    background-size: cover; /* 배경 이미지를 커버하도록 설정 */
    background-position: center; /* 배경 이미지를 가운데로 정렬 */
    background-repeat: no-repeat; /* 배경 이미지 반복 없이 한 번만 표시 */
}
/* 버튼에 마우스 호버 시 약간 크기 변화 */
.btn:hover {
    transform: scale(1.1); /* 10% 크기 확대 */
    transition: transform 0.2s ease-in-out; /* 부드러운 애니메이션 적용 */
}
.card:hover {
    transform: scale(1.05);
    transition: transform 0.2s ease-in-out; /* 부드러운 애니메이션 적용 */
}
/* 작성자 텍스트 크기 조정 */
.card .card-text {
    font-size: 12px;
}
/* 하트 버튼 색상 조절 */
button.btn i.fa-heart {
    color: #EE2C8D;
}
button.btn i.fa-heart.far {
    color: #000;
}
/* 북마크 버튼 색상 조절 */
button.btn i.fa-bookmark {
    color: rgb(255, 0, 0);
}
button.btn i.fa-bookmark.far {
    color: #000;
}
.feed-container {
  max-width: 1000px;
  margin: 20px auto;
  padding: 0 20px;
}
.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-between;
}
.card {
  width: calc(33.333% - 20px);
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}
.card-header {
  padding: 10px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ddd;
}
.profile-pic {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-right: 10px;
}
.user-info {
  display: flex;
  flex-direction: column;
}
.username {
  font-weight: bold;
}
.post-time {
  color: #888;
  font-size: 0.8em;
}
.card-image {
  width: 100%;
  display: block;
  height: auto;
}
.card-footer {
  padding: 10px;
  background: #F8F8F8;
}
.likes {
  font-weight: bold;
  margin-bottom: 5px;
}
.description {
  color: #555;
}
.paginationTech {
    display: flex;
    justify-content: center;
    margin-top: 20px; /* 필요한 경우 상단 여백 조정 */
}
</style>
