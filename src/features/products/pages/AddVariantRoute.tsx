import { useParams } from "react-router";
import CreateEditProduct from "./CreateEditProduct";

const AddVariantRoute = () => {
  const { slug } = useParams<{ slug: string }>();
  return <CreateEditProduct slug={slug} isAddVariant />;
};

export default AddVariantRoute;