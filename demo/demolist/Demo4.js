/**
 *
 * @title 切换复制组件显示的语言
 * @description 通过设置locale属性来修改文字和语言
 *
 */

import React, { Component } from 'react';
import Clipboard from '../../src';
import en from '../../src/en_US';

class Demo4 extends Component {
    render() {
        function success() {
            console.log('success');
        }

        function error() {
            console.log('error');
        }

        return (
            <Clipboard locale={en} action="copy" text="默认复制-我将被复制到剪切板" success={success} error={error}>

            </Clipboard>
        )
    }
}

export default Demo4;