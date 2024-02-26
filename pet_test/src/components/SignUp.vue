<template>
<br>
<br>
<h1>반갑개</h1>
<h2>반려동물 관리 솔루션, 지금 바로 시작해보세요!</h2>
<br>
<form @submit.prevent="trySign">
<p> 이름</p>
<input  type="text" placeholder="사용할 닉네임을 입력하세요" v-model="name" required>
<p> 이메일</p>
<input  type="text" placeholder="사용할 이메일을 입력하세요" v-model="email" required>
<p> 비밀번호</p>
<input  type="password" placeholder="비밀번호를 입력하세요" v-model="password" required>
<span>* 8자 이상이면서 최소한 숫자 하나와 글자 하나를 포함해야 합니다.</span>
<p> 비밀번호 재확인</p>
<input type="password" placeholder="비밀번호를 다시 입력하세요" required>
<span>* 비밀번호를 다시 입력해주세요</span>
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

p {
    position: relative;
    margin-left: 0px;
}

.input{
    width: 250px;
}

</style>