<template>
    <div class="blank">
        <div class="share-modal">
            <button type="button" class="btn-close" @click="$emit('closeShareModal')" aria-label="Close">
              <img src="../assets/images/x.png" alt="Close"/>
            </button>
            <h1>공유하기</h1>
        </div>
        <div class="url-box">
            <input type="text" v-model="urlToShare" ref="urlInput" style="color: #007bff; margin-right: 1%;" readonly>
            <button style="width: 7vw;" @click="copyUrl">URL 복사</button>
        </div>    
    </div>
</template>

<script>
export default {
    props: {
        showShareModal: Boolean,
        selectedPost: Object
    },
    data() {
        return {
            urlToShare: ''
        };
    },
    created() {
        // 컴포넌트가 생성될 때, 부모 컴포넌트로부터 게시물 ID를 전달받아 URL을 생성
        this.generateUrl(this.$route.params.id);
    },
    methods: {
        generateUrl(postId) {
            let baseUrl = window.location.origin; // 현재 웹사이트의 기본 URL
            this.urlToShare = `${baseUrl}/qnaboard/get/${this.selectedPost.id}`; // 게시물의 고유한 URL 생성
        },
        copyUrl() {
            // input 태그의 텍스트를 복사하는 로직
            const inputElement = this.$refs.urlInput; // ref 속성을 사용하여 input 요소에 접근
            inputElement.select(); // 텍스트를 선택
            document.execCommand('copy'); // 복사 명령 실행
        }
    }
}
</script>

<style scoped>
* {
    font-family: 'Ownglyph_meetme-Rg';
}

.blank {
    display: flex;
    justify-content: center;
    align-items: center; 
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 100;
}
.share-modal {
    position: relative;
    color: black; 
    background-color: white;
    width: 25vw;
    height: 20vh;
    padding: 20px; 
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
    display: flex; 
    flex-direction: column; 
    justify-content: center; 
    align-items: center;
}
.btn-close {
    position: absolute;
    top: 4%; /* 상단에서부터의 거리 */
    right: 4%; /* 우측에서부터의 거리 */
    background-color: transparent;
    border: none;
    border-radius: 100%;
    padding: 0;
    cursor: pointer;
    width: 30px;
    height: 30px;
    transition: background-color 0.3s ease;
}
h1 {
    color: black;
    font-size: 1.5rem;
    font-weight: bold;
    position: absolute;
    top: 8%; /* 상단에서부터의 거리 */
}
.url-box {
    position: absolute; 
    bottom: 42.5%; 
    display: flex;
    justify-content: center;
    border: 0.8px solid black;
    border-radius: 2px;
}
</style>