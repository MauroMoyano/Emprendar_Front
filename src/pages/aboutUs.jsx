import React from "react";
import style from "./styles/aboutUs.module.css";
import Head from "next/head";
import Layout from "components/Layout";
const aboutUs = () => {
  return (
    
    <Layout> 
    <Head>
      <title>Nosotros</title>
    </Head>

    <div style={{ fontFamily: "Roboto,sans-serif" }} className={style.container}>
      <h1 className={style.title}>Nuestro team</h1>
      <h4 className={style.subTitle}>
        Lorem ipsum dolor sit amet consectetur.
      </h4>
      <div>
        <div className={style.containerCards}>
          <div className={style.card}>
            <img
              src="https://startbootstrap.github.io/startbootstrap-agency/assets/img/team/1.jpg"
              alt=""
            />

            <div className={style.info}>
              <p className={style.name}>Juan Arguello</p>
              <p className={style.carrer}>Developer</p>

              <div className={style.icons}></div>
            </div>
          </div>
          <div className={style.card}>
            <img
              src="https://startbootstrap.github.io/startbootstrap-agency/assets/img/team/1.jpg"
              alt=""
            />

            <div className={style.info}>
              <p className={style.name}>Juan Arguello</p>
              <p className={style.carrer}>Developer</p>

              <div className={style.icons}></div>
            </div>
          </div><div className={style.card}>
            <img
              src="https://startbootstrap.github.io/startbootstrap-agency/assets/img/team/1.jpg"
              alt=""
            />

            <div className={style.info}>
              <p className={style.name}>Juan Arguello</p>
              <p className={style.carrer}>Developer</p>

              <div className={style.icons}></div>
            </div>
          </div>
        </div>
      </div>
    </div> 
    </Layout>
  );
};

export default aboutUs;
