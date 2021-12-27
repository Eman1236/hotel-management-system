import './App.css';
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './MyComponents/Login';
import Main from './MyComponents/Main';
import Header from './MyComponents/Header';
import Footer from './MyComponents/Footer';
import Search from './MyComponents/Search';
import Checkin from './MyComponents/Checkin';
import Checkout from './MyComponents/Checkout';
import OrderFood from './MyComponents/OrderFood';
import About from './MyComponents/About';
import NoteOrder from './MyComponents/NoteOrder';
import Logout from './MyComponents/Logout';

function App() {
  var role = localStorage.getItem('r');
  var token = localStorage.getItem('t');
  var isLogged = false
  if (token) {
    isLogged = true;
  }
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/"
            element={
              <div>
                <Header loggedIn={isLogged} role={role} />
                <Main />
                <Footer />
              </div>
            }
          />

          <Route exact path="/login"
            element={<Login />}
          />

          <Route exact path="/search"
            element={
              <div>
                <Header loggedIn={isLogged} role={role} />
                <Search />
                <Footer />
              </div>
            }
          />

          <Route exact path="/checkin"
            element={
              <div>
                <Header loggedIn={isLogged} role={role} />
                <Checkin />
                <Footer />
              </div>
            }
          />

          <Route exact path="/checkout"
            element={
              <div>
                <Header loggedIn={isLogged} role={role} />
                <Checkout />
                <Footer />
              </div>
            }
          />

          <Route exact path="/orderfood"
            element={
              <div>
                <Header loggedIn={isLogged} role={role} />
                <OrderFood />
                <Footer />
              </div>
            }
          />

          <Route exact path="/noteorder"
            element={
              <div>
                <Header loggedIn={isLogged} role={role} />
                <NoteOrder />
                <Footer />
              </div>
            }
          />

          <Route exact path="/about"
            element={
              <div>
                <Header loggedIn={isLogged} role={role} />
                <About />
                <Footer />
              </div>
            }
          />

        <Route exact path="/logout"
            element={
              <div>
                <Logout />
              </div>
            }
          />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
