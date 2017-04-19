/* @flow */

export default function printLegalInformation(): void {
  process.stdout.write(
    `
Lumo
----

Copyright (c) 2016-2017 António Nuno Monteiro
Distributed under the Eclipse Public License either version 1.0 or (at your
option) any later version.


Lumo may use the following copyrighted software, which use is hereby
acknowledged.


ClojureScript
-------------

Copyright (c) Rich Hickey. All rights reserved. The use and
distribution terms for this software are covered by the Eclipse
Public License 1.0 (http://opensource.org/licenses/eclipse-1.0.php)
which can be found in the file epl-v10.html at the root of this
distribution. By using this software in any fashion, you are
agreeing to be bound by the terms of this license. You must
not remove this notice, or any other, from this software.


Fipp
----

Copyright © 2015 Brandon Bloom
Distributed under the Eclipse Public License, the same as Clojure.


Google Closure Compiler JS
--------------------------

Copyright © 2017 The Closure Compiler Authors

Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed
under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
CONDITIONS OF ANY KIND, either express or implied. See the License for the
specific language governing permissions and limitations under the License.


JSZip
-----

Copyright (c) 2009-2016 Stuart Knightley, David Duponchel, Franz Buchinger,
Antonio Afonso
MIT License


Node.js
-------

Copyright Node.js contributors. All rights reserved.
MIT License


node-getopt
-----------

Copyright (c) 2013, Joyent, Inc. All rights reserved.
MIT License


lazy-map
--------

Copyright (c) 2015 Artur Malabarba
Distributed under the Eclipse Public License either version 1.0 or (at your
option) any later version.


Parinfer
--------

Copyright (c) 2015 Shaun Williams and contributors
MIT License


Transit
------

Copyright © 2014 Cognitect

Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed
under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
CONDITIONS OF ANY KIND, either express or implied. See the License for the
specific language governing permissions and limitations under the License.
`,
  );
}
