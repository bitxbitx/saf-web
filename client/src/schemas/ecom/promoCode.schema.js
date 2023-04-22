import * as yup from 'yup';

export const promoCodeSchema = yup.object().shape({
    code: yup.string().required("Code is required"),
    discountAmount: yup.number().required("Discount amount is required"),
    discountType: yup.string().required("Discount type is required"),
    productCategory: yup.array().required("Product category is required"),
    startDate: yup.date().required("Start date is required"),
    endDate: yup.date().required("End date is required"),
    minPurchaseAmount: yup.number(),
    maxDiscountAmount: yup.number(),
    maxDiscountPerUser: yup.number(),
});