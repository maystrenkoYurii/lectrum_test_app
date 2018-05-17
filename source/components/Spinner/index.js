// Core
import React, { Component } from 'react';
import { createPortal } from 'react-dom';

//Style
import Styles from './styles.m.css';

const portal = document.getElementById('spinner');

export default class Spinner extends Component {
    render () {
        const { spin } = this.props;

        return createPortal(
            spin ? <div className = { Styles.spinner } /> : null, portal
        );
    }
}
