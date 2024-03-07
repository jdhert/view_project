<template>
  <header class="banner">
      <h1 class="banner-title">C A L E N D A R</h1>
      <img src="../assets/images/배너5.png" alt="Banner" class="banner-image">
      <br>
    </header>
    <div class="row mt-1" id="filter-buttons">
                                    <div class="col-12">
                                        <button class="btn mb-2 me-1 active" data-filter="all"><img src="../assets/images/gallery.png" alt="">  갤러리로 보기</button>
                                        <button class="btn mb-2 mx-1" data-filter="nature"><img src="../assets/images/캘린더.png" alt="">  캘린더로 보기</button>
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
            
            {
                title : '댕댕이 1',
                start: '2024-03-26',
                backgroundColor: "#f0f8ff",
                textColor : "#000000"
            },
            {
                title : '댕댕이 2',
                start: '2024-03-26',
                backgroundColor: "#f0fff0",
                textColor : "#000000"
            },
            {
                title : '댕댕이 3',
                start: '2024-03-27',
                backgroundColor: "#e6e6fa",
                textColor : "#000000"
            },
            {
                title : '댕댕이 4',
                start: '2024-03-29',
                backgroundColor: "#fff0f5",
                textColor : "#000000"
            },
        ]
      }
    };
  },
};
</script>

<style scoped>
 
.fc{
  margin: 0 auto;
  width:60%;
  height: auto;
  margin-bottom: 200px;
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
  margin-left: 360px;
}
.fc-scroller-harness{
  overflow: hidden !important;
}





</style>
