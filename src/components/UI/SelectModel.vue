<template>
  <!-- v-model="modelValue" -->
  <select name="" id=""  @change="changeOption">
    <option disabled value="">Выберите из списка</option>
    <option :value="option.value" v-for="option in options" :key="option.value">
      {{ option.name }}
    </option>
  </select>
</template>

<script>
export default {
  name: 'select-model',
  props: {
    modelValue: {
      type: String
    },
    options: {
      type: Array,
      default: () => [],
    }
  },

  methods: {
    changeOption(event) {
      this.$emit('update:modelValue', event.target.value)
    }
  },
}





</script>

<style>

</style>

        <!-- <select
                @change="setOrderAndOrderBy"
                name=""
                id=""
            >
                <template
                    v-for="{ id, name } in sortOptions"
                    :key="id"
                >
                    <option
                    :value="id"
                    >{{ name }}</option>
                </template>
        </select> 
        
        
                //        setOrderAndOrderBy(e) { this.$store.commit('filter/setOrderAndOrderBy', e.target.value) },

        
        -->

