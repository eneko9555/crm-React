import { useLoaderData } from "react-router-dom";
import Clientes from "../Components/Clientes";
import { obtenerClientes } from "../api/clientes"


export function loader() {
    const datos = obtenerClientes()
    return datos
}

const Index = () => {

    const datos = useLoaderData()

    return (
        <>
            <h1 className='font-black text-4xl py-5 text-center'> Administra tus <span className="text-blue-800">Clientes</span></h1>

            {datos.length ?
                <table className="w-full bg-white shadow mt-5 ">
                    <thead className="bg-blue-800 text-white">
                        <tr>
                            <th className="p-2">Cliente</th>
                            <th className="p-2">Contacto</th>
                            <th className="p-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datos.map(cliente =>
                            <Clientes
                                cliente={cliente}
                                key={cliente.id}
                            />
                        )}

                    </tbody>

                </table>
                :
                <p className="text-center mt-10">No hay Clientes aún</p>

            }
        </>
    )
}

export default Index