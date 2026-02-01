import { Link } from "react-router-dom";

interface BlogCardProps {
    id: string;
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
}

export default function BlogCard({
    id,
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps) {
  return (
    <Link to={`/blog/${id}`}>
    <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
        <div>
            
        </div>
        <div className="flex">
            <div className="">
                <Avatar size="small" name={authorName} /> 
            </div>
            <div className="font-extralight pl-2 text-sm flex justify-center flex-col">
                {authorName || "Anonymous"}
            </div>
            <div className="flex justify-center flex-col pl-2">
                <Circle />
            </div> 
            <div className="font-thin pl-2 text-slate-500 text-sm flex justify-center flex-col">
                {publishedDate}
            </div>
        </div>
        <div className="text-xl font-semibold mt-3">
            {title}
        </div>
        <div className="text-md font-thin text-slate-500">
            {content.slice(0, 100) + "..."}
        </div>
        <div className="text-slate-400 text-sm font-thin pt-4">
            {`${Math.ceil(content.length / 100)} minute(s) read`}
        </div>
        {/* <div className="bg-slate-200 h-1 w-full">

        </div> */}
    </div>
    </Link>
  )

}

export function Circle() {
    return <div className="h-1 w-1 rounded-full bg-gray-400"></div>
}

export function Avatar({ name, size = "small" } : { name: string, size: "small" | "big" }) {
    const initials = name ? name[0] + (name.length > 6 ? name[6] : name.slice(-1)) : "?";

  return (
    <div className={`relative inline-flex items-center justify-center ${size === "small" ? "w-7 h-7" : "w-10 h-10"} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-400`}>
        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
            {initials}
        </span>
    </div>
  );
}


    