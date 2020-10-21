import React, { memo } from 'react';
import { FastField } from 'formik';
import { Modal, Form, Input, Button, Dropdown, TextArea, Message } from 'semantic-ui-react';
import { getIn } from 'immutable';

const FORMAT_OPTIONS = [
    { text: 'VHS', value: 'VHS' },
    { text: 'DVD', value: 'DVD' },
    { text: 'Blu-Ray', value: 'Blue-Ray' }
];

export const View = memo(({ onSubmit, loading, successMsg, errorMsg, closeModal }) => {
    return (
        <>
            <Modal.Header>Add new movie</Modal.Header>
            <Modal.Content>
                <Form onSubmit = { onSubmit } >
                    <FastField
                        name = 'title'
                        render = { ({ field, form }) => {
                            const error =  getIn(form, ['errors', field.name]);

                            return (
                                <Form.Field
                                    control = { Input }
                                    error = { error }
                                    id = 'title-create'
                                    label = { 'Title' }
                                    placeholder = 'Input title...'
                                    value = { field.value }
                                    onChange = { (...[, evt]) => form.setFieldValue(field.name, evt.value) }
                                />
                            );
                        } }
                    />
                    <FastField
                        name = 'releaseYear'
                        render = { ({ field, form }) => {
                            const error =  getIn(form, ['errors', field.name]);

                            return (
                                <Form.Field
                                    control = { Input }
                                    error = { error }
                                    id = 'releaseYear-create'
                                    label = { 'Release years' }
                                    placeholder = 'Input release year...'
                                    value = { field.value }
                                    onChange = { (...[, evt]) => form.setFieldValue(field.name, evt.value) }
                                />
                            );
                        } }
                    />
                    <FastField
                        name = 'format'
                        render = { ({ field, form }) => {
                            return (
                                <Form.Field>
                                    <label htmlFor = 'format-create' >Format</label>
                                    <Dropdown
                                        fluid
                                        selection
                                        id = 'format-create'
                                        options = { FORMAT_OPTIONS }
                                        placeholder = 'Select format'
                                        value = { field.value }
                                        onChange = { (...[, { value }]) => form.setFieldValue(field.name, value) }
                                    />
                                </Form.Field>
                            );
                        } }
                    />
                    <FastField
                        name = 'stars'
                        render = { ({ field, form }) => {
                            const error =  getIn(form, ['errors', field.name]);

                            return (
                                <Form.Field
                                    control = { TextArea }
                                    error = { error }
                                    id = 'stars-create'
                                    label = { 'Stars' }
                                    placeholder = 'Input stars...'
                                    value = { field.value }
                                    onChange = { (...[, { value }]) => form.setFieldValue(field.name, value) }
                                />
                            );
                        } }
                    />
                    <div>
                        <Button
                            inverted
                            color = 'green'
                            content = 'Save'
                            disabled = { loading }
                            loading = { loading }
                            type = 'submit'
                        />
                        <Button
                            inverted
                            color = 'yellow'
                            content = 'Close'
                            type = 'button'
                            onClick = { closeModal }
                        />
                    </div>
                </Form>
                { successMsg && <Message success content = { successMsg } /> }
                { errorMsg && <Message error content = { errorMsg } /> }
            </Modal.Content>
        </>
    );
});
