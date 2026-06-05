import { useState } from "react";

import { Header, PageLoader } from "components/commons";
import { useFetchProducts } from "hooks/reactQuery/useProductsApi";
import useDebounce from "hooks/useDebounce";
import { Search } from "neetoicons";
import { Input, NoData, Pagination } from "neetoui";
import { isEmpty, without } from "ramda";

import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "./constants";
import ProductListItem from "./ProductListItem";

const ProductList = () => {
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE_INDEX);

  const [cartItems, setCartItems] = useState([]);

  const [searchKey, setSearchKey] = useState("");
  const debouncedSearchKey = useDebounce(searchKey);

  // const [isLoading, setIsLoading] = useState(true);
  // const [products, setProducts] = useState([]);

  // const { data: { products = [] } = {}, isLoading } = useFetchProducts({
  //   searchTerm: debouncedSearchKey,
  // });

  const productsParams = {
    searchTerm: debouncedSearchKey,
    page: currentPage,
    pageSize: DEFAULT_PAGE_SIZE,
  };

  const { data: { products = [], totalProductsCount } = {}, isLoading } =
    useFetchProducts(productsParams);

  // const fetchProducts = async () => {
  //   try {
  //     const data = await productsApi.fetch({ searchTerm: debouncedSearchKey });
  //     // setProducts(data.products);
  //   } catch (error) {
  //     console.log("An error occurred:", error);
  //   } finally {
  //     // setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchProducts();
  // }, [debouncedSearchKey]);

  if (isLoading) {
    return <PageLoader />;
  }

  const toggleIsInCart = slug =>
    setCartItems(prevCartItems =>
      prevCartItems.includes(slug)
        ? without([slug], cartItems)
        : [slug, ...cartItems]
    );

  return (
    <div className="flex h-screen flex-col">
      <Header
        cartItemsCount={cartItems.length}
        shouldShowBackButton={false}
        title="Smile cart"
        actionBlock={
          <Input
            placeholder="Search products"
            prefix={<Search />}
            type="search"
            value={searchKey}
            // onChange={event => setSearchKey(event.target.value)}
            onChange={e => {
              setSearchKey(e.target.value);
              setCurrentPage(DEFAULT_PAGE_INDEX);
            }}
          />
        }
      />
      {isEmpty(products) ? (
        <NoData className="h-full w-full" title="No products to show" />
      ) : (
        <div className="grid grid-cols-2 justify-items-center gap-y-8 p-4 md:grid-cols-3 lg:grid-cols-4">
          {products.map(product => (
            <ProductListItem
              key={product.slug}
              {...product}
              isInCart={cartItems.includes(product.slug)}
              toggleIsInCart={() => toggleIsInCart(product.slug)}
            />
          ))}
        </div>
      )}
      <div className="mb-5 self-end">
        <Pagination
          count={totalProductsCount}
          navigate={page => setCurrentPage(page)}
          pageNo={currentPage || DEFAULT_PAGE_INDEX}
          pageSize={DEFAULT_PAGE_SIZE}
        />
      </div>
    </div>
  );
};

export default ProductList;
