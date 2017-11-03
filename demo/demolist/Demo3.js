/**
 *
 * @title 目标剪切
 * @description 剪切只适用于可输入的元素，如：FormControl。
 *
 */

import React, { Component } from 'react';
import Clipboard from '../../src';
import FormControl from 'bee-form-control';

class Demo3 extends Component {
    render() {
        function success(){
            console.log('success');
        }
        function error(){
            console.log('error');
        }
        return (
            <div>
                <FormControl id="cutContent" value={"目标复制-我将被复制到剪切板"} />
                <Clipboard action="cut" target='#cutContent' success={success} error={error}>
                </Clipboard>
            </div>
        )
    }
}

export default Demo3;