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
            return $this->fail($this->validator->getErrors());
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
            return $this->respondCreated(['status' => true, 'message' => 'Teacher saved!']);
        }

        return $this->fail($this->model->errors());
    }

    public function update($id = null)
    {
        $data = $this->request->getRawInput();

        $rules = [
            'name'     => 'permit_empty|min_length[3]',
            'subject'  => 'permit_empty|min_length[3]',
            'email'    => "permit_empty|valid_email|is_unique[teachers.email,id,{$id}]",
            'password' => 'permit_empty|min_length[6]'
        ];

        if (!$this->validate($rules)) {
            return $this->fail($this->validator->getErrors());
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

        if ($this->model->update($id, $data)) {
            return $this->respond(['message' => 'Teacher Updated!']);
        }

        return $this->fail('Something went wrong while updating the teacher.');
    }

    public function delete($id = null)
    {
        if ($this->model->delete($id)) {
            return $this->respondDeleted(['status' => true, 'message' => 'Teacher deleted!']);
        }

        return $this->fail($this->model->errors());
    }
}