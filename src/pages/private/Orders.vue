<template>
  <MainPageNode>
    <template #page-main>
      <ContainerNode>
        <div class="orders">
          <div class="orders__body">
            <Suspense>
              <template #default>
                <ProfileMiddleContentNode>
                  <template #content>
                    <OrdersListNode />
                  </template>
                </ProfileMiddleContentNode>
              </template>
              <template #fallback>
                <div>Loading...</div>
              </template>
            </Suspense>
          </div>
        </div>
      </ContainerNode>
    </template>
  </MainPageNode>
</template>

<script>
import MainPageNode from "@/components/structure/MainPageNode.vue";
import OrdersListNode from "@/components/profile/OrdersListNode.vue";
import ProfileMiddleContentNode from "@/components/profile/ProfileMiddleContentNode.vue";

import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { useStore } from "vuex";
export default {
  components: {
    MainPageNode,
    OrdersListNode,
    ProfileMiddleContentNode,
  },
};
</script>

<style>
</style>