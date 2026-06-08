import { useEffect, useState } from "react";

import { Header, PageLoader } from "components/commons";
import { useFetchProducts } from "hooks/reactQuery/useProductsApi";
import useDebounce from "hooks/useDebounce";
import useQueryParams from "hooks/useQueryParams";
import { filterNonNull } from "neetocist";
import { Search } from "neetoicons";
import { Input, NoData, Pagination } from "neetoui";
import { isEmpty, without, mergeLeft } from "ramda";
import { useHistory } from "react-router-dom";
import routes from "routes";
import { buildUrl } from "utils/url";

import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "./constants";
import ProductListItem from "./ProductListItem";

const ProductList = () => {
  const queryParams = useQueryParams();
  const { page, pageSize, searchTerm = "" } = queryParams;
  const debouncedSearchTerm = useDebounce(searchTerm);

  const [searchKey, setSearchKey] = useState(searchTerm);

  useEffect(() => {
    setSearchKey(searchTerm);
  }, [searchTerm]);

  // const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE_INDEX);

  // const queryParams = useQueryParams();
  // const { page, pageSize } = queryParams

  const [cartItems, setCartItems] = useState([]);

  // const [searchKey, setSearchKey] = useState("");
  // const debouncedSearchKey = useDebounce(searchKey);

  const history = useHistory();

  // const [isLoading, setIsLoading] = useState(true);
  // const [products, setProducts] = useState([]);

  // const { data: { products = [] } = {}, isLoading } = useFetchProducts({
  //   searchTerm: debouncedSearchKey,
  // });

  const productsParams = {
    searchTerm: debouncedSearchTerm,
    // page: currentPage,
    // pageSize: DEFAULT_PAGE_SIZE,
    page: Number(page) || DEFAULT_PAGE_INDEX,
    pageSize: Number(pageSize) || DEFAULT_PAGE_SIZE,
  };

  const handlePageNavigation = page =>
    history.replace(
      buildUrl(
        routes.products.index,
        mergeLeft({ page, pageSize: DEFAULT_PAGE_SIZE }, queryParams)
      )
    );

  const { data: { products = [], totalProductsCount } = {}, isLoading } =
    useFetchProducts(productsParams);

  const updateQueryParams = value => {
    const params = {
      page: DEFAULT_PAGE_INDEX,
      pageSize: DEFAULT_PAGE_SIZE,
      searchTerm: value || null,
    };

    history.replace(buildUrl(routes.products.index, filterNonNull(params)));
  };

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
            // onChange={e => {
            //   setSearchKey(e.target.value);
            //   setCurrentPage(DEFAULT_PAGE_INDEX);
            // }}
            // onChange={updateQueryParams}
            onChange={({ target: { value } }) => {
              updateQueryParams(value);
              setSearchKey(value);
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
          // navigate={page => setCurrentPage(page)}
          navigate={handlePageNavigation}
          // pageNo={currentPage || DEFAULT_PAGE_INDEX}
          // pageSize={DEFAULT_PAGE_SIZE}
          pageNo={Number(page) || DEFAULT_PAGE_INDEX}
          pageSize={Number(pageSize) || DEFAULT_PAGE_SIZE}
        />
      </div>
    </div>
  );
};

export default ProductList;
