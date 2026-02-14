<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class MainSeeder extends Seeder
{
    public function run()
    {
        $data = [
                'name' => 'Maria Silva',
                'email' => 'mariasilva@example.com',
                'password' => password_hash('password123', PASSWORD_BCRYPT),
                'subject' => 'Inglês',
                'picture' => 'uploads/teachers/default.png',
            ];  

            $this->db->table('teachers')->insert($data);
    }
}
