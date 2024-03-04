<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" integrity="sha512-fmJ4kaw6U5fSNAnusU4+eJ6qkhsQbS5ya1yW3zL/peXuRDGzH/ln5VTcBYIL3qy9z5H0bs2dnSC6LXw75RlcCw==" crossorigin="anonymous" referrerpolicy="no-referrer" />

<template>
  <div class="preview">
    <div class="image-card">
      <img class="dog-image" src="../assets/images/dog55.jpg" alt="dog" />
    </div>
    <div class="content">
      <div class="header">
        <div class="profile-info">
          <img class="profile-image" src="../assets/images/profil11.png" alt="Profile" />
          <h1 class="username">이구역댕댕이는바로나</h1>
        </div>
        <div class="text-content">
          <div class="intro">
            <p>오늘은 댕댕이 친구들을 만나러 가서 나 혼자 셀카를 찍어봤지 뭐랄까 살짝은 인싸가 된 기분? (˵ ͡° ͜ʖ ͡°˵)</p>
          </div>
          <div class="hashtags">#셀스타그램 #댕스타그램 #이구역댕댕이는바로나</div>
          <div class="time-like">
              <div class="time-posted">5시간 전</div>
              <div class="like" @click="handleLike">좋아요 18</div>
            </div>
        </div>
      </div>
      <div class="interactions">
        <div class="comments" v-for="comment in comments" :key="comment.id">
          <div class="comment">
            <img class="comment-profile-image" :src="comment.profileImageUrl" alt="Profile" />
            <span class="user">{{ comment.user }}</span>
            <span class="user-comment">{{ comment.text }}</span>
            <div></div>
            <span class="time-commented">{{ comment.time }}</span>
            <div class="like-commented">
              <div class="comment-like" @click="handleLike(comment.id)">
                <i class="fas fa-heart"></i> {{ comment.likes }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="interactions">
         <!-- 댓글 수 -->
        <div class="comment-count">
        <i class="far fa-comment"></i> 댓글 {{ comments.length }} 개
        </div>
        <!-- 게시글 좋아요 -->
      <div class="like-count">
         <i class="fas fa-heart"></i> {{ likeCount }} 개의 좋아요
      </div>
        <!-- 게시글 좋아요 누르는 아이콘 -->
      <div class="like" @click="handleLike">
          <i class="fas fa-heart"></i>
      </div>
      </div>
      <div class="add-comment">댓글을 입력하세요</div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'preview',
  data() {
    return {
      comments: [
        {
          id: 1,
          profileImageUrl: require("../assets/images/profil11.png"),
          user: "코기",
          text: "다음엔 코기랑도 사진 찍자멍!",
          time: "4주 전",
          likes: 18
        },
        {
          id: 2,
          profileImageUrl: require("../assets/images/profil11.png"),
          user: "웰시",
          text: "다음엔 코기랑 웰시랑 셋이 사진 찍자멍!",
          time: "6시간 전",
          likes: 5
        },
        {
          id: 3,
          profileImageUrl: require("../assets/images/profil11.png"),
          user: "웰시코기",
          text: "그럼 웰시코기야?",
          time: "4시간 전",
          likes: 20
        },
        {
          id: 1,
          profileImageUrl: require("../assets/images/profil11.png"),
          user: "코기",
          text: "다음엔 코기랑도 사진 찍자멍!",
          time: "4주 전",
          likes: 18
        },
        {
          id: 2,
          profileImageUrl: require("../assets/images/profil11.png"),
          user: "웰시",
          text: "다음엔 코기랑 웰시랑 셋이 사진 찍자멍!",
          time: "6시간 전",
          likes: 5
        },
        {
          id: 3,
          profileImageUrl: require("../assets/images/profil11.png"),
          user: "웰시코기",
          text: "그럼 웰시코기야?",
          time: "4시간 전",
          likes: 20
        },
        // Add more comments here if needed
      ]
    };
  },
  methods: {
    handleLike(commentId) {
      // Implement like functionality here
      // You can use commentId to identify the comment being liked
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

@font-face {
    font-family: 'omyu_pretty';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-01@1.0/omyu_pretty.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}

h1, h2, h3, h4, h5, h6 {
    font-family: 'Ownglyph_meetme-Rg';
  margin-top: 0;
  margin-bottom: 0.5rem; 
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.8);
  font-weight: 400;}


  .preview {
  margin-top: 300px;
  display: flex;
  align-items: center; /* 수직 가운데 정렬 */
  justify-content: center; /* 수평 가운데 정렬 */
  border-radius: 20px;
  max-width: 1000px;
  max-height: 1200px;
  border: 2px solid #ddd; /* 테두리 스타일 및 색상 설정 */
  padding: 20px; /* 테두리와 내용 사이의 간격 설정 */
}

.profile-info {
  display: flex;
  align-items: center;
}

.username {
  font-size: 1.7rem;
  /* margin-top: 25px; */
  margin-left: 5px;
}

.intro {
  font-size: 1.1rem;
  margin-top: 20px;
  margin-bottom: 10px; 
  text-align: left;
}
  
.image-card {
  /* margin-top: 200px; */
  max-width: 100%;
  /* height: 80vh; */
}

.content {
  /* margin-top: 200px; */
  max-width: 800px;
  /* height: 80vh; */
  padding: 0 20px;
}
  .dog-image {
    max-width: 500px;
    max-height: 100%;
    display: block;
  }
  

  .profile-image {
    margin-top: -10px;
    border-radius: 50%;
    border: 4px solid;
    margin-right: 10px;
    width: 50px;
    height: 50px;
  }

  .comment-profile-image {
    width: 35px;
    height: 35px;
    border: 1px solid;
    border-radius: 50%;
  }

  .text-content p {
    font-family: 'omyu_pretty';
    font-weight: 500;
    font-size: 1.3rem;
    margin: 5px 0;
  }
  
  .hashtags {
    margin-top: 20px;
    font-family: 'omyu_pretty';
    text-align: left;
    color: #0b0c5ce5;
    font-size: 1.2rem;
  }
  
  .time-posted {
    margin-top: 3px;
    font-family: 'omyu_pretty';
    text-align: left;
    color: #999;
    font-size: 1.1rem;
  
  }
  
  .interactions {
    font-family: 'omyu_pretty';
    border-top: 2px solid #ddd;
    padding-top: 10px;
    margin-top: 15px;
  }

  .interaction-info {
  display: flex;
  justify-content: space-between;
}

  .like {
    margin-top: -33px;
    font-family: 'omyu_pretty';
    color: #2222228c;
    font-size: 1.1rem;
    font-weight: bold;
    cursor: pointer;
    text-align: right;
  }

  .comment-like {
    font-size: 1.2rem;
  }

  .comment-like {
    font-family: "Montserrat", Arial, sans-serif;;
    font-size: 1.2rem;
    color: red; /* 하트 아이콘의 색상 */
    margin-right: 3px; /* 아이콘과 숫자 사이의 간격 조정 */
  }

  .i {
    font-family: "Montserrat", Arial, sans-serif;;
    font-size: 1.2rem;
    color: red; /* 하트 아이콘의 색상 */
    margin-right: 3px; /* 아이콘과 숫자 사이의 간격 조정 */
  }
  
  .comment {
  display: flex;
  flex-direction: row; /* 댓글 요소들을 가로로 배치 */
  align-items: center; /* 요소들을 세로 가운데 정렬 */
  padding: 10px 0; /* 위아래로 간격 추가 */
}

.user {
  font-size: 1.2rem;
  margin-left: 10px; 
  font-weight: bold;
}
.user-comment {
  font-size: 1.2rem;
  flex-grow: 1; /* 댓글 내용이 가능한 최대 너비를 가지도록 설정 */
  margin-left: 15px;
  text-align: left;
}

.time-commented {
  font-size: 1.2rem;
  margin-right: 5px;
  margin-left: auto; /* 시간 정보를 오른쪽으로 정렬 */
  color: #999;
}


  /* .add-comment {
    color: #999;
    margin-top: 10px;
    cursor: pointer;
  } */


  </style>