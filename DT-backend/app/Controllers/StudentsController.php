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
            'phone'    => 'required|numeric',
            'class_id' => 'required|is_not_unique[classes.id]',
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
            $file->move(ROOTPATH . 'public/uploads/students', $newName);
            $data['picture'] = 'uploads/students/' . $newName;
        }

        if ($this->model->insert($data)) {
            $insertedId = $this->model->getInsertID();
            $newStudent = $this->model
                               ->select('students.*, classes.name as class_name')
                               ->join('classes', 'classes.id = students.class_id', 'left')
                               ->find($insertedId);
            
            if ($newStudent && $newStudent['picture']) {
                $newStudent['picture'] = base_url($newStudent['picture']);
            }

            return $this->respondCreated([
                'status'  => true,
                'message' => 'Student saved!',
                'result'  => $newStudent
            ]);
        }

        return $this->fail([
            'status'  => false,
            'message' => 'Error on save student',
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
            'email'    => "required|valid_email|is_unique[students.email,id,{$id}]",
            'phone'    => 'required|numeric',
            'class_id' => 'required|is_not_unique[classes.id]'
        ];

        if (!$this->validate($rules)) {
            $errors = $this->validator->getErrors();
            return $this->fail([
                'status'  => false,
                'message' => 'Validation error',
                'errors'  => $errors
            ], 400);
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
            $updatedStudent = $this->model
                                   ->select('students.*, classes.name as class_name')
                                   ->join('classes', 'classes.id = students.class_id', 'left')
                                   ->find($id);
            
            if ($updatedStudent && $updatedStudent['picture']) {
                $updatedStudent['picture'] = base_url($updatedStudent['picture']);
            }

            return $this->respond([
                'status'  => true,
                'message' => 'Student updated!',
                'result'  => $updatedStudent
            ]);
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