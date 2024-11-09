import { ApplicationError } from "../../error-handler/applicationError.js";
import { UserModel } from "../user/user.model.js";

export class ProductModel {
    constructor(name, desc, price, imageUrl, category, sizes) {
        this.name = name;
        this.desc = desc;
        this.price = price;
        this.imageUrl = imageUrl;
        this.category = category;
        this.sizes = sizes;
        this.ratings = [];
    }

    static filterProduct(minPrice, maxPrice, category) {
        let result;
        if (category) {
            result = products.filter(p => p.category==category && p.price >= minPrice && p.price <= maxPrice );
        } else {
            result = products.filter(p => p.price >= minPrice && p.price <= maxPrice);
        }
        return result;
    }

    static rateProduct(userId, productId, rating) {
        const user = UserModel.getUsers().find(user => user.id == userId);
        if (!user) {
            throw new ApplicationError("User not found!",404);
        }

        const product = products.find(p => p.id == productId);
        if (!product) {
            throw new ApplicationError("Product not found!",400);
        }
        const productIndex = products.findIndex(p => p.id == productId);

        const userRating = product.ratings.findIndex(p => p.userId == userId);
        if (userRating != -1) {
            product.ratings[userRating] = {
                userId: userId,
                productId: productId,
                rating:rating,
            }
        } else {
            product.ratings.push({
                userId: userId,
                productId: productId,
                rating:rating,
            })
        }
        products[productIndex] = product;
        console.log(products);
        return product;
    }

}

var products = [
    new ProductModel(
        1,
        'Product 1',
        'Description for Product 1',
        89.99,
        'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg',
        'category1',
        ['M', 'XL'],
        [],
    ),
    new ProductModel(
        2,
        'Product 2',
        'Description for Product 2',
        12.99,
        'https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg',
        'category2',
        ['M', 'XL'],
        [],
    ),
    new ProductModel(
        3,
        'Product 3',
        'Description for Product 3',
        39.99,
        'https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg',
        'category3',
        ['M', 'XL', 'S'],
        [],
    ),
    new ProductModel(
        4,
        'Product 4',
        'Description for Product 4',
        54.99,
        'https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg',
        'category3',
        ['M', 'XL', 'S'],
        [],
    ),
    new ProductModel(
        5,
        'Product 5',
        'Description for Product 5',
        69.99,
        'https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg',
        'category3',
        ['M', 'XL', 'S'],
        [],
    ),
    new ProductModel(
        6,
        'Product 5',
        'Description for Product 6',
        89.99,
        'https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg',
        'category3',
        ['M', 'XL', 'S'],
        [],
    ),
];