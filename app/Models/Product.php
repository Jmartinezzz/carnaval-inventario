<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $table = 'tbl_products';
    protected $fillable = [
        'nombre',
        'descripcion',
        'stock',
        'precio'
    ];

    public function scopeFilters($query, $filters) {
        if (isset($filters['nombre']) && !empty($filters['nombre'])) {
            $query->where('nombre', 'like', '%' . $filters['nombre'] . '%');
        }
        
        if (isset($filters['descripcion']) && !empty($filters['descripcion'])) {
            $query->orWhere('descripcion', 'like', '%' . $filters['descripcion'] . '%');
        }
        
        if (isset($filters['precio']) && !empty($filters['precio'])) {
            $query->orWhere('precio',  'like', '%' . $filters['precio'] . '%');
        }

        return $query;
    }
}
