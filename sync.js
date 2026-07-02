const axios = require("axios");
const { getAccessToken } = require("./zoho");
const mongoose = require("mongoose");

const Product = mongoose.model("Product");

async function syncItems() {

    const token = await getAccessToken();

    const res = await axios.get(
        "https://www.zohoapis.in/inventory/v1/items",
        {
            params: {
                organization_id: process.env.ZOHO_ORGANIZATION_ID
            },
            headers: {
                Authorization: `Zoho-oauthtoken ${token}`
            }
        }
    );

    for (const item of res.data.items) {

        await Product.findOneAndUpdate(
            { styleNo: item.sku },

            {
                name: item.name,
                styleNo: item.sku,
                price: item.rate || 0,
                stock: item.stock_on_hand || 0,
                category: "",
                color: "",
                images: [],
                primaryImage: ""
            },

            { upsert: true, new: true }
        );

    }

    console.log("Sync Completed:", res.data.items.length);

}

module.exports = { syncItems };
