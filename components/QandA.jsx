import style from "./styles/QandA.module.css";

export default function QandA (){
    return (

<div className={style.container}>
                        <section className={style.column}>
                            <h2>Preguntas Frecuentes:</h2>
                            <div>
                                <label className={style.accordion}>
                                    <input type='checkbox' name='checkbox-accordion' />
                                    <div className={style.accordion__header}>¿Que es Emprendar?</div>
                                    <div className={style.accordion__content}>
                                        <h6>¿Que es Emprendar?</h6>
                                        <p>Es una pagina de crowdfunding en la que podrás encontrarte con un monton de proyectos a los cuales podrás darles tu apoyo, así tambien como poder publicar tu propio proyecto</p>
                                    </div>
                                </label>
                                <label className={style.accordion}>
                                    <input type='checkbox' name='checkbox-accordion' />
                                    <div className={style.accordion__header}>¿Como ingreso a la página?</div>
                                    <div className={style.accordion__content}>
                                        <h6>¿Como ingreso a la página?</h6>
                                        <p>Simplemente debes registrarte e iniciar sesion con el formulario que aparece al principio de la página</p>
                                    </div>
                                </label>
                                <label className={style.accordion}>
                                    <input type='checkbox' name='checkbox-accordion' />
                                    <div className={style.accordion__header}>¿que medio de pago se pueden usar?</div>
                                    <div className={style.accordion__content}>
                                        <h6>¿que medio de pago se pueden usar?</h6>
                                        <p>Podras usar Mercado Pago o PayPal</p>
                                    </div>
                                </label>
                                <label className={style.accordion}>
                                    <input type='checkbox' name='checkbox-accordion' />
                                    <div className={style.accordion__header}>¿A que tipo de publico apunta?</div>
                                    <div className={style.accordion__content}>
                                        <h6>¿A que tipo de publico apunta?</h6>
                                        <p>Esta pensada para personas de Latino América entre 18 y 65 años de edad</p>
                                    </div>
                                </label>
                                <label className={style.accordion}>
                                    <input type='checkbox' name='checkbox-accordion' />
                                    <div className={style.accordion__header}>¿Hay algun requisito para poder publicar mi proyecto?</div>
                                    <div className={style.accordion__content}>
                                        <h6>¿Hay algun requisito para poder publicar mi proyecto?</h6>
                                        <p>Una vez registrado, podras acceder al formulario de creacion, en el cual debes detallar muy bien tu proyecto, tus objetivos y luego pasara por una etapa de aprobacion por la administración de la página</p>
                                    </div>
                                </label>
                            </div>
                        </section>
                    </div>
    )



}
