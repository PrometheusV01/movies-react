import { Map } from 'immutable';

// instruments
import { parseErrorPath } from 'helpers';

export const parseErrorsByFormik = (values, errors) => {
    const valuesMap = Map(values);

    return Map({ ...errors }).reduce((results, error) => {
        const { property_path: path, message } = error;
        const transformPathToArray = parseErrorPath(path).split('.');
        const isErrorInValues = valuesMap.hasIn(transformPathToArray, null);

        if (isErrorInValues) {
            return results.setIn(['errorsByValues', ...transformPathToArray], message);
        }

        return results.update('otherErrors', (errorsList) => [...errorsList, { path: transformPathToArray, message: message.replace('.', '') }]);
    }, Map({ errorsByValues: {}, otherErrors: []}))
        .update('errorsByValues', (obj) => Map(obj).isEmpty() ? null : obj)
        .toObject();
};
