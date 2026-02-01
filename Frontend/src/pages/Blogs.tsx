import Appbar from "../components/Appbar"
import BlogCard from "../components/BlogCard"
import useBlogs from '../hooks';
import Skeleton from "../components/Skeleton";

interface Blog {
  content: string;
  title: string;
  id: string;
  author: {
    name?: string;
  };
}

export default function Blogs() {
  const { loading, blogs } = useBlogs();

  if(loading) {
    return  <div className="flex justify-center pt-12">
      <Skeleton />
    </div>
  }

  console.log(blogs); 

  return ( 
    <div className=" full-screen w-screen">
      <Appbar />
      <div className="flex justify-center">
        <div>
          {blogs.map((blog: Blog) => 
            <BlogCard 
              key={blog.id}
              id={blog.id}
              authorName={blog.author?.name || "Anonymous"}
              title={blog.title}
              content={blog.content}
              publishedDate={"22nd Dec 2024"} 
            />
          )}    
        </div>
      </div>
    </div>
  )
} 
