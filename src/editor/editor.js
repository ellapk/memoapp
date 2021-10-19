import React from 'react';
import ReactQuill from 'react-quill';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import debounce from '../helpers';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

class EditorComponent extends React.Component {
  constructor() { //컴포넌트 초기화
    super();
    this.state = {
      text: '',
      title: '',
      id: ''
    };
  }

// quill-> componentDidMount. lifecycle
  componentDidMount = () =>{ //특정 memo클릭 시 들어있는 내용 editor부분에 set
    this.setState({
      text:this.props.selectedMemo.body,
      title : this.props.selectedMemo.title,
      id :this.props.selectedMemo.id
    });
  }

// lifecycle update  
  componentDidUpdate = () => { //다른 memo클릭 시 update되게
    if(this.props.selectedMemo.id !== this.state.id) {
      this.setState({
        text: this.props.selectedMemo.body,
        title: this.props.selectedMemo.title,
        id: this.props.selectedMemo.id
      });
    }
  }


  render(){
      const{classes}=this.props;

      return(
        <div className={classes.editorContainer}>
          <input //title 입력 부분
            className={classes.titleInput}
            placeholder='제목을 입력해주세요...'
            value={this.state.title ? this.state.title  : ''}
            onChange={(e) => this.updateTitle(e.target.value)}>
          </input>
          <ReactQuill  //오른쪽 텍스트 작성 부분 -> react quill
            value= {this.state.text} 
            onChange={this.updateBody} //작성시 변하는 문자 보이게
            > 
          </ReactQuill>
        </div>
      );
  }
  updateBody = async (val) => { //오른쪽에 body 입력시 update
    await this.setState({ text: val });
    this.update();
  };
  updateTitle = async (txt) => { //title 입력시 update
    await this.setState({ title: txt });
    this.update();
  }
  update = debounce(() => { //debounce-> value 변화 있을 때마다 굳이 번거롭게 db를 가지 않게끔
  //console.log('updating database');
     this.props.memoUpdate(this.state.id, {
     title : this.state.title,
     body : this.state.text
    })
  }, 1500); //throttling. 1.5초 안에 연속으로 들어온 이전 요청들은 clear, 마지막 요청만 실행 
}

//withStyle 컴포넌트 사용 : 인자를 받아 새로운 컴포넌트를 반환함.
  export default withStyles(styles)(EditorComponent);