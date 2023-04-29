import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { createGlobalContext } from './ContextGlobal';
import Spinner from './Spinner';



const WatchSection = () => {
  const { watch, loader } = useContext(createGlobalContext);

  if (loader) {
    return <Spinner />
  }

  return (
    <div className="watch-sec">
      <section className="watch-items container">
        {
          watch && watch.map((items, i) => {
            const { name, brand, price, watch_id, imgUrl } = items;
            return <Link key={i} to={`/watch/${watch_id}`} className="card" style={{ width: '20rem' }}>
              <img src={imgUrl}
                className="home_watch_view card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title text-capitalize">{brand + ' ' + name}</h5>
                <p className="card-text">${price}</p>
              </div>
            </Link>
          })
        }
      </section>
    </div>
  )
}

export default WatchSection

