import React, { memo } from 'react';
import { FastField } from 'formik';
import { Form, Input, Button } from 'semantic-ui-react';

import Styles from './styles.scss';

export const View = memo(({ handleSubmit, handleReset }) => {
    return (
        <Form className = { Styles.root } onSubmit = { handleSubmit } >
            <FastField
                name = 'title'
                render = { ({ field, form }) => {
                    return (
                        <Form.Field
                            control = { Input }
                            id = 'title-search'
                            label = { 'Title' }
                            placeholder = 'Input title...'
                            value = { field.value }
                            onChange = { (...[, evt]) => form.setFieldValue(field.name, evt.value) }
                        />
                    );
                } }
            />
            <FastField
                name = 'star'
                render = { ({ field, form }) => {
                    return (
                        <Form.Field
                            control = { Input }
                            id = 'star-search'
                            label = { 'Star' }
                            placeholder = { 'Input start...' }
                            value = { field.value }
                            onChange = { (...[, evt]) => form.setFieldValue(field.name, evt.value) }
                        />
                    );
                } }
            />
            <div>
                <Button
                    inverted
                    color = 'green'
                    content = 'Search'
                    type = 'submit'
                />
                <Button
                    inverted
                    color = 'yellow'
                    content = 'Clear'
                    type = 'button'
                    onClick = { handleReset }
                />
            </div>
        </Form>
    );
});
