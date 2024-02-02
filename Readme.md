Code Review Issue Log

Setup Instructions
    cd vite-project
    npm install i
    npm run dev

Environmental Variables (Backend Directory)
    SUPABASE_URL="https://nuvsntxbvstdamigwdvm.supabase.co"
    SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51dnNudHhidnN0ZGFtaWd3ZHZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU0ODM1OTcsImV4cCI6MjAyMTA1OTU5N30.TwCGeHdRfKTyZDWTW9mLvYmobr09jTN9wkOIY0DQlgM"
    ROUTE="http://localhost:5173"

Notes
    Seeking feedback on readability, efficiency, and correctness.
    Plan to modularize helper functions into a util folder. Don't worry about modularization for now.
    Any unnecessary states or states that can be lifted?
    Specifically, looking for feedback on route handling (Routes.jsx), context creation for authentication (AuthContext.jsx), and prop passing between components (ProjectsPage.jsx, Dashboard.jsx)
    Using useContext for global state; open to suggestions on this choice. Perhaps Redux.
    Check for any irregularities in routes and useState usage in the Dashboard, Projects, and Sidebar components.
    Actively retrieving user info from localStorage using useEffect.
    


Problem with useEffect:
  const fetchProjects = async () => {
    try {
      let userEmail = localStorage.getItem('email');
      setIsLoggedIn(userEmail);

      const response = await fetch('http://localhost:3000', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ email: userEmail }),
      });

      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.log('Error fetching projects:', error);
    }
  };
  
  useEffect(() => {
    fetchProjects();
  }, [token, isLoggedIn]);

  Error: warning  React Hook useEffect has a missing dependency: 'fetchProjects'. Either include it or remove the dependency array  react-hooks/exhaustive-deps

  They want us to put the function in the dependencies, but then the loggedInState will not be accessible, meaning that we have to add the variables to the dependencies. but storing the variable inside of the dependency would be a bad choice, right?


Ethan watch this later: 
https://youtu.be/QQYeipc_cik?si=QAEpErUnkkrJ5Iej
https://youtu.be/WIMgb9OeI9I?si=UG0U-itMr_PLhnle