import React, { memo, useCallback, useEffect } from 'react';
import { withFormik } from 'formik';
import { compose } from 'redux';
import { connect } from 'react-redux';

//view
import { View } from './view';

//instruments
import { moviesActions as actions } from 'bus/movies/actions';

const DEFAULT_VALUES = {
    title: '',
    star:  '',
};

const formikConfig = {
    mapPropsToValues: () => {
        return DEFAULT_VALUES;
    },
    handleSubmit: (values, { props, ...formik }) => {
        const { search, setMoviesValues } = props;

        setMoviesValues(values);
        search(formik);
    },
};

const mapDispatchToProps = {
    search:          actions.searchMovies,
    setMoviesValues: actions.setMoviesValues,
    setPage:         actions.setMoviesPage,
};

export const Container = compose(connect(null, mapDispatchToProps), withFormik(formikConfig), memo)((props) => {
    const {
        handleSubmit,
        resetForm,
        submitForm,
        setPage,
    } = props;

    const firstSubmit = useCallback(() => {
        setPage(1);
        submitForm();
    }, []);
    const handleReset = useCallback(() => {
        resetForm();
        firstSubmit();
    }, []);

    useEffect(() => {
        firstSubmit();
    }, []);

    return (
        <View
            handleReset = { handleReset }
            handleSubmit = { handleSubmit }
        />
    );
});
