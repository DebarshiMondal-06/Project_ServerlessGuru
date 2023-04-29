/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from 'react'
import { Link,  useParams } from 'react-router-dom'
import Spinner from './Spinner';
import { BiArrowBack } from 'react-icons/bi';
import { createGlobalContext } from './ContextGlobal';



const ViewWatch = () => {
  const { watch } = useContext(createGlobalContext);
  const { id } = useParams();


  let one_watch = watch && watch.find((item) => item.watch_id === id * 1);
  const { watch_id, imgUrl, name, brand, category, description, price } = one_watch || {};

  if (!watch_id) {
    return <Spinner />
  }

  return <main className="container">
    <section className="row" style={{ marginTop: 50 }}>
      <div className="col-md-1">
        <article className="back_btn"> <Link to='/'><BiArrowBack className="fa-long-arrow-alt-left" /></Link></article>
      </div>
      <div className="col-md-5 mt-5">
        <div className="watch_img_card mb-5">
          <img src={imgUrl} className="card-img-top" alt="..." />
        </div>
      </div >
      <div className="col-md-5 watch_desc_section" style={{ marginTop: '10rem' }}>
        <p style={{ fontSize: 20 }}>
          <span className="badge bg-secondary"> {category}</span>
        </p>
        <p>{brand + ' ' + name}</p>
        <h2 className='price'>${price}</h2>
        <article>
          {description}
        </article>
      </div>
      <div className="col-md-1"></div>
    </section >
  </main>
}

export default ViewWatch
