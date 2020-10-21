import React from 'react';

//styles
import Styles from './styles.scss';

export const Footer = () => {
    const fullYear = new Date().getFullYear();

    return (
        <div className = { Styles.root } >
            © { fullYear }
        </div>
    );
};
