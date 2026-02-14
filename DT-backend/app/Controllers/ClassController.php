<?php

namespace App\Controllers;

use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\RESTful\ResourceController;
use App\Models\ClassModel;

class ClassController extends ResourceController
{
    protected $modelName = 'App\Models\ClassModel';
    protected $format    = 'json';

    public function index()
    {
       $data = $this->model
                 ->select('classes.*, teachers.name as teacher_name')
                 ->join('teachers', 'teachers.id = classes.teacher_id', 'left')
                 ->findAll();

        return $this->respond($data);
    }

    public function create()
    {
        $rules = [
            'name'     => 'required|min_length[3]',
            'teacher_id'    => 'required|is_not_unique[teachers.id]',
        ];

        if (!$this->validate($rules)) {
            return $this->fail($this->validator->getErrors());
        }

        $data = $this->request->getPost();

        if ($this->model->insert($data)) {
            return $this->respondCreated(['status' => true, 'message' => 'Class saved!']);
        }

        return $this->fail($this->model->errors());
    }
    public function update($id = null)
    {
        $data = $this->request->getRawInput();

        $rules = [
            'name'     => 'permit_empty|min_length[3]',
            'teacher_id'    => 'required|is_not_unique[teachers.id]',
        ];

        if (!$this->validate($rules)) {
            return $this->fail($this->validator->getErrors());
        }

        if ($this->model->update($id, $data)) {
            return $this->respond(['message' => 'Class Updated!']);
        }

        return $this->fail('Something went wrong while updating the class.');
    }
    public function delete($id = null)
    {
        if ($this->model->delete($id)) {
            return $this->respondDeleted(['status' => true, 'message' => 'Class deleted!']);
        }

        return $this->fail($this->model->errors());
    }
}
