import * as yup from 'yup'

export const productCategorySchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    description: yup.string(),
    image: yup.string()
})
