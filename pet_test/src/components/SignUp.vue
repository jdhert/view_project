<template>
<br>
<br>
<h1>반갑개 <img src="../assets/images/paw1.png"></h1>
<h2>반려동물 관리 솔루션, 지금 바로 시작해보세요!</h2>
<br>
<form @submit.prevent="trySign" class="signForm">
<p> 이름</p>
<input type="text" placeholder="사용할 닉네임을 입력하세요" v-model="name" required>
<p> 이메일</p>
<input  type="text" placeholder="사용할 이메일을 입력하세요" v-model="email" required>
<div class="passwordForm">
<p> 비밀번호</p>
<input  type="password" placeholder="비밀번호를 입력하세요" v-model="password" required>
<span>* 8자 이상이면서 최소한 숫자 하나와 글자 하나를 포함해야 합니다.</span>
<br>
<p> 비밀번호 재확인</p>
<input type="password" placeholder="비밀번호를 다시 입력하세요" required>
<span>* 비밀번호를 다시 입력해주세요</span>
</div>
<br>
<p>주소</p>
<input  type="text" placeholder="주소를 입력해주세요" v-model="address" required>
<br>
<input type="submit" value=회원가입 style="background-color: rgb(117, 171, 241); color: azure;">
</form>
</template>
<script>

export default {
    data() {
        return {
            name : "",
            email : "",
            password : "",
            address : ""
        }
    },
    methods : {
        trySign() {
            this.axios.post('/api/signup', {
                name : this.name,
                email : this.email,
                password : this.password,
                address : this.address
            }).then((res) => {
                if(res.data == true){
                    this.$router.replace('/')
                } else {
                    alert("회원가입 실패!!");
                }
            }).catch();
        }
    }
}
</script>
<style>

h1 {
    font-size: 65px;
    font-weight: bold;
}


.signForm {
    display: flex;
    flex-direction: column;
    align-items: center; /* 모든 항목을 가운데 정렬 */
}

.signForm input {
    border: solid;
    margin-bottom: 20px;
    width: 600px; /* 문맥에 따라 적절한 폭으로 설정 */
}

.signForm p {
    font-weight: solid;
    margin-left: 600px;
    text-align: left; /* 'p' 요소 내 텍스트 왼쪽 정렬 */
    width: 100%; /* p 태그의 너비를 부모의 100%로 설정 */
    margin-bottom: 0;
}

.passwordForm {
    height: 200px;
    
    display: flex; /* flex 컨테이너 설정 */
    justify-content: center; /* 가운데 정렬 */
    align-items: center; /* 세로 가운데 정렬 */
}

/* .passwordForm > p,
.passwordForm > span {
    margin-right: auto; /* 요소들을 왼쪽으로 정렬하고 나머지 공간은 오른쪽으로 밀어냄
    align-self: center; /* 가로 중앙 정렬을 적용하기 위해 flex 컨테이너에서 사용 가능 
} */

</style>