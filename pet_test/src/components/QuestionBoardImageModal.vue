<template>
    <div class="ForImage" @click="handleOutsideClick" >
        <img :src="image.src" class="img d-block w-100" alt="...">
    </div>
</template>

<script>
export default {
    props: {
        showImageModal: Boolean,
        selectedImage: Object,
        image: Object
    },
    methods: {
        handleOutsideClick(event) {
            if (!event.target.closest('.img')) {
                this.closeImageModal();
            }
        },
        handleKeyUp(event) {
            if (event.key === 'Escape') {
                this.closeImageModal();
            }
        },
        closeImageModal() {
            this.$emit('closeImageModal');
        }
    },
    mounted() {
        document.addEventListener('keyup', this.handleKeyUp);
    },
    beforeUnmount() {
        document.removeEventListener('keyup', this.handleKeyUp);
    }
};
</script>

<style scoped>
.ForImage {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%; 
    height: 100%; 
    margin: 0;
    padding: 0;
    background-color: rgba(0, 0, 0, 0.5); /* 검정색 투명 배경을 나타내는 rgba 값 */
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
}
.img {
    max-width: 70%; /* 이미지의 최대 너비를 설정합니다. */
    max-height: 70vh; /* 이미지의 최대 높이를 설정합니다. */
    object-fit: contain; /* 이미지를 비율을 유지하며 적절한 크기로 조정합니다. */
    z-index: 1;
}
</style>
