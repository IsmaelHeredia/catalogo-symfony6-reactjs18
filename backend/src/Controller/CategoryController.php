<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\Category;
use App\Services\Auth;

#[Route('/api', name: 'api_')]
class CategoryController extends AbstractController
{
    #[Route('/categories', name: 'category_index', methods:['get'] )]
    public function index(Request $request,ManagerRegistry $doctrine): JsonResponse
    {
        $categories = $doctrine
        ->getRepository(Category::class)
        ->findAll();

        $data = [];

        foreach ($categories as $category) {
            $data[] = [
                'id' => $category->getId(),
                'name' => $category->getName(),
                'icon' => $category->getIcon()
            ];
        }
        
        return $this->json($data); 
    }

    #[Route('/categories/{id}', name: 'category_show', methods:['get'] )]
    public function show(Request $request,ManagerRegistry $doctrine, int $id): JsonResponse
    {
        $auth = new Auth($doctrine);

        if($auth->validate_user($request)) {

            $category = $doctrine->getRepository(Category::class)->find($id);
    
            if (!$category) {
                return $this->json('No category found for id ' . $id, 404);
            }
    
            $data =  [
                'id' => $category->getId(),
                'name' => $category->getName(),
                'icon' => $category->getIcon()
            ];
            
            return $this->json($data);

        } else {
            return $this->json([
                'status' => 0,
                'message' => 'Access denied'
            ]); 
        }
    }

    #[Route('/categories', name: 'category_create', methods:['post'] )]
    public function create(ManagerRegistry $doctrine, Request $request): JsonResponse
    {
        $auth = new Auth($doctrine);

        if($auth->validate_user($request)) {

            $entityManager = $doctrine->getManager();
    
            $uploadedFile = $request->files->get('icon');

            $destination = $this->getParameter('kernel.project_dir').'/public/uploads';
            $newName = date('dmYHis') . ".jpg";
            $uploadedFile->move($destination,$newName);

            $category = new Category();
            $category->setName($request->request->get('name'));
            $category->setIcon($newName);
    
            $entityManager->persist($category);
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

    #[Route('/categories/{id}', name: 'category_update', methods:['post'] )]
    public function update(ManagerRegistry $doctrine, Request $request, int $id): JsonResponse
    {
        $auth = new Auth($doctrine);

        if($auth->validate_user($request)) {

            $entityManager = $doctrine->getManager();
            $category = $entityManager->getRepository(Category::class)->find($id);
    
            if (!$category) {
                return $this->json('No category found for id' . $id, 404);
            }

            $uploadedFile = $request->files->get('icon');

            $newName = "";

            if($uploadedFile != null) {
                
                $destination = $this->getParameter('kernel.project_dir').'/public/uploads';
                $newName = date('dmYHis') . ".jpg";

                $destinationOld = $destination . "/" . $category->getIcon();
                unlink($destinationOld);

                $uploadedFile->move($destination,$newName);
            }
    
            $category->setName($request->request->get('name'));

            if($newName != "") {
                $category->setIcon($newName);
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
 
    #[Route('/categories/{id}', name: 'category_delete', methods:['delete'] )]
    public function delete(Request $request,ManagerRegistry $doctrine, int $id): JsonResponse
    {
        $auth = new Auth($doctrine);

        if($auth->validate_user($request)) {

            $entityManager = $doctrine->getManager();
            $category = $entityManager->getRepository(Category::class)->find($id);
    
            if (!$category) {
                return $this->json('No category found for id' . $id, 404);
            }

            $destination = $this->getParameter('kernel.project_dir').'/public/uploads';
            $destinationOld = $destination . "/" . $category->getIcon();
            unlink($destinationOld);
            
            $entityManager->remove($category);
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
