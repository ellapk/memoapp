import React from 'react';
import Listitem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import { removeHTMLTags } from '../helpers';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';



class SidebarItemComponent extends React.Component {

 render(){
     
    const {_index, _memo, classes, selectedMemoIndex} = this.props; //props만 받아서 sidebaritem완성할 예정


    return(
     <div key={_index}>
         <Listitem
            className={classes.ListItem}
            selected={selectedMemoIndex === _index}
            alignItems='flex-start'>
                <div className={classes.textSection}
                    onClick={()=>this.selectMemo(_memo,_index) //특정 memo를 클릭할 때 selectMemo 실행
                    }> 
                        <ListItemText
                        primary={_memo.title}
                        secondary={removeHTMLTags(_memo.body.substring(0,20))+'...' //helpers.js->html태그 지움, 내용의 30자만 보이게
                    }> </ListItemText>
                </div>
                <DeleteIcon onClick={()=>this.deleteMemo(_memo)}
                className={classes.DeleteIcon}></DeleteIcon>
            
         </Listitem>
     </div>);
 }
 selectMemo = (n,i) => this.props.selectMemo(n,i); //부모부름
 deleteMemo = (memo) => {
    if(window.confirm(`삭제하실건가요?: ${memo.title}`)) { //휴지통 버튼 누르면 삭제 알림창
      this.props.deleteMemo(memo);
    }
  }
 
}
export default withStyles(styles)(SidebarItemComponent);