export default function debounce(a,b,c){ //타이핑 잠시 멈추면 함수가 update. 
    var d,e;
    return function(){
      function h(){
        d=null;
        c||(e=a.apply(f,g));
      }
      var f=this,g=arguments;
      return (clearTimeout(d),d=setTimeout(h,b),c&&!d&&(e=a.apply(f,g)),e)
    }
  }
  
  export function removeHTMLTags (str) { //quill 사용하며 붙은 html 태그를 지워줌
    return str.replace(/<[^>]*>?/gm, '');
  };