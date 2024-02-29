<template>
    <div class="calendar">
      <div class="month">
        <ul>
          <li class="prev">&#10094;</li>
          <li class="next">&#10095;</li>
          <li>February<br><span style="font-size:18px">2024</span></li>
        </ul>
      </div>
      <ul class="weekdays">
        <li>월</li>
        <li>화</li>
        <li>수</li>
        <li>목</li>
        <li>금</li>
        <li>토</li>
        <li>일</li>
      </ul>
      <ul class="days">
        <li v-for="day in days" :key="day" :class="{ 'active': day === 9 }">{{ day }}</li>
      </ul>
    </div>
  </template>
  <script>
  export default {
    data() {
      return {
        days: Array.from({ length: 28 }, (_, i) => i + 1), // 가정: 2월은 28일까지 있다고 가정
      };
    }
  };
  </script>
  <style scoped>
  .calendar {
    width: 100%;
    background: white;
    padding: 20px;
    max-width: 600px;
    margin-top: 20%;
    border-radius: 10px;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    display: inline-block;
  }
  .month {
    text-align: center;
  }
  .month ul {
    margin: 0;
    padding: 0;
  }
  .month ul li {
    display: inline;
    font-size: 20px;
    text-transform: uppercase;
    letter-spacing: 3px;
  }
  .month .prev {
    float: left;
    padding-left: 20px;
  }
  .month .next {
    float: right;
    padding-right: 20px;
  }
  .weekdays {
    margin: 0;
    padding: 10px 0;
    background-color: #ddd;
    list-style-type: none;
  }
  .weekdays li {
    display: inline-block;
    width: 13.6%;
    text-align: center;
    margin-bottom: 5px;
    font-size: 20px;
    color: #666;
  }
  .days {
    padding: 10px 0;
    background: #eee;
    margin: 0;
    list-style-type: none;
  }
  .days li {
    display: inline-block;
    width: 13.6%;
    text-align: center;
    margin-bottom: 5px;
    font-size: 24px;
    color: #777;
  }
  .days li .active {
    padding: 5px;
    background: #1ABC9C;
    color: white !important
  }
  </style>