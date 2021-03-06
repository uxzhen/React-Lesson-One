import React ,{ Component } from 'react'
class CommentInput extends Component {
    //初始化两个数据，一个是保存用户名，一个用来保存评论的内容
    //我们在组件的构造函数中初始化一个state来保存这两个状态
    constructor(){
        super()
        this.state = {
            username:'',
            content:''
        }
    }
    //添加一个生命周期，在组件完成挂载的时候，将多行表单获取焦点
    componentDidMount(){
        this.textarea.focus();
    }
    //这个阶段是为了自动将用户名从localstorage中读取出来
    componentWillMount(){
        this._loadUsername();
    }
    _loadUsername(){
        const username = localStorage.getItem('username');
        if(username){
            this.setState({username});
        }
    }
    _saveUsername(username){
        localStorage.setItem('username',username);
    }
    handleUsernameBlur(event){
        this._saveUsername(event.target.value);
    }
    //添加一个监听input表单的事件，当input表单发生变化的时候会触发
    //这个事件，react中规定，如果想要改变react数据的话，必须通过setState
    handleUsernameChange(event){
        this.setState({
            username:event.target.value
        })
    }
    handleContentChange(event){
        this.setState({
            content:event.target.value
        })
    }
    //用户点击按钮的时候，input表单内的数据应该传递给List组件
    //我们通过将数据传递给父组件commponetApp，通过父组件再传递给List组件
    handleSubmit(){
        if(this.props.onSubmit){
            const {username,content} = this.state;
            this.props.onSubmit({
                username:this.state.username,
                content:this.state.content,
                createdTime: +new Date()
            });
        }
        this.setState({content:''})
    }
    render(){
        return (
            <div className='comment-input'>
                <div className='comment-field'>
                    <span className='comment-field-name'>
                        用户名:
                    </span>
                    <div className='comment-field-input'>
                        <input onBlur={this.handleUsernameBlur.bind(this)} onChange={this.handleUsernameChange.bind(this)} value={this.state.username}/>
                    </div>
                </div>
                <div className='comment-field'>
                    <span className='comment-field-name'>
                        评论功能:
                    </span>
                    <div className='comment-field-input'>
                        <textarea ref={(textarea)=>this.textarea = textarea} onChange={this.handleContentChange.bind(this)} value={this.state.content}/>
                    </div>
                </div>
                <div className='comment-field-button'>
                    <button onClick={this.handleSubmit.bind(this)}>
                        发布
                    </button>
                </div>
            </div>
        )
    }
}
export default CommentInput