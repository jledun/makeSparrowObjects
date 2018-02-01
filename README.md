# makeSparrowObjects

makeSparrowObjects is a node.js generator that does :
* connect to an existing and running mariadb database
* read the table list
* for each table, describes it
* generates an array of models based on table description
* applies an ejs template
* generates a php file including all sparrow classes for all tables
* add at the end of this php file a way to connect to mariadb instance and use sparrow in your php application

# Install

Simply clone this repo :

```bash
$ git clone https://github.com/jledun/makeSparrowObjects
$ cd makeSparrowObjects
$ npm install
```

then clone a sparrow repo

```bash
$ cd makeSparrowObjects
$ git clone https://github.com/mikecao/sparrow
```

# Run

You'll need node.js installed on you computer to use this generator.

Before using it, please edit makeSparrowObjects.js file and set your username, password and host of your running mariadb database.

On Linux : 

```bash
$ node makeSparrowObjects.js > your_php_destination_file.php
```

# Use the result in your php application

```php
<?php

   include_once "your_php_destination_file.php";

   // getDB is a public function
   $myDB = getDB( 'dbuser', 'dbpassword', 'dbhost', dbport, 'database' );

   // use Sparrow with objects ?
   $myDB->using( 'my_table_name' ); 
   echo "<pre>".print_r( $myDB->find(), true )."</pre>";

   // or you prefer as a query builder ?
   echo "<pre>".print_r( $myDB->from( 'my_table_name' )->select()->many(), true )."</pre>";

?>
```

Please, see https://github.com/mikecao/sparrow for help about this sexy library.

# Test

No tests are provided with this software :-(

# MIT Licence 

Copyright 2018 Julien Ledun <j.ledun@iosystems.fr>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
