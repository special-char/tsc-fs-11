import React from 'react';
import clsx from 'clsx';

function Card({ title, imageUrl, className, badge }) {
  const displayBadge = () => {
    switch (badge) {
      case 'new':
        return <p className="badge badge--red">{badge}</p>;

      case 'hot':
        return <p className="badge badge--green">{badge}</p>;

      default:
        return null;
    }
  };

  return (
    <div
      className={clsx('card', {
        [className]: !!className,
      })}
    >
      <img src={imageUrl} alt="icon" height={50} width={50} />
      <div className="h-1 w-5 bg-red-500"></div>
      <h3>{title}</h3>
      {displayBadge()}
      {/* {badge ? <p>{badge}</p> : <p>Badge Not available</p>} */}
      <p>hello</p>
    </div>
  );
}

export default Card;
