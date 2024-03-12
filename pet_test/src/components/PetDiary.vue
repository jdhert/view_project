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
                                        <h1>반려동물 기록 일지</h1></div>
                                <div class="row mt-1" id="filter-buttons">
                                    <div class="col-12">
                                        <button class="btn mb-2 me-1 active" data-filter="all" onclick="location.href='/diary'"><img src="../assets/images/gallery.png" alt="">  갤러리로 보기</button>
                                        <button class="btn mb-2 mx-1" data-filter="nature" onclick="location.href='/calendar'" ><img src="../assets/images/calendar1.png" alt="">  캘린더로 보기</button>
                                    </div>
                                </div>
                            </header>
                        </div>
                        <div class="card-list-wrapper">
                            <div class="card-list">
                                <div v-for="dog in diary" :key="dog" class="card-item">
                                    <a href="#">
                                        <img src="../assets/images/puppy1.jpg" alt="Card Image">
                                        <span class="name">{{dog.petName}}</span>
                                        <span class="developer">{{dog.createdAt.split('T')[0]}}</span>
                                        <h3 class="dogcontent">{{ dog.title }}</h3>
                                    </a>
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
            currentPage: 1,
            itemsPerPage: 12, // Number of items per page
            totalItems: 100, // Total number of items in your data
            id: 25,
            diary: [

            ]
        };
    },
    computed: {
        totalPages() {
            return Math.ceil(this.totalItems / this.itemsPerPage);
        }
    },
    methods: {
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },
    },
    mounted(){
        this.axios.get(`/api/myinfo/diary/${this.id}`).then((res) => {
            this.diary = res.data;
        }).catch();
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
    height: 70vh;
    background-position: 50% 30%;
    margin-top: 10px;

}
/* .background-image:before{
    content: '';
    position: absolute;
    left: 50%;
    top: 0%;
    transform: translateX(-50%);
    width: 100%;
    height: 69vh;
    background: rgba(64, 72, 80, 0.25);
    margin-top: 100px;
} */
.card {
    width: 50%;
    height: 65%;
    position: relative; 
    top: 80px;
    z-index: 1;
    margin: 0 auto;
    padding: 0px;
    border: 1px solid #eee;
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