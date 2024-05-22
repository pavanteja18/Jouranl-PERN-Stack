const Item = () => {
  return (
    <div className="item-post">
      <div className="item">
        <div className="item-date">
          <h3>12 MAY</h3>
          <p>16:45 - Thursday - 2004</p>
        </div>
        <div className="item-summary">
          <h1>Hello, Welcome to my Life!</h1>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry the printing and typesetting industry.
          </p>
        </div>
      </div>
      <img
        src="https://images.pexels.com/photos/620337/pexels-photo-620337.jpeg?cs=srgb&dl=pexels-pripicart-620337.jpg&fm=jpg"
        alt="img"
        width="90"
        height="90"
      />
    </div>
  );
};

export default Item;
