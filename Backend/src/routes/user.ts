import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { signupInput, signinInput } from "@hetsuthar_3/blog-common";

// letting Typescripts know about env (.toml) that this exists because TS cannot read (.toml) 
export const userRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string,
      JWT_SECRET: string
    }
}>();  

userRouter.post('/signup', async (c) => {
  const body = await c.req.json();
  console.log("Body received : ",body);
  const { success, error } = signupInput.safeParse(body);
  if(!success) {
    console.error("Validation error : ",error);

    const errorMessage = error.issues[0].message;
    const errorPath = error.issues[0].path.join('.');
    console.error(`Validation failed at ${errorPath}: ${errorMessage}`);

    if(errorPath == 'name'){
      return c.json({message: "Name is optional"});
    }else {
      c.status(422);
        
      return c.json({
        message: `Incorrect Inputs at ${errorPath}: ${errorMessage}`,
      });
    }
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  
  
  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name
      },
    });
  
    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({
      jwt: token
    });
  
  } catch(e) {
    console.log(e);
    c.status(403);
    return c.json({error: "error while signing up"});
    }
}); 
  
userRouter.post('/signin', async (c) => {
  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);
  if(!success) {
    c.status(411);
    return c.json({
      message: "Input not correct",
    });
    
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  
  
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password
      }
    });
  
    if(!user) {
      c.status(403);
      return c.json({
        message: "Incorrect Credentials"
      })
    }
  
    const jwt = await sign({
      id: user.id 
    }, c.env.JWT_SECRET);
  
    return c.json({jwt});
  
  }catch(e) {
    console.log(e);
    c.status(411);
    return c.text('Invalid');
  }
  
});