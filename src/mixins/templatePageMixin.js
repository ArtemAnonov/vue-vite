export default {
    methods: {
        async getTemplatePage () {
            this.SET_SINGLE_PARAM({ type: this.pagesRequest.type, paramKey: 'slug', slug: this.params.categorySlug })
            await this.getSingleBySlug(this.pagesRequest)
        },
    },
}