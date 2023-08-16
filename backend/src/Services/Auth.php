<?php

namespace App\Services;

use Doctrine\ORM\EntityManagerInterface;

use App\Entity\User;
use App\Services\Auth;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class Auth
{
    protected $em;

    public function __construct($em) {
        $this->em = $em;
    }

    public function validate_user($request) {
        $token = $request->headers->get('Authorization');

        if($token != '') {
            $arr = explode(' ', $token);
            $jwt = $arr[1];

            $secret_key = $_ENV['SECRET_KEY'];

            try 
            {
                $decoded = JWT::decode($jwt, new Key($secret_key, 'HS256'));
                $data = json_decode(json_encode($decoded), true);
                $id = $data['data']['id'];
                $username = $data['data']['username'];
                $user = $this->em->getRepository(User::class)->findOneBy(['id'=> $id, 'username' => $username]);
                if($user) {
                    return true;
                } else {
                    return false;
                }
            }
            catch(\Exception $e)
            {
                return false;
            }
        } else {
            return false;
        }
    }

    public function validate_user_admin($request) {
        $token = $request->headers->get('Authorization');

        if($token != '') {
            $arr = explode(' ', $token);
            $jwt = $arr[1];

            $secret_key = $_ENV['SECRET_KEY'];

            try 
            {
                $decoded = JWT::decode($jwt, new Key($secret_key, 'HS256'));
                $data = json_decode(json_encode($decoded), true);
                $id = $data['data']['id'];
                $username = $data['data']['username'];
                $user = $this->em->getRepository(User::class)->findOneBy(['id'=> $id, 'username' => $username]);
                if($user) {
                    if($user->getUserTypeId() == 1) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            }
            catch(\Exception $e)
            {
                return false;
            }
        } else {
            return false;
        }
    }
}

?>