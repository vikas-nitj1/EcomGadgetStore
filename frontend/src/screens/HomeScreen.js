import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import { useGetProductsQuery, useGetTopProductsQuery } from '../slices/productsApiSlice';

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword, pageNumber });
  const { data: topProducts, isLoading: isLoadingTop, error: errorTop } = useGetTopProductsQuery();

  if (isLoading || isLoadingTop) {
    return <Loader />;
  }

  if (isError || errorTop) {
    return (
      <Message variant='danger'>
        {isError?.data?.message || errorTop || 'Something went wrong!'}
      </Message>
    );
  }

  return (
    <>
      {!keyword && <ProductCarousel products={topProducts} />}

      {keyword && (
        <Link to='/' className='btn btn-light mb-4'>
          Go Back
        </Link>
      )}

      <h1>Latest Products</h1>
      <Row>
        {data.products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
      <Paginate pages={data.pages} page={data.page} keyword={keyword ? keyword : ''} />
    </>
  );
};

export default HomeScreen;
