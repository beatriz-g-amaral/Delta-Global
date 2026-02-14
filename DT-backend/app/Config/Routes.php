<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');
$routes->options('(:any)', 'Home::index');
$routes->post('login', 'AuthController::login');
$routes->resource('students', ['controller' => 'StudentsController']);
$routes->resource('classes', ['controller' => 'ClassController']);
$routes->resource('teachers', ['controller' => 'TeacherController']);
