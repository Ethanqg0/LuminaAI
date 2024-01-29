import cors from 'cors';
import express from 'express';
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);
const app = express();

app.use(cors({
  origin: process.env.ROUTE, // add your route here
  credentials: true,
}));

app.use(express.json());

const { sign, verify } = jwt;
const { compare } = bcrypt;

const KEY = 'supersecret';

function createJSONToken(email) {
  return sign({ email }, KEY);
}

function validateJSONToken(token) {
  return verify(token, KEY);
}

function isValidPassword(password, storedPassword) {
  return compare(password, storedPassword);
}

function checkAuthMiddleware(req, res, next) {
  if (req.method === 'OPTIONS') {
    return next();
  }
  if (!req.headers.authorization) {
    console.log('NOT AUTH. AUTH HEADER MISSING.');
    return next(new NotAuthError('Not authenticated.'));
  }
  const authFragments = req.headers.authorization.split(' ');

  if (authFragments.length !== 2) {
    console.log('NOT AUTH. AUTH HEADER INVALID.');
    return next(new NotAuthError('Not authenticated.'));
  }
  const authToken = authFragments[1];
  try {
    const validatedToken = validateJSONToken(authToken);
    req.token = validatedToken;
  } catch (error) {
    console.log('NOT AUTH. TOKEN INVALID.');
    return next(new NotAuthError('Not authenticated.'));
  }
  next();
}

app.post('/', checkAuthMiddleware, async (req, res) => {
  try {
      const email = req.body.email;

      // Fetch data from the 'Project' table using the email parameter
      const { data: projects, error } = await supabase
          .from('Project')
          .select('*')
          .eq('email', email);

      if (error) {
          console.log("error");
      }

      // Send the fetched data as the response
      res.send(projects);
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
});

// Not done with yet.
app.post('/createUser', async (req, res) => {
    try {
        const { email, password, confirmedPassword} = req.body;

        if (password !== confirmedPassword) {
            return res.status(400).json({ error: 'Passwords do not match' });
        }

        if (!email || !password || !confirmedPassword) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            return res.status(500).json({ error: 'User creation failed' });
        }

        // Send a success response
        res.status(201).json({ success: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/resendVerificationEmail', async (req, res) => {
  try {
      const email = req.body.email;

      const { data, error } = await supabase.auth.resend({
          type: 'signup',
          email: email,
          options: {
              emailRedirectTo: 'http://localhost:5173/login'
          }
      });

      if (error) {
          throw new Error(error.message);
      }

      // Handle successful resend if needed
      res.status(200).json({ message: 'Confirmation email resent successfully' });
  } catch (error) {
      console.error('Error resending confirmation email:', error.message);
      res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/login', async (req, res) => {
  try {
      const { email, password } = req.body;

      if (!email || !password) {
          return res.status(400).json({ error: 'Email and password are required' });
      }

      console.log('Login', req.body)
      const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
      });
      console.log('Supabase response:', data, error);

      if (error) {
          console.error(error);
          return res.status(401).json({ error: 'Login failed' });
      }

      // Generate a token
      const token = createJSONToken(email);

      res.status(200).json({ success: 'Login successful', user: data.user, token });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/projects/:id', checkAuthMiddleware, async (req, res) => {
    try {
      const projectId = req.params.id;
  
      const { data, error } = await supabase
        .from('Project')
        .select()
        .eq('id', projectId);
  
      if (error) {
        console.error('Supabase error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        if (data && data.length > 0) {
          res.status(200).json(data[0]);
        } else {
          res.status(404).json({ error: 'Project not found' });
        }
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/projects', checkAuthMiddleware, async (req, res) => {
    try {
      const { data, error } = await supabase
        .from('Project')
        .insert([
          { title: req.body.title, description: req.body.description, email: req.body.email, date: req.body.date, tasks: req.body.tasks },
        ])
        .select();
  
      if (error) {
        // Handle the error
        console.error('Supabase error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        // Return the created project
        res.status(201).json(data);
      }
    } catch (error) {
      // Handle unexpected errors
      console.error('Unexpected error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

// works, just make sure you can only delete your own post.
app.delete('/projects/:id', checkAuthMiddleware, async (req, res) => {
    try {
      const projectId = req.params.id;
      console.log(projectId)
  
      const { error } = await supabase
        .from('Project')
        .delete()
        .eq('id', projectId);
  
      if (error) {
        console.error('Supabase error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.status(200).json({ message: 'Project deleted successfully' });
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

app.get('/verify-auth', (req, res) => {
    checkAuthMiddleware(req, res, (error) => {
      if (error) {
        res.status(401).json({ error: 'Not authenticated' });
      } else {
        res.status(200).json({ message: 'Authenticated' });
      }
    })
});

app.put('/projects/:id/lastModified', checkAuthMiddleware, async (req, res) => {
    const projectId = req.params.id;
    const lastModified = req.body.lastModified;

    try {
      const { data, error } = await supabase
        .from('Project')
        .update({ "lastModified": lastModified })
        .eq('id', projectId)
        .select();
  
      if (error) {
        console.error('Error updating project:', error);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        if (data && data.length > 0) {
          res.status(200).json({ message: 'Project updated successfully', updatedProject: data[0] });
        } else {
          res.status(404).json({ error: 'Project not found' });
        }
      }
    } catch (error) {
      console.error('Error updating project:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
})

app.put('/projects/:id', checkAuthMiddleware, async (req, res) => {
    const projectId = req.params.id;
    const tasks = req.body.tasks;
  
    try {
      const { data, error } = await supabase
        .from('Project')
        .update({ "tasks": tasks })
        .eq('id', projectId)
        .select();
  
      if (error) {
        console.error('Error updating project:', error);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        if (data && data.length > 0) {
          res.status(200).json({ message: 'Project updated successfully', updatedProject: data[0] });
        } else {
          res.status(404).json({ error: 'Project not found' });
        }
      }
    } catch (error) {
      console.error('Error updating project:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});
  
  
const port = 3000;

app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`);
});