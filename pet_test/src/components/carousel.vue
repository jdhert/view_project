<template>
  <body>
  <div class="Diary">
      <div class="wrapper">
      <img src="../assets/images/일기그림.png" alt="고양이" class="catImage">
      <h2>오늘의 일기 미리 볼거냥</h2>
      <div style="border: 1px solid #ccc; border-radius: 10px; background-color: white; margin-bottom: 15px; padding: 10px;"> 날짜 : 2024-03-05 </div>
      <div style="border: 1px solid #ccc; border-radius: 10px; background-color: white; margin-bottom: 15px; padding: 10px;"> 제목 : 오늘의 일기</div>
      <textarea spellcheck="false" required>오늘 눈이 와서 산책을 늦게 나갔더니 쳐다보고 있다... 눈이 금방 그치지 않고 쌓여 발에 진흙이 많이 묻어 발을 닦아주었다. 그랬더니 기분이 안좋아 보이길래 간식을 나눠줬다ㅎㅎ</textarea>
      <div class="file-options">
          <div class="option file-name">
          <label>오늘의 기분</label>
          <div style="border: 1px solid #ccc; border-radius: 10px; background-color: white; margin-bottom: 15px; padding: 10px;"> 기분 조아</div>
          </div>
          <div class="option save-as">
          <label>오늘의 날씨</label>
          <div style="border: 1px solid #ccc; border-radius: 10px; background-color: white; margin-bottom: 15px; padding: 10px;"> 햇빛 쨍쨍</div>
          </div>
      </div>
      <button class="save-btn" type="button">목록으로 돌아가기</button>
      <!-- <label for="file-upload" class="custom-file-upload">
                  파일 선택
              </label>
              <input id="file-upload" class="image" type="file" @change="onFileChange">
              <img v-if="imageUrl" :src="imageUrl" alt="Selected Image"> -->
      </div>
      <carousel :items-to-show="1">
      <slide v-for="slide in slides" :key="slide.id">
          <img :src="slide.src" :alt="slide.alt">
      </slide>
      <template #addons>
          <Navigation />
          <!-- <Pagination /> -->
      </template>
      </carousel>
  </div>
</body>
</template>

<script>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

export default {
components: {
  Carousel,
  Slide,
  Pagination,
  Navigation,
},
data() {
  return {
    slides: [
      { id: 1, src: require('../assets/images/puppy1.jpg'), alt: 'Slide 1' },
      { id: 2, src: require('../assets/images/puppy1.jpg'), alt: 'Slide 2' },
    ]
  }
},
onFileChange(e) {
  const file = e.target.files[0];
  this.file = file;
  this.imageUrl = URL.createObjectURL(file);
}
}
</script>
<style scoped>
/* Import Google font - Poppins */
/* @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap'); */
@font-face {
font-family: 'Ownglyph_meetme-Rg';
src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2402_1@1.0/Ownglyph_meetme-Rg.woff2') format('woff2');
font-weight: normal;
font-style: normal;
}
*{
margin: 0;
padding: 10px;
box-sizing: border-box;
font-family: 'Ownglyph_meetme-Rg';
}
body{
display: flex;
align-items: center;
justify-content: center;
min-height: 100vh;
padding: 10px;
background:#fafafa;
}

.Diary {
  margin-top: 100px;
  margin-bottom: 100px;
  width: 1600px;
  display: flex;
}

.catImage{
  width: 250px;
  height: auto;
}

input {
margin-top: 0.4rem;

}
.wrapper input{
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
}
.label-text {
display: flex;
flex-direction: column;
}

div.wrapper{
  width: 50%;
}

.wrapper{
width: 443px;
border-radius: 7px;
background: #fff;
padding: 30px 25px 40px;
box-shadow: 0 10px 15px rgba(0,0,0,0.05);
}
.wrapper :where(textarea, input, select, button){
width: 100%;
outline: none;
border: none;
font-size: 17px;
border-radius: 5px;
}
.wrapper :where(textarea, input)::placeholder{
color: #aaa;
}
.wrapper :where(textarea, input):focus{
box-shadow: 0px 2px 4px rgba(0,0,0,0.08);
}
.wrapper textarea{
height: 270px;
resize: none;
padding: 8px 13px;
font-size: 17.6px;
border: 1px solid #ccc;
}
.wrapper .file-options{
display: flex;
margin-top: 10px;
align-items: center;
justify-content: space-between;
}
.file-options .option{
width: calc(100% / 2 - 8px);
}
.option label{
font-size: 17px;
}
.option :where(input, .select-menu){
height: 50px;
padding: 0 13px;
margin-top: 6px;
border-radius: 5px;
border: 1px solid #bfbfbf;
}
.option .select-menu select{
height: 50px;
background: none;
}
div.select-menu{
  margin: 2.4px 0px 8px;
}
.wrapper .save-btn{
color: #fff;
cursor: pointer;
opacity: 0.6;
padding: 16px 0;
margin-top: 20px;
pointer-events: none;
background: #8fe5f2;
font-size: 25px;
}
.save-btn:hover{
background: #29d8f4;
}
textarea:valid ~ .save-btn{
opacity: 1;
pointer-events: auto;
transition: all 0.3s ease;
}

.custom-file-upload {
  /* 파일 선택 버튼의 스타일 지정 */
  font-family: 'Ownglyph_meetme-Rg';
  display: flex;
  justify-content: center;
  align-items: center;
  /* padding: 10px 20px;
  margin-right: 10px; */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #edf6fc;
  color: #7ab7e0;
  font-size: 20px;
  width: 25%;
  height: 100%;
  border: 2px solid #7ab7e0;
  margin-top: 10px;
}
.image {
  display: none;
}

@media screen and (max-width: 475px) {
.wrapper{
  padding: 25px 18px 30px;
}
.wrapper :where(textarea, input, select, button, label){
  font-size: 16px!important;
}
.file-options .option{
  width: calc(100% / 2 - 5px);
}
.option :where(input, .select-menu){
  padding: 0 10px;
}
.wrapper .save-btn{
  padding: 15px 0;
}
}
.carousel {
  max-width: 45%; /* carousel의 최대 너비를 화면 너비에 맞게 조절합니다. */
  margin: 0 auto; /* 가운데 정렬을 위해 좌우 마진을 자동으로 설정합니다. */
  padding: 0;
}
.carousel img {
  max-width: 100%; /* 이미지의 최대 너비를 부모 요소에 맞게 설정합니다. */
  max-height: 100%; /* 이미지의 최대 높이를 부모 요소에 맞게 설정합니다. */
  width: auto; /* 이미지의 너비를 자동으로 조정합니다. */
  height: auto; /* 이미지의 높이를 자동으로 조정합니다. */
  margin: 0; /* 이미지 주변의 여백을 제거합니다. */
  padding: 0; /* 이미지 주변의 여백을 제거합니다. */
}
.pagination {
  margin-top: 20px; /* 필요한 만큼의 간격으로 조정하세요 */

}
.custom-file-upload {
    /* 파일 선택 버튼의 스타일 지정 */
    font-family: 'Ownglyph_meetme-Rg';
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: #edf6fc;
    color: #7ab7e0;
    font-size: 20px;
    width: 150px; /* 너비 조정 */
    height: 50px; /* 높이 조정 */
    border: 2px solid #7ab7e0;
    margin-top: 10px;
}

</style>