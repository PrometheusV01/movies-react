import React, { memo, useCallback } from 'react';
import { withFormik } from 'formik';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { get } from 'immutable';
import { object, string } from 'yup';

//view
import { View } from './view';

//instruments
import { moviesActions as actions } from 'bus/movies/actions';

const formikConfig = {
    mapPropsToValues: () => {
        return {
            title:       '',
            releaseYear: '',
            format:      'VHS',
            'stars':     '',
        };
    },
    validationSchema: () => {
        return object({
            title:       string().required('Required'),
            releaseYear: string().required('Required'),
            stars:       string().required('Required'),
        });
    },
    handleSubmit: (values, { props, ...formik }) => {
        const { createMovie } = props;

        createMovie(values, formik);
    },
};

const mapDispatchToProps = {
    createMovie: actions.createMovie,
    setModal:    actions.setAddModal,
};

export const Container = compose(connect(null, mapDispatchToProps), withFormik(formikConfig), memo)((props) => {
    const {
        handleSubmit,
        isSubmitting,
        setModal,
        status,
    } = props;

    const errorMsg = get(status, 'error') && get(status, 'message');
    const successMsg = get(status, 'success') && get(status, 'message');

    const closeModal = useCallback(() => setModal(false), []);

    return (
        <View
            closeModal = { closeModal }
            errorMsg = { errorMsg }
            loading = { isSubmitting }
            successMsg = { successMsg }
            onSubmit = { handleSubmit }
        />
    );
});
