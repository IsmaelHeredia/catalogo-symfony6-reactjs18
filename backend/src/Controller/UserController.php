<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\User;
use App\Entity\UserType;
use App\Services\Auth;

#[Route('/api', name: 'api_')]
class UserController extends AbstractController
{
    #[Route('/users', name: 'user_index', methods:['get'] )]
    public function index(Request $request,ManagerRegistry $doctrine): JsonResponse
    {
        $auth = new Auth($doctrine);

        if($auth->validate_user($request)) {

            if($auth->validate_user_admin($request)) {

                $users = $doctrine
                    ->getRepository(User::class)
                    ->findAll();
        
                $data = [];
        
                foreach ($users as $user) {
                    $user_type = $doctrine->getRepository(UserType::class)->find($user->getUserTypeId());
                    $user_type_name = $user_type->getName();
                    $data[] = [
                        'id' => $user->getId(),
                        'username' => $user->getUsername(),
                        'email' => $user->getEmail(),
                        'user_type_id' => $user->getUserTypeId(),
                        'user_type_name' => $user_type_name
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

    #[Route('/users/{id}', name: 'user_show', methods:['get'] )]
    public function show(Request $request,ManagerRegistry $doctrine, int $id): JsonResponse
    {
        $auth = new Auth($doctrine);

        if($auth->validate_user($request)) {

            if($auth->validate_user_admin($request)) {

                $user = $doctrine->getRepository(User::class)->find($id);
        
                if (!$user) {
        
                    return $this->json('No user found for id ' . $id, 404);
                }
        
                $data =  [
                    'id' => $user->getId(),
                    'username' => $user->getUsername(),
                    'email' => $user->getEmail(),
                    'user_type_id' => $user->getUserTypeId()
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

    #[Route('/users', name: 'user_create', methods:['post'])]
    public function create(ManagerRegistry $doctrine, Request $request): JsonResponse
    {
        $auth = new Auth($doctrine);

        if($auth->validate_user($request)) {

            if($auth->validate_user_admin($request)) {

                $entityManager = $doctrine->getManager();

                $password = $request->request->get('password');
                $password_hash = password_hash($password, PASSWORD_BCRYPT);
        
                $user = new User();
                $user->setUsername($request->request->get('username'));
                $user->setPassword($password_hash);
                $user->setEmail($request->request->get('email'));
                $user->setUserTypeId($request->request->get('user_type'));

                $entityManager->persist($user);
                $entityManager->flush();
        
                return $this->json([
                    'status' => 1
                ]);

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

    #[Route('/users/{id}', name: 'user_update', methods:['post'] )]
    public function update(ManagerRegistry $doctrine, Request $request, int $id): JsonResponse
    {
        $auth = new Auth($doctrine);

        if($auth->validate_user($request)) {

            if($auth->validate_user_admin($request)) {

                $entityManager = $doctrine->getManager();

                $entityManager = $doctrine->getManager();
                $user = $entityManager->getRepository(User::class)->find($id);

                $user->setEmail($request->request->get('email'));
                $user->setUserTypeId($request->request->get('user_type'));

                $entityManager->flush();
                        
                return $this->json([
                    'status' => 1
                ]);

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

    #[Route('/account/changeUsername', name: 'user_changeuser', methods:['post'] )]
    public function changeUsername(ManagerRegistry $doctrine, Request $request): JsonResponse
    {
        $auth = new Auth($doctrine);

        if($auth->validate_user($request)) {

            $username = $request->request->get('username');
            $password = $request->request->get('password');
            $new_username = $request->request->get('new_username');

            $user = $doctrine->getRepository(User::class)->findOneBy(['username' => $username]);

            if($user) {

                $id_db = $user->getId();
                $password_db = $user->getPassword();

                if(password_verify($password, $password_db)) {

                    $entityManager = $doctrine->getManager();
                    $user_db = $entityManager->getRepository(User::class)->find($id_db);

                    $user_db->setUsername($new_username);

                    $entityManager->flush();

                    return $this->json([
                        'status' => 1,
                        'message' => 'Username changed'
                    ]);

                } else {

                    return $this->json([
                        'status' => 0,
                        'message' => 'Bad login'
                    ]);

                }

            } else {
                return $this->json([
                    'status' => 0,
                    'message' => 'Bad login'
                ]);
            }
    
        } else {
            return $this->json([
                'status' => 0,
                'message' => 'Access denied'
            ]);             
        }
    }

    #[Route('/account/changePassword', name: 'user_changepassword', methods:['post'] )]
    public function changePassword(ManagerRegistry $doctrine, Request $request): JsonResponse
    {
        $auth = new Auth($doctrine);

        if($auth->validate_user($request)) {
    
            $username = $request->request->get('username');
            $password = $request->request->get('password');
            $new_password = $request->request->get('new_password');

            $user = $doctrine->getRepository(User::class)->findOneBy(['username' => $username]);

            if($user) {

                $id_db = $user->getId();
                $password_db = $user->getPassword();

                if(password_verify($password, $password_db)) {

                    $new_password_hash = password_hash($new_password, PASSWORD_BCRYPT);

                    $entityManager = $doctrine->getManager();
                    $user_db = $entityManager->getRepository(User::class)->find($id_db);

                    $user_db->setPassword($new_password_hash);

                    $entityManager->flush();

                    return $this->json([
                        'status' => 1,
                        'message' => 'Password changed'
                    ]);

                } else {

                    return $this->json([
                        'status' => 0,
                        'message' => 'Bad login'
                    ]);

                }

            } else {
                return $this->json([
                    'status' => 0,
                    'message' => 'Bad login'
                ]);
            }

        } else {
            return $this->json([
                'status' => 0,
                'message' => 'Access denied'
            ]);             
        }
    }

    #[Route('/users/{id}', name: 'user_delete', methods:['delete'] )]
    public function delete(Request $request,ManagerRegistry $doctrine, int $id): JsonResponse
    {
        $auth = new Auth($doctrine);

        if($auth->validate_user($request)) {

            if($auth->validate_user_admin($request)) {

                $entityManager = $doctrine->getManager();
                $user = $entityManager->getRepository(User::class)->find($id);
        
                if (!$user) {
                    return $this->json('No user found for id' . $id, 404);
                }
                
                $entityManager->remove($user);
                $entityManager->flush();
        
                return $this->json([
                    'status' => 1
                ]); 
            
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
