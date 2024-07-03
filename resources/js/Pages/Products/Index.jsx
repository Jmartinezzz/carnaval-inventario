import { useEffect, useState } from 'react'
import AuthenticatedLayout2 from '@/Layouts/AuthenticatedLayout2'
import { Head, Link, router } from '@inertiajs/react'
import Swal from 'sweetalert2'
import Pagination from '@/Components/Pagination'

export default function Index({ auth, products }) {
    const [filters, setFilters] = useState({
        nombre: '',
        descripcion: '',
        precio: ''
    });

    const [shouldFetchProducts, setShouldFetchProducts] = useState(false);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value
        }))
        fetchProducts()
    }

    useEffect(() => {
        if (shouldFetchProducts) {
            fetchProducts();
            setShouldFetchProducts(false);
        }
    }, [shouldFetchProducts]);

    const clearFilters = () => {
        setFilters({
            nombre: '',
            descripcion: '',
            precio: ''
        })
        setShouldFetchProducts(true);
    }

    const fetchProducts = () => {
        router.get(route('productos.index'), { filters }, { preserveState: true })
    }

    const deleteItem = (id, name) => {
        Swal.fire({
            title: `¿Estás seguro de borrar el producto ${name}?`,
            text: "No podras revertir cambios",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, Borrar"
          }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(route('api.productos.destroy', id))
                .then(response => {
                    Swal.fire({
                        title: 'Producto eliminado',
                        icon: 'success',
                    })
                    fetchProducts()
                      
                })
                .catch(error => {
                    console.error(error.response.data.message)
                })
            }
          });
    }

    const headerContent = (
        <div className="container d-flex justify-content-between align-items-center">
            <h2 className="display-4 font-weight-bolder">Productos</h2>
            <Link href="/productos/create" className='btn btn-primary h-25'>
                Agregar Producto
            </Link>
        </div>
    )

    return (
        <AuthenticatedLayout2
            user={auth.user}
            header={headerContent}
        >
            <Head title="Productos" />
            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <div className="d-flex flex-column flex-md-row justify-content-md-end">
                                    <div className="input-group input-group-sm w-25 mr-1" >
                                        <input type="text" name="nombre" value={filters.nombre} onChange={handleFilterChange} className="form-control float-right" placeholder="Producto" />
                                    </div>
                                    <div className="input-group input-group-sm w-25 mr-1">
                                        <input type="text" name="descripcion" value={filters.descripcion} onChange={handleFilterChange} className="form-control float-right" placeholder="Descripcion" />
                                    </div>
                                    <div className="input-group input-group-sm w-25 mr-2">
                                        <input type="text" name="precio" value={filters.precio} onChange={handleFilterChange} className="form-control float-right" placeholder="precio" />
                                    </div>
                                    <div className="input-group-sm">
                                        <button className="btn btn-primary btn-sm btn-block" onClick={clearFilters}>Limpiar</button>
                                    </div>

                                </div>
                            </div>
                            {/* /.card-header */}
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th width="5%">#</th>
                                                <th width="20%">Producto</th>
                                                <th width="40%">Descripción</th>
                                                <th>Stock</th>
                                                <th>Precio</th>
                                                <th width="10%">Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {products.data.length ? (
                                                products.data.map(product => (
                                                    <tr key={product.id}>
                                                        <td>{product.id}</td>
                                                        <td>{product.nombre}</td>
                                                        <td>{product.descripcion}</td>
                                                        <td>{product.stock}</td>
                                                        <td>${product.precio}</td>
                                                        <td>
                                                            <div className="d-flex justify-content-between">
                                                                <Link href={route('productos.edit', {'producto' : product.id})} className="btn btn-outline-warning btn-sm">
                                                                    <i class="fas fa-edit"></i>
                                                                </Link>
                                                                <button onClick={() => deleteItem(product.id, product.nombre)} type="button" className="btn btn-outline-danger btn-sm">
                                                                    <i class="fas fa-trash"></i>
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))) : (
                                                <tr><td colSpan="6">No hay productos disponibles.</td></tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            {/* /.card-body */}
                            <div className="card-footer clearfix">
                               <Pagination links={products.links} />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </AuthenticatedLayout2>
    );
}
