<template>
    <body>
        <div class="card-first">
        </div>
        <div class="background-image">
            <div class="card">
                <div class="card-list-container">
                    <div>
                        <header>
                            <div class="title-image">
                                <img src="../assets/images/banner3.png" alt="Banner" class="banner-image">  
                                <h1>반려동물 기록 일지</h1>
                            </div>
                            <div class="row mt-1" id="filter-buttons">
                                <div class="col-12">
                                    <button class="btn mb-2 me-1 active" data-filter="all" onclick="location.href='/diary'">
                                        <img src="../assets/images/gallery.png" alt=""> 갤러리로 보기
                                    </button>
                                    <button class="btn mb-2 mx-1" data-filter="nature" onclick="location.href='/calendar'">
                                        <img src="../assets/images/calendar1.png" alt=""> 캘린더로 보기
                                    </button>
                                </div>
                            </div>
                        </header>
                    </div>
                    <div class="card-list-wrapper">
                        <div class="card-list">
                            <div v-for="diary in currentPagePosts" :key="diary.diaryId" class="card-item" @click.prevent="goTocarousel(diary.diaryId)">
                                <img :src="diary.imgPath" alt="Card Image">
                                <span class="name">{{ diary.petName }}</span>
                                <span class="developer">{{ diary.createdAt ? diary.createdAt.split('T')[0] : 'No date' }}</span>
                                <h3 class="dogcontent">{{ diary.title }}</h3>
                            </div>
                        </div>
                    </div>
                    <div class="pagination">
                        <button class="page-link" @click="goToPreviousPage">«</button>
                        <button class="page-link" v-for="n in displayedPages" :key="n" :class="{ 'current-page-link': n === currentPage }" @click="goToPage(n)">{{ n }}</button>
                        <button class="page-link" @click="goToNextPage">»</button>
                    </div>
                    <div class="card-list-wrapper">
                        <div class="card-list">
                            <div v-for="dog in diary" :key="dog" class="card-item" @click.prevent="goTocarousel(dog.diaryId)">
                                <!-- <a :href="'/carousel'"> 클릭시 /carousel 경로로 이동하고, dog의 id를 query parameter로 전달 -->
                                    <img :src="dog.imgPath" alt="Card Image">
                                    <span class="name">{{dog.petName}}</span>
                                    <span class="developer">{{dog.createdAt.split('T')[0]}}</span>
                                    <h3 class="dogcontent">{{ dog.title }}</h3>
                                <!-- </a> -->
                            </div>
                        </div>
                    </div>        
                </div>
                <div class="pagination">
                    <button class="page-link">«</button>
                    <button class="page-link" v-for="n in maxpage" :key="n" @click="currentSwap(n)">{{ n }}</button>
                    <button class="page-link">»</button>
                </div>
            </div>
        </div>
    </body>
</template>
    
<script scoped>
export default {
    data() {
        return {
          maxpage : 5,
          currentPage: 1, // 현재 페이지를 추적하는 데이터 추가
          itemsPerPage: 12, // 페이지당 아이템 수// Total number of items in your data
          diary: []
        };
    },
    computed: {
            // 현재 페이지의 시작 인덱스
            startIndex() {
                return (this.currentPage - 1) * this.itemsPerPage;
            },
            // 현재 페이지의 끝 인덱스
            endIndex() {
                return Math.min(this.currentPage * this.itemsPerPage, this.diary.length);
            },
            // 현재 페이지에 표시할 데이터
            currentPagePosts() {
                return this.diary.slice(this.startIndex, this.endIndex);
            },
            // 전체 페이지 개수
            pageCount() {
                return Math.ceil(this.diary.length / this.itemsPerPage);
            },
            displayedPages() {
                const totalPages = Math.ceil(this.diary.length / this.itemsPerPage);
                let startPage;
                let endPage;
                if (this.currentPage <= 3) {
                    startPage = 1;
                    endPage = Math.min(totalPages, 5);
                } else if (this.currentPage >= totalPages - 2) {
                    startPage = Math.max(1, totalPages - 4);
                    endPage = totalPages;
                } else {
                    startPage = this.currentPage - 2;
                    endPage = this.currentPage + 2;
                }
                const displayedPages = [];
                for (let i = startPage; i <= endPage; i++) {
                    displayedPages.push(i);
                }
                return displayedPages;
            },
        },
    methods: {
        goToPage(n) {
            this.currentPage = n;
        },
        // 이전 페이지로 이동하는 함수
        goToPreviousPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        // 다음 페이지로 이동하는 함수
        goToNextPage() {
            if (this.currentPage < this.pageCount) {
                this.currentPage++;
            }
        },
        goTocarousel(diaryId) {
            this.$cookies.set('diaryId', diaryId);
            this.$router.push('/carousel');
        },
    },
    mounted() {
    if (!this.$cookies.get("id")) {
	    alert("로그인이 필요합니다.");
	    this.$router.push('/login');
	    return;
	}
    const cachedUrl = localStorage.getItem('diaryImage');

    console.log('diaryImage')
    if (!cachedUrl) {
        this.axios.get(`/api/myinfo/getMainImage/${this.$cookies.get("id")}`)
            .then((res) => {
                console.log(this.$cookies.get("id"));
                console.log(res.data);
                this.diary = res.data;
                
                // 이미지 데이터를 JSON 형식으로 변환하여 localStorage에 저장
                localStorage.setItem('diaryImage', JSON.stringify(res.data));
            })
            .catch((error) => {
                console.error('이미지 가져오기 오류:', error);
            });
    } else {
        // localStorage에서 이미지 데이터를 가져올 때는 파싱하여 사용
        this.diary = JSON.parse(cachedUrl);
        console.log(cachedUrl);
        }
    }
};
</script>
<style scoped>
/* Importing Google font - Open Sans */
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&display=swap');
@font-face {
    font-family: 'Ownglyph_meetme-Rg';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2402_1@1.0/Ownglyph_meetme-Rg.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
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

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Ownglyph_meetme-Rg';
}
.background-image{
    background-image: url(../assets/images/동물들배경.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center top;
    height: 100%;
    background-position: 50% 30%;
    margin-top: 10px;

}

.card {
    width: 50%;
    height: 65%;
    margin: 70px auto 70px auto;
    padding: 0px;
    border: 1px solid #eee;
    display: inline-block;
    border-radius: 10px;
    background: #fff;
    box-shadow: 0 2px 12px rgba(0,0,0,0.1);
  }

  .title-image {
    align-content: center;
  }

.col-12{
    margin-left: 25px;
}

.dogcontent{
    font-family: 'Ownglyph_meetme-Rg';
}

h1 {
    margin-top: 1rem;
    margin-bottom: 2rem;
    font-family: 'Ownglyph_meetme-Rg';
    font-size: 40px;
}

.card-first{
    margin-top: 100px
}

.card-list-container {
    display: inline-block;
    background-color: #fff;
    /* flex-wrap: nowrap; 옆으로 넘치는 요소들은 줄바꿈하지 않음 */
    /* overflow-x: auto; 요소들이 넘칠 경우 스크롤바를 표시 */
    padding-top: 20px;
    margin-top: 10px;

}


.header-title h1 {
    display: inline-block;
    vertical-align: middle; 
}

.header-title > img {
    vertical-align: middle;
}


.card-list-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
}

.card-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    max-width: 1250px;
    padding: 20px;
    gap: 10px;
    flex-wrap: wrap;
    padding-bottom: 10px;
}

.btn img {
    max-width: 20px;
    max-height: 50px;
}
#filter-buttons{
  margin-top: 40px;
  margin-bottom: 20px;
}
#filter-buttons button {
  border-radius: 3px;
  background: #fff;
  border-color: transparent;
  font-family: 'Ownglyph_meetme-Rg';
  width: 120px;
  height: 25px;
  font-size: 15px;
  
}


#filter-buttons button:hover {
  background: #ddd;
}

#filter-buttons button.active {
    color: #fff;
  background: #74b1e7;
}
#filter-buttons button{
  color: #000;
  background: #fff;
  margin: 0px;
  padding:0px;
}
.card-item {
    margin-right: 10px; /* 카드 사이의 간격 조절 */
    flex-grow: 1; /* 모든 공간을 차지하도록 설정 */
    /* width: 300px; */ /* width 속성 제거 */
    max-width: calc(100% - 10px); /* 카드의 최대 너비 설정 */
}

.card-list .card-item {
    background: #fff;
    padding: 5px;
    border-radius: 8px;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.04);
    list-style: none;
    cursor: pointer;
    text-decoration: none;
    border: 2px solid transparent;
    transition: border 0.5s ease;
    
}

.card-list .card-item:hover {
    border: 2px solid #ccf0f5
}

.card-list .card-item img {
    width: 100%;
    aspect-ratio: 16/9;
    border-radius: 4px;
    object-fit: cover;
}
.card-item img {
    width: 100%; /* 이미지가 카드 안에 꽉 차도록 조절 */
}

.card-list span {
    display: inline-block;
    background: #e6fcff;
    margin-top: 32px;
    padding: 8px 15px;
    font-size: 0.75rem;
    border-radius: 30px;
    font-weight: 600;
}

.card-list .name{
    background-color: #f1fdff; 
    color: #034c7c;
    background-size: 10px;
    border-radius: 15px;
    margin-right: 5px;
}

.card-list .developer {
    background-color: #f1fdff; 
    color: #034c7c;
    background-size: 10px;
    border-radius: 15px;
}   

.card-list .designer {
    background-color: #d1e8ff;
    color: #2968a8;
}

.card-list .editor {
    background-color: #d6f8d6; 
    color: #205c20;
}

/* .card-item h3 {
    color:rgb(102, 100, 100);
    font-size: 1.438rem;
    margin-top: 28px;
    font-weight: 600;
} */

.card-item .arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    transform: rotate(-35deg);
    height: 40px;
    width: 40px;
    color: #000;
    border: 1px solid #000;
    border-radius: 50%;
    margin-top: 40px;
    transition: 0.2s ease;
}

.card-list .card-item:hover .arrow  {
    background: #66d4ff;
    color: #fff; 
}
a{
    color: #a7d3f3;
}
#app{
    margin-top: 0%;
}

#filter-buttons button {
  cursor: pointer; /* 손가락 모양의 커서로 설정 */
}

.pagination {
    display: flex;
    justify-content: center;
    gap: 2px;
    margin-top: 20px;
	margin-bottom: 20px;
}

.page-link {
    font-family: 'Ownglyph_meetme-Rg';
    width: 36px;
    height: 36px;
    border: none;
    background-color: transparent;
    color: #333;
    padding: 5px 10px;
    border-radius: 50%;
    cursor: pointer;
}

.page-link:hover {
    background-color: #f0f0f0;
}

.current-page-link {
    border: 1px solid #e0e0e0;
}

@media (max-width: 1200px) {
    .card-list .card-item {
        padding: 15px;
    }
}

@media screen and (max-width: 980px) {
    .card-list {
        margin: 0 auto;
    }
}

</style>