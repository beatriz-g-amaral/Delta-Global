<?php

namespace App\Controllers;

use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\RESTful\ResourceController;
use App\Models\TeacherModel;

class TeacherController extends ResourceController
{
    protected $modelName = 'App\Models\TeacherModel';
    protected $format    = 'json';

    public function index()
    {
       $teachers = $this->model
                     ->select('id, name, email, subject, picture, created_at')
                     ->findAll();

         return $this->respond([
            'status' => true,
            'result' => $teachers
        ]);
    }

    public function create()
    {
        $rules = [
            'name'     => 'required|min_length[3]',
            'email'    => 'required|valid_email|is_unique[teachers.email]',
            'password' => 'required|min_length[6]',
            'subject'  => 'required|min_length[3]',
            'picture'  => 'permit_empty|uploaded[picture]|max_size[picture,2048]|is_image[picture]'
        ];

        if (!$this->validate($rules)) {
            $errors = $this->validator->getErrors();
            return $this->fail([
                'status'  => false,
                'message' => 'Validation error',
                'errors'  => $errors
            ], 400);
        }

        $data = $this->request->getPost();
        $file = $this->request->getFile('picture');

        if ($file && $file->isValid() && !$file->hasMoved()) {
            $newName = $file->getRandomName();
            $file->move(ROOTPATH . 'public/uploads/teachers', $newName);
            $data['picture'] = 'uploads/teachers/' . $newName;
        }

        $data['password'] = password_hash($data['password'], PASSWORD_DEFAULT);

        if ($this->model->insert($data)) {
            $insertedId = $this->model->getInsertID();
            $newTeacher = $this->model
                               ->select('id, name, email, subject, picture, created_at')
                               ->find($insertedId);

            return $this->respondCreated([
                'status'  => true,
                'message' => 'Teacher saved!',
                'result'  => $newTeacher
            ]);
        }

        return $this->fail([
            'status'  => false,
            'message' => 'Error on save professor',
            'errors'  => $this->model->errors()
        ]);
    }

    public function update($id = null)
    {
        $data = $this->request->getPost();
        
        if (empty($data)) {
            $data = $this->request->getRawInput();
        }

        $rules = [
            'name'     => 'required|min_length[3]',
            'subject'  => 'required|min_length[3]',
            'email'    => "required|valid_email|is_unique[teachers.email,id,{$id}]",
            'password' => 'permit_empty|min_length[6]'
        ];

        if (!$this->validate($rules)) {
            $errors = $this->validator->getErrors();
            return $this->fail([
                'status'  => false,
                'message' => 'Validation error',
                'errors'  => $errors
            ], 400);
        }

        if (!empty($data['password'])) {
            $data['password'] = password_hash($data['password'], PASSWORD_DEFAULT);
        } else {
            unset($data['password']);
        }

        $file = $this->request->getFile('picture');
        if ($file && $file->isValid() && !$file->hasMoved()) {
            $newName = $file->getRandomName();
            $file->move(ROOTPATH . 'public/uploads/teachers', $newName);
            $data['picture'] = 'uploads/teachers/' . $newName;
        }

        unset($data['_method']);

        if (empty($data)) {
            return $this->respond(['status' => true, 'message' => 'Nothing to update']);
        }

        if ($this->model->update($id, $data)) {
            $updatedTeacher = $this->model
                                   ->select('id, name, email, subject, picture, created_at')
                                   ->find($id);

            return $this->respond([
                'status'  => true,
                'message' => 'Teacher Updated!',
                'result'  => $updatedTeacher
            ]);
        }

        return $this->fail([
            'status'  => false,
            'message' => 'Error on update professor',
            'errors'  => $this->model->errors()
        ]);
    }

    public function delete($id = null)
    {
        if ($this->model->delete($id)) {
            return $this->respondDeleted(['status' => true, 'message' => 'Teacher deleted!']);
        }

        return $this->fail($this->model->errors());
    }
}