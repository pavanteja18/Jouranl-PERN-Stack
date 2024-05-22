import Item from "./Item";
import FavoriteItem from "./FavoriteItem";

const Section = () => {
  return (
    <section>
      <h1>Your Visions</h1>
      <hr></hr>
      <div className="content">
        <div className="favorties">
          <h2 className="fav-head">Your favorites</h2>
          <FavoriteItem />
          <FavoriteItem />
          <FavoriteItem />
        </div>
        <div className="post">
          <div className="post-head">
            <h2>Your Daily Zen</h2>
            <button className="button-50" role="button">
              Add
            </button>
          </div>
          <Item />
          <Item />
          <Item />
        </div>
      </div>
    </section>
  );
};

export default Section;
