import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  return <div>Viewing Product ID: {id}</div>;
};

export default ProductDetail;
