<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\User;
use App\Services\Auth;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

#[Route('/api', name: 'api_')]
class AuthController extends AbstractController
{
    #[Route('/auth/login', name: 'app_auth_login', methods:['post'])]
    public function login(ManagerRegistry $doctrine, Request $request): JsonResponse
    {
        $parameters = json_decode($request->getContent(), true);

        $username = $parameters['username'];
        $password = $parameters['password'];

        $user = $doctrine->getRepository(User::class)->findOneBy(['username' => $username]);
   
        if (!$user) {
            return $this->json([
                'status' => 0,
                'message' => 'Bad login'
            ]);
        }

        $password_db = $user->getPassword();
        $id = $user->getId();
        $email = $user->getEmail();
        $user_type_id = $user->getUserTypeId();
        
        if(password_verify($password, $password_db)) {

            $secret_key = $_ENV['SECRET_KEY'];

            $issuedAt = time();
            $expirationTime = $issuedAt + 60 * 60 * 24 * 60;
    
            $token = array(
                "iat" => $issuedAt,
                "exp" => $expirationTime,
                "data" => array(
                    "id" => $id,
                    "username" => $username,
                    "email" => $email,
                    "user_type_id" => $user_type_id
            ));
    
            $jwt = JWT::encode($token, $secret_key, 'HS256');

            return $this->json([
                'status' => 1,
                'message' => 'Login validated correctly',
                'token' => $jwt
            ]);
        } else {
            return $this->json([
                'status' => 0,
                'message' => 'Bad login'
            ]);
        }
    }

    #[Route('/auth/validate', name: 'app_auth_validate', methods:['post'])]
    public function validate(ManagerRegistry $doctrine, Request $request): JsonResponse
    {
        $parameters = json_decode($request->getContent(), true);

        $token = $parameters['token'];

        $secret_key = $_ENV['SECRET_KEY'];

        if($token != "") {

            try 
            {
                $decoded = JWT::decode($token, new Key($secret_key, 'HS256'));

                return $this->json([
                    'status' => 1,
                    'message' => 'Validated token',
                    'token' => $decoded
                ]);
            }
            catch(\Exception $e)
            {
                return $this->json([
                    'status' => 0,
                    'message' => 'Invalid token',
                ]);
            }

        } else {
            return $this->json([
                'status' => 0,
                'message' => 'Token not found',
            ]);            
        }
    }
}
