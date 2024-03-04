<template>
  <div class="container">
    <div class="title">비만도 계산기</div>
    <div class="selection-area">
      <div class="pet-selection">
        <img src="path_to_your_dog_image" alt="Dog" class="pet-image"/>
        <div class="pet-name">멍멍이</div>
      </div>
      <div class="icon-grid">
        <!-- Repeat this for each icon, replace with actual image paths and names -->
        <div class="icon-item">
          <img src="path_to_your_icon_image" alt="Icon" class="icon"/>
          <div class="icon-label">잘함</div>
        </div>
        <!-- ... other icons -->
      </div>
      <div class="counter">
        <div class="counter-label">비만도 단계: </div>
        <div class="counter-value">5</div>
        <button class="counter-button">업데이트</button>
      </div>
    </div>
    <div class="info-area">
      <div class="info-text">
        미안이 건강합니다. 상담 시간은 30분 늘리고 간식을 줄여주세요!
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'FatCalculator',
  // Add your component logic here
}
</script>
<style scoped>
.container {
  max-width: 600px;
  margin: 20% auto;
  padding: 20px;
  border: 2px dashed #ccc;
  border-radius: 10px;
  text-align: center;
  font-family: 'Arial', sans-serif;

}
.title {
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
}
.selection-area {
  margin-bottom: 20px;
}
.pet-selection {
  display: inline-block;
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
}
.pet-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
}
.pet-name {
  margin-top: 8px;
}
.icon-grid {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
}
.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.icon {
  width: 50px;
  height: 50px;
  margin-bottom: 4px;
}
.icon-label {
  font-size: 14px;
}
.counter {
  border-top: 1px solid #ccc;
  padding-top: 10px;
}
.counter-label {
  display: inline-block;
  margin-right: 10px;
}
.counter-value {
  display: inline-block;
  font-size: 20px;
  font-weight: bold;
  margin-right: 10px;
}
.counter-button {
  padding: 5px 10px;
  background-color: #F0F0F0;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.info-area {
  padding: 20px;
  background-color: #F9F9F9;
  border-radius: 10px;
}
.info-text {
  font-size: 16px;
}
</style>