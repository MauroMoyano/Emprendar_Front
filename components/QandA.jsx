import style from "./styles/QandA.module.css";

export default function QandA (){
    return (

<div className={style.container}>
                        <section className={style.column}>
                            <h2>Preguntas Frecuentes:</h2>
                            <div>
                                <label className={style.accordion}>
                                    <input type='checkbox' name='checkbox-accordion' />
                                    <div className={style.accordion__header}>¿Qué es Emprendar?</div>
                                    <div className={style.accordion__content}>
                                        <p>Es una plataforma de crowdfunding en la que podrás encontrarte con un montón de proyectos a los cuales podrás darles tu apoyo, y/o publicar tu propio proyecto</p>
                                    </div>
                                </label>
                                <label className={style.accordion}>
                                    <input type='checkbox' name='checkbox-accordion' />
                                    <div className={style.accordion__header}>¿Cómo ingreso a la página?</div>
                                    <div className={style.accordion__content}>
                                        <p>Simplemente debes registrarte e iniciar sesión con el formulario que aparece al principio de la página. También puedes loguearte usando tu cuenta de Google</p>
                                    </div>
                                </label>
                                <label className={style.accordion}>
                                    <input type='checkbox' name='checkbox-accordion' />
                                    <div className={style.accordion__header}>¿Qué medio de pago se pueden usar?</div>
                                    <div className={style.accordion__content}>
                                        <p>Dentro de la página tendrás acceso a medios de pago con tarjeta de crédito y débito, a través de la plataforma Stripe</p>
                                    </div>
                                </label>
                                <label className={style.accordion}>
                                    <input type='checkbox' name='checkbox-accordion' />
                                    <div className={style.accordion__header}>¿A qué tipo de público apunta?</div>
                                    <div className={style.accordion__content}>
                                        <p>Está pensada para personas de Latino América entre 18 y 65 años de edad</p>
                                    </div>
                                </label>
                                <label className={style.accordion}>
                                    <input type='checkbox' name='checkbox-accordion' />
                                    <div className={style.accordion__header}>¿Hay algún requisito para poder publicar mi proyecto?</div>
                                    <div className={style.accordion__content}>
                                        <p>Una vez registrado, podrás acceder al formulario de creación en el cual debes detallar muy bien tu proyecto, tus objetivos, y luego pasará por una etapa de aprobación por la administración de la página</p>
                                    </div>
                                </label>
                            </div>
                        </section>
                    </div>
    )



}
