<template>
  <button/>
</template>

<script>
export default {
  name: "CloseBtnNode",
  data() {
    return {};
  },
};
</script>

<style scoped lang="scss">
button {
  position: absolute;
  top: 0;
  right: 0;
  background: transparent;
  border: 0;
  width: 50px;
  height: 100%;
  cursor: pointer;

  &::after,
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;
    width: 15px;
    border-bottom: 2px solid #868686;
    transition: border-color 0.1s;
  }
  &::before {
    transform: translate(-50%, -50%) rotate(45deg);
  }
  &::after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
}
</style>
