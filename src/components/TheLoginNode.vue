<template>
  <div class="login">
    <div class="">
      <div class="login__buttons">
        <button
          @click="currentTab = 1"
          class="login__title"
          :class="currentTab === 1 ? 'active' : ''"
        >
          Вход
        </button>
        <button
          @click="currentTab = 2"
          class="login__title"
          :class="currentTab === 2 ? 'active' : ''"
        >
          Регистрация
        </button>
      </div>
      <div class="login__columns">
        <div v-show="currentTab == 1" class="login__column tab-login">
          <div class="login-tab__body">
            <div class="login-tab__form">
              <form>
                <div class="login-tab__radio-inputes">
                  <InputRadioNode
                    name="typeLogin"
                    labelText="Через логин"
                    :modelValue="true"
                  ></InputRadioNode>
                  <InputRadioNode
                    :disabled="true"
                    name="typeLogin"
                    labelText="Через СМС-код"
                    :modelValue="false"
                  >
                  </InputRadioNode>
                </div>
                <InputNode class="main" type="text" v-model="authData.email">
                  <template #before><label>Почта</label></template>
                </InputNode>
                <InputNode
                  class="main"
                  type="password"
                  v-model="authData.password"
                >
                  <template #before><label>Пароль</label></template>
                </InputNode>
                <!--          expectAsync(login, authData)         @click="" -->
                <ButtonNode
                  buttonStyle="dark"
                  :resolver="{ func: login, payload: authData }"
                  >Войти</ButtonNode
                >
              </form>
            </div>
          </div>
        </div>
        <div v-show="currentTab === 2" class="login__column tab-register">
          <div class="register-tab__body">
            <form>
              <InputNode class="main" type="text" v-model="authData.first_name">
                <template #before><label>Имя</label></template>
              </InputNode>
              <InputNode class="main" type="text" v-model="authData.last_name">
                <template #before><label>Фамилия</label></template>
              </InputNode>
              <InputNode class="main" type="text" v-model="authData.email">
                <template #before><label>Почта</label></template>
              </InputNode>
              <InputNode
                class="main"
                type="password"
                v-model="authData.password"
              >
                <template #before><label>Пароль</label></template>
              </InputNode>
              <ButtonNode buttonStyle="dark" @click.prevent="register(authData)"
                >Зарегистрироваться</ButtonNode
              >
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
import { cloneDeep } from "lodash-es";

import { mainFetch } from "@/api";
export default {
  data() {
    return {
      currentTab: 1,
      authData: {
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
      getCart: "cart/getCart",
      register: "auth/register",
      login: "auth/login",
      logout: "auth/logout",
    }),
    // expectAsync(func, payload) {

    //   func(payload);
    // },
  },
};
</script>

<style lang="scss">
.login {
  &__greeting {
    font-size: 1.3rem;
    margin-bottom: 1.3rem;
  }

  &__logined {
  }

  &__buttons {
    box-shadow: inset 0 -0.1333333333rem 0 0 #f1f1f1;
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
    padding: 0 0 0.6666666667rem;
    opacity: 0.9;
    transition: color 0.1s;
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
      height: 0.1333333333rem;
      bottom: 0;
      left: 0;
      background-color: #d8d8d8;
      max-width: 0;
      transition: max-width 0.2s, background-color 0.2s;
    }
  }

  &__columns {
  }

  &__column {
  }

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

.tab-login {
}

.login-tab {
  &__body {
  }

  &__form {
  }

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

.tab-register {
}

.register-tab {
  &__body {
  }
}
</style>
