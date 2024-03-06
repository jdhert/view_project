<template>
<body>
  <header class="banner">
      <h1 class="banner-title">비만 계산기</h1>
      <img src="../assets/images/banner2.png" alt="Banner" class="banner-image">
      <br>
    </header>
    <section class="hero-section">
    </section>
    <section class="shop-section">
      <div class="shop-images">
        <div class="shop-link">
          <img src="../assets/images/비만a.png" alt="card">
        </div>
        <div class="shop-link">
          <img src="../assets/images/비만b.png" alt="card">
        </div>
        <div class="shop-link">
          <img src="../assets/images/비만c.png" alt="card">
        </div>
        <div class="shop-link">
          <img src="../assets/images/비만d.png" alt="card">
        </div>
        <div class="shop-link">
          <img src="../assets/images/비만e.png" alt="card">
        </div>
        <div class="shop-link">
          <img src="../assets/images/비만1.png" alt="card">
        </div>
        <div class="shop-link">
          <img src="../assets/images/비만2.png" alt="card">
        </div>
        <div class="shop-link">
          <img src="../assets/images/비만3.png" alt="card">
        </div>
        <div class="shop-link">
          <img src="../assets/images/비만4.png" alt="card">
        </div>
        <div class="shop-link">
          <img src="../assets/images/비만5.png" alt="card">
        </div>
     
      </div>
      <form>
      <div class="submit">
        <input type="text" placeholder="ex) 4" class="input-text">
      <input type="submit" class="submit-button" value="결과보기">
      </div>
      </form>
    </section>
    <footer>
      <div class="footer-items">
        <h1 class="result">반려동물 비만도 결과</h1>
        <div class="wrapper">
          <h4>우리 아이는</h4>
          <br>
          <h1 class="box-fat">비만이 걱정됩니다. 산책 시간을 30분 늘리고 간식을 줄여주세요!</h1>
        </div>
      </div>
      <a href="#" class="footer-title">
        Back to top
      </a>
    </footer>
</body>
</template>
<script>
</script>
<style scoped>
@font-face {
    font-family: 'Ownglyph_meetme-Rg';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2402_1@1.0/Ownglyph_meetme-Rg.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Ownglyph_meetme-Rg';
}
body{
  text-align: center;
}
.banner {
  margin-top: 120px;
  text-align: center;
}

.banner-title {
  font-family: 'Ownglyph_meetme-Rg';
  font-size: 3.3rem;
}

.banner-subtitle {
  font-family: 'Ownglyph_meetme-Rg';
  font-size: 1.3rem;
  color: #777;
}
.banner-image {
        width: 25%;
    }
.result{
  font-size: 50px;
  margin-bottom: 20px;
}

/* Shop Section */
.shop-section {
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #f3f3f3;
  padding: 20px 0;
}
.shop-images {
  display: grid;
  grid-template-columns: repeat(5, 1fr); /* 5개의 카드를 한 줄에 배치 */
  gap: 40px;
  max-width: 1280px;
  width: 100%;
  justify-content: center;
}
.shop-link {
  background-color: #fff;
  padding: 30px;
  display: flex;
  cursor: pointer;
  flex-direction: column;
  white-space: nowrap;
  flex-basis: calc((100% - 200px) / 5);
  width: 100%;
  height: 100%;
  border-radius: 20px;
}
.shop-link img {
  width: 100%;
  height: 280px;
  object-fit: cover;
  margin-bottom: 10px;
}
.shop-link h3 {
  margin-bottom: 10px;
}
.shop-link a {
  display: inline-block;
  margin-top: 10px;
  font-size: 0.9rem;
  color: blue;
  font-weight: 500;
  transition: color 0.3s ease;
}
.shop-link:hover a {
  color: #c7511f;
  text-decoration: underline;
}
.shop-link img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  margin-bottom: 10px;
}
/* Footer */
.footer-title {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #a9c7eb;
  color: #000000;
  font-size: 0.875rem;
  font-weight: 600;
  height: 60px;
}

.footer-items {
  display: flex;
    width: 100%;
    flex-direction: column;
    -webkit-box-align: center;
    align-items: center;
    text-align: center;
    padding-top: 40px;
  width: 100%;
  margin: 0 auto;
  background: #e2efff;
  height: 300px;
}
.footer-items h3 {
  font-size: 1rem;
  font-weight: 500;
  color: #000000;
  margin: 20px 0 10px 0;
}
.footer-items ul {
  list-style: none;
  margin-bottom: 20px;
}
.footer-items li a {
  color: #000000;
  font-size: 0.875rem;
}
.footer-items li a:hover {
  text-decoration: underline;
}

.footer-items .box-result {
  text-align: center;
  font-size: 40px;
  height: 20px;
  /* 중앙 정렬을 위한 스타일 추가 */
  display: flex;
  justify-content: center;
  align-items: center;
}
.wrapper {
  padding: 30px 40px;
  border-radius: 12px;
  background: #fff;
  text-align: center;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  width: 60%;
  height: 60%;
}
.wrapper header {
  font-size: 18px;
  font-weight: 400;
  color: #333;
}
.wrapper p {
  color: #333;
}
.wrapper .input-field {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 25px 0;
}
.input-field input,
.input-field button {
  height: 50px;
  width: calc(100% / 2 - 20px);
  outline: none;
  padding: 0 20px;
  border-radius: 8px;
  font-size: 18px;
}
.input-field input {
  text-align: center;
  color: #707070;
  width: 110px;
  border: 1px solid #aaa;
}
input::-webkit-inner-spin-button,
input::-webkit-outer-spin-button {
  display: none;
}
.input-field input:disabled {
  cursor: not-allowed;
}
.input-field button {
  border: none;
  background: #4a98f7;
  color: #fff;
  cursor: pointer;
  transition: 0.3s;
  
}
.input-field button:active {
  transform: scale(0.97);
}
.box-fat{
  font-size: 30px;
  color: #2d399e;
}
.footer-items .box-result {
  text-align: center;
  font-size: 40px;
  height: 20px;
}
.submit-button{
  width: 100%;
    height: 48px;
    border-radius: 14px;
    border: none;
    outline: none;
    color: rgb(0, 0, 0);
    background-color: rgb(252, 209, 30);
    font-family: 'Ownglyph_meetme-Rg';
    font-size: 20px;
    width: calc(50% - 10px); /* 50% 폭을 가지고 좌우에 10px의 여백을 두어야 함 */
    margin-top: 0;
}
.submit-button:hover {
  background-color:  rgba(255, 204, 0, 0.582);
}
.submit{
  display: flex;
  justify-content: space-between;
  margin-top: 10%;
}
.input-text{
  margin-top: auto;
  width: calc(50% - 10px);
}

</style>