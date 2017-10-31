import React, {Component} from 'react';
import clipboard from 'clipboard';
import classnames from 'classnames';
import Icon from 'bee-icon';
import ReactDOM from 'react-dom';
import Tooltip from 'bee-tooltip';
import PropTypes from 'prop-types';

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
            html: '',
            tootipContent:'复制',
            id: 'id' + Math.round((Math.random() * 1000) + 1) + new Date().getTime(),
        };
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
                tootipContent:'已复制',
            });
            e.clearSelection();
            if (success instanceof Function) success();
        });
        cb.on('error', function (e) {
            self.setState({
                html: e.text
            });
            ReactDOM.findDOMNode(self.refs.text).select();
            if (error instanceof Function) error();
        });
    }
    blur=()=>{
        this.setState({
            currect: false,
            tootipContent:'复制'
        });
    }
    render() {
        const seft=this;
        let { action, text, target} = this.props;
        if(text)action='copy';

        return (
        <Tooltip positionTop="20px" overlay = {seft.state.tootipContent} placement="top" >
            <span onMouseOut={this.blur} className="u-clipboard" id={this.state.id} data-clipboard-action={action}
                  data-clipboard-target={target} data-clipboard-text={text}>
                        {this.props.children ? this.props.children : (<Icon className={classnames({
                            'uf-correct': this.state.currect,
                            'uf-copy': !this.state.currect
                        })}> </Icon>)}
            </span>
        </Tooltip>
        )
    }
};
Clipboard.propTypes = propTypes;
Clipboard.defaultProps = defaultProps;
export default Clipboard;