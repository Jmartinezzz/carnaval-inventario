import { useEffect, useState } from 'react'
import AuthenticatedLayout2 from '@/Layouts/AuthenticatedLayout2'
import { Head, router, Link } from '@inertiajs/react'
import axios from 'axios';
import * as Yup from 'yup';
import Swal from 'sweetalert2'
import ValidationError from '@/Components/ValidationError'

const validationSchema = Yup.object().shape({
    nombre: Yup.string().required('El nombre es obligatorio').min(2, "El nombre tiene que tener al menos dos carácteres"),
    precio: Yup.number().typeError('Debe ingresar un número').required('El precio es obligatorio').positive('El precio debe ser positivo'),
    stock: Yup.number().typeError('Debe ingresar un número').required('El stock es obligatorio').positive('El stock debe ser positivo').integer('El stock debe ser un número entero'),
    descripcion: Yup.string().required('La descripción es obligatoria'),
});

export default function CreateEdit({ auth, action, product }) {
    const [formData, setFormData] = useState({
        nombre: '',
        precio: '',
        stock: '',
        descripcion: ''
    });
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (product) {
            setFormData({
                nombre: product.nombre || '',
                precio: product.precio || '',
                stock: product.stock || '',
                descripcion: product.descripcion || ''
            });
        }
    }, [product]);

    const handleChange = async (e) => {
        const { name, value } = e.target;
        try {
            await Yup.reach(validationSchema, name).validate(value);
            setErrors(prevErrors => ({ ...prevErrors, [name]: undefined }));
        } catch (error) {
            setErrors(prevErrors => ({ ...prevErrors, [name]: error.message }));
        }
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (product) {
            axios.put(route('api.productos.update', {'producto' : product.id}), formData)
            .then(response => {
                setFormData({
                    nombre: '',
                    precio: '',
                    stock: '',
                    descripcion: ''
                })
                alertAndRedirect('Producto Editado')
            })
            .catch(error => {
                setErrors(error.response.data.errors)
            })
        } else {
            axios.post(route('api.productos.store'), formData)
            .then(response => {
                setFormData({
                    nombre: '',
                    precio: '',
                    stock: '',
                    descripcion: ''
                })
                alertAndRedirect('Producto Creado')
            })
            .catch(error => {
                setErrors(error.response.data.errors)
            })
        }
    };

    const alertAndRedirect = (message) => {
        Swal.fire({
            title: message,
            icon: 'success',
            showCancelButton: false,
            confirmButtonText: 'Aceptar',
            allowOutsideClick: false
        }).then((result) => {
            if (result.isConfirmed) {
                router.get(route('productos.index'))
            }
        });
    }

    const headerContent = (
        <div className="container d-flex justify-content-between align-items-center">
            <h2 className="display-4 font-weight-bolder">{action} Producto</h2>
            <Link href="/productos" className="btn btn-danger h-25">
                <i class="fas fa-arrow-left"></i> Regresar
            </Link>
        </div>
    )

    return (
        <AuthenticatedLayout2
            user={auth.user}
            header={headerContent}
        >
            <Head title="Producto" />
            <div className="container mt-4">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <form onSubmit={handleSubmit}>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="form-group">
                                                <label htmlFor="nombre">Nombre:</label>
                                                <input id="nombre" type="text" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre del producto" className={`form-control ${errors.nombre ? 'is-invalid' : ''}`} />
                                                {errors.nombre && <ValidationError message={errors.nombre} />}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="precio">Precio:</label>
                                                <input id="precio" type="number" step="0.01" name="precio" value={formData.precio} onChange={handleChange} placeholder="Precio del producto" className={`form-control ${errors.precio ? 'is-invalid' : ''}`} />
                                                {errors.precio && errors.precio[0] && <ValidationError message={errors.precio} />}
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="stock">Stock:</label>
                                                <input id="stock" type="number" name="stock" value={formData.stock} onChange={handleChange} placeholder="Stock del producto" className={`form-control ${errors.stock ? 'is-invalid' : ''}`} />
                                                {errors.stock && errors.stock[0] && <ValidationError message={errors.stock} />}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="form-group">
                                                <label htmlFor="descripcion">Descripción:</label>
                                                <textarea rows="4" id="descripcion" name="descripcion" value={formData.descripcion} onChange={handleChange} placeholder="descrpcion del producto" className={`form-control ${errors.descripcion ? 'is-invalid' : ''}`}></textarea>
                                                {errors.descripcion && errors.descripcion[0] && <ValidationError message={errors.descripcion} />}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* /.card-body */}
                                <div className="card-footer d-flex justify-content-end">
                                    <button type="submit" className="btn btn-primary">{action}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </AuthenticatedLayout2>
    );
}
