<template>
    <body id="top">
		<section id="banner"><div class="inner">
				<h2>펫과 함께</h2>
				<p>반려동물과 함께하는 일상, 편리하고 신뢰할 수 있는 웹 서비스</p>
				<ul class="actions"><li><a href="/login" class="button big special">Sign Up</a></li>
					<li><a href="#elements" class="button big alt">Learn More</a></li>
				</ul></div>
		</section>
		<!-- One -->
		<section id="one" class="wrapper style1">
			<header class="major">
			<img src="../assets/images/icon3.png">
			<h2 ><a href="/freeboard3">펫스타그램 (Petstagram)</a></h2>
				<p>반려동물과의 일상을 사람들과 공유하세요</p>
			</header>
			<div class="freeboard">
    		  <div class="row1 d-flex">
    		    <div v-for="(post, index) in posts" :key="index" class="col-md-4 d-flex">
    		      <div class="content-entry align-self-stretch">
    		        <a class="block-20 rounded" :style="{backgroundImage: 'url(' + (post.imgPath ? post.imgPath : '@/assets/images/gallery-6.jpg') + ')'}"></a>
    		        <div class="text p-4">
    		          <div class="meta mb-2">
    		            <div><a href='#'>{{ post.createdAt }}</a></div>
    		            <div><a href="#" >{{ post.writer }}</a></div>
    		            <div class="meta-chat">
    		              <span class="fa fa-comment"></span> {{ post.commentCount }}
    		              <span class="fa fa-heart" style="margin-left: 5px;"></span> {{ post.likeCount }}
    		            </div>
    		          </div>
    		          <h3 class="heading"><a href="#" @click.prevent="goToPost0(post.id)">{{ post.title }}</a></h3>
    		        </div>
    		      </div>
    		    </div>
    		  </div>
    		</div>
		</section>
		<!-- Two -->
		<section id="two" class="wrapper style2"><header class="major">
			<img src="../assets/images/icon4.png" id="img2">
				<h2 style="color: white;"><a href="/qnaboard"> 동물토론방 & 애완죽순탐구 (Paws & Answers)</a></h2>
				<p>자신의 반려동물과 관련된 궁금증을 물어보아요!</p>
			</header>
			<div class="container">
				<div class="content">
          <div class="best-card-columns">
              <div class="card" v-for="(bestpost, index) in bestposts" :key="index"
                  style="width: 200px" @click.prevent="goToPost1(bestpost.id)">
                  <div class="card-header">
                      <span class="tag" :class="getTagClass(bestpost.category)">{{ bestpost.category }}</span>
                      <h2 class="card-title" style="color: black;">{{ bestpost.title }}</h2>
                  </div>
                  <div class="card-body">
                      <p>{{ truncateText(bestpost.content, 90) }}</p>
                  </div>
                  <div class="card-footer">
                      <div class="date">{{ bestpost.createdAt }}</div>
                      <div class="viewCount"> {{ bestpost.viewCount }} <i class="fas fa-eye"></i></div>
                      <div class="likeCount">{{ bestpost.likeCount }} <i class="far fa-heart"></i></div>
                      <div class="comments">{{ bestpost.commentCount }} <i class="far fa-comment"></i></div>
                  </div>
              </div>
          </div>
        </div>
			</div>
		</section>
		<!-- Three -->
		<section id="three" class="wrapper style1"><div class="container">
				<div class="row">
					<div class="8u">
						<section>
							<h2>주위에 있는 반려동물 액티비티</h2>
							<div id="map" style="width: 100%; height: 500px; border-color: black;"></div>
							
							<!-- <a href="#" class="image fit">
								<img src="../assets/images/pic03.jpg" alt="" width="818" height="340">
							</a> -->
							<p style="padding-top: 50px;">당신 주위에 있는 반려동물 액티비티를 소개해주며, <br>반려동물과의 문화활동을 통해서 주인이 몰랐던 반려동물의 의외의 모습과<br> 더 친밀하게 다가가는 계기를 만들어 보세요</p>
						</section></div>
					<div class="4u">
						<section><h3>안녕하세요, 반려동물과 함께하는 다양한 액티비티를 소개합니다!</h3>
							<p>반려동물과 함께하는 야외 산책으로 우리의 반려동물과 함께 자연 속을 걷는 것은 건강에 좋을 뿐 아니라 즐거운 시간을 보낼 수 있는 좋은 방법입니다. <br>주변 공원이나 자연 보호구역을 방문하여 산책을 즐겨보세요! 애견 카페 및 레스토랑등 많은 도시에는 반려동물과 함께 식사할 수 있는 카페나 레스토랑이 있습니다.<br> 이런 장소를 방문하여 반려동물과 함께 맛있는 음식을 즐기며 즐거운 시간을 보낼 수 있습니다. 몇몇 지역에는 애완동물을 위한 테마 공원이 있습니다. <br>이곳에서는 반려동물과 함께 다양한 놀이 시설을 이용하고 즐길 수 있습니다.</p>
							<ul class="actions"><li><a href="/pet_act" class="button alt">Learn More</a></li>
							</ul></section><hr><section><h3>백엔드 웹서비스 프로젝트</h3>
							<ul class="alt"><li><a href="#">Spring boot</a></li>
								<li><a href="#">Firebase DB</a></li>
								<li><a href="#">Vue.js & JAVA</a></li>
								<li><a href="#">REST API & AXIOS</a></li>
							</ul></section></div>
				</div>
			</div>
		</section>
	</body>	 
</template>

<script>
export default {
  name: 'HelloWorld',
  data(){
	return {
		posts: [],
		bestposts: [],
		map : null,
		markers : [],
		latitude: 0,
		longitude : 0,
    page : 1
	};
  },
  props: {
    msg: String
  },
  mounted() {
	if (!("geolocation" in navigator)) {
      return;
    }

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

	this.axios.get(`/api/free/popular`, {
    params:{
      subject : 0,
    }
  }).then((res) =>{
      this.posts = res.data;
  }).catch();

  this.axios.get(`/api/free/popular`, {
      params:{
        subject : 1,
      }
     }).then((res) => this.bestposts = res.data).catch();
  },
  methods: {
    goToPost0(id) {
      this.axios.get(`/api/free/getMyBoard/${this.$cookies.get('id')}`, {
        params: {
          subject: 0,
          page: this.page,
        }
      })
      .then((res) => {
        this.posts = res.data;
        this.$cookies.set('postId', id);
        this.$router.push('/freeboard3');
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
    },
    goToPost1(id) {
      this.axios.get(`/api/free/getMyBoard/${this.$cookies.get('id')}`, {
        params: {
          subject: 1,
          page: this.page,
        }
      })
      .then((res) => {
          this.posts = res.data;
          this.$cookies.set('postId', id);
          this.$router.push('/qnaboard');
      }).catch(error => {
          console.error('Error fetching data:', error);
      });
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
    truncateText(text, maxLength) {
          if (!text || text.length === 0) {
              return ''; // 빈 문자열 반환하거나 다른 대체값을 사용할 수 있습니다.
          }
          if (text.length > maxLength) {
              return text.slice(0, maxLength) + '...';
          } else {
              return text;
          }
      },
     
    	// api 불러오기
      // loadScript() {
      //   const script = document.createElement("script");
      //   script.src =
      //     "//dapi.kakao.com/v2/maps/sdk.js?appkey=c2a63c53b4bb9f45634c727367987e63&autoload=false"; 
      //   script.onload = () => window.kakao.maps.load(this.loadMap); 

      //   document.head.appendChild(script);
      // },
      // // 맵 출력하기
      // loadMap() {
      //   const container = document.getElementById("map"); 
      //   const options = {
      //     center: new window.kakao.maps.LatLng(33.450701, 126.570667), 
      //     level: 3
      //   };

      //   this.map = new window.kakao.maps.Map(container, options); 
      //   this.loadMaker();
      // },
      // // 지정한 위치에 마커 불러오기
      // loadMaker() {
      //   const markerPosition = new window.kakao.maps.LatLng(
      //     33.450701,
      //     126.570667
      //   );

      //   const marker = new window.kakao.maps.Marker({
      //     position: markerPosition,
      //   });

      //   marker.setMap(this.map);
      // },

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

    //   var iwContent = '<div style="padding:5px;">Hello World! <br><a href="https://map.kakao.com/link/map/Hello World!,33.450701,126.570667" style="color:blue" target="_blank">큰지도보기</a> <a href="https://map.kakao.com/link/to/Hello World!,33.450701,126.570667" style="color:blue" target="_blank">길찾기</a></div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
      // 	iwPosition = positions[0]; //인포윈도우 표시 위치입니다

    //   // 인포윈도우를 생성합니다
    // 	var infowindow = new kakao.maps.InfoWindow({
      // 		position : iwPosition, 
      // 		content : iwContent 
    // 	});
     
    // 	// 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
    // 	infowindow.open(this.map, this.markers[0]); 

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
      

	  // 커스텀 오버레이가 표시될 위치입니다 
	  var position1 = positions[0]; 

	  // 커스텀 오버레이를 생성합니다
	  var customOverlay = new kakao.maps.CustomOverlay({
      	map: this.map,
      	position: position1,
      	content: content,
      	xAnchor: 0.5, // 커스텀 오버레이의 x축 위치입니다. 1에 가까울수록 왼쪽에 위치합니다. 기본값은 0.5 입니다
      	yAnchor: 1.1
	  });
    },
	  // kewwordSearch(keword) {
      //     ps.keywordSearch(keword, placesSearchCB);
      //     count = count + 1;
      // },
	  // placesSearchCB(data, status, pagination) {
      //     if (status === kakao.maps.services.Status.OK) {
      //         displayMarker(data[0]);
      //         bounds.extend(new kakao.maps.LatLng(data[0].y, data[0].x));
      //         if (count < inputData.length) {
      //             kewwordSearch(inputData[count]);
      //         } else if (count == inputData.length) {
      //             setBounds();
      //         }
      //     }
      // },
	  // displayMarker(place) {
      //     var marker = new kakao.maps.Marker({
      //         map: map,
      //         position: new kakao.maps.LatLng(place.y, place.x),
      //     });
      //     kakao.maps.event.addListener(marker, 'click', function () {
      //         var position = this.getPosition();
      //         var url = 'https://map.kakao.com/link/map/' + place.id;
      //         window.open(url, '_blank');
      //     });
      // },
	  // setBounds() {
      //     map.setBounds(bounds, 90, 30, 10, 30);
      // }
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


@import '../assets/css/skel.css';
@import '../assets/css/style.css';
@import '../assets/css/style-xlarge.css';

@font-face { 
  font-family: "continuous";
  src: url("../assets/fonts/continuous.ttf") format("truetype");
  font-weight: normal;
}


.freeboard {
  display: flex;
  justify-content: center; /* 가운데 정렬합니다 */
  max-width: 1200px;
  /* 원하는 너비로 조정 */
  margin: 0 auto;
  /* 가운데 정렬 */
  background-color: white;
  font-family: "Montserrat", Arial, sans-serif;
  background: #fff;
  font-size: 15px;
  line-height: 1.8;
  font-weight: 400;
  color: gray; }
.freeboard.menu-show {
  overflow: hidden;
  position: fixed;
  height: 100%;
  width: 100%; }
.col-md-4 {
  margin-top: 20px;
  margin-right: 25x;
  margin-left: 25px;
}
.row1 {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px; }
.block-20 {
  overflow: hidden;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  height: 250px;
  position: relative;
  display: block;
}
.block-20 img {
  height: 250px;
}
.content-entry {
  background: #fff;
  -webkit-box-shadow: 8px 10px 18px -2px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 8px 10px 18px -2px rgba(0, 0, 0, 0.1);
  box-shadow: 8px 10px 18px -2px rgba(0, 0, 0, 0.1); }
.content-entry .text {
  position: relative;
  border-top: 0;
  border-radius: 2px; }
.content-entry .text .tag {
    color: #b3b3b3; }
.content-entry .text .heading {
	font-size: 18px;
	margin-bottom: 16px;
	font-weight: 400; 
	cursor: pointer;}
.content-entry .text .heading a {
  color: #000000; }
.content-entry .text .heading a:hover, .blog-entry .text .heading a:focus, .blog-entry .text .heading a:active {
  color:  #007bff; }
.content-entry .text .meta-chat {
  color:  #007bff; }
.content-entry .text .read {
  color: #000000;
  font-size: 14px; }
.content-entry .meta > div {
  display: inline-block;
  margin-right: 5px;
  margin-bottom: 5px;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px; }
.content-entry .meta > div a {
  color: #999999;
  font-weight: 500; }
.content-entry .meta > div a:hover {
  color: #333333; }
.content-entry .btn-custom {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 500;
  color:  #007bff; }
.content-entry .meta .createdAt {
  width: 100%;
  }
.p-4 {
  padding: 1.5rem !important; }
a.text-dark:hover, a.text-dark:focus {
  color: #121416 !important; }
a {
  text-decoration: none;
  background-color: transparent; }
a:hover {
  color: #61bffd;
  text-decoration: underline; }
.rounded {
  border-radius: 0.25rem !important; }
a {
  -webkit-transition: .3s all ease;
  -o-transition: .3s all ease;
  transition: .3s all ease; }
a:hover, a:focus {
  text-decoration: none;
  color:  #61bffd;
  outline: none !important; }



.container {
    max-width: 1450px;
    padding: 20px;
}
.meta-chat {
    position: relative;
    display: flex;
    justify-content: right;
    top: -10px;
    right: 5px;
    color: #777;
}
.banner {
    margin-top: 0px;
    text-align: center;
}
.banner-image {
    width: 60%;
    height: auto;
    margin-bottom: 20px;
}
.banner-title {
    font-family: 'Ownglyph_meetme-Rg';
    font-size: 2.3rem;
    margin-bottom: 20px;
}
.banner-subtitle {
    font-family: 'Ownglyph_meetme-Rg';
    font-size: 1.3rem;
    color: #777;
}
.content {
    margin-bottom: 30px;
}
.best-card-columns {
    display: flex;
    justify-content: center;
    gap: 20px;
}
.likeCount .viewCount .comments {
    font-family: 'Ownglyph_meetme-Rg';
    font-size: 0.8rem;
}
.card {
    background-color: #fff;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    overflow: hidden;
    transition: box-shadow 0.4s ease, transform 0.4s ease;
    width: 100%;
    min-width: 20rem;
}
.card:hover {
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
    transform: translateY(-3px);
}
.card-body {
    font-size: 1.rem;
}
.card-header {
    /* margin-top: 20px; */
    padding: 20px;
    border-radius: 5px;
    background-color: #ececec;
    height: 120px;
}

.tag {
    display: inline-block;
    padding: 5px 10px;
    border-radius: 20px;
    color: #fff;
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

.card-title {
    font-size: 1.2rem;
    margin: 10px 0;
}
.card-body {
    padding: 20px;
    height: 100px;
}
.card-footer {
    padding: 20px;
    background-color: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #777;
}
.date {
    margin-right: 45px;
}
.custom-button {
    margin-left: 1280px;
    /* 왼쪽 여백을 auto로 설정하여 오른쪽으로 정렬 */
    padding: 10px 20px;
    background-color: #8d8d8d;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

@media (max-width: 1200px) {
  
}



.overlay_info {border-radius: 6px; margin-bottom: 12px; float:left;position: relative; border: 1px solid #ccc; border-bottom: 2px solid #ddd;background-color:#fff;}
    .overlay_info:nth-of-type(n) {border:0; box-shadow: 0px 1px 2px #888;}
    .overlay_info a {display: block; background: #d95050; background: #d95050 url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/arrow_white.png) no-repeat right 14px center; text-decoration: none; color: #fff; padding:12px 36px 12px 14px; font-size: 14px; border-radius: 6px 6px 0 0}
    .overlay_info a strong {background:url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/place_icon.png) no-repeat; padding-left: 27px;}
    .overlay_info .desc {padding:14px;position: relative; min-width: 190px; height: 56px}
    .overlay_info img {vertical-align: top;}
    .overlay_info .address {font-size: 12px; color: #333; position: absolute; left: 80px; right: 14px; top: 24px; white-space: normal}
    .overlay_info:after {content:'';position: absolute; margin-left: -11px; left: 50%; bottom: -12px; width: 22px; height: 12px; background:url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png) no-repeat 0 bottom;}

.customoverlay {position:relative;bottom:85px;border-radius:6px;border: 1px solid #ccc;border-bottom:2px solid #ddd;float:left;}
.customoverlay:nth-of-type(n) {border:0; box-shadow:0px 1px 2px #888;}
.customoverlay a {display:block;text-decoration:none;color:#000;text-align:center;border-radius:6px;font-size:14px;font-weight:bold;overflow:hidden;background: #d95050;background: #d95050 url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/arrow_white.png) no-repeat right 14px center;}
.customoverlay .title {display:block;text-align:center;background:#fff;margin-right:35px;padding:10px 15px;font-size:14px;font-weight:bold;}
.customoverlay:after {content:'';position:absolute;margin-left:-12px;left:50%;bottom:-12px;width:22px;height:12px;background:url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png')}
</style>