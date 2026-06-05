import { Header, PageNotFound, PageLoader } from "components/commons";
import AddToCart from "components/commons/AddToCart";
import useSelectedQuantity from "components/hooks/useSelectedQuantity";
import { useShowProduct } from "hooks/reactQuery/useProductsApi";
import { Typography, Button } from "neetoui";
import { isNotNil } from "ramda";
import { useParams } from "react-router-dom";
import routes from "routes";

import Carousel from "./Carousel";

const Product = () => {
  // const [isError, setIsError] = useState(false);
  // const [isLoading, setIsLoading] = useState(true);
  // const [product, setProduct] = useState({});

  const { slug } = useParams();

  const { data: product = {}, isLoading, isError } = useShowProduct(slug);

  const { selectedQuantity, setSelectedQuantity } = useSelectedQuantity(slug);

  // const fetchProduct = async () => {
  //   try {
  //     //   const response = await productsApi.show();
  //     //   setProduct(response.data);

  //     // const product = await productsApi.show();
  //     // setProduct(product);

  //     const response = await productsApi.show(slug);
  //     // setProduct(response);
  //   } catch (error) {
  //     console.log("An error occurred:", error);
  //     // setIsError(true);
  //   } finally {
  //     // setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchProduct();
  // }, []);

  if (isError) {
    return <PageNotFound />;
  }

  //   const { name, description, mrp, offer_price } = product;
  //   const { name, description, mrp, offer_price, image_urls, image_url } = product;
  //   const {
  //     name,
  //     description,
  //     mrp,
  //     offer_price: offerPrice,
  //     image_urls: imageUrls,
  //     image_url: imageUrl,
  //   } = product;

  const { name, description, mrp, offerPrice, imageUrls, imageUrl } = product;

  const totalDiscounts = mrp - offerPrice;
  const discountPercentage = ((totalDiscounts / mrp) * 100).toFixed(1);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="px-6 pb-6">
      <Header title={name} />
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
              // <Carousel imageUrls={append(imageUrl, imageUrls)} title={name} />
              <Carousel />
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
          <div className="flex space-x-10">
            <AddToCart {...{ slug }} />
            <Button
              className="bg-neutral-800 hover:bg-neutral-950"
              label="Buy now"
              size="large"
              to={routes.checkout}
              onClick={() => setSelectedQuantity(selectedQuantity || 1)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
