<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class AddTokenExpiresToTeachers extends Migration
{
    public function up()
    {
        $this->forge->addColumn('teachers', [
            'token_expires_at' => [
                'type' => 'DATETIME',
                'null' => true,
                'after' => 'token'
            ],
        ]);
    }

    public function down()
    {
        $this->forge->dropColumn('teachers', 'token_expires_at');
    }
}
