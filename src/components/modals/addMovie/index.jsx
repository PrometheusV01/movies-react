import React, { memo, useCallback } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { Modal } from 'semantic-ui-react';

//components
import { AddMovieForm } from 'components/forms/addMovie';

//instruments
import { moviesActions as actions } from 'bus/movies/actions';

export const AddMovieModal = memo(() => {
    const isModalOpen = useSelector(({ movies }) => movies.get('addModal'), shallowEqual);

    //methods
    const dispatch = useDispatch();

    const handleClose = useCallback(() => dispatch(actions.setAddModal(false)), []);

    return (
        <Modal
            open = { isModalOpen }
            onClose = { handleClose }>
            <AddMovieForm />
        </Modal>
    );
});
