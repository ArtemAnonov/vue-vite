import { VUE_WP_INSTANCE } from '@/api/utils'
const { permalink_structure, category_base, tag_base } = VUE_WP_INSTANCE().routing.returned


// const { permalink_structure, category_base, tag_base } = __VUE_WORDPRESS_routing

const tagToParam = {
    author: ':author',
    postname: ':slug',
    post_id: ':id(\\d+)',
    category: ':cat1/:cat2?/:cat3?',
    year: ':year(\\d{4})',
    monthnum: ':month(\\d{2})',
    day: ':day(\\d{2})',
    hour: ':hour(\\d{2})',
    minute: ':min(\\d{2})',
    second: ':sec(\\d{2})'
}

// Если не задана база категорий/тегов, WP использует базу структуры постоянных ссылок singlePost, исключая теги
const defaultTaxonomyBase = permalink_structure.slice(0, permalink_structure.indexOf('%'))
// Добавлено к путям маршрута с разбиением на страницы
const paginateParam = ':page(page\/\\d+)?'

export default {
    authorArchive: `${defaultTaxonomyBase}author/:slug/${paginateParam}`,
    categoryArchive: category_base ? `/${category_base}/${tagToParam.category}/${paginateParam}` : `${defaultTaxonomyBase}category/${tagToParam.category}/${paginateParam}`,
    dateArchive: `${defaultTaxonomyBase}:year(\\d{4})/:month(\\d{2})?/:day(\\d{2})?/${paginateParam}`,
    single: permalink_structure.replace(/\%[a-z_]+\%/g, match => tagToParam[match.slice(1,-1)]).slice(0,-1),
    tagArchive: tag_base ? `/${tag_base}/:slug/${paginateParam}` : `${defaultTaxonomyBase}tag/:slug/${paginateParam}`,
    postsPage: (slug) => slug ? `/${slug}/${paginateParam}` : `/${paginateParam}`
}