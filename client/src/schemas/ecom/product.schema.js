import * as yup from 'yup';

export const productSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    category: yup.array().of(yup.string()).required("Category is required"),
    image: yup.mixed().required("Image is required"),
    productDetail: yup.string(),
    description: yup.string(),
    variants: yup.array().of(
        yup.object().shape({
            sku: yup.string().required("SKU is required"),
            price: yup.number().required("Price is required"),
            inventoryStock: yup.number().required("Inventory Stock is required"),
            image: yup.mixed()
        })
    )
});