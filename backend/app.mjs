import cors from 'cors';
import express from 'express';
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const app = express();
app.use(cors());
app.use(express.json());

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

        // Send a success response
        res.status(200).json({ success: 'Login successful', user: data.user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/projects', async (req, res) => {
    try {
      const { data, error } = await supabase
        .from('Project')
        .insert([
          { title: req.body.title, description: req.body.description, email: req.body.email },
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

app.delete('/projects/:id', async (req, res) => {
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
  
const port = 3000;

app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`);
});
