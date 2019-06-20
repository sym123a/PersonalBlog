let randomTags = new Vue({
    el: '#random_tags',
    data: {
        tags: ["test1", "test2", "test3", "test4", "test5", "test6", "test7", "test8", "test9", "test10"]
    },
    computed: {
        randomColor() {
            return function () {
                let red = Math.random() * 255 + 50,
                    green = Math.random() * 255 + 50,
                    blue = Math.random() * 255 + 50;
                return `rgb(${red}, ${green}, ${blue})`;
            }
        },
        randomSize() {
            return function () {
                return (Math.random() * 20 + 12) + 'px'
            }
        }
    },
    created() {
        axios.get('/queryRandomTags').then(res => {
            // console.log(res)
            this.tags = res.data.data
        }).catch(err => {
            console.log(err)
        })
    }
})

var newHot = new Vue({
    el: '#new_hot',
    data: {
        titleList: []
    },
    created() {
        axios.get('/queryHotBlog').then(res => {
            this.titleList = res.data.data
            // console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }
})

let newComments = new Vue({
    el: '#new_comments',
    data: {
        commentList: [
            {name: '这里是用户名', date: '2018-10-11', comment: '抓好重点人群落户 提高农业转移人口市民化质量'},
            {name: '这里是用户名', date: '2018-10-11', comment: '抓好重点人群落户 提高农业转移人口市民化质量'},
            {name: '这里是用户名', date: '2018-10-11', comment: '抓好重点人群落户 提高农业转移人口市民化质量'},
        ]
    },
    created() {
        axios.get('/queryNewComments').then(res => {
            console.log(res)
            this.commentList = res.data.data
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }
})