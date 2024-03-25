<template>
<div class="modal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-top">
                <br>
                <h1> {{ this.place.시설명 }}</h1>
                <div>
                  <button><img :src="bookmarks"></button>
                  <button><img src="../assets/images/bookmarks.png"></button>
                </div>
                <div id="roadview"></div>
            </div>
            <br>
            <div class="detail">
                <img :src="this.place.img" alt="" >
                <div class="info">
                    <h4> 기본 장소 설명 : {{ this.place.basicInfoPlaceDescription }}</h4>
                <h4>주소 : {{ this.place.도로명주소 }}</h4>
                <h4> 운영시간 : {{  this.place.운영시간 }}</h4>
                <h4> 휴무일 : {{ this.place.휴무일 }}</h4>
                <h4> 장소(실내) 여부 : {{ this.place.indoorPlaceInfo }}</h4>
                <h4> 장소(실외) 여부 : {{ this.place.outdoorPlaceInfo }}</h4>
                <h4> 반려동물 동반 가능 여부 : {{ this.place.petCompanionInfo }}</h4>
                <h4> 반려동물 제한사항 : {{ this.place.petRestriction }}</h4>
                <h4> 반려동물 전용정보 : {{ this.place.petExclusiveInfo }}</h4>
                <h4> 주차가능여부 : {{ this.place.parkingAvailability }}</h4>
                <h4> 입장가능 동물크기 : {{ this.place.petSizeAdmission }}</h4>
                <h4>  입장료 정보 : {{ this.place.admissionFeeInfo }}</h4>
                <h4> 애견동반 추가요금 : {{ this.place.additionalPetFee }}</h4>
                </div>
            </div>
            <div class="category">
                <h5>카테고리 :  {{ this.place.카테고리3 }}</h5>
                <h5>전화번호 :  {{ this.place.전화번호 }}</h5>
                <h5><a :href="this.place.홈페이지">홈페이지 바로가기</a></h5>
            </div>
            <div class="modal-btn">
                <button @click="$emit('closeModal')">닫기</button>
            </div>
        </div>
    </div>
</div>
</template>
<script>
export default {
    props: {
    place: Object,
    showModal: Boolean
  },
  data() {
    return {
      bookmarks: `../assets/images/bookmarks.png`,
      checkedBookmarks: "../assets/images/bookmarks-checked.png"
    }
  },
  watch: {
 
    showModal(newValue) {
      if (newValue) {
        this.roadView();
      }
    }
  },
  methods: {
  roadView() {
    console.log(this.place);
    var rvContainer = document.getElementById('roadview');
    var rv = new kakao.maps.Roadview(rvContainer);
    var rc = new kakao.maps.RoadviewClient();
    var position = new kakao.maps.LatLng(this.place.위도, this.place.경도);

    rc.getNearestPanoId(position, 50, (panoId) => {
      if (panoId === null) {
        console.error('No panoId found near the given position.');
        return;
      }
      rv.setPanoId(panoId, position);
      this.initRoadviewMarker(rv, position);
    });
  },
  initRoadviewMarker(rv, position) {
    var rMarker = new kakao.maps.Marker({
      position: position,
      map: rv
    });

    var rLabel = new kakao.maps.InfoWindow({
      position: position,
      content: this.place.시설명
    });
    rLabel.open(rv, rMarker);

    kakao.maps.event.addListener(rv, 'init', () => {
      var projection = rv.getProjection();
      var viewpoint = projection.viewpointFromCoords(rMarker.getPosition(), rMarker.getAltitude());
      rv.setViewpoint(viewpoint);
    });
  }
},
mounted() {
  if (this.showModal) {
    this.roadView();
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
.custom-info-window {
  font-family:'Ownglyph_meetme-Rg';
}

.detail {
    display: flex;
    flex-wrap: wrap;
}

.detail img{
    width: 400px;
    height: 400px;
    margin: 10px;
}

.detail .info{
    align-items: center;
    width: 450px;
    margin-left: 25px;
}

.category {
  align-self: flex-start; /* 자기 자신만 왼쪽에 밀착시킵니다. */
  width: 100%; /* 부모의 전체 너비를 사용합니다. */
}
.category h5 {
  text-align: left; /* 텍스트를 왼쪽 정렬합니다. */
  /* 각 항목이 자신의 줄을 차지하도록 합니다. */
  margin-left: 15px;
  align-self: left;
}

.category h5 a {
  text-align: left; 
  align-self: left;
  text-decoration: underline;
}


#roadview {
    width:100%;
    height:300px;
}


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
    z-index: 1000; 
}
.modal.show {
  display: flex !important; /* Important 추가 */
}
.modal > .modal-dialog {
    position: fixed; /* 변경 */
    margin: auto; /* 변경 */
    pointer-events: auto; /* 변경 */
    width: 80%;
    max-width: 1000px; /* 모달의 최대 너비를 지정합니다. */
    height: 90%;
    max-height: 1000px;
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
    z-index: 1001;
}

.modal-content > img {
    width: 300px;
    height: 300px;
}




/* .modal-wrap {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1000; 
  align-items: center;
  justify-content: center;
}

.modal-container {
z-index: 1001;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 550px;
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
} */
</style>