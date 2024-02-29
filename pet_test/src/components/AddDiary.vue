<template>
 <body>
    <div class="wrapper">
        <div class="option file-name">
            <h2>오늘의 일기를 작성해 보세요</h2>
            <input type="datetime-local" name="starttime">
        </div>
      <textarea spellcheck="false" placeholder="오늘의 일기를 기록하세요." required></textarea>
      <div class="file-options">
        <div class="option file-name">
          <label>오늘의 기분</label>
          <input type="text" spellcheck="false" placeholder="기분 조아!">
        </div>
        <div class="option save-as">
          <label>오늘의 날씨</label>
          <div class="select-menu">
            <select>
              <option value="text/plain"></option>
              <option value="text/javascript">바람 쌩쌩</option>
              <option value="text/html">비 주룩주룩</option>
              <option value="image/svg+xml">눈 펑펑</option>
              <option value="application/msword">햇빛 쨍쨍</option>
            </select>
          </div>
        </div>
      </div>
      <button class="save-btn" type="button">일기 등록하기!</button>
    </div>
  </body>
</template>
<script>
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}
body{
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 10px;
  background: #dff9fd;
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
.wrapper .save-btn{
  color: #fff;
  cursor: pointer;
  opacity: 0.6;
  padding: 16px 0;
  margin-top: 20px;
  pointer-events: none;
  background: #a7d3f3;
}
.save-btn:hover{
  background: #148c9f;
}
textarea:valid ~ .save-btn{
  opacity: 1;
  pointer-events: auto;
  transition: all 0.3s ease;
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
</style>