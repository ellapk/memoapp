import React from 'react';
import SidebarComponent from './sidebar/sidebar';
import EditorComponent from './editor/editor';
import './App.css';
import firebase from 'firebase/app';
import 'firebase/firestore';
//const firebase = require('firebase');

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      selectedMemoIndex : null,
      selectedMemo : null,
      memos : null //2)근데 memo null
    };
  }

  render(){
    return(
    <div className="app-container">
      <SidebarComponent 
      selectedMemoIndex={this.state.selectedMemoIndex} //1)처음 sidebar를 render 4)re-render. memos의 상태가 null도 아님
      memos={this.state.memos}
      deleteMemo={this.deleteMemo}
      selectMemo={this.selectMemo}
      newMemo={this.newMemo}></SidebarComponent>
      { //특정 memo를 선택해야 editor 창 제대로 이용가능
        this.state.selectedMemo?
        <EditorComponent selectedMemo={this.state.selectedMemo}
        selectedMemoIndex={this.state.selectedMemoIndex}
        memos={this.state.memos}
        memoUpdate={this.memoUpdate}></EditorComponent> : 
        null
      }
      </div>);
  }

  componentDidMount = () => { //3)componentDidmount 함수가 memos들을 잘 받아와서 setState
    firebase
      .firestore()
      .collection('memos')
      .onSnapshot(serverUpdate => {
        const memos = serverUpdate.docs.map(_doc => {
          const data = _doc.data();
          data['id'] = _doc.id;
          return data;
        });
        console.log(memos);
        this.setState({ memos: memos });
      });
  }

  //sidebar에서 특정 항목을 선택하는 selectMemo 함수
  selectMemo = (memo, index) => this.setState({selectedMemoIndex:index, selectedMemo : memo});

  //editor.js -> debounce 중 update 담당
  memoUpdate = (id, memoObj) => {
    firebase
      .firestore()
      .collection('memos')
      .doc(id)
      .update({
        title: memoObj.title,
        body: memoObj.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
  }

//새 memo 작성
  newMemo = async(title) =>{
    const memo = {
      title : title,
      body: ''
    };
    const newFromDB = await firebase
      .firestore()
      .collection('memos')
      .add({
        title:memo.title,
        body:memo.body,
        timestamp : firebase.firestore.FieldValue.serverTimestamp() //date.time 생성
      });
    const newID = newFromDB.id;
    await this.setState({memos : [...this.state.memos, memo]});
    const newMemoIndex = this.state.memos.indexOf(this.state.memos.filter(_memo=>_memo.id === newID)[0]); //filter -> array return - > index구함
    this.setState({ selectedMemo: this.state.memos[newMemoIndex], selectedMemoIndex: newMemoIndex });
  }

 //(휴지통 버튼 누르면) memo가 삭제되는 부분
  deleteMemo = async (memo) => {
    const memoIndex = this.state.memos.indexOf(memo);
    await this.setState({ memos: this.state.memos.filter(_memo => _memo !== memo) });
    if(this.state.selectedMemoIndex === memoIndex) {
      this.setState({ selectedMemoIndex: null, selectedMemo: null });
    } else {
      this.state.memos.length > 1 ?
      this.selectMemo(this.state.memos[this.state.selectedMemoIndex - 1], this.state.selectedMemoIndex - 1) :
      this.setState({ selectedMemoIndex: null, selectedMemo: null });
    }

    firebase
      .firestore()
      .collection('memos')
      .doc(memo.id)
      .delete();
  }
}


export default App;
