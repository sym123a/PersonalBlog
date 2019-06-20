let everyDay = new Vue({
    el: '#every_day',
    data: {
        content: "每日语句每日语句每日语句每日语句"
    },
    computed: {
        getContent() {
            return this.content
        }
    },
    created() {
        //请求数据， 给content赋值
        axios.get('/queryEveryDay').then(res => {
            const result = res.data.data
            this.content = result.content
            // console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }
})

let articleList = new Vue({
    el: '#article_list',
    data: {
        page: 1,
        pageSize: 2,
        total: 0,
        articleList: [
            {
                title: '青蒿素依然是抗疟首选药物',
                content: '世界卫生组织发布的《2018年世界疟疾报告》显示，全球疟疾防治进展陷入停滞。多项研究表明，在大湄公河次区域等地区，出现不同程度的青蒿素抗药现象\n' +
                    '                        世界卫生组织发布的《2018年世界疟疾报告》显示，全球疟疾防治进展陷入停滞。多项研究表明，在大湄公河次区域等地区，出现不同程度的青蒿素抗药现象',
                date: "2018-10-01",
                views: "100",
                tags: 'test1 test2',
                id: "1",
                link: ""
            }
        ]
    },
    computed: {
        getPage() {
            return function (page, pageSize) {
                let params = location.search.indexOf('?') > -1 ? location.search.split('?')[1] : '';
                let tag = "",
                    url = '',
                    countUrl = '';
                if(params){
                    tag = params.split('=')[1]
                    url = '/queryByTag?page='+(page-1)+"&pageSize="+pageSize+"&tag="+tag
                    countUrl = '/queryByTagCount?tag='+tag
                }else {
                    url = '/queryBlogByPage?page='+(page-1)+"&pageSize="+pageSize
                    countUrl = '/queryBlogCount'

                }
                axios.get(url).then(res => {
                    const result = res.data.data
                    this.articleList = result
                    this.page = page;
                }).catch(err => {
                    console.log(err)
                })

                axios.get(countUrl).then(res => {
                    this.total = res.data.data[0].count
                }).catch(err => {
                    console.log(err)
                })
            }
        },
        generatePageTool() {
            let result = []
            result.push({text: "<<", page: 1})
            if(this.page > 2){
                result.push({text: this.page - 2, page: this.page - 2})
            }
            if(this.page > 1){
                result.push({text: this.page - 1, page: this.page - 1})
            }
            result.push({text: this.page, page: this.page});
            if(this.page + 1 <= (this.total + this.pageSize - 1) / this.pageSize){
                result.push({text: this.page + 1, page: this.page + 1});
            }
            if(this.page + 2 <= (this.total + this.pageSize - 1) / this.pageSize){
                result.push({text: this.page + 2, page: this.page + 2});
            }
            result.push({text: ">>", page: parseInt((this.total + this.pageSize - 1) / this.pageSize)});
            return result
        }
    },
    methods: {
        jumpTo(page) {
            this.getPage(page, this.pageSize)
        }
    },
    created() {
        this.getPage(this.page, this.pageSize)
    }
})