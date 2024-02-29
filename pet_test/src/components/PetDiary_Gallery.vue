<template>
    <body>
  <span style = " font-size:4em; font-weight: bolder;  font-family: 'GoryeongStrawberry';  color: #70b6f7;">
나의 기록장
</span><img src="../assets/images/발자국2.png" alt="이미지">
  
    <div class="container">
      <!-- Images Filter Buttons Section -->
      <div class="row mt-1" id="filter-buttons">
        <div class="col-12">
          <button class="btn mb-2 me-1 active" data-filter="all"><img src="../assets/images/gallery.png" alt="">갤러리로 보기</button>
          <button class="btn mb-2 mx-1" data-filter="nature"><img src="../assets/images/calendar.png" alt="">캘린더로 보기</button>
        </div>
        
      </div>
      <hr class="hr">
      <div class="col-md-6">
    <div class="mydiray-tag">반려동물 기록장</div>
    </div>
      
      <!-- Filterable Images / Cards Section -->
      <div class="row px-2 mt-4 gap-3" id="filterable-cards">
        <div v-for="diray in 24" :key="index" class="card p-0" data-name="nature">
          <img src="../assets/images/puppy1.jpg" alt="img">
          <!-- <div class="card-body">
            <h6 class="card-title">2024-02-27</h6>
            <p class="card-text">산책나가서 실컷 뛰어 논 날</p>
          </div> -->
          <div class="text p-4">
              	<div class="meta mb-2">
                  <div><a href="#">2024-02-28</a></div>
                  <div><a href="#">뽀삐</a></div>
                  <div><a href="#" class="meta-chat"></a></div>
                </div>
                <h3 class="heading"><a href="#">산책 나가서 실컷 논 날</a></h3>
              </div>
        </div>
      </div>
    </div>
    <div>
    <!-- 데이터를 표시할 영역 -->
    <div v-for="item in paginatedData" :key="item.id">
      <!-- 아이템을 여기에 표시 -->
      {{ item }}
    </div>

    <!-- 페이지네이션 버튼 -->
    <div>
      <button @click="prevPage">이전</button>
      <span>{{ currentPage }}</span>
      <button @click="nextPage">다음</button>
    </div>
  </div>
  </body>

</template>
<script>
export default {
  data() {
    return {
      items: [], // 표시할 아이템들의 배열
      itemsPerPage: 10, // 페이지당 아이템 수
      currentPage: 1 // 현재 페이지 번호
    };
  },
  computed: {
    // 현재 페이지에 해당하는 아이템들을 계산하는 computed 속성
    paginatedData() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.items.slice(start, end);
    }
  },
  methods: {
    // 이전 페이지로 이동하는 메서드
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    // 다음 페이지로 이동하는 메서드
    nextPage() {
      if (this.currentPage < Math.ceil(this.items.length / this.itemsPerPage)) {
        this.currentPage++;
      }
    }
  }
};
</script>

<style scoped>
/* Import Google font - Poppins */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');
@font-face {
    font-family: 'SOYOMapleBoldTTF';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2310@1.0/SOYOMapleBoldTTF.woff2') format('woff2');
    font-weight: 700;
    font-style: normal;
}
@font-face {
    font-family: 'Ownglyph_meetme-Rg';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2402_1@1.0/Ownglyph_meetme-Rg.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}
@font-face {
    font-family: 'BagelFatOne-Regular';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_JAMO@1.0/BagelFatOne-Regular.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}
@font-face {
    font-family: 'GoryeongStrawberry';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-01@1.0/GoryeongStrawberry.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}

body{
    margin-top: 8%;
}

* {
  font-family: "Poppins", sans-serif;
}

body {
  background: #fffefe !important;
}

body .container {
  max-width: 1100px;
}

.col-md-6{
  padding-left: 0%;
}

.hr{
  margin-top: 10px;
  margin-bottom: 10px;
  
}
.px-2 {
  margin-top: 10px;
}

.mydiray-tag {
  width: 180px;
  height: 30px;
  text-align: center;
  background-color: #a7d3f3;
  border-radius: 15px; /* 30px의 높이를 고려하여 절반값으로 지정 */
  font-family: 'SOYOMapleBoldTTF';
  color: white;
  font-size: 20;
}

.card img {
    max-width: 200px;
    max-height: 200px;
}

.btn img {
    max-width: 20px;
    max-height: 50px;
}

#filter-buttons button {
  border-radius: 3px;
  background: #fff;
  border-color: transparent;
  font-family: 'Ownglyph_meetme-Rg';
  width: 160px;
  height: 45px;
  font-size: 25px;
}


#filter-buttons button:hover {
  background: #ddd;
}

#filter-buttons button.active {
  color: #fff;
  background: #6c757d;
}

#filterable-cards .card {
  width: 15rem;
  border: 2px solid #6c757d
  ;
}

#filterable-cards .card.hide {
  display: none;
}

@media (max-width: 600px) {
  #filterable-cards {
    justify-content: center;
  }

  #filterable-cards .card {
    width: calc(100% / 2 - 10px);
  }
}

</style>