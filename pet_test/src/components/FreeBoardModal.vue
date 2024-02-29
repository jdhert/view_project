<template>
    <div class="modal" :class="{ 'show': showModal }">
		<div class="modal-dialog">
			<div class="modal-content">
				<!-- 모달 내용 -->
				<div class="modal-header">
					<h5 class="modal-title">{{selectedCard.title}}</h5>
					<button type="button" class="btn-close" @click="$emit('closeModal')"></button>
				</div>
				<div class="modal-body">
					<!-- 모달 내용 추가 -->
					<p>{{selectedCard.description}}</p>
				</div>
			</div>
		</div>
	</div>
</template>


<script>
export default {
    props : {
        showModal: Boolean,
        selectedCard: Object
    }
}
</script>

<style scoped>

</style>