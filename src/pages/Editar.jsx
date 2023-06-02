import { obtenerCliente, actualizarCliente } from "../api/clientes"
import { useLoaderData, Form, useNavigate, useActionData, redirect } from "react-router-dom";
import Formulario from "../Components/Formulario";
import Errores from "../Components/Errores";

export async function loader({ params }) {
    const { id } = params
    const cliente = await obtenerCliente(id)

    if (Object.values(cliente) === 0) {
        throw new Response("", {
            status: 404,
            statusText: "No hay resultados"
        })
    }
    return cliente
}

export async function action({ request, params }) {
    const formData = await request.formData()
    const datos = Object.fromEntries(formData)
    const email = formData.get("email")

    // Validacion
    const errores = []
    if (Object.values(datos).includes("")) {
        errores.push("Todos los campos son obligatorios")
    }
    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
    if (!regex.test(email)) {
        errores.push("El email no es válido")
    }
    if (Object.keys(errores).length) {
        return errores
    }
    //actualizar cliente
    await actualizarCliente(datos, params.id)
    return redirect("/")
}

const Editar = () => {
    const cliente = useLoaderData()
    const navigate = useNavigate()
    const errores = useActionData()


    return (
        <>
            <h1 className='font-black text-4xl py-5 text-center mb-5'> Actualizando al cliente  <span className="text-blue-800">{cliente.nombre}</span></h1>

            <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-8 ">
                {errores?.length && errores.map((error, i) =>
                    <Errores key={i} >{error}</Errores>
                )}
                <Form
                    method="put"
                    noValidate
                >
                    <Formulario
                        cliente={cliente}
                    />
                    <input type="submit"
                        className="w-full mt-5 bg-blue-800 p-3 uppercase font-bold text-white text-lg rounded-md"
                        value="Actualizar Cliente"
                    />
                </Form>

                <button
                    className="w-full mt-5  pt-2 uppercase font-bold text-blue-800 text-lg rounded-md"
                    onClick={() => navigate("/")}
                >Volver
                </button>
            </div>
        </>
    )
}

export default Editar