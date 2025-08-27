import './HomePage.css';

const Home = () => {
  return (
    <main>
      <h1>Welcome to The Campaign</h1>
      <p>
        The Campaign is a tool for creating and managing your tabletop role-playing game campaigns. 
        With The Campaign, you can create characters, write narratives, and keep track of your campaign's progress.
      </p>
      <p>
       Start a new Adventure, <div className='button'><a href="/new-campaign">Create a Campaign.</a></div>
      </p>


     
    </main>
  );
};

export default Home;