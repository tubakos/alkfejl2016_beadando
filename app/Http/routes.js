'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')

Route.get('/', 'StorageController.main')
Route.get('/storage/create', 'StorageController.create').middleware('auth')
Route.post('/storage/create', 'StorageController.doCreate').middleware('auth')
Route.get('/storage/:id/add_department', 'StorageController.addDepartment').middleware('auth')
Route.post('/storage/:id/add_department', 'StorageController.doAddDepartment').middleware('auth')
Route.get('/storage/:id/add_item', 'StorageController.addItem').middleware('auth')
Route.post('/storage/:id/add_item', 'StorageController.doAddItem').middleware('auth')

Route.get('/departments', 'DepartmentController.show').middleware('auth')
Route.get('/department/create', 'DepartmentController.create').middleware('auth')
Route.post('/department/create', 'DepartmentController.doCreate').middleware('auth')
Route.get('/department/:id/edit', 'DepartmentController.edit').middleware('auth')
Route.post('/department/:id/edit', 'DepartmentController.doEdit').middleware('auth')
Route.get('/department/:id/delete', 'DepartmentController.doDelete').middleware('auth')

Route.get('/item/:id/edit', 'ItemController.edit').middleware('auth')
Route.post('/item/:id/edit', 'ItemController.doEdit').middleware('auth')
Route.get('/item/:id/delete', 'ItemController.doDelete').middleware('auth')

Route.get('/register', 'UserController.register')
Route.post('/register', 'UserController.doRegister')

Route.get('/login', 'UserController.login')
Route.post('/login', 'UserController.doLogin')
Route.get('/logout', 'UserController.doLogout')