let bid = location.search.split('=')[1]
const blogDetail = new Vue({
    el: '#blog_detail',
    data: {
        blogDetailList: {}
    },
    created() {
        if(!bid){
            return
        }
        axios.get('/queryBlogDetailById?bid='+ bid).then(result => {
            const res = result.data.data
            this.blogDetailList = res[0]
        }).catch(err => {
            console.log(err)
        })
    }
})

const sendComment = new Vue({
    el: '#send_comment',
    data: {
        comment_reply: -1,
        comment_reply_name: 0,
        comment_name: '',
        comment_email: '',
        comment_content: '',
        comment_code: '',
        vcode: '',
        rightCode: ''
    },
    methods: {
        sendComment() {
            if(!bid){
                return
            }
            if(this.rightCode !== this.comment_code){
                alert('验证码输入不正确');
                this.changeCode()
                return;
            }
            console.log(this.comment_reply_name);
// return
            axios.post('/addComment?bid='+ bid+"&parent="+this.comment_reply+'&userName=' +this.comment_name
                +'&email='+this.comment_email+'&content='+this.comment_content+'&parentName='+this.comment_reply_name)
                .then(res => {
                    alert(res.data.msg);
                    this.comment_name = ''
                    this.comment_email = ''
                    this.comment_content = ''
                    blogComments.initData()
            }).catch(err => {
                console.log(err)
            })
        },
        changeCode() {
            axios.get('/queryRandomCode').then(res => {
                // console.log(res)
                this.vcode = res.data.data.data
                this.rightCode = res.data.data.text
            }).catch(err => {
                console.log(err)
            })
        }
    },
    created() {
        this.changeCode()
    }
})

const blogComments = new Vue({
    el: '#blog_comments',
    data: {
        total: 0,
        comments: []
    },
    created() {
        this.initData()

    },
    methods: {
        initData() {
            axios.get('/queryCommentByBid?bid='+bid).then(res => {
                const result = res.data.data
                this.total = result.length
                this.comments = result
            }).catch(err => {
                console.log(err)
            })
        },
        reply(comment) {
            sendComment.comment_reply = comment.id
            sendComment.comment_reply_name = comment.user_name
            location.href = '#send_comment' //锚点
        }
    }
})