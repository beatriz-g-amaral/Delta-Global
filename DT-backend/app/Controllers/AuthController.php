<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\API\ResponseTrait; 

class AuthController extends BaseController
{
    use ResponseTrait; 

    public function login()
    {
        $rules = [
            'email'    => 'required|valid_email',
            'password' => 'required|min_length[6]',
        ];

        if (!$this->validate($rules)) {
            return $this->fail($this->validator->getErrors());
        }

        $email = $this->request->getVar('email');
        $password = $this->request->getVar('password');

        $teacherModel = new \App\Models\TeacherModel();
        $user = $teacherModel->where('email', $email)->first();

        if (!$user || !password_verify($password, $user['password'])) {
            return $this->failUnauthorized('Invalid Email or Password');
        }

        $token = bin2hex(random_bytes(16));
        $expiresAt = date('Y-m-d H:i:s', strtotime('+2 hours'));

        $teacherModel->update($user['id'], [
            'token' => $token,
            'token_expires_at' => $expiresAt
        ]);

        return $this->respond([
            'status' => true,
            'token'  => $token,
            'user'   => [
                'id'   => $user['id'],
                'name' => $user['name']
            ]
        ]);
    } 
}