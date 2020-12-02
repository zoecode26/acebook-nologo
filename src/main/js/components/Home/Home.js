import React from 'react';
import Aux from "../../hoc/Aux/Aux";

const Home = (props) => {
  return (
      <Aux>
        <h2>Welcome to Acebook, {props.user.firstName}!</h2>
        <img src="/user-photos/3/space.jpg"/>
        <Image source={require("./user-photos/3/space.jpg")} />
        <Image source={require("/user-photos/3/space.jpg")} />

        <p>This is the next billion dollar social media site, sign up now so everyone doesn't find out you're a loser.</p>
      </Aux>
  )
}

export default Home;