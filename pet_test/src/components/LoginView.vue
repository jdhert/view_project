<template>
    <section id="banner1"><div class="inner">
					<h2 style="font-family: 'continuous', self">Login</h2>
					<form class="loginForm" @submit.prevent="tryLogin">
                        <input type="text" placeholder="email을 입력하세요" v-model="email" required>
                        <input type="password" placeholder="비밀번호를 입력하세요" v-model="password" required>
                        <input type="submit" value="로그인" style="background-color: #44608a;">
                    </form>
                    <div style=" display: flex; flex-wrap: wrap; align-items: center; padding: 5px;">
                    <hr>또는<hr style="margin-bottom: 50px;">
                    </div>
                    <button class="btn">
                        <img src="../assets/images/kakao.png">
                        카카오 계정 연결
                    </button>
                    <span style="color: #8f8f8f;">계정이 없으신가요?<a href="/signup"> 회원가입</a></span>
					</div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            email : "",
            password : ""
        }
    },
    methods : {
        tryLogin() {
  this.axios.post('/api/login', {
    email: this.email,
    password: this.password
  }).then((res) => {
    if(res.data == true){
      // Vuex 상태 업데이트
      this.$store.commit('setLoginStatus', true);
      // 선택적으로 사용자 정보 저장 (응답에 따라)
      this.$store.commit('setUser', this.$cookies.get("id"));
      this.$router.push('/');
    } else {
      alert("로그인 실패!!");
    }
  }).catch(error => {
    console.error("로그인 시도 중 오류 발생:", error);
    alert("로그인 과정에 문제가 발생했습니다.");
  });
}
    },
    mounted() {
        this.$emit('forceRerender');
    }
}
</script>

<style scoped>

@font-face { 
  font-family: "continuous";
  src: url("../assets/fonts/continuous.ttf") format("truetype");
  font-weight: normal;
}

#banner1 {
		color: white;
		background-image: url("../assets/images/loginBanner.jpg");
		background-size: cover;
		background-position: center center;
		background-repeat: no-repeat;
		color: #d8d8d8;
		padding: 14em 0;
		margin-top: 75px;
		text-align: center;
		position: relative;
		height: 100%;
	}

        #banner1 .inner {
            background-color: white;
            position: relative;
            z-index: 1;
            max-width: 700px; 
            margin: 0 auto; 
            display: flex; 
            flex-direction: column; 
           
            align-items: center; 
            padding: 2em; 
            
        }


        #banner1 .inner a {
            text-decoration: none;
        }


        #banner1 .inner hr {
            width: 245px;  
        }

	
        #banner1 .inner :last-child {
	
            margin-bottom: 0;
	
        }

		#banner1 h2, #banner1 h3, #banner1 h4, #banner1 h5, #banner1 h6 {
			color: #000000;
            font-weight: bold;
            text-transform: none;
		}

	

		#banner1 h2 {
			font-size: 3.5em;
			line-height: 1em;
			margin: 0 0 0.5em 0;
			padding: 0;
		}

		#banner1 p {
			font-size: 1.5em;
			margin-bottom: 2em;
		}

		#banner1 p a {
			color: #ffffff;
			text-decoration: none;
		}

.loginForm {
    align-content: center;
    margin-bottom: 0;
}

.loginForm > input {
    position: relative;
    width: 500px;
    margin: 10px;
}


.btn {
    border:none;
    border-radius:10px;
    color: rgb(233, 211, 211);
    
    background-color: rgb(255, 255, 41);
    align-content: center;
}
</style>