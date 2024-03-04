<template>
  <div class="card">
    <div class="qa-section">
      <img src="../assets/images/img7.png" alt="고양이" class="catImage">
      <h2>펫스타그램 게시글 작성</h2>
      <div class="category-section">
        <label>카테고리</label>
        <div class="category-buttons">
          <button :class="{ 'active': selectedCategory === '강아지' }" @click="selectCategory('강아지')">강아지</button>
          <button :class="{ 'active': selectedCategory === '고양이' }" @click="selectCategory('고양이')">고양이</button>
          <button :class="{ 'active': selectedCategory === '소동물' }" @click="selectCategory('소동물')">소동물</button>
          <button :class="{ 'active': selectedCategory === '기타' }" @click="selectCategory('기타')">기타</button>
        </div>
      </div>
      <input type="text" placeholder="제목을 입력해주세요." v-model="title" required/>
    </div>
    <div class="question-detail">
      <textarea placeholder="자세한 내용을 입력해주세요." v-model="content" required></textarea>
    </div>
    <br>
    <div class="tag-input">
      <label>태그 입력</label>
      <input type="text" placeholder="태그를 입력해주세요." v-model="tag"/>
    </div>
    <br>
    <div class="photo-input">
      <div class="file-upload-buttons">
        <input type="file" id="fileInput" accept="image/*" multiple style="display: none;" @change="previewImages">
        <button class="file-button" @click="uploadImages">사진 업로드</button>
        <button class="file-button" @click="openFileInput">사진 첨부</button>
      </div>
      <div id="imageList"></div>
    </div>
    <div class="submit-button-container">
      <button type="submit" @click="upload">게시글 등록</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedCategory: '' // 선택된 카테고리를 저장할 변수
      , title : "",
      content : "",
      tag : ""
    };
  },
  methods: {
    selectCategory(category) {
      this.selectedCategory = category; // 선택된 카테고리 업데이트
    },
    openFileInput() {
      const fileInput = document.getElementById('fileInput');
      fileInput.click();
    },
    previewImages(event) {
      // 파일 미리보기 로직
    },
    uploadImages() {
      // 파일 업로드 로직
    },
    upload(){
      this.axios.post(`/api/free`, {
          id :  this.$cookies.get("id"),
          title : this.title,
          content : this.content,
          category : this.selectedCategory,
          tag : this.tag,
          subject : 0
      }).then( this.$router.push('/freeboard3')).catch();
    }
  }
};
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
.catImage {
  max-width: 200px;
  height: auto;
}
.card {
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  padding: 20px;
  max-width: 1000px;
  max-height: 1500px;
  margin: auto;
  margin-top: 120px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.category-section {
  display: flex;
  flex-direction: column; /* 아래로 정렬하도록 설정 */
  align-items: flex-start; /* 좌측 정렬 */
}

.category-buttons {
  display: flex;
  flex-wrap: wrap; /* 버튼들이 넘칠 경우 다음 줄로 넘어가도록 설정 */
}

.category-buttons button {
  margin-right: 10px;
  margin-bottom: 10px; /* 버튼 아래 간격 추가 */
  padding: 8px 12px;
  border: none;
  border-radius: 20px;
  background-color: #a7a7a7e5;
  cursor: pointer;
  transition: background-color 0.3s;
}

.category-buttons button.active {
  background-color: #007BFF;
}

.qa-section input,
.tag-input input {
  width: calc(100% - 22px);
  margin: 10px 0;
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  outline: none;
}

.question-detail textarea {
  width: calc(100% - 22px);
  height: 150px;
  /* 원하는 높이로 조정 */
  margin: 10px 0;
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  outline: none;
}

.qa-section h2 {
  margin-bottom: 16px;
  font-size: 32px;
  color: #1a1a1a;
}

label {
  display: block;
  font-size: 18px;
  color: #666;
  text-align: left;
}
.submit-button-container {
  display: flex;
  justify-content: center;
  margin-top: 50px; /* 원하는 여백 설정 */
}

.file-button {
  background-color: #a8a8a8e5;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  margin-left: 10px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.photo-input {
  display: flex;
  align-items: center;
  justify-content: flex-end; /* 오른쪽 정렬 추가 */
}

.file-upload-buttons {
  margin-right: 20px; /* 파일 선택과 사진 업로드 버튼 사이의 간격 조정 */
}

button {
  background-color: #287dd8;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  float: right;
  font-size: 16px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056B3;
}
</style>