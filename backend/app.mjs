import cors from 'cors';
import express from 'express';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('', '');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
    try {
        // Fetch data from the 'Project' table
        const { data: projects, error } = await supabase
            .from('Project')
            .select('*');

        if (error) {
            console.log("error")
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


app.get('')

const port = 3000;

app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`);
});
