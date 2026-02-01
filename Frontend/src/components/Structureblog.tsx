import Blog from '../hooks'
import Appbar from './Appbar'
import { Avatar } from './BlogCard';

interface Blog {
    content: string;
    title: string;
    id: string;
    author: {
      name?: string;
    };
    publishedDate: string;
  }
  
  interface StructureblogProps {
    blog: Blog;
  }

export function Structureblog({ blog }: StructureblogProps) {
    console.log(blog);
    
  return ( 
    <div>
        <Appbar />
        <div className='flex justify-center'>
            <div className='ml-16 grid grid-cols-12 px-10 w-full pt-12 max-w-screen-2xl'>
            
                <div className='grid-cols-8 col-span-8'>
                    <div className='text-4xl font-bold'>
                        {blog.title}
                    </div>
                    <div className='text-md font-normal pt-4 text-slate-400'>
                        Posted on {blog.publishedDate}
                    </div>
                    <div className='text-md font-medium pt-4 text-slate-600'>
                        {blog.content}
                    </div>
                    
                </div>
                <div className='grid-cols-4 col-span-4 pl-2 p-4 border-l'>
                    <div className='font-normal text-lg'>
                        <div className='pl-1.5 max-w-14 bg-blue-100 text-blue-800 rounded-2xl text-sm'>
                            Author
                        </div>
                        
                        <div className='flex w-full'>
                            <div className='pr-4 flex flex-col justify-center'>
                                <Avatar size="big" name={blog.author.name || "Anonymous"} />
                            </div>
                            <div>
                                <div className='font-bold text-2xl pt-4'>
                                    {blog.author.name || "Anonymous"} 
                                </div>
                                <div className='text-slate-500 text-lg font-sans pt-4'>
                                    Lorem Ipsum is simply dummy text, of the printing and typesetting industry.
                                </div>
                            </div>
                        </div>
                    </div>  
                </div>
            </div>
        </div>
    </div>
  )
}

