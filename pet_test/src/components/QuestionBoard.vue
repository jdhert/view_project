<template>
    <div class="container">
        <header class="banner">
            <h1 class="banner-title">반려동물 무엇이든 물어보라냥</h1>
            <h3 class="banner-subtitle">반려동물의 궁금증을 사람들과 공유해보세요</h3>
            <img src="../assets/images/img6.png" alt="Banner" class="banner-image">
            <br>
        </header>
        <div class="search-bar">
            <select class="search-select">
                <option>작성자</option>
                <option>작성일</option>
                <option>내용</option>
                <option>태그</option>
                <!-- Add more options here -->
            </select>
            <br>
            <input type="search" class="search-input" placeholder="검색어를 입력할거냥">
            <button class="search-button">검색</button>
        </div>

        <div class="content">
            <div class="card-columns">
                <div class="card" v-for="(post, index) in posts" :key="post.id"
                    :style="{ width: getCardWidth(posts.length) }">
                    <div class="card-header">
                        <span class="tag" :class="getTagClass(post.tag)">{{ post.tag }}</span>
                        <h2 class="card-title">{{ post.title }}</h2>
                    </div>
                    <div class="card-body">
                        <p>{{ post.body }}</p>
                    </div>
                    <div class="card-footer">
                        <span class="date">{{ post.date }}</span>
                        <span class="comments">{{ post.comments }} comments</span>
                    </div>
                </div>
            </div>
        </div>

        <button class="btn btn-success mt-3 custom-button" @click="goToWrite">글쓰기</button>

        <div class="pagination">
            <button class="page-link">«</button>
            <button class="page-link" v-for="n in maxpage" :key="n" @click="currentSwap(n)">{{ n }}</button>
            <button class="page-link">»</button>
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            posts: [

            ],
            currentpage: 1,
            maxpage: 1
        };
    },
    mounted() {
        this.axios.get(`/api/qna/${this.currentpage}`).then((res) => {
            for (let a of res.data) {
                this.posts.push({ id: a.id, title: a.title, body: a.content, tag: a.category, date: a.createdAt, comments: a.commentCount })
                if (a.totalRowCount <= 4) {
                    this.maxpage = 1;
                } else {
                    this.maxpage = Math.ceil((a.totalRowCount - 4) / 7) + 1;
                }
            }

        })
    },
    methods: {
        currentSwap(n) {
            this.currentpage = n;
            this.getBoard();
        },
        getBoard() {
            this.posts = [];
            this.axios.get(`/api/qna/${this.currentpage}`).then((res) => {
                for (let a of res.data) {
                    this.posts.push({ id: a.id, title: a.title, body: a.content, tag: a.category, date: a.createdAt, comments: a.commentCount });
                }
            });
        },
        getTagClass(tag) {
            switch (tag) {
                case '고양이':
                    return 'cat';
                case '강아지':
                    return 'dog';
                case '소동물':
                    return 'small-animal';
                default:
                    return 'other';
            }
        },
        getCardWidth(postCount) {
            if (postCount === 1) {
                return '25%'; // 화면 너비의 25%
            } else if (postCount === 2) {
                return '50%'; // 화면 너비의 50%
            } else if (postCount === 3) {
                return '75%'; // 화면 너비의 75%
            } else if (postCount >= 4) {
                return '100%'; // 화면 너비의 100%
            }
        },
        goToWrite() {
            this.$router.push(`/addqan`); 
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

* {
    font-family: 'Ownglyph_meetme-Rg';
}

.container {
    max-width: 1450px;
    margin-top: 120px;
    padding: 20px;
}

.banner {
    margin-top: 0px;
    text-align: center;
}

.banner-image {
    width: 100%;
    height: auto;
    margin-bottom: 20px;
}

.banner-title {
    font-family: 'Ownglyph_meetme-Rg';
    font-size: 2.3rem;
    margin-bottom: 10px;
}

.banner-subtitle {
    font-family: 'Ownglyph_meetme-Rg';
    font-size: 1.3rem;
    color: #777;
}

.search-bar {
    margin-top: 100px;
    /* 변경 */
    display: flex;
    justify-content: flex-end;
    /* 변경 */
    gap: 5px;
    margin: 8px 0 8px auto;
    /* 변경 */
    width: 100%;
    max-width: 440px;
}

.search-select,
.search-input {
    flex: 1;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.search-button {
    padding: 8px 20px;
    background-color: #8d8d8d;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}


.content {
    margin-bottom: 30px;
}

.card-columns {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
}

.card {
    background-color: #fff;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    overflow: hidden;
}

.card-body {
    font-size: 1.rem;
}

.card-header {
    padding: 20px;
    background-color: #ececec;
    height: 120px;
}

.tag {
    display: inline-block;
    padding: 5px 10px;
    border-radius: 20px;
    color: #fff;
}


.cat {
    background-color: #f87495;
}

.dog {
    background-color: #61bffd;
}

.small-animal,
.other {
    background-color: #12af41;
}


.card-title {
    font-size: 1.2rem;
    margin: 10px 0;
}

.card-body {
    padding: 20px;
    height: 100px;
}

.card-footer {
    padding: 20px;
    background-color: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #777;
}

.custom-button {
    margin-left: 1280px;
    /* 왼쪽 여백을 auto로 설정하여 오른쪽으로 정렬 */
    padding: 8px 20px;
    background-color: #8d8d8d;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.pagination {
    display: flex;
    justify-content: center;
    gap: 10px;
}

.page-link {
    border: none;
    background-color: transparent;
    color: #333;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
}

.page-link:hover {
    background-color: #f0f0f0;
}

@media (min-width: 768px) {
    .card-columns {
        column-count: 3;
        column-width: 80%;
    }
}
</style>
  