<template>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
  <body id="body1">
  <section id="banner">
      <div class="inner">
  					<h2>내 반려동물과 같이 갈 수 있는 곳</h2>
  					<p>반려동물과 함께하는 활동들을 손쉽게 찾아보아요</p>
  					</div>
  </section>

  <div id="map">
  </div>
  <div class="act_info">
      <p>{{ name }}님을 위한 추천 장소 !</p>
</div>


<div id="app">
    <header class="site-header">
      <h1>OOO을 위한 추천 상자!</h1>
      <div class="search-container">
        <input type="text" placeholder="검색어 입력" />
        <button>검색</button>
      </div>
    </header>
    
    <div class="carousel-container">
    <button @click="scrollLeft" class="carousel-control left">＜</button>
    <div class="carousel-items" ref="carousel">
      <div v-for="(item, index) in items" :key="index" class="item">
        <h3>{{ item.name }}</h3>
        <!-- Additional content here -->
      </div>
    </div>
    <button @click="scrollRight" class="carousel-control right">＞</button>
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
    activity : {},
		map : null,
		markers : [],
		latitude: 0,
		longitude : 0,
        name : "OOO",
        items: [
          { name : "동물병원" },
          { name : "카페"},
          { name : "문화시설"}
        // ... your items data
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
      numbers : []
	};
  },
  props: {
    msg: String
  },
  async mounted() {
    this.showLoadingIndicator(true);
    if (!("geolocation" in navigator))
        return;
   navigator.geolocation.getCurrentPosition(pos => {
        this.latitude = pos.coords.latitude;
        this.longitude = pos.coords.longitude;

        if (window.kakao && window.kakao.maps) {
          this.initMap();
        } else {
          const script = document.createElement("script");
          script.onload = () => kakao.maps.load(this.initMap);
          script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=c2a63c53b4bb9f45634c727367987e63&autoload=false";
          document.head.appendChild(script);
        }
      }, err => {
        alert(err.message);
      })
   this.getList();
  },
  methods: {
    // addMarkerForPlace(latitude, longitude) {

    //   const markerPositions = [[latitude, longitude]];
    //   this.initMap();
    //   this.displayMarker(markerPositions);
    // },
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
      this.activity = res.data;
      this.maxPage = this.activity.totalCount;

      const mapResponses = await Promise.all(this.activity.data.map(c => 
        this.axios.get(`/googlemap?query=${encodeURIComponent(c.시설명)}&key=AIzaSyBUH1_H3djDNJeVGuUEwNlrc-fVOw_RKCs`)
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
          level: 5,
        };
        this.map = new kakao.maps.Map(container, options);
        this.displayMarker([[this.latitude, this.longitude]]);
      },
    displayMarker(markerPositions) {
        if (this.markers.length > 0) {
          this.markers.forEach((marker) => marker.setMap(null));
        }

        const positions = markerPositions.map(
            (position) => new kakao.maps.LatLng(...position)
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

      	var content = '<div class="overlay_info">';
        content += '    <a href="https://place.map.kakao.com/747310627" target="_blank"><strong>1004 약국</strong></a>';
        content += '    <div class="desc">';
        content += '        <img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/place_thumb.png" alt="">';
        content += '        <span class="address">제주특별자치도 제주시 구좌읍 월정리 33-3</span>';
        content += '    </div>';
        content += '</div>';

        var content = '<div class="customoverlay">' +
        '  <a href="https://place.map.kakao.com/747310627" target="_blank">' +
        '    <span class="title">1004 약국</span>' +
        '  </a>' +
        '</div>';
        


  	    var position1 = positions[0]; 

        var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 

  	    var customOverlay = new kakao.maps.CustomOverlay({
        	map: this.map,
        	position: position1,
        	content: content,
        	xAnchor: 0.5, 
          yAnchor: 1.1,
          image: imageSrc
  	    });
    },
    scrollLeft() {
      // Scroll to the left
      this.scrollCarousel(-1);
    },
    scrollRight() {
      // Scroll to the right
      this.scrollCarousel(1);
    },
    scrollCarousel(direction) {
      const carousel = this.$refs.itemsCarousel;
      const scrollAmount = carousel.offsetWidth / 5; // Width of one item
      carousel.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
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
    }
  }
}
</script>
<style scoped>

#loadingIndicator {
  width: 80%; 
  height: 185px; 
  margin-bottom: 10px;
}
#loadingIndicator > img {
  height: 300px;
}

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

.site-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: #f5f5f5;
}

.search-container {
  display: flex;
  margin-top: 10px;
}

.search-container input,
.search-container button {
  padding: 10px;
  margin: 5px;
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
  width: 50%; 
  height: 600px; 
  margin: auto;
  border: solid;
}


 .act_info {
    margin: 50px;
    border: ridge;
    width: fit-content;
    height: 75px;
    margin-left: 220px;
    border-radius: 40px;
    background-color: aquamarine;
 }
 .act_info p {  
    padding: 15px;
    font-size: 25px;
    text-align: center;
    margin-bottom: 0;
    /* margin-top: 5px; */
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-weight: bold;
 }

 .category-carousel, .product-carousel {
  margin: 20px 0;
}

.carousel-container {
  display: flex;
  align-items: center;
  margin: 0 40px; /* Adjusted for spacing */
}

.carousel-control {
  cursor: pointer;
  user-select: none;
  margin: 20px;
  /* Style your buttons here */
}

.carousel-items {
  display: flex;
  flex-wrap: nowrap; /* Prevent wrapping */
  overflow-x: hidden; /* Hide horizontal scrollbar */
  scroll-behavior: smooth;
}

.product {
  flex: 0 0 auto; /* Do not grow, do not shrink, basis auto */
  height: 300px; /* Adjust the height as needed */
  width: 20%; /* Adjust the width to show 5 items at a time */
  margin-right: 10px; /* Adjust the right margin as needed */
  box-sizing: border-box; /* Include padding and border in the element's total width and height */
  /* Rest of your styling */
}

/* Make sure to set a minimum height for the product-image to ensure that it takes up space even if no image is present */
.product-image > img {
  width: 90%; /* Take full width of the product container */
  height: 180px; /* Set a fixed height */
  background-color: #ddd; /* Placeholder color */
  margin-bottom: 10px; /* Space below the image */
}

/* Add some more specific selectors for the rating and price if needed */
.product .rating,
.product .price {
  margin: 5px 0; /* Vertical spacing */
}

.item {
  flex: 0 0 auto; /* Do not grow, do not shrink, basis auto */
  width: 200px; /* Width of each item, adjust as needed */
  border: 1px dashed #ccc;
  padding: 20px;
  margin: 10px;
}

</style>
