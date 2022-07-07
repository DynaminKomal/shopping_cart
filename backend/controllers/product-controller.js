import  Products from "../models/product_model.js"


export const getAllProduct = async (request, response) => {
    let products;
    try {
        products = await Products.find({});

    } catch (err) {
        console.log(err);
    }

    if (!products) {
        return response.status(404).json({ message: "No product found" });
    }
    return response.status(202).json({ products });
}

export const singleProductDetails = async (request, response) => {
    const productId = request.params.id;

    let product;
    try {
        product = await Products.findById(productId)
    } catch (err) {
        return console.log(err);
    }
    if (!product) {
        return response.status(404).json({ message: "No product found" })
    }
    return response.status(200).json({ product })
}

