import React from "react";
import { Route, Switch } from "react-router-dom";
import StreamCreate from "./Components/Streams/StreamCreate";
import StreamDelete from "./Components/Streams/StreamDelete";
import StreamList from "./Components/Streams/StreamList";
import StreamShow from "./Components/Streams/StreamShow";
import StreamEdit from "./Components/Streams/StreamEdit";
import NavBar from "./Components/NavBar";
import { Router, Redirect } from "react-router-dom";
import history from "./History";
import NotFound from "./Components/NotFound";
import Footer from "./Components/Reusable/Footer";
import Pics from "./Components/Reusable/Pics";

const App = () => {
  return (
    <>
      <Router history={history}>
        <div className="fontify">
          <NavBar />

          <Switch>
            <Route exact path="/" component={StreamList} />
            <Route path="/streams/delete/:id" component={StreamDelete} />
            <Route path="/streams/new" render={() => <StreamCreate />} />
            <Route path="/streams/show" component={StreamShow} />
            <Route path="/streams/picture" component={Pics}/>
            <Route path="/streams/edit/:id" component={StreamEdit} />
            <Route path="/streams/:id" component={StreamShow} />
            <Route path="/notFound" component={NotFound} />
            <Redirect to="/notFound" />
          </Switch>
        </div>
      </Router>
      <Footer />
    </>
  );
};

export default App;
