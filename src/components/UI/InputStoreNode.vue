<template>
    <div class="input">
        <slot></slot>
        <input
            v-bind="$attrs"
            :value="modelValue"
            @input="updateInput"
        >
    </div>
</template>

<script>
//            v-bind="$attrs"              
            
export default {
    name: 'input-store-node',
    inheritAttrs: false,
    props: {
        modelValue: [Number, String, Object, Array, Boolean]

        // modelValue: [Number, String]
        
    },

    methods: {
        updateInput(event) {
            this.$emit('update:modelValue', event.target.value)
        }
    },
}
</script>

<style lang="scss" scoped>
    input {
        border: 0.1333333333rem solid #f1f1f1;
    }
</style>

            <!-- <input-node 
                v-for="brand in allBrands"
                :key="brand.id"
                type="checkbox" 
                :model-value="brands "
                @update:model-value="setBrands"
            >
            </input-node> -->

                      <!--                               <input-store-node
                            type="checkbox"
                            class="" 
                            v-for="{ id, name } in allBrands" :key="id"
                            v-model="brandsChecked"
                        >
                            <label for="">{{ name }}</label>
                        </input-store-node> -->