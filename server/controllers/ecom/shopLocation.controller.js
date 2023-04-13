import asyncHandler from 'express-async-handler';
import ShopLocation from '../models/ecom/shopLocation.model.js';

const createShopLocation = asyncHandler(async (req, res) => {
    const shopLocation = new ShopLocation(req.body);
    await shopLocation.save();
    res.json({ shopLocation });
});

const getShopLocations = asyncHandler(async (req, res) => {
    const shopLocations = await ShopLocation.find({});
    res.json({ shopLocations });
});

const getShopLocation = asyncHandler(async (req, res) => {
    const shopLocation = await ShopLocation.findById(req.params.id);
    res.json({ ShopLocation });
});

const updateShopLocation = asyncHandler(async (req, res) => {
    const shopLocation = await ShopLocation.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
    res.json({ shopLocation });
});

const deleteShopLocation = asyncHandler(async (req, res) => {
    const shopLocation = await ShopLocation.findOneAndDelete({ _id: req.params.id });
    res.json({ message: 'Shop location removed' });
});

export { createShopLocation, getShopLocations, getShopLocation, updateShopLocation, deleteShopLocation };