import React from "react";
import Banner from "../Banner";
import back from "../../assets/autocinema.jpg";

function Home() {
  return (
    <div>
      <Banner name="Home" />
      <div className="container-fluid p-m-5">
        <div className="row" style={{ padding: "50px" }}>
          <div className="col text-center">
            <h3 className="mb-4" style={{ fontWeight: "bold" }}>
              ¡BIENVENIDOS!
            </h3>
            <p className="w-75 mx-auto">
              <em style={{ color: "red", fontWeight: "bolder" }}>
                Blackout Cinema
              </em>{" "}
              es un autocine que busca retomar todas las soñadas escenas del
              pasado al presente, combinando la simplicidad junto a nuevas
              tecnologías e invenciones, creando un ambiente de ensueño para el
              disfrute de todos nuestros clientes.
            </p>
            <p className="w-75 mx-auto">
              Contando con (X) sucursales, distribuidas en toda la ciudad,
              queremos brindarle la mejor atención y servicio para que pueda
              disfrutar de una noche inolvidable fuera de lo común.
            </p>
            <p className="w-75 mx-auto">
              <em>Veámos juntos los créditos en el cielo nocturno</em>
            </p>
          </div>
        </div>

        {/* #353b41 */}
        <div
          className="row p-4 mx-5 mb-3 text-center"
          style={{
            background: "#1f1f1f",
            boxShadow: "0 5px 8px 0 rgba(0, 0, 0, 0.5)",
          }}
        >
          {/* Primera tarjeta */}
          <div className="col-md-4 p-4 card-style">
            <h5 style={{ color: "red", fontWeight: "bold" }}>Experiencia</h5>
            <p>¡Nunca olvidarás esta nueva experiencia, te lo aseguramos!</p>
            <p>Querrás volver a repetirla una y otra vez</p>
          </div>

          {/* Segunda tarjeta */}
          <div className="col-md-4 p-4 card-style">
            <h5 style={{ color: "red", fontWeight: "bold" }}>Vínculo</h5>
            <p>
              Te permitirá conectar con tus acompañantes en el mejor ambiente
              posible.
            </p>
            <p>¡El plan perfecto!</p>
          </div>

          {/* Tercera tarjeta */}
          <div className="col-md-4 p-4 card-style">
            <h5 style={{ color: "red", fontWeight: "bold" }}>Comodidad</h5>
            <p>
              Te aseguramos que te sentirás en casa con nuestra increíble
              atención y ambiente.
            </p>
            <p>¡Lo amarás!</p>
          </div>
        </div>

        {/* Sobre nosotros */}
        <div className="row" style={{ padding: "50px" }}>
          <div className="col text-center">
            <h4 className="mb-4" style={{ fontWeight: "bold" }}>
              ¡SOBRE NOSOTROS!
            </h4>
            <p className="w-75 mx-auto">
              <em style={{ color: "red", fontWeight: "bolder" }}>
                Blackout Cinema
              </em>{" "}
              fue creado por un grupo de estudiantes de la Universidad
              Metropolitana como resultado de un proyecto dirigido a profundizar
              sobre las bases de datos.
            </p>
            <p className="w-75 mx-auto">
              Todo esto como resultado de nuestros deseas de revivir y ofrecer
              una forma de entretenimiento para las personas. Ha sido el
              resultado de 3 meses de ardúo trabajo para brindarle el mejor de
              los servicios en toda CARACAS.
            </p>
            <p className="w-75 mx-auto">
              Siempre en busca de la excelencia para el público
            </p>
          </div>
        </div>

        <div style={cinemaStyle}>
          <img src={back} style={{ width: "70%", borderRadius: "20px" }} />
        </div>
      </div>
    </div>
  );
}

const cinemaStyle = {
  position: "relative",
  textAlign: "center",
  marginBottom: "40px",
};

export default Home;
