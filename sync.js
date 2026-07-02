const axios = require("axios");
const { getAccessToken } = require("./zoho");

async function syncItems(){

    const token = await getAccessToken();

    const res = await axios.get(
        "https://www.zohoapis.in/inventory/v1/items",
        {
            params:{
                organization_id:process.env.ZOHO_ORGANIZATION_ID
            },
            headers:{
                Authorization:`Zoho-oauthtoken ${token}`
            }
        }
    );

    console.log(res.data.items);

}

module.exports={
    syncItems
};
