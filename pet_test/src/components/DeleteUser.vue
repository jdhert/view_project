<template>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <section>
        <div class="container d-flex justify-content-center">
            <div class="card">
                <div class="d-flex justify-content-center flex-column">
                    <div class="user">
                        <div class="d-flex">
                            <div><img :src="this.user.imgPath" alt="Thumbnail" class="thumbnail"/></div>
                            <div class="userName">
                                <div class="fw-bold">{{this.user.name}}</div>
                                <div class="text-muted">{{this.user.email}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="m-4">
                        <h3 class="m-2 mb-4">정말 계정을 삭제하시겠습니까?</h3>
                        <div class="d-flex justify-content-between mx-3">
                            <button class="btn btn-secondary" @click="cancelDelete">취소</button>
                            <button class="btn btn-primary" @click="deleteAccount">확인</button>
                        </div>                    
                    </div>
                </div>
            </div>
        </div>
    </section>

</template>

<script>
export default {
  data() {
    return {
      user:{},
    };
  },

  methods: {
    deleteAccount() {
        // 계정 삭제
        this.axios.post('/api/deleteUser', { userId: this.user.id })
          .then(() => {
            // 계정이 삭제되었으므로 로그아웃 처리
            this.axios.get('/api/login/logout').then(() => {
              // Vuex 상태 업데이트
              this.$store.commit('setLoginStatus', false);
              this.$store.commit('setUser', {});
              // 로그아웃 후 리다이렉트
              this.$store.dispatch('logout');
              this.$router.push('/login');
            }).catch(error => {
            //   console.error("로그아웃 시도 중 오류 발생:", error);
            });
          })
          .catch(error => {
            // console.error("계정 삭제 중 오류 발생:", error);
          });
    },
    cancelDelete() {
        // 삭제 취소
        this.$router.push('/mypage');
    }
  },
  mounted() {
	    if (!this.$cookies.get("id")) {
	    	alert("로그인이 필요합니다.");
	    	this.$router.push('/login');
	    	return;
	    }
		this.axios.get(`/api/myinfo/${this.$cookies.get("id")}`).then((res) => {
			this.user = res.data;
		}).catch();
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

.card {
    display: flex;
    justify-content: center;
    border: 1px solid #e0e0e0;
    border-radius: 20px;
    padding: 20px;
    max-width: 500px;
    max-height: 1500px;
    margin: auto;
    margin-top: 250px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.user {
    width: 80%;
    flex-wrap: wrap;
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin: auto;
}

.user > .d-flex {
    justify-content: center;
    flex-wrap: wrap;
    margin: 0 20px 0 20px;
}

.userName {
    display: flex;
    flex-direction: column;
    align-items: baseline;
    justify-content: center;
}

.thumbnail {
  width: 70px;
  height: 70px;
  object-fit: cover;
  background-color: #ffffff;
  border: 3px solid rgb(212, 229, 255);
  border-radius: 50%;
  margin: 10px 10px 10px 0;
}

.m-4 > * {
    font-family: 'Ownglyph_meetme-Rg';
}

.btn-secondary {
    background-color: #ffffff;
    color: black;
    width: 60px;
}

.btn-primary {
    background-color: #a7d3f3;
    border: 2px solid #a7d3f3;
    width: 60px;
}

.btn-primary:hover {
    background-color: #85ccff;
    border: 2px solid #9ed2f8;
}

.btn-primary:active {
    background-color: #6ac1ff !important;
    border-color: #9ed2f8 !important;
}

</style>