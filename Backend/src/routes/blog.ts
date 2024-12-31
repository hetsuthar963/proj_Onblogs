import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode , sign, verify } from 'hono/jwt'
import { contextStorage } from "hono/context-storage";
import { createBlogInput, updateBlogInput } from "@hetsuthar_3/blog-common";
 
export const blogRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string,
      JWT_SECRET: string
    },
    Variables: {
        userId: string;
    },

}>();

interface Context {
    userId?: string;
}

// for all routes of blogs we are performing authentication checks
blogRouter.use('/*', async (c, next) => {

    // get the header -> verify the header -> if the header is correct, then proceed -> if not, return the user 403 status code
    const authHeader = c.req.header("authorization") || "";

    // Bearer token => ["Bearer", "token"];
    const token = authHeader.split(" ")[1];

    try {
        const user = await verify(token, c.env.JWT_SECRET) as { id: string };
        if (user) {
          (c as Context).userId = user.id;
          await next();
        } else {
          c.status(403);
          return c.json({ message: "You are not logged in!" });
        }
    } catch (error) {
        c.status(403);
        console.log(error);
        return c.json({ error: "You are not logged in!" });
    }
    
});
  
blogRouter.post('/', async (c) => {

    const body = await c.req.json();
    console.log('Received body:', body);
    const { success, error } = createBlogInput.safeParse(body);
    if (!success) {
        console.error('Validation Error:', error);
        const errorMessage = error.issues[0].message;
        const errorPath = error.issues[0].path.join('.');
        console.error(`Validation failed at ${errorPath}: ${errorMessage}`);
        c.status(422);
        return c.json({
          message: `Incorrect Inputs at ${errorPath}: ${errorMessage}`,
        });
    }

    const authorId = (c as Context).userId;

    if (!authorId) {
        c.status(403);
        return c.json({ error: "User ID not found" });
    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const post = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: authorId
        }
    });

    return c.json({
        id: post.id
    });

});
  
blogRouter.put('/', async (c) => {
    const body = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const post = await prisma.post.update({
        where: {
            id: body.id
        },
        data: {
            title: body.title,
            content: body.content
        }
    })

    return c.json({
        id: post.id
    })
})


// add pagination here !!!!
blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const posts = await prisma.post.findMany();

    return c.json({
        posts,
    });
});
  
blogRouter.get('/:id', async (c) => {
    const id = c.req.param("id");
    
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const blogs = await prisma.post.findMany({
        select: {
            content: true,
            title: true,
            id: true,
            author: {
                select: {
                    name: true
                }
            }
        }
    });

    try {
        const post = await prisma.post.findFirst({
            where:{
                id: id,
            },
            select: {
                id: true,
                title: true,
                content: true,
                author: {
                    select: {
                        name: true,
                    }
                }
            }
        });

        if (!post) {
            c.status(404);
            return c.json({ error: "post not found" });
        }

        return c.json({ 
            post
        });
    } catch(e) {
        c.status(411); 
        console.log(e);
        return c.json({
            message: "Error while fetching blog post!"
        });
    }
});
  

