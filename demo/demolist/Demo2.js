/**
 *
 * @title 目标复制
 * @description 复制目标元素的内容到剪切板
 *
 */
class Demo2 extends Component {
    render() {
        function success(){
           console.log('success');
        }
        function error(){
           console.log('error');
        }
        return (
            <div>
                <div id="copyContent" >目标复制-我将被复制到剪切板</div>
                <Clipboard action="copy"  target='#copyContent' success={success} error={error}>

                </Clipboard>
            </div>
        )
    }
}