<?php

namespace App\Http\Controllers\Api;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\ProductRequest;
use Illuminate\Http\Response;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $products = Product::filters($request->filters)
            ->OrderByDesc('id')
            ->paginate(10);

        return response()->json([
            'products' => $products->items(),
            'pagination' => [
                'current_page' => $products->currentPage(),
                'last_page' => $products->lastPage(),
                'per_page' => $products->perPage(),
                'total' => $products->total()
            ]
        ], Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProductRequest $request)
    {
        try {
            Product::create($request->validated());
            return response()->json(Response::HTTP_CREATED);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Ocurrio un error al guardar'], Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProductRequest $request, Product $producto)
    {
        try {
            $producto->update($request->validated());
            return response()->json(Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Ocurrio un error al modificar'], Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $producto)
    {
        try {
            $producto->delete();
            return response()->json(Response::HTTP_NO_CONTENT);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Ocurrio un error al eliminar'], Response::HTTP_BAD_REQUEST);
        }
    }
}
