/* @flow */

export default function printLegalInformation(): void {
  process.stdout.write(`
Lumo
----

Copyright (c) 2016 Antonio Nuno Monteiro
Distributed under the Eclipse Public License either version 1.0 or (at your
option) any later version.

Lumo may use the following copyrighted software, which use is hereby
acknowledged.


JSZip
-----

Copyright (c) 2009-2016 Stuart Knightley, David Duponchel, Franz Buchinger,
Antonio Afonso
MIT License


minimist
--------

Copyright (c) 2010 James Halliday (mail@substack.net)
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
`);
}
