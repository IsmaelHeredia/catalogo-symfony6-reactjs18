<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\Product;
use App\Entity\Category;
use App\Services\Auth;

#[Route('/api', name: 'api_')]
class ProductController extends AbstractController
{
    #[Route('/products', name: 'product_index', methods:['get'] )]
    public function index(Request $request,ManagerRegistry $doctrine): JsonResponse
    {
        $products = $doctrine
        ->getRepository(Product::class)
        ->findAll();

        $data = [];

        foreach ($products as $product) {
            $category = $doctrine->getRepository(Category::class)->find($product->getCategory());
            $category_name = $category->getName();
            $data[] = [
                'id' => $product->getId(),
                'name' => $product->getName(),
                'description' => $product->getDescription(),
                'price' => $product->getPrice(),
                'image' => $product->getImage(),
                'category' => $product->getCategory(),
                'category_name' => $category_name,
            ];
        }
        
        return $this->json($data);
    }

    #[Route('/products/{id}', name: 'product_show', methods:['get'] )]
    public function show(Request $request,ManagerRegistry $doctrine, int $id): JsonResponse
    {
        $product = $doctrine->getRepository(Product::class)->find($id);
    
        if (!$product) {
            return $this->json('No product found for id ' . $id, 404);
        }

        $category = $doctrine->getRepository(Category::class)->find($product->getCategory());
        $category_name = $category->getName();

        $data =  [
            'id' => $product->getId(),
            'name' => $product->getName(),
            'description' => $product->getDescription(),
            'price' => $product->getPrice(),
            'image' => $product->getImage(),
            'category' => $product->getCategory(),
            'category_name' => $category_name,
        ];
        
        return $this->json($data);
    }

    #[Route('/products/category/{id}', name: 'product_show_category', methods:['get'] )]
    public function showCategory(Request $request,ManagerRegistry $doctrine, int $id): JsonResponse
    {
        $products = $doctrine
        ->getRepository(Product::class)
        ->findBy(array('category' => $id));

        $data = [];

        foreach ($products as $product) {
            $category = $doctrine->getRepository(Category::class)->find($product->getCategory());
            $category_name = $category->getName();
            $data[] = [
                'id' => $product->getId(),
                'name' => $product->getName(),
                'description' => $product->getDescription(),
                'price' => $product->getPrice(),
                'image' => $product->getImage(),
                'category' => $product->getCategory(),
                'category_name' => $category_name,
            ];
        }
        
        return $this->json($data);
    }

    #[Route('/products', name: 'product_create', methods:['post'] )]
    public function create(ManagerRegistry $doctrine, Request $request): JsonResponse
    {
        $auth = new Auth($doctrine);

        if($auth->validate_user($request)) {

            $entityManager = $doctrine->getManager();
    
            $uploadedFile = $request->files->get('image');

            $destination = $this->getParameter('kernel.project_dir').'/public/uploads';
            $newName = date('dmYHis') . ".jpg";
            $uploadedFile->move($destination,$newName);

            $product = new Product();
            $product->setName($request->request->get('name'));
            $product->setDescription($request->request->get('description'));
            $product->setPrice($request->request->get('price'));
            $product->setImage($newName);
            $product->setCategory($request->request->get('category'));
    
            $entityManager->persist($product);
            $entityManager->flush();
    
            return $this->json([
                'status' => 1
            ]);

        } else {
            return $this->json([
                'status' => 0,
                'message' => 'Access denied'
            ]);             
        }
    }

    #[Route('/products/{id}', name: 'product_update', methods:['post'] )]
    public function update(ManagerRegistry $doctrine, Request $request, int $id): JsonResponse
    {
        $auth = new Auth($doctrine);

        if($auth->validate_user($request)) {

            $entityManager = $doctrine->getManager();
            $product = $entityManager->getRepository(Product::class)->find($id);
    
            if (!$product) {
                return $this->json('No product found for id' . $id, 404);
            }

            $uploadedFile = $request->files->get('image');

            $newName = "";

            if($uploadedFile != null) {
                
                $destination = $this->getParameter('kernel.project_dir').'/public/uploads';
                $newName = date('dmYHis') . ".jpg";

                $destinationOld = $destination . "/" . $product->getImage();
                unlink($destinationOld);

                $uploadedFile->move($destination,$newName);
            }
    
            $product->setName($request->request->get('name'));
            $product->setDescription($request->request->get('description'));
            $product->setPrice($request->request->get('price'));
            $product->setCategory($request->request->get('category'));

            if($newName != "") {
                $product->setImage($newName);
            }

            $entityManager->flush();
    
            return $this->json([
                'status' => 1
            ]);

        } else {
            return $this->json([
                'status' => 0,
                'message' => 'Access denied'
            ]);  
        }
    }
 
    #[Route('/products/{id}', name: 'product_delete', methods:['delete'] )]
    public function delete(Request $request,ManagerRegistry $doctrine, int $id): JsonResponse
    {
        $auth = new Auth($doctrine);

        if($auth->validate_user($request)) {

            $entityManager = $doctrine->getManager();
            $product = $entityManager->getRepository(Product::class)->find($id);
    
            if (!$product) {
                return $this->json('No product found for id' . $id, 404);
            }

            $destination = $this->getParameter('kernel.project_dir').'/public/uploads';
            $destinationOld = $destination . "/" . $product->getImage();
            unlink($destinationOld);
            
            $entityManager->remove($product);
            $entityManager->flush();
    
            return $this->json([
                'status' => 1
            ]);  


        } else {
            return $this->json([
                'status' => 0,
                'message' => 'Access denied'
            ]);              
        }
    }
}
