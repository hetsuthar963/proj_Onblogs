import Appbar from "../components/Appbar";
import Spinner from "../components/Spinner";
import { Structureblog } from "../components/Structureblog";
import { useBlog } from "../hooks"
import { useParams } from "react-router-dom";

export default function Blog() {
  const { id } = useParams();
  const {loading, blog} = useBlog({
    id: id || ""
  });

  if (loading || !blog) {
    return (
    <div>
      <Appbar />
      <div className="h-screen flex flex-col justify-center">
        <div className="flex justify-center">
        <Spinner />
        </div>
        
      </div>
    </div>
    )
  }

  console.log(blog);
  

  return (
    <div>
      <Structureblog blog={blog} />
    </div>
  )
}

