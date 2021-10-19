import React from 'react';
import List from '@material-ui/core/List';
import { Divider, Button } from '@material-ui/core';
import SidebarItemComponent from '../sidebaritem/sidebaritem';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';


class SidebarComponent extends React.Component{
    constructor(){
        super();
        this.state = {
            addingMemo : false,
            title : null
        };
    }
    
render() {

    const { memos, classes, selectedMemoIndex } = this.props;
    
        if(memos) { //5)memos가 더이상 null이 아니므로 실행가능 상태
          return(
            <div className={classes.sidebarContainer}>
              <Button
                onClick={this.newMemoBtnClick}
                className={classes.newMemoBtn}>{this.state.addingMemo ? '취소' : '새로 작성' 
                } </Button>  
                {
                  this.state.addingMemo ? 
                  <div> 
                    <input type='text'
                      className={classes.newMemoInput}
                      placeholder='제목을 입력하세요'
                      onKeyUp={(e) => this.updateTitle(e.target.value)}>
                    </input>
                    <Button 
                      className={classes.newMemoSubmitBtn}
                      onClick={this.newMemo}>완료</Button>
                  </div> :
                  null
                }
                <List>
                  {
                    memos.map((_memo, _index) => { //app.js에서는 asyn였을 뿐. sidebar.js에서 map을 작동시킨 후에야 set
                      return(
                        <div key={_index}>
                          <SidebarItemComponent
                            _memo={_memo}
                            _index={_index}
                            selectedMemoIndex={selectedMemoIndex}
                            selectMemo={this.selectMemo} //function
                            deleteMemo={this.deleteMemo} //function
                            >
                          </SidebarItemComponent>
                          <Divider></Divider>
                        </div>
                      )
                    })
                  }
                </List>
            </div>
          );
        } else { //memos가 null이면 map은 null에 존재하지 않음
          return(<div></div>);
        }
      }
    
    newMemoBtnClick = () => {
        this.setState({ title: null, addingMemo: !this.state.addingMemo }); //원래 addingNote가 false 이므로...
      }
    updateTitle = (txt) => {
        this.setState({ title: txt });
      }
    newMemo = () => {
        this.props.newMemo(this.state.title);
        this.setState({ title: null, addingMemo: false });
      }

    selectMemo = (n, i) => this.props.selectMemo(n, i); //특정 메모 내용 보여주는 select 부분
    deleteMemo = (memo) => this.props.deleteMemo(memo); //휴지통 icon누르면 삭제되는 부분
}

export default withStyles(styles)(SidebarComponent);