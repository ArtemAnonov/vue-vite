<template>
  <main>
    <section v-show="posts.length">

      <pagination-node
        v-if="totalPages > 1"
        :total="totalPages"
        :current="page"
      />
    </section>
    <loading-node v-show="$store.getters.loading"></loading-node>
  </main>
</template>

<script>

import PaginationNode from '@/components/PaginationNode.vue'

export default {
    name: 'Home',
    components: {
    PaginationNode,
},
    props: {
        page: {
            type: Number,
            required: true
        }
    },

    data() {
        return {
            request: {
                type: 'posts',
                params: { 
                    per_page: this.$store.state.site.posts_per_page,
                    page: this.page
                }, 
                showLoading: true 
            },
            totalPages: 0
        }
    },
    computed: {
        posts() {
            return this.$store.getters.requestedItems(this.request)
        }
    },
    methods: {
        getPosts() {
            return this.$store.dispatch('getItems', this.request)
        },
        setTotalPages() {
            this.totalPages = this.$store.getters.totalPages(this.request)
        }
    },
    watch: {
        page() {
            this.request.params.page = this.page;
            this.getPosts()
        }
    },
    created() {
        this.getPosts().then(() => {
            this.setTotalPages() 
        })
    },
}
</script>
