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
    font-weight: 700;
    font-size: 50px;
    @media (max-width: ($md2+px)) {
      font-size: 30px;
    }
    @media (max-width: ($md3+px)) {
      font-size: 25px;
    }
  }
}
</style>
