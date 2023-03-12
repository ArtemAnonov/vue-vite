<template>
  <div class="logo">
    <RouterLink to="/">LO<span>GOTYPE</span></RouterLink>
  </div>
</template>

<style lang="scss">
.logo {
  display: flex;
  color: #1e242c;
  @media (max-width: ($md2+px)) {
    flex: 1 1 auto;
    margin-right: 1.3333333333rem;
  }
  a {
    line-height: 100%;
    display: flex;
    font-weight: 700;
    font-size: 3rem;
    @media (max-width: ($md2+px)) {
      font-size: 2rem;
    }
    @media (max-width: ($md3+px)) {
      font-size: 1.6rem;
    }
  }
  span {
    line-height: 100%;
    font-size: 2rem;
    @media (max-width: ($md3+px)) {
      font-size: 1.6rem;
    }
  }
}
</style>
