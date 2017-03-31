import React, {Component, PropTypes} from 'react';
import clipboard from 'clipboard';
import classnames from 'classnames';
import Icon from 'bee-icon';
import Modal from 'bee-modal';
import Button from 'bee-button';
import ReactDOM from 'react-dom';
import FormControl from 'bee-form-control';
import Tooltip from 'bee-tooltip';
import OverlayTrigger from 'bee-overlay/build/OverlayTrigger';

//text和target都写的时候，target无效。 text的cut改为copy。
// target可以传css3选择器
const propTypes = {
    action: PropTypes.oneOf(['copy', 'cut']),
    text: PropTypes.string,
    success: PropTypes.func,
    error: PropTypes.func
};
const defaultProps = {
    action: 'copy',
    text: '',
    target: '',
    success: () => {
    },
    error: () => {
    }
};
class Clipboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currect: false,
            actionTitle: '复制',
            modalShow: false,
            html: '',
            tootipContent:'复制',
            id: 'id' + Math.round((Math.random() * 1000) + 1) + new Date().getTime(),
        };
        this.close = this.close.bind(this);
        this.blur = this.blur.bind(this);
    }
    close() {
        this.setState({
            modalShow: false
        })
    }
    componentWillMount() {
        let self = this;
        let {action, success, error} = this.props;
        let title = (action === 'copy' ? '复制' : '剪切');
        self.setState({
            actionTitle: title
        });
        let id=this.state.id;
        let cb = new clipboard('#' + id);
        cb.on('success', function (e) {
            self.setState({
                currect: true,
                tootipContent:'已复制'
            });
            e.clearSelection();
            if (success instanceof Function) success();
        });
        cb.on('error', function (e) {
            self.setState({
                html: e.text,
                modalShow: true
            });
            ReactDOM.findDOMNode(self.refs.text).select();
            if (error instanceof Function) error();
        });
    }
    blur(){
        this.setState({
            currect: false,
            tootipContent:'复制'
        });
    }
    render() {
        const seft=this;
        let { action, text, target} = this.props;
        if(text)action='copy';
        const tooltip = function () {
            return (
                <Tooltip positionTop="20px">{seft.state.tootipContent} </Tooltip>
            );
        };
        return (
        <OverlayTrigger  overlay = {tooltip()} placement="top" >
            <span onMouseOut={this.blur} className="u-clipboard" id={this.state.id} data-clipboard-action={action}
                  data-clipboard-target={target} data-clipboard-text={text}
                  title={this.state.actionTitle}>
                        {this.props.children ? this.props.children : (<Icon className={classnames({
                            'uf-correct': this.state.currect,
                            'uf-copy': !this.state.currect
                        })}> </Icon>)}
                <Modal show={ this.state.modalShow } onHide={ this.close }>
                                <Modal.Header closeButton>
                                    <Modal.Title > Ctrl+C 复制到剪切板 </Modal.Title>
                                </Modal.Header >
                                <Modal.Body >
                                    <FormControl  ref="text" type="text" readOnly value={this.state.html}/>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button onClick={ this.close }> 关闭 </Button>
                                </Modal.Footer>
                            </Modal>
                        </span>
        </OverlayTrigger>
        )
    }
};
Clipboard.propTypes = propTypes;
Clipboard.defaultProps = defaultProps;
export default Clipboard;