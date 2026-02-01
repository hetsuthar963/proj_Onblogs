import { useEffect, useState } from "react"
import axios from "axios"
import { BACKEND_URL } from "../config"

interface Blog {
    content: string;
    title: string;
    id: string;
    author: {
       name: string; 
    };
    publishedDate: string;
}

export function useBlog({ id } : { id: string }) {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(!token) {
            console.error("No token found");
            setLoading(false);
            return;
        }
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => {
                if (response.data && response.data.post) {
                    setBlog(response.data.post);
                  } else {
                    console.error("Unexpected data structure:", response.data);
                  }
                  setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching blogs:", error);
                setLoading(false);
            });
    }, [id]);

    return {
        loading,
        blog
    }
}

export default function useBlogs() {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(!token) {
            console.error("No token found");
            setLoading(false);
            return;
        }
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => {
                if (Array.isArray(response.data.posts)) {
                    setBlogs(response.data.posts);
                } else {
                    console.error("Unexpected data structure:", response.data);
                }
                setLoading(false);
                
            })
            .catch(error => {
                console.error("Error fetching blogs:", error);
                setLoading(false);
            });
    }, []);

    return {
        loading,
        blogs
    }
} 