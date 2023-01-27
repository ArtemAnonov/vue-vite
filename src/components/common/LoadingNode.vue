<template>
    <div 
        v-show="$props.loading"
        class="loading"
    >
        <div class="loading__image"><img src="@/assets/images/gifs/spinner.gif" alt=""></div>
        <slot></slot>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
    name: "loading-node",
    props: {
        loading: Boolean
    },
    // watch: {
    //     loading(newValue) {
    //         console.log(newValue);
    //     }
    // },
    ...mapState({
        // loading: state => state.site.loading,
    }),
    ...mapGetters({
        // loading: 'site/loading'
    })

}
</script>

<style lang="scss" scoped>
    .loading {
        z-index: 100;
        position: absolute;
        width: 100%;
        height: 100%;
        background: #f7f7f7a8;
        img {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }
</style>