import { useNavigate, Form, redirect } from "react-router-dom"
import { eliminarCliente } from "../api/clientes"

export async function action({params}){
    eliminarCliente(params.id)
    return redirect("/")
}


const Clientes = ({ cliente }) => {

    const navigate = useNavigate()
    const { nombre, empresa, email, telefono, id } = cliente

    return (
        <tr className="border-b text-center">
            <td className="p-6">
                <p className="text-2xl text-gray-800">{nombre}</p>
                <p className="pt-2">{empresa}</p>
            </td>
            <td className="p-6">
                <p className="text-gray-600"><span className="text-gray-800  font-bold">Email: </span>{email}</p>
                <p className="text-gray-600"><span className="text-gray-800  font-bold">Telefono: </span>{telefono}</p>
            </td>
            <td className="p-6 ">
                <button
                    type="button"
                    className="text-blue-600 hover:text-blue-700 font-bold text-xs uppercase mr-3"
                    onClick={() => navigate(`clientes/${id}/editar`)}
                >Editar
                </button>

                <Form
                method="post"
                action={`/clientes/${id}/eliminar`}
                >
                    <button
                        type="submit"
                        className="text-red-600 hover:text-red-700 font-bold text-xs uppercase"
                    >Eliminar
                    </button>
                </Form>

            </td>
        </tr>

    )
}

export default Clientes