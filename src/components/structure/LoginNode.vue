<template>
  <div class="login">
    <div class="login__logined" v-if="userAuth">
      <div class="login__greeting">Вы вошли в систему</div>
      <button-node buttonStyle="dark" @click.prevent="logoutCustomer()">{{ 'Выйти' }}</button-node>
    </div>
    <!-- <div class="login__notifications">
      <span>Для оформления заказа авторизуйтесь!</span>
    </div> -->
    <div class="" v-else>
      <div class="login__buttons">
        <button @click="currentTab = 1" class="login__title" :class="(currentTab === 1) ? 'active' : ''">Вход</button>
        <button @click="currentTab = 2" class="login__title"
          :class="(currentTab === 2) ? 'active' : ''">Регистрация</button>
      </div>
      <div class="login__columns">
        <div v-show="currentTab == 1" class="login__column tab-login">
          <div class="login-tab__body">
            <div class="login-tab__form">
              <form>
                <div class="login-tab__radio-inputes">
                  <input-radio-node name="typeLogin" labelText="Через логин" :modelValue="true"></input-radio-node>
                  <input-radio-node :disabled="true" name="typeLogin" labelText="Через СМС-код" :modelValue="false">
                  </input-radio-node>
                </div>
                <input-node class="main" type="text" v-model="userData.email">
                  <template #after><label>Почта</label></template>
                </input-node>
                <input-node class="main" type="password" v-model="userData.password">
                  <template #after><label>Пароль</label></template>
                </input-node>
                <button-node buttonStyle="dark" @click.prevent="loginCustomer()">{{ 'Войти'
                }}</button-node>
              </form>
            </div>
          </div>
        </div>
        <div v-show="currentTab === 2" class="login__column tab-register">
          <div class="register-tab__body">
            <form>
              <input-node class="main" type="text" v-model="userData.first_name">
                <template #after><label>Имя</label></template>
              </input-node>
              <input-node class="main" type="text" v-model="userData.last_name">
                <template #after><label>Фамилия</label></template>
              </input-node>
              <input-node class="main" type="text" v-model="userData.email">
                <template #after><label>Почта</label></template>
              </input-node>
              <input-node class="main" type="password" v-model="userData.password">
                <template #after><label>Пароль</label></template>
              </input-node>
              <button-node buttonStyle="dark" @click.prevent="registerCustomer">Зарегистрироваться</button-node>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import { cloneDeep } from 'lodash-es'

import { mainFetch } from "@/api";
export default {
  props: {},
  data() {
    return {
      currentTab: 1,
      userData: {
        first_name: "",
        last_name: "",
        username: "",
        email: "antoshka@gmail.com",
        password: "antoshka",
      },
    };
  },
  computed: {
    ...mapState({
      customersRequest: (state) => state.customers.basedRequest,
      authRequest: (state) => state.auth.basedRequest,
      userAuth: (state) => state.auth.userAuth,
    }),
    ...mapGetters({}),
  },
  methods: {
    ...mapMutations({
      SET_VALUE: "SET_VALUE",
    }),
    ...mapActions({
      mainFetchRequest: "mainFetchRequest",
      getCart: "cart/getCart",
      login: "auth/login",
      logout: "auth/logout",
    }),

    loginFromMail() {
      let str = this.userData.email;
      return str.slice(0, str.indexOf("@"));
    },
    async registerCustomer() {
      this.userData.username = this.loginFromMail();
      const requested = await this.mainFetchRequest(
        Object.assign(cloneDeep(this.customersRequest), {
          method: "post",
          data: this.userData,
        })
      );
    },
    async loginCustomer() {
      const requested = await this.mainFetchRequest({
        route_base: 'token',
        apiType: this.authRequest.apiType,
        method: "post",
        data: {
          username: this.loginFromMail(),
          password: this.userData.password,
        },
        maintainJWT: false
      });
      this.login(requested.response.data.token)
      this.getCart();
    },
    async logoutCustomer() {
      this.logout()
      this.getCart();
    },
  },
  created() {
    // this.loginCustomer()
  },
};
</script>

<style lang="scss">
.login {

  &__greeting {
    font-size: 1.3rem;
    margin-bottom: 1.3rem;
  }

  &__logined {}

  &__buttons {
    box-shadow: inset 0 -.1333333333rem 0 0 #f1f1f1;
    margin: 0 0 2rem;
  }

  &__title {
    position: relative;
    color: #868686;
    position: relative;
    display: inline-block;
    color: #868686;
    font-size: 1.1333333333rem;
    line-height: 1.6666666667rem;
    padding: 0 0 .6666666667rem;
    opacity: .9;
    transition: color .1s;
    cursor: pointer;

    &.active {
      color: #231f20;

      &::after {
        background-color: #231f20;
        max-width: 100%;
      }
    }

    &:last-child {
      margin: 0 0 0 1.3333333333rem;
    }

    &:hover {
      color: #231f20;

      &::after {
        max-width: 100%;
      }
    }

    &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: .1333333333rem;
      bottom: 0;
      left: 0;
      background-color: #d8d8d8;
      max-width: 0;
      transition: max-width .2s, background-color .2s;
    }
  }

  &__columns {}

  &__column {}

  .button {
    width: 100%;
  }

  
  .popup__wrapper {
    max-width: 420px;
    top: 0;
    transform: translate(-50%, 0);
    width: 100%;
    height: auto;
  }
}

.tab-login {}

.login-tab {

  &__body {}

  &__form {}

  &__radio-inputes {
    display: flex;
    padding: 0 0 1rem;
    flex-wrap: wrap;
    .input_radio {
      &:first-child {
        padding: 0 2.6666666667rem 1rem 0;
      }
    }
  }


}

.tab-register {}

.register-tab {

  &__body {}
}
</style>
