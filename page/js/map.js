const blogList = new Vue({
    el: '#blog_list',
    data: {
        articleList: []
    },
    created() {
        axios.get('/queryAllBlog').then(res => {
            const result = res.data.data
            this.articleList = result
        }).catch(err => {

        })
    }
})