<template>
  <header class="banner">
      <h1 class="banner-title">C A L E N D A R</h1>
      <img src="../assets/images/배너5.png" alt="Banner" class="banner-image">
      <br>
    </header>
    <div class="row mt-1" id="filter-buttons">
                                    <div class="col-12">
                                        <button class="btn mb-2 me-1 active" data-filter="all" onclick="location.href='/diary'"><img src="../assets/images/gallery.png" alt="">  갤러리로 보기</button>
                                        <button class="btn mb-2 mx-1" data-filter="nature" onclick="location.href='/calendar'"><img src="../assets/images/calendar1.png" alt="">  캘린더로 보기</button>
                                    </div>
                                    
                                </div>
  <FullCalendar :options='calendarOptions' />
  
</template>

<script>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'


export default {
  components: {
    FullCalendar, // FullCalendar 컴포넌트 등록
  },
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin],
        initialView: 'dayGridMonth',
        editable : true, 
        eventLimit : true,
        weekends: true,
        scrollTime: '00:00:00',
        events: [
        ]
      }
    };
  },
  mounted(){
    this.axios.get(`/api/myinfo/calendar/${this.$cookies.get("id")}`).then((res) => {
        console.log(this.$cookies.get("id"))
        console.log(res.data)

        // 파스텔 색상을 위한 색상 팔레트
        const pastelColors = [
            "#FFA07A", "#FFB6C1", "#FFC0CB", "#FFD700", "#FFDAB9",
            "#FFDEAD", "#FFE4B5", "#FFE4C4", "#FFE4E1", "#FFEBCD",
            "#FFEFD5", "#FFF0F5", "#FFF5EE", "#FFF8DC", "#FFFACD",
            "#FFFAF0", "#FFFAFA", "#FFFF00", "#FFFFE0", "#FFFFF0"
        ];

        const colors = {}; // 이름과 색상을 매핑하기 위한 객체

        res.data.forEach(item => {
            if (!colors[item.name]) { // 이미 색상이 할당되어 있는지 확인
                // 랜덤한 파스텔 색상을 할당
                const randomIndex = Math.floor(Math.random() * pastelColors.length);
                colors[item.name] = pastelColors[randomIndex];
                // 사용된 색상은 팔레트에서 제거
                pastelColors.splice(randomIndex, 1);
            }

            // 이벤트를 추가할 때 해당 이름에 할당된 색상을 사용
            this.calendarOptions.events.push({
                title: item.name,
                start: item.createdAt.split('T')[0],
                backgroundColor: colors[item.name],
                textColor: "#000000"
            });
        });
    }).catch(error => {
        console.error("데이터를 가져오는 도중 오류가 발생했습니다:", error);
    });
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

*{
  font-family: 'Ownglyph_meetme-Rg';
}


.fc{
  margin: 0 auto;
  width:60%;
  height: auto;
  margin-bottom: 200px;
}
.fc-scroller{
  margin: 0%;
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
.banner_2 {
  margin-top: 50px;
}
.btn img {
    max-width: 20px;
    max-height: 50px;
}
#filter-buttons{
  margin-top: 40px;
  margin-bottom: 20px;
}
#filter-buttons button {
  border-radius: 3px;
  background: #fff;
  border-color: transparent;
  font-family: 'Ownglyph_meetme-Rg';
  width: 120px;
  height: 25px;
  font-size: 15px;
  
}


#filter-buttons button.active:hover {
  background: #ddd;
}

#filter-buttons button.active {
  color: #000000;
  background-color: #fff;
}
#filter-buttons button{
  color: #fff;
  background: #74b1e7;
  margin: 0px;
  padding:0px;
}
.col-12{
  margin-left: 380px;
}
.fc-scroller-harness{
  overflow: hidden !important;
}

#filter-buttons button {
  cursor: pointer; /* 손가락 모양의 커서로 설정 */
}

#filter-buttons {
  margin-top: 20px; /* 원하는 값으로 조정 */
  margin-bottom: 10px; /* 원하는 값으로 조정 */
}
</style>
