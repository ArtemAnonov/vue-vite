<template>
  <div class="message" :class="showTemplate ? 'active' : ''">
    <span>
      <slot></slot>
    </span>
  </div>
</template>

<script>
export default {
  name: "message-node",
  emits: ['showMessage'],
  props: [
    'show'
  ],
  data() {
    return {
      showTemplate: false,
    };
  },
  watch: {
    show(newValue) {
      if (newValue === '') return;
      this.showTemplate = true;
      setTimeout(() => {
        this.showTemplate = false;
        this.$emit("showMessage", false);
      }, 3000);
    },
  },
  computed: {},
};
</script>

<style lang="scss">
.message {
  transform: translate(0, -30px);
  opacity: 0;
  visibility: hidden;
  position: fixed;
  top: 30px;
  right: 30px;
  padding: 15px 20px 15px 45px;
  // max-width: 450px;
  box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.15);
  background-color: #fff;
  color: #868686;
  z-index: 9999;
  font-size: 1rem;
  transition: transform 0.2s, opacity 0.2s, visibility 0.2s;
  display: flex;
  flex-wrap: wrap;

  @media (max-width: ($md3+px)) {
    right: 50%;
    transform: translate(50%, -30px);
    max-width: 80%;
  }

  &::after,
  &::before {
    position: absolute;
    top: 50%;
    left: 15px;
    transform: translate(0, -50%);
  }

  &::after {
    content: "";
  }

  &::before {}

  &.error {
      padding: 15px 20px 15px 30px;

      &::after {
        width: 5px;
        height: 5px;
        background-color: #ff7676;
        opacity: 0.9;
        border-radius: 50%;
      }
    }


  &.active {
    transform: translate(0, 0);
    opacity: 0.9;
    visibility: visible;

    @media (max-width: ($md3+px)) {
      transform: translate(50%, 0);
    }




  }
}
</style>
