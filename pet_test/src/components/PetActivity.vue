<template>
<section id="banner" style="background-image: url('../assets/images/activity_banner.jpg'); height: 400px;
    margin-bottom: 100px; ">
    <div class="inner">
					<h2>내 반려동물과 같이 갈 수 있는 곳</h2>
					<p>반려동물과 함께하는 활동들을 손쉽게 찾아보아요</p>
					</div>
			</section>
<div id="map" style="width: 50%; height: 600px; margin-left: 500px; border: solid;"></div>
<div class="act_info">
    <p>{{ name }}님을 위한 추천 장소 !</p>
</div>

</template>
<style>


 .act_info {
    margin: 50px;
    border: ridge;
    width: fit-content;
    height: 75px;
    margin-left: 215px;
    border-radius: 40px;
 }
 .act_info p {  
    padding: 15px;
 }

</style>
<script>
export default {
  data(){
	return {
		map : null,
		markers : [],
		latitude: 0,
		longitude : 0,
        name : "OOO"
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
  },
  methods: {
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


	var customOverlay = new kakao.maps.CustomOverlay({
    	map: this.map,
    	position: position1,
    	content: content,
    	xAnchor: 0.5, // 커스텀 오버레이의 x축 위치입니다. 1에 가까울수록 왼쪽에 위치합니다. 기본값은 0.5 입니다
    	yAnchor: 1.1
	});
    },
  }
}
</script>