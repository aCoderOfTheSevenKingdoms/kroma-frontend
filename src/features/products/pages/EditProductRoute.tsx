import { useParams } from "react-router";
import CreateEditProduct from "./CreateEditProduct";

const EditProductRoute = () => {
  const { slug } = useParams<{ slug: string }>();
  return <CreateEditProduct slug={slug} />;
};

export default EditProductRoute;
