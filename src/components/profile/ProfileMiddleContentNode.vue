<template>
  <section class="profile-middle-content">
    <ContainerNode>
      <div class="profile-middle-content__body">
        <div class="profile-middle-content__sidebar">
        </div>
        <div class="profile-middle-content__content">
          <slot name="content"></slot>
        </div>
      </div>
    </ContainerNode>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss">
.profile-middle-content {
		// .profile-middle-content__body
		&__body {
      display: grid;
      grid-template-columns: 1fr 3fr;
		}
		// .profile-middle-content__sidebar
		&__sidebar {
		}
		// .profile-middle-content__content
		&__content {
		}
}

</style>