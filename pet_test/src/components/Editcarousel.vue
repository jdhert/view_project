<template>
    <section>
        <div class="main">
            <div id="app">
                <div class="card">
                  <form v-on:submit.prevent='postData'>
                    <div class="header">
                        <h1>{{ name }}의 집사일기</h1>
                        <div class="emoji-container">
                        <!-- Replace with actual image paths -->
                            <img src="../assets/images/cogi.png" alt="Emoji 1">
                            <img src="../assets/images/cute.png" alt="Emoji 2">
                            <img src="../assets/images/bdog.png" alt="Emoji 3">
                            <img src="../assets/images/gdog.png" alt="Emoji 4">
                        </div>
                    </div>
                    <!-- Date container -->
                    <div class="option animal-as">
                      <label>나의 반려동물</label>
                      <div class="select-menu">
                        <h1 class="ChangepetName">{{ name }}</h1>
                    </div>
              </div>
              <div class="option-container">
                      <div class="option mood-as">
                        <label>오늘의 기분</label>
                        <input type="text" spellcheck="false" placeholder="Good~" v-model="mood"/>
                      </div>
                      <div class="option save-as">
                        <label>오늘의 날씨</label>
                        <div class="select-menu">
                          <select v-model="weather">
                            <option value="sunny">햇빛 쨍쨍</option>
                            <option value="wind">바람 쌩쌩</option>
                            <option value="rain">비 주룩주룩</option>
                            <option value="snow">눈 펑펑</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="date">
                        <input class="title" placeholder="제목을 입력해주세요." type="text" name="text" style="border: none; background: transparent;" v-model="title">
                        <hr>
                        
                        <div class="dateCalendar">
                            <span>{{ selectedDate }}</span>
                            <a href="#" @click="toggleCalendar"><img src="../assets/images/calendar.png" alt="Calendar"></a>
                            <input class="date1" v-if="showCalendar" type="datetime-local" @change="selectDate($event.target.value)">
                        </div>
                    </div>
                    <!-- Text area for the diary entry -->
                    <div class="content">
                        <textarea placeholder="오늘의 집사 일기를 입력해주세요." v-model="content">{{ this.content }}</textarea>
                    </div>
                    <!-- Footer with buttons -->
                    <div class="footer">
                    <button type="submit" class="register-btn" onclick = "location.href = '/mypage'">수정 취소할 고양?</button>
                    <button class="list-btn">수정할 고양?</button>
                    <label for="file-upload" class="custom-file-upload">
                        파일 선택
                    </label>
                    <input id="file-upload" class="image" type="file" @change="onFileChange">
                    <img v-if="imageUrl" :src="imageUrl" alt="Selected Image">
                    </div>
                    <div class="file-options">
                    </div>
                  </form>
                    </div>
                
            </div>
        </div>
    </section>
    </template>
    
    <script>
    export default {
        data() {
            return {
        imageUrl: null,
        file: null,
        showCalendar: false,
        selectedDate: '',
        pets : {},
        petSelect : "",
        title: "",
        content : "",
        mood: "",
        weather: "sunny",
        name : "",
      };
    },
    methods: {
      onFileChange(e) {
        const file = e.target.files[0];
        this.file = file;
        this.imageUrl = URL.createObjectURL(file);
      },
      toggleCalendar() {
          this.showCalendar = !this.showCalendar;
        },
        selectDate(date) {
          this.selectedDate = date;
          this.showCalendar = false;
        },
        upload(){
          console.log('test');
        },
        change(petname){
          console.log(petname);
          this.name = petname;
        },
        changePet() {
        const selectedPetId = this.petSelect;
        console.log('Selected pet ID:', selectedPetId);
        console.log('Pets:', this.pets);
        const selectedPet = this.pets.find(pet => pet.id === selectedPetId);
        console.log('Selected pet:', selectedPet);
        if (selectedPet) {
          this.name = selectedPet.name;
        }
      },
      postData(){
        console.log(this.mood);
        this.diaryId = this.$cookies.get('diaryId')
        this.axios.put(`/api/myinfo/edit/${this.diaryId}`, 
        {
            mood: this.mood,
            weather: this.weather,
            title: this.title,
            content: this.content,
            createdAt: this.selectedDate,
            id: this.$cookies.get('diaryId'),
            // petId: this.petSelect
        }).then(() => {
            this.$router.push('/carousel');
        }).catch(error => {
          console.log("데이터 보내기 실패")
        });
      }
      },
      mounted() {
        this.diaryId = this.$cookies.get('diaryId');
        this.axios.get(`/api/myinfo/update/${this.diaryId}`).then(res => {
        // 받아온 데이터를 각각의 데이터 속성에 할당
        console.log(this.diaryId)
        console.log(res.data);
        this.content = res.data[0].content;
        this.title = res.data[0].title;
        this.name = res.data[0].name;
        this.created_at = res.data[0].created_at;
        this.mood = res.data[0].mood;
        this.weather = res.data[0].weather;

        }).catch(error => {
            console.error('데이터 불러오기 실패:', error);
        });
      }
    }
    </script>
    
    <style scoped>
    .date1{
        border-radius: 10px;
        font-size: 18px;
    }
    
    .dateCalendar input[type="date"].show {
      display: block; /* this class will be toggled to show the calendar */}
    @font-face {
        font-family: 'EF_watermelonSalad';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2210-EF@1.0/EF_watermelonSalad.woff2') format('woff2');
        font-weight: normal;
        font-style: normal;
    }
    @font-face {
        font-family: 'Ownglyph_meetme-Rg';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2402_1@1.0/Ownglyph_meetme-Rg.woff2') format('woff2');
        font-weight: normal;
        font-style: normal;
    }
    
    *{
      font-family: 'Ownglyph_meetme-Rg';
    }
    
    .date1 {
      margin-top: 0.4rem;
    }
    
    .main {
        height: 900px;
    }
    .option :where(input, .select-menu){
    height: 50px;
    padding: 0 13px;
    margin-top: 6px;
    border-radius: 5px;
    border: 1px solid #bfbfbf;
    }
    .option .select-menu select{
      height: 50px; /* select 요소의 높이 설정 */
      width: 100%; /* select 요소의 너비를 부모 요소에 맞게 설정 */
      background: none;
    }
    div.select-menu{
      margin: 2.4px 0px 0px;
      width: 60%;
    }
    .option .animal-as{
      margin: 2.4px 0px 8px;
      width: 60%;
    }
    .option.mood-as{
      margin: 0px 15px 0px;
      width: 40%;
    }
    .option.save-as{
      margin: 2.4px 10px 0px;
    }
    .option {
      /* 기존 스타일 유지 */
      display: flex;
      align-items: center; /* 세로 중앙 정렬 */
    }
    
    .option label {
      /* 기존 스타일 유지 */
      margin-right: 10px; /* 라벨과 선택 메뉴 사이의 간격 조정 */
      font-size: 18px;
    }
    
    .select-menu {
      /* 기존 스타일 유지 */
      width: 20%; /* 선택 메뉴의 너비 조정 */
    
    }
    
    input {
      margin-top: 0.4rem;
      background-color: #ffffff;
      font-family: 'Ownglyph_meetme-Rg';
    
    }
    /* .image{
        font-family: 'Ownglyph_meetme-Rg';
        padding: 10px 20px;
        margin-right: 10px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        background-color: #7ab7e0;
        color: white;
        font-family: 'Ownglyph_meetme-Rg';
        font-size: 20px;
    } */
    .custom-file-upload {
        /* 파일 선택 버튼의 스타일 지정 */
        font-family: 'Ownglyph_meetme-Rg';
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px 20px;
        margin-right: 10px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        background-color: #edf6fc;
        color: #7ab7e0;
        font-size: 20px;
        width: 25%;
        height: 100%;
        border: 2px solid #7ab7e0;
    }
    
    /* input[type="file"] 요소 숨기기 */
    .image {
        display: none;
    }
    
    
      #app {
        background-image: url(../assets/images/background.jpg);
        background-size: 100%;
        position: relative; /* This is necessary for absolute positioning of the paw borders */
        width: 100%; /* Adjust as needed */
        height: 100%;
        padding-left: 60px; /* Adjust the padding to make space for the left paw border */
        padding-right: 60px; /* Adjust the padding to make space for the right paw border */
      }
    
      hr{
        margin-top: 0px;
        margin-bottom: 50px;
        color: #000;
      }
    
    
      .card {
        width: 50%;
        height: 80%;
        position: relative; 
        top: 120px;
        z-index: 1;
        margin: 0 auto;
        padding: 20px;
        border: 1px solid #eee;
        border-radius: 10px;
        background: #fff;
        box-shadow: 0 2px 12px rgba(0,0,0,0.1);
      }
      .title{
        font-family: 'Ownglyph_meetme-Rg';
        font-size: 20px;
      }
      .paw-border {
        margin-top: 120px;
      padding: 60px;
      position: absolute;
      top: 0;
      bottom: 0;
      display: flex;
      flex-direction: column;
      justify-content: center; /* This will center the content vertically */
    }
    
    .paw-border.left {
      left: 0;
    }
    .paw-border.right {
      right: 0;
    }
    
    .paw-print {
      /* Size as needed */
      width: 70px; /* Example size, adjust as needed */
      margin: 10px 0; /* This adds spacing between the paw prints */
    }
    .header {
      /* Style the header to align items as needed */
      display: flex;
      flex-direction: column;
      align-items: center;
    }
      .header h1 {
        margin: 0;
        font-size: 40px;
        font-family: 'Ownglyph_meetme-Rg';
      }
      .date span {
        font-size: 25px;
        font-family: 'Ownglyph_meetme-Rg';
      }
       
      .dateCalendar {
        display: flex;
        justify-content: center;
        align-items: center;
        top: 10px;
      }
     
      .dateCalendar > a {
        margin-left: 5px;
      }
    
      .emoji-container {
      /* Style to display emojis in a row */
      display: flex;
      justify-content: center;
      margin-top: 20px; /* Adjust as needed */
    }
    .emoji-container img {
      /* Style your emojis */
      margin: 0 5px; /* Adjust spacing between emojis */
      width: 50px; /* Adjust size as needed */
      height: auto;
    }
    .date {
      /* Style the date */
      margin-top: 20px; /* Adjust as needed */
      font-size: 25px; /* Adjust as needed */
    }
    .content textarea {
      /* Style the text area */
      width: 100%;
      height: 150px;
      margin-top: 20px; /* Adjust as needed */
      padding: 10px;
      border: 1px solid #eee;
      border-radius: 5px;
      font-family: 'Ownglyph_meetme-Rg';
      font-size: 23px;
    }
    .footer {
      /* Style the footer to align buttons */
      display: flex;
      justify-content: space-between;
      margin-top: 20px; /* Adjust as needed */
      height: 40px;
    }
    .register-btn, .list-btn {
      /* Style the buttons */
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      background-color: #7ab7e0;
      color: white;
      width: 48%; /* Adjust as needed to make both buttons equal width */
      font-family: 'Ownglyph_meetme-Rg';
      font-size: 20px;
    }
      .footer button {
        padding: 10px 20px;
        margin-right: 10px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        background-color: #7ab7e0;
        color: white;
        font-family: 'Ownglyph_meetme-Rg';
        font-size: 20px;
        height: 100%;
      }
      .option-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 20px; /* Adjust as needed */
    }
    
    .option {
      /* Common styles for both options */
      width: 48%; /* Adjust as needed to make both options equal width */
    }
    
    .option label {
      /* Styles for labels */
      font-size: 17px;
    }
    
    .option :where(input, .select-menu) {
      /* Styles for input/select elements */
      height: 50px;
      padding: 0 13px;
      margin-top: 6px;
      border-radius: 5px;
      border: 1px solid #bfbfbf;
    }
    
    .option .select-menu select {
      /* Styles for select elements */
      height: 50px;
      background: none;
    }
    .ChangepetName{
        font-size: 20px;
        margin-top: 5%;
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