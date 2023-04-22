import * as yup from 'yup';

export const shopSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    longitude: yup.number().required('Longitude is required'),
    latitude: yup.number().required('Latitude is required'),
});
