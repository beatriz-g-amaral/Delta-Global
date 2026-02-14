<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\StudentModel;

class StudentsController extends ResourceController
{
    protected $modelName = 'App\Models\StudentModel';
    protected $format    = 'json';

    public function index()
    {
        $data = $this->model
                     ->select('students.*, classes.name as class_name')
                     ->join('classes', 'classes.id = students.class_id', 'left')
                     ->findAll();

        foreach ($data as &$student) {
            if ($student['picture']) {
                $student['picture'] = base_url($student['picture']);
            }
        }

        return $this->respond([
            'status' => true,
            'result' => $data
        ]);
    }

    public function create()
    {
        $rules = [
            'name'     => 'required|min_length[3]',
            'email'    => 'required|valid_email|is_unique[students.email]',
            'class_id' => 'required|is_not_unique[classes.id]',
            'picture'  => 'permit_empty|uploaded[picture]|max_size[picture,2048]|is_image[picture]'
        ];

        if (!$this->validate($rules)) {
            return $this->fail($this->validator->getErrors());
        }

        $data = $this->request->getPost();
        $file = $this->request->getFile('picture');
        
        if ($file && $file->isValid() && !$file->hasMoved()) {
            $newName = $file->getRandomName();
            $file->move(ROOTPATH . 'public/uploads/students', $newName);
            $data['picture'] = 'uploads/students/' . $newName;
        }

        if ($this->model->insert($data)) {
            return $this->respondCreated(['status' => true, 'message' => 'Student saved!']);
        }

        return $this->fail($this->model->errors());
    }

    public function update($id = null)
    {
        $data = $this->request->getPost();
        
        if (empty($data)) {
            $data = $this->request->getRawInput();
        }

        $rules = [
            'name'     => 'permit_empty|min_length[3]',
            'email'    => "permit_empty|valid_email|is_unique[students.email,id,{$id}]",
            'class_id' => 'permit_empty|is_not_unique[classes.id]'
        ];

        if (!$this->validate($rules)) {
            return $this->fail($this->validator->getErrors());
        }

        $file = $this->request->getFile('picture');
        if ($file && $file->isValid() && !$file->hasMoved()) {
            $newName = $file->getRandomName();
            $file->move(ROOTPATH . 'public/uploads/students', $newName);
            $data['picture'] = 'uploads/students/' . $newName;
        }

        unset($data['_method']);

        if (empty($data)) {
            return $this->respond(['status' => true, 'message' => 'Nothing to update']);
        }

        if ($this->model->update($id, $data)) {
            return $this->respond(['status' => true, 'message' => 'Student updated!']);
        }

        return $this->fail('Update failed');
    }

    public function delete($id = null)
    {
        if ($this->model->delete($id)) {
            return $this->respondDeleted(['status' => true, 'message' => 'Student deleted!']);
        }

        return $this->fail($this->model->errors());
    }
}