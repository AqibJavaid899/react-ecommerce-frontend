import React from "react";

import MainCarousel from "./MainCarousel";
import NewsletterSubscription from "./NewsletterSubscription";
import ShoppingList from "./ShoppingList";

const Home = () => {
  return (
    <div>
      <MainCarousel />
      <ShoppingList />
      <NewsletterSubscription />
    </div>
  );
};

export default Home;
