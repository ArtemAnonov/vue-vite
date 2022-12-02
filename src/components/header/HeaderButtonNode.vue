<template>
    <router-link 
        class="header-button"
        :to="link"
    >
        <span 
            class="header-button__counter"
        >{{ itemsCounter }}</span>
        <div class="header-button__icon">
            <slot></slot>
        </div>
    </router-link>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
    props: {
        link: String,
        itemsCounter: Number
    },
    components: {
            
    },
    computed: {
        ...mapGetters({
            
        }),
        ...mapState({

        }),
    },
    methods: {
        ...mapMutations({
            
        }),
        ...mapActions({
            
        }),
    },
            
}
</script>

<style scoped lang="scss">
    .header-button {
        position: relative;
        font-size: 21px;
        display: flex;

        &__icon {

        }

        &__counter {
            padding-left: 4px;
            font-size: .86667rem;
            color: #231f20;
            line-height: 1;
        }
    }
</style>