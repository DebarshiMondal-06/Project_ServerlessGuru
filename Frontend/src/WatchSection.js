import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { createGlobalContext } from './ContextGlobal';
import Spinner from './Spinner';
import { FaMehBlank } from "react-icons/fa"


const WatchSection = () => {
  const { watch, loader } = useContext(createGlobalContext);

  if (loader) {
    return <Spinner />
  }

  return (
    <div className="watch-sec">
      <section className="watch-items container">
        {
          watch && watch.length > 0 ? watch.map((items, i) => {
            const { name, brand, price, watch_id, imgUrl } = items;
            return <Link key={i} to={`/watch/${watch_id}`} className="card" style={{ width: '20rem' }}>
              <img src={imgUrl}
                className="home_watch_view card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title text-capitalize">{brand + ' ' + name}</h5>
                <p className="card-text">${price}</p>
              </div>
            </Link>
          }) : <section>
            <div className='card p-5 text-center'>
              <p><FaMehBlank className='fa-2x' /></p>
              <h2> No Watch Data Found!</h2>
            </div>
          </section>
        }
      </section>
    </div>
  )
}

export default WatchSection

