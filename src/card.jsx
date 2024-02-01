import React from 'react';
import clsx from 'clsx';

function Card({ title, imageUrl, className }) {
  return (
    <div
      className={clsx(
        'flex flex-col gap-4 items-center justify-center max-w-48 aspect-4/3 md:aspect-3/4 rounded-2xl',
        {
          [className]: !!className,
        },
      )}
    >
      <img src={imageUrl} alt="icon" height={50} width={50} />
      <div className="h-1 w-5 bg-red-500"></div>
      <h3>{title}</h3>
    </div>
  );
}

export default Card;
