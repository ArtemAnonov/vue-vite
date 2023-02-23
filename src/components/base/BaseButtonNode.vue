<template>
  <button class="button">
    <span>
      <slot/>
    </span>
  </button>
</template>

<script>
export default {
  name: "BaseButtonNode",
};
</script>

<style lang="scss">
.button {
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  max-height: 40px;
  transition: 0.3s;
  cursor: pointer;
  padding: 0.5rem 1rem 0.5rem 1rem;
  border: 0.0666666667rem solid #d8d8d8;
  white-space: nowrap;
  &.checked {
    border: 1px solid #1e242c;
    &:hover {
      border-color: #1e242c;
    }
  }
  &:hover {
    border-color: #d8d8d8;
    box-shadow: 0 0.3333333333rem 1rem 0 rgba(0, 0, 0, 0.15);
    outline: none;
  }
  &:disabled {
    cursor: auto;
    &:hover {
      border-color: #d8d8d8;
      box-shadow: none;
      outline: none;
    }
    span {
      color: #868686;
    }
  }

  span {
    transition: 0.3s;
    display: inline-flex;
  }

  &_dark {
    color: #fff;
    background-color: #1e242c;
    border-color: transparent;
  }

  &_green {
    color: #fff;
    background-color: #187552;
    border-color: transparent;

    &:hover {
      background-color: #0a5c3d;
      border-color: transparent;
      box-shadow: none;
      outline: none;
    }

    &:disabled {
      background-color: #f1f1f1;

      &:hover {
        border-color: transparent;
        box-shadow: none;
        outline: none;
        background-color: #f1f1f1;
      }
    }
  }

  &.icon {
    padding: 1.2rem;
    &::before {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      transition: 0.3s;
      color: #868686;
    }
    &:hover {
      &::before {
        color: #1e242c;
      }
    }
  }
}
</style>
