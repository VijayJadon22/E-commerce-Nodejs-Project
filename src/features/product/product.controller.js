import { ProductModel } from "./product.model.js";
import { ProductRepository } from "./product.repository.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

export class ProductController {
    async getAllProducts(req, res, next) {
        try {
            const products = await ProductRepository.getAll();
            return res.status(200).send({ Products: products });
        } catch (error) {
            next(error);
        }
    }

    async addProduct(req, res, next) {
        try {
            let { name, desc, price, category, sizes } = req.body;
            if (!req.file) {
                throw new ApplicationError("File not uploaded", 400);
            }

            const imagePath = 'uploads/' + req.file.filename;
            sizes = sizes.split(',');
            price = parseFloat(price);

            // const newProduct = new ProductModel(name, desc, price, imagePath, category, sizes);
            const productAdded = await ProductRepository.addNewproduct(name, desc, price, imagePath, category, sizes, next);

            if (!productAdded) {
                return res.status(400).send( "Product not added");
            }

            return res.status(200).send({ status: "success", data: productAdded });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async findProductById(req, res, next) {
        try {
            const id = Number(req.params.id);
            // console.log(typeof (id));
            const product = await ProductRepository.findById(id);
            if (!product) {
                return res.status(400).send("Product not found");
            }
            return res.status(200).send({ Product: product });
        } catch (error) {
            next(error);
        }

    }

    async filterProduct(req, res, next) {
        try {
            const minPrice = req.query.minPrice ? parseFloat(req.query.minPrice) : 0;
            const maxPrice = req.query.maxPrice ? parseFloat(req.query.maxPrice) : Infinity;
            const category = req.query.category ? Number(req.query.category) : undefined;
            const filteredProducts = await ProductRepository.filterProduct(minPrice, maxPrice, category);
            if (!filteredProducts) {
                return res.status(400).send("No products match the filter");
            }
            return res.status(200).send({ Products: filteredProducts });
        } catch (error) {
            next(error);
        }
    }

    async rateProduct(req, res, next) {
        try {
            console.log('Received request to rate product');
            const userId = req.userId;
            const { productId, rating } = req.query;
            const productRated = await ProductRepository.rateProduct(userId, Number(productId), Number(rating));
    
            if (!productRated) {
                console.log('Rating could not be added');
                return res.status(400).send("Rating could not be added");
            }
    
            console.log('Rating added successfully');
            return res.status(200).send("Rating added successfully");
        } catch (error) {
            console.error('Error in rateProduct controller:', error);
            next(error);
        }
    }

    async categoryAveragePrice(req, res, next) {
        try {
            const result = await ProductRepository.categoryAveragePrice();
            res.status(200).send({ result });
        } catch (error) {
            console.error("Error", error);
            next(error);
        }
    }

    async averageRating(req, res, next) {
        try {
            const result = await ProductRepository.averageRating();
            return res.status(200).send(result);
        } catch (error) {
            console.error("Error", error);
            next(error);
        }
    }

    
}