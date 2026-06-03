import { useState, useEffect } from "react";

import axios from "axios";
import { Typography, Spinner } from "neetoui";
import { isNotNil, append } from "ramda";

import Carousel from "./Carousel";

const Product = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState({});

  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        "https://smile-cart-backend-staging.neetodeployapp.com/products/infinix-inbook-2"
      );
      setProduct(response.data);
    } catch (error) {
      console.log("An error occurred:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  // const { name, description, mrp, offer_price } = product;
  // const { name, description, mrp, offer_price, image_urls, image_url } = product;
  const {
    name,
    description,
    mrp,
    offer_price: offerPrice,
    image_urls: imageUrls,
    image_url: imageUrl,
  } = product;

  const totalDiscounts = mrp - offerPrice;
  const discountPercentage = ((totalDiscounts / mrp) * 100).toFixed(1);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="px-6 pb-6">
      <div>
        <Typography className="py-2 text-4xl font-semibold" style="h1">
          {name}
        </Typography>
      </div>
      <div className="mt-6 flex gap-4">
        <div className="w-2/5">
          {/* <img
                    alt="Product"
                    className="h-64 w-10/12"
                    src="https://ik.imagekit.io/d9mvewbju/SmileCart/thumbnail_61_7PaLfb.jpg"
                    /> */}

          {/* <Carousel imageUrls={IMAGE_URLS} title="Infinix Inbook" /> */}

          <div className="flex justify-center gap-16">
            {/* <Carousel imageUrls={append(image_url, image_urls)} title={name} /> */}

            {isNotNil(imageUrls) ? (
              <Carousel imageUrls={append(imageUrl, imageUrls)} title={name} />
            ) : (
              <img alt={name} className="w-48" src={imageUrl} />
            )}
          </div>
        </div>
        <div className="w-3/5 space-y-4">
          {/* <p>
                        Infinix Inbook X1 Ci3 10th 8GB 256GB 14 Win10 Grey - 1 Year Warranty.
                    </p>
                    <p>MRP: $395.97</p>
                    <p className="font-semibold">Offer price: $374.43</p>
                    <p className="font-semibold text-green-600">6% off</p> */}

          <Typography>{description}</Typography>
          <Typography>MRP: {mrp}</Typography>
          <Typography className="font-semibold">
            Offer price: {offerPrice}
          </Typography>
          <Typography className="font-semibold text-green-600">
            {discountPercentage}% off
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Product;
