<template>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
  <body id="body1">
  <section id="banner">
      <div class="inner">
  			<h2>내 반려동물과 같이 갈 수 있는 곳</h2>
  			<p>반려동물과 함께하는 활동들을 손쉽게 찾아보아요</p>
  		</div>
  </section>

  <h1>{{ this.user}}님을 위한 추천 장소</h1>
  <div id="map"></div>
  <br>
  <div class="act_info">
    <div class="recommend-carousel-container">
      <button @click="scrollRecoLeft" class="carousel-control left">&#60;</button>
      <div class="carousel-items" ref="recommendCarousel">
        <div v-for="product in products" :key="product.id" class="product">
          <div class="product-image">
            <img :src="product.img" alt="준비중">
          </div>
          <div class="product-info">
            <h3>{{ product.name }}</h3>
            <p class="rating">★★★★★ {{ product.rating }}</p>
            <p class="price">{{ product.price }}</p>
          </div>
        </div>
        <div id="loadingIndicator" v-show="mapLoading">
            <img src="../assets/images/loading_spinner.gif" alt="로딩 중..."/>
          </div>
        </div>
      <button @click="scrollRecoRight" class="carousel-control right">&#62;</button>
    </div>
  </div>
  <br>

  <div id="app">
    <header class="site-header">
      <h1>{{ this.user}}님을 위한 검색 상자</h1>
      <br>
      <div>
        <div class="search-bar" style="display: flex; align-items: center;">       
          <form @submit.prevent="searching">
              <input type="search" class="search-input"  placeholder="검색어를 입력할거냥" v-model="search">
              <input type="submit" class="search-button" value="검색">
          </form>
        </div>
        <br>
        <button class="region-btn" @click="selectRegion"> 지역 선택 </button>
        <div class="detail-region-btn" :class="{ 'show': showDetailRegion }">
          <div class="box">
            <div class="box-title">
              <p style="margin: 0; font-weight: bold; font-size: 1.2rem; color: black;">분류</p>
            </div>
            <div class="box-list">
              <ul class="box-list-ul">
                <li @click="highlightRegion" v-for="(Region, index) in Regions" :key="index" style="margin-top: 0.15rem; margin-bottom: 0.15rem; padding: 0;">
                  {{ Region }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
    
    <br>

    <div class="category-items-carousel">
      <button @click="prevItem" class="category-carousel-button">&lt;</button>
      <div class="category-items" ref="categoryCarousel">
        <button v-for="(item, index) in visibleItems" :key="index" class="category-item" 
                :class="{ 'active': item.name === selectedCategory }">
          <h5 style="margin: 0;" @click.prevent="category(item.name)"> {{ item.name }} </h5>
        </button>
      </div>
      <button @click="nextItem" class="category-carousel-button"> &gt;</button>
    </div>

    <div class="carousel-container">
      <button @click="scrollLeft" class="carousel-control left">&#60;</button>
      <div class="carousel-items" ref="itemsCarousel">
        <div v-for="product in products" :key="product.id" class="product">
          <div class="product-image">
            <img :src="product.img" alt="준비중">
          </div>
          <div class="product-info">
            <h3>{{ product.name }}</h3>
            <p class="rating">★★★★★ {{ product.rating }}</p>
            <p class="price">{{ product.price }}</p>
          </div>
        </div>
        <div id="loadingIndicator" v-show="mapLoading">
            <img src="../assets/images/loading_spinner.gif" alt="로딩 중..."/>
          </div>
        </div>
      <button @click="scrollRight" class="carousel-control right">&#62;</button>
    </div>
  </div>
  <div class="row mt-5">
    <div class="col text-center">
        <div class="block-27">
          <ul>
              <li><a href="#" @click="currentSwap(this.currentPage-1)">&lt;</a></li>
              <li><a href="#"  v-for="n in this.numbers" :key="n" @click="currentSwap(n)" style="margin: 5px;">{{ n }}</a></li>
              <li><a href="#" @click="currentSwap(this.currentPage+1)">&gt;</a></li>
          </ul>
        </div>
      </div>
  </div>
</body>
</template>

<script>
export default {
  data(){
	return {
    currentIndex: 0,
    itemsPerPage: 5,
    activity : {},
		map : null,
		markers : [],
		latitude: 0,
		longitude : 0,
    user: "김아무개",
    items: [
        { name : "동물병원" },
        { name : "동물약국"},
        { name : "카페"},
        { name : "식당"},
        { name : "미용"},
        { name : "위탁관리"},
        { name : "반려동물용품"},
        { name : "여행지"},
        { name : "팬션"},
        { name : "호텔"},
        { name : "박물관"},
        { name : "미술관"},
        { name : "문예회관"}
    ],
      products: [  ],
      carouselResponsiveSettings: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          }
        }
      ],
      imgList: [],
      mapLoading: true,
      currentPage: 1,
      maxPage: 1,
      paginationLimit: 5,
      numbers : [],
      markerList: [],
      facilitiesCoordinates: [],
      ps: {},
      categoryList : [],
      showDetailRegion: false,
      Regions: ['전체', '강원도', '경기도', '경상남도', '경상북도', '광주광역시', '대구광역시', '대전광역시', '부산광역시', '서울특별시', '세종특별자치시', '울산광역시', '인천광역시', '전라남도', '전라북도', '제주특별자치도', '충청남도', '충청북도'],
      selectedRegion: null, // 선택된 항목을 저장하기 위한 변수
      selectedCategory: null, // 선택된 카테고리를 저장하는 데이터 필드
	  }
  },
  props: {
    msg: String
  },
  computed: {
    visibleItems() {
      return this.items.slice(this.currentIndex, this.currentIndex + this.itemsPerPage);
    }
  },
  async mounted() {
    if(this.$cookies.isKey('name'))
      this.user = this.$cookies.get('name');
  try {
    if ("geolocation" in navigator) {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {timeout: 10000});
      });

      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      console.log(this.latitude, this.longitude);
      this.markerList.unshift([this.latitude, this.longitude]);
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
    await this.surroundPlace(); 

    if (window.kakao && window.kakao.maps) {
      kakao.maps.load(() => {
        this.initMap();
      });
    } else {
      const script = document.createElement("script");
      script.onload = () => {
        kakao.maps.load(() => {
          console.log('test');
          this.initMap();
        });


      };
      script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=c2a63c53b4bb9f45634c727367987e63&autoload=false";
      document.head.appendChild(script);
    }
  } catch (error) {
    console.error('An error occurred:', error);
    alert(error.message);
  }
  await this.getList();
},
 methods: {
    async surroundPlace(){
      const res = await this.axios.get(`/api/data/locate`, {
          params: {
            lat: this.latitude,
            lon: this.longitude
          }});
      for(let a of res.data)
          this.markerList.push([a.위도, a.경도]);
    },
    async category(name) {
      this.showLoadingIndicator(true);
      try {
        const res = await this.axios.get(`/api/data/category`, {
          params: {
            category: name,
            page: 1
          }});
       this.categoryList = res.data;
       console.log(this.categoryList);
      } catch (error) {
        console.error('API 호출 중 오류 발생:', error);
      }
      this.products=[];
      const mapResponses = await Promise.all(this.categoryList.map(c => this.axios.get(`/googlemap?query=${encodeURIComponent(c.시설명)}&key=AIzaSyBUH1_H3djDNJeVGuUEwNlrc-fVOw_RKCs`)
        ));
        for (let i = 0; i < mapResponses.length; i++) {
          const mapRes = mapResponses[i];
          let imgset = "";
          for (let a of mapRes.data.results) {
            let lat = Number(this.activity.data[i].위도); 
            if (a.photos && a.photos.length > 0) {
              const photoRef = a.photos[0].photo_reference;
              if (mapRes.data.results.length > 1) {
                if (+lat.toFixed(3) === +a.geometry.location.lat.toFixed(3)) {
                  imgset = await this.fetchPhoto(photoRef); 
                  break; 
                }
              } else {
                imgset = await this.fetchPhoto(photoRef);
                break;
              }
            } else {
              imgset = a.icon;
              break;
            }
          }
          this.products.push({
             name: this.activity.data[i].시설명,
             rating: "5", 
             price: this.activity.data[i].지번주소,
             img: imgset
          });
        }
        this.getPageNumbers();
        this.showLoadingIndicator(false); 
        this.selectedCategory = name; // 현재 선택된 카테고리를 설정합니다.
    },
    getPageNumbers() {
        this.numbers = [];
        let startPage = Math.max(1, Math.floor((this.currentPage - 1) / this.paginationLimit) * this.paginationLimit + 1);
        let endPage = Math.min(startPage + this.paginationLimit - 1, this.maxPage);
        for (let i = startPage; i <= endPage; i++)
            this.numbers.push(i);   
    },
    showLoadingIndicator(show) {
      this.mapLoading = show;
      document.getElementById("loadingIndicator").style.display = show ? "block" : "none";
    },
    currentSwap(n) {
        this.currentPage = Math.max(1, Math.min(n, this.maxPage));
        this.getList(this.currentPage);
    },
    async getList(){
      this.products = [];
      this.showLoadingIndicator(true);
      try {
        const res = await this.axios.get(`https://api.odcloud.kr/api/15111389/v1/uddi:41944402-8249-4e45-9e9d-a52d0a7db1cc?page=${this.currentPage}&perPage=10&serviceKey=s2R60Aa%2BZ6BD0BTcH9dDSXbhLfcS63ozL8fJuc0gZ9D79b7i7GHuE6BYUq41Mulp5V%2Bi3%2FCEgGGUvv7S6cEJ9g%3D%3D`);
        // const res = await this.axios.get(`/api/data/${this.currentPage}`);
        this.activity = res.data;
        this.maxPage = this.activity.totalCount;
        // this.maxPage = this.activity[0].maxPage;
        console.log(this.activity);
        const mapResponses = await Promise.all(this.activity.data.map(c => this.axios.get(`/googlemap?query=${encodeURIComponent(c.시설명)}&key=AIzaSyBUH1_H3djDNJeVGuUEwNlrc-fVOw_RKCs`)
        ));
        for (let i = 0; i < mapResponses.length; i++) {
          const mapRes = mapResponses[i];
          let imgset = "";
          for (let a of mapRes.data.results) {
            let lat = Number(this.activity.data[i].위도); 
            if (a.photos && a.photos.length > 0) {
              const photoRef = a.photos[0].photo_reference;
              if (mapRes.data.results.length > 1) {
                if (+lat.toFixed(3) === +a.geometry.location.lat.toFixed(3)) {
                  imgset = await this.fetchPhoto(photoRef); 
                  break; 
                }
              } else {
                imgset = await this.fetchPhoto(photoRef);
                break;
              }
            } else {
              imgset = a.icon;
              break;
            }
          }
          this.products.push({
             name: this.activity.data[i].시설명,
             rating: "5", 
             price: this.activity.data[i].지번주소,
             img: imgset
          });
        }
        this.getPageNumbers();
        this.showLoadingIndicator(false); 
      } catch (error) {
        console.error(error);
      }
    },
  	initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 1,
      };
      this.map = new kakao.maps.Map(container, options);
      this.displayMarker(this.markerList);
    },
    displayMarker(markerPositions) {

      const numericPositions = markerPositions.map(pos => [Number(pos[0]), Number(pos[1])]);

        // const distances = markerPositions.map(position => {
          const distances = numericPositions.map(position => {
          const latDiff = position[0] - this.latitude;
          const lngDiff = position[1] - this.longitude;
           return {
             position,
             distance: Math.sqrt(latDiff * latDiff + lngDiff * lngDiff) 
           };
          });
       
        const sortedByDistance = distances.sort((a, b) => a.distance - b.distance);
        const closestPositions = sortedByDistance.slice(0, 10).map(item => item.position);
        
        if (this.markers.length > 0) {
          this.markers.forEach((marker) => marker.setMap(null));
        }

       
        // const positions = markerPositions.map(
        //     (position) => new kakao.maps.LatLng(...position)
        // );  

        // console.log(closestPositions);

        const positions = closestPositions.map(
          position => new kakao.maps.LatLng(...position)
        );
  
        if (positions.length > 0) {
          this.markers = positions.map(
              (position) =>
                  new kakao.maps.Marker({
                    map: this.map,
                    position,
                  })

          );

          const bounds = positions.reduce(
              (bounds, latlng) => bounds.extend(latlng),
              new kakao.maps.LatLngBounds()
          );

          this.map.setBounds(bounds);
                
        }

      	// var content = '<div class="overlay_info">';
        // content += '    <a href="https://place.map.kakao.com/747310627" target="_blank"><strong>1004 약국</strong></a>';
        // content += '    <div class="desc">';
        // content += '        <img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/place_thumb.png" alt="">';
        // content += '        <span class="address">제주특별자치도 제주시 구좌읍 월정리 33-3</span>';
        // content += '    </div>';
        // content += '</div>';
        
        var content = '<div class="customoverlay">' +
        '  <a href="https://place.map.kakao.com/747310627" target="_blank">' +
        '    <span class="title">현재 위치</span>' +
        '  </a>' +
        '  <div class="close" title="닫기"></div>' +
        '</div>';
      
  	    var position1 = positions[0]; 

  	    var customOverlay = new kakao.maps.CustomOverlay({
        	map: this.map,
        	position: position1,
        	content: content,
        	xAnchor: 0.5, 
          yAnchor: 1.1,
  	    });
    // for (var i = 0; i < positions.length; i ++) {
    //     // 마커를 생성합니다
    //     var marker = new kakao.maps.Marker({
    //         map: map, // 마커를 표시할 지도
    //         position: positions[i].latlng // 마커의 위치
    //     });
      
    //     // 마커에 표시할 인포윈도우를 생성합니다 
    //     var infowindow = new kakao.maps.InfoWindow({
    //         content: positions[i].content // 인포윈도우에 표시할 내용
    //     });
      
    //     // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
    //     // 이벤트 리스너로는 클로저를 만들어 등록합니다 
    //     // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
    //     kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
    //     kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
    // }
    },
    scrollRecoRight() {
      this.scrollRecoCarousel(1);
    },
    scrollRecoLeft() {
      this.scrollRecoCarousel(-1);
    },
    scrollRecoCarousel(direction) {
      const carousel = this.$refs.recommendCarousel;
      const scrollAmount1 = carousel.offsetWidth / 5; // Width of one item
      carousel.scrollBy({ left: direction * scrollAmount1, behavior: 'smooth' });
    },
    nextItem() {
      if (this.currentIndex < this.items.length - this.itemsPerPage) {
        this.currentIndex++;
      }
    },
    prevItem() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      }
    },
    scrollLeft() {
      this.scrollCarousel(-1);
    },
    scrollRight() {
      this.scrollCarousel(1);
    },
    scrollCarousel(direction) {
      const carousel = this.$refs.itemsCarousel;
      const scrollAmount2 = carousel.offsetWidth / 5; // Width of one item
      carousel.scrollBy({ left: direction * scrollAmount2, behavior: 'smooth' });
    },
    async fetchPhoto(photoReference) {
      const cachedUrl = localStorage.getItem(photoReference);
      if (cachedUrl) {
         return cachedUrl; // 캐시된 URL이 있으면 반환
       }
       // 캐시된 URL이 없으면 서버에서 이미지를 요청
       const photoRes = await this.axios.get(`/googleimg?maxwidth=400&photo_reference=${photoReference}&key=AIzaSyBUH1_H3djDNJeVGuUEwNlrc-fVOw_RKCs`, { responseType: 'blob' });
       const imgUrl = URL.createObjectURL(photoRes.data);
       // 새로운 이미지 URL을 로컬 스토리지에 저장
       localStorage.setItem(photoReference, imgUrl);
       return imgUrl;
    },
    selectRegion() {
      // selectRegion 메서드 대신 호출되는 toggleRegionVisibility 메서드 정의
      this.showDetailRegion = !this.showDetailRegion;
    },
    highlightRegion(event) {
      // 이전에 선택된 항목의 배경색 초기화
      if (this.selectedItem) {
        this.selectedItem.style.backgroundColor = '';
      }
      // 현재 선택된 항목의 배경색 변경
      event.target.style.backgroundColor = 'lightblue';
      // 현재 선택된 항목을 selectedItem에 저장
      this.selectedItem = event.target;
    }
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

.site-header {
  background-color: #f8f9fa; /* 배경색 */
  padding: 20px 40px; /* 상하 좌우 패딩 */
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1); /* 상단에 그림자 효과 */
}
.site-header h1 {
  color: #343a40; /* 제목 색상 */
}

.search-bar {
  display: flex;
  align-items: center;
  justify-content: space-between; /* 입력 요소와 버튼을 동시에 감싸는 컨테이너를 좌우로 분배 */
  width: 30vw; /* 원하는 너비로 조정하세요 */
  margin: 0 auto; /* 가운데 정렬 */
  border: 3px solid #4ea3ff; /* 테두리 추가 */
  border-radius: 50px; /* 테두리의 모양을 더 둥글게 만들기 위해 추가 */
  padding: 5px; /* 내부 여백 추가 */
  height: 6vh;
}
.search-input {
  text-align: center;  
  flex: 1; /* 나머지 공간을 모두 차지 */
  width: calc(30vw - 105px); /* 검색어 입력란 너비를 동적으로 조정합니다 */
  background: none;
  font-size: 20px;
  border-radius: 60px;
  border: none; /* 기본 테두리 제거 */
  padding: 5px; /* 내부 여백 추가 */
  outline: none; /* 포커스 효과 제거 */
}
.search-button {
  color: #ffffff;
  border: none;
  background-color: #8d8d8d;
  font-size: 1rem;
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
.detail-region-btn {
  display: none;
}
.detail-region-btn.show {
  border: 2px solid black; /* 검정 선(border) 스타일 적용 */
  width: 40%;
  display: flex;
  justify-content: center;
  margin: 0 auto; 
}
.box {
  display: flex; /* flex로 배치 */
  flex-direction: column;
  width: 100%;
  padding: 0;
  margin: 0;
}
.box-list {
  display: flex; /* flex로 배치 */
  justify-content: space-between;
}
.box-list > .box-list-ul {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0;
}
.box-list > .box-list-ul > li {
  width: 50%; /* 각 li 요소의 너비를 조정합니다. */
  margin-bottom: 10px; /* 각 li 요소 사이의 간격을 조정합니다. */
  height: 3vh;
}

.recommend-carousel-container {
  display: flex;
  align-items: center;
  margin: auto;
  position: relative;
  overflow: hidden;
  width: 95%;
}

.carousel {
  display: flex;
  justify-content: center;
  align-items: center;
}

.product-grid {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.rating {
  color: #ffa500; /* Gold color for ratings */
}

.price {
  color: #333;
}

#body1 #banner{
  height: 400px; 
  margin-bottom: 100px;
  background-image: url('../assets/images/activity_banner.jpg');
}

#map{
  width: 70vw; 
  height: 60vh; 
  margin: auto;
  border: solid;
  border-radius: 5%;
}

.category-items-carousel {
  display: flex;
  align-items: center;
  justify-content: center; /* 수평 가운데 정렬을 위한 속성 추가 */
  margin: 0 auto; /* 수평 가운데 정렬을 위한 margin 속성 추가 */
  position: relative;
}
.category-items {
  display: flex;
}
.category-item {
  width: 12vw; /* Width of each item, adjust as needed */
  border: 1px dashed #ccc;
  padding: 0.7%;
  margin: 2%;
  border-radius: 0.8rem;
}
.category-item:hover {
  color: white;
  background-color: #4ea3ff;
}
.category-item.active {
  color: white;
  background-color: #4ea3ff;
}
.category-carousel-button {
  background-color: rgba(0,0,0,0.5);
  color: #fff;
  border: none;
}

.carousel-container {
  display: flex;
  align-items: center;
  margin: auto;
  position: relative;
  overflow: hidden;
  width: 95%;
}
.carousel-items {
  display: flex;
  flex-wrap: nowrap; /* Prevent wrapping */
  overflow-x: hidden; /* Hide horizontal scrollbar */
  scroll-behavior: smooth;
  transition: transform 0.8s ease;
  height: 48vh;
  width: 90%;
  margin: 0 auto; /* 가운데 정렬을 위한 margin 속성 추가 */
}
.product {
  min-width: calc(20% - 20px); /* 캐러셀 아이템의 최소 너비 설정 */
  max-width: calc(20% - 20px); /* 캐러셀 아이템의 최대 너비 설정 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
  margin: 10px; /* 마진 설정 */
  overflow: hidden; /* 오버플로우 숨기기 */
  border-radius: 8px; /* 모서리를 둥글게 */
  object-fit: contain; /* 이미지가 비율을 유지하면서 컨테이너에 맞도록 설정 */
}
.product:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); /* 호버 시 그림자 효과 */
  transform: translateY(-5px); /* 호버 시 약간 위로 이동 */
}
.product-image > img {
  width: 100%; /* 이미지의 너비를 부모 요소에 맞게 100%로 설정 */
  height: auto; /* 높이를 자동으로 조정하여 이미지 비율을 유지 */
  max-height: 20vh; /* 최대 높이를 viewport 높이의 10%로 제한 */
  background-color: #ddd; /* Placeholder color */
  margin-bottom: 10px;
  display: block;
}
.product-info {
  padding: 15px;
  background-color: #fff;
}

.carousel-control {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0,0,0,0.5);
  color: #fff;
  border: none;
  cursor: pointer;
  padding: 10px 15px;
  font-size: 18px;
  user-select: none;
}
.carousel-control.left {
  left: 10px;
}
.carousel-control.right {
  right: 10px;
}

#loadingIndicator {
  position: absolute; /* 절대 위치 */
  top: 50%; /* 부모 요소의 세로 중앙 */
  left: 50%; /* 부모 요소의 가로 중앙 */
  transform: translate(-50%, -50%); /* 요소의 중심을 기준으로 가운데 정렬 */
}
#loadingIndicator > img {
  height: 35vh;
}

/* Add some more specific selectors for the rating and price if needed */
.product .rating,
.product .price {
  margin: 5px 0; /* Vertical spacing */
}

/*페이지네이션*/
.mt-5 {
  display: flex;
  justify-content: center;
}
.block-27 {
  margin-top: 50px; /* 페이지네이션과의 간격 조정 */
  justify-items: center; /* 페이지네이션 가운데 정렬 */
}
.block-27 ul {
  padding: 0;
  margin: 0;
  display: inline-block;
}
.block-27 ul li {
  display: inline-block;
  margin-bottom: 4px;
  font-weight: 400;
  margin-right: 5px; /* 페이지네이션 간격 조정 */
}
.block-27 ul li a,
.block-27 ul li span {
  color: gray;
  text-align: center;
  display: inline-block;
  width: 40px;
  height: 40px;
  line-height: 40px;
  border-radius: 50%;
  border: 2px solid #e6e6e6;
}
.block-27 ul li.active a,
.block-27 ul li.active span {
  background: #007bff;
  color: #fff;
  border: 1px solid transparent;
}

::v-deep .customoverlay {position:relative;bottom:85px;border-radius:6px;border: 1px solid #ccc;border-bottom:2px solid #ddd;float:left;}
::v-deep .customoverlay:nth-of-type(n) {border:0; box-shadow:0px 1px 2px #888;}
::v-deep .customoverlay a {display:block;text-decoration:none;color:#000;text-align:center;border-radius:6px;font-size:14px;font-weight:bold;overflow:hidden;background: #d95050;background: #d95050 url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/arrow_white.png) no-repeat right 14px center;}
::v-deep .customoverlay .title {display:block;text-align:center;background:#fff;margin-right:35px;padding:10px 15px;font-size:14px;font-weight:bold;}
::v-deep .customoverlay:after {content:'';position:absolute;margin-left:-12px;left:50%;bottom:-12px;width:22px;height:12px;background:url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png')}

::v-deep .customoverlay  .close {position: absolute;top: 10px;right: 10px;color: #888;width: 17px;height: 17px;background: url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/overlay_close.png');}
::v-deep .customoverlay .close:hover {cursor: pointer;}
</style>
