/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Home from './HomeComponet';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { postComment, fetchDishes, fetchComments, fetchPromos, fetchLeaders, postFeedback } from '../redux/ActionCreators';

const mapStateToProps = state => ({
  dishes: state.dishes,
  comments: state.comments,
  promotions: state.promotions,
  leaders: state.leaders
});

const mapDispatchToProps = dispatch => ({
  /* eslint max-len: ["warn", 200] */
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  postFeedback: feedback => dispatch(postFeedback(feedback)),
  fetchDishes: () => {
    dispatch(fetchDishes());
  },
  resetFeedbackForm: () => {
    dispatch(actions.reset('feedback'));
  },
  fetchComments: () => {
    dispatch(fetchComments());
  },
  fetchPromos: () => {
    dispatch(fetchPromos());
  },
  fetchLeaders: () => {
    dispatch(fetchLeaders());
  }
});

class Main extends Component {
  // constructor(props){
  //   super(props);

  // }

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }

  // return corresponding view for this component
  render() {
    const {
      dishes,
      promotions,
      leaders,
      comments,
      location,
      resetFeedbackForm,
      // eslint-disable-next-line no-shadow
      postFeedback
    } = this.props;

    const HomePage = () => (
      <Home
        dish={dishes.dishes.filter(dish => dish.featured)[0]}
        dishesLoading={dishes.isLoading}
        dishesErrMess={dishes.errMess}
        promotion={promotions.promotions.filter(promo => promo.featured)[0]}
        promosLoading={promotions.isLoading}
        promosErrMess={promotions.errMess}
        leader={leaders.leaders.filter(leader => leader.featured)[0]}
        leadersLoading={leaders.isLoading}
        leadersErrMess={leaders.errMess}
      />
    );

    const DishWithId = ({ match }) => (
      <DishDetail
        dish={
          dishes.dishes.filter(
            dish => dish.id === parseInt(match.params.dishId, 10)
          )[0]
        }
        isLoading={dishes.isLoading}
        errMess={dishes.errMess}
        comments={comments.comments.filter(
          comment => comment.dishId === parseInt(match.params.dishId, 10)
        )}
        commentsErrMess={comments.errMess}
        postComment={postComment}
      />
    );
    /*
    You should not use the component prop with an inline function to pass in-scope variables
    because you will get undesired component unmounts/remounts.
    (e.g. line 115,  using "render" instead of "component")
    */
    return (
      <div>
        <Header />
        <TransitionGroup>
          <CSSTransition key={location.key} classNames="page" timeout={300}>
            <Switch location={location}>
              <Route path="/home" component={HomePage} />
              <Route
                exact
                path="/aboutus"
                render={() => <About leaders={leaders} />}
              />
              <Route
                exact
                path="/menu"
                render={() => <Menu dishes={dishes} />}
              />
              <Route path="/menu/:dishId" component={DishWithId} />
              <Route
                exact
                path="/contactus"
                render={() => (
                  <Contact
                    resetFeedbackForm={resetFeedbackForm}
                    postFeedback={postFeedback}
                  />
                )}
              />
              <Redirect to="/home" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer />
      </div>
    );
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Main)
);
