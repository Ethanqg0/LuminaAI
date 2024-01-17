import cors from 'cors';
import express from 'express';
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';
import jwt from 'jsonwebtoken';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const authSecretKey = process.env.AUTH_SECRET_KEY; // Use the correct environment variable

const supabase = createClient(supabaseUrl, supabaseKey);

const app = express();
app.use(cors());
app.use(express.json());

function generateAuthToken(userId) {
  const expiresIn = '1h';
  const token = jwt.sign({ userId }, authSecretKey, { expiresIn }); // Use authSecretKey
  return token;
}

function verifyAuthToken(token) {
  try {
    const decoded = jwt.verify(token, authSecretKey); // Use authSecretKey
    return decoded;
  } catch (error) {
    // Token verification failed
    console.error('Token verification failed:', error.message);
    return null;
  }
}

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - No token provided' });
  }

  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), authSecretKey);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized - Invalid token' });
  }
};

app.post('/', async (req, res) => {
  try {
      // Retrieve the email from the request body
      const emailParam = req.body.email;

      // Fetch data from the 'Project' table using the email parameter
      const { data: projects, error } = await supabase
          .from('Project')
          .select('*')
          .eq('email', emailParam);

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

app.post('/createUser', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            console.error(error);
            return res.status(500).json({ error: 'User creation failed' });
        }

        // Send a success response
        res.status(201).json({ success: 'User created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/login', async (req, res) => {
  try {
      const { email, password } = req.body;

      if (!email || !password) {
          return res.status(400).json({ error: 'Email and password are required' });
      }

      const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
      });

      if (error) {
          console.error(error);
          return res.status(401).json({ error: 'Login failed' });
      }

      // Generate a token
      const token = generateAuthToken(data.user.id);

      res.status(200).json({ success: 'Login successful', user: data.user, token });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/projects/:id', verifyToken, async (req, res) => {
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

app.post('/projects', verifyToken, async (req, res) => {
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

app.delete('/projects/:id', verifyToken, async (req, res) => {
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

app.put('/projects/:id', verifyToken, async (req, res) => {
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
