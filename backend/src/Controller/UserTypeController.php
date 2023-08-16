<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\UserType;
use App\Services\Auth;

#[Route('/api', name: 'api_')]
class UserTypeController extends AbstractController
{
    #[Route('/userTypes', name: 'userTypes_index', methods:['get'] )]
    public function index(Request $request,ManagerRegistry $doctrine): JsonResponse
    {
        $auth = new Auth($doctrine);

        if($auth->validate_user($request)) {

            if($auth->validate_user_admin($request)) {

                $user_types = $doctrine
                    ->getRepository(UserType::class)
                    ->findAll();
        
                $data = [];
        
                foreach ($user_types as $user_type) {
                    $data[] = [
                        'id' => $user_type->getId(),
                        'name' => $user_type->getName()
                    ];
                }
                
                return $this->json($data);

            } else {
                return $this->json([
                    'status' => 0,
                    'message' => 'Access allowed only for administrators'
                ]);                  
            }

        } else {
            return $this->json([
                'status' => 0,
                'message' => 'Access denied'
            ]);            
        }   
    }

    #[Route('/userTypes/{id}', name: 'userTypes_show', methods:['get'] )]
    public function show(Request $request,ManagerRegistry $doctrine, int $id): JsonResponse
    {
        $auth = new Auth($doctrine);

        if($auth->validate_user($request)) {

            if($auth->validate_user_admin($request)) {

                $user_type = $doctrine->getRepository(UserType::class)->find($id);
        
                if (!$user_type) {
                    return $this->json('No user type found for id ' . $id, 404);
                }
        
                $data =  [
                    'id' => $user_type->getId(),
                    'name' => $user_type->getName()
                ];
                
                return $this->json($data);

            } else {
                return $this->json([
                    'status' => 0,
                    'message' => 'Access allowed only for administrators'
                ]);                 
            }

        } else {
            return $this->json([
                'status' => 0,
                'message' => 'Access denied'
            ]); 
        }
    }
}
